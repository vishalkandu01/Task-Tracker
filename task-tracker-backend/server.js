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

app.get("/", (req, res) => {
    return res.json({
        Message: "server is giving the response",
        visit: "localhost:8000/api/task-tracker"
    })
})

app.use("/api", taskRoutes);


const PORT = process.env.PORT
app.listen(PORT, () => `Server is started at port ${PORT}`)