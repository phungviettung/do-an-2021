import connectDB from '../../../utils/connectDB'
import Categories from '../../../models/categoriesModel'
import auth from '../../../middleware/auth'
import handler from '../../api/cors'

connectDB()

export default async (req, res) => {
    handler(req, res)
    switch(req.method){
        case "POST":
            await createCategory(req, res)
            break;
        case "GET":
            await getCategories(req, res)
            break;
    }
}

const createCategory = async (req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin')
        return res.status(400).json({err: "Authentication is not valid."})

        const { name, description } = req.body
        // console.log({name, description})
        if(!name) return res.status(400).json({err: "Name can not be left blank."})

        const newCategory = new Categories({name, description})

        await newCategory.save()
        res.json({
            success : true,
            msg: 'Success! Created a new category.',
            newCategory
        })

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const getCategories = async (req, res) => {
    const code_action = 'get_categories'
    try {
        // const result = await auth(req, res, code_action)
        const categories = await Categories.find()

        res.json({categories})

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}