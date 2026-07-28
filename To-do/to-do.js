const adicionar = document.getElementById("adicionar");
const tarefa = document.getElementById("tarefa");
const hora = document.getElementById("hora");
const lista = document.getElementById("lista");
const contador = document.getElementById("contador");
const limpar = document.getElementById("limpar");
const concluidas = document.getElementById("concluidas");
const pendentes = document.getElementById("pendentes");
const todas = document.getElementById("todas");

let filtroAtual = "todas";

function salvarTarefas() {
  const tarefas = [];

  const itens = lista.children;

  for (let i = 0; i < itens.length; i++) {
    tarefas.push({
      texto: itens[i].querySelector("span").textContent.replace("✅ ", ""),
      concluida: itens[i].classList.contains("concluida"),
    });
  }

  localStorage.setItem("to-do:tarefas", JSON.stringify(tarefas));
}

function Enter(e) {
  if (e.key === "Enter") {
    juntar();
  }
}
tarefa.addEventListener("keydown", Enter);

adicionar.disabled = true;

function verificarInput() {
  if (tarefa.value.trim() !== "") {
    adicionar.disabled = false;
    return true;
  } else {
    adicionar.disabled = true;
    return false;
  }
}

function verificarHora() {
  if (hora.value.trim() !== "") {
    return true;
  }
  return false;
}

tarefa.addEventListener("input", verificarInput);
hora.addEventListener("input", verificarHora);

function criarLi() {
  if (tarefa.value.trim() === "") return;

  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = tarefa.value;

  if (verificarHora()) {
    span.textContent += ` - ${hora.value}`;
  }

  const concluir = criarBotaoConcluida(li);
  const editar = criarBotaoEditar(li);

  const remover = document.createElement("button");
  remover.className = "btn-remover";
  remover.textContent = "❌";
  remover.addEventListener("click", () => {
    li.remove();
    salvarTarefas();
    atualizarContador();
  });

  li.appendChild(span);
  li.appendChild(concluir);
  li.appendChild(editar);
  li.appendChild(remover);

  return li;
}

function atualizarContador() {
  const tarefas = lista.children;
  let concluidasCount = 0;

  for (let i = 0; i < tarefas.length; i++) {
    if (tarefas[i].classList.contains("concluida")) {
      concluidasCount++;
    }
  }

  const total = lista.children.length;
  const pendentesCount = total - concluidasCount;

  contador.textContent = `Tarefas pendentes: ${pendentesCount} | Concluídas: ${concluidasCount}`;
}

function criarBotaoEditar(li) {
  const editar = document.createElement("button");
  editar.className = "btn-editar";
  editar.textContent = "✎";

  editar.addEventListener("click", () => {
    const span = li.querySelector("span");
    const concluir = li.querySelector(".btn-concluir");
    const remover = li.querySelector(".btn-remover");
    const textoAtual = span.textContent.replace("✅ ", "");

    const input = document.createElement("input");
    input.type = "text";
    input.className = "editar-input";
    input.value = textoAtual;

    const salvar = document.createElement("button");
    salvar.className = "btn-salvar-edicao";
    salvar.textContent = "💾";

    const cancelar = document.createElement("button");
    cancelar.className = "btn-cancelar-edicao";
    cancelar.textContent = "✖";

    function sairModoEdicao() {
      input.remove();
      salvar.remove();
      cancelar.remove();
      span.style.display = "";
      editar.style.display = "";
      if (concluir) concluir.style.display = "";
      if (remover) remover.style.display = "";
    }

    salvar.addEventListener("click", () => {
      const novoTexto = input.value.trim();
      if (novoTexto === "") return;

      span.textContent = li.classList.contains("concluida")
        ? `✅ ${novoTexto}`
        : novoTexto;

      sairModoEdicao();
      salvarTarefas();
    });

    cancelar.addEventListener("click", () => {
      sairModoEdicao();
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") salvar.click();
      if (e.key === "Escape") cancelar.click();
    });

    span.style.display = "none";
    editar.style.display = "none";
    if (concluir) concluir.style.display = "none";
    if (remover) remover.style.display = "none";

    li.insertBefore(input, span);
    li.appendChild(salvar);
    li.appendChild(cancelar);
    input.focus();
  });

  return editar;
}

function criarBotaoConcluida(li) {
  const concluir = document.createElement("button");
  concluir.className = "btn-concluir";
  concluir.textContent = "⏳";

  concluir.addEventListener("click", () => {
    li.classList.add("concluida");

    const span = li.querySelector("span");

    span.textContent = `✅ ${span.textContent}`;

    concluir.remove();

    salvarTarefas();
    atualizarContador();
  });

  return concluir;
}
function limparLista() {
  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }
  salvarTarefas();
  atualizarContador();
  aplicarFiltro();
}

function aplicarFiltro() {
  const tarefas = lista.children;
  for (let i = 0; i < tarefas.length; i++) {
    const concluida = tarefas[i].classList.contains("concluida");

    if (
      filtroAtual === "todas" ||
      (filtroAtual === "concluidas" && concluida) ||
      (filtroAtual === "pendentes" && !concluida)
    ) {
      tarefas[i].style.display = "block";
    } else {
      tarefas[i].style.display = "none";
    }
  }
}

todas.addEventListener("click", () => {
  filtroAtual = "todas";
  aplicarFiltro();
});

concluidas.addEventListener("click", () => {
  filtroAtual = "concluidas";
  aplicarFiltro();
});

pendentes.addEventListener("click", () => {
  filtroAtual = "pendentes";
  aplicarFiltro();
});

limpar.addEventListener("click", limparLista);

adicionar.addEventListener("click", juntar);

function juntar() {
  const li = criarLi();
  if (!li) return;

  lista.appendChild(li);

  tarefa.value = "";
  hora.value = "";
  adicionar.disabled = true;

  salvarTarefas();
  atualizarContador();
  aplicarFiltro();
}

function carregarTarefas() {
  const dados = localStorage.getItem("to-do:tarefas");
  if (!dados) return;

  const tarefas = JSON.parse(dados);

  for (let i = 0; i < tarefas.length; i++) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    if (tarefas[i].concluida) {
      span.textContent = `✅ ${tarefas[i].texto}`;
    } else {
      span.textContent = tarefas[i].texto;
    }

    if (tarefas[i].concluida) {
      li.classList.add("concluida");
    }

    const concluir = criarBotaoConcluida(li);
    const editar = criarBotaoEditar(li);

    const remover = document.createElement("button");
    remover.className = "btn-remover";
    remover.textContent = "❌";
    remover.addEventListener("click", () => {
      li.remove();
      salvarTarefas();
      atualizarContador();
    });

    li.appendChild(span);
    if (!tarefas[i].concluida) {
      li.appendChild(concluir);
    }
    li.appendChild(editar);
    li.appendChild(remover);

    lista.appendChild(li);
  }

  atualizarContador();
  aplicarFiltro();
}
carregarTarefas();
