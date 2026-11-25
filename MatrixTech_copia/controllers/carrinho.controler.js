
const Carrinho = require('../model/carrinho.model');
const Roupa = require('../model/roupa.model');

class CarrinhoController {

    async listar(req, res) {
        try {
            const itens = await Carrinho.findAll();

            const produtos = [];
            let subtotal = 0;

            for (const item of itens) {
                const roupa = await Roupa.findByPk(item.roupaId);

                if (!roupa) continue;

                const total = Number(roupa.valor) *
                    Number(item.quantidade);

                subtotal += total;

                produtos.push({
                    id: item.id,
                    roupaId: roupa.id,
                    peca: roupa.peca,
                    valor: roupa.valor,
                    imagem: roupa.imagem,
                    quantidade: item.quantidade,
                    total
                });
            }

            res.json({
                produtos,
                subtotal
            });

        } catch (erro) {
            res.status(500).json({
                mensagem: 'Erro ao listar carrinho'
            });
        }
    }

    async adicionar(req, res) {
        try {
            const { roupaId } = req.body;

            const roupa = await Roupa.findByPk(roupaId);

            if (!roupa) {
                return res.status(404).json({
                    mensagem: 'Produto não encontrado'
                });
            }

            const item = await Carrinho.findOne({
                where: { roupaId }
            });

            if (item) {
                item.quantidade += 1;
                await item.save();

            } else {
                await Carrinho.create({
                    roupaId,
                    quantidade: 1
                });
            }

            res.json({
                mensagem: 'Produto adicionado ao carrinho'
            });

        } catch (erro) {
            res.status(500).json({
                mensagem: 'Erro ao adicionar produto'
            });
        }
    }

    async remover(req, res) {
        try {
            const item = await Carrinho.findByPk(req.params.id);

            if (!item) {
                return res.status(404).json({
                    mensagem: 'Item não encontrado'
                });
            }

            if (item.quantidade > 1) {
                item.quantidade -= 1;
                await item.save();

            } else {
                await item.destroy();
            }

            res.json({
                mensagem: 'Quantidade atualizada'
            });

        } catch (erro) {
            res.status(500).json({
                mensagem: 'Erro ao remover item'
            });
        }
    }
}

module.exports = new CarrinhoController();