# 🔪 Canivete

Hub pessoal de aplicações web. Reúne num só lugar as ferramentas que uso no dia a dia — hábitos, tarefas e finanças — para acessá-las com um clique, em vez de abrir cada projeto separadamente.

## 🎯 Por que existe

Meus projetos ficavam espalhados em repositórios individuais. Para usar qualquer um, eram vários passos: abrir o GitHub, achar o repositório, baixar, abrir o arquivo. Atrito demais para uma ferramenta de uso diário — e o resultado era eu não usar o que eu mesmo tinha construído.

O Canivete resolve isso: um único endereço, publicado, com atalho na área de trabalho.

## 📋 Funcionalidades

- 🗂️ **Menu central** com cards gerados dinamicamente a partir de uma lista de apps
- 📅 Dia da semana e data atual em português
- 🎨 **Tema claro/escuro** — respeita a preferência do sistema, pode ser alterado manualmente e fica salvo
- ✨ Cards expansíveis com descrição detalhada de cada app
- 🔄 Navegação entre apps com retorno ao menu

## 🧰 Apps incluídos

| App | O que faz |
|---|---|
| **Tracker** | Hábitos diários com cor personalizada e contagem de sequência (streak) |
| **To-do list** | Tarefas do dia — anotar, concluir, remover |
| **Finance Accountant** | Entradas, saídas, categorias e saldo em tempo real |

## 🛠️ Tecnologias

- **HTML5**, **CSS3** e **JavaScript**
- **Day.js** — datas e formatação em português
- **localStorage** — persistência dos dados

## 📁 Estrutura

/
├── index.html/js/css menu
├── shared/ recursos compartilhados
│ ├── global.css estilos comuns a todos os apps
│ └── libs/ bibliotecas de terceiros
├── Tracker/
├── To-do/
└── Financas/


## 🚀 Como rodar

1. Clone o repositório
2. Abra o `index.html` no navegador

Não precisa de instalação, dependências ou etapa de build.

## 💡 O que aprendi

- **Separar o que é compartilhado do que é específico** — CSS global para o que se repete, CSS próprio para o que é exclusivo de cada app. Mudar uma cor passa a ser uma edição, não cinco.
- **Namespacing no localStorage** — como os apps dividem o mesmo espaço de armazenamento, cada chave leva o prefixo do app (`tracker:habitos`, `todo:tarefas`). Colisão vira impossível por construção, e não por memória.
- **Caminhos relativos** — ao mover cada app para sua própria pasta, todas as referências a arquivos externos precisaram ser ajustadas com `../`.
- **Escolher ferramenta pelo problema, não pela novidade** — cheguei a instalar Webpack e Babel logo depois de estudá-los, e removi ao perceber que não resolviam nenhum problema real deste projeto. Adicionariam complexidade sem benefício.
- **Não abstrair cedo demais** — considerei uma arquitetura de página única com o conteúdo trocado via JavaScript. Optei por HTML separados: a repetição existente era pequena e a migração não compensaria. Estrutura complexa para um problema que ainda não existe é tão custosa quanto código repetido.
- **Preferência de tema com fallback** — o tema segue a configuração do sistema por padrão, mas a escolha manual do usuário tem prioridade e é preservada.

## 🔜 Próximos passos

- Resumo do dia no menu (hábitos pendentes, tarefas em aberto, saldo atual)
- Adicionar Pomodoros
- Evolução da to-do list
- Sincronização entre dispositivos — exige backend

---

*Projeto pessoal desenvolvido de forma independente.*