import connectDB from '../../../utils/connectDB'
import Users from '../../../models/userModel'
import valid from '../../../utils/valid'
import bcrypt from 'bcrypt'
import handler from '../../api/cors'


connectDB()

export default async (req, res) => {
    handler(req, res)
    switch(req.method){
        case "POST":
            await register(req, res)
            break;
    }
}

const register = async (req, res) => {
    try{
        const { name, email, password, cf_password , role} = req.body

        const errMsg = valid(name, email, password, cf_password)
        if(errMsg) return res.status(200).json({
            success : false,
            msg: errMsg
        })

        const user = await Users.findOne({ email })
        if(user) return res.status(400).json({
            success : false,
            msg: 'This email already exists.'
        })

        const passwordHash = await bcrypt.hash(password, 12)

        const newUser = new Users({ 
            name, email, password: passwordHash, cf_password , role
        })

        await newUser.save()
        res.json({
            success : true,
            msg: "Đăng ký tài khoản thành công"
        })

    }catch(err){
        return res.status(500).json({
            success : false,
            msg: err.message
        })
    }
}