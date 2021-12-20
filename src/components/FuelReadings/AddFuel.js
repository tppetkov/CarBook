import { useNavigate, useParams } from "react-router-dom";
import * as api from "../../services/fuelService";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AddFuel = () => {
    const navigate = useNavigate();
    const params = useParams();
    let vehicleid = params.vehicleid;

    const onAddFuelFormSubmitHandler = async (e) => {
        e.preventDefault();
        const { odometer, fuel, cost, isfulltank } = e.target;
        await api.addFuel(odometer.value, fuel.value, cost.value, isfulltank.checked, vehicleid);
        navigate(-1);
    };

    return (
        <Row>
            <Col md='12'>
                <Form onSubmit={onAddFuelFormSubmitHandler}>
                    <Form.Group className='mb-3'>
                        <Form.Label>OdoMeter</Form.Label>
                        <Form.Control type='number' required name='odometer' />
                    </Form.Group>
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
