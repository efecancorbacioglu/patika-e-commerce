const authService = require('../services/authService')

const authController = {
    login: async(req,res)=>{
        if(!req.body.email || !req.body.password){
            return res.status(400).send({response:{message:'email and password are required'}})
        }
        try{
            const response = await authService.login(req.body);
            res.status(200).send({response: response})
        }catch(e){
            console.log(e,'error')
        }
        
    },
    register:async(req,res) => {
        try{
            const response = await authService.register(req.body);
            res.status(200).send({response:response})
        }catch(e){
            console.log(e,'error')
        }
    }
}
module.exports = authController