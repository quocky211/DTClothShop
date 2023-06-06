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
export const vnpayPayment = async (total, order_id) => {
  const res = await axios.post('http://localhost:3001/order/vnpay_url', { total,  order_id });
  return res.data;
};

export const vnPayReturn = async () => {
  const res = await axios.get(`http://localhost:3001/order/vnpay_return${window.location.search}`);
  return res.data;
};

export const momoPayment = async (total, order_id) => {
  const res = await axios.post('https://thawing-hollows-39647.herokuapp.com/order/momo_payment_url', { total, order_id } );
  return res.data;
};

export const momoRedirect = async () => {
  const res = await axios.get(`https://thawing-hollows-39647.herokuapp.com/order/momo_return${window.location.search}`);
  return res.data;
};

export const getDiscount = async () => {
  const res = await axios.get("https://thawing-hollows-39647.herokuapp.com/order/discount");
  return res.data;
  };
