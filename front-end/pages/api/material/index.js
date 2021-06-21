import connectDB from '../../../utils/connectDB'
import Material from '../../../models/materialModel'
import auth from '../../../middleware/auth'
import handler from '../../api/cors'

connectDB()

export default async (req, res) => {
    handler(req, res)
    switch(req.method){
        case "POST":
            await createMaterial(req, res)
            break;
        case "GET":
            await getMaterial(req, res)
            break;
    }
}

const createMaterial = async (req, res) => {
    try {
        const result = await auth(req, res)
        if(result.role !== 'admin')
        return res.status(400).json({err: "Authentication is not valid."})

        const { name, description } = req.body
        // console.log({name, description})
        if(!name) return res.status(400).json({err: "Name can not be left blank."})

        const newMaterial = new Material({name, description})

        await newMaterial.save()
        res.json({
            success : true,
            msg: 'Success! Created a new Material.',
            newMaterial
        })

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const getMaterial = async (req, res) => {
    const code_action = 'get_material'
    try {
        // const result = await auth(req, res, code_action)
        const material = await Material.find()

        res.json({material})

    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}