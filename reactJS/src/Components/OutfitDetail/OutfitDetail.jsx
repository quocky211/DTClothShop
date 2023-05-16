import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link, useParams } from "react-router-dom";
import "./OutfitDetail.css";
import Header from "../HeaderFolder/Header";
import Footer from "../FooterFolder/Footer";
import OutfitDataService from "../../services/outfits";
import { useState, useEffect } from "react";

function OutfitDetail() {
  const { outfitID } = useParams();
  const [outfit, setOutfit] = useState([]);
  const [outfitDetail, setOutfitDetail] = useState([]);

  useEffect(() => {
    getOutfitById();
    getOutfitDetail();
  }, []);

  const getOutfitById = () => {
    OutfitDataService.getOutfitById(outfitID)
      .then((res) => {
        setOutfit(res.data[0]);
      })
      .catch((err) => console.log(err));
  };

  const getOutfitDetail = () => {
    OutfitDataService.getOutfitDetails(outfitID)
      .then((res) => {
        console.log(res.data);
        setOutfitDetail(res.data);
      })
      .catch((err) => console.log(err));
  };

  var vnd = Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <div className="outfit-detail-container">
      <Header />
      <Breadcrumb>
        <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item href="/Outfits">Bộ phối</Breadcrumb.Item>
        <Breadcrumb.Item active>{outfit.name}</Breadcrumb.Item>
      </Breadcrumb>
      <div className="outfit-detail">
        <div className="outfit-detail-left">
          <img src={"../imgs/" + outfit.image} alt={outfit.name} />
        </div>
        <div className="outfit-detail-right">
          <h2>{outfit.name}</h2>
          <p>{outfit.description}</p>
          <div className="list-product">
            {outfitDetail.map((item) => (
              <div className="list-product-item">
                <div className="product-item-img">
                  <img src={"../imgs/" + item.productDetail[0].path} alt={item.product_id.name} />
                </div>
                <div className="product-item-infor">
                  <h4>{item.product_id.name}</h4>
                  <h4>{vnd.format(item.product_id.price)}</h4>
                  <Link to={"/Products/" + item.product_id._id} state={{image: item.productDetail[0].path}}>
                    <button>Xem chi tiết</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="add_all_to_cart">
        <button>Thêm tất cả vào giỏ hàng</button>
      </div>
      <Footer />
    </div>
  );
}

export default OutfitDetail;
