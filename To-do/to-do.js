import Task from "./task.js";

const adicionar = document.getElementById("adicionar");
const tarefaInput = document.getElementById("tarefa");
const horaInput = document.getElementById("hora");
const lista = document.getElementById("lista");
const contador = document.getElementById("contador");
const limpar = document.getElementById("limpar");
const concluidasBtn = document.getElementById("concluidas");
const pendentesBtn = document.getElementById("pendentes");
const todasBtn = document.getElementById("todas");

const STORAGE_KEY = "to-do:tarefas";
let filtroAtual = "todas";

function loadTarefas() {
  const raw = localStorage.getItem(STORAGE_KEY);
  const parsed = raw ? JSON.parse(raw) : [];
  return parsed.map((t) => Task.fromJSON(t));
}

function saveTarefas() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
}

let tarefas = loadTarefas();

adicionar.disabled = true;

tarefaInput.addEventListener("input", verificarInput);
tarefaInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !adicionar.disabled) adicionarTarefa();
});
adicionar.addEventListener("click", adicionarTarefa);

function verificarInput() {
  adicionar.disabled = tarefaInput.value.trim() === "";
}

function adicionarTarefa() {
  const texto = tarefaInput.value.trim();
  if (!texto) return;

  const novaTarefa = new Task(texto, horaInput.value);
  tarefas.push(novaTarefa);
  saveTarefas();

  tarefaInput.value = "";
  horaInput.value = "";
  adicionar.disabled = true;

  appendTarefa(novaTarefa);
  atualizarContador();
}

function appendTarefa(tarefa) {
  const li = tarefa.render();
  li.style.display = correspondeAoFiltro(tarefa) ? "" : "none";
  lista.appendChild(li);
}

function correspondeAoFiltro(tarefa) {
  if (filtroAtual === "concluidas") return tarefa.concluida;
  if (filtroAtual === "pendentes") return !tarefa.concluida;
  return true;
}

function aplicarFiltro() {
  [...lista.children].forEach((li) => {
    const tarefa = tarefas.find((t) => t.id === li.dataset.tarefaId);
    li.style.display = tarefa && correspondeAoFiltro(tarefa) ? "" : "none";
  });
}

todasBtn.addEventListener("click", () => {
  filtroAtual = "todas";
  aplicarFiltro();
});

concluidasBtn.addEventListener("click", () => {
  filtroAtual = "concluidas";
  aplicarFiltro();
});

pendentesBtn.addEventListener("click", () => {
  filtroAtual = "pendentes";
  aplicarFiltro();
});

limpar.addEventListener("click", () => {
  tarefas = [];
  saveTarefas();
  lista.innerHTML = "";
  atualizarContador();
});

lista.addEventListener("tarefaAtualizada", () => {
  saveTarefas();
  atualizarContador();
  aplicarFiltro();
});

lista.addEventListener("tarefaRemovida", (e) => {
  tarefas = tarefas.filter((t) => t.id !== e.detail.tarefaId);
  saveTarefas();
  atualizarContador();
});

function atualizarContador() {
  const concluidasCount = tarefas.filter((t) => t.concluida).length;
  const pendentesCount = tarefas.length - concluidasCount;
  contador.textContent = `Tarefas pendentes: ${pendentesCount} | Concluídas: ${concluidasCount}`;
}

tarefas.forEach(appendTarefa);
atualizarContador();
