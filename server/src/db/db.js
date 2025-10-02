const mongoose = require('mongoose');

function connectDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("mongoDB connected")
    })
    .catch((err)=>{
        console.error(err)
    })
};

module.exports = connectDb;