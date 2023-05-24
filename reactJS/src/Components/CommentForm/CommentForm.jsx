import React, { useState } from 'react';
import { Form, FormControl, Button, Card, ListGroup } from 'react-bootstrap';
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
import './CommentForm.css';
import { Hidden } from '@mui/material';

const CommentForm = ({ onCommentSubmit }) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCommentSubmit({ comment, rating });
    // setName('');
    setComment('');
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
                                    style={{ cursor: 'pointer', color: value <= rating ? 'gold' : 'gray', fontSize: '25px' }}
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
                        <MDBTextArea value={comment} onChange={(e) => setComment(e.target.  value)} label="Bạn cảm thấy sản phẩm thế nào?" rows={4} required/>
                        <div className="float-right mt-3">
                          <Button type="submit" variant="info">Gửi</Button>
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

const CommentList = ({ comments }) => {
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
              {/* <MDBCard>
                <MDBCardBody className="p-2 d-flex align-items-center">
                  <MDBTypography
                    tag="h6"
                    className="text-primary fw-bold small mb-0 me-1"
                  >
                    Comments "ON"
                  </MDBTypography>
                  <MDBSwitch defaultChecked id="flexSwitchCheckChecked" />
                </MDBCardBody>
              </MDBCard> */}
            </div>

            <MDBCard className="mb-3">
              <MDBCardBody>
                <div className="d-flex flex-start">
                  <MDBCardImage
                    className="rounded-circle shadow-1-strong me-3"
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(26).webp"
                    alt="avatar"
                    width="40"
                    height="40"
                  />

                  <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <MDBTypography
                        tag="h6"
                        className="text-primary fw-bold mb-0"
                      >
                        &nbsp;&nbsp;Lý Ca&nbsp;
                        <span className="text-dark ms-2">
                          Quá chất lượng
                        </span>
                      </MDBTypography>
                      <p className="mb-0">2 ngày trước</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="small mb-0" style={{ color: "#aaa" }}>
                        <a href="#!" className="link-grey">
                          Remove
                        </a>{" "}
                        •
                        <a href="#!" className="link-grey">
                          Reply
                        </a>{" "}
                        •
                        <a href="#!" className="link-grey">
                          Translate
                        </a>
                      </p>
                      <div className="d-flex flex-row">
                        <MDBIcon fas icon="star text-warning me-2" />
                        <MDBIcon
                          far
                          icon="check-circle"
                          style={{ color: "#aaa" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>

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
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <MDBTypography
                        tag="h6"
                        className="text-primary fw-bold mb-0"
                      >
                        &nbsp;&nbsp;Chanh Chanh&nbsp;
                        <span className="text-dark ms-2">
                          Sản phẩm ok nha
                        </span>
                      </MDBTypography>
                      <p className="mb-0">3 ngày trước</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="small mb-0" style={{ color: "#aaa" }}>
                        <a href="#!" className="link-grey">
                          Remove
                        </a>{" "}
                        •
                        <a href="#!" className="link-grey">
                          Reply
                        </a>{" "}
                        •
                        <a href="#!" className="link-grey">
                          Translate
                        </a>
                      </p>
                      <div className="d-flex flex-row">
                        <MDBIcon
                          far
                          icon="check-circle text-primary"
                          style={{ color: "#aaa" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

const CommentAndComentList = () => {
  const [comments, setComments] = useState([]);

  const handleCommentSubmit = (comment) => {
    setComments([...comments, comment]);
  };

  return (
    <div>
        <hr/>
        <h3>Đánh giá</h3>
        <CommentForm onCommentSubmit={handleCommentSubmit} />
        <CommentList comments={comments} />
    </div>
  );
};

export default CommentAndComentList;