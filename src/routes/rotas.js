const express = require('express');
const { listarContas, criarConta, atualizarConta, excluirConta, consultarSaldo, listarExtrato } = require('../controllers/contas');
const { depositar, sacar, transferir } = require('../controllers/transacoes');
const { validarSenha, validarCamposRequisicao, verificarExistenciaContaParams, verificarExistenciaContaBody, validarSenhaBody, validarSenhaQuery, verificarExistenciaContaQuery } = require('../middlewares/intermediarios');

const rotas = express();

rotas.get('/contas', validarSenha, listarContas);
rotas.post('/contas', validarCamposRequisicao, criarConta);
rotas.put('/contas/:numeroConta/usuario', verificarExistenciaContaParams, validarCamposRequisicao, atualizarConta);
rotas.delete('/contas/:numeroConta', verificarExistenciaContaParams, excluirConta);
rotas.post('/transacoes/depositar', verificarExistenciaContaBody, depositar);
rotas.post('/transacoes/sacar', validarSenhaBody, verificarExistenciaContaBody, sacar);
rotas.post('/transacoes/transferir', validarSenhaBody, transferir);
rotas.get('/contas/saldo', validarSenhaQuery, verificarExistenciaContaQuery, consultarSaldo);
rotas.get('/contas/extrato', validarSenhaQuery, verificarExistenciaContaQuery, listarExtrato);

module.exports = rotas;