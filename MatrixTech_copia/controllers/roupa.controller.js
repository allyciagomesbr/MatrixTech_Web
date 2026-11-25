
const Roupa = require('../model/roupa.model');

class RoupaController {

    async listar(req, res) {
        try {
            const roupas = await Roupa.findAll({
                raw: true
            });

            res.json(roupas);

        } catch (erro) {
            res.status(500).json({
                mensagem: 'Erro ao listar roupas'
            });
        }
    }

    async cadastrar(req, res) {
        try {
            const { peca, tecido, valor, imagem } = req.body;

            const roupa = await Roupa.create({
                peca,
                tecido,
                valor,
                imagem
            });

            res.status(201).json(roupa);

        } catch (erro) {
            res.status(500).json({
                mensagem: 'Erro ao cadastrar roupa'
            });
        }
    }

    async buscarPorId(req, res) {
        try {
            const roupa = await Roupa.findByPk(req.params.id);

            if (!roupa) {
                return res.status(404).json({
                    mensagem: 'Roupa não encontrada'
                });
            }

            res.json(roupa);

        } catch (erro) {
            res.status(500).json({
                mensagem: 'Erro ao buscar roupa'
            });
        }
    }

    async editar(req, res) {
        try {
            const roupa = await Roupa.findByPk(req.params.id);

            if (!roupa) {
                return res.status(404).json({
                    mensagem: 'Roupa não encontrada'
                });
            }

            await roupa.update(req.body);

            res.json(roupa);

        } catch (erro) {
            res.status(500).json({
                mensagem: 'Erro ao editar roupa'
            });
        }
    }

    async excluir(req, res) {
        try {
            const roupa = await Roupa.findByPk(req.params.id);

            if (!roupa) {
                return res.status(404).json({
                    mensagem: 'Roupa não encontrada'
                });
            }

            await roupa.destroy();

            res.json({
                mensagem: 'Roupa excluída com sucesso'
            });

        } catch (erro) {
            res.status(500).json({
                mensagem: 'Erro ao excluir roupa'
            });
        }
    }
}

module.exports = new RoupaController();