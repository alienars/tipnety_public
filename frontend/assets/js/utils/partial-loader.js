/**
 * HTML Partials Loader
 * Dynamically loads HTML partial files marked with data-include attribute
 * Uses Vite's glob import for efficient loading
 */
export async function loadPartials() {
    // Find all elements that need to include partials
    const elements = document.querySelectorAll('[data-include]');
    if (elements.length === 0) return;

    // Import all HTML partials using Vite's glob import
    const modules = import.meta.glob('/partials/**/*.html', {
        eager: true,
        query: '?raw'
    });

    // Process each element with data-include
    Array.from(elements).forEach(el => {
        const path = el.getAttribute('data-include');
        if (modules[path]) {
            el.innerHTML = modules[path].default;
            el.removeAttribute('data-include');
        } else {
            console.error('Partial not found:', path);
        }
    });

    // Recursively load any newly added partials
    if (document.querySelectorAll('[data-include]').length > 0) {
        await loadPartials();
    }
}
