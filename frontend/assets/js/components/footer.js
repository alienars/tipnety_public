/**
 * Footer Component Initialization
 * Handles the expandable footer description functionality
 */
export function initFooter() {
    const toggleBtn = document.getElementById("toggle-footer-desc");
    if (!toggleBtn) return;

    /**
     * Toggle footer description visibility
     * Controls the expand/collapse state of the description box
     */
    function handleToggle() {
        const descBox = document.getElementById("footer-desc");
        if (!descBox) return;

        const isCollapsed = descBox.classList.contains("max-h-20");
        const btnText = toggleBtn.querySelector("span");
        const btnIcon = toggleBtn.querySelector("svg");

        if (isCollapsed) {
            // Expand description
            descBox.classList.remove("max-h-20");
            descBox.classList.add("max-h-screen");
            btnText.textContent = toggleBtn.dataset.textLess;
            btnIcon.style.transform = "rotate(180deg)";
        } else {
            // Collapse description
            descBox.classList.remove("max-h-screen");
            descBox.classList.add("max-h-20");
            btnText.textContent = toggleBtn.dataset.textMore;
            btnIcon.style.transform = "rotate(0deg)";
        }
    }

    // Initialize click handler
    toggleBtn.addEventListener("click", handleToggle);
}
