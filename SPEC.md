# Terry Word Memory System - 中考英语1600课标词汇30天记背工具

## Project Overview

**Project Name**: `english-vocab-review.html`
**Project Type**: Single-page web application (SPA)
**Core Functionality**: A comprehensive English vocabulary learning and review tool designed for Chinese middle school students preparing for their exam (中考), featuring spaced repetition, achievement system, and progress tracking over a 30-day intensive program with 1275 core vocabulary words from the 2022 edition of the National English Curriculum Standards.

---

## 1. Functionality Specification

### 1.1 Core Features

#### 1.1.1 Learning Modes

**A. Word Card Mode (单词卡片)**
- Display word, phonetic notation, part of speech, Chinese meaning
- Swipe left/right or click to navigate between cards
- Play pronunciation via Web Speech API (TTS)
- Card flip animation (show/hide example sentence)
- Mark word as learned/unlearned
- **Day Filter**: Filter words by Day 1-30 or "All"

**B. Dictation Mode (听写模式)**
- Play word pronunciation automatically
- User sees only the phonetic notation initially
- After a delay, show the word and meaning
- Record correct/incorrect responses
- **Day Filter**: Filter words by Day 1-30 or "All"

**C. Spelling Training Mode (拼写训练)**
- Display Chinese meaning as prompt
- Input field for English spelling
- Real-time validation with feedback
- Track spelling accuracy
- Support for showing hints (first letter, length)
- **Day Filter**: Filter words by Day 1-30 or "All"

**D. Spaced Repetition Review (记忆曲线复习)**
- Implement Ebbinghaus forgetting curve algorithm
- Calculate optimal review intervals: 1 day → 3 days → 7 days → 14 days → 30 days
- Track review dates and mastery levels
- Prioritize words due for review
- **Day Filter**: Filter words by Day 1-30 or "All"

**E. Mixed Training Mode (综合训练)**
- Mixed practice from all learned words
- Three training types:
  - 📇 Card Browse: Browse words as flashcards
  - ✏️ Spelling Test: Type the correct spelling
  - 📝 Choice: Multiple choice questions
- Configurable test count: 10/20/30 questions
- Results summary with accuracy tracking

### 1.1.2 Review & Practice Features

**A. Day Filter (单元筛选)**
- Unified Day selector for all learning modes
- Options: "All" + Day 1-30
- Locked days (future) shown as disabled
- Real-time word list update on selection

**A. Wrong Answers Notebook (错题本)**
- Automatically capture misspelled words
- Categorize by error frequency
- Prioritize in future practice sessions
- Allow manual removal after mastery

**B. Favorites Collection (收藏夹)**
- One-click favorite any word
- Quick access from dedicated tab
- Export/share favorites list
- Favorite count display

**C. Random Test (随机测试)**
- Configurable test size (5/10/20/50 words)
- Mix of spelling and multiple choice questions
- Timer option for exam simulation
- Immediate feedback with explanations

**D. Progress Tracking (学习进度)**
- Words mastered / words due for review / words not yet learned
- Visual progress bars
- Daily/weekly/monthly statistics
- Learning streak counter

### 1.1.3 Time Management (30-Day Sprint)

**A. Daily Tasks (每日任务)**
- Auto-calculate daily word quota based on remaining days
- Formula: `Math.ceil(unlearned_words / remaining_days)`
- Dynamic adjustment when days pass
- Task completion percentage
- Day-by-day task view (Day 1-30)
- Today's learning targets display

**B. 30-Day Task Overview (30天任务总览)**
- Grid view of all 30 days
- Color-coded status: completed (green), today (yellow), locked (gray)
- Progress count per day (mastered/total)
- Quick start learning for any unlocked day

**C. Irregular Verb Training (动词变形测试)**
- 120+ irregular verbs from 中考 curriculum
- Tests past tense and past participle forms
- Random 15-word quiz sessions
- Progress tracking for verb mastery
- Error review after each test

**B. Study Reminders (学习提醒)**
- Browser notification API integration
- Configurable reminder time
- Daily/weekly reminder options
- Reminder status toggle

**C. Study Calendar (学习日历)**
- Month view calendar display
- Color-coded completion status:
  - Green: Completed all daily tasks
  - Yellow: Partial completion
  - Gray: Not started
  - Red: Missed
- Click date to view details

### 1.1.4 Achievement System (成就系统)

