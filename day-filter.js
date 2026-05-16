// ==========================================
// Day筛选和排序功能
// ==========================================

// 获取当前显示的单词列表（根据Day筛选和排序）
function getFilteredVocabulary() {
    let vocab = VOCABULARY;
    
    // 按Day筛选
    if (state.currentDayFilter && state.currentDayFilter > 0) {
        vocab = vocab.filter(w => w.day === state.currentDayFilter);
    }
    
    // 按排序方式排序
    if (state.wordSortOrder === 'day') {
        vocab = [...vocab].sort((a, b) => a.day - b.day);
    } else if (state.wordSortOrder === 'alpha') {
        vocab = [...vocab].sort((a, b) => a.word.localeCompare(b.word));
    } else if (state.wordSortOrder === 'random') {
        vocab = [...vocab].sort(() => Math.random() - 0.5);
    }
    
    return vocab;
}

// 获取Day选项列表
function getDayOptions() {
    const days = [...new Set(VOCABULARY.map(w => w.day))].sort((a, b) => a - b);
    return days;
}

// 更新Day选择器
function updateDaySelector() {
    const container = document.getElementById('daySelector');
    if (!container) return;
    
    const days = getDayOptions();
    const totalDays = days.length;
    
    let html = '<div class="day-filter-bar">';
    html += `<button class="day-btn ${state.currentDayFilter === 0 ? 'active' : ''}" onclick="setDayFilter(0)">全部</button>`;
    
    days.forEach(day => {
        const isActive = state.currentDayFilter === day;
        html += `<button class="day-btn ${isActive ? 'active' : ''}" onclick="setDayFilter(${day})">Day${day}</button>`;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

// 设置Day筛选
function setDayFilter(day) {
    state.currentDayFilter = day;
    state.currentWordIndex = 0;
    saveState();
    updateDaySelector();
    updateWordCard();
    updateWordCounter();
}

// 设置排序方式
function setWordSortOrder(order) {
    state.wordSortOrder = order;
    state.currentWordIndex = 0;
    saveState();
    updateSortButtons();
    updateWordCard();
    updateWordCounter();
}

// 更新排序按钮状态
function updateSortButtons() {
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.sort === state.wordSortOrder);
    });
}

// 更新单词计数器
function updateWordCounter() {
    const vocab = getFilteredVocabulary();
    const counter = document.getElementById('wordCounter');
    if (counter) {
        counter.textContent = `${state.currentWordIndex + 1}/${vocab.length}`;
    }
    
    // 更新显示的Day信息
    const dayDisplay = document.getElementById('currentDayDisplay');
    if (dayDisplay) {
        if (state.currentDayFilter > 0) {
            dayDisplay.textContent = `Day ${state.currentDayFilter}`;
        } else {
            dayDisplay.textContent = '全部';
        }
    }
}

// 修改 updateWordCard 函数使用筛选后的单词
const originalUpdateWordCard = updateWordCard;
updateWordCard = function() {
    const vocab = getFilteredVocabulary();
    if (vocab.length === 0) return;
    
    const word = vocab[state.currentWordIndex];
    if (!word) {
        state.currentWordIndex = 0;
        return updateWordCard();
    }
    
    document.getElementById('displayWord').textContent = word.word;
    document.getElementById('displayPhonetic').textContent = word.phonetic;
    document.getElementById('displayPart').textContent = word.part;
    document.getElementById('displayMeaning').textContent = word.meaning;
    document.getElementById('displaySentenceWord').textContent = word.word;
    document.getElementById('displaySentence').textContent = word.sentence;
    
    // 显示Day信息
    const dayBadge = document.getElementById('wordDayBadge');
    if (dayBadge) {
        dayBadge.textContent = `Day ${word.day}`;
    }
    
    // 更新按钮状态
    const isFavorite = state.favorites.includes(word.word);
    const wordState = state.words[word.word];
    const isLearned = wordState && wordState.learned;
    
    document.getElementById('btnFavorite').classList.toggle('learned', isFavorite);
    document.getElementById('btnFavorite').querySelector('span:first-child').textContent = isFavorite ? '⭐' : '☆';
    document.getElementById('btnLearned').classList.toggle('learned', isLearned);
    document.getElementById('btnLearned').querySelector('span:first-child').textContent = isLearned ? '✓' : '○';
    
    // 更新导航按钮
    document.getElementById('prevWord').disabled = state.currentWordIndex === 0;
    document.getElementById('nextWord').disabled = state.currentWordIndex >= vocab.length - 1;
    
    // 重置卡片翻转状态
    document.getElementById('wordCard').classList.remove('flipped');
    
    // 更新计数器
    updateWordCounter();
};

// 修改 prevWord 和 nextWord 函数
const originalPrevWord = prevWord;
prevWord = function() {
    const vocab = getFilteredVocabulary();
    if (state.currentWordIndex > 0) {
        state.currentWordIndex--;
        updateWordCard();
    }
};

const originalNextWord = nextWord;
nextWord = function() {
    const vocab = getFilteredVocabulary();
    if (state.currentWordIndex < vocab.length - 1) {
        state.currentWordIndex++;
        updateWordCard();
    }
};

