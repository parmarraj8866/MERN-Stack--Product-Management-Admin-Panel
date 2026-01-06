const { sendMailer } = require("../Config/mailer")
const User = require("../Model/user.model")
const { createModel } = require("../utils/commonModel")
const { PlainToHash } = require("../utils/password")
const otpGenerator = require("otp-generator")
const sendMail = require("../utils/sendMail")


exports.signup = async (req, res) => {
    const { name, email, password, mobile } = req.body
    const hash_pass = await PlainToHash(password)

    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false })


    const user = await createModel(User, { name, email, password: hash_pass, mobile, otp }, "User Signup Successfully!")

    if (user) {
        await sendMailer(email, "Verify Your Email", sendMail(otp))
    }

    res.json({
        success: true,
        user
    })
}