
const Gestao = require('../model/gestao.model');

class GestaoController {

    async listar(req, res) {
        try {
            const gestao = await Gestao.findAll({
                raw: true
            });

            res.json(gestao);

        } catch (erro) {
            res.status(500).json({
                mensagem: 'Erro ao listar gestão'
            });
        }
    }

    async cadastrar(req, res) {
        try {
            const { nome, email, telefone, idade } = req.body;

            const registro = await Gestao.create({
                nome,
                email,
                telefone,
                idade
            });

            res.status(201).json(registro);

        } catch (erro) {
            res.status(500).json({
                mensagem: 'Erro ao cadastrar'
            });
        }
    }

    async excluir(req, res) {
        try {
            const registro = await Gestao.findByPk(req.params.id);

            if (!registro) {
                return res.status(404).json({
                    mensagem: 'Registro não encontrado'
                });
            }

            await registro.destroy();

            res.json({
                mensagem: 'Registro excluído'
            });

        } catch (erro) {
            res.status(500).json({
                mensagem: 'Erro ao excluir'
            });
        }
    }
}

module.exports = new GestaoController();