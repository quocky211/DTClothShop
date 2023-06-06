import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import "./Outfits.css";
import Header from "../HeaderFolder/Header";
import Footer from "../FooterFolder/Footer";
import OutfitDataService from "../../services/outfits";
import { useState, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import React from "react";

const MessengerComponent = React.lazy(() =>
    import("../MessengerComponent/MessengerComponent")
);

function Outfits() {
  const [outfits, setOutfits] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getOutfits(currentPage);
  }, [currentPage]);

  const getOutfits = (page) => {
    OutfitDataService.getAllOutfit(page)
      .then((res) => {
        console.log(res.data.docs);
        setOutfits(res.data.docs);
        setTotalPage(res.data.totalPages);
      })
      .catch((err) => console.log(err));
  };

  const handleCurrPage = (event, number) => {
    setCurrentPage(number);
  };

  let items = [];
  for (let number = 1; number <= totalPage; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={(e) => handleCurrPage(e, number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  return (
    <div className="outfits-container">
      <Header />
      <Breadcrumb>
        <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item active>Bộ phối</Breadcrumb.Item>
      </Breadcrumb>
      <div className="outfits-product">
        {outfits.map((item) => (
          <div className="outfits-product-detail">
            <Link to={"/Outfits/" + item._id}>
              <img src={item.image} alt="Outfits" />
              <p>{item.name}</p>
            </Link>
          </div>
        ))}
      </div>
      <div className="page">
        <Pagination>{items}</Pagination>
      </div>
      <MessengerComponent/>
      <Footer />
    </div>
  );
}

export default Outfits;
