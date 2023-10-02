const { contas, depositos, saques, transferencias } = require('../database/bancodedados');

const depositar = (req, res) => {
    const { numero_conta, valor } = req.body;

    if ((!valor && valor !== 0) || !numero_conta) {
        return res.status(400).json({ mensagem: "O número da conta e o valor são obrigatórios!" });
    }

    const indiceConta = contas.findIndex(conta => conta.numero === Number(numero_conta));

    if (Number(valor) <= 0) {
        return res.status(400).json({ mensagem: "O valor a ser depositado não pode ser menor que zero!" });
    }

    contas[indiceConta].saldo += valor;

    const dataAtual = new Date();
    const data = dataAtual.toLocaleString();

    depositos.push({
        data,
        numero_conta,
        valor
    });

    return res.status(204).json();
}

const sacar = (req, res) => {
    const { numero_conta, valor, senha } = req.body;

    if (!valor || !numero_conta || !senha) {
        return res.status(400).json({ mensagem: "O número da conta, o valor e a senha são obrigatórios!" });
    }

    const indiceConta = contas.findIndex(conta => conta.numero === Number(numero_conta));

    if (contas[indiceConta].saldo < Number(valor)) {
        return res.status(400).json({ mensagem: "Saldo insuficiente!" });
    }

    contas[indiceConta].saldo -= valor;

    const dataAtual = new Date();
    const data = dataAtual.toLocaleString();

    saques.push({
        data,
        numero_conta,
        valor
    });

    return res.status(204).json();

}

const transferir = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    if (!valor || !numero_conta_origem || !senha || !numero_conta_destino) {
        return res.status(400).json({ mensagem: "O número da conta de origem, o número da conta de destino, o valor e a senha são obrigatórios!" });
    }

    const indiceOrigem = contas.findIndex(conta => conta.numero === Number(numero_conta_origem));

    if (indiceOrigem < 0) {
        return res.status(404).json({ mensagem: "Conta bancaria não encontrada!" });
    }

    const indiceDestino = contas.findIndex(conta => conta.numero === Number(numero_conta_destino));

    if (indiceDestino < 0) {
        return res.status(404).json({ mensagem: "Conta bancaria não encontrada!" });
    }

    if (contas[indiceOrigem].saldo < Number(valor)) {
        return res.status(400).json({ mensagem: "Saldo insuficiente!" });
    }

    contas[indiceOrigem].saldo -= valor;
    contas[indiceDestino].saldo += valor;

    const dataAtual = new Date();
    const data = format(dataAtual, "yyyy-mm-dd hh:mm:ss");

    transferencias.push({
        data,
        numero_conta_origem,
        numero_conta_destino,
        valor
    });

    return res.status(204).json();
}

module.exports = {
    depositar,
    sacar,
    transferir
};