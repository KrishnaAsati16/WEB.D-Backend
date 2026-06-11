import moongoose, {Schema} from "moongoose";
import mongooseAggregatePaginate from "moongoose-aggregate-paginate-v2";

const commentSchema = new Schema(
    {
        content:{
            type:String,
            required:true
        },
        video:{
            type:Schema.Types.ObjectId,
            ref:"Video"
        },
         owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    },
    {
        timestamps:true
    }
)


commentSchema.plugin(mongooseAggregatePaginate)

export const Comment = moongoose.model("Comment",commentSchema)