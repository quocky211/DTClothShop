import "./ShipAddress.css"
import { NavLink as Link } from "react-router-dom";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../HeaderFolder/Header";
import Footer from "../FooterFolder/Footer";
import { momoPayment } from '../../actions/orders'
import { vnpayPayment } from '../../actions/orders'
import OrderDataService from "../../services/orders";
import { useNavigate } from 'react-router-dom';
function ShipAddress() {
    const location = useLocation();
    const data = location.state?.data;
    const items = location.state?.items;
    const [provinces, setProvince] = useState([]);
    const [provinceid, setProvinceId] = useState("");
    const [districts, setDistrict] = useState([]);
    const [districtid, setDistrictId] = useState("");
    const [wards, setWards] = useState([]);
    const [selectedProvince, setselectedProvince] = useState("");
    const [selectedDistrict, setselectedDistrict] = useState("");
    const [selectedWard, setselectedWard] = useState("");
    const [shipcost, setshipcost] = useState("");
    const [method, setMethod] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();
    console.log(location);
    console.log(items);
    var vnd = Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    useEffect(() => {
        const getProvince = async () => {
            const resProvince = await fetch("https://provinces.open-api.vn/api/");
            const res = await resProvince.json();
            setProvince(await res);
        }
        getProvince();

    }, []);

    const handleProvince = (event) => {
        const getProvinceId = event.target.value;
        var index = event.nativeEvent.target.selectedIndex;
        setselectedProvince(event.nativeEvent.target[index].text);
        setProvinceId(getProvinceId);
        if (event.target.value < 52) {
            setshipcost(40000);
        }
        else {
            setshipcost(30000);
        }
        console.log(shipcost);
    }

    useEffect(() => {
        const getDistrict = async () => {
            const resDistrict = await fetch(`https://provinces.open-api.vn/api/p/${provinceid}?depth=2`);
            const resDis = await resDistrict.json();
            setDistrict(await resDis['districts']);
        }
        getDistrict();
    }, [provinceid]);

    const handleDistrict = (event) => {
        setDistrictId(event.target.value);
        var index = event.nativeEvent.target.selectedIndex;
        setselectedDistrict(event.nativeEvent.target[index].text);
    }

    useEffect(() => {
        const getWard = async () => {
            const resWard = await fetch(`https://provinces.open-api.vn/api/d/${districtid}?depth=2`);
            const response = await resWard.json();
            console.log(response['wards']);
            setWards(await response['wards']);
        }
        getWard();
    }, [districtid]);

    const handleWard = (event) => {
        var index = event.nativeEvent.target.selectedIndex;
        setselectedWard(event.nativeEvent.target[index].text);
    }
    var address = `${selectedWard}, ${selectedDistrict}, ${selectedProvince}`;

    const handleCreate = async (e) => {
        
        e.preventDefault();

        let newOrder = {
          user_id: 11,
          address: address,
          status: 'Chưa thanh toán',
          note: "Không có",
          phone: phone,
          pay_method: method,
          total: Number(data + shipcost),
        };
        
        // console.log(newOrder);
        let total = data + shipcost
        OrderDataService.createOrders(newOrder)
          .then(async (response) => {
            const order_id = response.data;
            alert("Thêm mới thành công");
            items?.map((item) => {
                let newOrderDetail = {
                    order_id: order_id,
                    product_id: item._id,
                    amount: item.price,
                    total: item.price*item.quantity,
                    qty: item.quantity,
                };
                console.log(newOrderDetail);
                OrderDataService.createOrderDetail(newOrderDetail).then().catch();
              })

            if (method == 'momo'){
                try {
                    console.log(order_id);
        
                    console.log(total);
                    const res = await momoPayment(total, order_id)
                    if(!res) {
                        return;
                    }
                    window.location.assign(res?.payUrl);
                    console.log(res);
                }
                catch (e){
                    console.log(e);
                }
            }
            if (method == 'vnpay'){
                //vnpay
                try {
                const res = await vnpayPayment(
                total, order_id
                );
                if (!res) {
                    return; 
                }
                console.log(res);
                window.location.assign(res?.paymentUrl);
                } catch (e) {
                console.log(e);
                }

            }

            
          })
          .catch((e) => {
            alert("Thêm không thành công")
            console.log(e);
          });
        
      };
      items?.map((item) => {
        console.log(item.name);
      })
    return (
        <div className="main-container-ship">
            <Header/>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item href="/ShoppingCart">Giỏ hàng</Breadcrumb.Item>
                <Breadcrumb.Item active>Địa chỉ giao hàng</Breadcrumb.Item>
            </Breadcrumb>
            <div className="container-ship">
                <div className="container-ship-left">
                    <h2>Thông tin giao hàng</h2>
                    <div className="form-address-container">
                        <form className="form-address">
                            <input type="text" placeholder="Họ và tên" required />
                            <div className="mail-phone">
                                <input type="email" placeholder="Email" />
                                <input type="text" placeholder="Số điện thoại" onChange={(e)=> setPhone(e.target.value)} pattern="[0]{1}[1-9]{1}[0-9]{8}" required />
                            </div>
                            <div className="detail-address">
                                <select name="" id="province" onChange={(e) => handleProvince(e)} >
                                    <option value="-1">Tỉnh/TP</option>
                                    {
                                        provinces.map((getpro, index) => (
                                            <option key={index} value={getpro.code}>{getpro.name}</option>

                                        ))
                                    }
                                </select>
                                <select name="" id="district" onChange={(e) => handleDistrict(e)} >
                                    <option value="-1">Quận/Huyện</option>
                                    {
                                        districts?.map((getdis, index) => (
                                            <option key={index} value={getdis.code}>{getdis.name}</option>
                                        ))
                                    }
                                </select>
                                <select name="" id="ward" onChange={(e) => handleWard(e)}>
                                    <option value="-1">Phường/Xã</option>
                                    {
                                        wards?.map((getward, index) => (
                                            <option key={index} value={getward.code}>{getward.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <input type="text" placeholder="Địa chỉ" required />
                            <textarea placeholder="Ghi chú" rows="4"></textarea>
                        </form>
                    </div>
                </div>
                <div className="container-ship-right">
                    <div>
                        <h2>Mã giảm giá</h2>
                        <div className="voucher">
                            <input type="text" placeholder="Nhập mã giảm giá" />
                            <button>Sử dụng</button>
                        </div>
                        <hr />

                        <div className="">
                            {
                                items?.map((item) => (
                                    <p>{item.name}x{item.quantity} </p>
                                )) 
                            }
                        </div>
                        <div className="price">
                            <div className="">
                                <p>
                                    Tạm tính: <span>{Number(data).toLocaleString("vi-VN")}{" "}</span>
                                    <span className="underline">đ</span>
                                </p>
                            </div>
                            <div className="">
                                <p >Phí vận chuyển: <span>{Number(shipcost).toLocaleString("vi-VN")}{" "}</span>
                                    <span className="underline">đ</span>
                                </p>
                            </div>
                            <hr />
                            <div className="">
                                <p>
                                    Tổng: <span>{Number(data + shipcost).toLocaleString("vi-VN")}{" "}</span>
                                    <span className="underline">đ</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2>Phương thức thanh toán</h2>
                        <div className="payment-methods">
                            <div class="the-payment-method">
                                <label>
                                    <input type="radio" readonly="" name="payment-method" value="cod" onChange={(e) => setMethod(e.target.value)}/>
                                    <img class="method-icon" src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-cod.svg" width="32" height="32" alt="icon" />
                                    <span>Thanh toán tiền mặt khi nhận hàng</span>
                                </label>
                            </div>
                            <div class="the-payment-method">
                                <label>
                                    <input type="radio" readonly="" name="payment-method" value="momo" onChange={(e) => setMethod(e.target.value)} />
                                    <img class="method-icon" src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-momo.svg" width="32" height="32" alt="icon" />
                                    <span>Thanh toán bằng ví MOMO</span>
                                </label>
                            </div>
                            <div class="the-payment-method">
                                <label>
                                    <input type="radio" readonly="" name="payment-method" value="vnpay" onChange={(e) => setMethod(e.target.value)} />
                                    <img class="method-icon" src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-vnpay.png" width="32" height="32" alt="icon" />
                                    <span>Thanh toán bằng ví VNPay</span>
                                </label>
                            </div>
                            <div class="the-payment-method">
                                <label>
                                    <input type="radio" readonly="" name="payment-method" value="atm" onChange={(e) => setMethod(e.target.value)} />
                                    <img class="method-icon" src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-atm.svg" width="32" height="32" alt="icon" />
                                    <span>Thẻ ATM nội địa/ Internet Banking</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <button type="submit" name="submit" className="btn-Submit"
              onClick={(e) => handleCreate(e)}>Tiếp tục</button>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
export default ShipAddress;