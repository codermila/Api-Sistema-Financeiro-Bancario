## 🏦 Api Sistema Financeiro Bancario

<img src="https://media.giphy.com/media/3o6Ztm0VpFKWc5YSUE/giphy.gif" width="300">

## ⌨️ Descrição do Projeto:
Desenvolvimento de uma Api, Servidor BackEnd para um Sistema Financeiro para um banco Digital.
Projeto desenvolvido no modulo 02 do curso Desenvolvimento BackEnd da Cubos Academy.

## 🛠️ Linguagens e Ferramentas:
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![VS Code](https://img.shields.io/badge/VS%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Insomnia](https://img.shields.io/badge/Insomnia-5849be?style=for-the-badge&logo=Insomnia&logoColor=white)

## 🖥️ Funcionalidades do Projeto:

- [x] Criar conta bancária
- [x] Listar contas bancárias
- [x] Atualizar os dados do usuário da conta bancária
- [x] Excluir uma conta bancária
- [x] Depósitar em uma conta bancária
- [x] Sacar de uma conta bancária
- [x] Transferir valores entre contas bancárias
- [x] Consultar saldo da conta bancária
- [x] Emitir extrato bancário

## 🚩 Contribua com o projeto:

- [ ] Realize o Fork
- [ ] Faça as modificações necessárias
- [ ] Realize a Pull Request (PR)

## 💻 Rodando o projeto:

```shell
# 1. Clone o projeto

git clone <urlProjeto>

# 2. Instale as dependências

npm install

# 3. Execute o backend

npm run backend

# 4. Execute o Frontend

npm run dev
```
## 🚧 Endpoints:

- [ ] **GET** "/contas" = Listar contas bancárias;
- [ ] **POST** "/contas" = Criar contas bancárias;
- [ ] **PUT** "/contas/:numeroConta/usuario" = Atualizar os dados do usuário da conta bancária;
- [ ] **DELETE** "/contas/:numeroConta" = Excluir uma conta bancária;
- [ ] **POST** "/transacoes/depositar" = Depósitar em uma conta bancária;
- [ ] **POST** "/transacoes/sacar" = Sacar de uma conta bancária;
- [ ] **POST** "/transacoes/transferir" = Transferir valores entre contas bancárias;
- [ ] **GET** "/contas/saldo" = Consultar saldo da conta bancária;
- [ ] **GET** "/contas/extrato" = Emitir extrato bancário.

## 🚧 Executando o projeto no Insomnia:

![Insomnia](https://img.shields.io/badge/Insomnia-5849be?style=for-the-badge&logo=Insomnia&logoColor=white)

### Criar contras bancarias:
##### **POST** "/contas" = Criar contas bancárias;

![putcontas](https://github.com/codermila/Api-Sistema-Financeiro-Bancario/assets/141371216/8281f9a0-d59a-4e76-8b53-f81cd23c73d4)

#### **GET** "/contas" = Listar contas bancárias;

![getcontas](https://github.com/codermila/Api-Sistema-Financeiro-Bancario/assets/141371216/bd525831-97f2-4318-b7e0-d1589abf747f)
