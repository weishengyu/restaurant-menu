// 主應用程式控制器

class SmallDishesApp {
    constructor() {
        this.navigation = null;
        this.productDisplay = null;
        this.isInitialized = false;
        this.contactForm = null;
        
        // 等待DOM載入完成
        if (document.readyState === 'loading') {
            DOMUtils.addEvent(document, 'DOMContentLoaded', () => {
                this.init();
            });
        } else {
            this.init();
        }
    }

    init() {
        try {
            // 初始化各個模組
            this.initializeModules();
            
            // 綁定全域事件
            this.bindGlobalEvents();
            
            // 設置頁面動畫
            this.setupPageAnimations();
            
            // 初始化表單處理
            this.initializeForms();
            
            // 設置性能監控
            this.setupPerformanceMonitoring();
            
            this.isInitialized = true;
            console.log('小菜展示網站初始化完成');
            
        } catch (error) {
            console.error('應用程式初始化失敗:', error);
            this.handleInitError(error);
        }
    }

    initializeModules() {
        // 初始化導航模組
        this.navigation = new Navigation();
        
        // 初始化產品展示模組
        this.productDisplay = new ProductDisplay();
        
        // 全域暴露實例供HTML調用
        window.navigation = this.navigation;
        window.productDisplay = this.productDisplay;
    }

    bindGlobalEvents() {
        // 視窗載入完成事件
        DOMUtils.addEvent(window, 'load', () => {
            this.onPageLoad();
        });

        // 視窗大小改變事件
        DOMUtils.addEvent(window, 'resize', Utils.debounce(() => {
            this.handleWindowResize();
        }, 250));

        // 頁面可見性改變事件
        DOMUtils.addEvent(document, 'visibilitychange', () => {
            this.handleVisibilityChange();
        });

        // 錯誤處理
        DOMUtils.addEvent(window, 'error', (e) => {
            this.handleGlobalError(e);
        });

        // 未處理的Promise拒絕
        DOMUtils.addEvent(window, 'unhandledrejection', (e) => {
            this.handleUnhandledRejection(e);
        });
    }

    setupPageAnimations() {
        // 設置滾動動畫觀察器
        const animationOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };

        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    DOMUtils.addClass(element, 'visible');
                    
