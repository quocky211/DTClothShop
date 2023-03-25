import Breadcrumb from 'react-bootstrap/Breadcrumb';

function Blogs()
{
    return (
        <div className="blog-container">
            <Breadcrumb>
                <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item active>Bài viết</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    );
}
export default Blogs;