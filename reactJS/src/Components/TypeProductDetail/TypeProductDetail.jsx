import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useParams } from 'react-router-dom';
import ContainerItem from '../ContainerItem';
import "./TypeProductDetail.css"
import Header from "../HeaderFolder/Header";
import Footer from "../FooterFolder/Footer";
import ProductDataService from "../../services/products";
import ao from "../Images/fakedata/ao1.jpg";
import { useState, useEffect } from "react";


function TypeProductDetail() {

    const { typedetailID } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts(typedetailID);

    }, [typedetailID]);

    const getProducts = (typedetailID) =>{
        ProductDataService.getProductsByTypeDetailId(typedetailID)
        .then(res => setProducts( res.data))
        .catch(err => console.error(err))
    };
    return (
        <div className="type-product-container">
            <Header/>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item href="/Products">Sản phẩm</Breadcrumb.Item>
                {/* <Breadcrumb.Item active>{typedetail.name}</Breadcrumb.Item> */}
            </Breadcrumb>
            <div className="list-product-typedetail">
                {products.map((item) => 
                    <ContainerItem price={item.price} name={item.name} image={ao} masp={item._id} />
                )}
            </div>
            <Footer/>
        </div>
    );
}
export default TypeProductDetail;