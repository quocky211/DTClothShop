import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { FakeData } from "../fakedata";
import { Link } from "react-router-dom";
import "./Outfits.css";
import Header from "../HeaderFolder/Header";
import Footer from "../FooterFolder/Footer";
function Outfits() {
    return (
        <div className="outfits-container">
            <Header/>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item active>Bộ phối</Breadcrumb.Item>
            </Breadcrumb>
            <div className="outfits-product">
                {
                    FakeData[1].map((item, index) =>
                    (
                        <div className="outfits-product-detail">
                            <Link to={"/Outfits/" + item.maoutfit}>
                                <img src={item.image} alt="Outfits" />
                                <p>{item.name}</p>
                            </Link>
                        </div>
                    ))

                }
            </div>
            <Footer/>
        </div>
    );
}

export default Outfits;