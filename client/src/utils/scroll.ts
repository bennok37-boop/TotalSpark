/**
 * Scrolls to the quote form section smoothly
 * If the quote form is not found on the current page, navigates to homepage first
 */
export function scrollToQuoteForm(): void {
  const quoteForm = document.getElementById('quote-form');
  
  if (quoteForm) {
    // Quote form exists on current page, scroll to it with manual offset
    const headerHeight = 80; // Account for sticky header
    const elementTop = quoteForm.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementTop - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    
    // Focus the first input after scrolling completes
    setTimeout(() => {
      const firstInput = quoteForm.querySelector('input[data-testid="input-name"]') as HTMLInputElement;
      if (firstInput) {
        firstInput.focus();
        // Also ensure it's visible by scrolling if needed
        firstInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 800); // Increased timeout to ensure scroll completes
  } else {
    // Quote form not found, navigate to homepage with hash
    window.location.href = '/#quote-form';
  }
}