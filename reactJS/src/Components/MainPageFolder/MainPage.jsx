import "./MainPage.css";
import ContainerItem from "../ContainerItem";
import Slideshow from "../Slideshow/Slideshow";
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { connect } from "react-redux"
import { Off_Noti } from '../../actions';
import { FakeData } from "../fakedata";
import imgmobile from "../Images/banner/img-mobile.png"


function MainPage({ noti, Off_Noti }) {

    const [list, setlist] = useState([]);

    useEffect(() => {
        axios.get('http://demoapiiii.somee.com/api/ServiceController/GetAllSP')
            .then(res => { setlist(res.data); console.log(res.data) })
        Off_Noti()
    }, []);

    let settings = {
        arrows: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
    };
    return (
        <div className="mainPage">
            <Slideshow />
            <div className="img-mobile">
                <img src={imgmobile} alt="imgmobile" />
            </div>
            <div className="newProducts">
                <div className="newProducts_product product">
                    <h3 className="newProducts_name title-name title-name-first" >Sản phẩm mới</h3>
                    <div className="non-mobile">
                        <Slider {...settings}>
                            {FakeData[0].map((item) => (item.matd === "TD01" || item.matd === "TD02" || item.matd === "TD03" || item.matd === "TD04")
                                && <ContainerItem price={item.price} name={item.name} image={item.image} masp={item.masp} />)}
                        </Slider>
                    </div>
                    <div className="mobile">
                        {FakeData[0].map((item) => (item.matd === "TD01" || item.matd === "TD02" || item.matd === "TD03" || item.matd === "TD04")
                            && <ContainerItem price={item.price} name={item.name} image={item.image} masp={item.masp} />)}
                    </div>
                </div>
            </div>
            <div className="bestSeller">
                <div className="bestSeller_product product">
                    <h3 className="bestSeller_name title-name">Bán chạy</h3>
                    <div className="non-mobile">
                        <Slider {...settings}>
                            {FakeData[0].map((item, index) => (item.matd === "TD05" || item.matd === "TD06" || item.matd === "TD07" || item.matd === "TD08")
                                && <ContainerItem price={item.price} name={item.name} image={item.image} masp={item.masp} />)}
                        </Slider>
                    </div>
                    <div className="mobile">
                        {FakeData[0].map((item, index) => (item.matd === "TD05" || item.matd === "TD06" || item.matd === "TD07" || item.matd === "TD08")
                            && <ContainerItem price={item.price} name={item.name} image={item.image} masp={item.masp} />)}
                    </div>
                </div>
            </div>
            <div className="onSale">
                <div className="onSale_product product">
                    <h3 className="onSale_name title-name">Giảm giá</h3>
                    <div className="non-mobile">
                        <Slider {...settings}>
                            {FakeData[0].map((item, index) => (item.matd === "TD09" || item.matd === "TD010" || item.matd === "TD011" || item.matd === "TD012")
                                && <ContainerItem price={item.price} name={item.name} image={item.image} masp={item.masp} />)}
                        </Slider>
                    </div>
                    <div className="mobile">
                        {FakeData[0].map((item, index) => (item.matd === "TD09" || item.matd === "TD010" || item.matd === "TD011" || item.matd === "TD012")
                            && <ContainerItem price={item.price} name={item.name} image={item.image} masp={item.masp} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        noti: state._todoProduct.noti
    }
}
export default connect(mapStateToProps, { Off_Noti })(MainPage)


