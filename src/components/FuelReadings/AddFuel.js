import { useNavigate } from "react-router-dom";

import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const AddFuel = () => {
    const navigate = useNavigate();

    const onAddFuelFormSubmitHandler = (e) => {
        e.preventDefault();
    };
    return (
        <Form onSubmit={onAddFuelFormSubmitHandler}>
            <Form.Group className='mb-3'>
                <Form.Label>OdoMeter</Form.Label>
                <Form.Control type='number' required name='odometer' />
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>Fuel [l]</Form.Label>
                <Form.Control type='number' required name='fuel' />
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>Cost</Form.Label>
                <Form.Control type='number' required name='cost' />
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>Full Tank</Form.Label>
                <Form.Check type='checkbox' />
            </Form.Group>
            <Button variant='primary' type='submit'>
                Add
            </Button>
            <Button variant='secondary' className='ms-2' onClick={() => navigate("/myvehicles")}>
                Cancel
            </Button>
        </Form>
    );
};

export default AddFuel;
