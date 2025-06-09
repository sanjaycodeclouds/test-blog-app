const { Schema, model } = require("mongoose")
const bcrypt = require("bcrypt");
const { createTokenForUser } = require("../services/authentication");

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImageUrl: {
        type: String,
        default: "/uploads/default.png"
    },
    role: {
        type: String,
        enum: ["User", "Admin"],
        default: "User"
    }

}, {timestamps: true})


userSchema.pre('save', async function(next) {
    const user = this;

    if (!user.isModified("password")) return

    const hashedPassword = await bcrypt.hash(user.password, 10);

    this.password = hashedPassword

    next();
});


userSchema.statics. matchPasswordAndGenerateToken = async function(email, password) {
    const user = await this.findOne({ email })

    if (!user) return null

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) return null

    const token = createTokenForUser(user)

    return token
}


const User = model("user", userSchema)


module.exports = User