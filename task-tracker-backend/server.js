const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const dbConnect = require('./dbConnection/connection')
const taskRoutes = require('./routes/taskRoutes')


const app = express();
dotenv.config({
    path: "./.env"
})

app.use(cors());
app.use(express.json());

dbConnect()

app.use("/api", taskRoutes);


const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server is started at port ${PORT}`))