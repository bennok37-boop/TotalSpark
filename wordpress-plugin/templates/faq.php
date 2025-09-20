<?php
/**
 * FAQ Section Template
 */
?>
<section class="ts-faq-section" style="padding: 4rem 1rem; background: #f8fafc;">
    <div class="ts-container" style="max-width: 800px; margin: 0 auto;">
        
        <div class="ts-section-header" style="text-align: center; margin-bottom: 3rem;">
            <h2 style="font-size: 2.5rem; font-weight: bold; margin-bottom: 1rem; color: #1e293b;">
                Frequently Asked Questions
            </h2>
            <p style="font-size: 1.2rem; color: #64748b;">
                Everything you need to know about our cleaning services
            </p>
        </div>
        
        <div class="ts-faq-list">
            
            <div class="ts-faq-item" style="background: white; margin-bottom: 1rem; border-radius: 0.75rem; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <div class="ts-faq-question" style="padding: 1.5rem; cursor: pointer; font-weight: 600; color: #1e293b; border-bottom: 1px solid #e2e8f0;" onclick="toggleFAQ(this)">
                    <span>How much do your cleaning services cost?</span>
                    <span class="ts-faq-icon" style="float: right; font-size: 1.25rem;">+</span>
                </div>
                <div class="ts-faq-answer" style="padding: 0 1.5rem; max-height: 0; overflow: hidden; transition: all 0.3s ease;">
                    <div style="padding: 1.5rem 0; color: #64748b; line-height: 1.6;">
                        Our prices vary depending on the size of your property, type of cleaning required, and location. We offer free quotes with no obligation. Contact us today for a personalized estimate based on your specific needs.
                    </div>
                </div>
            </div>
            
            <div class="ts-faq-item" style="background: white; margin-bottom: 1rem; border-radius: 0.75rem; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <div class="ts-faq-question" style="padding: 1.5rem; cursor: pointer; font-weight: 600; color: #1e293b; border-bottom: 1px solid #e2e8f0;" onclick="toggleFAQ(this)">
                    <span>Are your cleaners insured and vetted?</span>
                    <span class="ts-faq-icon" style="float: right; font-size: 1.25rem;">+</span>
                </div>
                <div class="ts-faq-answer" style="padding: 0 1.5rem; max-height: 0; overflow: hidden; transition: all 0.3s ease;">
                    <div style="padding: 1.5rem 0; color: #64748b; line-height: 1.6;">
                        Yes, absolutely. All our cleaning staff undergo enhanced DBS checks and are fully trained professionals. We carry £2M public liability insurance to protect your property and give you complete peace of mind.
                    </div>
                </div>
            </div>
            
            <div class="ts-faq-item" style="background: white; margin-bottom: 1rem; border-radius: 0.75rem; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <div class="ts-faq-question" style="padding: 1.5rem; cursor: pointer; font-weight: 600; color: #1e293b; border-bottom: 1px solid #e2e8f0;" onclick="toggleFAQ(this)">
                    <span>Do you guarantee your work?</span>
                    <span class="ts-faq-icon" style="float: right; font-size: 1.25rem;">+</span>
                </div>
                <div class="ts-faq-answer" style="padding: 0 1.5rem; max-height: 0; overflow: hidden; transition: all 0.3s ease;">
                    <div style="padding: 1.5rem 0; color: #64748b; line-height: 1.6;">
                        We offer a 100% satisfaction guarantee on all our services. If you're not completely happy with our work, we'll return to re-clean the affected areas at no extra cost. For end-of-tenancy cleans, we guarantee your deposit back.
                    </div>
                </div>
            </div>
            
            <div class="ts-faq-item" style="background: white; margin-bottom: 1rem; border-radius: 0.75rem; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <div class="ts-faq-question" style="padding: 1.5rem; cursor: pointer; font-weight: 600; color: #1e293b; border-bottom: 1px solid #e2e8f0;" onclick="toggleFAQ(this)">
                    <span>What areas do you cover?</span>
                    <span class="ts-faq-icon" style="float: right; font-size: 1.25rem;">+</span>
                </div>
                <div class="ts-faq-answer" style="padding: 0 1.5rem; max-height: 0; overflow: hidden; transition: all 0.3s ease;">
                    <div style="padding: 1.5rem 0; color: #64748b; line-height: 1.6;">
                        We cover the entire North East region including Newcastle upon Tyne, Sunderland, Durham, Middlesbrough, Gateshead, Hartlepool, and surrounding areas. Contact us to confirm we cover your specific location.
                    </div>
                </div>
            </div>
            
            <div class="ts-faq-item" style="background: white; margin-bottom: 1rem; border-radius: 0.75rem; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <div class="ts-faq-question" style="padding: 1.5rem; cursor: pointer; font-weight: 600; color: #1e293b; border-bottom: 1px solid #e2e8f0;" onclick="toggleFAQ(this)">
                    <span>How quickly can you provide a cleaning service?</span>
                    <span class="ts-faq-icon" style="float: right; font-size: 1.25rem;">+</span>
                </div>
                <div class="ts-faq-answer" style="padding: 0 1.5rem; max-height: 0; overflow: hidden; transition: all 0.3s ease;">
                    <div style="padding: 1.5rem 0; color: #64748b; line-height: 1.6;">
                        We offer same-day and next-day cleaning services subject to availability. For urgent cleans, call us directly and we'll do our best to accommodate your schedule. Regular bookings can be arranged at your convenience.
                    </div>
                </div>
            </div>
            
        </div>
        
    </div>
</section>

<script>
function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector('.ts-faq-icon');
    const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';
    
    if (isOpen) {
        answer.style.maxHeight = '0px';
        icon.textContent = '+';
    } else {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        icon.textContent = '−';
    }
}
</script>