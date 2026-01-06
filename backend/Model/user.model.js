const { Schema, model } = require("mongoose");
const { common, commonString, commonNumber } = require("./common.model");

const userSchema = new Schema({
    name: commonString,
    status: {
        ...common,
        type: Boolean,
        default: true
    },
    email: {
        ...commonString,
        unique: [true, "EmailId Already Exist!"],
        required: true
    },
    mobile: {
        ...commonNumber,
        unique: [true, "Mobile Number Already Exist!"],
        required: true
    },
    password: {
        ...commonString,
        required: true
    },
    otp : commonString
}, { timestamps: true })

const User = model('User', userSchema)
module.exports = User