import { Form,Container,Nav,Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../../storage/AppContext";
import { setCurrentGroupAction } from "../../storage/actions";

export const HeaderPartial = () => {
  let location = useLocation();
  const { state, dispatch } = useAppContext();
  const handleChange = (e) => setCurrentGroupAction(dispatch,e.target.value);
  return (
    <Navbar bg="primary" expand="lg" id="HeaderNav">
      <Container>
        <Navbar.Brand href="#home">Fitness+</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Link className="nav-link" to="/">Exercícios</Link>
          {location?.pathname && location?.pathname === "/" ?
      <Form  id="form-criar-pasta">
          <select className="form-select form-select-md" value={state?.activeGroup} onChange={(e) =>handleChange(e)}>
            <option value="" key="">Todos</option>
            {state?.groups?.map(group => (<option value={group} key={group}>{group}</option>))}
            
          </select>
      </Form>
          : ''}
          <Link className="nav-link" to="minhas-pastas">Meus Alunos</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
