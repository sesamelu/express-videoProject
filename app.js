const express = require('express')
const app = express()
const router = require('./router/index')

//挂载路由
app.use('/api/v1',router)


const PORT = process.env.PORT || 1022
app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})