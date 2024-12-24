const bcrypt = require('bcryptjs');
const mongooseUser = require('../models/userModel')
const jwt = require('jsonwebtoken')

async function login(userParams){
    const {email,password} = userParams;
    try{
        const user = await mongooseUser.findOne({email:email});
        if(!user || !(await bcrypt.compare(password, user.password))){
            return { status: 401, message: 'Invalid username or password' };
        }
        const token = jwt.sign({email:user.email, id: user.id},  process.env.JWT_SECRET,{
            expiresIn: '1h'
        })
        const userData = {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
        }
        return { status: 200, token, message: 'Success' , user: userData };
    }catch(e){
        console.log(e);
        return { status: 500, message: 'Internal server error' };
    }
}

async function register(userParams) {
    const { name, surname, email, password } = userParams;

    try {
        const existingUser = await mongooseUser.findOne({ email });
        if (existingUser) {
            return { status: 409, message: 'User with this email already exists' };
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = new mongooseUser({
            name,
            surname,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        const token = jwt.sign(
            { email: newUser.email, id: newUser.id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        const userData = {
            id: newUser.id,
            name: newUser.name,
            surname: newUser.surname,
            email: newUser.email,
        }
        return { status: 201, message: 'User successfully registered', token, user: userData };
    } catch (e) {
        console.error(e);
        return { status: 500, message: 'Internal server error' };
    }
}

module.exports = {
    login,
    register
}