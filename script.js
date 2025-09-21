
//eventlisteners
document.addEventListener('DOMContentLoaded', function(){
    const html = new HTMLUI()
    html.displayYears()
    
    // اتصال رویداد کلیک به دکمه ارسال
    document.querySelector('.btn_send').addEventListener('click', function(e) {
        e.preventDefault();
        calculateInsurance();
    });
})

// تابع اصلی
function HTMLUI(){
    // سال پایه شمسی (1404) - اینجا می‌توانید هر سالی را تنظیم کنید
    this.baseYear = 1404;
    
    // قیمت پایه خودروها (قیمت کارخانه به میلیون تومان)
    this.carPrices = {
        "pride 132": 300,
        "peugeot 206": 450,
        "samand suren +": 1200,
        "saina": 525,
        "tiba": 400,
        "dena +": 1500,
        "peugeot pars": 600,
        "renoit p90": 500,
        "peugeot 405": 400,
        "peugeot 207": 650,
        "quick": 600,
        "lamari": 2000,
        "arisan": 810,
        "tara": 950,
        "atlas": 900,
        "pride 111": 250,
        "shahin 2": 1000,
        "samand lx": 390,
        "sahand": 490,
        "tego 8 pro max": 2100,
        "tego 8 pro": 1790,
        "tego 7 pro": 1690,
        "tege 7": 1400,
        "arizo 6 pro max": 1890,
        "arizo 6 pro": 1690,
        "arizo 6": 1500,
        "arizo 5 pro": 1490,
        "arizo 5": 1150,
        "jac s5": 1200,
        "Azera 2010": 900,
        "sunata": 1000,
        "toyota FH 2019": 15000,
        "toyota landcroser 2022": 20000,
        "Rangrower 2024": 42000,
        "santafe": 2000
    };
}

// نمایش سال‌ها در سلکت
HTMLUI.prototype.displayYears = function (){
    // پیدا کردن سلکت مدل ساخت (دومین سلکت در صفحه)
    const yearSelect = document.querySelectorAll('select')[1];
    
    // پاک کردن گزینه‌های موجود
    yearSelect.innerHTML = '';
    
    // اضافه کردن گزینه پیش‌فرض
    const defaultOption = document.createElement('option');
    defaultOption.textContent = 'سال ساخت را انتخاب کنید';
    defaultOption.value = '';
    yearSelect.appendChild(defaultOption);
    
    // اضافه کردن 20 سال اخیر به صورت نزولی (از جدید به قدیم)
    for(let i = this.baseYear; i >= this.baseYear - 19; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        yearSelect.appendChild(option);
    }
    
    console.log('سال‌های ' + (this.baseYear - 19) + ' تا ' + this.baseYear + ' نمایش داده شدند');
}

// تابع برای آپدیت خودکار سال (هر سال یک بار اجرا شود)
HTMLUI.prototype.updateForNewYear = function() {
    // تاریخ امروز
    const today = new Date();
    const currentYear = today.getFullYear();
    
    // تاریخ نوروز امسال (21 مارس)
    const nowruzThisYear = new Date(currentYear, 2, 21); // 21 مارس
    
    // تاریخ نوروز سال بعد (21 مارس سال بعد)
    const nowruzNextYear = new Date(currentYear + 1, 2, 21); // 21 مارس سال بعد
    
    // اگر امروز بعد از نوروز امسال است
    if (today >= nowruzThisYear) {
        // سال شمسی = سال پایه + (سال میلادی فعلی - 2023)
        // 2023 سال میلادی مربوط به 1402 است
        const yearsSince2023 = currentYear - 2023;
        this.baseYear = 1402 + yearsSince2023;
        
        console.log('سال به صورت خودکار به ' + this.baseYear + ' آپدیت شد');
    }
    
    this.displayYears();
}

// ایجاد نمونه و آپدیت خودکار
const html = new HTMLUI();
html.updateForNewYear();

// تابع برای نمایش/پنهان کردن لودینگ
function showLoading() {
  document.getElementById('loading').style.display = 'flex';
}

