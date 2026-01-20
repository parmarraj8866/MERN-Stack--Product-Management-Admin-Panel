const jwt = require("jsonwebtoken")

exports.verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    try {

        if (!token) {
            return res.json({
                success: false,
                message: "You are not authenticate!"
            })
        }

        // 2 methods for Bearer token

        // 1. // let newToken = token.slice(7)  
        // 2. // let newToken = token.split(" ")[1]    

        // const verifytoken = jwt.verify(newToken, secretkey)


        const secretkey = process.env.SECRET_KEY
        const verifytoken = jwt.verify(token, secretkey)

        if (!verifytoken) {
            res.json({
                success: false,
                message: "You are not authenticate!"
            })
        }

        req.user = verifytoken

        next()

    } catch (error) {
        res.json({
            message: error.message || "Server Error"
        })

    }
}