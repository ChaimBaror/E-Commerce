import { ProductBasicInfo, Product, ProductVariant } from "../../types";

// Simple product info for listings (products page)
export const allProducts: ProductBasicInfo[] = [
  {
    id: "9932707234106",
    name: "Ella Smoothing Seamless Short Suit Black",
    price: 300,
    image: ["https://cdn.shopify.com/s/files/1/0930/6551/1226/files/BDS019-RESIZEDBLACK2_png.png?v=1755179735"],
    category: "Bodysuits",
    rating: 4.5,
    reviews: 42
  },
  {
      id: "9932707234107",
      name: "Amarillo Short Ribs",
    price: 300,
    image: ["https://slimages.macysassets.com/is/image/MCY/products/7/optimized/31987607_fpx.tif"],
    category: "Pajamas",
    rating: 4.5,
    reviews: 42
  },
  {
    id: "9932707234108",
    name: "Linen Fitted Sheet Set",
    price: 250,
    image: ["https://slimages.macysassets.com/is/image/MCY/products/8/optimized/33535418_fpx.tif"],
    category: "Pajamas",
    rating: 4.5,
    reviews: 42
  },
  {
    id: "9932707234109",
    name: "Lightweight Duvet Cover Set",
    price: 200,
    image: ["https://slimages.macysassets.com/is/image/MCY/products/3/optimized/33523743_fpx.tif","https://slimages.macysassets.com/is/image/MCY/products/1/optimized/33523811_fpx.tif"],
    category: "Pajamas",
    rating: 4.5,
    reviews: 42
  },
  {
    id: "9932707234110",
    name: "Linen Duvet Cover Set",
    price: 1000,
    image: ["https://slimages.macysassets.com/is/image/MCY/products/3/optimized/33523743_fpx.tif","https://slimages.macysassets.com/is/image/MCY/products/1/optimized/33523811_fpx.tif"],
    category: "Pajamas",
    rating: 4.5,
    reviews: 42
  },
  {
    id: "9932707234111",
    name: "Ella Smoothing Seamless Short Suit",
    price: 100,
    image: ["https://cdn.shopify.com/s/files/1/0930/6551/1226/files/BDS019-RESIZEDBLACK2_png.png?v=1755179735"],
    category: "Bodysuits",
    rating: 4.5,
    reviews: 42
  }
];

