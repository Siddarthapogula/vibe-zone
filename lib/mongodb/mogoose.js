import mongoose from "mongoose";
import { tree } from "next/dist/build/templates/app-page";

let isConnected = false;

export const connectToDB = async ()=>{
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.log("Mongodb is already connected");
        return ;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName : "VibeZone",
            useNewUrlParser : true,
        });
        isConnected = true;
        console.log("mongodb is connected");
    }
    catch(error){
        console.log(error);
    }
}