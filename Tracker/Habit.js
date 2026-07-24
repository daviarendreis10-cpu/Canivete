

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

    render() {
        const card = document.createElement('li');
        card.className = 'habit-card';
        card.dataset.habitId = this.id; 
        card.style.setProperty('--habit-color', this.color); 

        const name = document.createElement('h3');
        name.className = 'habit-name';
        name.textContent = this.name;

        const details = document.createElement('div');
        details.className = 'habit-details';

        const streak = document.createElement('span');
        streak.className = 'habit-streak';

        streak.textContent = this.#calculateStreak(this.completedDates);

        const markBtn = document.createElement('button');
        markBtn.className = 'habit-mark-btn';
        markBtn.textContent = 'Concluir hoje';

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'habit-delete-btn';
        deleteBtn.textContent = 'Excluir';


        markBtn.addEventListener('click', () => {
            if (this.#isCompletedToday()) {
                alert('Você já concluiu este hábito hoje!');
                return;
            }

            this.markCompleted(dayjs().format('YYYY-MM-DD'));
            streak.textContent = this.#calculateStreak(this.completedDates);
            card.dispatchEvent(new CustomEvent('habitUpdated', { bubbles: true }));
        });

        deleteBtn.addEventListener('click', () => {
            if (confirm('Tem certeza que deseja excluir este hábito?')) {
                card.dispatchEvent(new CustomEvent('habitDeleted', { bubbles: true, detail: { habitId: this.id } }));
                card.remove();
            }
        });

        details.appendChild(streak);
        details.appendChild(markBtn);
        details.appendChild(deleteBtn);

        card.appendChild(name);
        card.appendChild(details);
        return card;
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

