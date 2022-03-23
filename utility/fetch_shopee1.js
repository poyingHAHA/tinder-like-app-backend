import fetch from 'node-fetch';
import fs from 'fs-extra';


// const product_url_v4 = "https://shopee.tw/api/v4/item/get?itemid=6916925903&shopid=191096305"
// const product_url_v2 = "https://shopee.tw/api/v2/item/get?itemid=6916925903&shopid=191096305"
// const rating_url = "https://shopee.tw/api/v2/item/get_ratings?filter=0&flag=1&itemid=6916925903&limit=6&offset=0&shopid=191096305&type=0"
// const shop_url = "https://shopee.tw/api/v4/shop/get_shop_detail?shopid=191096305"

const shopids = [
  191096305, 
]


// 獲取商店商品ID資料，目前一家店抓100樣商品
const getShopItem = async(fetchSize, shopid) => {
  const itemlist = []
  const items_url = `https://shopee.tw/api/v4/search/search_items?by=pop&entry_point=ShopByPDP&limit=${fetchSize}&match_id=${shopid}&order=desc&page_type=shop&scenario=PAGE_OTHERS&version=2`
  const response = await fetch(items_url)
  const itemsJSON = await response.json()
  const items = itemsJSON.items
  // console.log(itemsJSON)
  const itemids = items.map(item => item.itemid)
  console.log(itemids)

  const data_save = await JSON.stringify(itemids);
  await fs.outputFile(`./shopee/${shopid}}/itemids_${fetchSize}.json`, data_save, (err) => {
    if(err){
      throw err
    }
    console.log("saved")
  })
}

// 獲取商品資訊
const fetchProduct = async(itemid, shopid) => {
  // product的部分
  const product_url_v4 = `https://shopee.tw/api/v4/item/get?itemid=${itemid}&shopid=${shopid}`
  const productResponse = await fetch(product_url_v4);
  const productRes = await productResponse.json();
  const productData = productRes.data
  
  const productPost = {
    itemid: productData.itemid,
    shopid: productData.shopid,
    name: productData.name,
    content: productData.description,
    labels: productData.categories.map(cat => {cat.catid, cat.display_name}),
    feLabels: productData.fe_categories ? productData.fe_categories.map(fecat => {fecat.catid, fecat.display_name}) : null,
    display: true,
    variation: productData.tier_variations ? productData.tier_variations : null,
    models: productData.tier_variations ? productData.models.map(model => {model.name, model.price, model.stock}) : null,
    price: productData.price/100000,
    priceMin: productData.price_min/100000,
    priceMax: productData.price_max/100000,
    shipping_free: false,
    historicalSold: productData.historical_sold,
    MonthSold: productData.sold,
    discount: productData.show_discount ? (100-productData.show_discount)/100 : 1,
    images: productData.images,
    stock: productData.stock, // 庫存
    rating: productData.item_rating, // 這只有staring跟count，要內容再另外發request
    likes: [],
    // timestamp: // 存入資料庫在放
    // shared:  
  }
  console.log(productPost)

  const data_save = await JSON.stringify(productData);

  // await fs.outputFile(`./shopee/shop_${shopid}/items/${productPost.id}_${productPost.name}.json`, data_save, (err) => {
  //   if(err){
  //     throw err
  //   }
  //   console.log("saved")
  // })
}

// 獲取商店資訊
const fetchShop = async (shopid) => {
  // shop部分
  const shop_url = `https://shopee.tw/api/v4/shop/get_shop_detail?shopid=${shopid}`
  const shopResponse = await fetch(shop_url)
  const shopJson = await shopResponse.json()
  const shopData = shopJson.data
  // const shop_save = await JSON.stringify(shopData)

  const shop = {
    shopid: shopData.shopid,
    name: shopData.name,
    itemcount: shopData.item_count,
    Role: "shop",
    account: shopData.account.username,
    password: "shopeetest",
    profilePic: shopData.cover,
    seldIntro: shopData.description,
    // productPost: 根據shopID拿,
    // productCount: 等等看一家點要拿多少資料,
    follower:{
      buyer: [{buyerid: null, buyerPic: null}],
      shop: [{shopid: null, shopPic: null}],
      count: 0
    },
    following:{
      buyer: [{buyerid: null, buyerPic: null}],
      shop: [{shopid: null, shopPic: null}],
      count: 0
    },
    ratingStar: shopData.rating_star, // 先用蝦皮的
    ratingBad: shopData.rating_bad, // 先用蝦皮的
    ratingNormal: shopData.rating_normal, // 先用蝦皮的
    ratingGood: shopData.rating_good, // 先用蝦皮的
    shared: [
      {
        postid: null,
        buyerid: null
      }
    ],
    // productList: [] // 到時候用virtual關聯
    // timestamp: true,
  }
  // console.log(JSON.stringify(shop))
  const shop_save = await JSON.stringify(shopData)

  await fs.outputFile(`./shopee/shop_${shopid}/shop_${shopid}_${shop.name}.json`, shop_save, (err) => {
    if(err){
      console.log(err)
    }
    console.log("saved")
  })
}

// getShopItem(100, "191096305")
fetchShop("267479790")