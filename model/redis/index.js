const Redis = require('ioredis')
const redis = new Redis()

redis.on('error',(err)=>{
    if(err){
        console.log('Redis链接错误',err)
        redis.quit()
    }
})
redis.on('ready',()=>{
    console.log('Redis链接成功')
})
exports.redis = redis