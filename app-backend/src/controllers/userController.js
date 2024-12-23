const userService = require('../services/userService')
const userController = {
    updateUser: async(req,res)=>{
        try{
            const response = await userService.updateUser(req.body);
            res.status(200).send({response:response})
        }catch(e){
            console.log(e,'error')
        }
        
    },
    deleteUser:async(req,res) => {
        try{
            const response = await userService.deleteUser(req.params.id);
            res.status(200).send({response:response})
        }catch(e){
            console.log(e,'error')
        }
    }
}
module.exports = userController