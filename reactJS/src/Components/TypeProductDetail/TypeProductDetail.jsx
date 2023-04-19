import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useParams } from 'react-router-dom';
import { FakeData } from "../fakedata";
import ContainerItem from '../ContainerItem';
import "./TypeProductDetail.css"
import Header from "../HeaderFolder/Header";
import Footer from "../FooterFolder/Footer";
function TypeProductDetail() {
    const { typedetailID } = useParams();
    var typedetail = FakeData[3].find(
        function (item) {
            return item.matd === typedetailID
        }
    );
    return (
        <div className="type-product-container">
            <Header/>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item href="/Products">Sản phẩm</Breadcrumb.Item>
                <Breadcrumb.Item active>{typedetail.name}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="list-product-typedetail">
                {FakeData[0].map((item) => item.matd === typedetail.matd
                    &&
                    <ContainerItem price={item.price} name={item.name} image={item.image} masp={item.masp} />
                )}
            </div>
            <Footer/>
        </div>
    );
}
export default TypeProductDetail;