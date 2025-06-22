const mongoose = require('mongoose')
// const connectingString = 'mongodb+srv://saif:1234@nodeexpressproject.pihvdop.mongodb.net/pocket_penny?retryWrites=true&w=majority'
const connectingString = "mongodb://0.0.0.0:27017/expense"
// const connectingStirng2 = 'mongodb+srv://saif:1234@nodeexpressproject.pihvdop.mongodb.net/Auth1?retryWrites=true&w=majority'
const db = async () => {
    try {
        await mongoose.connect(connectingString)
        console.log("DB is connected");
    } catch (error) {
        console.log("DB connection failed with error: ", error)
    }
}


module.exports = { db }