import apiEndpoint from '../apiConfig';
import axios from 'axios';
// import Cookies from 'js-cookie';

// export const Axios = axios.create({
//   baseURL: `${apiEndpoint}/order`,
//   withCredentials: true,
// //   headers: {
// //     Authorization: `Bearer ${Cookies.get('token' || 'jwt')}`,
// //   },
// });
// export const vnPayBooking = async (
//   selectedSeats,
//   total,
//   user,
//   eventId,
//   ticketPrice
// ) => {
//   const res = await Axios.post('/create_payment_url', {
//     selectedSeats,
//     total,
//     user,
//     eventId,
//     ticketPrice,
//   });
//   return res.data;
// };

// export const vnPayReturn = async () => {
//   const res = await Axios.get(`/vnpay_return${window.location.search}`);
//   return res.data;
// };

export const momoPayment = async (total, order_id) => {
  const res = await axios.post('http://localhost:3001/order/momo_payment_url', { total, order_id } );
  return res.data;
};

export const momoRedirect = async () => {
  const res = await axios.get(`http://localhost:3001/order/momo_return${window.location.search}`);
  return res.data;
};
