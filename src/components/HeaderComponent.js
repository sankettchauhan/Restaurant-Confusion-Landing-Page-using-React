import React, { Component } from "react";
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
  Jumbotron,
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { NavLink } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { isNavOpen: false, isModalOpen: false };
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }
  handleLogin(event) {
    event.preventDefault();
    alert(
      "details" +
        this.username.value +
        this.password.value +
        this.remember.value
    );
    this.toggleModal();
  }
  render() {
    return (
      <>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Username"
                  innerRef={(input) => (this.username = input)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  innerRef={(input) => (this.password = input)}
                />
              </FormGroup>
              <FormGroup check>
                <Label for="remember">
                  <Input
                    type="checkbox"
                    id="remember"
                    innerRef={(input) => (this.remember = input)}
                  />
                  Remember Me?
                </Label>
              </FormGroup>
              <FormGroup>
                <Button color="primary" type="submit" value="submit">
                  Login
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
        <Navbar dark expand="md">
          <div className="container">
            <NavbarToggler onClick={this.toggleNav} />
            <NavbarBrand href="/home" className="mr-auto">
              <img
                src="assets/images/logo.png"
                height="30"
                width="41"
                alt="Ristorante Con Fusion"
              />
            </NavbarBrand>
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink className="nav-link" to="/home">
                    <span className="fa fa-home fa-lg"></span> Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/aboutus">
                    <span className="fa fa-info fa-lg"></span> About Us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/menu">
                    <span className="fa fa-list fa-lg"></span> Menu
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/contactus">
                    <span className="fa fa-address-card fa-lg"></span> Contact
                    Us
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
            <Nav navbar className="ml-auto">
              <NavItem>
                <Button outline color="primary" onClick={this.toggleModal}>
                  <i className="fa fa-sign-in fa-lg"></i>Login
                </Button>
              </NavItem>
            </Nav>
          </div>
        </Navbar>
        <Jumbotron>
          <div className="container">
            <div className="row row-header">
              <div className="col-12 col-sm-6">
                <h1>Ristorante con Fusion</h1>
                <p>
                  We take inspiration from the World's best cuisines, and create
                  a unique fusion experience. Our lipsmacking creations will
                  tickle your culinary senses!
                </p>
              </div>
            </div>
          </div>
        </Jumbotron>
      </>
    );
  }
}

export default Header;