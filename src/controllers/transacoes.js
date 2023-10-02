const { contas, depositos, saques, transferencias } = require('../database/bancodedados');

const horario = () => {
    const dataHora = new Date()
    const ano = dataHora.getFullYear();
    const mes = String(dataHora.getMonth() + 1).padStart(2, '0')
    const dia = String(dataHora.getDate()).padStart(2, '0')
    const hora = String(dataHora.getHours()).padStart(2, '0')
    const minuto = String(dataHora.getMinutes()).padStart(2, '0')
    const segundo = String(dataHora.getSeconds()).padStart(2, '0')
    const dataFormatada = `${ano}-${mes}-${dia} ${hora}:${minuto}:${segundo}`
    return dataFormatada;
};

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
    let { numero_conta, valor, senha } = req.body;

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
    let { numero_conta_origem, numero_conta_destino, valor } = req.body
    numero_conta_origem = Number(numero_conta_origem)
    numero_conta_destino = Number(numero_conta_destino)
    valor = Number(valor)

    const contaOrigem = contas.find((conta) => {
        return conta.numero === numero_conta_origem
    })

    const contaDestino = contas.find((conta) => {
        return conta.numero === numero_conta_destino
    })

    contaOrigem.saldo -= valor
    contaDestino.saldo += valor

    const registro = {
        data: horario(),
        numero_conta_origem,
        numero_conta_destino,
        valor
    }

    transferencias.push(registro)
    res.status(200).json()
};

module.exports = {
    depositar,
    sacar,
    transferir
};