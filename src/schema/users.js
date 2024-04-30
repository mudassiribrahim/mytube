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
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowecase: true,
        },
        watchHistory:[{
            type: Schema.Types.ObjectId,
            ref: 'vedios',
        }],
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
    await bcrypt.compare(password, this.password);
    
};

userSchema.methods.generateAccessToken = async function () {
    return await jwt.sing(
        {
            id: this.id,
            userName: this.userName,
            email: this.email,
            fullName: this.fullName,
        },
        {
            expiresIn: process.eventNames.ACCESS_SECRET_EXPIRY,
        }
    );
};
userSchema.methods.generateRefreshToken = async function () {
    return await jwt.sing(
        {
            id: this.id,
            userName: this.userName,
        },
        {
            expiresIn: REFRESH_SRCRET_EXPIRY,
        }
    );
};
export const User = mongoose.model('User', userSchema);
