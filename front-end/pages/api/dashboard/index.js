import connectDB from '../../../utils/connectDB'
import Orders from '../../../models/orderModel'
import Users from '../../../models/userModel'
import Category from '../../../models/categoriesModel'
import Product from '../../../models/productModel'
import auth from '../../../middleware/auth'
import handler from '../../api/cors'
import {getMondayWeek, 
    getPreviousMonday,
    getAllStartEndDayInRangeTime,
    firstDayInPreviousMonth,
    getTotalDateInMonth
} from '../../../utils/getDate'

connectDB()

export default async (req, res) => {
    handler(req, res)
    switch(req.method){
        case "GET":
            await getDashboard(req, res)
            break;
    }
}

const getDashboard = async (req, res) => {
    try {
       const result = await auth(req, res)
       if(result.role !== 'admin') 
       return res.status(400).json({err: "Authentication is not valid"})
       
       let data ={
            current : {
                totalOrder : 1,
                totalShipping : 1,
                totalIncome : 1,
                totalUser : 1
            },
            pre : {
                totalOrder : 1,
                totalShipping : 1,
                totalIncome : 1,
                totalUser : 1
            },
            chart : {
                label : [],
                data : []
            },
            chart2 : {
                label : [],
                data : []
            }
        }

       if (req.query.timmer == 'week'){
        let firstDayOfWeek = getMondayWeek(new Date)
        let firtpastDateOfWeek = getPreviousMonday()
        /*
            exe total overview
        */    
        //    current week
            const orderListCurrentWeek = await Orders.find({
                createdAt : {
                    $gte : firstDayOfWeek.toISOString(),
                    $lt : (new Date).toISOString()
                }
            })          
            const userListCurrentWeek = await Users.find({
                role : 'user',
                createdAt : {
                    $gte : firstDayOfWeek.toISOString(),
                    $lt : (new Date).toISOString()
                }
            })

            data.current.totalOrder =  orderListCurrentWeek.length
            data.current.totalUser = userListCurrentWeek.length

            let orderShipping = orderListCurrentWeek.filter(order => order.delivered = true)
            data.current.totalShipping = orderShipping.length

            let totalIncome = 0
            orderListCurrentWeek.forEach(order => {
                totalIncome += order.total
            });
            data.current.totalIncome = totalIncome

            // pre week
            const orderListPreWeek = await Orders.find({
                createdAt : {
                    $gte : new Date(firtpastDateOfWeek).toISOString(),
                    $lt :  firstDayOfWeek.toISOString(),
                }
            })

            const userListPreWeek = await Orders.find({
                createdAt : {
                    $gte : new Date(firtpastDateOfWeek).toISOString(),
                    $lt :  firstDayOfWeek.toISOString(),
                }
            })
            data.pre.totalOrder =  orderListPreWeek.length
            data.pre.totalUser = userListPreWeek.length

            let orderShippingPre = orderListPreWeek.filter(order => order.delivered = true)
            data.pre.totalShipping = orderShippingPre.length

            let totalIncomePre = 0
            orderListPreWeek.forEach(order => {
                totalIncomePre += order.total
            });
            data.pre.totalIncome = totalIncomePre
        /*
            exe chart overview
        */  
        let startEndDays = getAllStartEndDayInRangeTime(6, firstDayOfWeek)
        let arrTotalProductInRangeTime = []
        let arrlabel = []
        for (let index = 0; index < startEndDays.length; index++) {
            const e = startEndDays[index];
            const orders = await Orders.find({
                createdAt : {
                    $gte : e.start,
                    $lte : e.end
                }
            })
            let totalProduct = 0
            orders.forEach(element => {
                element.cart.forEach(e=> totalProduct += e.quantity)
            });

            arrTotalProductInRangeTime.push(totalProduct)
            arrlabel.push(e.name)
        }
        data.chart.label = arrlabel
        data.chart.data = arrTotalProductInRangeTime

        /** chart 2 */

            let listCategory = await Category.find({})
            let listIDCategory = []
            let listNameCategory = []
            let listTotalProductInCategory = []
            listCategory.forEach(e=> {
                listIDCategory.push(e._id)
                listNameCategory.push(e.name)
            })
            
            for (let index = 0; index < listIDCategory.length; index++) {
                const categoryID = listIDCategory[index];
                let total = 0
                for (let j = 0; j < orderListCurrentWeek.length; j++) {
                    const order = orderListCurrentWeek[j];
                    for (let q = 0; q < order.cart.length; q++) {
                        const product = order.cart[q]
                        let produDb = await Product.findOne({
                            _id : product._id
                        })
                        if (produDb){
                            if(produDb.category == categoryID) {
                                total += product.quantity
                            }
                        }
                    }
                }
                listTotalProductInCategory.push(total)
            }

            data.chart2.label = listNameCategory
            data.chart2.data = listTotalProductInCategory
            

        }else if(req.query.timmer == 'month'){

            let date = new Date()
            let firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
            let firtpastDateOfMonth = firstDayInPreviousMonth(date)
        /*
            exe total overview
        */    
        //    current month
            const orderListCurrentMonth = await Orders.find({
                createdAt : {
                    $gte : firstDayOfMonth.toISOString(),
                    $lt : (new Date).toISOString()
                }
            })          
            const userListCurrentMonth = await Users.find({
                role : 'user',
                createdAt : {
                    $gte : firstDayOfMonth.toISOString(),
                    $lt : (new Date).toISOString()
                }
            })

            data.current.totalOrder =  orderListCurrentMonth.length
            data.current.totalUser = userListCurrentMonth.length

            let orderShipping = orderListCurrentMonth.filter(order => order.delivered = true)
            data.current.totalShipping = orderShipping.length

            let totalIncome = 0
            orderListCurrentMonth.forEach(order => {
                totalIncome += order.total
            });
            data.current.totalIncome = totalIncome

        //     // pre month
            const orderListPreMonth = await Orders.find({
                createdAt : {
                    $gte : new Date(firtpastDateOfMonth).toISOString(),
                    $lt :  firstDayOfMonth.toISOString(),
                }
            })

            const userListPreMonth = await Orders.find({
                createdAt : {
                    $gte : new Date(firtpastDateOfMonth).toISOString(),
                    $lt :  firstDayOfMonth.toISOString(),
                }
            })
            data.pre.totalOrder =  orderListPreMonth.length
            data.pre.totalUser = userListPreMonth.length

            let orderShippingPre = orderListPreMonth.filter(order => order.delivered = true)
            data.pre.totalShipping = orderShippingPre.length

            let totalIncomePre = 0
            orderListPreMonth.forEach(order => {
                totalIncomePre += order.total
            });
            data.pre.totalIncome = totalIncomePre
        // /*
        //     exe chart overview
        // */  
        let startEndDays = getAllStartEndDayInRangeTime(getTotalDateInMonth(new Date())-2, firstDayOfMonth)
        let arrTotalProductInRangeTime = []
        let arrlabel = []
        for (let index = 0; index < startEndDays.length; index++) {
            const e = startEndDays[index];
            const orders = await Orders.find({
                createdAt : {
                    $gte : e.start,
                    $lte : e.end
                }
            })
            let totalProduct = 0
            orders.forEach(element => {
                element.cart.forEach(e=> totalProduct += e.quantity)
            });

            arrTotalProductInRangeTime.push(totalProduct)
            arrlabel.push(e.day)
        }
        data.chart.label = arrlabel
        data.chart.data = arrTotalProductInRangeTime

        /** chart 2 */

        let listCategory = await Category.find({})
        let listIDCategory = []
        let listNameCategory = []
        let listTotalProductInCategory = []
        listCategory.forEach(e=> {
            listIDCategory.push(e._id)
            listNameCategory.push(e.name)
        })
        
        for (let index = 0; index < listIDCategory.length; index++) {
            const categoryID = listIDCategory[index];
            let total = 0
            for (let j = 0; j < orderListCurrentMonth.length; j++) {
                const order = orderListCurrentMonth[j];
                for (let q = 0; q < order.cart.length; q++) {
                    const product = order.cart[q]
                    let produDb = await Product.findOne({
                        _id : product._id
                    })
                    if (produDb){
                        if(produDb.category == categoryID) {
                            total += product.quantity
                        }
                    }
                }
            }
            listTotalProductInCategory.push(total)
        }

        data.chart2.label = listNameCategory
        data.chart2.data = listTotalProductInCategory

       }else{}
       
        res.json({
            success: true,
            data: data,
        });
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}