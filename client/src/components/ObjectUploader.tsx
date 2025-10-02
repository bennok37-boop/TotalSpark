import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import Uppy from "@uppy/core";
import Dashboard from "@uppy/dashboard";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import type { UploadResult } from "@uppy/core";
import { Button } from "@/components/ui/button";

interface ObjectUploaderProps {
  maxNumberOfFiles?: number;
  maxFileSize?: number;
  onGetUploadParameters: (file: any) => Promise<{
    method: "PUT";
    url: string;
    headers?: Record<string, string>;
  }>;
  onComplete?: (
    result: UploadResult<Record<string, unknown>, Record<string, unknown>>
  ) => void;
  buttonClassName?: string;
  children: ReactNode;
}

class DirectUploadPlugin {
  private uppy: any;
  private getUploadParameters: any;

  constructor(uppy: any, opts: any) {
    this.uppy = uppy;
    this.getUploadParameters = opts.getUploadParameters;
    this.id = 'DirectUpload';
    this.type = 'uploader';
  }

  id: string;
  type: string;

  install() {
    this.uppy.addUploader(this.handleUpload.bind(this));
  }

  uninstall() {}

  async handleUpload(fileIDs: string[]) {
    console.log('🚀 Starting direct GCS upload for', fileIDs.length, 'file(s)');
    
    const promises = fileIDs.map((fileID) => this.uploadFile(fileID));
    const results = await Promise.allSettled(promises);
    
    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error('❌ Upload rejected:', { fileID: fileIDs[index], error: result.reason });
      }
    });
  }

  async uploadFile(fileID: string) {
    const file = this.uppy.getFile(fileID);
    
    try {
      this.uppy.emit('upload-started', file);
      console.log('📤 Getting upload parameters for:', file.name);
      
      // Get presigned URL from backend
      const params = await this.getUploadParameters(file);
      console.log('✅ Got presigned URL');
      
      // Upload directly to GCS, merging any required headers from the presigned URL
      console.log('📤 Uploading to GCS...');
      const response = await fetch(params.url, {
        method: 'PUT',
        body: file.data,
        headers: {
          'Content-Type': file.type || 'application/octet-stream',
          ...(params.headers || {}),
        },
      });

      console.log('📥 GCS response:', { status: response.status, ok: response.ok });

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error');
        const errorResponse = { status: response.status, body: errorText };
        console.error('❌ GCS upload failed:', errorResponse);
        
        // Emit error with response details
        this.uppy.emit('upload-error', file, new Error(`Upload failed: ${response.status}`), errorResponse);
        throw new Error(`Upload failed: ${response.status}`);
      }

      console.log('✅ Upload successful!');

      // Extract clean URL without query parameters
      const uploadURL = params.url.split('?')[0];

      // Set the uploadURL in Uppy's file state so it's available in complete results
      this.uppy.setFileState(fileID, {
        uploadURL,
        response: {
          status: response.status,
          uploadURL,
        },
      });

      // Emit success with response details
      this.uppy.emit('upload-success', file, {
        status: response.status,
        uploadURL,
      });

      return {
        successful: [{ ...file, uploadURL }],
        failed: [],
      };
    } catch (error) {
      console.error('❌ Upload error:', { fileName: file.name, error });
      
      // If we haven't already emitted upload-error (from the !response.ok block), emit it now
      if ((error as any).message && !(error as any).message.includes('Upload failed:')) {
        this.uppy.emit('upload-error', file, error);
      }
      
      throw error;
    }
  }
}

/**
 * A file upload component that renders as a button and provides a modal interface for
 * file management.
 * 
 * Features:
 * - Renders as a customizable button that opens a file upload modal
 * - Provides a modal interface for:
 *   - File selection
 *   - File preview
 *   - Upload progress tracking
 *   - Upload status display
 * 
 * The component uses Uppy under the hood to handle all file upload functionality.
 * All file management features are automatically handled by the Uppy dashboard modal.
 * 
 * @param props - Component props
 * @param props.maxNumberOfFiles - Maximum number of files allowed to be uploaded
 *   (default: 1)
 * @param props.maxFileSize - Maximum file size in bytes (default: 10MB)
 * @param props.onGetUploadParameters - Function to get upload parameters (method and URL).
 *   Typically used to fetch a presigned URL from the backend server for direct-to-GCS
 *   uploads.
 * @param props.onComplete - Callback function called when upload is complete. Typically
 *   used to make post-upload API calls to update server state and set object ACL
 *   policies.
 * @param props.buttonClassName - Optional CSS class name for the button
 * @param props.children - Content to be rendered inside the button
 */
export function ObjectUploader({
  maxNumberOfFiles = 1,
  maxFileSize = 10485760, // 10MB default
  onGetUploadParameters,
  onComplete,
  buttonClassName,
  children,
}: ObjectUploaderProps) {
  const [uppy] = useState(() =>
    new Uppy({
      restrictions: {
        maxNumberOfFiles,
        maxFileSize,
        allowedFileTypes: ['image/*'], // Only allow images for job photos
      },
      autoProceed: false,
    })
      .use(Dashboard, {
        id: 'dashboard',
        inline: false,
        target: 'body',
        closeAfterFinish: true,
        proudlyDisplayPoweredByUppy: false,
      })
      .use(DirectUploadPlugin as any, {
        getUploadParameters: onGetUploadParameters,
      })
      .on("upload", (data) => {
        console.log('📤 Starting upload of', (data as any)?.fileIDs?.length || 0, 'file(s)');
      })
      .on("upload-success", (file, response) => {
        console.log('✅ Upload success:', { fileName: file?.name, status: response?.status });
      })
      .on("complete", (result) => {
        console.log('✅ Upload complete:', { 
          successful: result.successful?.length || 0, 
          failed: result.failed?.length || 0 
        });
        onComplete?.(result);
        const dashboardPlugin = uppy.getPlugin('dashboard') as any;
        dashboardPlugin?.closeModal?.();
      })
      .on("error", (error) => {
        console.error('❌ Uppy error:', error);
      })
      .on("upload-error", (file, error, response) => {
        console.error('❌ Uppy upload-error:', { 
          fileName: file?.name, 
          error: error?.message || error, 
          status: response?.status,
          body: response?.body
        });
      })
  );

  // Cleanup Uppy instance on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      // Cancel any ongoing uploads and clear all files
      uppy.cancelAll();
      uppy.clear();
      
      // Close the dashboard if it's open
      const dashboardPlugin = uppy.getPlugin('dashboard') as any;
      if (dashboardPlugin?.isModalOpen?.()) {
        dashboardPlugin.closeModal();
      }
    };
  }, [uppy]);

  return (
    <div>
      <Button 
        type="button"
        variant="outline" 
        onClick={() => {
          const dashboardPlugin = uppy.getPlugin('dashboard') as any;
          dashboardPlugin?.openModal?.();
        }} 
        className={buttonClassName}
        data-testid="button-upload-images"
      >
        {children}
      </Button>
    </div>
  );
}
