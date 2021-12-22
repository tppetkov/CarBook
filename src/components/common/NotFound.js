import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./notFound.scss";
const NotFound = () => {
    return (
        <Row>
            <Col md='12 text-center not-found-headings'>
                <h1>404 page not found, bro ...</h1>
                <h2>What`s worse, a hilarious 404 page can`t be found either.</h2>
            </Col>
        </Row>
    );
};

export default NotFound;
