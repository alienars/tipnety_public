/**
 * Notification Store Module
 * Manages the application's notification system with animations and auto-dismiss
 */

export function notificationStore() {
    return {
        items: [],
        counter: 0,

        /**
         * Add a new notification
         * @param {Object} notification - Notification data
         */
        add(notification) {
            const id = this.counter++;
            const duration = notification.duration === 0 
                ? Infinity 
                : (notification.duration || 5000);

            // Create notification with closing state flag
            const item = { id, ...notification, closing: false };
            this.items.push(item);

            // Set auto-dismiss timer if duration is finite
            if (duration !== Infinity) {
                setTimeout(() => this.remove(id), duration);
            }
        },

        /**
         * Remove a notification with animation
         * @param {number} id - Notification ID to remove
         */
        remove(id) {
            // Phase 1: Set closing flag for leave animation
            const idx = this.items.findIndex(i => i.id === id);
            if (idx === -1) return;
            this.items[idx].closing = true;

            // Phase 2: Actually remove after animation (500ms)
            setTimeout(() => {
                this.items = this.items.filter(i => i.id !== id);
            }, 500);
        },

        // Convenience methods for different notification types
        success(title, message, duration) {
            this.add({ type: 'success', title, message, duration });
        },
        error(title, message, duration) {
            this.add({ type: 'error', title, message, duration });
        },
        warning(title, message, duration) {
            this.add({ type: 'warning', title, message, duration });
        },
    };
}
