const img = (id) => `https://images.unsplash.com/${id}?w=900&q=80&auto=format&fit=crop`;

// Image pool - har product ko id ke hisaab se ek image milti hai.
// Apni real product images ho to P() me image ki jagah seedha URL daal sakte ho.
const IMG_POOL = [
  "photo-1521572163474-6864f9cf17ab", "photo-1503342217505-b0a15ec3261c",
  "photo-1489987707025-afc232f7ea0f", "photo-1594938298603-c8148c4dae35",
  "photo-1515886657613-9f3515b0c78f", "photo-1483985988355-763728e1935b",
  "photo-1434389677669-e08b4cac3105", "photo-1556905055-8f358a7a47b2",
  "photo-1576566588028-4147f3842f27", "photo-1542272604-787c3835535d",
  "photo-1551028719-00167b16eac5", "photo-1523381210434-271e8be1f52b",
  "photo-1496747611176-843222e1e57c", "photo-1591047139829-d91aecb6caea",
  "photo-1562157873-818bc0726f68", "photo-1539109136881-3be0616acf4b",
  "photo-1594633312681-425c7b97ccd1", "photo-1620799140408-edc6dcb6d633",
  "photo-1583743814966-8936f5b7be1a", "photo-1509631179647-0177331693ae",
  "photo-1572804013309-59a88b7e92f1", "photo-1495385794356-15371f348c31",
];

// Size sets
const TOPS = ["S", "M", "L", "XL"];
const TOPS2 = ["M", "L", "XL", "XXL"];
const WAIST = ["28", "30", "32", "34", "36"];
const WOMEN = ["XS", "S", "M", "L", "XL"];
const SHOE_M = ["UK 7", "UK 8", "UK 9", "UK 10"];
const SHOE_W = ["UK 4", "UK 5", "UK 6", "UK 7"];
const KIDS = ["2-3Y", "4-5Y", "6-7Y", "8-9Y"];
const BABY = ["0-3M", "3-6M", "6-9M"];
const FREE = ["Free Size"];
const ONE = ["One Size"];

// Helper: P(id, brand, name, category, price, oldPrice, sizes, colors, rating, reviews, tag, description)
const P = (id, brand, name, category, price, oldPrice, sizes, colors, rating, reviews, tag, description) => ({
  id, name: `${brand} ${name}`, brand, category, price, oldPrice,
  image: img(IMG_POOL[id % IMG_POOL.length]),
  sizes, colors, rating, reviews, tag, description,
});

