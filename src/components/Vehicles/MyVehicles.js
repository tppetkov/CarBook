import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuthContext } from "../../contexts/AuthContext";

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
        if (!user.isAnonymous) {
            const vehiclesCollectionRef = collection(db, "vehicles");
            const getMyVehicles = query(vehiclesCollectionRef, where("owner", "==", user.uid));
            getDocs(getMyVehicles).then((response) => {
                setVehicles(response.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                setLoading(false);
            });
        }
    }, [user]);

    return (
        <Row>
            <Col md={12}>
                <h2 className='mt-3'>My Vehicles:</h2>
                {!loading ? (
                    <>
                        <div className='d-flex flex-row mt-5'>
                            {vehicles.map((x) => (
                                <Card style={{ width: "18rem" }} className='me-5' key={x.id}>
                                    {/* <Card.Img variant='top' src='holder.js/100px180' /> */}
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
                        <Button
                            variant='secondary'
                            size='lg'
                            className='mt-5'
                            onClick={() => navigate("/myvehicles/add")}>
                            Add new vehicle
                        </Button>
                    </>
                ) : (
                    <Spinner />
                )}
            </Col>
        </Row>
    );
};

export default MyVehicles;
