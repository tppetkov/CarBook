import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

import * as api from "../../services/vehicleService";
import * as constants from "../../data/Constants";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AddVehicle = () => {
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const navigate = useNavigate();
    const { user } = useAuthContext();

    useEffect(() => {
        let allBrands = constants.carList.map((x) => x.brand);
        setBrands(allBrands);
    }, []);

    const onAddVehicleFormSubmitHandler = async (e) => {
        e.preventDefault();
        const { brand, model, year, engine } = e.target;
        await api.addVehicle(brand.value, model.value, year.value, engine.value, user.uid);
        navigate(-1);
    };

    const onBrandChangeHandler = (e) => {
        let brand = e.target.value;
        let modelsByBrand = constants.carList.filter((x) => x.brand === brand).map((x) => x.models)[0];
        setModels(modelsByBrand);
    };

    return (
        <Row>
            <Col md='12'>
                <Form onSubmit={onAddVehicleFormSubmitHandler}>
                    <Form.Group className='mb-3'>
                        <Form.Label>Brand</Form.Label>
                        <Form.Select aria-label='Select Brand' onChange={onBrandChangeHandler} name='brand'>
                            <option>Select Brand</option>
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
                            <option>Select Model</option>
                            {models.map((x, i) => (
                                <option value={x} key={i}>
                                    {x}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Year</Form.Label>
                        <Form.Control type='number' required name='year' />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Engine</Form.Label>
                        <Form.Select aria-label='Select Engine' name='engine'>
                            <option>Select Engine</option>
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
