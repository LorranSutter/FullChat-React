const mongoose = require("mongoose");

mongoose.set('useFindAndModify', false);

const MONGOURI = "mongodb+srv://lorran:BCDV1007@cluster0-lyl06.gcp.mongodb.net/FullChat?retryWrites=true&w=majority";

const InitiateMongoServer = async () => {
    try {
        await mongoose.connect(MONGOURI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log("Connected to DB !!");
    } catch (e) {
        console.log(e);
        throw e;
    }
};

module.exports = InitiateMongoServer;