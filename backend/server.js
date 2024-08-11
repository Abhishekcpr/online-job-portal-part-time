const express = require('express')
require('dotenv').config({})
const cors = require('cors')
const bot = require("./utils/telegramBot.js")
const router = require('./router/auth-router.js')
const contactRouter = require('./router/contact-router.js')
const jobsRouter  =  require('./router/jobs-router.js')
const bodyParser = require('body-parser');
const geminiRouter = require('./router/gemini-router.js')
const app = express()
const fileUpload = require('express-fileupload');



const connectDb = require('./utils/db.js')
app.use(express.json())


// console.log("token",process.env.TELEGRAM_BOT_API);


// origin: "http://localhost:3000/",
// origin: "https://online-job-portal-part-time.vercel.app/",
const corsOptions = {
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
    origin : "*"
};
app.use(fileUpload());
app.use(cors())


app.use('/api/auth', router)
app.use('/api', contactRouter)
app.use('/api/jobs', jobsRouter)
app.use('/api/', geminiRouter)


const PORT = process.env.PORT || 5000



app.get('/', (req,res)=>{
    res.send('<h1>Hey there...</h1>')
})

connectDb().then(()=>{
    app.listen(PORT, (err)=>{
        if(!err)
        {
            console.log(`App running on PORT : ${PORT}`);
        }
        else
        console.log(err);
    })
    
})
