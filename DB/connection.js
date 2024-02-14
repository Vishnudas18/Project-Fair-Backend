const mongoose = require('mongoose')

const connectionString = process.env.DATABASE 

mongoose.connect(connectionString).then(()=>{
    console.log("Mongodb connection established...");
})
.catch((error)=>{
    console.log("Mongodb connection error");
})

