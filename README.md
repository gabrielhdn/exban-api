<div align="center">
    <img src="https://i.imgur.com/F2lkmCv.jpeg" alt="Exban" width="180"/>
</div>

# Exban - Projeto de teste prático

Seja bem-vindo (a) ao repositório com a resolução do desafio back-end da Exban! Utilizei Node, Express e Sequelize como ferramentas para o desenvolvimento da aplicação. Siga os passos abaixo para executá-la localmente da forma correta.

## Acessando o repositório

Primeiro, clone este repositório para a sua máquina e acesse a pasta exban-api. Você pode fazer isso com os seguintes comandos:

```
git clone https://github.com/gabrielhdn/exban-api.git
cd exban-api/
```

## Renomeando o arquivo .env.example

O projeto utiliza um arquivo de variáveis de ambiente para configurar Docker e banco de dados. Para utilizá-lo, você deve renomear o arquivo .env.example para .env - ou então criar uma cópia já renomeada via linha de comando:

```
cp .env.example .env
```

## Criando o banco de dados

O banco de dados PostgreSQL é criado localmente via Docker. Existe, na raiz do projeto, um arquivo docker-compose.yml. Ele configura dois contâineres diferentes: um para o próprio PostgreSQL (porta 5432) e outro para o pgAdmin - uma ferramenta para visualização do banco de dados (porta 8080). Para executá-lo em background, digite:

```
docker-compose up -d
```
Caso esteja utilizando o Docker Compose Plugin, execute:

```
docker compose up -d
```

## Rodando o back-end

Com o serviço do banco de dados funcionando, podemos utilizar a aplicação. Configurado no package.json, o comando abaixo instala as dependências do projeto, executa as migrations do Sequelize para criação de tabelas e, em seguida, roda o servidor do Node. 

```
npm start
```

Este comando deve ser executado uma única vez. Caso queria abrir o servidor novamente mais tarde, utilize:

```
npm run dev
```

## Executando os testes

A aplicação tem testes feitos com Mocha, Chai e Sinon. Para executá-los, digite:

```
npm test
```

## Visualizando o banco de dados com o pgAdmin

Caso queria visualizar e interagir com o banco de dados sem precisar entrar no contâiner Docker, uma sugestão é utilizar o pgAdmin. Com o serviço criado pelo docker-compose, é possível acessar a ferramenta diretamente no navegador (http://localhost:8080/). Depois, siga as etapas abaixo:

1. Faça o login com as credenciais dispostas no docker-compose.yml (e-mail: admin@admin.com | senha: admin).
2. Clique em Add New Server.
3. Escolha um nome para o banco. Ex: Exban-db.
4. Na aba Connection, troque Host Name/Address e Maintenance Database para db.
5. Utilize "root" tanto para Username quanto para Password. Esses valores foram configurados no arquivo .env.
6. Para visualizar as tabelas e interagir com o banco de dados do lado esquerdo da página, siga: 

Servers
-> Exban-db (ou outro nome que você tenha dado) 
-> Databases
-> db
-> Schemas
-> public
-> Tables

Para visualizar o conteúdo, clique na tabela desejada com o botão direito -> View/Edit Data -> All Rows.
