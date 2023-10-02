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


const validarSenhaConta = (req, res, next) => {
    const { numero_conta, senha } = req.body

    const contaParaVerificar = contas.find((conta) => {
        return conta.numero === Number(numero_conta)
    })

    if (contaParaVerificar.usuario.senha != senha) {
        return res.status(401).json({ mensagem: "senha incorreta!" })
    }

    next()
};

const validarSaldoParaExtrato = (req, res, next) => {

    const { numero_conta, senha } = req.query;;;

    const contaParaVerificar = contas.find((conta) => {
        return conta.numero === Number(numero_conta);
    });

    if (!contaParaVerificar) {
        return res.status(404).json({ mensagem: "A conta bancária não foi encontrada!" });
    };
    if (contaParaVerificar.usuario.senha != Number(senha)) {
        return res.status(403).json({ mensagem: "senha incorreta!" });
    };
    next();
};

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

const validarContaParaTransferencia = (req, res, next) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body

    const contaOrigem = contas.find((conta) => {
        return conta.numero === Number(numero_conta_origem)
    });

    const contaDestino = contas.find((conta) => {
        return conta.numero === Number(numero_conta_destino)
    });

    if (!contaOrigem || !contaDestino) {
        return res.status(404).json({ mesagem: "A conta de destino ou origem não existe!" })
    };

    if (Number(senha) != contaOrigem.usuario.senha) {
        return res.status(403).json({ mensagem: "Senha incorreta!" })
    };

    if (valor > contaOrigem.saldo || valor <= 0) {
        return res.status(400).json({ mensagem: "Saldo insufiente!" })
    };

    next();
};


const verificarExistenciaContaDepositoeSaque = (req, res, next) => {
    const { numero_conta } = req.body

    const contaParaAtualizar = contas.some((conta) => {
        return conta.numero === Number(numero_conta)
    })

    if (!contaParaAtualizar) {
        return res.status(404).json({ mensagem: "a conta informada não foi encontrada!" })
    } else {
        next()
    }
};


module.exports = {
    validarSenha,
    validarSenhaConta,
    validarSaldoParaExtrato,
    verificarExistenciaContaDepositoeSaque,
    verificarExistenciaContaParams,
    verificarExistenciaContaQuery,
    verificarNumeroConta,
    validarCamposRequisicao,
    validarContaParaTransferencia
}