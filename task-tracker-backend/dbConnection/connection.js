const mongoose = require('mongoose')



const dbConnect = async () => {
    const mongoUri = process.env.MONGO_URI
    const dbName = process.env.DB_NAME
    try {
        const connectionInstance = await mongoose.connect(`${mongoUri}/${dbName}`)
        console.log(`connectionInstance host is ${connectionInstance.connection.host}`)
    } catch (error) {
        console.error('DB connection fail the error is', error)
        process.exit(1)
    }
}

module.exports = dbConnect