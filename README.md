[README.md](https://github.com/user-attachments/files/26857423/README.md)
# 🚀 FinStart – אפליקציית לימוד פיננסי לצעירים

> MVP של אפליקציית Web Mobile ללימוד פיננסי ממכר, עם Gamification, סימולציות אינטראקטיביות, ועיצוב מודרני בעברית.

---

## 📱 מסכים

| מסך | נתיב | תיאור |
|------|-------|--------|
| Splash | `/` | מסך פתיחה אנימטיבי |
| Onboarding | `/onboarding` | 4 שלבים: ברוכים הבאים, שם, מטרות, רמה |
| Dashboard | `/dashboard` | בית: XP, רצף, שיעורים, קיצורים |
| שיעור | `/lesson/[id]` | Slides עם הסברים, דוגמאות וקוויז |
| סימולטור | `/simulator` | חישוב ריבית דריבית אינטראקטיבי עם גרפים |
| הישגים | `/achievements` | 9 הישגים עם מעקב התקדמות |

---

## 🛠 טכנולוגיות

- **Next.js 14** (App Router)
- **React 18** עם TypeScript
- **TailwindCSS** – Mobile-first, RTL מלא
- **Framer Motion** – אנימציות
- **Recharts** – גרפים
- **localStorage** – שמירת מצב (מוכן להרחבה ל-Firebase)

---

## ⚡ התקנה והרצה

```bash
# 1. התקנת תלויות
npm install

# 2. הרצה בפיתוח
npm run dev

# 3. פתח בדפדפן
# http://localhost:3000
```

> 💡 **טיפ:** פתח את DevTools ובחר תצוגת מובייל (iPhone 12/14 Pro) לחוויה הטובה ביותר.

---

## 📁 מבנה הפרויקט

```
finstart/
├── app/
│   ├── layout.tsx              # Root: RTL, Fonts, Context
│   ├── page.tsx                # Splash screen
│   ├── globals.css             # עיצוב גלובלי
│   ├── onboarding/page.tsx     # Onboarding (4 שלבים)
│   ├── dashboard/page.tsx      # מסך בית
│   ├── lesson/[id]/page.tsx    # נגן שיעורים
│   ├── simulator/page.tsx      # סימולטור ריבית דריבית
│   └── achievements/page.tsx   # הישגים
├── components/
│   ├── XPBar.tsx               # רכיב ניסיון ורמה
│   ├── StreakFlame.tsx          # רצף ימים
│   ├── BottomNav.tsx           # ניווט תחתון
│   └── LessonCard.tsx          # כרטיס שיעור
├── context/
│   └── UserContext.tsx         # ניהול מצב + localStorage
├── data/
│   ├── lessons.ts              # 6 שיעורים מלאים בעברית
│   └── achievements.ts         # 9 הישגים
└── lib/
    └── finance.ts              # חישובי ריבית דריבית + פורמט ₪
```

---

## 🎮 פיצ'רים

### שיעורים (6 שיעורים)
1. **מה זה תקציב?** – כלל 50/30/20
2. **איך באמת חוסכים?** – קודם שלם לעצמך
3. **ריבית דריבית** – הפלא השמיני
4. **אינפלציה** – האויב השקט
5. **השקעות בסיסיות** – מניות, אג"ח, ETF
6. **סיכון מול סיכוי** – אין ארוחות חינם

### Gamification
- **XP** – נקודות על כל שיעור שמושלם
- **רמות** – מתקדם ככל שצובר XP
- **רצף יומי** – מונה ימים רצופים
- **הישגים** – 9 הישגים שנפתחים אוטומטית

### סימולטור
- 4 תרחישים מוכנים (חייל, סטודנט, שכיר, מותאם)
- סליידרים אינטראקטיביים
- גרף Area Chart עם tooltip
- טיפים דינמיים

---

## 🔧 הרחבות עתידיות

- [ ] Firebase Authentication + Firestore
- [ ] Push Notifications אמיתיות
- [ ] שיעורים נוספים (מיסים, פנסיה, ביטוח)
- [ ] Leaderboard חברתי
- [ ] Daily challenges
- [ ] שילוב AI לייעוץ אישי
- [ ] PWA + App Store

---

## 📝 רישיון

פרויקט MVP לדוגמה. ניתן להרחבה ושימוש חופשי.