function hideLoading() {
  document.getElementById('loading').style.display = 'none';
}

// تابع برای بستن صفحه نتیجه
function closeResult() {
    document.getElementById('result').style.display = 'none';
}

// تابع برای نمایش لودینگ و محاسبه قیمت
function calculateInsurance() {
    // دریافت مقادیر از فرم
    const makeSelect = document.getElementById('make');
    const yearSelect = document.querySelectorAll('select')[1];
    const insuranceType = document.querySelector('input[name="radio1"]:checked');
    
    // بررسی خطاها
    let hasError = false;
    
    // پاک کردن پیغام‌های خطای قبلی
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    
    // بررسی مدل خودرو
    if (!makeSelect.value) {
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = 'لطفاً مدل خودرو را انتخاب کنید';
        makeSelect.parentNode.appendChild(error);
        error.style.display = 'block';
        hasError = true;
    }
    
    // بررسی سال ساخت
    if (!yearSelect.value) {
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = 'لطفاً سال ساخت را انتخاب کنید';
        yearSelect.parentNode.appendChild(error);
        error.style.display = 'block';
        hasError = true;
    }
    
    // اگر خطایی وجود دارد، متوقف شو
    if (hasError) return;
    
    // نمایش صفحه لودینگ
    showLoading();
    
    // شبیه سازی تاخیر برای محاسبه (3 ثانیه)
    setTimeout(function() {
        // دریافت مقادیر
        const make = makeSelect.value;
        const year = parseInt(yearSelect.value);
        const isComprehensive = insuranceType.id === 'radio2';
        
        // محاسبه قیمت بیمه
        const carPrice = html.carPrices[make] * 1000000; // تبدیل به تومان
        const currentYear = html.baseYear;
        const carAge = currentYear - year;
        
        // محاسبه قیمت بیمه بر اساس سن خودرو و نوع بیمه
        let insurancePrice;
        
        if (isComprehensive) {
            // بیمه کامل: 5% قیمت خودرو برای سال اول، کاهش 0.5% برای هر سال
            const percentage = 1.5 - (carAge * 0.2);
            insurancePrice = Math.max(1, percentage) / 100 * carPrice;
        } else {
            // بیمه شخص ثالث: 2.5% قیمت خودرو برای سال اول، کاهش 0.3% برای هر سال
            const percentage = 0.8 - (carAge * 0.3);
            insurancePrice = Math.max(0.2, percentage) / 100 * carPrice;
        }
        
        // گرد کردن به میلیون تومان
        insurancePrice = Math.round(insurancePrice / 100000) * 100000;
        
        // پنهان کردن لودینگ
        hideLoading();
        
        // نمایش نتیجه
        const resultElement = document.getElementById('result-text');
        resultElement.innerHTML = `
            <p><strong>مدل خودرو:</strong> ${make}</p>
            <p><strong>سال ساخت:</strong> ${year}</p>
            <p><strong>نوع بیمه:</strong> ${isComprehensive ? 'کامل (شخص ثالث با بیمه بدنه)' : 'ساده (شخص ثالث)'}</p>
            <p><strong>قیمت خودرو:</strong> ${(html.carPrices[make]).toLocaleString()} میلیون تومان</p>
            <p><strong>قیمت بیمه:</strong> ${(insurancePrice/1000000).toLocaleString()} میلیون تومان</p>
            <p style="color: #ffcc00; margin-top: 15px;">* این قیمت تقریبی است و برای اطلاعات دقیق‌تر به نمایندگی بیمه مراجعه کنید</p>
        `;
        
        document.getElementById('result').style.display = 'flex';
    }, 3000);
}

// اضافه کردن استایل برای پیغام خطا
const errorStyle = document.createElement('style');
errorStyle.textContent = `
    .error-message {
        color: #ff6b6b;
        font-size: 14px;
        margin-top: 5px;
        font-family: vazer;
    }
`;
document.head.appendChild(errorStyle);

