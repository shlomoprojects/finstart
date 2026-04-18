export interface QuizOption {
  id: string;
  text: string;
  correct: boolean;
  explanation?: string;
}

export interface LessonSlide {
  type: "intro" | "concept" | "example" | "quiz";
  title?: string;
  body?: string;
  example?: string;
  emoji?: string;
  question?: string;
  options?: QuizOption[];
}

export interface Lesson {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  emoji: string;
  color: string; // tailwind class
  duration: number; // minutes
  xpReward: number;
  category: "budget" | "saving" | "interest" | "inflation" | "investing" | "risk";
  slides: LessonSlide[];
}

export const LESSONS: Lesson[] = [
  {
    id: "budget-101",
    order: 1,
    title: "מה זה תקציב?",
    subtitle: "הבסיס לכל החלטה כלכלית",
    emoji: "💰",
    color: "from-teal-400 to-teal-600",
    duration: 3,
    xpReward: 50,
    category: "budget",
    slides: [
      {
        type: "intro",
        emoji: "💰",
        title: "בוא נדבר על תקציב",
        body: "תקציב זה פשוט תוכנית – איך אתה מתכנן להוציא את הכסף שלך. בלי זה, הכסף פשוט… נעלם.",
      },
      {
        type: "concept",
        title: "כלל 50/30/20",
        body: "שיטה פשוטה לחלק את המשכורת:\n• 50% – הכרחי (שכירות, אוכל, תחבורה)\n• 30% – רצוי (בילויים, קפה, תחביבים)\n• 20% – חיסכון והשקעות",
        emoji: "📊",
      },
      {
        type: "example",
        title: "דוגמה מהחיים",
        example: "דני חייל בשירות חובה ומקבל 1,600 ₪ דמי קיום בחודש.\n\n• 50% = 800 ₪ (אוכל בסופ״ש, נסיעות הביתה)\n• 30% = 480 ₪ (יציאות, בירה עם החבר׳ה)\n• 20% = 320 ₪ (חיסכון לאחרי הצבא)\n\nאחרי 3 שנים? כמעט 12,000 ₪ בחיסכון.",
        emoji: "🪖",
      },
      {
        type: "quiz",
        question: "מיכל מרוויחה 8,000 ₪ בחודש. כמה כסף, לפי כלל 50/30/20, היא צריכה לחסוך?",
        options: [
          { id: "a", text: "800 ₪", correct: false, explanation: "זה רק 10%, פחות מדי" },
          { id: "b", text: "1,600 ₪", correct: true, explanation: "נכון! 20% מ-8,000 = 1,600 ₪" },
          { id: "c", text: "2,400 ₪", correct: false, explanation: "זה 30% – זה החלק ל״רצוי״" },
          { id: "d", text: "4,000 ₪", correct: false, explanation: "זה חצי מהמשכורת, לא ריאלי" },
        ],
      },
    ],
  },
  {
    id: "saving-basics",
    order: 2,
    title: "איך באמת חוסכים?",
    subtitle: "טיפים פרקטיים לצעירים",
    emoji: "🏦",
    color: "from-emerald-400 to-emerald-600",
    duration: 3,
    xpReward: 50,
    category: "saving",
    slides: [
      {
        type: "intro",
        emoji: "🏦",
        title: "קודם שלם לעצמך",
        body: "הטעות הגדולה: לחסוך ״מה שנשאר״ בסוף החודש. האמת? אף פעם לא נשאר. במקום זה – חסוך מיד כשנכנסת המשכורת.",
      },
      {
        type: "concept",
        title: "הוראת קבע לחיסכון",
        body: "ברגע שמשכורת נכנסת – הוראת קבע אוטומטית מעבירה כסף לחשבון חיסכון נפרד. אתה אפילו לא רואה אותו, אז לא מפתה אותך להוציא.",
        emoji: "⚙️",
      },
      {
        type: "example",
        title: "הקרן הבטוחה שלך",
        example: "יעל סטודנטית שעובדת במלצרות. היא חוסכת 500 ₪ בחודש באוטומט.\n\nאחרי שנה: 6,000 ₪\nאחרי 3 שנים: 18,000 ₪\n\nזה ״כרית ביטחון״ – מספיק לכמה חודשי מחיה אם משהו משתבש.",
        emoji: "🛡️",
      },
      {
        type: "quiz",
        question: "מה הדרך הכי יעילה לחסוך בעקביות?",
        options: [
          { id: "a", text: "לחסוך את מה שנשאר בסוף החודש", correct: false, explanation: "לרוב לא נשאר כלום" },
          { id: "b", text: "להעביר כסף לחיסכון ברגע שמשכורת נכנסת", correct: true, explanation: "מושלם! ״קודם שלם לעצמך״" },
          { id: "c", text: "לחסוך רק כשמרגישים שרוצים", correct: false, explanation: "זה לא עקבי" },
          { id: "d", text: "לשמור מזומנים מתחת למזרון", correct: false, explanation: "לא בטוח ולא מניב ריבית" },
        ],
      },
    ],
  },
  {
    id: "compound-interest",
    order: 3,
    title: "ריבית דריבית",
    subtitle: "הפלא השמיני בעולם",
    emoji: "📈",
    color: "from-amber-400 to-orange-500",
    duration: 4,
    xpReward: 75,
    category: "interest",
    slides: [
      {
        type: "intro",
        emoji: "🪄",
        title: "הכוח הכי חזק בהשקעות",
        body: "איינשטיין (לפי השמועה) אמר: ״ריבית דריבית היא הפלא השמיני בעולם. מי שמבין אותה – מרוויח. מי שלא – משלם.״",
      },
      {
        type: "concept",
        title: "איך זה עובד?",
        body: "ריבית רגילה: אתה מרוויח על הקרן (הסכום המקורי).\n\nריבית דריבית: אתה מרוויח על הקרן + על כל הריביות הקודמות שהצטברו. זה גדל באופן מעריכי.",
        emoji: "🧮",
      },
      {
        type: "example",
        title: "זמן = כסף",
        example: "שני חברים, 25 שנות חיסכון ב-8% שנתי:\n\n👨 עומר: מתחיל בגיל 20, חוסך 200 ₪/חודש עד גיל 30 (רק 10 שנים)\n👩 רותם: מתחילה בגיל 30, חוסכת 200 ₪/חודש עד גיל 60 (30 שנים)\n\nבגיל 60:\n• עומר (השקיע 24,000 ₪) → כ-283,000 ₪\n• רותם (השקיעה 72,000 ₪) → כ-283,000 ₪\n\nזמן מנצח סכומים.",
        emoji: "⏰",
      },
      {
        type: "quiz",
        question: "אתה משקיע 10,000 ₪ ב-7% שנתי לריבית דריבית. כמה יהיה לך בערך אחרי 20 שנה?",
        options: [
          { id: "a", text: "17,000 ₪", correct: false, explanation: "זו ריבית רגילה בלבד" },
          { id: "b", text: "24,000 ₪", correct: false, explanation: "קרוב, אבל עדיין מעט" },
          { id: "c", text: "38,700 ₪", correct: true, explanation: "נכון! הכסף כמעט ומפגש את עצמו 4 פעמים" },
          { id: "d", text: "100,000 ₪", correct: false, explanation: "זה יותר מדי ב-20 שנה" },
        ],
      },
    ],
  },
  {
    id: "inflation",
    order: 4,
    title: "אינפלציה – האויב השקט",
    subtitle: "למה 100 ₪ היום שווים פחות מחר",
    emoji: "🔥",
    color: "from-rose-400 to-red-600",
    duration: 3,
    xpReward: 60,
    category: "inflation",
    slides: [
      {
        type: "intro",
        emoji: "🔥",
        title: "הכסף שלך נשחק",
        body: "אם תשמור 10,000 ₪ מתחת למזרון היום, בעוד 10 שנים הם יקנו לך הרבה פחות. למה? אינפלציה.",
      },
      {
        type: "concept",
        title: "מה זה בכלל?",
        body: "אינפלציה = עליית מחירים ממוצעת במשק. בישראל היא נעה בין 2%-5% בשנה. זה אומר שמוצר שעולה 100 ₪ היום, יעלה 102-105 ₪ בשנה הבאה.",
        emoji: "📊",
      },
      {
        type: "example",
        title: "פיתה עם פלאפל",
        example: "לפני 20 שנה: פיתה פלאפל עלתה בערך 10 ₪.\nהיום: 20-25 ₪.\n\nזה לא שהפלאפל השתפר פי 2 – פשוט הכסף איבד כוח קנייה.\n\nאם לא משקיעים את הכסף ברמה שמנצחת את האינפלציה, בפועל – מפסידים.",
        emoji: "🧆",
      },
      {
        type: "quiz",
        question: "אם האינפלציה היא 4% בשנה, ואתה מחזיק 10,000 ₪ בעו״ש ללא ריבית – כמה כוח הקנייה שלהם אחרי שנה?",
        options: [
          { id: "a", text: "10,400 ₪", correct: false, explanation: "זה אם הרווחת ריבית – אבל אין בעו״ש" },
          { id: "b", text: "10,000 ₪ בדיוק", correct: false, explanation: "הסכום אותו, אבל הערך ירד" },
          { id: "c", text: "בערך 9,600 ₪ בכוח קנייה", correct: true, explanation: "בדיוק! איבדת 4% כוח קנייה" },
          { id: "d", text: "5,000 ₪", correct: false, explanation: "אינפלציה של 4% לא עושה את זה בשנה" },
        ],
      },
    ],
  },
  {
    id: "investing-intro",
    order: 5,
    title: "השקעות בסיסיות",
    subtitle: "מניות, אג״ח וקרנות סל",
    emoji: "📊",
    color: "from-violet-400 to-indigo-600",
    duration: 4,
    xpReward: 75,
    category: "investing",
    slides: [
      {
        type: "intro",
        emoji: "📊",
        title: "להכניס את הכסף לעבוד",
        body: "במקום לחסוך בעו״ש ולהפסיד לאינפלציה, אפשר להשקיע. ככה הכסף מייצר עוד כסף.",
      },
      {
        type: "concept",
        title: "3 סוגי השקעה נפוצים",
        body: "• מניות: חלק קטן בחברה. פוטנציאל גבוה, סיכון גבוה.\n• אג״ח (אגרות חוב): הלוואה לחברה/מדינה. תשואה יציבה, סיכון נמוך יחסית.\n• קרן סל (ETF): סל של הרבה מניות ביחד. פיזור סיכון פשוט.",
        emoji: "🧺",
      },
      {
        type: "example",
        title: "ה-S&P 500 – ההשקעה הקלאסית",
        example: "קרן סל על 500 החברות הגדולות בארה״ב. תשואה ממוצעת היסטורית: כ-10% בשנה.\n\nמשקיע שמפקיד 500 ₪ בחודש למשך 30 שנה (180,000 ₪) יכול להגיע לסביבות 1,100,000 ₪.\n\n*עבר לא מבטיח עתיד, אבל פיזור רחב ולטווח ארוך = כלל זהב.",
        emoji: "🌎",
      },
      {
        type: "quiz",
        question: "חבר שלך רוצה להשקיע 5,000 ₪ ואין לו ידע רב. מה הכי מתאים?",
        options: [
          { id: "a", text: "כל הכסף על מניה אחת שהוא שמע עליה", correct: false, explanation: "סיכון ענק, בלי פיזור" },
          { id: "b", text: "קרן סל מפוזרת כמו S&P 500", correct: true, explanation: "פיזור + פשטות = אידיאלי למתחילים" },
          { id: "c", text: "מטבע קריפטו חדש וטרנדי", correct: false, explanation: "מאוד ספקולטיבי למתחיל" },
          { id: "d", text: "להשאיר בעו״ש, בטוח יותר", correct: false, explanation: "האינפלציה תשחק את זה" },
        ],
      },
    ],
  },
  {
    id: "risk-reward",
    order: 6,
    title: "סיכון מול סיכוי",
    subtitle: "איך לא להתרסק",
    emoji: "⚖️",
    color: "from-cyan-400 to-blue-600",
    duration: 3,
    xpReward: 60,
    category: "risk",
    slides: [
      {
        type: "intro",
        emoji: "⚖️",
        title: "אין ארוחות חינם",
        body: "ככל שהתשואה הפוטנציאלית גבוהה יותר – הסיכון לאבד כסף גבוה יותר. זה חוק ברזל של ההשקעות.",
      },
      {
        type: "concept",
        title: "סולם הסיכון",
        body: "🟢 נמוך: פיקדון בנקאי, אג״ח ממשלתי (~2-4%)\n🟡 בינוני: קרנות מנוהלות, אג״ח קונצרני (~4-7%)\n🟠 גבוה: מניות מפוזרות, S&P 500 (~7-10%)\n🔴 מאוד גבוה: מניות בודדות, קריפטו, אופציות",
        emoji: "📶",
      },
      {
        type: "example",
        title: "גיל ואופק השקעה",
        example: "בן 20 עם אופק של 40 שנה? יכול לקחת יותר סיכון – לשוק יש זמן להתאושש ממשברים.\n\nבן 60 שפורש בעוד 5 שנים? צריך לשמור על מה שצבר – פחות סיכון.\n\nכלל אצבע ישן: 100 פחות הגיל שלך = % במניות.",
        emoji: "👶",
      },
      {
        type: "quiz",
        question: "מתי הגיוני לקחת יותר סיכון בהשקעה?",
        options: [
          { id: "a", text: "כשאני בן 22 ומשקיע לטווח של 30+ שנה", correct: true, explanation: "נכון! זמן מרכך את הסיכון" },
          { id: "b", text: "כשאני צריך את הכסף בעוד חודשיים", correct: false, explanation: "סיכון גבוה + טווח קצר = מסוכן מאוד" },
          { id: "c", text: "כשחבר המליץ לי על משהו ״חם״", correct: false, explanation: "אף פעם לא תבסס על טיפים" },
          { id: "d", text: "אף פעם לא כדאי לקחת סיכון", correct: false, explanation: "אז תפסיד לאינפלציה" },
        ],
      },
    ],
  },
];

export function getLessonById(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}

export function isLessonUnlocked(lesson: Lesson, completedIds: string[]): boolean {
  if (lesson.order === 1) return true;
  const prev = LESSONS.find((l) => l.order === lesson.order - 1);
  if (!prev) return true;
  return completedIds.includes(prev.id);
}
