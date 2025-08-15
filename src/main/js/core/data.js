// 重新排序後的小菜資料庫 - 有真實照片的優先
const dishesData = {
    dishes: [
        // 有真實照片的小菜 (放在前面)
        {
            id: 1,
            name: "煙燻豬耳朵",
            description: "精選豬耳朵經慢火煙燻，口感Q彈有嚼勁，煙燻香氣濃郁，是下酒的絕佳選擇。",
            category: "signature",
            price: "NT$ 200",
            image: "src/main/resources/images/smoked-pig-ear.jpg",
            featured: true,
            ingredients: ["豬耳朵", "煙燻", "醬油", "香料", "蒜泥"],
            nutrition: "富含膠原蛋白，口感獨特",
            badge: "招牌特色"
        },
        {
            id: 2,
            name: "鳳爪",
            description: "精選鳳爪經傳統工藝處理，口感軟嫩入味，膠原蛋白豐富，是美容養顏的經典小菜。",
            category: "signature",
            price: "NT$ 220",
            image: "src/main/resources/images/smoked-boneless-chicken-feet.jpg",
            featured: true,
            ingredients: ["鳳爪", "醬油", "冰糖", "香料", "花椒"],
            nutrition: "富含膠原蛋白，美容聖品",
            badge: "人氣推薦"
        },
        {
            id: 3,
            name: "煙燻墨魚卷",
            description: "新鮮墨魚經煙燻工藝製作，口感Q彈，煙燻香氣迷人，是海鮮愛好者的絕佳選擇。",
            category: "signature",
            price: "NT$ 280",
            image: "src/main/resources/images/smoked-squid-rolls.jpg",
            featured: true,
            ingredients: ["墨魚", "煙燻", "香料", "胡椒", "蒜泥"],
            nutrition: "高蛋白質，低脂肪",
            badge: "海鮮精品"
        },
        {
            id: 4,
            name: "蒜味鳳螺肉",
            description: "新鮮鳳螺肉配以濃郁蒜香，口感鮮美Q彈，海鮮的鮮甜與蒜香完美融合。",
            category: "signature",
            price: "NT$ 320",
            image: "src/main/resources/images/garlic-sea-snail.jpg",
            featured: true,
            ingredients: ["鳳螺肉", "蒜泥", "辣椒", "香菇", "醬油"],
            nutrition: "高蛋白低脂，海洋精華",
            badge: "海鮮珍品"
        },
        {
            id: 5,
            name: "蜜汁鴨賞",
            description: "傳統鴨賞經蜜汁調味，甜鹹平衡，肉質緊實有嚼勁，是台灣傳統美食的經典代表。",
            category: "signature",
            price: "NT$ 250",
            image: "src/main/resources/images/honey-glazed-duck.jpg",
            featured: true,
            ingredients: ["鴨賞", "蜂蜜", "醬油", "米酒", "薑絲"],
            nutrition: "蛋白質豐富，傳統風味",
            badge: "台灣經典"
        },
        {
            id: 6,
            name: "花生小魚乾",
            description: "香脆花生搭配鮮美小魚乾，雙重口感層次豐富，是經典的下酒菜和零食組合。",
            category: "cold",
            price: "NT$ 180",
            image: "src/main/resources/images/peanuts-dried-fish.jpg",
            featured: true,
            ingredients: ["花生", "小魚乾", "辣椒", "蒜片", "香油"],
            nutrition: "鈣質豐富，蛋白質充足",
            badge: "經典組合"
        },
        {
            id: 7,
            name: "三色花生",
            description: "精選花生搭配三種不同調味，紅、綠、白三色繽紛，口感豐富，營養均衡的健康零食。",
            category: "cold",
            price: "NT$ 150",
            image: "src/main/resources/images/tri-color-peanuts.jpg",
            featured: false,
            ingredients: ["花生", "紅椒粉", "青豆", "調味料", "鹽"],
            nutrition: "富含蛋白質和健康脂肪",
            badge: "繽紛口感"
        },
        {
            id: 8,
            name: "糯米椒",
            description: "新鮮糯米椒搭配香菇和其他配菜，口感微辣香甜，營養豐富，開胃下飯。",
            category: "seasonal",
            price: "NT$ 160",
            image: "src/main/resources/images/glutinous-rice-peppers.jpg",
            featured: false,
            ingredients: ["糯米椒", "香菇", "豆豉", "蒜泥", "醬油"],
            nutrition: "維生素C豐富，微辣開胃",
            badge: "微辣香甜"
        },
        {
            id: 9,
            name: "麻油腰花",
            description: "新鮮豬腰經麻油爆炒，香氣濃郁，口感嫩滑，是傳統補身佳品，營養價值極高。",
            category: "signature",
            price: "NT$ 200",
            image: "src/main/resources/images/sesame-oil-kidney.jpg",
            featured: false,
            ingredients: ["豬腰", "麻油", "薑絲", "米酒", "枸杞"],
            nutrition: "補腎養身，營養豐富",
            badge: "養身佳品"
        },
        {
            id: 10,
            name: "黑胡椒毛豆莢",
            description: "新鮮毛豆莢配以黑胡椒調味，口感清脆，胡椒香氣濃郁，健康營養的輕食選擇。",
            category: "cold",
            price: "NT$ 120",
            image: "src/main/resources/images/black-pepper-edamame.jpg",
            featured: false,
            ingredients: ["毛豆莢", "黑胡椒", "鹽", "蒜泥", "香油"],
            nutrition: "植物蛋白豐富，膳食纖維充足",
            badge: "健康輕食"
        },
        // 原有的小菜 (沒有真實照片，使用placeholder)
        {
            id: 11,
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
            id: 12,
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
            id: 13,
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
            id: 14,
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
            id: 15,
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
            id: 16,
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
            id: 17,
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
            id: 18,
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
            id: 19,
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
            id: 20,
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
            id: 21,
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
            id: 22,
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