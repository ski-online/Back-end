const Utente = require('../models/utente')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

const login = (req, res) => {
    Utente.findOne({email: req.body.email}, (err, data) => {
        if(!data){
            return res.status(404).json({success: false, message: "Utente non trovato"})
        }else if(err){
            return res.json({Error: err})
        }else{
            bcrypt.compare(req.body.password, data.password, (err, result) => {
                if(err){
                    return res.json({Error: err})
                }else if(result){
                    let token = jwt.sign({email: data.email, id: data._id}, process.env.TOKEN_KEY, {expiresIn: 86400}/* one day*/)
                    return res.json({success: true, message: "Autenticazione completata correttamente", token: token})
                }else{
                    return res.status(401).json({success: false, message: "Password errata"})
                }
            })
        }
    })
}

module.exports = {login}