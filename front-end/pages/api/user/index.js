import connectDB from '../../../utils/connectDB'
import Users from '../../../models/userModel'
import auth from '../../../middleware/auth'
import handler from '../../api/cors'

connectDB()

export default async (req, res) => {
    handler(req, res)
    switch(req.method){
        case "PATCH":
            await uploadInfor(req, res)
            break;
        case "GET":
            await getUsers(req, res)
            break;
    }
}

const getUsers = async (req, res) => {
    try {
       const result = await auth(req, res)
       if(result.role !== 'admin') 
       return res.status(400).json({err: "Authentication is not valid"})

        const users = await Users.find().select('-password')


        // panigation

        let { key, page, pageSize } = req.query;
        if (!key) {
            key = "";
        }
        if (!page) {
            page = 1;
        }
        if (!pageSize) {
            pageSize = 10;
        }
        let filterUsers = users.filter((user) =>
            user.name.toLowerCase().includes(key.toLowerCase())
        );
        let total = filterUsers.length;
        let fromIndex = (page - 1) * pageSize;
        let endIndex = page * pageSize;
        if (endIndex > total) {
            endIndex = total;
        }
        filterUsers = filterUsers.filter(
            (_, index) => index >= fromIndex && index < endIndex
        );
        
        // end panigation

        res.json({
            success: true,
            data: filterUsers,
            key,
            page,
            pageSize,
            total,
        });
        // res.json({users})

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const uploadInfor = async (req, res) => {
    try {
        const result = await auth(req, res)
        const {name, avatar} = req.body

        const newUser = await Users.findOneAndUpdate({_id: result.id}, {name, avatar})

        res.json({
            msg: "Cập nhập thông tin thành công!",
            user: {
                name,
                avatar,
                email: newUser.email,
                role: newUser.role
            }
        })
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}
