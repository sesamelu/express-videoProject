const express = require('express')
const router = require('./router/index')
const morgan = require('morgan')

const app = express()
//挂载路由
app.use('/api/v1',router)
app.use(express.json())
app.use(express.urlencoded())
app.use(express.static('public'))
//记录日志
app.use(morgan('dev'))

const PORT = process.env.PORT || 1022
app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})