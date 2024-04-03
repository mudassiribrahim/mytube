import mongoose, { Schema } from 'mongoose';
import { AggregatePeginate } from 'mongoose-aggregate-paginate-v2';

const vedioSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
        },
        vedioFile: {
            type: String,
            required: true,
        },
        onwer: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        views: {
            type: Number,
            required: true,
            default: 0,
        },
        isPublished: {
            type: Boolean,
        },
        duration: {
            type: Number,
        },
        thumbNail: {
            type: String,
        },
    },
    {}
);

vedioSchema.plugin(AggregatePeginate);
export const vedios = mongoose.model('User', vedioSchema);
