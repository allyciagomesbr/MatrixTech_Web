
const express = require('express');
const router = express.Router();

const roupaController = require('../controllers/roupa.controller');

router.get('/', roupaController.listar);
router.get('/:id', roupaController.buscarPorId);
router.post('/', roupaController.cadastrar);
router.put('/:id', roupaController.editar);
router.delete('/:id', roupaController.excluir);

module.exports = router;