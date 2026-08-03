

export default class Habit {
    constructor(name, color) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.color = color;
        this.completedDates = [];
    }

    static fromJSON(obj) {
        const habit = new Habit(obj.name, obj.color);
        habit.id = obj.id;
        habit.completedDates = obj.completedDates || [];
        return habit;
    }

    markCompleted(date) {
        if (!this.completedDates.includes(date)) {
            this.completedDates.push(date);
        }
    }

    uncheckCompleted(date) {
        if (this.completedDates.includes(date)) {
            this.completedDates = this.completedDates.filter(d => d !== date);
        }
        this.#calculateStreak(this.completedDates);
    }

    render() {
        const card = document.createElement('li');
        card.className = 'habit-card';
        card.dataset.habitId = this.id;
        card.style.setProperty('--habit-color', this.color);

        const main = document.createElement('div');
        main.className = 'habit-main';

        const left = document.createElement('div');
        left.className = 'habit-left';

        const name = document.createElement('h3');
        name.className = 'habit-name';
        name.textContent = this.name;

        const actions = document.createElement('div');
        actions.className = 'habit-actions';

        const streakWrap = document.createElement('div');
        streakWrap.className = 'habit-streak-wrap';

        const streak = document.createElement('span');
        streak.className = 'habit-streak';
        streak.textContent = this.#calculateStreak(this.completedDates);

        const markBtn = document.createElement('button');
        markBtn.className = 'habit-mark-btn';
        markBtn.textContent = 'Concluir hoje';

        const uncheckBtn = document.createElement('button');
        uncheckBtn.className = 'habit-uncheck-btn';
        uncheckBtn.textContent = 'Desmarcar hoje';

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'habit-delete-btn';
        deleteBtn.textContent = 'Excluir';

        const editBtn = document.createElement('button')
        editBtn.className = 'habit-edit-btn'
        editBtn.textContent = '✎'

        markBtn.addEventListener('click', () => {
            if (this.#isCompletedToday()) {
                alert('Você já concluiu este hábito hoje!');
                return;
            }

            this.markCompleted(dayjs().format('YYYY-MM-DD'));
            streak.textContent = this.#calculateStreak(this.completedDates);
            card.dispatchEvent(new CustomEvent('habitUpdated', { bubbles: true }));
        });

        uncheckBtn.addEventListener('click', () => {
            if (!this.#isCompletedToday()) {
                alert('Você ainda não concluiu este hábito hoje!');
                return;
            }
            this.uncheckCompleted(dayjs().format('YYYY-MM-DD'));
            streak.textContent = this.#calculateStreak(this.completedDates);
            card.dispatchEvent(new CustomEvent('habitUpdated', { bubbles: true }));
        });

        deleteBtn.addEventListener('click', () => {
            if (confirm('Tem certeza que deseja excluir este hábito?')) {
                card.dispatchEvent(new CustomEvent('habitDeleted', { bubbles: true, detail: { habitId: this.id } }));
                card.remove();
            }
        });

        editBtn.addEventListener('click', () => {
            this.#editHabit({ card, name, actions, markBtn, uncheckBtn, deleteBtn, editBtn });
        });

        actions.appendChild(markBtn);
        actions.appendChild(uncheckBtn);
        actions.appendChild(deleteBtn);
        actions.appendChild(editBtn);

        left.appendChild(name);
        left.appendChild(actions);

        streakWrap.appendChild(streak);

        main.appendChild(left);
        main.appendChild(streakWrap);
        card.appendChild(main);
        return card;
    }

    #editHabit({ card, name, actions, markBtn, uncheckBtn, deleteBtn, editBtn }) {
        card.classList.add('is-editing');

        const input = document.createElement('input')
        input.className = 'habit-input-edit'
        input.type = 'text'
        input.value = this.name

        const saveBtn = document.createElement('button')
        saveBtn.className = 'save-edit-btn'
        saveBtn.textContent = 'Save'

        const cancelBtn = document.createElement('button')
        cancelBtn.className = 'cancel-edit-btn'
        cancelBtn.textContent = 'Cancel'

        const exitEditMode = () => {
            input.replaceWith(name);
            actions.replaceChildren(markBtn, uncheckBtn, deleteBtn, editBtn);
            card.classList.remove('is-editing');
        };

        saveBtn.addEventListener('click', () => {
            const newName = input.value.trim();
            if (newName) {
                this.name = newName;
                name.textContent = this.name;
            }
            exitEditMode();
            card.dispatchEvent(new CustomEvent('habitUpdated', { bubbles: true }));
        })

        cancelBtn.addEventListener('click', () => {
            exitEditMode();
        })

        name.replaceWith(input);
        actions.replaceChildren(saveBtn, cancelBtn);
        input.focus();
        input.select();
    }

    #calculateStreak(completedDates) {
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
    #isCompletedToday() {
        const today = dayjs().format('YYYY-MM-DD');
        return this.completedDates.includes(today);
}
}

