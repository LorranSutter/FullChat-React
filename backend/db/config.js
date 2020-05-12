const mongoose = require("mongoose");

mongoose.set('useFindAndModify', false);

const MONGOURI = "DATABASE-URL";

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
