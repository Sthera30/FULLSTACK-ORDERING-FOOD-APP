import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const protect = async (req, res, next) => {

    try {

        //GET THE TOKEN
        const token = req.cookies.token

        //check if the token is valid

        if (!token) {
            return res.status(200).json({ error: 'Invalid token!', success: false })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET)

        req.user = { email: decode.email }

        next()


    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Auth Error!', success: false })
    }

}