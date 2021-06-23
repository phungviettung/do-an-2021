// const nodemailer = require('nodemailer');
// // import {createTransport} from 'nodemailer'
// export const sendMailNoti = function (cart) {
//     //send mail
//     let transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'tungxyz.11@gmail.com',
//             pass: 'tungalalal',
//         },
//         tls: { rejectUnauthorized: false },
//     });
//     let tongTien = 0;
//     let detailHtml = `<tr>
//                             <th>Sản phẩm</th>
//                             <th>Giá tiền / 1 sản phẩm </th>
//                             <th>Số lượng</th>
//                             <th>Thành tiền</th>
//                         </tr>`;
//     cart.forEach((element) => {
//         detailHtml += `<tr>
//                             <th>${element.item.name}</th>
//                             <th>${element.item.price}</th>
//                             <th>${element.qty}</th>
//                             <th>${element.price}</th>
//                         </tr>`;
//         tongTien += element.price;
//     });
//     let html = `<ol>
//     <li>
//         Tên khách hàng : ${req.body.firstName}  ${req.body.lastName}
//     </li>
//     <li>
//         Số điện thoại : <strong>${req.body.phone}</strong>
//     </li>
//     <li>
//         Địa chỉ : ${req.body.address} , ${req.body.district}, ${req.body.province}
//     </li>
//     <li>
//         Thông tin hóa đơn :
//         <table style=" font-family: arial, sans-serif;
//   border-collapse: collapse;
//   width: 100%;">
//             ${detailHtml}
//         </table>
//     </li>
//     <li>
//         Tổng Tiền : ${tongTien}
//     </li>
// </ol>`;

//     let maillist = [
//         'manhxyz.11@gmail.com', 
//         // 'diunguyen550@gmail.com'
//     ];

//     let mailOptions = {
//         from: 'tungxyz.11@gmail.com',
//         to: maillist,
//         subject: 'Có đơn hàng mới',
//         html: html,
//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log('Email sent: ' + info.response);
//         }
//     });
// }