const { contas, depositos, saques, transferencias } = require('../database/bancodedados');

const validarSenha = (req, res, next) => {
    const { senha_banco } = req.query;

    if (!senha_banco) {
        return res.status(401).json({ mensagem: 'Senha não informada!' });
    }

    if (senha_banco !== 'Cubos123Bank') {
        return res.status(401).json({ mensagem: "A senha do banco informada é inválida!" });
    }

    next();
}

const validarSenhaBody = (req, res, next) => {
    const { numero_conta, numero_conta_origem, valor, senha } = req.body;

    if (!senha) {
        response.status(401).json({ mensagem: 'Senha não informada!' });
    }

    const indiceConta = contas.findIndex(conta => conta.numero === Number(numero_conta));

    if (contas[indiceConta].usuario.senha !== senha) {
        return res.status(401).json({ mensagem: "Senha incorreta!" });
    }

    const indiceContaOrigem = contas.findIndex(conta => conta.numero === Number(numero_conta_origem));

    if (contas[indiceContaOrigem].usuario.senha !== senha) {
        return res.status(401).json({ mensagem: "Senha incorreta!" });
    }

    next();
}

const validarSenhaQuery = (req, res, next) => {
    const { numero_conta, numero_conta_origem, valor, senha } = req.query;

    if (!senha) {
        response.status(401).json({ mensagem: 'Senha não informada!' });
    }

    const indiceConta = contas.findIndex(conta => conta.numero === Number(numero_conta));

    if (contas[indiceConta].usuario.senha !== senha) {
        return res.status(401).json({ mensagem: "Senha incorreta!" });
    }

    next();
}

const validarCamposRequisicao = (req, res, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios!' });
    }

    next()
}


const verificarNumeroConta = (numeroConta) => {
    if (isNaN(numeroConta)) {
        return res.status(400).json({ mensagem: "O id informado não é um número válido" });
    }
}

const verificarExistenciaContaQuery = (req, res, next) => {
    const { numero_conta } = req.query;

    if (isNaN(Number(numero_conta))) {
        return res.status(400).json({ mensagem: "O número informado não é válido" });
    }

    const contaExistente = contas.find(conta => conta.numero === Number(numero_conta));
    const indiceConta = contas.findIndex(conta => conta.numero === Number(req.params.numeroConta));

    if (indiceConta < 0 || !contaExistente) {
        return res.status(404).json({ mensagem: "Não existe conta a ser removido para o numero informado." });
    }

    next();
}

const verificarExistenciaContaParams = (req, res, next) => {
    const numero_conta = Number(req.params.numeroConta);

    if (isNaN(Number(numero_conta))) {
        return res.status(400).json({ mensagem: "O número informado não é válido" });
    }

    const contaExistente = contas.find(conta => conta.numero === Number(numero_conta));
    const indiceConta = contas.findIndex(conta => conta.numero === Number(req.params.numeroConta));

    if (indiceConta < 0 || !contaExistente) {
        return res.status(404).json({ mensagem: "Não existe conta a ser removido para o numero informado." });
    }

    next();
}

const verificarExistenciaContaBody = (req, res, next) => {
    const { numero_conta } = req.body;

    if (isNaN(Number(numero_conta))) {
        return res.status(400).json({ mensagem: "O número informado não é válido" });
    }

    const contaExistente = contas.find(conta => conta.numero === Number(numero_conta));
    const indiceConta = contas.findIndex(conta => conta.numero === Number(req.params.numeroConta));

    if (indiceConta < 0 && !contaExistente) {
        return res.status(404).json({ mensagem: "Não existe conta para o numero informado." });
    }

    next();
}

module.exports = {
    validarSenha,
    validarSenhaBody,
    validarSenhaQuery,
    verificarExistenciaContaBody,
    verificarExistenciaContaParams,
    verificarExistenciaContaQuery,
    verificarNumeroConta,
    validarCamposRequisicao
}