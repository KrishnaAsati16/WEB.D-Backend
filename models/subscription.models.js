import moongoose, {Schema} from "moongoose";

const subsciptionSchema = new Schema({
    Subsciber :{
        type: Schema.Types.ObjectId,   // one who is subscribing
        ref: "User"
    },
    channel:{
        type: Schema.Types.ObjectId,   // one to whom 'subscriber' is subscribing
        ref: "User"
    }
},{timestamps:true})




export const Subsciption = moongoose.model("Subsciption",subsciptionSchema)