import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

import * as api from "../../services/vehicleService";
import * as statistics from "../../services/statisticsService";

import * as constants from "../../data/Constants";
import "./addVehicle.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AddVehicle = () => {
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [error, setError] = useState({});
    const navigate = useNavigate();
    const { user } = useAuthContext();

    useEffect(() => {
        let allBrands = constants.carList.map((x) => x.brand);
        setBrands(allBrands);
    }, []);

    const onAddVehicleFormSubmitHandler = async (e) => {
        e.preventDefault();
        if (error && Object.entries(error).length > 0) {
            return;
        }
        const { brand, model, year, engine } = e.target;
        await api.addVehicle(brand.value, model.value, year.value, engine.value, user.uid);
        await statistics.updateVehicleStatistics();
        navigate(-1);
    };

    const onBrandChangeHandler = (e) => {
        let brand = e.target.value;
        let modelsByBrand = constants.carList.filter((x) => x.brand === brand).map((x) => x.models)[0];
        setModels(modelsByBrand);
    };

    const checkNumber = (e) => {
        setError({});
        let value = parseInt(e.target.value);
        if (isNaN(value) || value < 1900 || value > 2022) {
            setError({ message: "Please enter valid year!" });
        }
    };

    return (
        <Row>
            <Col md='6'>
                <Form onSubmit={onAddVehicleFormSubmitHandler} className='add-vehicle-form mt-5'>
                    <Form.Group className='mb-3'>
                        <Form.Label>Brand</Form.Label>
                        <Form.Select aria-label='Select Brand' onChange={onBrandChangeHandler} name='brand' required>
                            <option value=''>Select Brand</option>
                            {brands.map((x, i) => (
                                <option value={x} key={i}>
                                    {x}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Model</Form.Label>
                        <Form.Select aria-label='Select Model' name='model'>
                            <option value=''>Select Model</option>
                            {models.map((x, i) => (
                                <option value={x} key={i}>
                                    {x}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Year</Form.Label>
                        <Form.Control type='number' required name='year' onBlur={checkNumber} />
                    </Form.Group>
                    {error ? (
                        <Form.Control.Feedback type='invalid' style={{ display: "block" }}>
                            {error.message}
                        </Form.Control.Feedback>
                    ) : null}
                    <Form.Group className='mb-3'>
                        <Form.Label>Engine</Form.Label>
                        <Form.Select aria-label='Select Engine' name='engine'>
                            <option value=''>Select Engine</option>
                            {constants.engineTypes.map((x, i) => (
                                <option value={x} key={i}>
                                    {x}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Button variant='primary' type='submit'>
                        Add
                    </Button>
                    <Button variant='secondary' className='ms-2' onClick={() => navigate("/myvehicles")}>
                        Cancel
                    </Button>
                </Form>
            </Col>
        </Row>
    );
};

export default AddVehicle;
