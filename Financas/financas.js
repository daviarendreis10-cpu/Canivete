let entradas = 0;
let saidas = 0;
let transacoes = [];

const saldo = document.getElementById('saldo');
const totalEntradas = document.getElementById('total-entradas');
const totalSaidas = document.getElementById('total-saidas');
const form = document.getElementById('form-transacao');
const descricaoInput = document.getElementById('descricao');
const valorInput = document.getElementById('valor');
const gastosList = document.getElementById('lista-transacoes');
const tipoTransacao = document.getElementById('tipo');
const categoria = document.getElementById('categoria');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const descricao = descricaoInput.value;
    const valor = parseFloat(valorInput.value);
    const tipo = tipoTransacao.value;
    const categoriaSelecionada = categoria.value;

    transacoes.push({ descricao, valor, tipo, categoria: categoriaSelecionada });

    descricaoInput.value = '';
    valorInput.value = '';
    tipoTransacao.value = 'entrada';
    categoria.value = 'salario';

    atualizarSaldo();
    atualizarLista();
    salvarLocalStorage();
});

function atualizarSaldo() {
    entradas = 0;
    saidas = 0;
    transacoes.forEach(t => registrarTransacao(t.tipo, t.valor));

    saldo.textContent = `R$ ${(entradas - saidas).toFixed(2)}`;
    totalEntradas.textContent = `R$ ${entradas.toFixed(2)}`;
    totalSaidas.textContent = `R$ ${saidas.toFixed(2)}`;
}

function registrarTransacao(t, v) {
    if (t === 'entrada') {
        entradas += v;
    } else {
        saidas += v;
    }
}

function atualizarLista() {
    gastosList.innerHTML = '';
    transacoes.forEach((transacao) => {
        const li = document.createElement('li');
        li.textContent = `${transacao.descricao} - R$ ${transacao.valor.toFixed(2)} (${transacao.tipo})`;
        li.classList.add('transacao', transacao.tipo === 'entrada' ? 'entrada' : 'saida');

        const btnRemover = document.createElement('button');
        btnRemover.textContent = 'Remover';
        btnRemover.classList.add('btn-remover');
        li.appendChild(btnRemover);

        btnRemover.addEventListener('click', () => removeTransacao(li));
        gastosList.appendChild(li);
    });
}

function removeTransacao(li) {
    li.remove();
    salvarLocalStorage();
}

function salvarLocalStorage() {
    localStorage.setItem('financas:transacoes', JSON.stringify(transacoes));
}

function carregarLocalStorage() {
    const transacoesLS = localStorage.getItem('financas:transacoes');
    if (transacoesLS) transacoes = JSON.parse(transacoesLS);
    atualizarSaldo();
    atualizarLista();
}

carregarLocalStorage();
