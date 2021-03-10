## Como iniciar a aplicação
Um arquivo .env deve ser criado com o secret do JWT, a chave é JWT_SECRET

Após isto, basta rodar docker-compose up, yarn typeorm migration:run yarn install, yarn build e yarn start


## Lógica
A parte lógica da aplicação está divida em Infra, seja em um módulo ou no Shared.

A pasta Shared guarda Erros e infra, onde a database e o express conecta os módulos e roda a aplicação. O infra desta pasta guarda Http (express), Typeorm e Containers, que permite as injeções

Todo módulo é dividido em Dto, Infra, Repositories e Services. Dto tipa informações de transferência de data e o Repositories tipa o repositório para caso troque-se de ORM/intermédio de conexão entre db e linguagem. O infra desta parte guarda entidades, repositórios, o controller e as rotas.

As informações das rotas são garantidas pelo celebrate, que "tranca" as informações passadas pelo request e garante que tudo será passado corretamente. 

A pasta config guarda a chave do jwt

Auth foi feito como um módulo a parte pois ele possui seu próprio service e controller, então achei melhor não misturar com o user em si, seriam dois raciocinios diferentes pra mesma entidade. A classe CheckAuth que lida com autenticação: é importada pelo Middleware de Shared/Http que coloca a autentização nas rotas necessárias.