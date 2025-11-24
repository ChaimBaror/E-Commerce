# הגדרת PostgreSQL - הוראות מפורטות

## סקירה כללית

הפרויקט משתמש ב-PostgreSQL עם Vercel Postgres או PostgreSQL חיצוני.

## מבנה הטבלאות

הפרויקט כולל 4 טבלאות עיקריות:

### 1. **products** - מוצרים ראשיים
- `product_id` (UUID) - מזהה ייחודי
- `name` - שם המוצר
- `description` - תיאור מלא
- `brand` - שם המותג
- `category` - קטגוריה
- `rating_avg` - ממוצע ציונים (מתעדכן אוטומטית)
- `review_count` - מספר ביקורות (מתעדכן אוטומטית)

### 2. **variants** - וריאציות/פריטי מלאי (SKU)
- `sku_id` (UUID) - מזהה ייחודי
- `product_id` - קישור למוצר
- `color` - צבע
- `size` - מידה
- `price` - מחיר
- `stock_quantity` - כמות במלאי
- `is_available` - זמינות (מתעדכן אוטומטית)
- `sale_price` - מחיר מבצע
- `main_image_url` - תמונה ראשית

### 3. **images** - תמונות
- `image_id` - מזהה ייחודי
- `sku_id` - קישור לווריאציה
- `url` - כתובת התמונה
- `order` - סדר הצגה
- `alt_text` - טקסט חלופי

### 4. **reviews** - ביקורות ורייטינג
- `review_id` - מזהה ייחודי
- `product_id` - קישור למוצר
- `user_id` - מזהה משתמש
- `rating` - ציון (1-5)
- `review_text` - טקסט הביקורת

## הגדרה ראשונית

### שלב 1: יצירת מסד נתונים ב-Vercel

