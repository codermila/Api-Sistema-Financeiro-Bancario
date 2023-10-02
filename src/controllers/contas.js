const { contas, depositos, saques, transferencias } = require('../database/bancodedados');

let numero = 1;

const listarContas = (req, res) => {
    return res.status(200).json(contas);
};

const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const cpfExiste = contas.find(conta => conta.usuario.cpf === cpf);
    const emailExiste = contas.find(conta => conta.usuario.email === email);

    if (cpfExiste || emailExiste) {
        return res.status(400).json({ mensagem: "Já existe uma conta com o cpf ou e-mail informado!" });
    };

    const novaConta = {
        numero,
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    };

    numero++;

    contas.push(novaConta);

    return res.status(201).json();
};

const atualizarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const numeroConta = Number(req.params.numeroConta);

    const cpfExiste = contas.find(conta => conta.usuario.cpf === cpf);
    const emailExiste = contas.find(conta => conta.usuario.email === email);

    if (cpfExiste) {
        return res.status(400).json({ mensagem: "O CPF informado já está cadastrado!" })
    }

    if (emailExiste) {
        return res.status(400).json({ mensagem: "O email informado já está cadastrado!" })
    }

    contaExiste.usuario.nome = nome;
    contaExiste.usuario.cpf = cpf;
    contaExiste.usuario.data_nascimento = data_nascimento;
    contaExiste.usuario.telefone = telefone;
    contaExiste.usuario.email = email;
    contaExiste.usuario.senha = senha;

    return res.status(204).json();

};

const excluirConta = (req, res) => {

    const indiceConta = contas.findIndex(conta => conta.numero === Number(req.params.numeroConta));

    if (contas[indiceConta].saldo !== 0) {
        return res.status(400).json({ mensagem: "A conta só pode ser removida se o saldo for zero!" })
    }

    contas.splice(indiceConta, 1);

    return res.status(204).json();
}

const consultarSaldo = (req, res) => {
    const { numero_conta } = req.query;

    const contaParaVerificar = contas.find((conta) => {
        return conta.numero === Number(numero_conta);
    });

    res.status(200).json({ saldo: contaParaVerificar.saldo });
};

const listarExtrato = (req, res) => {
    let { numero_conta } = req.query
    numero_conta = Number(numero_conta)

    const depositosDaConta = depositos.filter((deposito) => {
        return deposito.numero_conta === numero_conta
    })

    const saquesDaConta = saques.filter((saques) => {
        return saques.numero_conta === numero_conta
    })

    const transferenciasEnviadas = transferencias.filter((transferencia) => {
        return transferencia.numero_conta_origem === numero_conta
    })

    const transferenciasRecebidas = transferencias.filter((transferencia) => {
        return transferencia.numero_conta_destino === numero_conta
    })


    res.status(200).json({
        depositos: depositosDaConta,
        saques: saquesDaConta,
        transferenciasEnviadas,
        transferenciasRecebidas
    })

}

module.exports = {
    listarContas,
    criarConta,
    atualizarConta,
    excluirConta,
    consultarSaldo,
    listarExtrato
};