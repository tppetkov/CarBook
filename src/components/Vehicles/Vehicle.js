import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import * as api from "../../services/fuelService";

import Spinner from "../common/Spinner";
import EditFuel from "../FuelReadings/EditFuel";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

const Vehicle = () => {
    const [fuelReadings, setFuelReadings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [editingRecord, setEditingRecord] = useState(false);

    const navigate = useNavigate();
    const params = useParams();
    let vehicleid = params.vehicleid;

    useEffect(() => {
        const fuelReadingsCollectionRef = collection(db, "fuelReadings");
        const getReadingsPerVehicle = query(fuelReadingsCollectionRef, where("vehicleid", "==", vehicleid));

        getDocs(getReadingsPerVehicle).then((response) => {
            let result = response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            let initialFuelReadings = [...result]
                .map((x) => {
                    return { ...x, date: x.date.toDate() };
                })
                .sort((a, b) => b.date - a.date);

            setFuelReadings(initialFuelReadings);
            setLoading(false);
        });
    }, [vehicleid]);

    const onEditHandler = (x) => {
        setEditingRecord(x);
        setShow(true);
    };

    const onDeleteHandler = async (id) => {
        await api.deleteFuel(id);
        setFuelReadings([...fuelReadings].filter((x) => x.id !== id));
    };

    const onEditFuelFormHandler = async (e, id) => {
        e.preventDefault();
        const { odometer, fuel, cost, isfulltank } = e.target;
        await api.editFuel(id, odometer.value, fuel.value, cost.value, isfulltank.checked);
        let updatedFuelReadings = [...fuelReadings].map((x) =>
            x.id === id
                ? { ...x, odometer: odometer.value, fuel: fuel.value, cost: cost.value, isfulltank: isfulltank.checked }
                : x
        );
        setFuelReadings(updatedFuelReadings);
        handleClose();
    };
    const handleClose = () => setShow(false);

    return (
        <Row>
            <Col md={12}>
                <h2 className='mt-5'>Fuel Readings:</h2>
                {!loading ? (
                    <>
                        <Button variant='primary' size='lg' className='mt-3' onClick={() => navigate("addfuel")}>
                            Add fuel
                        </Button>
                        <Button variant='secondary' size='lg' className='mt-3 ms-3' onClick={() => navigate(-1)}>
                            Go back
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
                                    <th></th>
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
                                        <td>{x.date.toLocaleDateString()}</td>
                                        <td>
                                            <input type='checkbox' checked={x.isfulltank} readOnly />
                                        </td>
                                        <td>{x.consumption}</td>
                                        <td>
                                            <Button variant='primary' size='sm' onClick={() => onEditHandler(x)}>
                                                Edit
                                            </Button>{" "}
                                            <Button variant='secondary' size='sm' onClick={() => onDeleteHandler(x.id)}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <EditFuel
                            fuelReading={editingRecord}
                            show={show}
                            handleClose={handleClose}
                            onEditFuelFormHandler={onEditFuelFormHandler}
                        />
                    </>
                ) : (
                    <Spinner />
                )}
            </Col>
        </Row>
    );
};

export default Vehicle;
