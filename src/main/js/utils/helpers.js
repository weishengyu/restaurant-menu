// 工具函數庫

// DOM 操作工具
const DOMUtils = {
    // 選擇單個元素
    select(selector) {
        return document.querySelector(selector);
    },

    // 選擇多個元素
    selectAll(selector) {
        return document.querySelectorAll(selector);
    },

    // 創建元素
    create(tag, className = '', attributes = {}) {
        const element = document.createElement(tag);
        if (className) {
            element.className = className;
        }
        Object.keys(attributes).forEach(key => {
            element.setAttribute(key, attributes[key]);
        });
        return element;
    },

    // 添加事件監聽器
    addEvent(element, event, handler) {
        if (element && typeof handler === 'function') {
            element.addEventListener(event, handler);
        }
    },

    // 移除事件監聽器
    removeEvent(element, event, handler) {
        if (element && typeof handler === 'function') {
            element.removeEventListener(event, handler);
        }
    },

    // 切換類名
    toggleClass(element, className) {
        if (element) {
            element.classList.toggle(className);
        }
    },

    // 添加類名
    addClass(element, className) {
        if (element) {
            element.classList.add(className);
        }
    },

    // 移除類名
    removeClass(element, className) {
        if (element) {
            element.classList.remove(className);
        }
    },

    // 檢查是否包含類名
    hasClass(element, className) {
        return element ? element.classList.contains(className) : false;
    },

    // 設置樣式
    setStyle(element, styles) {
        if (element && typeof styles === 'object') {
            Object.keys(styles).forEach(key => {
                element.style[key] = styles[key];
            });
        }
    }
};

// 動畫工具
const AnimationUtils = {
    // 淡入動畫
    fadeIn(element, duration = 300) {
        if (!element) return;
        
        element.style.opacity = '0';
        element.style.display = 'block';
        
        let start = null;
        
        function animate(timestamp) {
            if (!start) start = timestamp;
            const progress = (timestamp - start) / duration;
            
            if (progress < 1) {
                element.style.opacity = progress;
                requestAnimationFrame(animate);
            } else {
                element.style.opacity = '1';
            }
        }
        
        requestAnimationFrame(animate);
    },

    // 淡出動畫
    fadeOut(element, duration = 300) {
        if (!element) return;
        
        let start = null;
        const initialOpacity = parseFloat(window.getComputedStyle(element).opacity) || 1;
        
        function animate(timestamp) {
            if (!start) start = timestamp;
            const progress = (timestamp - start) / duration;
            
            if (progress < 1) {
                element.style.opacity = initialOpacity * (1 - progress);
                requestAnimationFrame(animate);
            } else {
                element.style.opacity = '0';
                element.style.display = 'none';
            }
        }
        
        requestAnimationFrame(animate);
    },

    // 滑入動畫
    slideIn(element, direction = 'down', duration = 300) {
        if (!element) return;
        
        const transforms = {
            down: 'translateY(-20px)',
            up: 'translateY(20px)',
            left: 'translateX(20px)',
            right: 'translateX(-20px)'
        };
        
        element.style.transform = transforms[direction] || transforms.down;
        element.style.opacity = '0';
        element.style.transition = `all ${duration}ms ease`;
        
        setTimeout(() => {
            element.style.transform = 'translate(0)';
            element.style.opacity = '1';
        }, 10);
    }
};

// 滾動工具
const ScrollUtils = {
    // 平滑滾動到指定元素
    scrollToElement(selector, offset = 0) {
        const element = document.querySelector(selector);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    },

    // 滾動到頂部
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    },

    // 獲取滾動位置
    getScrollPosition() {
        return {
            x: window.pageXOffset || document.documentElement.scrollLeft,
            y: window.pageYOffset || document.documentElement.scrollTop
        };
    },

    // 檢查元素是否在視窗中
    isInViewport(element) {
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// 表單驗證工具
const ValidationUtils = {
    // 驗證電子郵件
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // 驗證電話號碼
    isValidPhone(phone) {
        const phoneRegex = /^[0-9\-\+\(\)\s]+$/;
        return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 8;
    },

    // 驗證必填欄位
    isRequired(value) {
        return value && value.toString().trim().length > 0;
    },

    // 驗證最小長度
    minLength(value, min) {
        return value && value.toString().length >= min;
    },

    // 驗證最大長度
    maxLength(value, max) {
        return !value || value.toString().length <= max;
    }
};

// 存儲工具
const StorageUtils = {
    // 設置 localStorage
    setLocal(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error setting localStorage:', error);
            return false;
        }
    },

    // 獲取 localStorage
    getLocal(key) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            console.error('Error getting localStorage:', error);
            return null;
        }
    },

    // 移除 localStorage
    removeLocal(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing localStorage:', error);
            return false;
        }
    },

    // 清除所有 localStorage
    clearLocal() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    }
};

// 工具函數
const Utils = {
    // 防抖函數
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // 節流函數
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // 格式化價格
    formatPrice(price) {
        if (typeof price === 'string' && price.includes('NT$')) {
            return price;
        }
        return `NT$ ${price}`;
    },

    // 截斷文字
    truncateText(text, length = 100) {
        if (text.length <= length) return text;
        return text.substring(0, length) + '...';
    },

    // 生成隨機ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    // 延遲執行
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    // 深拷貝
    deepClone(obj) {
        if (obj === null || typeof obj !== 'object') return obj;
        if (obj instanceof Date) return new Date(obj);
        if (obj instanceof Array) return obj.map(item => this.deepClone(item));
        if (typeof obj === 'object') {
            const copy = {};
            Object.keys(obj).forEach(key => {
                copy[key] = this.deepClone(obj[key]);
            });
            return copy;
        }
    }
};

// 響應式工具
const ResponsiveUtils = {
    // 檢查是否為移動設備
    isMobile() {
        return window.innerWidth <= 768;
    },

    // 檢查是否為平板設備
    isTablet() {
        return window.innerWidth > 768 && window.innerWidth <= 1024;
    },

    // 檢查是否為桌面設備
    isDesktop() {
        return window.innerWidth > 1024;
    },

    // 獲取視窗尺寸
    getViewportSize() {
        return {
            width: window.innerWidth || document.documentElement.clientWidth,
            height: window.innerHeight || document.documentElement.clientHeight
        };
    }
};

// 全局函數（向後兼容）
function scrollToSection(sectionId) {
    ScrollUtils.scrollToElement(`#${sectionId}`, 80);
}

// 導出所有工具
window.DOMUtils = DOMUtils;
window.AnimationUtils = AnimationUtils;
window.ScrollUtils = ScrollUtils;
window.ValidationUtils = ValidationUtils;
window.StorageUtils = StorageUtils;
window.Utils = Utils;
window.ResponsiveUtils = ResponsiveUtils;