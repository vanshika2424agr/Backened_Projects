import mongoose, {Schema} from "mongoose"; 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
/*mongoose → Used to create schema & interact with MongoDB
bcrypt → Used to hash passwords
jsonwebtoken (jwt) → Used to create authentication tokens*/

const userSchema = new Schema({   //This defines the structure of your user data in MongoDB.
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim:true,
        index:true 
 /*Must be unique
Converted to lowercase
trim removes extra spaces
index → improves search performance*/
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim:true,  
    },
    fullname : {
        type: String,
        required: true,
        trim:true,
        index:true
    },
    avatar: {
        type: String,
        required: true,
    },
    coverImage : {
        type:String
    },
    watchHistory: [
     {
        type: Schema.Types.ObjectId,
        ref: "Video"
    }
],
password: {
    type: String,
    required: [true, 'Password is required']
},
refreshToken: {
    type:String
}

},
{
    timestamps: true   
//Automatically adds:
// createdAt
// updatedAt
})
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
/*Runs before saving user

If password is changed:
Hash it using bcrypt
If not changed:
Skip hashing

💡 This ensures passwords are never stored in plain text*/
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
};

/*👉 Used during login

Takes user input password
Compares with hashed password
Returns true or false*/
userSchema.methods.generateJWT = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
};

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({id: this._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "7d"});
};
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname,
        }, 
        process.env.ACCESS_TOKEN_SECRET, 
        {
            expiresIn: "1h"
        });
}
export  const User = mongoose.model("User",userSchema)

/*User registers → password gets hashed
User logs in → password is compared
If correct:
Access Token (1h)
Refresh Token (7d)
Tokens used for authentication*/