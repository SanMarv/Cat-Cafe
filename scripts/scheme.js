const sqlite3 = require('sqlite3').verbose()
const item_imgs = {
  "Curry": "https://media.istockphoto.com/id/174330280/es/foto/curry-con-arroz.jpg?b=1&s=612x612&w=0&k=20&c=nPWufeSXzy8dxbhlWJ5u2nJfZH8pfLgGvinwaiHngnQ=",
  "Katsu": "https://media.istockphoto.com/id/1516613595/es/foto/una-mezcla-de-alimentos-indonesios-y-japoneses-en-un-plato-con-arroz-frito-o-nasi-goreng-y.jpg?b=1&s=612x612&w=0&k=20&c=fYDj-6SI-hcJp55TgcM7YJsoKn_aYkMYRpj_WstBcuI=",
  "Manju": "https://free-images.com/md/49f4/manju_001.jpg",
  "Lemonade": "https://free-images.com/md/0eb2/lemonade_restaurant_ma_ta.jpg",
  "Caramel Coffee": "https://media.istockphoto.com/id/173649841/es/foto/caramelo-café.jpg?b=1&s=612x612&w=0&k=20&c=PFTYHuRyKde7mE09rR8EBIPeQakx2osnX6h5YvZUOuc=",
  "Chai tea": "https://media.istockphoto.com/id/1135068326/es/foto/café-colado-en-frío.jpg?b=1&s=612x612&w=0&k=20&c=PWUbnhgHXfZwqzyxvoOn-jPI0uNV6ztmUpGEJ93wXD0=",

  "Burger": "https://free-images.com/md/d3d6/burger_king_double_cheeseburger.jpg",
  "Hotdog": "https://free-images.com/md/6877/hot_dogs_frankfurters_bun.jpg",
  "Fries": "https://free-images.com/md/582e/belgian_fries_french_fries.jpg",
  "Iced Tea": "https://free-images.com/md/7426/tea_iced_tea_thai.jpg",
  "Vanilla Shake": "https://media.istockphoto.com/id/1353902559/es/foto/comida-directamente-de-la-cocina-a-su-mesa.jpg?b=1&s=612x612&w=0&k=20&c=nL1twYB6K_Xnv01XyDoi1zItXPfQrArwTb_TMs8RVdY=",
  "Espresso": "https://free-images.com/md/dcd8/zaperoco_espresso_canarian_espresso_0.jpg",

  "Pizza": "https://t4.ftcdn.net/jpg/02/35/47/53/240_F_235475371_4DIuPavX5taHjv7zdDF6cCBKCOUlxKZr.jpg",
  "Pasta": "https://t3.ftcdn.net/jpg/02/55/53/44/240_F_255534476_n8JzjZtzOFW5g3TXTLMd6QGVnToi6hqj.jpg",
  "Salad": "https://t4.ftcdn.net/jpg/01/89/38/43/240_F_189384391_ruS0OftC5mFBRshdv3XuOjuwZgmKvlOc.jpg",
  "Orange Juice": "hhttps://t4.ftcdn.net/jpg/02/97/14/87/240_F_297148727_2uBKfHRfm473f8jd6PgDn8tEavEUlcXd.jpg",
  "Mocha Latte": "https://t4.ftcdn.net/jpg/01/72/84/41/240_F_172844154_WaIn0EAQTX9JsmrsPk2OpH0oLMJKzoHM.jpg",
  "Green Tea": "https://t4.ftcdn.net/jpg/02/27/88/19/240_F_227881943_SABhdakS4Tz1wrlguNriKjihNf5OVrun.jpg",

  "Tacos": "https://t4.ftcdn.net/jpg/03/97/61/41/240_F_397614160_Ob3n03LapbVdu75654EoV52PLH3U0CUF.jpg",
  "Burrito": "https://t4.ftcdn.net/jpg/02/57/47/71/240_F_257477148_kqlxBSBlGSd4JsSE4bt0Icq2aZAwfPRF.jpg",
  "Nachos": "https://t3.ftcdn.net/jpg/19/03/05/12/240_F_1903051215_jDWN3XDBXwb3mNYJC99oZpzvszIkTbfl.jpg",
  "Cola": "https://t3.ftcdn.net/jpg/04/86/63/82/240_F_486638213_CBUPlvkceHDJEfdwAqiwcGv6yUbd1C1K.jpg",
  "Iced Coffee": "https://t3.ftcdn.net/jpg/03/16/01/48/240_F_316014817_EC1KN7mAD86ALYhhwGUUeSsQoJIVMtfQ.jpg",
  "Herbal Tea": "https://t4.ftcdn.net/jpg/17/24/50/55/240_F_1724505521_Jr4ZpJjVY0Scwjlwgzgf1GuDyGpgdL0i.jpg",

  "Sandwich": "https://t3.ftcdn.net/jpg/03/95/51/02/240_F_395510271_dcbkoI0OwINtz48zKIYJ4iUvUfgsVCHy.jpg",
  "Wrap": "https://t4.ftcdn.net/jpg/05/20/22/25/240_F_520222514_YXqzoV8zfVDVs7Y1n2tmlglkO1bZsiar.jpg",
  "Soup": "https://t3.ftcdn.net/jpg/03/08/00/40/240_F_308004086_jbLKbcmCvJQJvwrEL94pyz5I32j0SuJ1.jpg",
  "Milkshake": "https://t4.ftcdn.net/jpg/04/48/66/07/240_F_448660772_PoLhjRPqvxgpfEiJ4JrozJnNa1AWBAIT.jpg",
  "Black Coffee": "https://t3.ftcdn.net/jpg/18/48/57/64/240_F_1848576439_HGM9c94rkyzHsltZXLJX8JGWo4piC00l.jpg",
  "Chamomile Tea": "https://t4.ftcdn.net/jpg/02/13/64/73/240_F_213647339_bBaGCMIVl3FaCO9IZ2SmAvVE6etWFVbh.jpg",

  "Steak": "https://t3.ftcdn.net/jpg/18/14/74/04/240_F_1814740467_thlY53aoHrQNxYLvCfk9HGltmRfcBwcP.jpg",
  "Chicken Wings": "https://t4.ftcdn.net/jpg/06/15/77/23/240_F_615772354_ef5WZ3gFekveIMuHLMsWIePHzlqnLDPj.jpg",
  "Onion Rings": "https://t4.ftcdn.net/jpg/17/77/94/29/240_F_1777942976_DHtfuGI1zD1ptPJnhdkarObMZCabFFAL.jpg",
  "Lemon Soda": "https://t4.ftcdn.net/jpg/03/30/76/07/240_F_330760782_1j2Aklq1zU2gzGlVPl5MiYJwuKgxKBxC.jpg",
  "Cappuccino": "https://t3.ftcdn.net/jpg/03/60/64/04/240_F_360640468_ZD6nIMvYQ9EEDiHDeZ9IGxLsZj914wcT.jpg",
  "Mint Tea": "https://t4.ftcdn.net/jpg/18/34/32/41/360_F_1834324176_2R1GW54Av7VLxTAxaz5lbgQ55tibMgAy.jpg",

  "Pancakes": "https://t3.ftcdn.net/jpg/02/48/37/02/240_F_248370257_DLEhszjnQ8bBwrLJWC4KDA2ivgRVTp3W.jpg",
  "Waffles": "https://t3.ftcdn.net/jpg/17/80/12/44/240_F_1780124425_9v0uFKItxMu5GW3MjX5QqITk0ohBYXYp.jpg",
  "Croissant": "https://t4.ftcdn.net/jpg/02/48/61/61/240_F_248616108_x3HtgIs4pUT5Kf3DcyLHWrute6TL28Mq.jpg",
  "Apple Juice": "https://t4.ftcdn.net/jpg/03/39/05/01/240_F_339050124_BNg58lseBT7Hc6Z2zqBN7jon7K93XbnY.jpg",
  "Latte": "https://t3.ftcdn.net/jpg/01/04/42/68/240_F_104426865_3rohzEKxgr9OQVJTBLTFhI265TBUN2wG.jpg",
  "Black Tea": "https://t4.ftcdn.net/jpg/19/29/86/31/240_F_1929863113_VGvWfr2EnAESeq3LRNxePiPprNBHBoTY.jpg"
};

