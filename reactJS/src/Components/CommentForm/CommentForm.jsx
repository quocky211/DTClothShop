import React, { useState, useEffect } from "react";
import {
  Form,
  FormControl,
  Button,
  Card,
  ListGroup,
  Alert,
  Container,
  Col,
  Row,
} from "react-bootstrap";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTextArea,
  MDBTypography,
} from "mdb-react-ui-kit";
import "./CommentForm.css";
import "@fortawesome/fontawesome-free/css/all.css";
import UserDataService from "../../services/users";
import ProductDataService from "../../services/products";
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

//Dữ liệu fake
// const commentsFakeData = [
//   { name: "Minh Đại", comment: "Sản phẩm ok đó!", rating: 4 },
//   { name: "Chanh Chanh", comment: "Quá chất lượng!", rating: 5 },
// ];

//Kiểm tra trạng thái đăng nhập
const tokens = JSON.parse(localStorage.getItem("JWT"));

//Lấy thông tin người dùng đã đăng nhập
const user = JSON.parse(localStorage.getItem("user"));

const renderRatingStars = (rating) => {
  const stars = [];

  for (let i = 0; i < rating; i++) {
    stars.push(
      <span key={i} className="fas fa-star" style={{ color: "yellow" }}></span>
    );
  }

  for (let i = rating; i < 5; i++) {
    stars.push(<span key={i} className="fas fa-star"></span>);
  }

  return stars;
};

const CommentForm = ({ onCommentSubmit, productId }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [success, setSuccess] = useState("");

  // useEffect(() => {
  //   setComment("");
  //   setRating(0);
  //   if(success != "") 
  //     setSuccess("");
  // }, [success]);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCommentSubmit({ comment, rating });
    var data = {
      star: rating,
      message: comment,
    };

    UserDataService.createComment(productId, user._id, data)
      .then(res => {
        console.log(res.data);
      })
      .catch(e =>{
        console.log(e);
      });

    //Chữa cháy bằng cách này thôi
    setComment("");
    setRating(0);
  };

  return (
    // <Form onSubmit={handleSubmit}>
    //   <Form.Group>
    //     <Form.Label>Tên:</Form.Label>
    //     <FormControl
    //       type="text"
    //       value={name}
    //       onChange={(e) => setName(e.target.value)}
    //       required
    //     />
    //   </Form.Group>
    //   <Form.Group>
    //     <Form.Label>Bình luận:</Form.Label>
    //     <FormControl
    //       as="textarea"
    //       value={comment}
    //       onChange={(e) => setComment(e.target.value)}
    //       required
    //     />
    //   </Form.Group>
    //   <Form.Group>
    //     <Form.Label>Đánh giá:</Form.Label>
    //     <div>
    //       {[1, 2, 3, 4, 5].map((value) => (
    //         <span
    //           key={value}
    //           onClick={() => handleRatingChange(value)}
    //           style={{ cursor: 'pointer', color: value <= rating ? 'gold' : 'gray' }}
    //         >
    //           &#9733;
    //         </span>
    //       ))}
    //     </div>
    //   </Form.Group>
    //   <Button type="submit">Gửi</Button>
    // </Form>
    <section className="vh-80" style={{ backgroundColor: "#ffff" }}>
      <Form onSubmit={handleSubmit}>
        <MDBContainer className="py-5" style={{ maxWidth: "1000px" }}>
          <MDBRow className="justify-content-center">
            <MDBCol md="10" lg="8" xl="6">
              <MDBCard>
                <MDBCardBody className="p-4">
                  <div className="d-flex flex-start w-100">
                    <MDBCardImage
                      className="rounded-circle shadow-1-strong me-3"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(21).webp"
                      alt="avatar"
                      width="65"
                      height="65"
                    />
                    <div className="w-100">
                      <MDBTypography tag="h5">Viết bình luận</MDBTypography>
                      <div>
                        {[1, 2, 3, 4, 5].map((value) => (
                          <span
                            key={value}
                            onClick={() => handleRatingChange(value)}
                            style={{
                              cursor: "pointer",
                              color: value <= rating ? "gold" : "gray",
                              fontSize: "25px",
                            }}
                          >
                            &#9733;
                          </span>
                        ))}
                        {/* <a href="">
                            <MDBIcon far icon="star text-danger me-1" />
                            <MDBIcon far icon="star text-danger me-1" />
                            <MDBIcon far icon="star text-danger me-1" />
                            <MDBIcon far icon="star text-danger me-1" />
                            <MDBIcon far icon="star text-danger me-1" />
                          </a> */}
                      </div>
                      <MDBTextArea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Bạn cảm thấy sản phẩm thế nào?"
                        rows={4}
                        required
                      />
                      <div className="float-right mt-3">
                        <Button type="submit" variant="info">
                          Gửi
                        </Button>
                      </div>
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </Form>
    </section>
  );
};

