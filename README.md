# Nutror Producer DOC

![https://comidaecologica.com.br/wp-content/uploads/2021/03/nutror-logo-.png](https://comidaecologica.com.br/wp-content/uploads/2021/03/nutror-logo-.png)

# 🛠 **Stack**

- [React](https://pt-br.reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [RxJs](https://rxjs.dev/)
- [React Router](https://reactrouter.com/)
- [Material-UI](https://material-ui.com/pt/)

# ✅ Pré-Requisitos

- Você precisará ter instalado o [git](https://git-scm.com/), [node](https://nodejs.org/en/) e [yarn](https://yarnpkg.com/)
- Ter instalado e rodando o [backend](https://bitbucket.org/eduzz/nutror_v3_api/src/master/) no [nutror-docker](https://bitbucket.org/eduzz/nutror-docker/src/master/)
- não esqueça de se conectar a VPN

# 🔗 Links

[https://nutrorv3-producer.devzz.ninja/](https://nutrorv3-producer.devzz.ninja/)

[https://nutrorv3-producer-stage.devzz.ninja/](https://nutrorv3-producer-stage.devzz.ninja/)

# 🧬 Desenvolvimento

```bash
# Clonando o repositório
$ git clone git@bitbucket.org:eduzz/nutror-v3-front-producer.git

# Acessando a pasta
$ cd nutror-v3-front-producer

# Instalando Dependencias
$ yarn

# Criando um env local
$ cp .env.development .env.development.local

# Iniciando o projeto
$ yarn start
```

# 👷🏿‍♀️ **Arquitetura**

Para mais informações veja a pasta ./docs 🎾

```
.
├── ...
├── docker              # Configurações do docker para produção
├── docs                # Docs do projeto
├── public
│   ├── icons           # Ícones em geral
│   └── img             # Imagens
├── scripts
├── src (código legado)
│   ├── classes
│   ├── components      # Componentes compartilhados
│   │   ├── Abstract    # Componentes Abstratos
│   │   ├── Dialogs     # [Caixas de Dialogo](https://material-ui.com/pt/components/dialogs/)
│   │   ├── Layout      # Componentes que fazem parte do Layout da página
│   │   ├── Pages       # Paginas da aplicação
│   │   └── Shared      # Componentes Compartilhados
│   ├── declarations    # Custom typings para o TypeScript
│   ├── decorators      # Higher-Order Components
│   ├── errors          # Errors Handlers
│   ├── helpers         # Funções e variáveis genéricas que auxiliam nas tarefas
│   ├── interfaces      # Interfaces do TypeScript
│   ├── rxjs-operators  # Operadores do RxJs criados para o projeto
│   └── ...
└── ...

```

# 🏗 Estrutura de um componente

Se um component precisar de um sub-component este deve ficar na mesma pasta/subpasta do component pai.

```
...
├── ...
├── MyComponent         # Pasta com o nome do componente
│   ├── index.tsx       # Componente
│   ├── styles.ts       # Arquivo de estilos
│   ├── SubComponent1
│   │   ├── index.tsx
│   │   └── styles.ts
│   ├── SubComponent2
│   │   └── ...
│   ├── SubComponent3
│   │   └── ...
│   ├── SubComponent4
│   │   └── ...
│   └── ...
└── ...

```

