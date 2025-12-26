# הגדרת Gemini AI לניתוח תמונות

## 1. קבלת API Key מ-Google

1. לך ל-[Google AI Studio](https://makersuite.google.com/app/apikey)
2. התחבר עם חשבון Google שלך
3. לחץ על "Create API Key"
4. העתק את המפתח שנוצר

## 2. הוספת המפתח ל-.env

הוסף את השורה הבאה לקובץ `.env.local`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

## 3. איך זה עובד

- אם `GEMINI_API_KEY` מוגדר, המערכת תשתמש ב-Gemini AI לניתוח התמונה
- אם המפתח לא מוגדר או שיש שגיאה, המערכת תשתמש בניתוח מקומי (fallback)
- Gemini AI מזהה:
  - סוג המוצר (Shapewear, Lingerie, Bras, Panties)
  - צבעים בתמונה
  - תגיות רלוונטיות
  - יוצר תיאור מפורט
  - מציע גרסאות עם גדלים וצבעים

## 4. דוגמה לקובץ .env.local

```env
# Gemini AI (אופציונלי - לניתוח תמונות מתקדם)
GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

## הערות

- Gemini API הוא חינמי עד 15 בקשות לדקה
- אם אין לך מפתח, המערכת תעבוד עם ניתוח מקומי
- הניתוח המקומי מזהה צבעים וסוגי מוצרים מה-URL של התמונה

