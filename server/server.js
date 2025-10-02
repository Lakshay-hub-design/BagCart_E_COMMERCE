require('dotenv').config();
const app = require('./src/app');
const connectDb = require('./src/db/db');

connectDb()

PORT = process.env.PORT || 3000

app.listen(PORT, function(){
    console.log("Server is running on Port: ", PORT)
})
