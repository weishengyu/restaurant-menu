// 產品展示模組

class ProductDisplay {
    constructor() {
        this.productsGrid = DOMUtils.select('#products-grid');
        this.filterButtons = DOMUtils.selectAll('.filter-btn');
        this.currentCategory = 'all';
        this.currentProducts = [];
        this.searchTimeout = null;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadProducts();
        this.setupIntersectionObserver();
    }

    bindEvents() {
        // 分類篩選按鈕事件
        this.filterButtons.forEach(button => {
            DOMUtils.addEvent(button, 'click', (e) => {
                this.handleCategoryFilter(e);
            });
        });

        // 鍵盤操作支援
        DOMUtils.addEvent(document, 'keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });
    }

    handleCategoryFilter(e) {
        const button = e.target;
        const category = button.getAttribute('data-category');

        // 更新按鈕活動狀態
        this.updateFilterButtonState(button);

        // 篩選並顯示產品
        this.filterProducts(category);
    }

    updateFilterButtonState(activeButton) {
        // 移除所有活動狀態
        this.filterButtons.forEach(button => {
            DOMUtils.removeClass(button, 'active');
        });

        // 添加新的活動狀態
        DOMUtils.addClass(activeButton, 'active');
    }

    filterProducts(category) {
        this.currentCategory = category;
        
        // 添加載入動畫
        this.showLoading();

        // 模擬載入延遲以展示動畫效果
        setTimeout(() => {
            // 獲取篩選後的產品
            const filteredProducts = dishesData.getDishesByCategory(category);
            
            // 更新產品顯示
            this.renderProducts(filteredProducts);
            
            // 隱藏載入動畫
            this.hideLoading();
            
            // 觸發動畫效果
            this.animateProductsIn();
            
        }, 300);
    }

    loadProducts(category = 'all') {
        this.showLoading();
        
        setTimeout(() => {
            const products = dishesData.getDishesByCategory(category);
            this.currentProducts = products;
            this.renderProducts(products);
            this.hideLoading();
            this.animateProductsIn();
        }, 500);
    }

    renderProducts(products) {
        if (!this.productsGrid) return;

        // 清空現有內容
        this.productsGrid.innerHTML = '';

        if (products.length === 0) {
            this.renderNoResults();
            return;
        }

        // 渲染產品卡片
        products.forEach((product, index) => {
            const productCard = this.createProductCard(product, index);
            this.productsGrid.appendChild(productCard);
        });
    }

    createProductCard(product, index) {
        const card = DOMUtils.create('div', 'product-card fade-in');
        card.setAttribute('data-category', product.category);
        card.setAttribute('data-id', product.id);
        card.style.animationDelay = `${index * 0.1}s`;

        card.innerHTML = `
            <div class="product-image">
                <img src="${this.getProductImage(product.image)}" 
                     alt="${product.name}" 
                     loading="lazy"
                     onerror="this.src='src/main/resources/images/placeholder.jpg'">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            </div>
            <div class="product-content">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-ingredients">
                    <strong>主要食材：</strong>${product.ingredients.join(', ')}
                </div>
                <div class="product-nutrition">
                    <small>${product.nutrition}</small>
                </div>
                <div class="product-meta">
                    <span class="product-category">${dishesData.categories[product.category]}</span>
                    <span class="product-price">${product.price}</span>
                </div>
                <div class="product-actions">
                    <button class="product-detail-btn" onclick="productDisplay.showProductDetail(${product.id})">
                        查看詳情
                    </button>
                </div>
            </div>
        `;

        // 添加點擊事件
        DOMUtils.addEvent(card, 'click', () => {
            this.showProductDetail(product.id);
        });

        // 添加鍵盤支援
        card.setAttribute('tabindex', '0');
        DOMUtils.addEvent(card, 'keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.showProductDetail(product.id);
            }
        });

