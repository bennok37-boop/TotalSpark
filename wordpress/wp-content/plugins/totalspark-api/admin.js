jQuery(document).ready(function($) {
    
    // Import data functionality
    $('#import-data-btn').on('click', function() {
        var $btn = $(this);
        var $progress = $('#import-progress');
        var $log = $('#import-log');
        
        $btn.prop('disabled', true);
        $progress.show();
        $log.html('<p>Starting import...</p>');
        
        $.ajax({
            url: totalspark_ajax.ajax_url,
            type: 'POST',
            data: {
                action: 'import_existing_data',
                nonce: totalspark_ajax.nonce
            },
            success: function(response) {
                if (response.success) {
                    $log.html('<p style="color: green;">✅ ' + response.data + '</p>');
                    $log.append('<p>You can now:</p>');
                    $log.append('<ul>');
                    $log.append('<li><a href="edit.php?post_type=cleaning_service">Edit Cleaning Services</a></li>');
                    $log.append('<li><a href="edit.php?post_type=cleaning_location">Edit Locations</a></li>');
                    $log.append('<li><a href="admin.php?page=totalspark-gallery">Upload Before/After Images</a></li>');
                    $log.append('</ul>');
                } else {
                    $log.html('<p style="color: red;">❌ Import failed: ' + response.data + '</p>');
                }
            },
            error: function() {
                $log.html('<p style="color: red;">❌ Import failed: Server error</p>');
            },
            complete: function() {
                $btn.prop('disabled', false);
                $('.spinner').removeClass('is-active');
            }
        });
    });
    
    // Image upload form
    $('#image-upload-form').on('submit', function(e) {
        e.preventDefault();
        
        var formData = new FormData(this);
        formData.append('action', 'upload_before_after');
        formData.append('nonce', totalspark_ajax.nonce);
        
        var $form = $(this);
        var $submit = $form.find('button[type="submit"]');
        
        $submit.prop('disabled', true).text('Uploading...');
        
        $.ajax({
            url: totalspark_ajax.ajax_url,
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                if (response.success) {
                    alert('Before/After pair uploaded successfully!');
                    $form[0].reset();
                } else {
                    alert('Upload failed: ' + response.data);
                }
            },
            error: function() {
                alert('Upload failed: Server error');
            },
            complete: function() {
                $submit.prop('disabled', false).text('Upload Before/After Pair');
            }
        });
    });
    
    // Load gallery items
    function loadGalleryItems() {
        $.get('/wp-json/wp/v2/before-after?per_page=100', function(items) {
            var $grid = $('#gallery-grid');
            $grid.empty();
            
            if (items.length === 0) {
                $grid.html('<p>No before/after pairs found. <a href="admin.php?page=totalspark-import">Upload some images</a> to get started.</p>');
                return;
            }
            
            items.forEach(function(item) {
                var beforeImg = item.before_image || '/wp-content/plugins/totalspark-api/placeholder-before.jpg';
                var afterImg = item.after_image || '/wp-content/plugins/totalspark-api/placeholder-after.jpg';
                
                var html = '<div class="gallery-item" style="border: 1px solid #ddd; padding: 15px; border-radius: 5px;">';
                html += '<h3>' + item.title.rendered + '</h3>';
                html += '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">';
                html += '<div>';
                html += '<p><strong>Before:</strong></p>';
                html += '<img src="' + beforeImg + '" style="width: 100%; height: 150px; object-fit: cover; border-radius: 3px;" alt="Before">';
                html += '</div>';
                html += '<div>';
                html += '<p><strong>After:</strong></p>';
                html += '<img src="' + afterImg + '" style="width: 100%; height: 150px; object-fit: cover; border-radius: 3px;" alt="After">';
                html += '</div>';
                html += '</div>';
                html += '<p><small>Location: ' + (item.location_slug || 'Not set') + ' | Service: ' + (item.service_category || 'Not set') + '</small></p>';
                html += '<p><a href="post.php?post=' + item.id + '&action=edit" class="button">Edit</a></p>';
                html += '</div>';
                
                $grid.append(html);
            });
        });
    }
    
    // Load gallery on gallery page
    if (window.location.href.indexOf('totalspark-gallery') !== -1) {
        loadGalleryItems();
    }
    
});