import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

import * as fuelApi from "../../services/fuelService";
import * as statisticsApi from "../../services/statisticsService";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AddFuel = () => {
    const [previousReading, setPreviousReading] = useState({});
    const [distance, setDistance] = useState(0);
    const [error, setError] = useState({});
    const navigate = useNavigate();
    const params = useParams();
    const { user } = useAuthContext();
    let vehicleid = params.vehicleid;

    useEffect(() => {
        fuelApi.getLastFuelReadingByVehicle(vehicleid).then((result) => setPreviousReading(result));
    }, [vehicleid]);

    const onAddFuelFormSubmitHandler = async (e) => {
        e.preventDefault();
        if (error) {
            return;
        }
        const { odometer, fuel, cost, isfulltank } = e.target;
        await fuelApi.addFuel(
            odometer.value,
            distance,
            fuel.value,
            cost.value,
            isfulltank.checked,
            vehicleid,
            user.uid
        );
        await statisticsApi.updateFuelReadingsStatistics(fuel.value, distance);
        navigate(-1);
    };

    const calculateDistance = (e) => {
        setError(null);
        let currentOdometer = e.target.value;
        if (Object.entries(previousReading).length > 0) {
            let currentDistance = currentOdometer - previousReading.odometer;

            setDistance(currentDistance);
            if (currentDistance <= 0) {
                setError({ message: "You have enter an invalid odometer value!" });
            }
        }
    };

    return (
        <Row>
            <Col md='12'>
                <Form onSubmit={onAddFuelFormSubmitHandler}>
                    <Form.Group className='mb-3'>
                        <Form.Label>OdoMeter</Form.Label>
                        <Form.Control type='number' required name='odometer' onBlur={calculateDistance} />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Distance</Form.Label>
                        <Form.Control type='number' disabled value={distance} />
                    </Form.Group>
                    {error ? (
                        <Form.Control.Feedback type='invalid' style={{ display: "block" }}>
                            {error.message}
                        </Form.Control.Feedback>
                    ) : null}
                    <Form.Group className='mb-3'>
                        <Form.Label>Fuel [l]</Form.Label>
                        <Form.Control type='decimal' required name='fuel' />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Cost</Form.Label>
                        <Form.Control type='decimal' required name='cost' />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Full Tank</Form.Label>
                        <Form.Check type='checkbox' name='isfulltank' />
                    </Form.Group>
                    <Button variant='primary' type='submit'>
                        Add
                    </Button>
                    <Button variant='secondary' className='ms-2' onClick={() => navigate(-1)}>
                        Cancel
                    </Button>
                </Form>
            </Col>
        </Row>
    );
};

export default AddFuel;
