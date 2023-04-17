import { Link, useParams } from "react-router-dom";
import "./ProductDetails.css";
import React from "react";
import { AddCart } from "../../actions";
import { connect } from "react-redux";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { FakeData } from "../fakedata";
import Accordion from 'react-bootstrap/Accordion';
import size from "../Images/size.jpg";
import Slider from "react-slick";
import ContainerItem from "../ContainerItem";
import likeicon from "../Images/likeicon.png";


export function ProductDetails(props) {
  const { productID } = useParams();
  var product = FakeData[0].find(
    function (item) {
      return item.masp === productID;
    }
  )
  var typedetail = FakeData[3].find(
    function (item) {
      return item.matd = product.matd;
    }
  )
  var type = FakeData[3].find(
    function (item) {
      return item.matype = typedetail.matype;
    }
  )
  
  let settings = {
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  let settingsmobile = {
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
  };
  var vnd = Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return (
    <div className="product-detail-container">
      <Breadcrumb>
        <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item href="/Products">Sản phẩm</Breadcrumb.Item>
        <Breadcrumb.Item href=""> {type.name} </Breadcrumb.Item>
        <Breadcrumb.Item active>{product.name} </Breadcrumb.Item>
      </Breadcrumb>
      <div className="product-detail">
        <div className="product-detail-left">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-detail-right">
          <h2>{product.name}</h2>
          <h2>{vnd.format(product.price)}</h2>
          <p>Màu sắc</p>
          <p>Size</p>
          <div className="quantity-product">
            <p>Số lượng: </p>
            <input type="number" name="" id="" />
          </div>
          <div className="addcart">
            <button onClick={() => { props.AddCart(product) }}>
              Thêm vào giỏ hàng
            </button>
            <Link>
              <div className="like-icon">
                <img src={likeicon} alt="Like icon" />
              </div>
            </Link>
          </div>
          <hr />
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Thông tin sản phẩm</Accordion.Header>
              <Accordion.Body>
                {product.infor}
              </Accordion.Body>
            </Accordion.Item>
            <hr />
            <Accordion.Item eventKey="1">
              <Accordion.Header>Bảng size</Accordion.Header>
              <Accordion.Body>
                <p>Sản phẩm được may theo thông số tiêu chuẩn tương đối của người Việt Nam. Nếu bạn đang cân nhắc giữa hai kích cỡ, nên chọn kích cỡ lớn hơn.</p>
                <p>Kích cỡ 1: Chiều cao từ 1m50 – 1m65, cân nặng trên 55kg <br></br>
                  Kích cỡ 2: Chiều cao từ 1m65 – 1m72, cân nặng dưới 65kg <br></br>
                  Kích cỡ 3: Chiều cao từ 1m70 – 1m77, cân nặng dưới 80kg <br></br>
                  Kích cỡ 4: Chiều cao trên 1m72, cân nặng dưới 95kg</p>
                <img src={size} alt="size" />
              </Accordion.Body>
            </Accordion.Item>
            <hr />
            <Accordion.Item eventKey="2">
              <Accordion.Header>Quy định đổi trả</Accordion.Header>
              <Accordion.Body>
                <p>
                  – Đối với sản phẩm áo quần, thời gian đổi hàng trong vòng 7 ngày kể từ ngày khách hàng nhận bưu phẩm. <br></br>
                  – Đối với sản phẩm phụ kiện (cặp sách, dép, mũ,…), thời gian đổi hàng trong vòng 30 ngày kể từ ngày khách hàng nhận bưu phẩm.<br></br>
                  – Áp dụng đổi hàng với tất cả các sản phẩm và sản phẩm được đổi phải còn nguyên nhãn mác, trong tình trạng chưa qua sử dụng.<br></br>
                  – Áp dụng 01 lần đổi/ 01 đơn hàng.<br></br>
                  – Với trường hợp sản phẩm bị cắt nhãn mác, trong vòng 1 ngày kể từ ngày nhận bưu phẩm, bạn hãy gửi phản hồi về tụi mình để được giải quyết. Qua mốc thời gian 1 ngày chúng mình sẽ không giải quyết đơn đổi trả.<br></br>
                  – Sản phẩm đổi phải có giá trị tương đương hoặc cao hơn sản phẩm được đổi. Vui lòng thanh toán chi phí chênh lệch giá trị sản phẩm nếu có.<br></br>
                  – Trường hợp hoàn lại giá trị đơn hàng, tụi mình sẽ hoàn tiền trong vòng 48h làm việc sau khi nhận được yêu cầu từ các bạn.<br></br>
                  – Áp dụng với các đơn hàng trên toàn hệ thống của Levents® (Website, FB & IG, TMĐT & cửa hàng).<br></br>
                  Lưu ý: <br></br>
                  – Bạn vui lòng gửi cho chúng mình clip đóng gói hàng đổi trả của bạn, nhân viên tư vấn sẽ xác nhận và tiến hành lên đơn đổi trả cho bạn.<br></br>
                </p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
      <br></br>
      <br></br>
      <hr />
      <div className="related-product">
        <h3>Có thể bạn sẽ thích</h3>
        <div className="non-mobile-related">
        <Slider {...settings}>
          {FakeData[0].map((item) =>
            productID !== item.masp
            &&
            item.type === product.type
            &&
            <ContainerItem price={item.price} name={item.name} image={item.image} masp={item.masp} />)}
        </Slider>
        </div>
        <div className="mobile-related">
        <Slider {...settingsmobile}>
          {FakeData[0].map((item) =>
            productID !== item.masp
            &&
            item.type === product.type
            &&
            <ContainerItem price={item.price} name={item.name} image={item.image} masp={item.masp} />)}
        </Slider>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    _products: state._todoProduct,
    isLoggedin: state._todoProduct.isLoggedin,
  };
};
function mapDispatchToProps(dispatch) {
  return {
    AddCart: (item) => dispatch(AddCart(item)),
  };
}

// export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
