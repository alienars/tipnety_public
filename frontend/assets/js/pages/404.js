import { toPersianNumber } from "../utils/global";

Alpine.data("countdown", () => ({
  totalSeconds: 8,
  countdown: 8,
  progress: 0,
  timer: null,

  init() {
    // اگر تایمر قبلا ساخته شده، دوباره آن را نساز
    if (this.timer) return;

    this.updateProgress();
    this.timer = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
        this.updateProgress();
      } else {
        clearInterval(this.timer);
        window.location.href = "./index.html";
      }
    }, 1000);
  },

  updateProgress() {
    this.progress = 100 - (this.countdown / this.totalSeconds) * 100;
  },

  // این تابع را داخل template صدا می‌زنیم
  formatNumber(num) {
    return toPersianNumber(num);
  },
}));