const baseProducts = [
  {
    id: 1, name: "Classic White Tee", category: "Men", price: 1299, oldPrice: 1799,
    image: img("photo-1521572163474-6864f9cf17ab"),
    sizes: ["S", "M", "L", "XL"], colors: ["White", "Black"], rating: 4.6, reviews: 128, tag: "Bestseller",
    description: "Premium 100% organic cotton tee with a relaxed fit. Soft, breathable and made to last.",
  },
  {
    id: 2, name: "Urban Black Hoodie", category: "Men", price: 2999, oldPrice: 3999,
    image: img("photo-1503342217505-b0a15ec3261c"),
    sizes: ["M", "L", "XL", "XXL"], colors: ["Black", "Grey"], rating: 4.8, reviews: 94, tag: "New",
    description: "Heavyweight fleece hoodie with a brushed interior. Built for cool evenings and city streets.",
  },
  {
    id: 3, name: "Linen Summer Shirt", category: "Men", price: 2199, oldPrice: null,
    image: img("photo-1489987707025-afc232f7ea0f"),
    sizes: ["S", "M", "L", "XL"], colors: ["Beige", "Sky"], rating: 4.5, reviews: 61, tag: null,
    description: "Lightweight pure linen shirt that keeps you cool and sharp through the hottest days.",
  },
  {
    id: 4, name: "Tailored Wool Blazer", category: "Men", price: 7999, oldPrice: 9999,
    image: img("photo-1594938298603-c8148c4dae35"),
    sizes: ["M", "L", "XL"], colors: ["Charcoal", "Navy"], rating: 4.9, reviews: 43, tag: "Premium",
    description: "Slim-fit wool-blend blazer, fully lined with a structured shoulder for a sharp silhouette.",
  },
  {
    id: 5, name: "Floral Midi Dress", category: "Women", price: 3499, oldPrice: 4499,
    image: img("photo-1515886657613-9f3515b0c78f"),
    sizes: ["XS", "S", "M", "L"], colors: ["Rose", "Ivory"], rating: 4.7, reviews: 152, tag: "Bestseller",
    description: "Flowy midi dress in a soft viscose blend with a flattering wrap waist and floral print.",
  },
  {
    id: 6, name: "Silk Satin Blouse", category: "Women", price: 2799, oldPrice: null,
    image: img("photo-1483985988355-763728e1935b"),
    sizes: ["XS", "S", "M", "L"], colors: ["Champagne", "Black"], rating: 4.6, reviews: 77, tag: "New",
    description: "Luxuriously smooth satin blouse. Dress it up for evenings or down with denim.",
  },
  {
    id: 7, name: "Everyday Knit Cardigan", category: "Women", price: 2599, oldPrice: 3299,
    image: img("photo-1434389677669-e08b4cac3105"),
    sizes: ["S", "M", "L", "XL"], colors: ["Oat", "Sage"], rating: 4.4, reviews: 58, tag: null,
    description: "Chunky soft knit cardigan with pockets. Your go-to layer for every season.",
  },
  {
    id: 8, name: "Leather Belt Classic", category: "Accessories", price: 1499, oldPrice: null,
    image: img("photo-1556905055-8f358a7a47b2"),
    sizes: ["One Size"], colors: ["Brown", "Black"], rating: 4.5, reviews: 33, tag: null,
    description: "Full-grain leather belt with a brushed metal buckle. Gets better with age.",
  },
];

