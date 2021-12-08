const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {

    const singnIn = async (req, res) => {
        //Verifica a Senha
        if (!req.body.email || !req.body.password) {
            return res.status(400).send('Informe Usuário e Senha!!!')
        }
        //Verifica o Email
        const user = await app.db('users')
            .where({ email: req.body.email }).first()
        if (!user) {
            return res.status(400).send('Usuário Não Encontrado!!!')
        }

        //Validação da senha para log in
        const isMatch = bcrypt.compareSync(req.body.password, user.password)
        if (!isMatch) {
            return res.status(401).send('Email ou Senha inválido!!!')
        }

        const now = Math.floor(Date.now() / 1000)

        //Conteudo do token JWT
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            iat: now,//Emitido em
            exp: now + (60 * 60 * 24 * 3)//data de expiração
        }

        res.json({
            ...payload,
            //Gerar o token JWT
            token: jwt.encode(payload, authSecret)
        })
    }

    const validateToken = async (req, res) => {
        const userData = req.body || null

        try {
            if (userData) {
                const token = jwt.decode(userData.token, authSecret)
                //Token Valido!
                if (new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }
        } catch (e) {
        }

        res.send(false)
    }

    return { singnIn, validateToken }
}