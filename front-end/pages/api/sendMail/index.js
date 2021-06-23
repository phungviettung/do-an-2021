import connectDB from '../../../utils/connectDB'
import Products from '../../../models/productModel'
import handler from '../../api/cors'
const nodemailer = require('nodemailer');

connectDB()

export default async (req, res) => {
    handler(req, res)
    switch(req.method){
        case "POST":
            await sendMail(req, res)
            break;
    }
}

const sendMail = async (req, res) => {
        try {
            let {newOrderRes, cart} = req.body
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'tungxyz.11@gmail.com',
                    pass: 'pmhxtbxtcyktvttu',
                },
                tls: { rejectUnauthorized: false },
            });
            let detailHtml = `
                                <tr>
                                    <th>Sản phẩm</th>
                                    <th>Giá tiền / 1 sản phẩm </th>
                                    <th>Số lượng</th>
                                    <th>Thành tiền</th>
                                </tr>`;
            cart.forEach((element) => {
                detailHtml += `<tr>
                                    <th>${element.title}</th>
                                    <th>${element.price}.000đ</th>
                                    <th>${element.quantity}</th>
                                    <th>${element.price * element.quantity}.000đ</th>
                                </tr>
                                `;
            });
            let html = `<ol>
            <li><strong>Mã đơn hàng : ${newOrderRes._id}</strong></li>
            <li>
                Mã khách hàng : ${newOrderRes.user} 
            </li>
            <li>
                Số điện thoại : <strong>${newOrderRes.mobile}</strong>
            </li>
            <li>
                Địa chỉ : ${newOrderRes.address}
            </li>
            <li>
                Thông tin hóa đơn :
                <table style=" font-family: arial, sans-serif;
          border-collapse: collapse;
          width: 100%;">
                    ${detailHtml}
                </table>
            </li>
            <li>
                Tổng Tiền :  ${newOrderRes.total} .000đ
            </li>
        </ol>`;
            let maillist = [
                // 'manhxyz.11@gmail.com', 
                // 'diunguyen550@gmail.com',
                'tungphungviet@gmail.com'
            ];

            let mailOptions = {
                from: 'tungxyz.11@gmail.com',
                to: maillist,
                subject: `Có đơn hàng mới ${newOrderRes._id}`,
                html: html,
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            
            res.json({
                status: 'success',
                message : 'send mail noti'
            })
        } catch (err) {
            return res.status(500).json({err: err.message})
        }
}
