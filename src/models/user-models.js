import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'json-web-token';

const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true,
            index: true,
        },
        id: {
            type: String,
            required: true,
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
            ref: 'vedios',
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
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    bcrypt.compare(password, this.password);
};
export const User = mongoose.model('User', userSchema);
