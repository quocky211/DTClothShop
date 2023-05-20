import Breadcrumb from 'react-bootstrap/Breadcrumb';
import  "./Blogs.css";
import Header from "../HeaderFolder/Header";
import Footer from "../FooterFolder/Footer";
import blog from "../Images/blogs.png";
import { Link } from 'react-router-dom';
function Blogs()
{
    return (
        <div className="">
            <Header/>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item active>Bài viết</Breadcrumb.Item>
            </Breadcrumb>
            <div className="blogs-container">
                <h2>Những bài viết hay về thời trang</h2>
                <div className="blogDetail">
                    <div className="blogDetailItem">
                        <div className="blogDetailImg">
                            <img src={blog} alt="img" />
                        </div>
                        <div className="blogDetailInfor">
                            <p className='blogDetailTitle'>Hàng outlet là gì? Mua hàng outlet có thực sự tốt không?</p>
                            <p className="blogDetailDes">Kiến thức thời trang hay ho </p>
                            <Link to={"/Blogs/"+1}>
                                 <button>Xem chi tiết</button>
                            </Link>
                        </div>
                    </div>
                    <div className="blogDetailItem">
                        <div className="blogDetailImg">
                            <img src={blog} alt="img" />
                        </div>
                        <div className="blogDetailInfor">
                            <p className='blogDetailTitle'>Hàng outlet là gì? Mua hàng outlet có thực sự tốt không?</p>
                            <p className="blogDetailDes">Kiến thức thời trang hay ho </p>
                            <Link to={"/Blogs/"+1}>
                                 <button>Xem chi tiết</button>
                            </Link>
                        </div>
                    </div>
                    <div className="blogDetailItem">
                        <div className="blogDetailImg">
                            <img src={blog} alt="img" />
                        </div>
                        <div className="blogDetailInfor">
                            <p className='blogDetailTitle'>Hàng outlet là gì? Mua hàng outlet có thực sự tốt không?</p>
                            <p className="blogDetailDes">Kiến thức thời trang hay ho </p>
                            <Link to={"/Blogs/"+1}>
                                 <button>Xem chi tiết</button>
                            </Link>
                        </div>
                    </div>
                    <div className="blogDetailItem">
                        <div className="blogDetailImg">
                            <img src={blog} alt="img" />
                        </div>
                        <div className="blogDetailInfor">
                            <p className='blogDetailTitle'>Hàng outlet là gì? Mua hàng outlet có thực sự tốt không?</p>
                            <p className="blogDetailDes">Kiến thức thời trang hay ho </p>
                            <Link to={"/Blogs/"+1}>
                                 <button>Xem chi tiết</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
export default Blogs;