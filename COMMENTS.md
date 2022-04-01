<h1 align="center"> Desafio +A Educa </h1>

Plataforma web para o gerenciamento de alunos.

## 🚀 Algumas das Tecnologias/Libs

- [Nodejs](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [Docker](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc)
- [Swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)
- [Yup](https://www.npmjs.com/package/yup)
- [ESLint](https://www.npmjs.com/package/eslint)
- [Jest](https://jestjs.io/pt-BR/)
- [Vue.js](https://vuejs.org/)
- [Vuetify.js](https://vuetifyjs.com/en/getting-started/installation/#vue-cli-install)
- [Vuelidate.js](https://vuelidate-next.netlify.app/)
- [VueDebounce.js](https://www.npmjs.com/package/vue-debounce)

## 🐳 Rode o projeto usando o docker compose

```sh
docker-compose up
```

## 😃 Acesse o sistema:

1. Entre em http://localhost:8080

## 📄 Documentação da API:

Entre em http://localhost:3030/docs

## 🏛 Resumo Arquitetura - backend

```
src
│   ├── domain => Camada de domínio da aplicação
│	  │
│   ├── application => Camada responsável pela implementações de regras de negocios
│   │
│   ├── shared => Diretório contendo arquivos/funções que podem ser compartilhado entre as camadas
│   │
│   └── infra => Camada de Infraestrutura da aplicação
│       ├── db => Diretório contendo arquivos com implementações de repositórios de dados
│		    │
│       └── web => Diretório contendo arquivos para interação via web
│           ├── app.ts => Arquivo contendo configurações e função para executar a aplicação web
│           ├── error-handling.ts => Arquivo contendo middleware de tratativa de erros da aplicação web
│           ├── routes.ts => Arquivo contendo configurações de rota do sistema, com seus respectivos middlewares
│           └── swagger.ts => Arquivo de configuração do swagger da aplicação web
test
│   ├── integrations => Diretório contendo arquivos de testes de integração
│   └── units => Diretório contendo arquivos de testes unitários
```

## 👨‍💻 Considerações

### 👨‍🎨 Backend

- Sobre a arquitetura no backend, optei por adotar modelo DDD, Clean Architecture, tentei deixar as camadas mais definidas,
  usei swagger como ferramenta de documetação para api, realizei teste de integração e os testes unitários,
  backend esta com deploy configurado para rodar com docker

### 👨‍💻 Frontend

- No frontend foi feito sckets no figma, para implementação de sidebar, bottombar e card,
  implementei sob mobile first, com interface minimalista, porem visando usabilidade,
  pude implementar a internacionalização com i18n, optei por implementar paginação por rolagem
  infinita, evidando consulta desnecessárias, frontend esta com deploy configurado para rodar com docker

## Pontos de Melhoria se tivesse mais tempo

### 👨‍🎨 Frontend

- Componentizaria partes do layout da listagem em card, tabela e filtros.
- Utilizaria vuex para criar uma camada de repositório.
- Implementaria controle de notificação geral, provindas do backend.
- Aplicaria as normas de LGPD.
- Implementar os testes e2e com cypress

### 👨‍💻 Backend

- Usaria o patch ao inves de put para liberar os campos do modelo de Student
- Bloquearia a troca de cpf no back
- Adicionaria mais logs e comentarios em trechos mais complexos

## 😁 Desenvolvedor

- Caliton <<sr.caliton@gmail.com>>
