import moongoose from "moongoose";
import moongooseAggregaetPaginate from "mongoose-aggregate-paginate-v2"


const VideoSchema = new Schema ({
  videoFile :{
            type : String,
            required : true
         },
         thumbnail : {
            type : String, // cloudinary url
            required: true
         },
           title : {
            type : String, 
            required: true
           },
             description : {
            type : String, 
            required: true
           },
            duration : {
            type : Number, 
            required: true
           },
           views :{
            type : Number,
            default: 0
           },
           isPublised :{
            type : Boolean,
            default :true
           },
           owner :{
            type : Schema.Types.ObjectId,
            ref : "User"
           }

},
{
        timestamps : true
}
  )

  

  VideoSchema.plugin(moongooseAggregaetPaginate)
  export const Video = moongoose.model("Video",VideoSchema)
