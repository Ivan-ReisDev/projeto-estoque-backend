const {User} = require('../Models/useModel.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

// Função para gerar um token JWT com base no ID do usuário

const GenerateToken = (id) => {
    return jwt.sign({ id }, 'KS1486735ANFSAN36454BFGSAF45471PKPEKGPSAGK1454EDGG', {
        expiresIn: "7d"
    });
};

const serviceControllerUser = {
    register: async(req, res) => {
        try {
            const { user, email, password, passwordConf } = req.body;
            const userName = await User.findOne({user})
            const emailExists = await User.findOne({email})
            if(userName ) {
                return res.status(422).json({error:'Usuário já existe'})
            }
            if(emailExists ) {
                return res.status(422).json({error:'E-mail já existe'})
            }

            if(passwordConf !== password) {
                return res.status(422).json({error:'Senha incorreta'})
            }
            const saltHash = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, saltHash);

            const newUser = { 
                user:user,
                email: email,
                password:passwordHash
            }

            const createUser = await User.create(newUser)

            if(!createUser) {
                return res.status(422).json({error:'Houve um erro, tente novamente mais tarde'})
            }

            res.status(201).json({msg: 'cadastro feito com sucesso.'})
            

        } catch (error) {
            console.log('cadastro feito com sucesso.')
            console.error('Erro ao registrar', error);
            res.status(500).json({msg: 'Erro ao efetuar cadastro'})
        }
    },

    login: async(req, res) => {
        const { email, password } = req.body;
        const checkUser = await User.findOne({email})

        if(!checkUser){
            return res.status(400).json({error:'Usuário não foi encontrado'})
        }
        const isMath = await bcrypt.compare(password, checkUser.password)

        if(!isMath){
            return res.status(400).json({error:'E-mail ou senha incorreto'})
        }

        res.status(201).json({
            _id:checkUser._id,
            user:checkUser.user,
            email:checkUser.email,
            token:GenerateToken(checkUser._id)
        })

    },
    getAll: async(req, res) => {
        try {
            const users = await User.find();
            res.json(users)
        } catch (error) {

            console.log('Usuário não encontrado')
            console.error('Usuário não encontrado', error);
            res.status(500).json({msg: 'Usuário não encontrado'})
        }

    },

    getcurrentUser: async(req, res) => {
        try {
            const user = req.user;
            res.status(200).json(user);

        } catch (error) {
            console.log('Perfil não encontrado')
        }

    }


}

module.exports = serviceControllerUser