const newProducts = [
  // ───────────── MEN (9 – 46) ─────────────
  P(9, "Levi's", "511 Slim Fit Jeans", "Men", 3499, 4999, WAIST, ["Indigo", "Black"], 4.7, 312, "Bestseller", "Iconic slim-fit stretch denim with a mid-rise waist. Comfortable all day and holds its shape wash after wash."),
  P(10, "Nike", "Dri-FIT Running Tee", "Men", 1995, 2495, TOPS, ["Volt", "Black"], 4.6, 204, "Trending", "Sweat-wicking Dri-FIT fabric with mesh back panels to keep you dry through every run."),
  P(11, "Adidas", "Originals Track Jacket", "Men", 4999, 6999, TOPS2, ["Navy", "Black"], 4.7, 176, "Bestseller", "Retro tricot track jacket with the signature 3-Stripes down the sleeves and a full zip front."),
  P(12, "Puma", "Essentials Fleece Joggers", "Men", 2499, 3499, TOPS, ["Grey Melange", "Black"], 4.5, 142, null, "Soft brushed-fleece joggers with an elastic drawcord waist and tapered cuffs."),
  P(13, "Allen Solly", "Slim Fit Formal Shirt", "Men", 1799, 2499, TOPS, ["White", "Light Blue"], 4.4, 188, null, "Wrinkle-resistant cotton-blend formal shirt with a crisp spread collar for boardroom-ready looks."),
  P(14, "Van Heusen", "Slim Fit Formal Trousers", "Men", 2299, 2999, WAIST, ["Charcoal", "Navy"], 4.5, 119, null, "Flat-front trousers in a stretch poly-viscose blend with a clean tailored finish."),
  P(15, "Peter England", "Pique Polo T-Shirt", "Men", 999, 1499, TOPS, ["Maroon", "Teal"], 4.3, 267, "Sale", "Breathable cotton pique polo with a two-button placket and ribbed collar."),
  P(16, "U.S. Polo Assn.", "Classic Denim Jacket", "Men", 3999, 5499, TOPS, ["Mid Blue", "Washed Black"], 4.6, 98, null, "Rugged cotton denim jacket with chest pockets and metal button closure. A year-round layer."),
  P(17, "Tommy Hilfiger", "Crew Neck Cotton Sweater", "Men", 5999, 8999, TOPS, ["Navy", "Ecru"], 4.8, 87, "Premium", "Fine-gauge pure cotton knit with the embroidered flag logo on the chest."),
  P(18, "Calvin Klein", "Cotton Boxer Briefs (Pack of 3)", "Men", 1799, null, ["S", "M", "L", "XL"], ["Black", "Grey"], 4.7, 421, "Bestseller", "Stretch cotton boxer briefs with the signature logo waistband and no-ride-up legs."),
  P(19, "Raymond", "Contemporary Fit Wool Trousers", "Men", 4499, null, WAIST, ["Dark Grey", "Brown"], 4.7, 66, "Premium", "Made from fine Raymond wool-blend fabric with a smooth drape and sharp crease."),
  P(20, "Louis Philippe", "Checked Cotton Shirt", "Men", 2699, 3299, TOPS, ["Blue Check", "Green Check"], 4.5, 109, null, "Soft 2-ply cotton shirt with a refined check pattern. Smart enough for office, relaxed enough for brunch."),
  P(21, "Jack & Jones", "Relaxed Cargo Shorts", "Men", 1999, 2799, WAIST, ["Olive", "Khaki"], 4.4, 93, null, "Washed cotton twill cargo shorts with six utility pockets and an adjustable waist."),
  P(22, "Roadster", "Bomber Jacket", "Men", 2999, 4499, TOPS2, ["Olive", "Black"], 4.3, 156, "Trending", "Lightweight padded bomber with ribbed cuffs and hem, zip pockets and a quilted lining."),
  P(23, "HRX", "Quick-Dry Training Shorts", "Men", 899, 1299, TOPS, ["Black", "Royal Blue"], 4.2, 238, "Sale", "Four-way stretch shorts with an internal drawcord and a zip pocket for your phone or keys."),
  P(24, "Wrangler", "Straight Fit Jeans", "Men", 2799, 3799, WAIST, ["Dark Wash", "Light Wash"], 4.5, 134, null, "Classic straight-leg jeans in durable mid-weight denim with a regular rise."),
  P(25, "Lee", "Stretch Chino Pants", "Men", 2199, 2999, WAIST, ["Khaki", "Navy"], 4.4, 101, null, "Smart-casual chinos with a hint of stretch for easy movement and a clean tapered leg."),
  P(26, "Gap", "Logo Pullover Hoodie", "Men", 3499, 4499, TOPS2, ["Heather Grey", "Navy"], 4.6, 165, "Bestseller", "Cozy French-terry hoodie with a kangaroo pocket and the iconic Gap arch logo."),
  P(27, "Uniqlo", "AIRism Cotton Crew Tee", "Men", 1490, null, TOPS, ["White", "Dark Grey"], 4.7, 289, "Trending", "Smooth, cool-touch fabric with a silky feel that stays comfortable in humid weather."),
  P(28, "Marks & Spencer", "Pure Merino Wool Pullover", "Men", 4999, null, TOPS, ["Burgundy", "Forest Green"], 4.8, 54, "Premium", "Luxuriously soft extra-fine merino with ribbed trims. Naturally warm yet breathable."),
  P(29, "Woodland", "Leather Outdoor Boots", "Men", 5495, 6495, SHOE_M, ["Camel", "Dark Brown"], 4.6, 342, "Bestseller", "Genuine leather boots with a rugged rubber sole, cushioned insole and durable stitching."),
  P(30, "Nike", "Air Max 270 Sneakers", "Men", 9995, 11995, SHOE_M, ["White/Black", "Navy/Red"], 4.8, 218, "Premium", "Big Air heel unit for all-day cushioning with a breathable mesh upper and bold modern profile."),
  P(31, "Adidas", "Ultraboost Running Shoes", "Men", 14999, 17999, SHOE_M, ["Core Black", "Cloud White"], 4.9, 175, "Premium", "Responsive Boost midsole and Primeknit+ upper for a snug, energy-returning ride."),
  P(32, "Puma", "Suede Classic Sneakers", "Men", 5999, 7999, SHOE_M, ["Peacoat", "Burgundy"], 4.6, 207, null, "The timeless suede low-top that has been a streetwear staple for decades."),
  P(33, "Fabindia", "Pure Cotton Kurta", "Men", 1899, 2399, TOPS, ["Off White", "Indigo"], 4.6, 143, null, "Handcrafted straight kurta in breathable handloom-style cotton with a mandarin collar."),
  P(34, "Manyavar", "Embroidered Festive Kurta Set", "Men", 6999, 8999, TOPS, ["Cream", "Wine"], 4.7, 72, "Premium", "Jacquard silk-blend kurta with subtle thread embroidery, paired with matching churidar for weddings and festivities."),
  P(35, "Blackberrys", "Linen Blend Blazer", "Men", 6499, 8499, ["38", "40", "42", "44"], ["Stone", "Navy"], 4.5, 48, null, "Unstructured summer blazer in breathable linen-cotton blend with patch pockets."),
  P(36, "Park Avenue", "Formal Waistcoat", "Men", 2999, null, ["38", "40", "42", "44"], ["Charcoal", "Black"], 4.4, 37, null, "Five-button textured waistcoat with a satin back and adjustable strap for a polished three-piece look."),
  P(37, "Spykar", "Skinny Fit Distressed Jeans", "Men", 1999, 2999, WAIST, ["Ice Blue", "Dark Grey"], 4.2, 181, "Sale", "Low-rise skinny jeans with light distressing and stretch for a modern street look."),
  P(38, "Flying Machine", "Graphic Print Tee", "Men", 899, 1299, TOPS, ["Black", "Mustard"], 4.1, 226, "Sale", "Regular-fit cotton jersey tee with a bold chest graphic print."),
  P(39, "Wildcraft", "Packable Rain Jacket", "Men", 3299, 3999, TOPS2, ["Orange", "Dark Blue"], 4.5, 112, null, "Waterproof taped-seam jacket with an adjustable hood that packs into its own pocket."),
  P(40, "Columbia", "Steens Mountain Fleece Jacket", "Men", 5999, 7999, TOPS2, ["Charcoal", "Collegiate Navy"], 4.8, 79, "Premium", "Soft recycled-fleece full-zip jacket that traps warmth without the bulk."),
  P(41, "Decathlon Quechua", "MH100 Trekking Pants", "Men", 1799, null, WAIST, ["Khaki", "Black"], 4.4, 154, null, "Durable, quick-drying stretch pants with zip pockets, built for long hikes."),
  P(42, "BOSS", "Cotton Pique Polo", "Men", 7999, 9999, TOPS, ["Navy", "White"], 4.8, 41, "Premium", "Slim-fit Italian-styled polo with a rubberised logo patch and tonal collar."),
  P(43, "Fila", "Sports Track Pants", "Men", 1599, 2299, TOPS, ["Black", "Navy"], 4.3, 129, null, "Lightweight tricot track pants with side stripes and zipped ankle cuffs."),
  P(44, "Reebok", "Workout Ready Sleeveless Tee", "Men", 1099, 1499, TOPS, ["Grey", "Black"], 4.2, 85, null, "Speedwick moisture-managing gym tee with a deep armhole cut for full range of motion."),
  P(45, "Superdry", "Vintage Logo Embroidered Tee", "Men", 2999, 3999, TOPS, ["Optic White", "Dark Navy"], 4.5, 63, null, "Soft organic cotton tee with a retro embroidered logo and a relaxed everyday fit."),
  P(46, "Being Human", "Henley Full Sleeve Tee", "Men", 1299, 1799, TOPS, ["Olive", "Maroon"], 4.3, 97, null, "Waffle-knit henley with a three-button placket. Layer it or wear it solo."),

  // ───────────── WOMEN (47 – 84) ─────────────
  P(47, "Biba", "Anarkali Kurta Set with Dupatta", "Women", 3999, 5499, WOMEN, ["Mustard", "Teal"], 4.7, 211, "Bestseller", "Flared cotton-silk anarkali with gota-patti detailing, churidar and a printed chiffon dupatta."),
  P(48, "W", "Printed Straight Kurta", "Women", 1599, 2199, WOMEN, ["Indigo", "Coral"], 4.4, 187, null, "Everyday straight kurta with a block-print yoke and three-quarter sleeves in soft cambric."),
  P(49, "Global Desi", "Tiered Boho Maxi Dress", "Women", 3299, 4299, WOMEN, ["Sunset Orange", "Navy"], 4.6, 138, "Trending", "Free-flowing tiered maxi in a breezy printed viscose with smocked bodice and puff sleeves."),
  P(50, "Zara", "Satin Slip Dress", "Women", 4990, null, WOMEN, ["Champagne", "Emerald"], 4.5, 92, "New", "Bias-cut midi slip dress with adjustable straps and a fluid satin finish."),
  P(51, "H&M", "Ribbed Knit Fitted Top", "Women", 899, 1299, WOMEN, ["Cream", "Black"], 4.3, 264, "Sale", "Stretchy rib-knit top with a scoop neck. A wardrobe basic for layering."),
  P(52, "Mango", "Wide-Leg Pleated Trousers", "Women", 3590, 4590, WOMEN, ["Beige", "Black"], 4.6, 104, null, "High-waist fluid trousers with front pleats and a floor-skimming wide leg."),
  P(53, "Levi's", "High Rise Mom Jeans", "Women", 3799, 4999, ["26", "28", "30", "32"], ["Light Indigo", "Washed Black"], 4.7, 233, "Bestseller", "Relaxed vintage-inspired jeans with a high rise and tapered leg in authentic rigid-feel denim."),
  P(54, "Vero Moda", "Cropped Boxy Blazer", "Women", 3299, 4299, WOMEN, ["Ivory", "Tan"], 4.4, 71, null, "Structured cropped blazer with padded shoulders and a single-button closure."),
  P(55, "ONLY", "Oversized Denim Jacket", "Women", 2999, 3999, WOMEN, ["Mid Blue", "Light Blue"], 4.5, 126, null, "Boyfriend-fit denim jacket with dropped shoulders and distressed hem."),
  P(56, "AND", "Pleated Midi Skirt", "Women", 2490, 3290, WOMEN, ["Dusty Pink", "Olive"], 4.4, 88, null, "Sunray-pleated midi skirt in lightweight georgette with an elasticated waistband."),
  P(57, "Allen Solly Woman", "Regular Fit Formal Shirt", "Women", 1799, null, WOMEN, ["White", "Powder Blue"], 4.3, 75, null, "Crisp cotton-blend work shirt with a curved hem and concealed button placket."),
  P(58, "Libas", "Cotton Kurta with Palazzo", "Women", 2199, 2999, WOMEN, ["Maroon", "Bottle Green"], 4.5, 195, "Trending", "Straight kurta with intricate print paired with flowy palazzo for effortless festive wear."),
  P(59, "Aurelia", "Floral Cotton Kurti", "Women", 1199, 1699, WOMEN, ["Peach", "Sky Blue"], 4.2, 302, "Sale", "Light and breathable A-line kurti with a delicate floral print, perfect for daily wear."),
  P(60, "Nike", "Swoosh Medium-Support Sports Bra", "Women", 2495, null, WOMEN, ["Black", "Pink Foam"], 4.7, 168, "Bestseller", "Dri-FIT padded sports bra with a racerback design for comfortable support."),
  P(61, "Adidas", "Techfit High-Rise Leggings", "Women", 2999, 3999, WOMEN, ["Black", "Wonder Taupe"], 4.6, 140, null, "Compressive moisture-absorbing leggings with a hidden waistband pocket."),
  P(62, "Puma", "Relaxed Cropped Hoodie", "Women", 3499, 4499, WOMEN, ["Lilac", "Off White"], 4.5, 109, "New", "Soft brushed-back cropped hoodie with a drawcord hood and ribbed hem."),
  P(63, "Tommy Hilfiger", "Stretch Polo Dress", "Women", 5999, 7999, WOMEN, ["Navy", "White"], 4.7, 52, "Premium", "Sporty-chic polo dress in stretch cotton piqué with a tipped collar and relaxed A-line shape."),
  P(64, "Calvin Klein", "Wrap Blazer Dress", "Women", 8999, null, WOMEN, ["Black", "Ecru"], 4.8, 34, "Premium", "Sleek wrap-front blazer dress with structured shoulders for power dressing."),
  P(65, "Marks & Spencer", "Linen Blend Co-ord Set", "Women", 4999, 6499, WOMEN, ["Sand", "Sage"], 4.6, 61, "New", "Breathable shirt-and-trouser co-ord in a natural linen blend. Easy to mix and match."),
  P(66, "Fabindia", "Handloom Cotton Saree", "Women", 3499, null, FREE, ["Indigo", "Rust"], 4.7, 118, null, "Authentic handwoven cotton saree with a contrast border and an earthy hand-feel."),
  P(67, "Taneira", "Kanjivaram Pure Silk Saree", "Women", 12999, 15999, FREE, ["Royal Blue", "Magenta"], 4.9, 46, "Premium", "Traditional Kanjivaram pure silk with a woven zari border and rich pallu, made for weddings."),
  P(68, "Soch", "Banarasi Silk Blend Saree", "Women", 7999, 9999, FREE, ["Gold", "Wine"], 4.6, 83, null, "Opulent Banarasi weave with intricate floral motifs and a detailed zari pallu."),
  P(69, "Anita Dongre", "Embroidered Lehenga Set", "Women", 24999, 29999, WOMEN, ["Blush Pink", "Ivory"], 4.9, 19, "Premium", "Hand-embroidered three-piece lehenga set in lustrous silk-organza. A statement bridal-guest outfit."),
  P(70, "Max", "Printed Cotton Night Suit", "Women", 1299, 1799, WOMEN, ["Navy Print", "Pink Print"], 4.3, 177, null, "Super-soft cotton jersey top-and-pyjama set with piping detail for a restful night."),
  P(71, "Zivame", "Cotton Pyjama Set", "Women", 1499, null, WOMEN, ["Lavender", "Mint"], 4.4, 96, null, "Relaxed pyjama set in breathable modal-cotton with an elasticated waist."),
  P(72, "Uniqlo", "Ultra Light Down Jacket", "Women", 5990, 6990, WOMEN, ["Navy", "Wine"], 4.8, 132, "Trending", "Featherweight down puffer that compresses into a pouch. Warmth without bulk."),
  P(73, "Vero Moda", "Faux Leather Biker Jacket", "Women", 4499, 5999, WOMEN, ["Black", "Oxblood"], 4.5, 78, null, "Edgy vegan-leather biker with asymmetric zip, silver hardware and a quilted lining."),
  P(74, "Gap", "Vintage Soft Crewneck Sweatshirt", "Women", 2999, 3999, WOMEN, ["Heather Grey", "Rose"], 4.6, 154, null, "Ultra-soft fleece-back sweatshirt with a slightly oversized, lived-in fit."),
  P(75, "Marks & Spencer", "Cashmere Blend Sweater", "Women", 6999, null, WOMEN, ["Camel", "Soft Pink"], 4.8, 42, "Premium", "Indulgently soft wool-cashmere blend knit with a relaxed round neck."),
  P(76, "Mango", "Double-Breasted Trench Coat", "Women", 7990, 9990, WOMEN, ["Stone", "Black"], 4.7, 58, "Premium", "Timeless water-repellent trench with a belted waist, storm flap and classic lapels."),
  P(77, "H&M", "Linen-Blend Shirt Dress", "Women", 2299, null, WOMEN, ["White", "Khaki"], 4.4, 101, null, "Knee-length button-down dress with a self-tie belt and chest pockets."),
  P(78, "ONLY", "Sleeveless Wide-Leg Jumpsuit", "Women", 3199, 4299, WOMEN, ["Black", "Terracotta"], 4.5, 69, null, "Easy one-piece with a V-neck, tie waist and flowing wide legs."),
  P(79, "Biba", "Cotton Salwar Suit Set", "Women", 2899, null, WOMEN, ["Pink", "Turquoise"], 4.4, 124, null, "Three-piece unstitched-look cotton salwar suit with embroidered neckline and printed dupatta."),
  P(80, "Westside", "Printed Maxi Skirt", "Women", 1499, 1999, WOMEN, ["Navy Floral", "Green Floral"], 4.2, 89, "Sale", "Flowing printed maxi skirt with a smocked waist for a relaxed bohemian vibe."),
  P(81, "Steve Madden", "Block Heel Sandals", "Women", 6999, null, SHOE_W, ["Tan", "Black"], 4.5, 57, "Premium", "Ankle-strap block heel sandals with a cushioned footbed that's comfortable from desk to dinner."),
  P(82, "Nike", "Air Force 1 '07 Women's Sneakers", "Women", 8995, null, SHOE_W, ["Triple White", "Pale Ivory"], 4.9, 263, "Bestseller", "The legendary AF1 with crisp leather, Nike Air cushioning and a classic court silhouette."),
  P(83, "Crocs", "Classic Clogs", "Women", 3495, 4495, SHOE_W, ["Lavender", "Navy"], 4.4, 410, "Trending", "Lightweight Croslite clogs with ventilation ports and a pivoting heel strap."),
  P(84, "Clarks", "Leather Penny Loafers", "Women", 6499, 7999, SHOE_W, ["Burgundy", "Black"], 4.6, 64, null, "Soft leather loafers with a padded collar and a flexible sole for all-day wear."),

  // ───────────── KIDS (85 – 96) ─────────────
  P(85, "Gini & Jony", "Cotton Party Frock", "Kids", 1299, 1799, KIDS, ["Pink", "Mint"], 4.5, 86, null, "Twirl-worthy frock in soft cotton with a net underlay and bow detail."),
  P(86, "Max Kids", "Graphic Print T-Shirt (Pack of 2)", "Kids", 499, 799, KIDS, ["Blue/Grey", "Red/Navy"], 4.2, 174, "Sale", "Skin-friendly cotton tees with fun prints that survive playground adventures."),
  P(87, "H&M", "Kids Denim Dungarees", "Kids", 1499, null, KIDS, ["Light Denim", "Dark Denim"], 4.6, 59, "Trending", "Adjustable-strap dungarees in soft washed denim with roomy pockets."),
  P(88, "Puma", "Kids Sports Tracksuit", "Kids", 2999, 3999, KIDS, ["Navy", "Red"], 4.5, 72, null, "Full-zip jacket and joggers set in smooth tricot, ideal for school sports days."),
  P(89, "Nike", "Kids Revolution Sneakers", "Kids", 3995, null, ["UK 11C", "UK 12C", "UK 13C", "UK 1Y"], ["White/Blue", "Black/Pink"], 4.7, 48, "New", "Lightweight breathable runners with hook-and-loop strap for quick on-and-off."),
  P(90, "Mothercare", "Baby Romper Set (Pack of 3)", "Kids", 1599, 1999, BABY, ["Pastel Mix", "Blue Mix"], 4.8, 123, "Bestseller", "Ultra-soft organic cotton rompers with snap buttons and envelope shoulders."),
  P(91, "Biba", "Girls Lehenga Choli", "Kids", 2999, 3999, KIDS, ["Coral", "Royal Blue"], 4.6, 54, null, "Festive lehenga set with a gotta-lace border, matching choli and sheer dupatta."),
  P(92, "Fabindia", "Kids Kurta Pajama Set", "Kids", 1799, null, KIDS, ["Sky Blue", "White"], 4.5, 41, null, "Comfortable handloom-feel cotton kurta pajama set for festivals and family functions."),
  P(93, "United Colors of Benetton", "Boys Zip-Through Hoodie", "Kids", 1999, 2799, KIDS, ["Navy", "Green"], 4.4, 67, null, "Warm brushed-fleece hoodie with kangaroo pockets and a colour-pop drawcord."),
  P(94, "Adidas", "Kids 3-Stripes Shorts", "Kids", 1299, null, KIDS, ["Black", "Royal Blue"], 4.3, 52, null, "Easy-fit cotton-blend shorts with an elastic waist and 3-Stripes on the sides."),
  P(95, "Zara", "Kids Quilted Puffer Jacket", "Kids", 3990, 4990, KIDS, ["Navy", "Mustard"], 4.6, 38, "Premium", "Water-repellent puffer with a soft lining, snap closure and a cozy collar."),
  P(96, "Carter's", "Baby Cotton Sleepsuit", "Kids", 1299, null, BABY, ["Cream Bear", "Light Blue"], 4.8, 105, null, "Zip-front footed sleepsuit in gentle interlock cotton with fold-over mitten cuffs."),

  // ───────────── ACCESSORIES (97 – 108) ─────────────
  P(97, "Ray-Ban", "Wayfarer Classic Sunglasses", "Accessories", 7490, 8990, ONE, ["Black/Green", "Havana/Brown"], 4.8, 354, "Bestseller", "The iconic acetate Wayfarer with 100% UV-protective G-15 lenses."),
  P(98, "Fossil", "Genuine Leather Bifold Wallet", "Accessories", 2995, 3995, ONE, ["Brown", "Black"], 4.6, 146, null, "Slim bifold wallet with RFID protection, card slots and a coin pocket."),
  P(99, "Titan", "Edge Slim Analog Watch", "Accessories", 9995, 12995, ONE, ["Silver", "Rose Gold"], 4.7, 88, "Premium", "Ultra-slim 3.5 mm case with sapphire glass and a minimalist dial."),
  P(100, "Hidesign", "Leather Messenger Bag", "Accessories", 7995, 9995, ONE, ["Tan", "Dark Brown"], 4.7, 71, "Premium", "Handcrafted vegetable-tanned leather messenger with a padded laptop sleeve."),
  P(101, "Wildcraft", "30L Daypack Backpack", "Accessories", 2199, 2999, ONE, ["Navy", "Grey"], 4.5, 267, "Bestseller", "Water-resistant backpack with a padded back panel, laptop compartment and rain cover."),
  P(102, "Pashmina Co.", "Handwoven Pashmina Shawl", "Accessories", 4999, 6499, ONE, ["Ivory", "Camel"], 4.8, 39, "Premium", "Ultra-soft handwoven pashmina in a classic fine weave with hand-rolled fringes."),
  P(103, "Tommy Hilfiger", "Reversible Leather Belt", "Accessories", 2999, 3999, ONE, ["Black/Brown"], 4.5, 94, null, "Two-in-one reversible belt with a polished metal logo buckle."),
  P(104, "Casio", "Vintage Digital Watch", "Accessories", 3995, null, ONE, ["Silver", "Gold"], 4.6, 213, "Trending", "Retro-styled stainless steel digital watch with alarm, stopwatch and EL backlight."),
  P(105, "Baggit", "Structured Tote Handbag", "Accessories", 2999, 3999, ONE, ["Mustard", "Black"], 4.4, 127, null, "Roomy vegan-leather tote with an inner zip pocket and gold-tone hardware."),
  P(106, "Levi's", "Embroidered Baseball Cap", "Accessories", 1199, 1599, ONE, ["Navy", "Khaki"], 4.3, 82, null, "Cotton twill cap with a curved brim and an adjustable back strap."),
  P(107, "Peter England", "Silk Tie & Pocket Square Set", "Accessories", 899, 1299, ONE, ["Navy", "Burgundy"], 4.2, 65, "Sale", "Woven silk-blend tie with a matching pocket square, gift-box packed."),
  P(108, "Columbia", "Winter Fleece Beanie", "Accessories", 1999, null, ONE, ["Charcoal", "Mustard"], 4.5, 58, null, "Warm Omni-Heat fleece-lined beanie with a snug fold-over cuff."),
];

export const products = [...baseProducts, ...newProducts];