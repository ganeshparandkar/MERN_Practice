const express = require('express');
const { errorHandler } = require('./middleware/errorMiddleware');
const dotenv = require('dotenv').config();


const PORT = process.env.PORT || 5000


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/goals',require('./routes/goalRoutes'))
app.use('/api/jobs',require('./routes/jobRoutes'))

app.use(errorHandler)

app.listen(PORT, ()=> console.log(`Server running at port: ${PORT}`))