const CommentList = ({ comments, productId }) => {
  return (
    // <Card>
    //   <Card.Body>
    //     <Card.Title>Bình luận</Card.Title>
    //     <ListGroup variant="flush">
    //       {comments.map((comment, index) => (
    //         <ListGroup.Item key={index}>
    //           <h5>{comment.name}</h5>
    //           <p>{comment.comment}</p>
    //           <p>Đánh giá: {comment.rating}/5</p>
    //         </ListGroup.Item>
    //       ))}
    //     </ListGroup>
    //   </Card.Body>
    // </Card>
    <section style={{ backgroundColor: "#f7f6f6" }}>
      <MDBContainer className="py-5 text-dark" style={{ maxWidth: "1000px" }}>
        <MDBRow className="justify-content-center">
          <MDBCol md="12" lg="10" xl="8">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <MDBTypography tag="h4" className="text-dark mb-0">
                Các bình luận
              </MDBTypography>
            </div>

            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <MDBCard className="mb-3">
                  <MDBCardBody>
                    <div className="d-flex flex-start">
                      <MDBCardImage
                        className="rounded-circle shadow-1-strong me-3"
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(21).webp"
                        alt="avatar"
                        width="40"
                        height="40"
                      />

                      <div className="w-100">
                        <div className="d-flex justify-content-between align-items-center mb-0">
                          <MDBTypography
                            tag="h6"
                            className="text-primary fw-bold mb-0"
                          >
                            &nbsp;&nbsp;{comment.user_id.name}&nbsp;
                            <span className="text-dark ms-2">
                              {comment.message}
                            </span>
                          </MDBTypography>
                          <p className="mb-0">{formatDistanceToNow(new Date(comment.createdAt), { locale: vi })} trước</p>
                        </div>
                        <div className="d-flex align-items-center starRating">
                          &nbsp;&nbsp;{renderRatingStars(comment.star)}
                        </div>
                        {user != null && comment.user_id._id == user._id && (
                          <div className="d-flex justify-content-between align-items-center">
                            <p className="small mb-0" style={{ color: "#aaa" }}>
                              <a href="" className="link-grey">
                                Xoá
                              </a>
                              &nbsp;•&nbsp;
                              <a href="" className="link-grey">
                                Chỉnh sửa
                              </a>
                            </p>
                            {/* <div className="d-flex flex-row">
                              <MDBIcon fas icon="star text-warning me-2" />
                              <MDBIcon
                                far
                                icon="check-circle"
                                style={{ color: "#aaa" }}
                              />
                            </div> */}
                          </div>
                        )}
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              ))
            ) : (
              <Container>
                <Row className="justify-content-center">
                  <Col lg={8} md={7} xs={10} className="notify">
                    <Alert variant="primary" style={{ marginTop: '20px', marginBottom: '0' }}>
                      Sản phẩm chưa được đánh giá.
                    </Alert>
                  </Col>
                </Row>
              </Container>
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

const CommentAndComentList = (props) => {
  const [comments, setComments] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  //Thua kèo này t bày keo khác, hừm
  

  useEffect(() => {
    retrieveComments();
  });

  // useEffect(() => {
  //   if(status){
  //     setSubmitted(true);
  //   }
  //   else{
  //     setSubmitted(false);
  //   }
  // }, [status]);

  const retrieveComments = () => {
    ProductDataService.getCommentsByProductId(props.productId)
      .then((res) => {
        console.log(res.data);
        setComments(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleCommentSubmit = (comment) => {
    console.log(comment);
    // status = true // Cập nhật comments với comment mới
  };

  return (
    <div>
      <hr />
      <h3>Đánh giá</h3>
      <span>&nbsp;</span>
      <Container>
        <Row className="justify-content-center">
          {tokens == null && (
            <Col lg={6} md={10} xs={9} className="notify">
              <Alert variant="warning">
                Vui lòng đăng nhập để để lại đánh giá của bạn.
              </Alert>
            </Col>
          )}
        </Row>
        {tokens != null && (
          <CommentForm
            onCommentSubmit={handleCommentSubmit}
            productId={props.productId}
          />
        )}
      </Container>
      <br />
      <CommentList comments={comments} productId={props.productId} />
    </div>
  );
};

export default CommentAndComentList;
