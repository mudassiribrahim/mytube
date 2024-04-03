import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowecase: true,
    },
    watchHistory: {
        type: Schema.Types.ObjectId,
        ref: 'vedio',
    },
    fullName: {
        type: String,
        trim: true,
    },
    avatar: {
        type: String,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    coverImage: {
        type: String,
    },
    refreshToken: {
        type: String,
    },
});

export const User = mongoose.model('User', userSchema);
