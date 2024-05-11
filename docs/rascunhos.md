## Introdução ao backend com Nodejs

# Comands
-npm init -y
-npm i typescript @types/node -D
- npm i prisma 

- npm i fastify-type-provider-zod

fazer comunicação entre serviços SOAP,REST

Toda api possui:
Metodos HTTP: GET, POST, DELETE, PUT, PATCH, HEAD, OPTIONS
Corpo da requisição
Parametros de busca
Parametros de rota
Cabeçalhos

# Formas para fazer a conexão com uma BD
- Driver native -> metodo de baixo nivel(criação de tudo a mão)
- Query Builders -> usando a sintaxe da linguagem 
- ORMs -> Object Relational Mapping 

- npx prisma init --datasource-provider SQLite

mudar o nome da minha tabela map

# Status Code

- 20x -> Sucesso
- 30x -> Redirecionamento
- 40x -> Erro ao cliente (Erro em alguma informação enviada por quem esta fazendo a chamada para a API)
- 50x -> Erro ao servidor (Um erro que está acontecendo INDEPENDENTE do que esra sendo enviando para o servidor)

# Tratativas de Erros 