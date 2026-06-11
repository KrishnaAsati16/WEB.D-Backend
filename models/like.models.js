import moongoose, {Schema} from "moongoose";

const likeSchema = new Schema({
   video:{
            type:Schema.Types.ObjectId,
            ref:"Video"
        },
        comment:{
            type:Schema.Types.ObjectId,
            ref:"Comment"
        },
        tweet:{
            type:Schema.Types.ObjectId,
            ref:"Tweet"
        },
         tweetLike:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
},{
    timestamps:true
}
)

export const Like = moongoose.model("Like",likeSchema)