**Learning Achievement Badges:**
| Badge Name | Icon | Condition |
|------------|------|-----------|
| 第一天 (First Day) | 🏆 | Complete first study session |
| 渐入佳境 (Getting Better) | 🏆 | 3-day learning streak |
| 持之以恒 (Perseverance) | 🏆 | 7-day learning streak |
| 坚持不懈 (Unstoppable) | 🏆 | 15-day learning streak |
| 学霸之路 (Scholar's Path) | 🏆 | 30-day learning streak |

**Quantity Achievement Badges:**
| Badge Name | Icon | Condition |
|------------|------|-----------|
| 初学者 (Beginner) | 🏆 | Learn 100 words |
| 进阶者 (Intermediate) | 🏆 | Learn 300 words |
| 熟手 (Skilled) | 🏆 | Learn 500 words |
| 精通者 (Master) | 🏆 | Learn 1000 words |

**Accuracy Achievement Badges:**
| Badge Name | Icon | Condition |
|------------|------|-----------|
| 精准记忆 (Precision Memory) | 🏆 | 100% accuracy on test (10+ questions) |
| 完美主义者 (Perfectionist) | 🏆 | 90%+ accuracy for 10 consecutive tests |

**Review Achievement Badges:**
| Badge Name | Icon | Condition |
|------------|------|-----------|
| 温故知新 (Review Pioneer) | 🏆 | Complete first review |
| 复习达人 (Review Expert) | 🏆 | Complete 50 reviews |
| 遗忘克星 (Forgetfulness Crusher) | 🏆 | 95%+ review accuracy |

**Special Achievement Badges:**
| Badge Name | Icon | Condition |
|------------|------|-----------|
| 30天战神 (30-Day Warrior) | 🏆 | Complete 30-day plan |
| 全勤学员 (Perfect Attendance) | 🏆 | 30 consecutive days without missing |

**Achievement Display Requirements:**
- Grid layout of all badges
- Locked badges shown as grayed with lock icon
- Unlocked badges in full color
- Progress indicator for partially completed badges
- Celebration animation popup when badge earned
- Click badge to view unlock conditions

### 1.1.5 Data Statistics Dashboard

**Metrics Displayed:**
- Today's study duration (minutes)
- Word mastery rate (percentage)
- Current learning streak (days)
- Forgetfulness curve analysis chart
- Words learned today/this week/this month
- Test accuracy history

### 1.2 User Interactions & Flows

**Flow 1: First Launch**
1. Show welcome screen with 40-day challenge introduction
2. Initialize localStorage with default data
3. Display home dashboard with today's tasks
4. Prompt to start first study session

**Flow 2: Daily Learning Session**
1. User selects "Start Learning" from home
2. Present word cards with swipe/tap navigation
3. Mark words as learned
4. Take mini quiz on learned words
5. View session summary
6. Update progress and achievements

**Flow 3: Review Session**
1. Access from "Review" tab or notification
2. System presents words due for review (spaced repetition)
3. User completes review exercises
4. System updates word status and schedule
5. Celebration for completed reviews

**Flow 4: Achievement Unlocked**
1. System detects achievement condition met
2. Pause current activity
3. Display celebration animation overlay
4. Show achievement badge details
5. User dismisses celebration
6. Resume activity

### 1.3 Data Handling

**LocalStorage Schema:**
```javascript
{
  // User profile
  user: {
    startDate: "2024-01-01",
    lastStudyDate: "2024-01-15",
    streak: 5,
    totalStudyMinutes: 120
  },
  
  // Word learning status
  words: {
    "abandon": {
      learned: true,
      mastery: 4, // 0-5 scale
      nextReview: "2024-01-20",
      wrongCount: 2,
      lastWrong: "2024-01-14"
    }
  },
  
  // Irregular verb mastery status
  verbMastered: {
    "be": true,
    "have": true,
    "go": false
  },
  
  // Favorites
  favorites: ["abandon", "ability", ...],
  
  // Wrong answers notebook
  wrongAnswers: {
    "abandon": { count: 2, lastWrong: "2024-01-14" }
  },
  
  // Daily progress
  dailyProgress: {
    "2024-01-15": {
      wordsLearned: 10,
      wordsReviewed: 5,
      correctAnswers: 12,
      totalAnswers: 15,
      studyMinutes: 25
    }
  },
  
  // Achievements
  achievements: {
    "first_day": { unlocked: true, unlockedAt: "2024-01-01" },
    "streak_7": { unlocked: false, progress: 5 }
  },
  
  // Settings
  settings: {
    reminderEnabled: true,
    reminderTime: "09:00",
    dailyGoal: 15,
    ttsSpeed: 0.8
  }
}
```

### 1.4 Edge Cases

- **No internet**: All data stored locally, app works offline
- **Speech API unavailable**: Show manual phonetic input, disable audio features
- **localStorage full**: Warn user, offer export functionality
- **Date edge cases**: Handle timezone changes, year transitions
- **Empty states**: Show encouraging messages when no words learned/reviewed
- **First-time user**: Show onboarding tutorial
- **Returning after long break**: Recalculate spaced repetition schedule
- **Achievement conflicts**: Handle simultaneous achievement unlocks

---

## 2. Technical Specification

### 2.1 Technology Stack

- **Framework**: Vanilla JavaScript (ES6+)
- **Styling**: Embedded CSS with CSS Variables
- **Storage**: localStorage API
- **Audio**: Web Speech API (SpeechSynthesis)
- **Build**: None (single HTML file)
- **No external dependencies**

### 2.2 File Structure

```
english-vocab-review.html (single file containing)
├── <style> - All CSS styles
├── <div id="app"> - App container
└── <script> - All JavaScript logic
```

### 2.3 Responsive Breakpoints

- Mobile: < 768px (primary target)
- Tablet: 768px - 1024px
- Desktop: > 1024px

### 2.4 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Green | #4CAF50 | Success, primary actions |
| Light Green | #E8F5E9 | Background, cards |
| Warm Beige | #FFF8E7 | Alternative background |
| Text Dark | #333333 | Primary text |
| Text Secondary | #666666 | Secondary text |
| Accent Gold | #FFD700 | Achievements, highlights |
| Error Red | #F44336 | Wrong answers, warnings |
| Blue Info | #2196F3 | Information, links |

### 2.5 Animation Specifications

- **Card flip**: 0.6s transform rotateY
- **Page transitions**: 0.3s fade slide
- **Achievement popup**: Scale + confetti particles
- **Progress bar fill**: 0.5s ease-out
- **Button hover**: 0.2s transform scale(1.05)
- **Touch feedback**: 0.1s opacity change

---

## 3. Acceptance Criteria

### 3.1 Success Conditions

1. ✅ All five tabs (首页/学习/测试/成就/我的) functional and navigable
2. ✅ Word card display with all information (word, phonetic, part, meaning, sentence)
3. ✅ TTS pronunciation working for each word
4. ✅ Spaced repetition algorithm calculating next review dates correctly
5. ✅ Wrong answers automatically captured and displayed
6. ✅ Favorites can be added/removed
7. ✅ Random test generating questions from word pool
8. ✅ All 17 achievements displayable with correct lock/unlock status
9. ✅ Achievement celebration animation triggers on unlock
10. ✅ Progress tracking accurately reflecting user activity
11. ✅ 40-day calendar showing study history
12. ✅ LocalStorage persisting all data between sessions
13. ✅ Responsive layout working on mobile/tablet/desktop
14. ✅ No JavaScript errors in console

### 3.2 Visual Checkpoints

1. ✅ Bottom tab navigation visible and sticky on mobile
2. ✅ Word cards styled with shadows and rounded corners
3. ✅ Achievement badges display in grid with lock icons for locked
4. ✅ Calendar shows color-coded days
5. ✅ Progress bars animate on update
6. ✅ Celebration confetti animation visible on achievement unlock

---

## 4. Sample Vocabulary Data

The application includes 1275 core vocabulary words from the 2022 edition of the National English Curriculum Standards (义务教育英语课程标准), organized into 30 days with approximately 40-50 words per day.

The vocabulary is categorized into three main themes:
- **Theme 1: Man and Self (人与自我)** - Days 1-15 covering personal life, school life, health, learning methods, self-management, and career
- **Theme 2: Man and Society (人与社会)** - Days 15-25 covering interpersonal relationships, family, community, culture, and public services
- **Theme 3: Man and Nature (人与自然)** - Days 25-30 covering nature, environment, natural disasters, and space exploration

Example words from Day 1: abroad, holiday, journey, travel, trip, daily, normal, early, free, give, run, wait, etc.

---

## 5. Implementation Notes

- Single HTML file for maximum portability
- No external dependencies or CDN links
- All icons using emoji for simplicity
- CSS animations using @keyframes for performance
- Event delegation for efficient DOM handling
- Modular JavaScript structure within single file
- Comments in Chinese for educational context
