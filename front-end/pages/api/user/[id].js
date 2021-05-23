import connectDB from '../../../utils/connectDB'
import Users from '../../../models/userModel'
import auth from '../../../middleware/auth'
import handler from '../../api/cors'

connectDB()

export default async (req, res) => {
    handler(req, res)
    switch(req.method){
        case "GET":
            await getUserById(req, res)
            break;
        case "PATCH":
            await updateRole(req, res)
            break;
        case "DELETE":
            await deleteUser(req, res)
            break;
    }
}

const getUserById = async (req, res) => {
    try {
       const result = await auth(req, res)
       if(result.role !== 'admin') 
       return res.status(400).json({err: "Authentication is not valid"})

       const { id } = req.query;

        const user = await Users.find({'_id': id})

        res.json({
            success: true,
            user: user[0]
        });

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const updateRole = async (req, res) => {
    try {
       const result = await auth(req, res)
       if(result.role !== 'admin' || !result.root) 
       return res.status(400).json({err: "Authentication is not valid"})

       const {id} = req.query
       const {role} = req.body

       await Users.findOneAndUpdate({_id: id}, {role})
       res.json({msg: 'Update Success!'})

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const deleteUser = async (req, res) => {
    try {
       const result = await auth(req, res)
       if(result.role !== 'admin' || !result.root) 
       return res.status(400).json({err: "Authentication is not valid"})

       const {id} = req.query

       await Users.findByIdAndDelete(id)
       res.json({msg: 'Deleted Success!'})

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}