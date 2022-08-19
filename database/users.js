import  Mongoose  from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {v4} from 'uuid';

const UserSchema = new Mongoose.Schema({
   userid: {type:String,required:true},
   password: {type:String,required:true},
   token_id:[String]
});


UserSchema.statics.userShouldNotExist = async ({userid}) => {
    const user = await UserModel.findOne({ userid });
    if (user) throw new Error("User Already exist.");
    return false;
};


UserSchema.statics.findByIdAndPassword = async ({userid, password}) => {
    const user = await UserModel.findOne({ userid });
    if (!user) throw new Error("Userid doesn't exist.");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid password.");
    return user;
};


UserSchema.statics.generateToken = async (_id) => {
    const token_id = v4();
    await UserModel.updateOne({_id},{ $addToSet: { token_id } });
    return jwt.sign({ user:_id ,timestamp: Date.now() , token_id },process.env.JWT_PRIVATE_KEY);
};


UserSchema.pre("save", function (next) {
    const user = this;
    const SALT_FACTOR = 8;
    if (!user.isModified("password")) return next();
    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
      if (err) return next(err);
      // hashing password
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        return next();
      });
    });
});


export const UserModel = Mongoose.model("Users",UserSchema);