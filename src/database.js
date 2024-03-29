const mongoose = require("mongoose");

const server = "localhost:27017";
const database = "roleplay";

class Database
{
    constructor()
    {
        this._connect();
    }

    _connect()
    {
        mongoose.connect((process.env.MONGODB_URI) || (`mongodb://${server}/${database}`), { useNewUrlParser: true })
            .then(() =>
            {
                console.log("Database connection successful.");
            })
            .catch(err =>
            {
                console.error("Database connection error.");
            });
    }
}

module.exports = new Database();