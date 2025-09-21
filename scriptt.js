document.addEventListener('DOMContentLoaded', function() {
    // عناصر DOM
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginContainer = document.querySelector('.login-form');
    const registerContainer = document.querySelector('.register-form');
    const showRegisterBtn = document.getElementById('showRegister');
    const showLoginBtn = document.getElementById('showLogin');
    const toggleLoginPassword = document.getElementById('toggleLoginPassword');
    const toggleRegisterPassword = document.getElementById('toggleRegisterPassword');
    const loginPassword = document.getElementById('loginPassword');
    const registerPassword = document.getElementById('registerPassword');
    const panelButton = document.getElementById('panelButton');
    const forgotPassword = document.getElementById('forgotPassword');

    // نمایش فرم ثبت نام
    showRegisterBtn.addEventListener('click', function(e) {
        e.preventDefault();
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'flex';
    });

    // نمایش فرم ورود
    showLoginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        registerContainer.style.display = 'none';
        loginContainer.style.display = 'flex';
    });

    // نمایش/مخفی کردن رمز عبور در فرم ورود
    toggleLoginPassword.addEventListener('click', function() {
        const type = loginPassword.getAttribute('type') === 'password' ? 'text' : 'password';
        loginPassword.setAttribute('type', type);
        this.querySelector('i').classList.toggle('fa-eye');
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });

    // نمایش/مخفی کردن رمز عبور در فرم ثبت نام
    toggleRegisterPassword.addEventListener('click', function() {
        const type = registerPassword.getAttribute('type') === 'password' ? 'text' : 'password';
        registerPassword.setAttribute('type', type);
        this.querySelector('i').classList.toggle('fa-eye');
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });

    // اعتبارسنجی فرم ورود
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        if (!validateEmail(email)) {
            showError('لطفاً یک ایمیل معتبر وارد کنید');
            return;
        }
        
        if (password.length < 6) {
            showError('رمز عبور باید حداقل 6 کاراکتر باشد');
            return;
        }
        
        // شبیه‌سازی ارسال درخواست به سرور
        simulateLogin(email, password);
    });

    // اعتبارسنجی فرم ثبت نام
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const phone = document.getElementById('registerPhone').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        
        if (name.length < 3) {
            showError('نام باید حداقل 3 کاراکتر باشد');
            return;
        }
        
        if (!validateEmail(email)) {
            showError('لطفاً یک ایمیل معتبر وارد کنید');
            return;
        }
        
        if (!validatePhone(phone)) {
            showError('لطفاً شماره تلفن معتبر وارد کنید');
            return;
        }
        
        if (password.length < 6) {
            showError('رمز عبور باید حداقل 6 کاراکتر باشد');
            return;
        }
        
        if (password !== confirmPassword) {
            showError('رمز عبور و تکرار آن مطابقت ندارند');
            return;
        }
        
        // شبیه‌سازی ارسال درخواست به سرور
        simulateRegister(name, email, phone, password);
    });

    // دکمه ورود به پنل
    panelButton.addEventListener('click', function() {
        if (registerContainer.style.display === 'flex') {
            showError('لطفاً ابتدا ثبت نام کنید');
        } else {
            document.getElementById('loginEmail').focus();
        }
    });

    // لینک فراموشی رمز عبور
    forgotPassword.addEventListener('click', function(e) {
        e.preventDefault();
        showError('برای بازیابی رمز عبور، با پشتیبانی تماس بگیرید');
    });

    // اعتبارسنجی ایمیل
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // اعتبارسنجی شماره تلفن
    function validatePhone(phone) {
        const re = /^09[0-9]{9}$/;
        return re.test(phone);
    }

    // نمایش خطا
    function showError(message) {
        // حذع پیغام خطای قبلی اگر وجود دارد
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            background: #ffebee;
            color: #c62828;
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 20px;
            text-align: center;
            border: 1px solid #ef9a9a;
            animation: fadeIn 0.3s ease-out;
        `;
        errorDiv.textContent = message;
        
        const currentForm = registerContainer.style.display === 'flex' ? registerForm : loginForm;
        currentForm.insertBefore(errorDiv, currentForm.firstChild);
        
        // حذف خودکار پیغام خطا بعد از 5 ثانیه
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }

    // شبیه‌سازی ورود
    function simulateLogin(email, password) {
        const submitBtn = loginForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'در حال ورود...';
        submitBtn.disabled = true;
        
        // شبیه‌سازی تاخیر در ارسال درخواست
        setTimeout(() => {
            // ذخیره اطلاعات در localStorage
            localStorage.setItem('userEmail', email);
            localStorage.setItem('isLoggedIn', 'true');
            
            // نمایش موفقیت
            showSuccess('ورود موفقیت‌آمیز بود! در حال انتقال...');
            
            // انتقال به صفحه اصلی بعد از 2 ثانیه
            setTimeout(() => {
                window.location.href = 'insurance.html'; // تغییر به آدرس صفحه اصلی شما
            }, 2000);
        }, 1500);
    }

    // شبیه‌سازی ثبت نام
    function simulateRegister(name, email, phone, password) {
        const submitBtn = registerForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'در حال ایجاد حساب...';
        submitBtn.disabled = true;
        
        // شبیه‌سازی تاخیر در ارسال درخواست
        setTimeout(() => {
            // ذخیره اطلاعات در localStorage
            localStorage.setItem('userName', name);
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userPhone', phone);
            localStorage.setItem('isLoggedIn', 'true');
            
            // نمایش موفقیت
            showSuccess('حساب کاربری با موفقیت ایجاد شد! در حال انتقال...');
            
            // انتقال به صفحه اصلی بعد از 2 ثانیه
            setTimeout(() => {
                window.location.href = 'insurance.html'; // تغییر به آدرس صفحه اصلی شما
            }, 2000);
        }, 1500);
    }

    // نمایش پیغام موفقیت
    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.cssText = `
            background: #e8f5e9;
            color: #2e7d32;
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 20px;
            text-align: center;
            border: 1px solid #a5d6a7;
            animation: fadeIn 0.3s ease-out;
        `;
        successDiv.textContent = message;
        
        const currentForm = registerContainer.style.display === 'flex' ? registerForm : loginForm;
        currentForm.insertBefore(successDiv, currentForm.firstChild);
    }
});
