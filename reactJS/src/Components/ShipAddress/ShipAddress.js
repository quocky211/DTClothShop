import "./ShipAddress.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Alert from "react-bootstrap/Alert";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../HeaderFolder/Header";
import Footer from "../FooterFolder/Footer";
import { momoPayment } from "../../actions/orders";
import { vnpayPayment } from "../../actions/orders";
import { getDiscount } from "../../actions/orders";
import OrderDataService from "../../services/orders";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { clearCart } from "../../redux/cartSlide";
import { useDispatch } from "react-redux";

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
    const [shipcost, setshipcost] = useState(0);
    const [method, setMethod] = useState("");
    const [phone, setPhone] = useState("");
    const [userId, setUserId] = useState(0);
    const [addressDetail, setAddressDetail] = useState("");
    const [name, setName] = useState("");
    const [note, setNote] = useState("");
    const [mail, setMail] = useState("");
    const [discount, setDiscount] = useState("");

    const dispatch = useDispatch();

    const [showFailAlert, setShowFailAlert] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const navigate = useNavigate();
    var vnd = Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });

    useEffect(() => {
        let timeout;
        if (showFailAlert) {
            timeout = setTimeout(() => {
                setShowFailAlert(false);
            }, 3000);
        }
        return () => clearTimeout(timeout);
    }, [showFailAlert]);

    useEffect(() => {
        getInforUser();
    }, []);

    const getInforUser = () => {
        const result = localStorage.getItem("user");
        if (result) {
            const user = JSON.parse(result);
            setUserId(user._id);
        } else {
            setUserId(0);
        }
    };
    useEffect(() => {
        const getProvince = async () => {
            const resProvince = await fetch(
                "https://provinces.open-api.vn/api/"
            );
            const res = await resProvince.json();
            setProvince(await res);
        };
        getProvince();
    }, []);

    const handleProvince = (event) => {
        const getProvinceId = event.target.value;
        var index = event.nativeEvent.target.selectedIndex;
        setselectedProvince(event.nativeEvent.target[index].text);
        setProvinceId(getProvinceId);
        if (event.target.value < 52) {
            setshipcost(40000);
        } else {
            setshipcost(30000);
        }
        console.log(shipcost);
    };

    useEffect(() => {
        const getDistrict = async () => {
            const resDistrict = await fetch(
                `https://provinces.open-api.vn/api/p/${provinceid}?depth=2`
            );
            const resDis = await resDistrict.json();
            setDistrict(await resDis["districts"]);
        };
        getDistrict();
    }, [provinceid]);

    const handleDistrict = (event) => {
        setDistrictId(event.target.value);
        var index = event.nativeEvent.target.selectedIndex;
        setselectedDistrict(event.nativeEvent.target[index].text);
    };

    useEffect(() => {
        const getWard = async () => {
            const resWard = await fetch(
                `https://provinces.open-api.vn/api/d/${districtid}?depth=2`
            );
            const response = await resWard.json();
            setWards(await response["wards"]);
        };
        getWard();
    }, [districtid]);

    const handleWard = (event) => {
        var index = event.nativeEvent.target.selectedIndex;
        setselectedWard(event.nativeEvent.target[index].text);
    };
    var address = `${selectedWard}, ${selectedDistrict}, ${selectedProvince}`;

    // show model
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        navigate("/", { replace: true });
    };
    const handleShow = () => setShow(true);
    // show modal 2
    const [show1, setShow1] = useState(false);

    const handleClose1 = () => {
        setShow1(false);
        navigate("/", { replace: true });
    };
    const handleShow1 = () => {
        setShow1(true);
    };
    const [nameDiscount, setNameDiscount] = useState("");
    const [percentDiscount, setPercentDiscount] = useState(0);
    const checkDiscount = async (e) => {
        e.preventDefault();
        const resDiscount = await getDiscount();
        console.log(resDiscount);
        console.log(discount);
        var count = 0;
        var percent = 0;
        var namediscount = "";
        resDiscount?.map((item) => {
            if (item.code == discount && item.is_used == false) {
                count = 1;
                percent = item.discount;
                namediscount = item.name;
            }
        });
        if (count == 0) {
            setShowFailAlert(true);
            setShowSuccessAlert(false);
            setPercentDiscount(0);
        }
        if (count == 1) {
            setShowSuccessAlert(true);
            setShowFailAlert(false);
            setPercentDiscount(percent);
            setNameDiscount(namediscount);
        }
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    // hander click
    const handleCreate = async (e) => {
        e.preventDefault();
        let newOrder = {
            user_id: userId,
            name: name,
            address: addressDetail + ", " + address,
            status: "Đang xử lý",
            gmail: mail,
            note: note,
            phone: phone,
            pay_method: method,
            total: Number(data - data * percentDiscount + shipcost),
        };
        let total = data - data * percentDiscount + shipcost;
        OrderDataService.createOrders(newOrder)
            .then(async (response) => {
                const order_id = response.data;
                items?.map((item) => {
                    console.log(item);
                    let newOrderDetail = {
                        order_id: order_id,
                        product_id: item._id,
                        name: item.name,
                        color: item.color,
                        size: item.size,
                        path: item.image,
                        amount: item.price,
                        total: item.price * item.quantity,
                        qty: item.quantity,
                    };
                    console.log(newOrderDetail);
                    OrderDataService.createOrderDetail(newOrderDetail)
                        .then()
                        .catch();
                });
                if (method == "cod") {
                    handleShow();
                }
                if (method == "momo") {
                    try {
                        const res = await momoPayment(total, order_id);
                        if (!res) {
                            return;
                        }
                        window.location.assign(res?.payUrl);
                    } catch (e) {
                        console.log(e);
                    }
                }
                if (method == "vnpay") {
                    //vnpay
                    try {
                        const res = await vnpayPayment(total, order_id);
                        if (!res) {
                            return;
                        }
                        console.log(res);
                        window.location.assign(res?.paymentUrl);
                    } catch (e) {
                        console.log(e);
                    }
                }
                if (method == "atm") {
                    handleShow1();
                }
            })
            .catch((e) => {
                alert("Thêm không thành công");
                console.log(e);
            });
    };
    //   items?.map((item) => {
    //     console.log(item.name);
    //   })
    //   function payInfoToggle() {
    //     var atm = document.getElementById("pay-atm-info");
    //     atm.classList.toggle("atm-none");
    //   }
    return (
        <div className="main-container-ship">
            <Header />
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
                            <input
                                type="text"
                                placeholder="Họ và tên"
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <div className="mail-phone">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    onChange={(e) => setMail(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Số điện thoại"
                                    onChange={(e) => setPhone(e.target.value)}
                                    pattern="[0]{1}[1-9]{1}[0-9]{8}"
                                    required
                                />
                            </div>
                            <div className="detail-address">
                                <select
                                    name=""
                                    id="province"
                                    onChange={(e) => handleProvince(e)}
                                    required
                                >
                                    <option value="-1">Tỉnh/TP</option>
                                    {provinces.map((getpro, index) => (
                                        <option key={index} value={getpro.code}>
                                            {getpro.name}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    name=""
                                    id="district"
                                    onChange={(e) => handleDistrict(e)}
                                    required
                                >
                                    <option value="-1">Quận/Huyện</option>
                                    {districts?.map((getdis, index) => (
                                        <option key={index} value={getdis.code}>
                                            {getdis.name}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    name=""
                                    id="ward"
                                    onChange={(e) => handleWard(e)}
                                    required
                                >
                                    <option value="-1">Phường/Xã</option>
                                    {wards?.map((getward, index) => (
                                        <option
                                            key={index}
                                            value={getward.code}
                                        >
                                            {getward.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <input
                                type="text"
                                placeholder="Địa chỉ"
                                onChange={(e) =>
                                    setAddressDetail(e.target.value)
                                }
                                required
                            />
                            <textarea
                                placeholder="Ghi chú"
                                rows="4"
                                onChange={(e) => setNote(e.target.value)}
                            ></textarea>
                        </form>
                    </div>
                </div>
                <div className="container-ship-right">
                    <div className="listPrice">
                        <h2>Mã giảm giá</h2>
                        <div className="voucher">
                            <input
                                type="text"
                                placeholder="Nhập mã giảm giá"
                                onChange={(e) => setDiscount(e.target.value)}
                            />
                            <button onClick={(e) => checkDiscount(e)}>
                                Sử dụng
                            </button>
                        </div>
                        {showFailAlert && (
                            <Alert
                                key="danger"
                                variant="danger"
                                onClose={() => setShowFailAlert(false)}
                            >
                                CODE không hợp lệ!
                            </Alert>
                        )}
                        {showSuccessAlert && (
                            <Alert
                                key="success"
                                variant="success"
                                onClose={() => setShowSuccessAlert(false)}
                            >
                                Đã áp dụng mã giảm giá {nameDiscount}!
                            </Alert>
                        )}

                        <hr />

                        <div className="product-checkout-list">
                            {items?.map((item) => (
                                <p>
                                    {item.name}x{item.quantity}{" "}
                                </p>
                            ))}
                        </div>
                        <div className="price">
                            <div className="">
                                <p>
                                    Tạm tính:{" "}
                                    <span>
                                        {Number(data).toLocaleString("vi-VN")} đ
                                    </span>
                                </p>
                            </div>
                            <div className="">
                                <p>
                                    Phí vận chuyển:{" "}
                                    <span>
                                        {Number(shipcost).toLocaleString(
                                            "vi-VN"
                                        )}{" "}
                                        đ
                                    </span>
                                </p>
                            </div>
                            {showSuccessAlert && (
                                <div className="">
                                    <p>
                                        Discount:{" "}
                                        <span>
                                            {Number(
                                                percentDiscount * 100
                                            ).toLocaleString("vi-VN")}
                                            {"% - "} {percentDiscount * data} đ
                                        </span>
                                    </p>
                                </div>
                            )}

                            <hr />
                            <div className="">
                                <p>
                                    Tổng:{" "}
                                    <span>
                                        {Number(
                                            data -
                                                data * percentDiscount +
                                                shipcost
                                        ).toLocaleString("vi-VN")}{" "}
                                        đ
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="choosePayment">
                        <h2>Phương thức thanh toán</h2>
                        <div className="payment-methods">
                            <div class="the-payment-method">
                                <label>
                                    <input
                                        type="radio"
                                        readonly=""
                                        name="payment-method"
                                        value="cod"
                                        onChange={(e) =>
                                            setMethod(e.target.value)
                                        }
                                    />
                                    <img
                                        class="method-icon"
                                        src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-cod.svg"
                                        width="32"
                                        height="32"
                                        alt="icon"
                                    />
                                    <span>
                                        Thanh toán tiền mặt khi nhận hàng
                                    </span>
                                </label>
                            </div>
                            <div class="the-payment-method">
                                <label>
                                    <input
                                        type="radio"
                                        readonly=""
                                        name="payment-method"
                                        value="momo"
                                        onChange={(e) =>
                                            setMethod(e.target.value)
                                        }
                                    />
                                    <img
                                        class="method-icon"
                                        src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-momo.svg"
                                        width="32"
                                        height="32"
                                        alt="icon"
                                    />
                                    <span>Thanh toán bằng ví MOMO</span>
                                </label>
                            </div>
                            <div class="the-payment-method">
                                <label>
                                    <input
                                        type="radio"
                                        readonly=""
                                        name="payment-method"
                                        value="vnpay"
                                        onChange={(e) =>
                                            setMethod(e.target.value)
                                        }
                                    />
                                    <img
                                        class="method-icon"
                                        src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-vnpay.png"
                                        width="32"
                                        height="32"
                                        alt="icon"
                                    />
                                    <span>Thanh toán bằng ví VNPay</span>
                                </label>
                            </div>
                            <div class="the-payment-method">
                                <label>
                                    <input
                                        type="radio"
                                        readonly=""
                                        name="payment-method"
                                        value="atm"
                                        onChange={(e) => {
                                            setMethod(e.target.value);
                                        }}
                                    />
                                    <img
                                        class="method-icon"
                                        src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-atm.svg"
                                        width="32"
                                        height="32"
                                        alt="icon"
                                    />
                                    <span>
                                        Thẻ ATM nội địa/ Internet Banking
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        name="submit"
                        className="btn-Submit"
                        onClick={(e) => {
                            handleCreate(e);
                            handleClearCart();
                        }}
                    >
                        Tiếp tục
                    </button>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>Đặt hàng thành công</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={show1} onHide={handleClose1}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Ngân hàng VietComBank</p>
                    <p>Số tài khoản: 10153476</p>
                    <p>Vui lòng kiểm tra thông tin trước khi chuyển khoản</p>
                    <p>
                        Sau khi nhận được tiền, nhân viên sẽ gọi điện và xác
                        nhận đơn hàng !!!
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose1}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
            <Footer />
        </div>
    );
}
export default ShipAddress;
