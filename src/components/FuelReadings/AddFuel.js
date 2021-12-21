import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

import * as fuelApi from "../../services/fuelService";
import * as statisticsApi from "../../services/statisticsService";

import "./addFuel.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import fuelImg from "../../images/addFuel.jpg";

const AddFuel = () => {
    const [previousReading, setPreviousReading] = useState({});
    const [distance, setDistance] = useState(0);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const params = useParams();
    const { user } = useAuthContext();
    let vehicleid = params.vehicleid;

    useEffect(() => {
        fuelApi.getLastFuelReadingByVehicle(vehicleid).then((result) => setPreviousReading(result));
    }, [vehicleid]);

    const onAddFuelFormSubmitHandler = async (e) => {
        e.preventDefault();
        const { odometer, fuel, cost, isfulltank } = e.target;
        //validateForm(fuel.value, cost.value);
        if (errors.length > 0) {
            return;
        }
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
        let currentOdometer = e.target.value;
        if (previousReading && Object.entries(previousReading).length > 0) {
            let currentDistance = currentOdometer - previousReading.odometer;

            setDistance(currentDistance);
            if (currentDistance <= 0) {
                if (errors.filter((e) => e.key === "distance").length === 0) {
                    setErrors([...errors, { key: "distance", message: "You have enter an invalid odometer value!" }]);
                }
            } else {
                setErrors([...errors].filter((x) => x.key !== "distance"));
            }
        }
    };

    const validateFuel = (e) => {
        let fuel = e.target.value;
        if (isNaN(parseFloat(fuel)) || fuel <= 0) {
            if (errors.filter((e) => e.key === "fuel").length === 0) {
                setErrors([...errors, { key: "fuel", message: "You have enter an invalid fuel value!" }]);
            }
        } else {
            setErrors([...errors].filter((x) => x.key !== "fuel"));
        }
    };

    const validateCost = (e) => {
        let cost = e.target.value;
        if (isNaN(parseFloat(cost)) || cost <= 0) {
            if (errors.filter((e) => e.key === "cost").length === 0) {
                setErrors([...errors, { key: "cost", message: "You have enter an invalid cost value!" }]);
            }
        } else {
            setErrors([...errors].filter((x) => x.key !== "cost"));
        }
    };

    return (
        <Row>
            <Col md='6'>
                <Form onSubmit={onAddFuelFormSubmitHandler} className='add-fuel-form'>
                    <fieldset className='border'>
                        <legend className='w-auto text-center'>Add fuel</legend>
                        {errors.length > 0
                            ? errors.map((error) => (
                                  <Form.Control.Feedback type='invalid' style={{ display: "block" }} key={error.key}>
                                      {error.message}
                                  </Form.Control.Feedback>
                              ))
                            : null}
                        <Form.Group className='mb-3' as={Row}>
                            <Form.Label column sm='2'>
                                OdoMeter
                            </Form.Label>
                            <Col sm='10'>
                                <Form.Control type='number' required name='odometer' onBlur={calculateDistance} />
                            </Col>
                        </Form.Group>
                        <Form.Group className='mb-3' as={Row}>
                            <Form.Label column sm='2'>
                                Distance
                            </Form.Label>
                            <Col sm='10'>
                                <Form.Control type='number' disabled value={distance} />
                            </Col>
                        </Form.Group>
                        <Form.Group className='mb-3' as={Row}>
                            <Form.Label column sm='2'>
                                Fuel [l]
                            </Form.Label>
                            <Col sm='10'>
                                <Form.Control type='decimal' required name='fuel' onBlur={validateFuel} />
                            </Col>
                        </Form.Group>
                        <Form.Group className='mb-3' as={Row}>
                            <Form.Label column sm='2'>
                                Cost
                            </Form.Label>
                            <Col sm='10'>
                                <Form.Control type='decimal' required name='cost' onBlur={validateCost} />
                            </Col>
                        </Form.Group>
                        <Form.Group className='mb-3' as={Row}>
                            <Form.Label column sm='2'>
                                Full Tank
                            </Form.Label>
                            <Col sm='10'>
                                <Form.Check type='checkbox' name='isfulltank' />
                            </Col>
                        </Form.Group>
                        <Button variant='primary' type='submit'>
                            Add
                        </Button>
                        <Button variant='secondary' className='ms-2' onClick={() => navigate(-1)}>
                            Cancel
                        </Button>
                    </fieldset>
                </Form>
            </Col>
            <Col md='6'>
                <img src={fuelImg} className='img-fluid' alt='Add fuel' />
            </Col>
        </Row>
    );
};

export default AddFuel;
