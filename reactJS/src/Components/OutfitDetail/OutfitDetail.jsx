import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link, useParams } from "react-router-dom";
import { FakeData } from "../fakedata";
import "./OutfitDetail.css";
import Header from "../HeaderFolder/Header";
import Footer from "../FooterFolder/Footer";

function OutfitDetail()
{   
    const { outfitID } = useParams();
    var outfit = FakeData[1].find(
        function (item) {
            return item.maoutfit === outfitID;
        }
    )
    var ao = FakeData[0].find(
        function(item){
            return item.masp === outfit.maao;
        }
    )
    var quan = FakeData[0].find(
        function(item){
            return item.masp === outfit.maquan;
        }
    )
    var non = FakeData[0].find(
        function(item){
            return item.masp === outfit.manon;
        }
    )
    var vnd = Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      });

    return (
        <div className="outfit-detail-container">
            <Header/>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item href="/Outfits">Bộ phối</Breadcrumb.Item>
                <Breadcrumb.Item active>{ outfit.name }</Breadcrumb.Item>
            </Breadcrumb>
            <div className="outfit-detail">
                <div className="outfit-detail-left">
                    <img src={outfit.image} alt={outfit.name} />
                </div>
                <div className="outfit-detail-right">
                    <h2>{outfit.name}</h2>
                    <p>{outfit.content}</p>
                    <div className="list-product">
                        <div className="list-product-item">
                            <div className="product-item-img">
                                <img src={ao.image} alt={ao.name} />
                            </div>
                            <div className="product-item-infor">
                                <h4>{ao.name}</h4>
                                <h4>{vnd.format(ao.price)}</h4>
                                <Link to={"/Products/"+ ao.masp}>
                                    <button>Xem chi tiết</button>
                                </Link>
                            </div>
                        </div>
                        <hr />
                        <div className="list-product-item">
                            <div className="product-item-img">
                                 <img src={quan.image} alt={quan.name} />
                            </div>
                            <div className="product-item-infor">
                                <h4>{quan.name}</h4>
                                <h4>{vnd.format(quan.price)}</h4>
                                <Link to={"/Products/"+ quan.masp}>
                                    <button>Xem chi tiết</button>
                                </Link>
                            </div>
                        </div>
                        <hr />
                        <div className="list-product-item">
                            <div className="product-item-img">
                                <img src={non.image} alt={non.name} />
                            </div>
                            <div className="product-item-infor">
                                <h4>{non.name}</h4>
                                <h4>{vnd.format(non.price)}</h4>
                                <Link to={"/Products/"+ non.masp}>
                                    <button>Xem chi tiết</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="add_all_to_cart">
                <button>Thêm tất cả vào giỏ hàng</button>
            </div>
            <Footer/>
        </div>
    );
}

export default OutfitDetail;
