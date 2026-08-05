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
  ordenarERenderizar();
  saveTarefas();

  tarefaInput.value = "";
  horaInput.value = "";
  adicionar.disabled = true;

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

function ordenarTarefas() {
  tarefas.sort((a, b) =>
    a.prioridade === b.prioridade
      ? new Date(`1970-01-01T${a.hora || "00:00"}`) - new Date(`1970-01-01T${b.hora || "00:00"}`)
      : b.prioridade - a.prioridade
  );
}

function ordenarERenderizar() {
  ordenarTarefas();
  lista.innerHTML = "";
  tarefas.forEach(appendTarefa);
}

todasBtn.addEventListener("click", () => {
  filtroAtual = "todas";
  ordenarERenderizar();
});

concluidasBtn.addEventListener("click", () => {
  filtroAtual = "concluidas";
  ordenarERenderizar();
});

pendentesBtn.addEventListener("click", () => {
  filtroAtual = "pendentes";
  ordenarERenderizar();
});

limpar.addEventListener("click", () => {
  tarefas = [];
  saveTarefas();
  lista.innerHTML = "";
  atualizarContador();
});

lista.addEventListener("tarefaAtualizada", () => {
  ordenarERenderizar();
  saveTarefas();
  atualizarContador();
});

lista.addEventListener("tarefaRemovida", (e) => {
  tarefas = tarefas.filter((t) => t.id !== e.detail.tarefaId);
  ordenarERenderizar();
  saveTarefas();
  atualizarContador();
});

function atualizarContador() {
  const concluidasCount = tarefas.filter((t) => t.concluida).length;
  const pendentesCount = tarefas.length - concluidasCount;
  contador.textContent = `Tarefas pendentes: ${pendentesCount} | Concluídas: ${concluidasCount}`;
}

ordenarERenderizar();
atualizarContador();
