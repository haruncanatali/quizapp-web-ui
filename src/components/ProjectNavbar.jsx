import React from "react";
import {
    Navbar,
    Container,
    Nav,
  } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

const ProjectNavbar = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken();
    navigate("/", { replace: true });
  };

    return (
        <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="/home">QuizApp Admin Yönetim Paneli</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">Anasayfa</Nav.Link>
              <Nav.Link href="/period">Dönemler</Nav.Link>
              <Nav.Link href="/literary-category">Eser Kategorileri</Nav.Link>
              <Nav.Link href="/author">Yazarlar</Nav.Link>
              <Nav.Link href="/literary">Eserler</Nav.Link>
            </Nav>
            <Nav.Link onClick={() => handleLogout()}><span className="text-white">Çıkış Yap</span></Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default ProjectNavbar