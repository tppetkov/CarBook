import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import * as api from "../../services/vehicleService";

import Spinner from "../common/Spinner";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const MyVehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        api.getMyVehicles(user.uid).then((response) => {
            setVehicles(response);
            setLoading(false);
        });
    }, [user.uid]);

    return (
        <Row>
            <Col md={12}>
                <h2 className='mt-5'>My Vehicles:</h2>
                {!loading ? (
                    <>
                        <Button
                            variant='secondary'
                            size='lg'
                            className='mt-3'
                            onClick={() => navigate("/myvehicles/add")}>
                            Add new vehicle
                        </Button>
                        <div className='d-flex flex-row mt-5'>
                            {vehicles.map((x) => (
                                <Card style={{ width: "18rem" }} className='me-5' key={x.id}>
                                    <Card.Body>
                                        <Card.Title>
                                            {x.brand} - {x.model}
                                        </Card.Title>
                                        <Card.Text>
                                            {x.year} <br /> {x.engine}
                                        </Card.Text>
                                        <Button variant='primary' onClick={() => navigate(`/myvehicles/${x.id}`)}>
                                            Details
                                        </Button>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                    </>
                ) : (
                    <Spinner />
                )}
            </Col>
        </Row>
    );
};

export default MyVehicles;
