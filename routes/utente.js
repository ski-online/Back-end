const express = require('express')
const router = express.Router()
const utenteController = require('../controllers/utente')
const autenticazioneController = require('../controllers/autenticazione')

router.get('/utente/:email', utenteController.getUtente)
router.post('/utente', utenteController.nuovoUtente)
router.delete('/utente/:email', utenteController.rimuoviUtente)
router.put('/utente', utenteController.modificaPassword)
router.post('/login', autenticazioneController.login)

module.exports = router