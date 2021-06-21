import connectDB from '../../../utils/connectDB'
import Material from '../../../models/materialModel'
import Products from '../../../models/productModel'
import auth from '../../../middleware/auth'
import handler from '../../api/cors'

connectDB()

export default async (req, res) => {
    handler(req, res)
    switch(req.method){
        case "GET":
            await getMaterial(req, res)
            break;
        case "PUT":
            await updateMaterial(req, res)
            break;
        case "DELETE":
            await deleteMaterial(req, res)
            break;
    }
}

const getMaterial = async (req, res) => {
    try {
        const { id } = req.query;

        const material = await Material.findById(id)
        if(!material) return res.status(400).json({err: 'This material does not exist.'})
        
        res.json({ 
            success : true,
            material
        })

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const updateMaterial = async (req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin')
        return res.status(400).json({err: "Authentication is not valid."})

        const {id} = req.query
        const {name, description} = req.body
        
        const newMaterial = await Material.findOneAndUpdate({_id: id}, {name, description})
        res.json({
            success : true,
            msg: "Success! Update a new material",
            material: {
                ...newMaterial._doc,
                name
            }
        })
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const deleteMaterial = async (req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin')
        return res.status(400).json({err: "Authentication is not valid."})

        const {id} = req.query

        const products = await Products.findOne({material: id})
        if(products) return res.status(400).json({
            err: "Please delete all products with a relationship"
        })

        await Material.findByIdAndDelete(id)
        
        res.json({msg: "Success! Deleted a material"})
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}