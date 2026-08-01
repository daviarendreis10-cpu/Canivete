export default class Task {
  constructor(texto, hora = "", concluida = false) {
    this.id = crypto.randomUUID();
    this.texto = texto;
    this.hora = hora;
    this.concluida = concluida;
  }

  static fromJSON(obj) {
    const tarefa = new Task(obj.texto, obj.hora, obj.concluida);
    tarefa.id = obj.id;
    return tarefa;
  }

  get textoExibicao() {
    const base = this.hora ? `${this.texto} - ${this.hora}` : this.texto;
    return this.concluida ? `✅ ${base}` : base;
  }

  render() {
    const li = document.createElement("li");
    li.dataset.tarefaId = this.id;
    if (this.concluida) li.classList.add("concluida");

    const span = document.createElement("span");
    span.textContent = this.textoExibicao;

    const acoes = document.createElement("div");
    acoes.className = "tarefa-acoes";

    const concluir = document.createElement("button");
    concluir.className = "btn-concluir";
    concluir.textContent = "⏳";

    const editar = document.createElement("button");
    editar.className = "btn-editar";
    editar.textContent = "✎";

    const remover = document.createElement("button");
    remover.className = "btn-remover";
    remover.textContent = "❌";

    concluir.addEventListener("click", () => {
      this.concluida = true;
      li.classList.add("concluida");
      span.textContent = this.textoExibicao;
      concluir.remove();
      li.dispatchEvent(new CustomEvent("tarefaAtualizada", { bubbles: true }));
    });

    remover.addEventListener("click", () => {
      li.dispatchEvent(
        new CustomEvent("tarefaRemovida", { bubbles: true, detail: { tarefaId: this.id } })
      );
      li.remove();
    });

    editar.addEventListener("click", () => {
      this.#editar({ li, span, acoes, concluir, editar, remover });
    });

    acoes.appendChild(concluir);
    acoes.appendChild(editar);
    acoes.appendChild(remover);

    li.appendChild(span);
    li.appendChild(acoes);
    return li;
  }

  #editar({ li, span, acoes, concluir, editar, remover }) {
    const input = document.createElement("input");
    input.type = "text";
    input.className = "editar-input";
    input.value = this.texto;

    const salvar = document.createElement("button");
    salvar.className = "btn-salvar-edicao";
    salvar.textContent = "💾";

    const cancelar = document.createElement("button");
    cancelar.className = "btn-cancelar-edicao";
    cancelar.textContent = "✖";

    const sairModoEdicao = () => {
      input.replaceWith(span);
      const botoes = this.concluida ? [editar, remover] : [concluir, editar, remover];
      acoes.replaceChildren(...botoes);
    };

    salvar.addEventListener("click", () => {
      const novoTexto = input.value.trim();
      if (!novoTexto) return;

      this.texto = novoTexto;
      span.textContent = this.textoExibicao;
      sairModoEdicao();
      li.dispatchEvent(new CustomEvent("tarefaAtualizada", { bubbles: true }));
    });

    cancelar.addEventListener("click", sairModoEdicao);

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") salvar.click();
      if (e.key === "Escape") cancelar.click();
    });

    span.replaceWith(input);
    acoes.replaceChildren(salvar, cancelar);
    input.focus();
    input.select();
  }
}
