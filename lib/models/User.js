import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const userSchema = new mongoose.Schema({
    clerkId : {
        type : String,
        required : true,
        unique : true
    },
    firstname : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    userName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    posts : {
        type : [{type : mongoose.Schema.Types.ObjectId, ref: "Post"}],
        default : [],
    }, 
    savedPosts :{
        type : [{type : mongoose.Schema.Types.ObjectId, ref : "Post"}],
        default : []
    },
    likedPosts :{
        type : [{type : mongoose.Schema.Types.ObjectId, ref : "Post"}],
        default : []
    },
    followers : {
        type : [{type : mongoose.Schema.Types.ObjectId, ref : "User"}],
        default : []
    },
    following : {
        type : [{type : mongoose.Schema.Types.ObjectId, ref : "User"}],
        default : []
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

const User = mongoose.models.user || mongoose.model ("User", userSchema);

export default User;