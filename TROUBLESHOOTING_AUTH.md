# פתרון בעיות התחברות Google

## בעיות נפוצות ופתרונות

### 1. שגיאת "Configuration" או "NEXTAUTH_SECRET is missing"

**פתרון:**
1. צור קובץ `.env.local` בתיקיית השורש של הפרויקט
2. הוסף את המשתנים הבאים:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# NextAuth.js (חובה!)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here
```

3. **יצירת NEXTAUTH_SECRET:**
   - הרץ את הפקודה הבאה בטרמינל:
   ```bash
   openssl rand -base64 32
   ```
   - העתק את התוצאה והדבק ב-`NEXTAUTH_SECRET`

4. **אל תשכח:**
   - הפעל מחדש את שרת הפיתוח (`npm run dev`) אחרי הוספת משתני הסביבה

### 2. שגיאת "AccessDenied"

**פתרון:**
1. ודא שב-Google Cloud Console:
   - ה-API של Google+ מופעל
   - ה-Client ID וה-Secret נכונים
   - ה-Redirect URI מוגדר נכון: `http://localhost:3000/api/auth/callback/google`

2. בדוק שהמשתמש מורשה להשתמש ב-OAuth

### 3. הכפתור לא עובד או לא קורה כלום

**פתרון:**
1. פתח את הקונסול בדפדפן (F12) ובדוק אם יש שגיאות
2. ודא שכל המשתנים ב-`.env.local` מוגדרים נכון
3. ודא שהשרת רץ על הפורט הנכון (3000)
4. נסה לנקות את ה-cache:
   ```bash
   rm -rf .next
   npm run dev
   ```

### 4. אחרי התחברות לא מעביר לדף הפרופיל

**פתרון:**
1. בדוק שהדף `/user` קיים
2. בדוק שהמשתמש מחובר (בדוק ב-Navbar אם יש אווטר)
3. בדוק את הקונסול לשגיאות JavaScript

### 5. בדיקת הגדרות Google Cloud Console

1. לך ל-[Google Cloud Console](https://console.cloud.google.com/)
2. בחר את הפרויקט שלך
3. לך ל-"APIs & Services" > "Credentials"
4. ודא שיש לך OAuth 2.0 Client ID
5. ודא שה-Redirect URI מוגדר:
   - `http://localhost:3000/api/auth/callback/google` (פיתוח)
   - `https://yourdomain.com/api/auth/callback/google` (ייצור)

### 6. בדיקת קבצים

ודא שהקבצים הבאים קיימים:
- ✅ `src/lib/auth.ts` - הגדרות NextAuth
- ✅ `src/app/api/auth/[...nextauth]/route.ts` - API route
- ✅ `src/app/auth/signin/page.tsx` - עמוד התחברות
- ✅ `src/app/auth/error/page.tsx` - עמוד שגיאות
- ✅ `src/app/user/page.tsx` - עמוד פרופיל
- ✅ `.env.local` - משתני סביבה (לא ב-git!)

### 7. בדיקת לוגים

פתח את הקונסול בדפדפן ובדוק:
- שגיאות JavaScript
- בקשות רשת (Network tab)
- האם יש redirects שלא עובדים

### 8. איפוס מלא

אם כלום לא עובד:
1. מחק את התיקייה `.next`:
   ```bash
   rm -rf .next
   ```
2. מחק את ה-node_modules והתקן מחדש:
   ```bash
   rm -rf node_modules
   npm install
   ```
3. ודא ש-`.env.local` קיים ומוגדר נכון
4. הפעל מחדש את השרת:
   ```bash
   npm run dev
   ```

## בדיקת תקינות

לאחר ההגדרה, בדוק:
1. ✅ כניסה ל-`/auth/signin` מציגה את עמוד ההתחברות
2. ✅ לחיצה על "המשך עם Google" מעבירה ל-Google
3. ✅ אחרי אישור ב-Google, חוזר לאפליקציה
4. ✅ מועבר לדף `/user` עם פרטי המשתמש
5. ✅ ב-Navbar מופיע אווטר של המשתמש

## תמיכה

אם הבעיה נמשכת:
1. בדוק את הלוגים בקונסול
2. בדוק את הלוגים בשרת (טרמינל)
3. בדוק את ה-Network tab בדפדפן
4. ודא שכל הקבצים קיימים ומוגדרים נכון

