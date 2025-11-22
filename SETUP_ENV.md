# הוראות הגדרת משתני סביבה

## בעיה: `client_id is required`

השגיאה הזו אומרת שמשתני הסביבה של Google OAuth לא מוגדרים.

## פתרון:

### 1. צור קובץ `.env.local` בתיקיית השורש של הפרויקט

צור קובץ חדש בשם `.env.local` בתיקייה הראשית של הפרויקט (באותה רמה כמו `package.json`).

### 2. הוסף את המשתנים הבאים:

```env
# Google OAuth (חובה!)
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# NextAuth.js (חובה!)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Email Configuration (חובה לשליחת מיילי הזמנות!)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here
```

### 3. איך להשיג את הערכים:

#### Google Client ID ו-Secret:
1. לך ל-[Google Cloud Console](https://console.cloud.google.com/)
2. בחר או צור פרויקט
3. לך ל-"APIs & Services" > "Credentials"
4. לחץ על "Create Credentials" > "OAuth 2.0 Client IDs"
5. בחר "Web application"
6. הוסף Redirect URI: `http://localhost:3000/api/auth/callback/google`
7. העתק את ה-Client ID וה-Client Secret

#### NEXTAUTH_SECRET:
הרץ את הפקודה הבאה בטרמינל:
```bash
openssl rand -base64 32
```
העתק את התוצאה והדבק ב-`NEXTAUTH_SECRET`

### 4. דוגמה לקובץ `.env.local`:

```env
# Google OAuth
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abcdefghijklmnopqrstuvwxyz

# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ==

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here
```

**הערות:**
- **Email**: אם אתה לא משתמש ב-Email, ההזמנות יישמרו אבל לא יישלחו מיילים

### 5. הפעל מחדש את השרת:

**חשוב מאוד!** אחרי יצירת או עדכון קובץ `.env.local`, תמיד הפעל מחדש את שרת הפיתוח:

1. עצור את השרת (Ctrl+C)
2. הפעל מחדש: `npm run dev`

### 6. ודא שהקובץ לא ב-git:

הקובץ `.env.local` צריך להיות ב-`.gitignore` כדי שלא יועלה ל-git.

### 7. בדיקה:

אחרי ההגדרה, נסה להתחבר שוב. השגיאה `client_id is required` צריכה להיעלם.

## בעיות נפוצות:

- **"הקובץ לא נטען"** - ודא שהקובץ נקרא בדיוק `.env.local` (לא `.env.local.txt`)
- **"המשתנים לא נטענים"** - הפעל מחדש את השרת
- **"שגיאת OAuth"** - ודא שה-Redirect URI ב-Google Cloud Console תואם בדיוק

