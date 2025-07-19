import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        username: { type: String, require: [true, "Username is required"], unique: true, lowerCase: true, trim: true, index: true },
        email: { type: String, require: [true, "Email is required"], unique: true, lowerCase: true, trim: true },
        fullName: { type: String, require: true },
        password: { type: String, require: true },
        coverImage: { type: String },
        avatar: { type: String, require: true },
        watchHistory: [
            { type: mongoose.Schema.Types.ObjectId, ref: "Video" }
        ],
        refreshToken: { type: String },
    },
    {
        timestamps: true
    }
);

userSchema.pre("save", async function (next) { // Bcrypt the password
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) { //Check String password and bcrypt password is correct
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User", userSchema);