import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link, useParams } from "react-router-dom";
import "./OutfitDetail.css";
import Header from "../HeaderFolder/Header";
import Footer from "../FooterFolder/Footer";
import OutfitDataService from "../../services/outfits";
import { useState, useEffect } from "react";
import React from "react";

const MessengerComponent = React.lazy(() =>
    import("../MessengerComponent/MessengerComponent")
);

function OutfitDetail() {
  const { outfitID } = useParams();
  const [outfit, setOutfit] = useState([]);
  const [outfitDetail, setOutfitDetail] = useState([]);

  const [colorArr, setColorArr] = useState([]);
  const [sizeArrs, setSizeArrs] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [sizeProduct, setSizeProduct] = useState("");

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
        setOutfitDetail(res.data);
        const data = res.data;
        var productDetails = data.map((item) => item.productDetail);
        setProductDetails(productDetails);
        // arr color
        var colorArr = productDetails.map(function (item) {
          var colorArrs = item.map((details) => details.color);
          return colorArrs.filter(
            (item, index) => colorArrs.indexOf(item) === index
          );
        });
        setColorArr(colorArr);
        // size
        var sizeArrs = productDetails.map(function (item, index1) {
          var color = colorArr[index1];
          const initialValue = [];
          const pushArr = (boTichLuy, phanTuHienTai) => {
            var productdl = item.filter((item1)=>item1.color === phanTuHienTai);
            var size = productdl.map((item2)=>item2.size)
            boTichLuy.push(size)
            return boTichLuy
          };
          var sizeArr = color.reduce(pushArr, initialValue);
          return sizeArr;
        });
        setSizeArrs(sizeArrs);
      })
      .catch((err) => console.log(err));
  };

  var vnd = Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const handleColor = (color, index) => {
    // var sizeArr = productDetails[index].filter((item) => item.color === color);
    // console.log(sizeArr);
    // setSizeArr(sizeArr);
    //change image
    // setPath(imageArr[index]);
  };
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
          <img src={outfit.image} alt={outfit.name} />
        </div>
        <div className="outfit-detail-right">
          <h2>{outfit.name}</h2>
          <p>{outfit.description}</p>
          <div className="list-product">
            {outfitDetail.map((item, index) => (
              <div className="list-product-item">
                <div className="product-item-img">
                  <img
                    src={item.productDetail[0].path}
                    alt={item.product_id.name}
                  />
                </div>
                <div className="product-item-infor">
                  <h4>{item.product_id.name}</h4>
                  <h4>{vnd.format(item.product_id.price)}</h4>
                  <Link
                    to={"/Products/" + item.product_id._id}
                    state={{ image: item.productDetail[0].path }}
                  >
                    <button>Xem chi tiết</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <MessengerComponent/>
      <Footer />
    </div>
  );
}

export default OutfitDetail;
