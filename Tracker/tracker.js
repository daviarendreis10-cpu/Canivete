const habitsList = document.getElementById('habits-list');
const createHabitBtn = document.getElementById('create-habit-btn');

import Habit from './Habit.js';

const STORAGE_KEY = 'tracker: habits'; 

function loadHabits() {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return parsed.map((habit) => Habit.fromJSON(habit));
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
    nameInput.maxLength = 40;

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

        const newHabit = new Habit(name, colorInput.value);
        habits.push(newHabit);

        saveHabits();  
        formItem.remove(); 
        createHabitBtn.disabled = false;
        appendHabitCard(newHabit); 
    });

    formItem.appendChild(nameInput);
    formItem.appendChild(colorInput);
    formItem.appendChild(confirmBtn);
    habitsList.appendChild(formItem);
    nameInput.focus(); 
}

habitsList.addEventListener('habitUpdated', () => {
    saveHabits();
});

habitsList.addEventListener('habitDeleted', (event) => {
    habits = habits.filter((h) => h.id !== event.detail.habitId);
    saveHabits();
});


function appendHabitCard(habit) {
    const card = habit.render();
    habitsList.appendChild(card);
}

habits.forEach((habit) => {
    appendHabitCard(habit);
});
