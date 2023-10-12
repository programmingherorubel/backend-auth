const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const express = require('express')
const app = express()
const port = process.env.PORT || 9000 
const userRouter = require('./Router/users')

// middelware 
dotenv.config()
app.use(express.json())
app.use(cors())

// Connection
mongoose.connect(process.env.MONGOOSE_STRING_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connection successful');
    })
    .catch((error) => {
        console.error('Connection error:', error);
    });


app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/users',userRouter)

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})