// 修改拼写训练使用筛选后的单词
const originalInitSpellingMode = initSpellingMode;
initSpellingMode = function() {
    const shuffled = getFilteredVocabulary().sort(() => Math.random() - 0.5);
    state.spellingWords = shuffled.slice(0, Math.min(10, shuffled.length));
    state.spellingIndex = 0;
    if (state.spellingWords.length > 0) {
        showSpellingWord();
    }
};

// 修改听写模式使用筛选后的单词
const originalInitDictationMode = initDictationMode;
initDictationMode = function() {
    const shuffled = getFilteredVocabulary().sort(() => Math.random() - 0.5);
    state.dictationWords = shuffled.slice(0, Math.min(10, shuffled.length));
    state.dictationIndex = 0;
    if (state.dictationWords.length > 0) {
        // 更新听写界面初始状态
        const statusEl = document.getElementById('dictationStatus');
        const answerEl = document.getElementById('dictationAnswer');
        if (statusEl) statusEl.textContent = '点击播放按钮听写';
        if (answerEl) answerEl.style.display = 'none';
    }
};

// 修改复习模式使用筛选后的单词
const originalInitReviewMode = initReviewMode;
initReviewMode = function() {
    // 直接调用原始复习模式（它会自己筛选due words）
    originalInitReviewMode();
};

// 测试模式：添加按Day筛选
function startTestByDay(day) {
    let vocab = VOCABULARY;
    if (day > 0) {
        vocab = vocab.filter(w => w.day === day);
    }
    
    if (vocab.length === 0) {
        alert('该Day没有单词');
        return;
    }
    
    const shuffled = [...vocab].sort(() => Math.random() - 0.5);
    state.testQuestions = shuffled.slice(0, Math.min(state.testCount, shuffled.length));
    state.currentQuestionIndex = 0;
    state.testResults = [];
    
    document.getElementById('testSetup').style.display = 'none';
    document.getElementById('testContent').style.display = 'block';
    document.getElementById('testResults').style.display = 'none';
    
    showTestQuestion();
}

// 添加Day筛选到测试页面
function addTestDayFilter() {
    const container = document.getElementById('testDayFilter');
    if (!container) return;
    
    const days = getDayOptions();
    
    let html = '<div class="day-filter-bar mt-16">';
    html += '<span style="margin-right: 8px;">📅 练习范围:</span>';
    html += `<button class="day-btn ${state.testDayFilter === 0 ? 'active' : ''}" onclick="setTestDayFilter(0)">全部</button>`;
    
    days.forEach(day => {
        const count = VOCABULARY.filter(w => w.day === day).length;
        const isActive = state.testDayFilter === day;
        html += `<button class="day-btn ${isActive ? 'active' : ''}" onclick="setTestDayFilter(${day})">Day${day}(${count})</button>`;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

// 设置测试Day筛选
function setTestDayFilter(day) {
    state.testDayFilter = day;
    saveState();
    addTestDayFilter();
}

// 初始化Day相关状态
function initDayFilter() {
    if (typeof state.currentDayFilter === 'undefined') {
        state.currentDayFilter = 0; // 0表示全部
    }
    if (typeof state.wordSortOrder === 'undefined') {
        state.wordSortOrder = 'day'; // 默认按Day排序
    }
    if (typeof state.testDayFilter === 'undefined') {
        state.testDayFilter = 0;
    }
}

// 更新每日任务显示Day进度
function updateHomeStats() {
    const today = getTodayStr();
    const todayProgress = state.dailyProgress[today] || { wordsLearned: 0, wordsReviewed: 0 };
    
    // 计算当前Day应该学习的单词
    const daysSinceStart = state.startDate ? 
        Math.floor((new Date() - new Date(state.startDate)) / (1000 * 60 * 60 * 24)) + 1 : 1;
    const currentDay = Math.min(daysSinceStart, getDayOptions().length);
    
    // 计算已学习的单词数（按Day）
    let learnedByCurrentDay = 0;
    for (let d = 1; d <= currentDay; d++) {
        const dayWords = VOCABULARY.filter(w => w.day === d);
        dayWords.forEach(w => {
            if (state.words[w.word] && state.words[w.word].learned) {
                learnedByCurrentDay++;
            }
        });
    }
    
    const totalWords = currentDay * 5;
    const progressPercent = totalWords > 0 ? Math.round((learnedByCurrentDay / totalWords) * 100) : 0;
    
    document.getElementById('statLearned').textContent = learnedByCurrentDay;
    document.getElementById('statReview').textContent = todayProgress.wordsReviewed;
    document.getElementById('statStreak').textContent = state.streak || 0;
    document.getElementById('statAccuracy').textContent = 
        state.totalReviews > 0 ? Math.round((state.reviewCorrect / state.totalReviews) * 100) + '%' : '0%';
    
    // 更新每日进度显示
    const dailyProgressEl = document.getElementById('dailyProgressDisplay');
    if (dailyProgressEl) {
        dailyProgressEl.textContent = `Day ${currentDay} · 已学 ${learnedByCurrentDay}/${totalWords} 词`;
    }
}

// 页面加载时初始化Day功能
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initDayFilter();
        updateDaySelector();
        addTestDayFilter();
    }, 100);
});
