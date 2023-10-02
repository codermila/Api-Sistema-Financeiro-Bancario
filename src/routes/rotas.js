const express = require('express');
const { listarContas, criarConta, atualizarConta, excluirConta, consultarSaldo, listarExtrato } = require('../controllers/contas');
const { depositar, sacar, transferir } = require('../controllers/transacoes');
const { validarSenha, validarCamposRequisicao, verificarExistenciaContaParams, validarSenhaConta, verificarExistenciaContaDepositoeSaque, validarContaParaTransferencia, validarSaldoParaExtrato } = require('../middlewares/intermediarios');

const rotas = express();

rotas.get('/contas', validarSenha, listarContas);
rotas.post('/contas', validarCamposRequisicao, criarConta);
rotas.put('/contas/:numeroConta/usuario', verificarExistenciaContaParams, validarCamposRequisicao, atualizarConta);
rotas.delete('/contas/:numeroConta', verificarExistenciaContaParams, excluirConta);
rotas.post('/transacoes/depositar', verificarExistenciaContaDepositoeSaque, depositar);
rotas.post('/transacoes/sacar', validarSenhaConta, verificarExistenciaContaDepositoeSaque, sacar);
rotas.post('/transacoes/transferir', validarContaParaTransferencia, transferir);
rotas.get('/contas/saldo', validarSaldoParaExtrato, consultarSaldo);
rotas.get('/contas/extrato', validarSaldoParaExtrato, listarExtrato);

module.exports = rotas;