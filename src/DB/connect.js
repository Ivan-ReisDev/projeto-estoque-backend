const mongoose = require("mongoose");

async function main(){

    try {
         mongoose.set("strictQuery", true)

        await mongoose.connect("mongodb+srv://ivanreisdev:hiq2Ooq2mQEab80s@cluster0.xfj18u4.mongodb.net/?retryWrites=true&w=majority");
        console.log("Banco Conectado", mongoose.connection.host);
    } catch (error) {
        console.log(`error: ${error}`);
    }
}


module.exports = main