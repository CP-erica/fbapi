const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        require:true,
        trim: true
    },
    last_name: {
        type: String,
        require:true,
        trim: true
    },
    email_phone: {
        type: String,
        require:true,
        trim: true
    },
    password: {
        type: String,
        require:true,
        trim: true
    },
    birthday: {
        type: Date,
        require:true,
        trim: true
    },
    gender: {
        type: String,
        require:true,
        trim: true
    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }]
});

userSchema.statics.checkCrediantialsDb = async (user11, pass11) => {
    const user1 = User.findOne({ email_phone: user11, password: pass11 });
    return user1;
}

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'mynewtoken');
    console.log(token);
    user.tokens = user.tokens.concat({ token: token });
    await user.save();
    return token;
}

const User = mongoose.model('User', userSchema);

module.exports = User;
