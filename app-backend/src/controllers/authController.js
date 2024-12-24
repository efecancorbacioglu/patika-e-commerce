const authService = require('../services/authService')

const authController = {
    login: async(req,res)=>{
        if(!req.body.email || !req.body.password){
            return res.status(400).send({response:{message:'email and password are required'}})
        }
        try{
            const response = await authService.login(req.body);

            if (response.status === 401) {
                return res.status(401).send({ response: { message: response.message } });
            }

            res.status(200).send({response: response})
        }catch(e){
            console.error(e, 'error');
            res.status(500).send({ response: { message: 'Internal server error' } });
        } 
        
    },

    register: async (req, res) => {
        const { name, surname, email, password } = req.body;
    
        if (!name || !surname || !email || !password) {
            return res.status(400).send({ response: { message: 'All fields are required' } });
        }
    
        try {
            const response = await authService.register(req.body);
    
            if (response.status === 400) {
                return res.status(400).send({ response: { message: response.message } });
            }
    
            if (response.status === 409) {
                return res.status(409).send({ response: { message: response.message } });
            }
    
            res.status(201).send({ response: { message: 'User successfully registered', token: response.token } });
        } catch (e) {
            console.error(e, 'error');
            res.status(500).send({ response: { message: 'Internal server error' } });
        }
    },   
}
module.exports = authController