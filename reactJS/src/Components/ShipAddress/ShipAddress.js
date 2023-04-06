import "./ShipAddress.css"
import { NavLink as Link } from "react-router-dom";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function ShipAddress() {
    const location = useLocation();
    const data = location.state?.data;
    const [provinces, setProvince] = useState([]);
    const [provinceid, setProvinceId] = useState("");
    const [districts, setDistrict] = useState([]);
    const [districtid, setDistrictId] = useState("");
    const [wards, setWards] = useState([]);
    const [selectedProvince, setselectedProvince] = useState("");
    const [selectedDistrict, setselectedDistrict] = useState("");
    const [selectedWard, setselectedWard] = useState("");
    const [shipcost, setshipcost] = useState("");

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


    return (
        <div className="main-container-ship">
            <Breadcrumb>
                <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item href="/ShoppingCart">Giỏ hàng</Breadcrumb.Item>
                <Breadcrumb.Item active>Địa chỉ giao hàng</Breadcrumb.Item>
            </Breadcrumb>
            <div className="container-ship">
                <div className="container-ship-left">
                    <h2>Thông tin giao hàng</h2>
                    <div className="form-address-container">
                        <form action="/Payment" className="form-address">
                            <input type="text" placeholder="Họ và tên" required />
                            <div className="mail-phone">
                                <input type="email" placeholder="Email" />
                                <input type="text" placeholder="Số điện thoại" pattern="[0]{1}[1-9]{1}[0-9]{8}" required />
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
                            <button type="submit" name="submit" className="btn-Submit">Tiếp tục</button>
                        </form>
                    </div>
                </div>
                <div className="container-ship-right">
                    <h2>Mã giảm giá</h2>
                    <div className="voucher">
                        <input type="text" placeholder="Nhập mã giảm giá" />
                        <button>Sử dụng</button>
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
            </div>
        </div>
    );
}
export default ShipAddress;