        return card;
    }

    getProductImage(imagePath) {
        // 檢查圖片是否存在，如果不存在則使用預設圖片
        const placeholderImages = {
            1: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDMwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjRjhGOUZBIi8+CjxyZWN0IHg9IjEyNSIgeT0iMTAwIiB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiM4QjQ1MTMiLz4KPHRlGcmN4PSIxNTAiIHk9IjE3NSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7mtb7mi6zlub/mnKjogbU8L3RleHQ+Cjwvc3ZnPgo=',
            2: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDMwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjRjhGOUZBIi8+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjEyNSIgcj0iMzAiIGZpbGw9IiNEMjY5MUUiLz4KPHR5eHQgeD0iMTUwIiB5PSIxNzUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+5bCP6I+c6K+55Zu+44CQ6L+Z6YeM77yM5L2g5YCR55qE5YaN5p2l5o6i57Sv5LiA5LiL77yBPC90ZXh0Pgo8L3N2Zz4K'
        };
        
        // 如果有對應的預設圖片則使用，否則使用通用預設圖片
        return placeholderImages[1] || imagePath;
    }

    renderNoResults() {
        this.productsGrid.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">🍽️</div>
                <h3>沒有找到相關小菜</h3>
                <p>請嘗試選擇其他分類或聯繫我們了解更多選擇</p>
                <button class="cta-button" onclick="productDisplay.filterProducts('all')">
                    查看所有小菜
                </button>
            </div>
        `;
    }

    showLoading() {
        if (this.productsGrid) {
            this.productsGrid.innerHTML = `
                <div class="loading">
                    載入中，請稍候...
                </div>
            `;
        }
    }

    hideLoading() {
        const loadingElement = DOMUtils.select('.loading');
        if (loadingElement) {
            AnimationUtils.fadeOut(loadingElement, 200);
        }
    }

    animateProductsIn() {
        const productCards = DOMUtils.selectAll('.product-card');
        productCards.forEach((card, index) => {
            setTimeout(() => {
                DOMUtils.addClass(card, 'visible');
                AnimationUtils.slideIn(card, 'up', 400);
            }, index * 100);
        });
    }

    showProductDetail(productId) {
        const product = dishesData.getDishById(productId);
        if (!product) return;

        this.createProductModal(product);
    }

    createProductModal(product) {
        // 創建模態框
        const modal = DOMUtils.create('div', 'modal');
        modal.id = 'product-modal';

        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${product.name}</h2>
                    <span class="close">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="modal-image">
                        <img src="${this.getProductImage(product.image)}" 
                             alt="${product.name}"
                             onerror="this.src='src/main/resources/images/placeholder.jpg'">
                        ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                    </div>
                    <div class="modal-details">
                        <div class="modal-price">${product.price}</div>
                        <div class="modal-category">分類：${dishesData.categories[product.category]}</div>
                        <div class="modal-description">
                            <p>${product.description}</p>
                        </div>
                        <div class="modal-ingredients">
                            <h4>主要食材</h4>
                            <ul>
                                ${product.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="modal-nutrition">
                            <h4>營養特色</h4>
                            <p>${product.nutrition}</p>
                        </div>
                        <div class="modal-actions">
                            <button class="cta-button" onclick="productDisplay.closeProductModal()">
                                關閉
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // 添加到頁面
        document.body.appendChild(modal);

        // 綁定關閉事件
        const closeBtn = modal.querySelector('.close');
        DOMUtils.addEvent(closeBtn, 'click', () => {
            this.closeProductModal();
        });

        // 點擊背景關閉
        DOMUtils.addEvent(modal, 'click', (e) => {
            if (e.target === modal) {
                this.closeProductModal();
            }
        });

        // ESC鍵關閉
        DOMUtils.addEvent(document, 'keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeProductModal();
            }
        });

        // 顯示模態框
        setTimeout(() => {
            modal.style.display = 'block';
            AnimationUtils.fadeIn(modal, 300);
        }, 10);
    }

    closeProductModal() {
        const modal = DOMUtils.select('#product-modal');
        if (modal) {
            AnimationUtils.fadeOut(modal, 200);
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 200);
        }
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    DOMUtils.addClass(entry.target, 'visible');
                }
            });
        }, options);

        // 觀察產品卡片
        const observeProducts = () => {
            const productCards = DOMUtils.selectAll('.product-card');
            productCards.forEach(card => {
                observer.observe(card);
            });
        };

        // 初始觀察
        setTimeout(observeProducts, 100);

        // 在產品重新渲染後觀察
        this.observer = observer;
        this.observeProducts = observeProducts;
    }

    handleKeyboardNavigation(e) {
        // 數字鍵快速篩選
        const keyMap = {
            '1': 'all',
            '2': 'cold', 
            '3': 'pickled',
            '4': 'seasonal',
            '5': 'signature'
        };

        if (keyMap[e.key]) {
            e.preventDefault();
            const category = keyMap[e.key];
            const button = DOMUtils.select(`[data-category="${category}"]`);
            if (button) {
                button.click();
            }
        }
    }

    // 搜尋功能
    searchProducts(query) {
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }

        this.searchTimeout = setTimeout(() => {
            const results = dishesData.searchDishes(query);
            this.renderProducts(results);
            this.animateProductsIn();
        }, 300);
    }

    // 獲取當前分類
    getCurrentCategory() {
        return this.currentCategory;
    }

    // 獲取當前產品列表
    getCurrentProducts() {
        return this.currentProducts;
    }

    // 重新整理產品顯示
    refresh() {
        this.loadProducts(this.currentCategory);
    }

    // 銷毀方法
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
    }
}

// 導出產品展示類
window.ProductDisplay = ProductDisplay;