import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as fuelApi from "../../services/fuelService";
import * as vehicleApi from "../../services/vehicleService";

import Spinner from "../common/Spinner";
import EditFuel from "../FuelReadings/EditFuel";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";

const Vehicle = () => {
    const [currentVehicle, setCurrentVehicle] = useState({});
    const [fuelReadings, setFuelReadings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [editingRecord, setEditingRecord] = useState(false);

    const navigate = useNavigate();
    const params = useParams();
    let vehicleid = params.vehicleid;

    const getCurrentVehicleStats = useCallback(() => {
        vehicleApi.getVehicleById(vehicleid).then((result) => setCurrentVehicle(result));
    }, [vehicleid]);

    useEffect(() => {
        getCurrentVehicleStats();
        fuelApi.getFuelReadingsByVehicle(vehicleid).then((result) => {
            if (result) {
                setFuelReadings(result.sort((a, b) => b.odometer - a.odometer));
            }
            setLoading(false);
        });
    }, [vehicleid, getCurrentVehicleStats]);

    const onEditHandler = (x) => {
        setEditingRecord(x);
        setShow(true);
    };

    const onDeleteHandler = async (id) => {
        await fuelApi.deleteFuel(id);
        setFuelReadings([...fuelReadings].filter((x) => x.id !== id));
    };

    const onEditFuelFormHandler = async (e, id) => {
        e.preventDefault();
        const { odometer, fuel, cost, isfulltank } = e.target;
        let previousState = fuelReadings[0];
        let previousReading = fuelReadings[1];
        let updatedProperties = await fuelApi.editFuel(
            id,
            odometer.value,
            fuel.value,
            cost.value,
            isfulltank.checked,
            previousState,
            previousReading
        );
        let updatedFuelReadings = [...fuelReadings].map((x) =>
            x.id === id
                ? {
                      ...x,
                      odometer: updatedProperties.odometer,
                      fuel: updatedProperties.fuel,
                      cost: updatedProperties.cost,
                      isfulltank: updatedProperties.isfulltank,
                      consumption: updatedProperties.consumption,
                  }
                : x
        );
        setFuelReadings(updatedFuelReadings.sort((a, b) => b.odometer - a.odometer));
        getCurrentVehicleStats();
        handleClose();
    };
    const handleClose = () => setShow(false);

    return (
        <Row>
            <Col md={12}>
                <div className='mt-5 car-stats greybox'>
                    <h3>
                        {currentVehicle.brand} - {currentVehicle.model}
                        <Badge bg='secondary' className='ms-3'>
                            {currentVehicle?.consumption} L/km
                        </Badge>
                        <Badge bg='secondary' className='ms-3'>
                            {currentVehicle?.totalFuel} L
                        </Badge>
                        <Badge bg='secondary' className='ms-3'>
                            {currentVehicle?.totalCost} $
                        </Badge>
                        <Badge bg='secondary' className='ms-3'>
                            {(currentVehicle?.totalCost / currentVehicle?.totalFuel).toFixed(3)} $/L
                        </Badge>
                    </h3>
                </div>
                <h2 className='mt-3'>Fuel Readings:</h2>
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
                                            {i === 0 ? (
                                                <Button variant='primary' size='sm' onClick={() => onEditHandler(x)}>
                                                    Edit
                                                </Button>
                                            ) : null}{" "}
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
