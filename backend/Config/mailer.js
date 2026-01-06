const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASS
    }
})


exports.sendMailer = async (to, subject, html) => {

    const option = {
        from: process.env.MY_EMAIL,
        to, subject, html
    }

    await transporter.sendMail(option, (err) => {
        if(err){
            console.log(err)
        }
    })
}