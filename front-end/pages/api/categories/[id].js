import connectDB from '../../../utils/connectDB'
import Categories from '../../../models/categoriesModel'
import Products from '../../../models/productModel'
import auth from '../../../middleware/auth'
import handler from '../../api/cors'

connectDB()

export default async (req, res) => {
    handler(req, res)
    switch(req.method){
        case "GET":
            await getCategory(req, res)
            break;
        case "PUT":
            await updateCategory(req, res)
            break;
        case "DELETE":
            await deleteCategory(req, res)
            break;
    }
}

const getCategory = async (req, res) => {
    try {
        const { id } = req.query;

        const category = await Categories.findById(id)
        if(!category) return res.status(400).json({err: 'This category does not exist.'})
        
        res.json({ 
            success : true,
            category
        })

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const updateCategory = async (req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin')
        return res.status(400).json({err: "Authentication is not valid."})

        const {id} = req.query
        const {name, description} = req.body
        
        const newCategory = await Categories.findOneAndUpdate({_id: id}, {name, description})
        res.json({
            success : true,
            msg: "Success! Update a new category",
            category: {
                ...newCategory._doc,
                name
            }
        })
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const deleteCategory = async (req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin')
        return res.status(400).json({err: "Authentication is not valid."})

        const {id} = req.query

        const products = await Products.findOne({category: id})
        if(products) return res.status(400).json({
            err: "Please delete all products with a relationship"
        })

        await Categories.findByIdAndDelete(id)
        
        res.json({msg: "Success! Deleted a category"})
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}