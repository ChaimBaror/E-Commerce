# Database Setup - PostgreSQL

## מבנה הטבלאות

הפרויקט משתמש ב-4 טבלאות עיקריות:

1. **products** - מוצרים ראשיים
2. **variants** - וריאציות/פריטי מלאי (SKU)
3. **images** - תמונות לכל וריאציה
4. **reviews** - ביקורות ורייטינג

## הגדרה ראשונית

### 1. הגדרת Vercel Postgres

1. לך ל-Vercel Dashboard → הפרויקט שלך → Settings → Storage
2. לחץ "Create Database" → בחר "Postgres"
3. העתק את ה-connection string

### 2. הוספת משתני סביבה

הוסף ל-`.env.local`:

```env
POSTGRES_URL=your_postgres_connection_string
# או
DATABASE_URL=your_postgres_connection_string
```

### 3. יצירת הטבלאות

הרץ את ה-SQL schema:

```bash
# אפשרות 1: דרך psql
psql $POSTGRES_URL -f src/lib/db/schema.sql

# אפשרות 2: דרך API route (צריך ליצור)
# GET /api/db/init
```

## שימוש

### דוגמה לשאילתת מוצרים

```typescript
import { getAllProducts, getProductWithVariants } from '@/lib/db/products';

// קבלת כל המוצרים
const products = await getAllProducts();

// קבלת מוצר עם וריאציות ותמונות
const product = await getProductWithVariants('product-id');
```

### דוגמה ליצירת מוצר

```typescript
import { createProduct } from '@/lib/db/products';
import { createVariant } from '@/lib/db/variants';
import { createImage } from '@/lib/db/images';

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
  stock_quantity: 50
});

// הוספת תמונה
await createImage({
  sku_id: variant.sku_id,
  url: 'https://example.com/image.jpg',
  order: 1,
  alt_text: 'חולצה אדומה'
});
```

## פונקציות זמינות

### Products (`src/lib/db/products.ts`)
- `getAllProducts()` - כל המוצרים
- `getProductById(id)` - מוצר לפי ID
- `getProductsByCategory(category)` - מוצרים לפי קטגוריה
- `getProductWithVariants(id)` - מוצר עם וריאציות ותמונות
- `getProductWithDetails(id)` - מוצר עם כל הפרטים כולל ביקורות
- `createProduct(input)` - יצירת מוצר חדש
- `updateProduct(id, input)` - עדכון מוצר
- `deleteProduct(id)` - מחיקת מוצר

### Variants (`src/lib/db/variants.ts`)
- `getVariantById(id)` - וריאציה לפי ID
- `getVariantsByProductId(productId)` - כל הוריאציות של מוצר
- `getVariantWithImages(id)` - וריאציה עם תמונות
- `getAvailableVariants(productId)` - וריאציות זמינות במלאי
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

- **עדכון rating_avg ו-review_count** - מתעדכן אוטומטית כשנוספות/מתעדכנות ביקורות
- **עדכון is_available** - מתעדכן אוטומטית לפי stock_quantity
- **עדכון updated_at** - מתעדכן אוטומטית בכל שינוי

