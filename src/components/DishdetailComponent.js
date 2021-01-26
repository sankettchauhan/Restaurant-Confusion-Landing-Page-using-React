import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, Errors, LocalForm } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform, Fade, Stagger } from "react-animation-components";

const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

function RenderComments({ comments, postComment, dishId }) {
  if (Boolean(comments)) {
    return (
      <div>
        <h4>Comments</h4>
        <ul className="list-unstyled">
          <Stagger in>
            {comments.map((item) => {
              return (
                <Fade in>
                  <li key={item.id}>
                    <p>{item.comment}</p>
                    <p>
                      -- {item.author} , {convertDate(item.date)}
                    </p>
                  </li>
                </Fade>
              );
            })}
          </Stagger>
        </ul>
        <CommentForm postComment={postComment} dishId={dishId} />
      </div>
    );
  } else {
    return <div></div>;
  }
}

function convertDate(datetime) {
  const date = new Date(datetime);
  const day = date.toLocaleString("en-IN", { day: "2-digit" });
  const month = date.toLocaleString("en-IN", { month: "short" });
  const year = date.toLocaleString("en-IN", { year: "numeric" });
  return month + " " + day + ", " + year;
}

function RenderDish({ dish }) {
  if (dish != null) {
    return (
      <FadeTransform
        in
        transformProp={{ exitTransform: "scale(0.5) translateY(-50%)" }}
      >
        <Card>
          <CardImg top src={baseUrl + dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
    );
  } else {
    return <div />;
  }
}

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCommentModalOpen: false,
    };
    this.toggleCommentModal = this.toggleCommentModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  toggleCommentModal() {
    this.setState({
      isCommentModalOpen: !this.state.isCommentModalOpen,
    });
  }
  handleSubmit(val) {
    this.toggleCommentModal();
    this.props.postComment(
      this.props.dishId,
      val.rating,
      val.author,
      val.comment
    );
  }
  render() {
    return (
      <>
        <Modal
          toggle={this.toggleCommentModal}
          isOpen={this.state.isCommentModalOpen}
        >
          <ModalHeader toggle={this.toggleCommentModal}>
            Submit Comment
          </ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(val) => this.handleSubmit(val)}>
              <div className="container">
                <Row className="form-group">
                  <Label htmlFor="rating">Rating</Label>
                  <Control.select
                    model=".rating"
                    id="rating"
                    className="form-control"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="author">Your Name</Label>
                  <Control.text
                    id="author"
                    className="form-control"
                    model=".author"
                    placeholder="Your name"
                    validators={{
                      maxLength: maxLength(15),
                      minLength: minLength(3),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    messages={{
                      minLength:
                        "The name should be at least 3 characters long",
                      maxLength: "The name should not exceed 15 characters",
                    }}
                    show="touched"
                  />
                </Row>
                <Row className="form-group">
                  <Label htmlFor="comment">Comment</Label>
                  <Control.textarea
                    id="comment"
                    model=".comment"
                    rows="6"
                    className="form-control"
                  />
                </Row>
                <Row className="form-group">
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Row>
              </div>
            </LocalForm>
          </ModalBody>
        </Modal>
        <Button outline color="dark" onClick={this.toggleCommentModal}>
          <i className="fa fa-pencil"></i>Submit Comment
        </Button>
      </>
    );
  }
}

const DishDetail = ({ dish, comments, postComment, isLoading, errMess }) => {
  if (isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{errMess}</h4>
        </div>
      </div>
    );
  } else if (dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb className="mt-2">
            <BreadcrumbItem>
              <Link to="/home">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments
              comments={comments}
              postComment={postComment}
              dishId={dish.id}
            />
          </div>
        </div>
      </div>
    );
  }
  return <div></div>;
};

export default DishDetail;
