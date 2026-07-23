const habitsList = document.getElementById('habits-list');
const createHabitBtn = document.getElementById('create-habit-btn');

const STORAGE_KEY = 'tracker: habits'; 

function loadHabits() {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return parsed.map((habit) => ({ ...habit, completedDates: habit.completedDates || [] }));
}

function saveHabits() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
}

let habits = loadHabits();

createHabitBtn.addEventListener('click', () => {
    createHabitBtn.disabled = true;
    renderForm();
});

function renderForm() {
    const formItem = document.createElement('li');
    formItem.className = 'habit-form';

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = 'Enter habit name';
    nameInput.id = 'habit-name-input';

    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.id = 'habit-color-input';
    colorInput.value = '#3b82f6';

    const confirmBtn = document.createElement('button');
    confirmBtn.textContent = 'Confirmar';
    confirmBtn.type = 'button'; 

    confirmBtn.addEventListener('click', () => {
        const name = nameInput.value.trim();
        if (!name) {
            nameInput.focus();
            return;
        }

        habits.push({
            id: crypto.randomUUID(),
            name,
            color: colorInput.value,
            completedDates: []
        });

        saveHabits();  
        formItem.remove(); 
        createHabitBtn.disabled = false;
        renderHabitCard(habits[habits.length - 1]); 
    });

    formItem.appendChild(nameInput);
    formItem.appendChild(colorInput);
    formItem.appendChild(confirmBtn);
    habitsList.appendChild(formItem);
    nameInput.focus(); 
}

function renderHabitCard(habit) {
    const card = document.createElement('li');
    card.className = 'habit-card';
    card.dataset.habitId = habit.id; 
    card.style.setProperty('--habit-color', habit.color); 

    const name = document.createElement('h3');
    name.className = 'habit-name';
    name.textContent = habit.name;

    const details = document.createElement('div');
    details.className = 'habit-details'; 

    const streakCount = document.createElement('span');
    streakCount.className = 'habit-streak';

    streakCount.textContent = calculateStreak(habit.completedDates);

    const markBtn = document.createElement('button');
    markBtn.className = 'habit-mark-btn';
    markBtn.textContent = 'Concluir hoje';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'habit-delete-btn';
    deleteBtn.textContent = 'Excluir';

    markBtn.addEventListener('click', () => {
        if (verifyTodayCompletion(habit)) {
            alert('Você já concluiu este hábito hoje!');
            return;
        }

        habit.completedDates.push(dayjs().format('YYYY-MM-DD'));
        saveHabits();
        streakCount.textContent = calculateStreak(habit.completedDates);
    });

    deleteBtn.addEventListener('click', () => {
        if (confirm('Tem certeza que deseja excluir este hábito?')) {
            habits = habits.filter((h) => h.id !== habit.id);
            saveHabits();
            card.remove();
        }
    });

    details.appendChild(streakCount);
    details.appendChild(markBtn);
    details.appendChild(deleteBtn);

    card.appendChild(name);
    card.appendChild(details);
    habitsList.appendChild(card);
}

function verifyTodayCompletion(habit) {
    const today = dayjs().format('YYYY-MM-DD');
    return habit.completedDates.includes(today);
}

function calculateStreak(completedDates) {
    const datesSet = new Set(completedDates);
    let cursor = dayjs();

    if (!datesSet.has(cursor.format('YYYY-MM-DD'))) {
        cursor = cursor.subtract(1, 'day');
        if (!datesSet.has(cursor.format('YYYY-MM-DD'))) {
            return 0;
        }
    }

    let streak = 0;
    while (datesSet.has(cursor.format('YYYY-MM-DD'))) {
        streak += 1;
        cursor = cursor.subtract(1, 'day');
    }
    return streak;
}

habits.forEach(renderHabitCard);