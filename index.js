const list = document.getElementById('list');
const apps = [
  {
    name: 'To-do List',
    shortDescription: 'O que precisa ser feito hoje',
    longDescription: 'O que precisa ser feito hoje. Anota, conclui, risca da lista. Simples do jeito que tem que ser — sem conta, sem configuração, sem enrolação.',
    path: 'To-do/index.html'
  },
  {
    name: 'Tracker',
    shortDescription: 'Seus hábitos, sua sequência',
    longDescription: 'Seus hábitos, sua sequência. Cria os hábitos que importam pra você, marca os dias que cumpriu e vê a corrente crescer. A streak conta de trás pra frente a partir de hoje — então ela nunca mente, mesmo que você fique dias sem abrir.',
    path: 'Tracker/index.html'  
  },
  {
    name: 'Finance',
    shortDescription: 'Pra onde vai seu dinheiro',
    longDescription: 'Pra onde vai seu dinheiro. Registra o que entra e o que sai, com categoria, e vê seu saldo se ajustar na hora. O histórico fica todo ali pra você olhar quando quiser entender seus gastos.',
    path: 'Financas/index.html'
  }
];

const cards = [];
let focusedCard = null;
const DESCRIPTION_SWAP_MS = 180;

function setDescription(cardData, expanded) {
  const { descriptionEl, app } = cardData;
  const targetText = expanded ? app.longDescription : app.shortDescription;
  if (descriptionEl.textContent === targetText) return;

  descriptionEl.classList.add('is-swapping');
  setTimeout(() => {
    descriptionEl.textContent = targetText;
    descriptionEl.classList.remove('is-swapping');
  }, DESCRIPTION_SWAP_MS);
}

function focusCard(cardData) {
  cards.forEach(card => {
    if (card === cardData) {
      card.li.classList.add('is-focused');
      card.li.classList.remove('is-blurred');
      setDescription(card, true);
    } else {
      card.li.classList.add('is-blurred');
      card.li.classList.remove('is-focused');
      setDescription(card, false);
    }
  });
  focusedCard = cardData;
}

function clearFocus() {
  if (!focusedCard) return;
  cards.forEach(card => {
    card.li.classList.remove('is-focused', 'is-blurred');
    setDescription(card, false);
  });
  focusedCard = null;
}

document.addEventListener('click', clearFocus);

apps.forEach(app => {
  const li = document.createElement('li');
  li.className = 'card';

  const name = document.createElement('h2');
  name.className = 'card-name';
  name.textContent = app.name;

  const description = document.createElement('p');
  description.className = 'card-description';
  description.textContent = app.shortDescription;

  const button = document.createElement('button');
  button.className = 'btn btn-primary card-button';
  button.textContent = 'Acessar';

  li.appendChild(name);
  li.appendChild(description);
  li.appendChild(button);

  const cardData = { li, descriptionEl: description, app };

  li.addEventListener('click', (e) => {
    e.stopPropagation();
    if (focusedCard === cardData) {
      window.location.href = app.path;
    } else {
      focusCard(cardData);
    }
  });

  cards.push(cardData);
  list.appendChild(li);
});

const WEEKDAYS_PT = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];

const dateEl = document.getElementById('date');
function updateDate() {
    const now = dayjs();
    const weekday = now.day();
    const weekdayLower = WEEKDAYS_PT[weekday];
    dateEl.textContent = `${weekdayLower.charAt(0).toUpperCase() + weekdayLower.slice(1)}, ${now.format('DD/MM/YYYY')}`;
}
updateDate();