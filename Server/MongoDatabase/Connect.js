import mongoose from "mongoose";
export const dbConnect =  () => {
    try{

        console.log("Db connected");
        
         mongoose.connect(process.env.MONGO_URI)
    }catch(e){
        console.log("Error connecting mongo db",e);
        
    }
}