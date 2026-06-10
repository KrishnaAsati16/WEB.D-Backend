import moongoose, {Schema} from "moongoose";

const subscriptionSchema = new Schema({
    Subsciber :{
        type: Schema.Types.ObjectId,   // one who is subscribing
        ref: "User"
    },
    channel:{
        type: Schema.Types.ObjectId,   // one to whom 'subscriber' is subscribing
        ref: "User"
    }
},{timestamps:true})




export const Subscription = moongoose.model("Subsciption",subscriptionSchema)
