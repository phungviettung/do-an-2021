import jwt_decode from "jwt-decode";
import jwt from 'jsonwebtoken'
import Users from '../models/userModel'
import getPermission from "../utils/getPermission"

const auth = async (req, res, code_action) => {
    const token = req.headers.authorization;
    if(!token) return res.status(400).json({err: 'Invalid Authentication.'})

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
   
    if(!decoded) return res.status(400).json({err: 'Invalid Authentication.'})

    // let author = await getPermission(decoded.id)
    // const permissServer = author.idPermissAndAction
    // const permissDecodeJWT = jwt_decode(token).idPermissAndAction
    // if(permissDecodeJWT)
    // console.log(code_action)

    const user = await Users.findOne({_id: decoded.id})

    return {id: user._id, role: user.role, root: user.root, 
        // author : author.idPermissAndAction
    };
}


export default auth