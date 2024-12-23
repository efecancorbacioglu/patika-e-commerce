const bcrypt = require('bcryptjs');
const mongooseUser = require('../models/userModel')
const jwt = require('jsonwebtoken')

async function login(userParams){
    const {email,password} = userParams;
    try{
        const user = await mongooseUser.findOne({email:email});
        if(!user || !(await bcrypt.compare(password, user.password))){
            return {message:'invalid username or password'}
        }

        const token = jwt.sign({email:user.email}, process.env.JWT_SECRET,{
            expiresIn: '1h'
        })
        return {token:token,message:'success'}
    }catch(e){
        console.log(e);
        return false;
    }
}
async function register(userParams){
    const {name, surname, email, password} = userParams;
    try{
        const hashedPassword = bcrypt.hashSync(password,10);
        const newUser = new mongooseUser({
            name,
            surname,
            email,
            password:hashedPassword
        })
        newUser.save();
        return true;
    }catch(e){
        console.log(e);
        return false;
    }
}

module.exports = {
    login,
    register
}