
const { Collection } = require("mongodb")

exports.addMovie = async (Collection, movieObj) => {
    await Collection.insertOne(movieObj);
}

