import moongoose from "moongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try{
       const connectInstance =  await moongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
       console.log(`\n MongoDB connected !! DB HOST : ${connectInstance.connect.host}` )
    }
    catch(error){
      console.log("MONGODB Connection Error",error)
      process.exit(1)
    }
}

export default DB