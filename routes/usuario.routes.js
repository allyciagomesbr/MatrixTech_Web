
const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuario.controller');

router.get('/', usuarioController.listar);
router.post('/', usuarioController.cadastrar);
router.delete('/:id', usuarioController.excluir);

module.exports = router;