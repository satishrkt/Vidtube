import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema(
    {
        videoFile: { type: String, require: true },
        thumbnail: { type: String, require: true },
        userId: { type: Schema.Types.ObjectId, ref: "User", require: true },
        title: { type: String, require: true },
        description: { type: String, require: true },
        duration: { type: Number, require: true },
        views: { type: Number, require: true },
        isPublished: { type: Boolean, require: true },
    },
    {
        timestamps: true
    }
);

videoSchema.plugin(mongooseAggregatePaginate);
export const Video = mongoose.model("Video", vidoeSchema);