let cats = [{"name":"Luna", "desc":"Age: 2 years\n\nPersonality: Playful and curious. Luna loves chasing toys, exploring every corner of the house, and climbing to high places. She is very affectionate once she feels comfortable.", "image":"/assets/cat-enjoys-breakfast.jpg"},
            {"name":"Oliver", "desc":"Age: 4 years \n\nPersonality: Calm and friendly. Oliver enjoys lounging around and being petted. He gets along well with people and other animals, making him a perfect companion.", "image":"/assets/cat-with-coffee-relaxing-home.jpg"},
            {"name":"Bella", "desc":"Age: 1 year \n\nPersonality: Energetic and mischievous. Bella is always on the move, playing with anything she can find. She is very social and loves attention.", "image":"/assets/selective-focus-closeup-shot-gray-furry-tabby-cat-sitting-wooden-chair.jpg"},
            {"name":"Max", "desc": "Age: 5 years \n\nPersonality: Independent and intelligent. Max likes having his own space but will come for affection on his own terms. He is observant and calm.", "image":"/assets/daga_roszkowska-cat-3059075_1920.jpg"},
            {"name":"Chloe", "desc":"Age: 3 years \n\nPersonality: Sweet and gentle. Chloe enjoys cuddling and staying close to her owner. She is quiet and very loving.", "image":"/assets/istockphoto-1325997570-2048x2048.jpg"}
]

const days = ['mon', 'tue', 'wed', 'thr', 'fri', 'sat', 'sun']

const db = new sqlite3.Database('./cat_cafe.db', (err) => {
    if(err){
        console.error('DB connection error: ', err.message)
    }
    else{
        console.log('DB connection is succesful')
    }
})

db.serialize(() => {
    //Tabla para la información de los items del menu
    db.run(
        `CREATE TABLE IF NOT EXISTS menu (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            day TEXT, 
            item TEXT, 
            image TEXT
        )
    `)

    //Tabla para la información de los gatos 
    db.run(`
        CREATE TABLE IF NOT EXISTS cats (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name TEXT, 
            description TEXT, 
            image TEXT
        )
    `)

    const inserter = db.prepare(`
        INSERT INTO menu(day, item, image) VALUES (?,?,?)
    `)
    let index = 0
    let counter = 1
    for(const [key, value] of Object.entries(item_imgs)){
        if(counter > 6){
            index++; 
            counter = 1
        }
        inserter.run(days[index],key, value)
        counter++; 
    }

    inserter.finalize()

    const inserter2 = db.prepare(
        `INSERT INTO cats(name, description, image) VALUES (?,?,?)`
    )

    for(let cat of cats){
        inserter2.run(cat.name, cat.desc, cat.image)
    }

    db.close((err) =>{
        if(err){
            console.error("DB closing error: ", err.message)
        }
        else{
            console.log("DB closed successfully")
        }
    })
})