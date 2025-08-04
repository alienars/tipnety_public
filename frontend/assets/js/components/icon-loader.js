/**
 * Icon Loader Component
 * Handles dynamic loading of SVG icons with optional skeleton loading effect
 */

// Icon loader configuration
export const iconLoaderConfig = {
    // Enable/disable skeleton loading effect
    enabled: true,
    // Delay before showing loaded icon (milliseconds)
    delay: 0
};

// Override config with window globals if defined
if (typeof window !== "undefined") {
    if (window.iconSkeletonEnabled !== undefined) {
        iconLoaderConfig.enabled = window.iconSkeletonEnabled;
    }
    if (window.iconSkeletonDelay !== undefined) {
        iconLoaderConfig.delay = window.iconSkeletonDelay;
    }
}

/**
 * Load and replace all unloaded icons in the document
 */
export function loadIcons() {
    document.querySelectorAll("i-con:not([data-loaded])").forEach(async (iconElement) => {
        const iconName = iconElement.getAttribute("name") || 
                        iconElement.getAttribute("data-icon");
        if (!iconName) return;

        // Set initial loading state
        iconElement.dataset.loaded = iconLoaderConfig.enabled ? "loading" : "pending";

        // Setup placeholder if enabled
        let placeholder;
        if (iconLoaderConfig.enabled) {
            placeholder = document.createElement("span");
            placeholder.className = "icon-placeholder";
            iconElement.innerHTML = "";
            iconElement.appendChild(placeholder);
        } else {
            iconElement.innerHTML = "";
        }

        try {
            // Replace icon with loaded SVG
            const replaceIcon = (node) => {
                const action = () => {
                    if (iconLoaderConfig.enabled) {
                        placeholder.replaceWith(node);
                    } else {
                        iconElement.appendChild(node);
                    }
                    requestAnimationFrame(() => node.classList.remove("opacity-0"));
                    iconElement.dataset.loaded = "true";
                };

                if (iconLoaderConfig.enabled && iconLoaderConfig.delay > 0) {
                    setTimeout(action, iconLoaderConfig.delay);
        } else {
          action();
        }
      };

            // Handle PNG icons
            if (iconName.toLowerCase().endsWith(".png")) {
                const img = new Image();
                img.src = `/assets/icons/${iconName}`;
                img.alt = iconElement.getAttribute("alt") || 
                         iconName.replace(".png", "");
                img.setAttribute("aria-hidden", "true");
                img.setAttribute("role", "img");
                img.className = "w-full h-full object-contain opacity-0 transition-opacity duration-300";
                img.onload = () => replaceIcon(img);
            } 
            // Handle SVG icons
            else {
                const response = await fetch(`/assets/icons/${iconName}.svg`);
                if (!response.ok) throw new Error(`Icon not found: ${iconName}`);
                
                const svgText = await response.text();
                const parser = new DOMParser();
                const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
                const svgNode = svgDoc.documentElement;

                // Remove fixed dimensions for responsive sizing
                svgNode.removeAttribute("width");
                svgNode.removeAttribute("height");

                // Set accessibility attributes
                svgNode.setAttribute("aria-hidden", "true");
                svgNode.setAttribute("role", "img");

                // Apply existing classes and animation classes
                const existingClasses = iconElement.getAttribute("class") || "";
                svgNode.setAttribute("class", 
                    existingClasses + " opacity-0 transition-opacity duration-300");

                replaceIcon(svgNode);
            }
        } catch (error) {
            console.error("Error loading icon:", error);
            iconElement.innerHTML = "";
            iconElement.dataset.loaded = "error";
        }
    });
}

// Initialize icons on page load
document.addEventListener("DOMContentLoaded", loadIcons);

// Watch for dynamically added icons
const observer = new MutationObserver((mutations) => {
    if (mutations.some((mutation) => 
        mutation.addedNodes.length > 0 && 
        mutation.target.nodeType === 1)) {
        loadIcons();
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
