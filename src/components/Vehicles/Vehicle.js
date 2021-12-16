import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";

import Spinner from "../common/Spinner";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

const Vehicle = () => {
    const [fuelReadings, setFuelReadings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const params = useParams();
    let vehicleid = params.vehicleid;

    useEffect(() => {
        //debugger;
        const fuelReadingsCollectionRef = collection(db, "fuelReadings");
        const getReadingsPerVehicle = query(fuelReadingsCollectionRef, where("vehicleid", "==", vehicleid));
        getDocs(getReadingsPerVehicle).then((response) => {
            console.log(response.docs);
            let result = response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            console.log(result);
            let initialFuelReadings = [...result]
                .map((x) => {
                    return { ...x, date: x.date.toDate() };
                })
                .sort((a, b) => b.date - a.date);
            console.log(initialFuelReadings);

            setFuelReadings(initialFuelReadings);
            setLoading(false);
        });
    }, [vehicleid]);

    return (
        <Row>
            <Col md={12}>
                <h2>Fuel Readings:</h2>
                {!loading ? (
                    <>
                        <Button variant='secondary' size='lg' className='mt-5' onClick={() => navigate("addfuel")}>
                            Add fuel
                        </Button>
                        <Table striped bordered hover size='md' responsive className='mt-5'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Odometer</th>
                                    <th>Fuel [l]</th>
                                    <th>Cost</th>
                                    <th>Price per L</th>
                                    <th>Date</th>
                                    <th>Full tank</th>
                                    <th>Average consumption</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fuelReadings.map((x, i) => (
                                    <tr key={x.id}>
                                        <td>{i}</td>
                                        <td>{x.odometer}</td>
                                        <td>{x.fuel}</td>
                                        <td>{x.cost}</td>
                                        <td>{x.price}</td>
                                        <td>{x.date.toString()}</td>
                                        <td>
                                            <input type='checkbox' checked={x.isfulltank} readOnly />
                                        </td>
                                        <td>{x.consumption}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </>
                ) : (
                    <Spinner />
                )}
            </Col>
        </Row>
    );
};

export default Vehicle;
