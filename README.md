# Minha Biblioteca

Aplicação web para organizar uma biblioteca pessoal, acompanhar o status de
leitura e manter livros favoritos.

Projeto desenvolvido para a disciplina de Angular.

## Integrante

- Chico Melo — [GitHub](https://github.com/chicomelo)

## Funcionalidades

- Listagem de livros;
- Busca por título ou autor;
- Filtro por status de leitura;
- Visualização dos detalhes;
- Cadastro de livros;
- Edição de livros;
- Exclusão de livros;
- Marcação visual de favoritos;
- Pipe para exibição do status de leitura.

## Tecnologias

- Angular 17;
- Angular Material;
- ExpressJS;
- MongoDB;
- NodeJS;
- Docker e Dev Container.

## Pré-requisitos

- Docker Desktop ou Docker Engine;
- Visual Studio Code;
- Extensão Dev Containers do Visual Studio Code;
- Git.

A aplicação utiliza somente tecnologias gratuitas. O MongoDB é executado
localmente pelo Docker, sem necessidade de conta em serviço externo.

## Como executar

Clone o repositório e abra a pasta no Visual Studio Code:

    git clone https://github.com/chicomelo/minha-biblioteca.git
    cd minha-biblioteca

Abra a paleta de comandos do VS Code e selecione:

    Dev Containers: Reopen in Container

No terminal do container, instale as dependências:

    npm install

O MongoDB é iniciado automaticamente pelo Dev Container. Para carregar os
livros de exemplo, execute:

    mongosh mongodb://127.0.0.1:27017 --file db/livros.mongodb

Em um terminal, inicie o Angular:

    npm start

Em outro terminal, inicie a API:

    npm run start:api

A aplicação ficará disponível em:

- Front-end: http://localhost:4200
- API: http://localhost:3333/api
- MongoDB: localhost:27017

## Rotas da aplicação

- /home: página inicial;
- /livros: lista de livros;
- /livros/novo: cadastro;
- /livros/:id: detalhes;
- /livros/:id/editar: edição;
- /sobre: informações do projeto.

## Rotas da API

- GET /api: verifica se a API está funcionando;
- GET /api/livros: lista os livros;
- GET /api/livros/:id: busca um livro;
- POST /api/livros: cadastra um livro;
- PUT /api/livros/:id: atualiza um livro;
- DELETE /api/livros/:id: exclui um livro.

## Testes e build

Para gerar a versão de produção:

    npm run build

Para executar os testes unitários sem deixar o processo aberto:

    npx ng test --watch=false --browsers=ChromeHeadlessNoSandbox
