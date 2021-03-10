## Como iniciar a aplicação
Um arquivo .env deve ser criado com o secret do JWT, a chave é JWT_SECRET

Apos isto, basta rodar docker-compose up, yarn/npm install, yarn/npm build e yarn/npm start


## Lógica
A parte lógica da aplicação está divida em Infra, seja em um módulo ou no Shared.

A pasta Shared guarda Erros e infra, onde a database e o express conecta os módulos e roda a aplicação. O infra desta pasta guarda Http (express), Typeorm e Containers, que permite as injeções

Todo módulo é dividido em Dto, Infra, Repositories e Services. Dto tipa informações de transferência de data e o Repositories tipa o repositório para caso troque-se de ORM/intermédio de conexão entre db e linguagem. O infra desta parte guarda entidades, repositórios, o controller e as rotas.

As informações das rotas são garantidas pelo celebrate, que "tranca" as informações passadas pelo request e garante que tudo será passado corretamente. 