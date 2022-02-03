const yargs = require("yargs");
const { client, connection} = require('./db/connection');

const {addMovie, addMany, readOne, readAll, deleteItem, deleteAll, updateOne,} = require('./utils');
const app = async (yargsObj) =>{
    try {
        const collection = await connection();

        if(yargsObj.add){
            // add movie to mongodb database, needs collection and sucess message.
            await addMovie(collection, {title: yargsObj.title, actor: yargsObj.actor, })
        }else if(yargsObj.addMany){
            await addMany(collection, yargsObj.movies)
        }else if (yargsObj.readOne) {
            await readOne(collection, {
            title: yargsObj.title,  
            actor: yargsObj.actor,
            });
        }else if (yargsObj.readall) {
            await readAll(collection);
        }else if (yargsObj.update) {
            await updateOne(collection, yargsObj); //Syntax: node src/app.js --update --title/etc="old"  --newtitle/etc="new value"
        } else if (yargsObj.deleteone) {
            await deleteItem(collection, yargsObj); 
        } else if (yargsObj.deleteall) {
            await deleteAll(collection, yargsObj);
        } 
        else{
            console.log("Incorrect command");
        }
    } catch (error) {
        console.log(error);
    }finally{
        client.close();
    }
}

app(yargs.argv);
console.log(yargs.argv);