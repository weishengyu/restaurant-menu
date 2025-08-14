// 小菜資料庫
const dishesData = {
    dishes: [
        {
            id: 1,
            name: "涼拌黑木耳",
            description: "嚴選優質黑木耳，搭配特製醬料，口感爽脆，營養豐富，是夏日清爽首選。",
            category: "cold",
            price: "NT$ 120",
            image: "src/main/resources/images/black-mushroom.jpg",
            featured: true,
            ingredients: ["黑木耳", "香菜", "蒜泥", "香油", "醋"],
            nutrition: "豐富膳食纖維，低卡路里",
            badge: "人氣推薦"
        },
        {
            id: 2,
            name: "醃蘿蔔",
            description: "傳統古法醃製，酸甜爽口，開胃解膩的最佳選擇，口感清脆。",
            category: "pickled",
            price: "NT$ 80",
            image: "src/main/resources/images/pickled-radish.jpg",
            featured: true,
            ingredients: ["白蘿蔔", "糖", "醋", "鹽", "辣椒"],
            nutrition: "維生素C豐富，助消化",
            badge: "經典口味"
        },
        {
            id: 3,
            name: "涼拌海帶絲",
            description: "新鮮海帶絲配以蒜泥香油，清爽不膩，夏日首選，富含碘質。",
            category: "cold",
            price: "NT$ 100",
            image: "src/main/resources/images/seaweed.jpg",
            featured: true,
            ingredients: ["海帶絲", "蒜泥", "香油", "醋", "芝麻"],
            nutrition: "富含碘質和礦物質",
            badge: "清爽首選"
        },
        {
            id: 4,
            name: "泡菜",
            description: "韓式風味泡菜，酸辣開胃，發酵工藝製作，富含益生菌。",
            category: "pickled",
            price: "NT$ 150",
            image: "src/main/resources/images/kimchi.jpg",
            featured: false,
            ingredients: ["大白菜", "韓式辣椒粉", "蒜泥", "薑", "魚露"],
            nutrition: "富含益生菌，助腸道健康",
            badge: "韓式風味"
        },
        {
            id: 5,
            name: "涼拌小黃瓜",
            description: "爽脆小黃瓜搭配蒜泥調味，清香解膩，口感清爽。",
            category: "cold",
            price: "NT$ 90",
            image: "src/main/resources/images/cucumber.jpg",
            featured: false,
            ingredients: ["小黃瓜", "蒜泥", "香油", "醋", "鹽"],
            nutrition: "水分充足，低卡路里",
            badge: "清爽解膩"
        },
        {
            id: 6,
            name: "醬瓜",
            description: "傳統醬瓜製法，甘甜回甘，搭配白粥最佳，口感脆嫩。",
            category: "pickled",
            price: "NT$ 110",
            image: "src/main/resources/images/pickled-melon.jpg",
            featured: false,
            ingredients: ["小黃瓜", "醬油", "糖", "鹽", "香料"],
            nutrition: "傳統風味，開胃佳品",
            badge: "古早味"
        },
        {
            id: 7,
            name: "涼拌豆干絲",
            description: "手工豆干絲配以香菜蔥絲，口感Q彈，蛋白質豐富。",
            category: "cold",
            price: "NT$ 130",
            image: "src/main/resources/images/tofu-strips.jpg",
            featured: false,
            ingredients: ["豆干絲", "香菜", "蔥絲", "香油", "醬油"],
            nutrition: "高蛋白質，素食友好",
            badge: "蛋白質豐富"
        },
        {
            id: 8,
            name: "醃高麗菜",
            description: "新鮮高麗菜醃製，口感爽脆，營養價值高，清爽不油膩。",
            category: "pickled",
            price: "NT$ 95",
            image: "src/main/resources/images/pickled-cabbage.jpg",
            featured: false,
            ingredients: ["高麗菜", "鹽", "糖", "醋", "蒜"],
            nutrition: "維生素K豐富，抗氧化",
            badge: "營養豐富"
        },
        {
            id: 9,
            name: "涼拌花生",
            description: "精選花生配以五香調味，香氣濃郁，口感酥脆，下酒好菜。",
            category: "cold",
            price: "NT$ 140",
            image: "src/main/resources/images/peanuts.jpg",
            featured: false,
            ingredients: ["花生", "五香粉", "鹽", "糖", "香油"],
            nutrition: "健康脂肪，維生素E",
            badge: "下酒良伴"
        },
        {
            id: 10,
            name: "季節野菜",
            description: "依時令選擇新鮮野菜，清炒或涼拌，保持蔬菜原味。",
            category: "seasonal",
            price: "NT$ 160",
            image: "src/main/resources/images/seasonal-vegetables.jpg",
            featured: false,
            ingredients: ["時令蔬菜", "蒜泥", "香油", "鹽", "胡椒"],
            nutrition: "季節性營養，新鮮自然",
            badge: "時令推薦"
        },
        {
            id: 11,
            name: "招牌綜合小菜",
            description: "精選多種小菜組合，一次品嚐多種口味，份量充足。",
            category: "signature",
            price: "NT$ 250",
            image: "src/main/resources/images/mixed-dishes.jpg",
            featured: true,
            ingredients: ["多種小菜組合", "依季節調整"],
            nutrition: "營養均衡，口味豐富",
            badge: "招牌推薦"
        },
        {
            id: 12,
            name: "涼拌三絲",
            description: "豆干絲、海帶絲、紅蘿蔔絲三種食材完美搭配，口感豐富。",
            category: "signature",
            price: "NT$ 180",
            image: "src/main/resources/images/three-strips.jpg",
            featured: true,
            ingredients: ["豆干絲", "海帶絲", "紅蘿蔔絲", "香菜", "調味料"],
            nutrition: "多元營養，口感層次豐富",
            badge: "經典組合"
        }
    ],

    categories: {
        all: "全部",
        cold: "涼拌小菜",
        pickled: "醃漬小菜",
        seasonal: "時令小菜",
        signature: "招牌小菜"
    },

    // 取得所有小菜
    getAllDishes() {
        return this.dishes;
    },

    // 根據分類篩選小菜
    getDishesByCategory(category) {
        if (category === 'all') {
            return this.dishes;
        }
        return this.dishes.filter(dish => dish.category === category);
    },

    // 取得精選小菜
    getFeaturedDishes() {
        return this.dishes.filter(dish => dish.featured);
    },

    // 根據ID取得小菜
    getDishById(id) {
        return this.dishes.find(dish => dish.id === id);
    },

    // 搜尋小菜
    searchDishes(query) {
        const searchTerm = query.toLowerCase();
        return this.dishes.filter(dish => 
            dish.name.toLowerCase().includes(searchTerm) ||
            dish.description.toLowerCase().includes(searchTerm) ||
            dish.ingredients.some(ingredient => 
                ingredient.toLowerCase().includes(searchTerm)
            )
        );
    },

    // 取得隨機推薦小菜
    getRandomDishes(count = 3) {
        const shuffled = [...this.dishes].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
};

// 導出資料供其他模組使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = dishesData;
}