// Detailed product data for product detail page
export const detailedProducts: Record<string, Product> = {
  "9932707234106": {
    id: "9932707234106",
    name: "Ella Smoothing Seamless Short Suit Black",
    price: 300,
    originalPrice: 350,
    image: [
      "https://cdn.shopify.com/s/files/1/0930/6551/1226/files/BDS019-RESIZEDBLACK2_png.png?v=1755179735",
      "https://cdn.shopify.com/s/files/1/0930/6551/1226/files/SAN030-RESIZEDBLACK2_png_ee78381d-11bf-4417-9690-3cd08b751e1d.png?v=1750290086",
      "https://cdn.shopify.com/s/files/1/0930/6551/1226/files/SAN030-RESIZEDBLACK2_png_ee78381d-11bf-4417-9690-3cd08b751e1d.png?v=1750290086"
    ],
    category: "Bodysuits",
    rating: 4.5,
    reviews: 42,
    description: "Experience comfort and confidence with the Ella Smoothing Seamless Short Suit. Designed to shape smoothly and seamlessly, it's perfect for wearing with or without a bra. Plus, the open gusset makes bathroom breaks a breeze—no hassle, just easy convenience. Slip into this playful essential and enjoy effortless style all day long!",
    specifications: {
      "Material": "92% Nylon, 8% Spandex",
      "Fit": "Smooth and seamless",
      "Care": "Machine wash cold, hang dry",
      "Origin": "Made in Israel"
    },
    features: [
      "Seamless construction for invisible wear",
      "Open gusset for easy convenience",
      "Can be worn with or without a bra",
      "Smoothing and shaping design"
    ],
    materials: ["Nylon", "Spandex"],
    careInstructions: "Machine wash cold with like colors. Do not bleach. Hang dry. Do not iron.",
    shippingInfo: "Free shipping on orders over ₪200. Standard delivery: 3-5 business days.",
    returnPolicy: "30-day return policy. Items must be unworn and in original packaging.",
    inStock: true,
    stockQuantity: 15,
    sku: "ELLA-SSS-001",
    brand: "Ella",
    tags: ["bodysuit", "seamless", "smoothing", "comfortable", "everyday"],
    availableSizes: ["S", "M", "L", "XL"],
    availableColors: ["Black", "Nude", "Brown"],
    variants: [
      {
        id: "variant-black-s",
        color: "Black",
        size: "S",
        price: "300",
        available: true,
        quantity: 5,
        image: "https://cdn.shopify.com/s/files/1/0930/6551/1226/files/BDS019-RESIZEDBLACK2_png.png?v=1755179735"
      },
      {
        id: "variant-black-m",
        color: "Black",
        size: "M",
        price: "300",
        available: true,
        quantity: 8,
        image: "https://cdn.shopify.com/s/files/1/0930/6551/1226/files/BDS019-RESIZEDBLACK2_png.png?v=1755179735"
      },
      {
        id: "variant-black-l",
        color: "Black",
        size: "L",
        price: "300",
        available: true,
        quantity: 3,
        image: "https://cdn.shopify.com/s/files/1/0930/6551/1226/files/BDS019-RESIZEDBLACK2_png.png?v=1755179735"
      },
      {
        id: "variant-black-xl",
        color: "Black",
        size: "XL",
        price: "300",
        available: true,
        quantity: 2,
        image: "https://cdn.shopify.com/s/files/1/0930/6551/1226/files/BDS019-RESIZEDBLACK2_png.png?v=1755179735"
      },
      {
        id: "variant-nude-s",
        color: "Nude",
        size: "S",
        price: "300",
        available: true,
        quantity: 4,
        image: "https://cdn.shopify.com/s/files/1/0930/6551/1226/files/SAN030-RESIZEDBLACK2_png_ee78381d-11bf-4417-9690-3cd08b751e1d.png?v=1750290086"
      },
      {
        id: "variant-nude-m",
        color: "Nude",
        size: "M",
        price: "300",
        available: true,
        quantity: 6,
        image: "https://cdn.shopify.com/s/files/1/0930/6551/1226/files/SAN030-RESIZEDBLACK2_png_ee78381d-11bf-4417-9690-3cd08b751e1d.png?v=1750290086"
      },
      {
        id: "variant-nude-l",
        color: "Nude",
        size: "L",
        price: "300",
        available: true,
        quantity: 3,
        image: "https://cdn.shopify.com/s/files/1/0930/6551/1226/files/SAN030-RESIZEDBLACK2_png_ee78381d-11bf-4417-9690-3cd08b751e1d.png?v=1750290086"
      },
      {
        id: "variant-brown-m",
        color: "Brown",
        size: "M",
        price: "300",
        available: true,
        quantity: 2,
        image: "https://cdn.shopify.com/s/files/1/0930/6551/1226/files/BDS019-RESIZEDBLACK2_png.png?v=1755179735"
      }
    ] as ProductVariant[]
  },
  "9932707234107": {
    id: "9932707234107",
    name: "Ella Smoothing Seamless Short Suit",
    price: 300,
    image: [
      "https://cdn.shopify.com/s/files/1/0930/6551/1226/files/BDS019-RESIZEDBLACK2_png.png?v=1755179735"
    ],
    category: "Bodysuits",
    rating: 4.5,
    reviews: 42,
    description: "Experience comfort and confidence with the Ella Smoothing Seamless Short Suit. Designed to shape smoothly and seamlessly, it's perfect for wearing with or without a bra. Plus, the open gusset makes bathroom breaks a breeze—no hassle, just easy convenience. Slip into this playful essential and enjoy effortless style all day long!",
    specifications: {
      "Material": "92% Nylon, 8% Spandex",
      "Fit": "Smooth and seamless",
      "Care": "Machine wash cold, hang dry"
    },
    features: [
      "Seamless construction",
      "Open gusset design",
      "Versatile wear options"
    ],
    inStock: true,
    stockQuantity: 8,
    sku: "ELLA-SSS-002",
    brand: "Ella"
  },
  "9932707234108": {
    id: "9932707234108",
    name: "Ella Smoothing Seamless Short Suit",
    price: 250,
    image: [
      "https://cdn.shopify.com/s/files/1/0930/6551/1226/files/BDS019-RESIZEDBLACK2_png.png?v=1755179735"
    ],
    category: "Bodysuits",
    rating: 4.5,
    reviews: 42,
    description: "Experience comfort and confidence with the Ella Smoothing Seamless Short Suit. Designed to shape smoothly and seamlessly, it's perfect for wearing with or without a bra. Plus, the open gusset makes bathroom breaks a breeze—no hassle, just easy convenience. Slip into this playful essential and enjoy effortless style all day long!",
    specifications: {
      "Material": "92% Nylon, 8% Spandex",
      "Fit": "Smooth and seamless"
    },
    inStock: true,
    stockQuantity: 12,
    sku: "ELLA-SSS-003",
    brand: "Ella"
  },
  "9932707234109": {
    id: "9932707234109",
    name: "Ella Smoothing Seamless Short Suit",
    price: 200,
    image: [
      "https://cdn.shopify.com/s/files/1/0930/6551/1226/files/BDS019-RESIZEDBLACK2_png.png?v=1755179735"
    ],
    category: "Bodysuits",
    rating: 4.5,
    reviews: 42,
    description: "Experience comfort and confidence with the Ella Smoothing Seamless Short Suit. Designed to shape smoothly and seamlessly, it's perfect for wearing with or without a bra. Plus, the open gusset makes bathroom breaks a breeze—no hassle, just easy convenience. Slip into this playful essential and enjoy effortless style all day long!",
    inStock: true,
    stockQuantity: 20,
    sku: "ELLA-SSS-004",
    brand: "Ella"
  },
  "9932707234110": {
    id: "9932707234110",
    name: "Ella Smoothing Seamless Short Suit",
    price: 150,
    image: [
      "https://cdn.shopify.com/s/files/1/0930/6551/1226/files/BDS019-RESIZEDBLACK2_png.png?v=1755179735"
    ],
    category: "Bodysuits",
    rating: 4.5,
    reviews: 42,
    description: "Experience comfort and confidence with the Ella Smoothing Seamless Short Suit. Designed to shape smoothly and seamlessly, it's perfect for wearing with or without a bra. Plus, the open gusset makes bathroom breaks a breeze—no hassle, just easy convenience. Slip into this playful essential and enjoy effortless style all day long!",
    inStock: true,
    stockQuantity: 18,
    sku: "ELLA-SSS-005",
    brand: "Ella"
  },
  "9932707234111": {
    id: "9932707234111",
    name: "Ella Smoothing Seamless Short Suit",
    price: 100,
    image: [
      "https://cdn.shopify.com/s/files/1/0930/6551/1226/files/BDS019-RESIZEDBLACK2_png.png?v=1755179735"
    ],
    category: "Bodysuits",
    rating: 4.5,
    reviews: 42,
    description: "Experience comfort and confidence with the Ella Smoothing Seamless Short Suit. Designed to shape smoothly and seamlessly, it's perfect for wearing with or without a bra. Plus, the open gusset makes bathroom breaks a breeze—no hassle, just easy convenience. Slip into this playful essential and enjoy effortless style all day long!",
    inStock: true,
    stockQuantity: 25,
    sku: "ELLA-SSS-006",
    brand: "Ella"
  }
};

// Helper function to get detailed product by id
export function getDetailedProduct(id: string): Product | undefined {
  return detailedProducts[id];
}
