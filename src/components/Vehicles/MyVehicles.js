import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuthContext } from "../../contexts/AuthContext";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const MyVehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const vehiclesCollectionRef = collection(db, "vehicles");
    const getMyVehicles = query(vehiclesCollectionRef, where("owner", "==", user.uid));

    useEffect(() => {
        getDocs(getMyVehicles).then((response) => {
            setVehicles(response.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
    }, []);

    return (
        <Row>
            <Col md={12}>
                <h2 className='mt-3'>My Vehicles:</h2>
                <div className='d-flex flex-row mt-5'>
                    {vehicles.map((x) => (
                        <Card style={{ width: "18rem" }} className='me-5' key={x.id}>
                            {/* <Card.Img variant='top' src='holder.js/100px180' /> */}
                            <Card.Body>
                                <Card.Title>
                                    {x.brand} - {x.model}
                                </Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of the
                                    card's content.
                                </Card.Text>
                                <Button variant='primary' onClick={() => navigate("/myvehicles/addfuel")}>
                                    Add Fuel
                                </Button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
                <Button variant='secondary' size='lg' className='mt-5' onClick={() => navigate("/myvehicles/add")}>
                    Add new vehicle
                </Button>
            </Col>
        </Row>
    );
};

export default MyVehicles;