1. לך ל-[Vercel Dashboard](https://vercel.com/dashboard)
2. בחר את הפרויקט שלך
3. לך ל-**Settings** → **Storage**
4. לחץ **Create Database** → בחר **Postgres**
5. העתק את ה-connection string

### שלב 2: הוספת משתני סביבה

הוסף ל-`.env.local`:

```env
POSTGRES_URL=your_postgres_connection_string
# או
DATABASE_URL=your_postgres_connection_string
```

**חשוב:** הוסף גם ב-Vercel Dashboard → Settings → Environment Variables

### שלב 3: יצירת הטבלאות ⚠️ **חובה לפני השימוש!**

יש שלוש אפשרויות:

#### אפשרות 1: דרך API route (הכי קל) ⭐

1. הפעל את שרת הפיתוח:
```bash
npm run dev
```

2. פתח בדפדפן או הרץ:
```bash
curl http://localhost:3000/api/db/init
```

או פתח בדפדפן: `http://localhost:3000/api/db/init`

**הערה:** בפיתוח זה עובד ישירות. ב-production צריך להוסיף `DB_INIT_SECRET` ב-`.env.local`.

#### אפשרות 2: דרך psql

```bash
psql $POSTGRES_URL -f src/lib/db/schema.sql
```

#### אפשרות 3: דרך script (אם יש לך tsx)

1. התקן tsx:
```bash
npm install -D tsx
```

2. הרץ:
```bash
npx tsx scripts/init-db.ts
```

### ⚠️ אם אתה מקבל שגיאה "relation does not exist"

זה אומר שהטבלאות עדיין לא נוצרו. הרץ את אחת מהאפשרויות למעלה!
```env
DB_INIT_SECRET=your_secret_key_here
```

2. הרץ:
```bash
curl http://localhost:3000/api/db/init \
  -H "Authorization: Bearer your_secret_key_here"
```

## שימוש בקוד

### ייבוא פונקציות

```typescript
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getVariantsByProductId,
  createVariant,
  getImagesBySkuId,
  createImage,
  getReviewsByProductId,
  createReview,
} from '@/lib/db';
```

### דוגמאות שימוש

#### יצירת מוצר עם וריאציות

```typescript
// יצירת מוצר
const product = await createProduct({
  name: 'חולצת טי בייסיק',
  description: 'תיאור המוצר',
  brand: 'Ella',
  category: 'T-Shirts'
});

// יצירת וריאציה
const variant = await createVariant({
  product_id: product.product_id,
  color: 'אדום',
  size: 'L',
  price: 100,
  stock_quantity: 50,
  main_image_url: 'https://example.com/image.jpg'
});

// הוספת תמונות נוספות
await createImage({
  sku_id: variant.sku_id,
  url: 'https://example.com/image2.jpg',
  order: 2,
  alt_text: 'תמונה נוספת'
});
```

#### קבלת מוצר עם כל הפרטים

```typescript
// מוצר עם וריאציות ותמונות
const product = await getProductWithVariants(productId);

// מוצר עם כל הפרטים כולל ביקורות
const productFull = await getProductWithDetails(productId);
```

#### יצירת ביקורת

```typescript
const review = await createReview({
  product_id: productId,
  user_id: userId,
  rating: 5,
  review_text: 'מוצר מעולה!'
});
// rating_avg ו-review_count מתעדכנים אוטומטית
```

## פונקציות זמינות

### Products (`src/lib/db/products.ts`)
- `getAllProducts()` - כל המוצרים
- `getProductById(id)` - מוצר לפי ID
- `getProductsByCategory(category)` - מוצרים לפי קטגוריה
- `getProductWithVariants(id)` - מוצר עם וריאציות ותמונות
- `getProductWithDetails(id)` - מוצר עם כל הפרטים
- `createProduct(input)` - יצירת מוצר
- `updateProduct(id, input)` - עדכון מוצר
- `deleteProduct(id)` - מחיקת מוצר

### Variants (`src/lib/db/variants.ts`)
- `getVariantById(id)` - וריאציה לפי ID
- `getVariantsByProductId(productId)` - כל הוריאציות של מוצר
- `getVariantWithImages(id)` - וריאציה עם תמונות
- `getAvailableVariants(productId)` - וריאציות זמינות
- `createVariant(input)` - יצירת וריאציה
- `updateVariant(id, input)` - עדכון וריאציה
- `deleteVariant(id)` - מחיקת וריאציה

### Images (`src/lib/db/images.ts`)
- `getImagesBySkuId(skuId)` - תמונות לפי SKU
- `getImageById(id)` - תמונה לפי ID
- `createImage(input)` - הוספת תמונה
- `createMultipleImages(inputs)` - הוספת מספר תמונות
- `updateImage(id, input)` - עדכון תמונה
- `deleteImage(id)` - מחיקת תמונה

### Reviews (`src/lib/db/reviews.ts`)
- `getReviewsByProductId(productId)` - ביקורות לפי מוצר
- `getReviewById(id)` - ביקורת לפי ID
- `getReviewsByUserId(userId)` - ביקורות לפי משתמש
- `createReview(input)` - יצירת ביקורת
- `updateReview(id, input)` - עדכון ביקורת
- `deleteReview(id)` - מחיקת ביקורת

## תכונות אוטומטיות

### 1. עדכון rating_avg ו-review_count
כשנוספת/מתעדכנת/נמחקת ביקורת, `rating_avg` ו-`review_count` מתעדכנים אוטומטית בטבלת `products`.

### 2. עדכון is_available
כש-`stock_quantity` משתנה, `is_available` מתעדכן אוטומטית:
- `stock_quantity > 0` → `is_available = true`
- `stock_quantity = 0` → `is_available = false`

### 3. עדכון updated_at
כל טבלה מתעדכנת אוטומטית עם `updated_at` כשמתבצע שינוי.

## בדיקת חיבור

```typescript
import { testConnection } from '@/lib/db';

const result = await testConnection();
if (result.success) {
  console.log('Database connected!', result.time);
} else {
  console.error('Connection failed:', result.error);
}
```

## פתרון בעיות

### שגיאת חיבור
- ודא ש-`POSTGRES_URL` או `DATABASE_URL` מוגדרים
- ודא שה-connection string תקין
- בדוק שהמסד נתונים פעיל ב-Vercel

### שגיאת טבלאות לא קיימות
- הרץ את `schema.sql` שוב
- ודא שהטבלאות נוצרו: `SELECT * FROM information_schema.tables;`

### שגיאת הרשאות
- ודא שהמשתמש יש לו הרשאות CREATE, INSERT, UPDATE, DELETE
- ב-Vercel Postgres זה אמור לעבוד אוטומטית

## קבצים חשובים

- `src/lib/db/schema.sql` - הגדרת הטבלאות
- `src/lib/db/index.ts` - חיבור למסד נתונים
- `src/lib/db/products.ts` - פונקציות מוצרים
- `src/lib/db/variants.ts` - פונקציות וריאציות
- `src/lib/db/images.ts` - פונקציות תמונות
- `src/lib/db/reviews.ts` - פונקציות ביקורות
- `src/types/database.ts` - טיפוסי TypeScript

