import { ErrorHandler } from "../../utils/ErrorHandler.js"
import jwt from "jsonwebtoken"

const isAuthenticated = async(req,res,next) => {
    try {
            const authHeader = req.headers['Authorization'] || req.headers['authorization']
            console.log('authHeader : ',authHeader)
            if(!authHeader) return next(new ErrorHandler(401,"Please logIn to access"))

            const token = authHeader.split(' ')[1]
            console.log('token : ',token)
            if(!token) return next(new ErrorHandler(401,"Please logIn to access"))
            
            const decodedData = jwt.verify(token,process.env.JWT_ACCESS_TOKEN_SECRET)
            console.log('decodedData : ',decodedData)
            const {userId} = decodedData;
            req.user = {userId}

            next()

    } catch (error) {
        next(new ErrorHandler(403,"forbidden"))
    }


}

export {isAuthenticated};