import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Header from "../HeaderFolder/Header";
import Footer from "../FooterFolder/Footer";
function Blogs()
{
    return (
        <div className="blog-container">
            <Header/>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item active>Bài viết</Breadcrumb.Item>
            </Breadcrumb>
            <Footer/>
        </div>
    );
}
export default Blogs;