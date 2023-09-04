import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Welcome to My React Cart System Application</h1>
          <p>This is a basic React application that manages cart state.</p>
          <Link to={'https://github.com/alexanderalkhazov/Cart-System'} target='blank'>
            <Button variant="primary">Source Code</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  )
}

export default Home
