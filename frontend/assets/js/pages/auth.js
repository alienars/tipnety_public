// این تابع کارخانه‌ای است که Alpine از آن برای x-data استفاده می‌کند
export function authForm() {
    return {
        step: 'phone_entry', // 'phone_entry' یا 'otp_entry'
        userInput: '',
        
        // تنظیمات تایمر برای ارسال مجدد کد
        timer: {
            interval: null,
            totalSeconds: 90,       // ✅ زمان به ۹۰ ثانیه تغییر کرد
            remainingSeconds: 90,   // ✅ زمان به ۹۰ ثانیه تغییر کرد
            display: "۰۱:۳۰",       // ✅ نمایش اولیه اصلاح شد
            expired: false,

            start() {
                this.expired = false;
                this.remainingSeconds = this.totalSeconds;
                this.display = this.formatTime(this.remainingSeconds);
                
                this.interval = setInterval(() => {
                    this.remainingSeconds--;
                    this.display = this.formatTime(this.remainingSeconds);

                    if (this.remainingSeconds <= 0) {
                        clearInterval(this.interval);
                        this.expired = true;
                    }
                }, 1000);
            },

            formatTime(seconds) {
                const minutes = Math.floor(seconds / 60);
                const secs = seconds % 60;
                // تبدیل به کاراکترهای فارسی
                const faMinutes = String(minutes).padStart(2, '0').replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
                const faSecs = String(secs).padStart(2, '0').replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
                return `${faMinutes}:${faSecs}`;
            }
        },

        goToOtpStep() {
            if (this.userInput.trim()) {
                this.step = 'otp_entry';
                this.timer.start(); // شروع تایمر
            }
            Alpine.store("notifications").success("ارسال موفق!", "کد جدید با موفقیت برای شما ارسال شد.", 3000);
        },

        resetTimer() {
            this.timer.start();
            
        }
    }
}


// اطمینان از اینکه فانکشن در دسترس Alpine قرار می‌گیرد
window.authForm = authForm;

// این تابع برای هر منطق جانبی صفحه‌ی auth (ایونت‌ها، AJAX و …)
export function initAuthPage() {
    console.log("Auth page scripts initialized.");
    // در اینجا می‌توانید کدهای دیگری که فقط مربوط به صفحه ورود هستند را اضافه کنید.
}
