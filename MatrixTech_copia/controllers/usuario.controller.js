
const Usuario = require('../model/usuario.model');

class UsuarioController {

    async listar(req, res) {
        try {
            const usuarios = await Usuario.findAll({
                raw: true
            });

            res.json(usuarios);

        } catch (erro) {
            res.status(500).json({
                mensagem: 'Erro ao listar usuários'
            });
        }
    }

    async cadastrar(req, res) {
        try {
            const { nome, email, telefone } = req.body;

            const usuario = await Usuario.create({
                nome,
                email,
                telefone
            });

            res.status(201).json(usuario);

        } catch (erro) {
            res.status(500).json({
                mensagem: 'Erro ao cadastrar usuário'
            });
        }
    }

    async excluir(req, res) {
        try {
            const usuario = await Usuario.findByPk(req.params.id);

            if (!usuario) {
                return res.status(404).json({
                    mensagem: 'Usuário não encontrado'
                });
            }

            await usuario.destroy();

            res.json({
                mensagem: 'Usuário excluído'
            });

        } catch (erro) {
            res.status(500).json({
                mensagem: 'Erro ao excluir usuário'
            });
        }
    }
}

module.exports = new UsuarioController();