import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from "react-router-dom";
import "./Outfits.css";
import Header from "../HeaderFolder/Header";
import Footer from "../FooterFolder/Footer";
import OutfitDataService from '../../services/outfits';
import { useState, useEffect } from 'react';


function Outfits() {

    const [outfits, setOutfits] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() =>{
        getOutfits(currentPage);
    },[currentPage])

    const getOutfits = (page) =>{
        OutfitDataService.getAllOutfit(page)
        .then((res)=>{
            setOutfits(res.data.docs);
            setTotalPage(res.data.totalPages)
        })
        .catch((err)=>console.log(err));
    }

    return (
        <div className="outfits-container">
            <Header/>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item active>Bộ phối</Breadcrumb.Item>
            </Breadcrumb>
            <div className="outfits-product">
                {  
                   outfits.map((item) =>
                    (   
                        <div className="outfits-product-detail">
                            <Link to={"/Outfits/" + item._id} >
                                <img src={"imgs/" +item.image} alt="Outfits" />
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