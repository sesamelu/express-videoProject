//封装函数，查找请求中的验证错误并返回
const {validationResult} = require('express-validator')
module.exports = (validations)=>{
    return async (req,res,next)=>{
        await Promise.all(validations.map((validation) => validation.run(req)))
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(401).json({error:errors.array()})
        }
        next()
    }
}