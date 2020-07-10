const { User } = require('../models')
const { compare } = require('../helpers/bcryptjs')
const jwt = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');

class HomeController{
    static register(req,res,next){
        const { name,email,password } = req.body
        User.create({name,email,password})
        .then(data=>{
            res.status(201).json({msg:`${data.name} successfully register`})
        })
        .catch(err=>{
            next(err)
        })
    }

    static login(req,res,next){
        const { email, password } = req.body
        User.findOne({
            where:{
                email
            }
        })
        .then(data=>{
            if(!data){
                throw({msg: 'Data not found', status: 400})
            }
            else{
                const hashedPassword = compare(password, data.password)
                if(hashedPassword){
                    const token = jwt.createToken({id: data.id, email: data.email})
                    res.status(200).json({token})
                }
                else{
                    throw({msg: 'Email or Password wrong', status: 400})
                }
            }
        })
        .catch(err=>{
            next(err)
        })
    }

    static googleLogin(req, res, next) {
        let name = null;
        let email = null;

        const { id_token } = req.body
        //console.log(id_token)
        const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
        const client = new OAuth2Client(CLIENT_ID);
        
        client.verifyIdToken({
            idToken: id_token,
            audience: CLIENT_ID
        })
        .then(ticket => {
            name = ticket.getPayload().name;
            email = ticket.getPayload().email;        
            return User.findOne({where: {email}})
        })
        .then(foundUser => {
            if(foundUser){
                //login
                return foundUser
            } else {
                const password = Math.random()*1000 + 'goole login password';
                return User.create({name, email, password})
            }
        })
        .then(user => {
            const token = jwt.createToken({id: user.id, email: user.email});
            res.status(200).json({token})
        })
        .catch(err => {
            next(err)
        })        
    }
    
}

module.exports = HomeController