/**
 * Countdown Timer Component
 * Initializes countdown timers across the site
 */
export function initCountdowns() {
    document.querySelectorAll('.countdown-timer').forEach(countdownContainer => {
        // Get time display elements
        const timeSpans = {
            hours: countdownContainer.querySelector('[data-time="hours"]'),
            minutes: countdownContainer.querySelector('[data-time="minutes"]'),
            seconds: countdownContainer.querySelector('[data-time="seconds"]')
        };

        // Validate required elements exist
        if (!timeSpans.hours || !timeSpans.minutes || !timeSpans.seconds) return;

        // Set end time (example: 2 hours, 48 minutes, 24 seconds from now)
        const endTime = new Date().getTime() + 
            (2 * 60 * 60 * 1000) +  // 2 hours
            (48 * 60 * 1000) +      // 48 minutes
            (24 * 1000);            // 24 seconds
        
        // Start countdown update interval
        const timerInterval = setInterval(() => {
            const now = new Date().getTime();
            const distance = endTime - now;

            // Handle expired timer
            if (distance < 0) {
                clearInterval(timerInterval);
                countdownContainer.innerHTML = 
                    "<span class='text-red-500 font-bold'>پایان یافت!</span>";
                return;
            }

            // Calculate time components
            const h = String(Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            )).padStart(2, '0');
            
            const m = String(Math.floor(
                (distance % (1000 * 60 * 60)) / (1000 * 60)
            )).padStart(2, '0');
            
            const s = String(Math.floor(
                (distance % (1000 * 60)) / 1000
            )).padStart(2, '0');

            // Update display
            timeSpans.hours.textContent = h;
            timeSpans.minutes.textContent = m;
            timeSpans.seconds.textContent = s;
        }, 1000);
    });
}
