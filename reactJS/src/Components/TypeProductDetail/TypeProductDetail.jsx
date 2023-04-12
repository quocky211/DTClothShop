import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useParams } from 'react-router-dom';
import { FakeData } from "../fakedata";
import ContainerItem from '../ContainerItem';
import "./TypeProductDetail.css"

function TypeProductDetail() {
    const { typedetailID } = useParams();
    var typedetail = FakeData[3].find(
        function (item) {
            return item.matd === typedetailID
        }
    );
    return (
        <div className="type-product-container">
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
        </div>
    );
}
export default TypeProductDetail;