// 導航功能模組

class Navigation {
    constructor() {
        this.navbar = DOMUtils.select('.navbar');
        this.navMenu = DOMUtils.select('.nav-menu');
        this.hamburger = DOMUtils.select('.hamburger');
        this.navLinks = DOMUtils.selectAll('.nav-link');
        this.scrollToTopBtn = DOMUtils.select('.scroll-to-top');
        
        this.isMenuOpen = false;
        this.lastScrollTop = 0;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.handleScroll();
    }

    bindEvents() {
        // 漢堡選單點擊事件
        if (this.hamburger) {
            DOMUtils.addEvent(this.hamburger, 'click', () => {
                this.toggleMobileMenu();
            });
        }

        // 導航連結點擊事件
        this.navLinks.forEach(link => {
            DOMUtils.addEvent(link, 'click', (e) => {
                this.handleNavLinkClick(e);
            });
        });

        // 滾動事件
        DOMUtils.addEvent(window, 'scroll', Utils.throttle(() => {
            this.handleScroll();
        }, 100));

        // 回到頂部按鈕事件
        if (this.scrollToTopBtn) {
            DOMUtils.addEvent(this.scrollToTopBtn, 'click', () => {
                ScrollUtils.scrollToTop();
            });
        }

        // 視窗大小改變事件
        DOMUtils.addEvent(window, 'resize', Utils.debounce(() => {
            this.handleResize();
        }, 250));

        // 點擊空白處關閉選單
        DOMUtils.addEvent(document, 'click', (e) => {
            this.handleDocumentClick(e);
        });
    }

    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        
        if (this.isMenuOpen) {
            this.openMobileMenu();
        } else {
            this.closeMobileMenu();
        }
    }

    openMobileMenu() {
        DOMUtils.addClass(this.hamburger, 'active');
        DOMUtils.addClass(this.navMenu, 'active');
        
        // 防止背景滾動
        document.body.style.overflow = 'hidden';
        
        // 添加動畫效果
        this.navLinks.forEach((link, index) => {
            setTimeout(() => {
                AnimationUtils.slideIn(link, 'down', 200);
            }, index * 50);
        });
    }

    closeMobileMenu() {
        DOMUtils.removeClass(this.hamburger, 'active');
        DOMUtils.removeClass(this.navMenu, 'active');
        
        // 恢復背景滾動
        document.body.style.overflow = '';
        
        this.isMenuOpen = false;
    }

    handleNavLinkClick(e) {
        const href = e.target.getAttribute('href');
        
        // 檢查是否為錨點連結
        if (href && href.startsWith('#')) {
            e.preventDefault();
            
            // 關閉移動選單
            this.closeMobileMenu();
            
            // 滾動到目標區域
            const targetId = href.substring(1);
            ScrollUtils.scrollToElement(`#${targetId}`, 80);
            
            // 更新活動狀態
            this.updateActiveLink(e.target);
        }
    }

    updateActiveLink(activeLink) {
        // 移除所有活動狀態
        this.navLinks.forEach(link => {
            DOMUtils.removeClass(link, 'active');
        });
        
        // 添加新的活動狀態
        DOMUtils.addClass(activeLink, 'active');
    }

    handleScroll() {
        const scrollTop = ScrollUtils.getScrollPosition().y;
        
        // 導航欄滾動效果
        this.handleNavbarScroll(scrollTop);
        
        // 顯示/隱藏回到頂部按鈕
        this.handleScrollToTopButton(scrollTop);
        
        // 更新活動導航項目
        this.updateActiveNavItem();
        
        this.lastScrollTop = scrollTop;
    }

    handleNavbarScroll(scrollTop) {
        if (!this.navbar) return;

        if (scrollTop > 100) {
            DOMUtils.addClass(this.navbar, 'scrolled');
        } else {
            DOMUtils.removeClass(this.navbar, 'scrolled');
        }

        // 導航欄隱藏/顯示效果（向下滾動時隱藏，向上滾動時顯示）
        if (scrollTop > this.lastScrollTop && scrollTop > 200) {
            // 向下滾動，隱藏導航欄
            DOMUtils.setStyle(this.navbar, {
                transform: 'translateY(-100%)'
            });
        } else {
            // 向上滾動或在頂部，顯示導航欄
            DOMUtils.setStyle(this.navbar, {
                transform: 'translateY(0)'
            });
        }
    }

    handleScrollToTopButton(scrollTop) {
        if (!this.scrollToTopBtn) return;

        if (scrollTop > 300) {
            DOMUtils.addClass(this.scrollToTopBtn, 'visible');
        } else {
            DOMUtils.removeClass(this.scrollToTopBtn, 'visible');
        }
    }

    updateActiveNavItem() {
        const sections = ['hero', 'categories', 'featured', 'about', 'contact'];
        let currentSection = '';

        sections.forEach(sectionId => {
            const section = DOMUtils.select(`#${sectionId}`);
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 150 && rect.bottom >= 150) {
                    currentSection = sectionId;
                }
            }
        });

        // 更新導航連結的活動狀態
        this.navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                DOMUtils.addClass(link, 'active');
            } else {
                DOMUtils.removeClass(link, 'active');
            }
        });
    }

    handleResize() {
        // 如果視窗變大且選單開啟，則關閉選單
        if (!ResponsiveUtils.isMobile() && this.isMenuOpen) {
            this.closeMobileMenu();
        }
    }

    handleDocumentClick(e) {
        // 如果點擊的不是導航相關元素，則關閉選單
        if (this.isMenuOpen && 
            !this.navMenu.contains(e.target) && 
            !this.hamburger.contains(e.target)) {
            this.closeMobileMenu();
        }
    }

    // 公共方法：程式化滾動到特定區域
    scrollToSection(sectionId) {
        ScrollUtils.scrollToElement(`#${sectionId}`, 80);
    }

    // 公共方法：設置活動導航項目
    setActiveNavItem(sectionId) {
        this.navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${sectionId}`) {
                DOMUtils.addClass(link, 'active');
            } else {
                DOMUtils.removeClass(link, 'active');
            }
        });
    }

    // 公共方法：獲取當前活動的導航項目
    getCurrentActiveNavItem() {
        const activeLink = DOMUtils.select('.nav-link.active');
        return activeLink ? activeLink.getAttribute('href').substring(1) : null;
    }

    // 銷毀方法（清理事件監聽器）
    destroy() {
        // 移除事件監聽器
        if (this.hamburger) {
            this.hamburger.removeEventListener('click', this.toggleMobileMenu);
        }

        this.navLinks.forEach(link => {
            link.removeEventListener('click', this.handleNavLinkClick);
        });

        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener('click', this.handleDocumentClick);

        if (this.scrollToTopBtn) {
            this.scrollToTopBtn.removeEventListener('click', ScrollUtils.scrollToTop);
        }
    }
}

// 導出導航類
window.Navigation = Navigation;