import SearchBox from "./SearchBox";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const Home = () => {
    return (
        <Row>
            <Col md='9'>
                <h1 className='mt-5 h1'>CarBook</h1>
                <h3>
                    Calculates your car's gas mileage and helps to manage the vehicle's costs. After a free
                    registration, you will be able to use all functions, e.g. analyse costs or enter fuelings with your
                    smartphone.
                </h3>
                <SearchBox className='mt-5' />
            </Col>
            <Col md='3'>
                <Card className='mt-5 greybox'>
                    <Card.Body>
                        <Card.Title>Our database</Card.Title>
                        <div>
                            <ul>
                                <li>Total vehicles: 225</li>
                                <li>Total fuel readings: 5600</li>
                                <li>Total fuel ups: 50600</li>
                                <li>Total km: 10600</li>
                            </ul>
                        </div>
                    </Card.Body>
                </Card>
                <Card className='mt-3 greybox'>
                    <Card.Body>
                        <Card.Title>CarBook</Card.Title>
                        <div>
                            <ul>
                                <li>helps you to calculate and track your fuel economy and vehicle-related costs</li>
                                <li>contains real-world MPG data of thousands of users</li>
                                <li>
                                    reminds you of important events such as car services{" "}
                                    <span style={{ color: "tomato" }}>*New feature comming!*</span>
                                </li>
                            </ul>
                            To use these and even more functions register a user account for free.
                        </div>
                    </Card.Body>
                </Card>
                <Card className='mt-3 greybox'>
                    {/* <Card.Img variant='top' src='holder.js/100px180' /> */}
                    <Card.Body>
                        <Card.Title>Advertisement</Card.Title>
                        <Card.Text style={{ minHeight: 200 }}></Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default Home;
