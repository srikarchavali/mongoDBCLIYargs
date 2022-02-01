const yargs = require("yargs");
const { client, connection} = require('./db/connection');

const {addMovie} = require('./utils');
const app = async (yargsObj) =>{
    try {
        const collection = await connection();

        if(yargsObj.add){
            // add movie to mongodb database, needs collection and sucess message.
            await addMovie(collection, {title: yargsObj.title, actor: yargsObj.actor})
        }else{
            console.log("Incorrect command");
        }
        client.close();
    } catch (error) {
        console.log(error);
    }
}

app(yargs.argv);