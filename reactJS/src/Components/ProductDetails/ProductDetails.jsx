import { Link, useParams } from "react-router-dom";
import "./ProductDetails.css";
import { connect } from "react-redux";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Accordion from "react-bootstrap/Accordion";
import size from "../Images/size.jpg";
import Slider from "react-slick";
import ContainerItem from "../ContainerItem";
import CommentAndComentList from "../CommentForm/CommentForm";
import Header from "../HeaderFolder/Header";
import Footer from "../FooterFolder/Footer";
import React, { useEffect, useState } from "react";
import ProductDataService from "../../services/products";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlide";

const Alert = React.forwardRef(function Alert(props, ref) {
  return (
    <MuiAlert
      elevation={6}
      ref={ref}
      variant="filled"
      {...props}
    />
  );
});

export function ProductDetails(props) {
  const location = useLocation();
  const { productID } = useParams();
  const [product1, setProduct1] = useState([]);
  const [productDetail, setProductDetail] = useState([]);

  const [relatedProdutcs, setRelatedProducts] = useState([]);

  const [colorArr, setColorArr] = useState([]);
  const [imageArr, setImageArr] = useState([]);
  const [firsSizes, setFirsSizes] = useState([]);
  const [sizeArr, setSizeArr] = useState([]);
  //location.state.image
  const [path, setPath] = useState(location.state.image);

  const [colorProduct, setColorProduct] = useState("");
  const [sizeProduct, setSizeProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [favoriteProduct, setFavoratiProduct] = useState(false);
  const [alert, setAlert] = useState({
    severity: "success",
    message: "",
  });
  const [id, setID] = useState(0);
  const [open, setOpen] = React.useState(false);

  const [qty, setQty] = useState();
  const [qtyArr, setQtyArr] = useState([]);

  const dispatch = useDispatch();
  const handleAddToCart = ({
    _id,
    name,
    image,
    price,
    color,
    size,
    quantity,
    stock,
  }) => {
    setAlert({
      message: "Thêm vào giỏ hàng thành công",
    });
    handleClose();
    handleClick();
    dispatch(
      addToCart({ _id, name, image, price, color, size, quantity, stock })
    );
  };
  // for change image when press related product
  useEffect(() => {
    setPath(location.state.image);
  }, [location.state.image]);

  useEffect(() => {
    getProduct(productID);
    getProductDetail(productID);
    getProductsByDetail(id);
    getProductFavoriteByID(productID);
  }, [product1]);

  const getProduct = (productID) => {
    ProductDataService.getProductById(productID)
      .then((res) => {
        setProduct1(res.data[0].product);
        setID(res.data[0].product.category_detail_id);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getProductDetail = (productID) => {
    ProductDataService.getProductDetail(productID)
      .then((res) => {
        const data = res.data;
        let qtyArrs = data.map((item) => item.qty); // tạo mảng lưu tất cả qty
        let qtyArr = qtyArrs.filter(
          (item, index) => qtyArrs.indexOf(item) === index
        );
        setQtyArr(qtyArr); // lưu mảng qty
        var colotArrs = data.map((item) => item.color);
        var colorArr = colotArrs.filter(
          (item, index) => colotArrs.indexOf(item) === index
        );
        setColorArr(colorArr);
        // imgae
        var imageArrs = data.map((item) => item.path);
        var imageArr = imageArrs.filter(
          (item, index) => imageArrs.indexOf(item) === index
        );
        setImageArr(imageArr);
        // để hiển thị lần đầu truy cập
        var firsSizes = data.filter((item) => item.color === data[0].color);
        setFirsSizes(firsSizes);
        setProductDetail(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getProductFavoriteByID = (productID) => {
    const emailUser = window.localStorage.getItem("Email");
    if (emailUser == null) {
      setFavoratiProduct(false);
    } else {
      ProductDataService.getFavoriteProductById(emailUser, productID)
        .then((res) => {
          //console.log(res);
          if (res.data != null) setFavoratiProduct(true);
          else setFavoratiProduct(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  function getProductsByDetail(typeDetailID) {
    ProductDataService.getProductsByTypeDetailId(typeDetailID)
      .then((res) => {
        setRelatedProducts(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  // Get size by color
  const handleColor = (color, index) => {
    setColorProduct(color);
    var sizeArr = productDetail.filter((item) => item.color === color);
    setSizeArr(sizeArr);
    //change image
    setPath(imageArr[index]);
    setQty(qtyArr[index]); // lưu qty của product detail
  };

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
  const handleClick = () => {
    setTimeout(() => {
      setOpen(true);
    }, 100);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleFavorateProduct = () => {
    const emailUser = window.localStorage.getItem("Email");
    if (emailUser == null) {
      window.location.href = "/Login";
    } else {
      const product_favorite = {
        email: emailUser,
        product_id: productID,
        path: location.state.image,
      };

      if (!favoriteProduct) {
        ProductDataService.addFavoriteProduct(product_favorite)
          .then((response) => {
            setAlert({
              severity: response.data.severity,
              message: response.data.message,
            });
            setFavoratiProduct(!favoriteProduct);
          })
          .catch((error) => {
            setAlert({
              severity: error.data.severity,
              message: error.data.message,
            });
          });
      } else {
        ProductDataService.deleteFavoriteProduct(product_favorite)
          .then((response) => {
            setAlert({
              severity: response.data.severity,
              message: response.data.message,
            });
            setFavoratiProduct(!favoriteProduct);
          })
          .catch((error) => {
            setAlert({
              severity: error.data.severity,
              message: error.data.message,
            });
          });
      }

      handleClose();
      handleClick();
    }
  };
  const handleDecreaseQuantity = (quantity) => {
    quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1);
  };

  const handleIncreaseQuantity = (quantity) => {
    quantity < qty ? setQuantity(quantity + 1) : setQuantity(qty);
  };
  // Move to top
  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    window.location.reload();
  };
  return (
    <div className="product-detail-container">
      <Snackbar
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
      <Header />
      <Breadcrumb>
        <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item href="/Products">Sản phẩm</Breadcrumb.Item>
        <Breadcrumb.Item active>{product1.name} </Breadcrumb.Item>
      </Breadcrumb>
      <div className="product-detail">
        <div className="product-detail-left">
          <img
            src={path}
            alt="img"
          />
        </div>
        <div className="product-detail-right">
          <h2>{product1.name}</h2>
          <h2>{vnd.format(product1.price)} </h2>
          <div className="color">
            {colorArr.map((color, index) => (
              <button
                onClick={() => handleColor(color, index)}
                style={{
                  backgroundColor: color,
                  border: " 1px solid black",
                }}
              ></button>
            ))}
          </div>
          <div className="size">
            {sizeArr.map((size) => (
              <button
                onClick={() => setSizeProduct(size.size)}
                style={{
                  backgroundColor: sizeProduct === size && "antiquewhite",
                }}
              >
                {size.size}
              </button>
            ))}
          </div>

          <div className="quantity-product">
            <p className="quantityMargin">Số lượng</p>
            <button
              className="add margin"
              onClick={() => handleDecreaseQuantity(quantity)}
            >
              -
            </button>
            {/* <input
              value={quantityProduct}
              className="quantity"
              type="number"
              name=""
              id=""
            /> */}
            <div className="quantity">{quantity}</div>
            <button
              className="add"
              onClick={() => handleIncreaseQuantity(quantity)}
            >
              +
            </button>
          </div>
          <div className="addcart">
            <button
              onClick={() => {
                handleAddToCart({
                  _id: product1._id,
                  name: product1.name,
                  image: path,
                  price: product1.price,
                  color: colorProduct,
                  size: sizeProduct,
                  quantity,
                  stock: qty,
                });
              }}
            >
              Thêm vào giỏ hàng
            </button>
            <div
              className="like-icon"
              onClick={handleFavorateProduct}
            >
              {favoriteProduct ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="favorite-icon"
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="favorite-icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              )}
            </div>
          </div>
          <hr />
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Thông tin sản phẩm</Accordion.Header>
              <Accordion.Body>{product1.description}</Accordion.Body>
            </Accordion.Item>
            <hr />
            <Accordion.Item eventKey="1">
              <Accordion.Header>Bảng size</Accordion.Header>
              <Accordion.Body>
                <p>
                  Sản phẩm được may theo thông số tiêu chuẩn tương đối của người
                  Việt Nam. Nếu bạn đang cân nhắc giữa hai kích cỡ, nên chọn
                  kích cỡ lớn hơn.
                </p>
                <p>
                  Kích cỡ 1: Chiều cao từ 1m50 – 1m65, cân nặng trên 55kg{" "}
                  <br></br>
                  Kích cỡ 2: Chiều cao từ 1m65 – 1m72, cân nặng dưới 65kg{" "}
                  <br></br>
                  Kích cỡ 3: Chiều cao từ 1m70 – 1m77, cân nặng dưới 80kg{" "}
                  <br></br>
                  Kích cỡ 4: Chiều cao trên 1m72, cân nặng dưới 95kg
                </p>
                <img
                  src={size}
                  alt="size"
                />
              </Accordion.Body>
            </Accordion.Item>
            <hr />
            <Accordion.Item eventKey="2">
              <Accordion.Header>Quy định đổi trả</Accordion.Header>
              <Accordion.Body>
                <p>
                  – Đối với sản phẩm áo quần, thời gian đổi hàng trong vòng 7
                  ngày kể từ ngày khách hàng nhận bưu phẩm. <br></br>– Đối với
                  sản phẩm phụ kiện (cặp sách, dép, mũ,…), thời gian đổi hàng
                  trong vòng 30 ngày kể từ ngày khách hàng nhận bưu phẩm.
                  <br></br>– Áp dụng đổi hàng với tất cả các sản phẩm và sản
                  phẩm được đổi phải còn nguyên nhãn mác, trong tình trạng chưa
                  qua sử dụng.<br></br>– Áp dụng 01 lần đổi/ 01 đơn hàng.
                  <br></br>– Với trường hợp sản phẩm bị cắt nhãn mác, trong vòng
                  1 ngày kể từ ngày nhận bưu phẩm, bạn hãy gửi phản hồi về tụi
                  mình để được giải quyết. Qua mốc thời gian 1 ngày chúng mình
                  sẽ không giải quyết đơn đổi trả.
                  <br></br>– Sản phẩm đổi phải có giá trị tương đương hoặc cao
                  hơn sản phẩm được đổi. Vui lòng thanh toán chi phí chênh lệch
                  giá trị sản phẩm nếu có.
                  <br></br>– Trường hợp hoàn lại giá trị đơn hàng, tụi mình sẽ
                  hoàn tiền trong vòng 48h làm việc sau khi nhận được yêu cầu từ
                  các bạn.<br></br>– Áp dụng với các đơn hàng trên toàn hệ thống
                  của Levents® (Website, FB & IG, TMĐT & cửa hàng).<br></br>
                  Lưu ý: <br></br>– Bạn vui lòng gửi cho chúng mình clip đóng
                  gói hàng đổi trả của bạn, nhân viên tư vấn sẽ xác nhận và tiến
                  hành lên đơn đổi trả cho bạn.<br></br>
                </p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
      <br></br>
      <hr />
      <div className="related-product">
        <h3>Có thể bạn sẽ thích</h3>
        <div
          className="non-mobile-related"
          onClick={handleTop}
        >
          <Slider {...settings}>
            {relatedProdutcs.map(function (item) {
              return (
                <ContainerItem
                  price={item.product.price}
                  name={item.product.name}
                  image={item.path}
                  masp={item.product._id}
                />
              );
            })}
          </Slider>
        </div>
        <div
          className="mobile-related"
          onClick={handleTop}
        >
          <Slider {...settingsmobile}>
            {relatedProdutcs.map((item) => (
              <ContainerItem
                price={item.product.price}
                name={item.product.name}
                image={item.path}
                masp={item.product._id}
              />
            ))}
          </Slider>
        </div>
      </div>
      <span>&nbsp;</span>
      <CommentAndComentList productId={productID} />
      <Footer />
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    // _products: state._todoProduct,
    // isLoggedin: state._todoProduct.isLoggedin,
  };
};
function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
