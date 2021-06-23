import connectDB from '../../../utils/connectDB'
import Products from '../../../models/productModel'
import auth from '../../../middleware/auth'
import handler from '../../api/cors'

connectDB()

export default async (req, res) => {
    handler(req, res)
    switch(req.method){
        case "GET":
            await getProducts(req, res)
            break;
    }
}



const getProducts = async (req, res) => {
        try {
            const productSale = await Products.find({
                sale : {$gt : 0}
            })
            // productSale.sort((a,b) => (a.sale < b.sale) ? 1 : ((b.sale < a.sale) ? -1 : 0))  // sort giam dan theo sale
            productSale.sort((a,b) => (a.sold < b.sold) ? 1 : ((b.sold < a.sold) ? -1 : 0)) //sort giam dan theo san pham da ban
            
            res.json({
                status: 'success',
                result: productSale.length,
                productSale: productSale.splice(0, 8)
            })
        } catch (err) {
            return res.status(500).json({err: err.message})
        }
}
