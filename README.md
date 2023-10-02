# Ada Tech Challenge

[![pipeline](https://github.com/ralvescosta/ada-tech-challenge/actions/workflows/gha.yml/badge.svg)](https://github.com/ralvescosta/ada-tech-challenge/actions/workflows/gha.yml)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ralvescosta_ada-tech-challenge&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ralvescosta_ada-tech-challenge)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=ralvescosta_ada-tech-challenge&metric=coverage)](https://sonarcloud.io/summary/new_code?id=ralvescosta_ada-tech-challenge)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=ralvescosta_ada-tech-challenge&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=ralvescosta_ada-tech-challenge)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=ralvescosta_ada-tech-challenge&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=ralvescosta_ada-tech-challenge)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=ralvescosta_ada-tech-challenge&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=ralvescosta_ada-tech-challenge)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=ralvescosta_ada-tech-challenge&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=ralvescosta_ada-tech-challenge)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=ralvescosta_ada-tech-challenge&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=ralvescosta_ada-tech-challenge)


Realizou-se o desafio da trilha de backend.

- [Executando o projeto](#executando-o-projeto)
- [Descrição do projeto](#descrição-do-projeto-do-backend)
  - [OpenAPI](#openapi)
  - [Github Action](#github-actions)

## Executando o projeto

Para executar o projeto inicialmente deve-se copiar o arquivo **backend/.env.exemple** e criar um novo arquivo chamado **backend/.env**, nesse novo arquivo deve-se preencher todas as variáveis ambientes com seus respectivos valores. 

Na raiz do repositório possui um arquivo **docker-compose.yaml**, este é responsável por implantar o backend e o frontend, para utilizar este arquivo é preciso ter o **Docker** e **Docker Compose** instalado. Basta executar o comando a seguir:

```bash
  docker-compose -f docker-compose.yaml up --build
```

Tendo executado corretamente, a API sera exposta no host na porta 5000 e o frontend sera exposto no host na porta 3000

**OBS:** Como parte dos requisitos, tendo que a aplicação foi desenvolvida utilizando o RDMS PostgreSQL, as variáveis ambientes que configuram a conexão ao PostgreSQL foram dispostas no docker-compose.yaml, dessa forma se a solução for implantada utilizando o mesmo, nao faz necessário configurar as variáveis de conexão ao banco de dados no arquivo **.env**.

Para facilitar a implantação inicial criou-se um script sql na raiz do projeto que é executado na criação do container do PostgreSQL criando assim a estrutura de tabela necessária, mas caso a implantação do projeto nao seja realizada via docker-compose faz-se necessário executar a migration para configurar o banco de dados corretamente, a migration pode ser executada:

```bash
cd backend && yarn install && yarn sequelize db:migrate
```

**OBS:** O backend foi construído para ser executado nas versões do NodeJS 16.x.x e 18.x.x, porem o frontend nao é compatível na versão 18.x.x, dessa forma, caso nao seja utilizado a estrategia de implementação com o docker-compose faz-se necessário utilizar da versão 16.x.x do NodeJS para executar o backend e o frontend

## Descrição do projeto do backend

O backend foi construído majoritariamente em Typescript, contendo poucos trechos em Javascript. Utilizou-se o padrão de aplicações em camadas onde foi criado três camadas principais: **services**, **interface** e **infra**. A camada **service** é onde esta contido toda a regra de negocio, na camada interface esta tudo o que diz respeito a **interface** de comunicação da aplicação e todo o resto foi alocado na camada **infra**.

Utilizou-se de vários padrões de projeto para a construção da aplicação, destaca-se aqui o principio da segregação em interfaces e injeção de dependência, mantendo as classes coesas e com responsabilidades únicas além de viabilizar a escrita de testes unitários.

### OpenAPI

Além dos requisitos apresentados na descrição do desafio também foi implementado uma estrategia de documentação seguindo a especificação do OpenAPI 3.0.0, a documentação pode ser acessada direto pela API no seguinte path: `http://<HOST>:5000/docs`, toda as requisições podem ser feitas direto pelo swagger.

### Github Actions

Criou-se uma estrategia simples de CI para o projeto utilizando **Github Actions** e [Sonarcloud](https://sonarcloud.io/summary/new_code?id=ralvescosta_ada-tech-challenge). Utilizou-se a Github Actions como o motor de execução da pipeline, configurado steps para validação dos tests unitários, integração com o Sonarcloud e build das images. Dessa forma, para cada vez que novos funcionalidades são enviados para o repositório é possível analisar a qualidade do código novo e se a aplicação continua consistente com todos os testes passando.