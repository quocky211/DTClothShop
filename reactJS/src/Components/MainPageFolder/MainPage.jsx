import "./MainPage.css";
import ContainerItem from "../ContainerItem";
import Slideshow from "../Slideshow/Slideshow";
import { useState, useEffect } from "react";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { connect } from "react-redux";
// import { Off_Noti } from '../../actions';
import imgmobile from "../Images/banner/img-mobile.png";
import Header from "../HeaderFolder/Header";
import Footer from "../FooterFolder/Footer";
import ProductDataService from "../../services/products";

function MainPage() {
  const [newProducts, setNewProducts] = useState([]);
  const [discountProducts, setDiscountProducts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    getNewProducts();
    getDiscountProducts();
    getTopProducts();
  }, []);

  function getNewProducts() {
    ProductDataService.getProductNew()
      .then((res) => setNewProducts(res.data))
      .catch((err) => console.error(err));
  }

  const getDiscountProducts = () => {
    ProductDataService.getProductDiscount()
      .then((res) => setDiscountProducts(res.data))
      .catch((err) => console.error(err));
  };

  const getTopProducts = () => {
    ProductDataService.getProductTopSelling()
      .then((res) => setTopProducts(res.data))
      .catch((err) => console.error(err));
  };

  let settings = {
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  return (
    <div className="mainPage">
      <Header />
      <Slideshow />
      <div className="img-mobile">
        <img src={imgmobile} alt="imgmobile" />
      </div>
      <div className="newProducts">
        <div className="newProducts_product product">
          <h3 className="newProducts_name title-name title-name-first">
            Sản phẩm mới
          </h3>
          <div className="non-mobile">
            <Slider {...settings}>
              {newProducts.map((item) => (
                <ContainerItem
                  price={item.product.price}
                  name={item.product.name}
                  image={item.path}
                  masp={item.product._id}
                />
              ))}
            </Slider>
          </div>
          <div className="mobile">
            {newProducts.map((item) => (
              <ContainerItem
                price={item.product.price}
                name={item.product.name}
                image={item.path}
                masp={item.product._id}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="bestSeller">
        <div className="bestSeller_product product">
          <h3 className="bestSeller_name title-name">Bán chạy</h3>
          <div className="non-mobile">
            <Slider {...settings}>
              {topProducts.map((item, index) => (
                <ContainerItem
                  price={item.product.price}
                  name={item.product.name}
                  image={item.path}
                  masp={item.product._id}
                />
              ))}
            </Slider>
          </div>
          <div className="mobile">
            {topProducts.map((item, index) => (
              <ContainerItem
                price={item.product.price}
                name={item.product.name}
                image={item.path}
                masp={item.product._id}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="onSale">
        <div className="onSale_product product">
          <h3 className="onSale_name title-name">Giảm giá</h3>
          <div className="non-mobile">
            <Slider {...settings}>
              {discountProducts.map((item) => (
                <ContainerItem
                  price={item.product.price}
                  name={item.product.name}
                  image={item.path}
                  masp={item.product._id}
                />
              ))}
            </Slider>
          </div>
          <div className="mobile">
            {discountProducts.map((item) => (
              <ContainerItem
                price={item.product.price}
                name={item.product.name}
                image={item.path}
                masp={item.product._id}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    // noti: state._todoProduct.noti
  };
};
// export default connect(mapStateToProps, { Off_Noti })(MainPage)
export default MainPage;