                    // 添加漸入動畫
                    AnimationUtils.slideIn(element, 'up', 600);
                }
            });
        }, animationOptions);

        // 觀察需要動畫的元素
        const animatedElements = DOMUtils.selectAll('.fade-in, .section-title, .featured-item, .about-content, .contact-content');
        animatedElements.forEach(element => {
            animationObserver.observe(element);
        });

        this.animationObserver = animationObserver;
    }

    initializeForms() {
        // 聯繫表單處理
        this.contactForm = DOMUtils.select('#contact-form');
        if (this.contactForm) {
            DOMUtils.addEvent(this.contactForm, 'submit', (e) => {
                this.handleContactFormSubmit(e);
            });

            // 即時驗證
            const formInputs = this.contactForm.querySelectorAll('input, textarea');
            formInputs.forEach(input => {
                DOMUtils.addEvent(input, 'blur', () => {
                    this.validateFormField(input);
                });
                
                DOMUtils.addEvent(input, 'input', Utils.debounce(() => {
                    this.validateFormField(input);
                }, 500));
            });
        }
    }

    handleContactFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        // 驗證表單
        if (!this.validateContactForm(data)) {
            return;
        }

        // 顯示提交中狀態
        this.showFormSubmitting();

        // 模擬表單提交（實際應用中這裡會發送到伺服器）
        setTimeout(() => {
            this.handleFormSubmitSuccess(data);
        }, 2000);
    }

    validateContactForm(data) {
        let isValid = true;
        const errors = {};

        // 驗證姓名
        if (!ValidationUtils.isRequired(data.name)) {
            errors.name = '請輸入您的姓名';
            isValid = false;
        } else if (!ValidationUtils.minLength(data.name, 2)) {
            errors.name = '姓名至少需要2個字元';
            isValid = false;
        }

        // 驗證電子郵件
        if (!ValidationUtils.isRequired(data.email)) {
            errors.email = '請輸入電子郵件地址';
            isValid = false;
        } else if (!ValidationUtils.isValidEmail(data.email)) {
            errors.email = '請輸入有效的電子郵件地址';
            isValid = false;
        }

        // 驗證訊息
        if (!ValidationUtils.isRequired(data.message)) {
            errors.message = '請輸入您的訊息';
            isValid = false;
        } else if (!ValidationUtils.minLength(data.message, 10)) {
            errors.message = '訊息至少需要10個字元';
            isValid = false;
        }

        // 顯示錯誤訊息
        this.displayFormErrors(errors);

        return isValid;
    }

    validateFormField(input) {
        const fieldName = input.name;
        const value = input.value;
        let errorMessage = '';

        switch (fieldName) {
            case 'name':
                if (!ValidationUtils.isRequired(value)) {
                    errorMessage = '請輸入您的姓名';
                } else if (!ValidationUtils.minLength(value, 2)) {
                    errorMessage = '姓名至少需要2個字元';
                }
                break;
                
            case 'email':
                if (!ValidationUtils.isRequired(value)) {
                    errorMessage = '請輸入電子郵件地址';
                } else if (!ValidationUtils.isValidEmail(value)) {
                    errorMessage = '請輸入有效的電子郵件地址';
                }
                break;
                
            case 'message':
                if (!ValidationUtils.isRequired(value)) {
                    errorMessage = '請輸入您的訊息';
                } else if (!ValidationUtils.minLength(value, 10)) {
                    errorMessage = '訊息至少需要10個字元';
                }
                break;
        }

        this.displayFieldError(input, errorMessage);
    }

    displayFormErrors(errors) {
        Object.keys(errors).forEach(fieldName => {
            const field = this.contactForm.querySelector(`[name="${fieldName}"]`);
            if (field) {
                this.displayFieldError(field, errors[fieldName]);
            }
        });
    }

    displayFieldError(field, errorMessage) {
        // 移除現有錯誤訊息
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }

        if (errorMessage) {
            // 添加錯誤樣式
            DOMUtils.addClass(field, 'error');
            
            // 創建錯誤訊息元素
            const errorElement = DOMUtils.create('div', 'field-error');
            errorElement.textContent = errorMessage;
            field.parentNode.appendChild(errorElement);
        } else {
            // 移除錯誤樣式
            DOMUtils.removeClass(field, 'error');
        }
    }

    showFormSubmitting() {
        const submitButton = this.contactForm.querySelector('.submit-button');
        if (submitButton) {
            submitButton.textContent = '送出中...';
            submitButton.disabled = true;
            DOMUtils.addClass(submitButton, 'submitting');
        }
    }

    handleFormSubmitSuccess(data) {
        // 儲存聯繫記錄到localStorage
        const contacts = StorageUtils.getLocal('contacts') || [];
        contacts.push({
            ...data,
            timestamp: new Date().toISOString(),
            id: Utils.generateId()
        });
        StorageUtils.setLocal('contacts', contacts);

        // 顯示成功訊息
        this.showSuccessMessage('訊息已成功送出！我們會盡快與您聯繫。');

        // 重置表單
        this.contactForm.reset();
        
        // 重置提交按鈕
        const submitButton = this.contactForm.querySelector('.submit-button');
        if (submitButton) {
            submitButton.textContent = '送出訊息';
            submitButton.disabled = false;
            DOMUtils.removeClass(submitButton, 'submitting');
        }

        // 清除所有錯誤狀態
        const errorFields = this.contactForm.querySelectorAll('.error');
        errorFields.forEach(field => {
            DOMUtils.removeClass(field, 'error');
        });

        const errorMessages = this.contactForm.querySelectorAll('.field-error');
        errorMessages.forEach(error => error.remove());
    }

    showSuccessMessage(message) {
        const successDiv = DOMUtils.create('div', 'success-message');
        successDiv.innerHTML = `
            <div class="success-content">
                <div class="success-icon">✓</div>
                <p>${message}</p>
            </div>
        `;

        document.body.appendChild(successDiv);

        // 顯示動畫
        AnimationUtils.slideIn(successDiv, 'down', 400);

        // 3秒後自動隱藏
        setTimeout(() => {
            AnimationUtils.fadeOut(successDiv, 400);
            setTimeout(() => {
                if (document.body.contains(successDiv)) {
                    document.body.removeChild(successDiv);
                }
            }, 400);
        }, 3000);
    }

    setupPerformanceMonitoring() {
        // 監控頁面載入性能
        DOMUtils.addEvent(window, 'load', () => {
            if ('performance' in window) {
                const navigation = performance.getEntriesByType('navigation')[0];
                console.log('頁面載入時間:', navigation.loadEventEnd - navigation.loadEventStart, 'ms');
                console.log('DOM內容載入時間:', navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart, 'ms');
            }
        });

        // 監控記憶體使用（如果支援）
        if ('memory' in performance) {
            setInterval(() => {
                const memory = performance.memory;
                if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.9) {
                    console.warn('記憶體使用量接近上限');
                }
            }, 30000); // 每30秒檢查一次
        }
    }

    onPageLoad() {
        // 隱藏載入畫面（如果有的話）
        const loader = DOMUtils.select('.page-loader');
        if (loader) {
            AnimationUtils.fadeOut(loader, 500);
            setTimeout(() => {
                if (document.body.contains(loader)) {
                    document.body.removeChild(loader);
                }
            }, 500);
        }

        // 添加頁面載入完成的類名
        DOMUtils.addClass(document.body, 'page-loaded');

        // 預載入圖片
        this.preloadImages();

        console.log('頁面載入完成');
    }

    preloadImages() {
        const imagesToPreload = [
            'src/main/resources/images/featured-1.jpg',
            'src/main/resources/images/featured-2.jpg',
            'src/main/resources/images/featured-3.jpg',
            'src/main/resources/images/about-us.jpg'
        ];

        imagesToPreload.forEach(imageSrc => {
            const img = new Image();
            img.src = imageSrc;
        });
    }

    handleWindowResize() {
        // 處理視窗大小改變
        if (this.productDisplay) {
            // 重新計算產品網格佈局
            this.productDisplay.refresh();
        }

        console.log('視窗大小已改變:', ResponsiveUtils.getViewportSize());
    }

    handleVisibilityChange() {
        if (document.hidden) {
            // 頁面隱藏時暫停動畫等
            console.log('頁面已隱藏');
        } else {
            // 頁面顯示時恢復動畫等
            console.log('頁面已顯示');
        }
    }

    handleGlobalError(error) {
        console.error('全域錯誤:', error);
        
        // 錯誤追蹤和報告（實際應用中可能會發送到錯誤監控服務）
        const errorInfo = {
            message: error.message,
            filename: error.filename,
            lineno: error.lineno,
            colno: error.colno,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };

        // 儲存錯誤記錄到localStorage
        const errors = StorageUtils.getLocal('errors') || [];
        errors.push(errorInfo);
        StorageUtils.setLocal('errors', errors.slice(-10)); // 只保留最近10個錯誤
    }

    handleUnhandledRejection(event) {
        console.error('未處理的Promise拒絕:', event.reason);
        event.preventDefault(); // 防止錯誤被拋到控制台
    }

    handleInitError(error) {
        // 顯示友好的錯誤訊息給使用者
        const errorContainer = DOMUtils.create('div', 'init-error');
        errorContainer.innerHTML = `
            <div class="error-content">
                <h2>載入發生問題</h2>
                <p>很抱歉，網站載入時發生了問題。請嘗試重新整理頁面。</p>
                <button onclick="location.reload()" class="cta-button">重新整理</button>
            </div>
        `;

        document.body.appendChild(errorContainer);
    }

    // 公共API方法
    getAppStatus() {
        return {
            isInitialized: this.isInitialized,
            modules: {
                navigation: !!this.navigation,
                productDisplay: !!this.productDisplay
            },
            viewport: ResponsiveUtils.getViewportSize(),
            userAgent: navigator.userAgent
        };
    }

    // 重新初始化應用程式
    reinitialize() {
        this.destroy();
        this.init();
    }

    // 銷毀應用程式
    destroy() {
        // 銷毀模組
        if (this.navigation) {
            this.navigation.destroy();
            this.navigation = null;
        }

        if (this.productDisplay) {
            this.productDisplay.destroy();
            this.productDisplay = null;
        }

        // 斷開觀察器
        if (this.animationObserver) {
            this.animationObserver.disconnect();
            this.animationObserver = null;
        }

        this.isInitialized = false;
        console.log('應用程式已銷毀');
    }
}

// 創建全域應用程式實例
window.smallDishesApp = new SmallDishesApp();

// 導出應用程式類供其他模組使用
window.SmallDishesApp = SmallDishesApp;