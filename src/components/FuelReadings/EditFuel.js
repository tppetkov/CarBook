import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const EditFuel = ({ fuelReading, show, handleClose, onEditFuelFormHandler }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Form onSubmit={(e) => onEditFuelFormHandler(e, fuelReading.id)}>
                <Modal.Body>
                    <Form.Group className='mb-3'>
                        <Form.Label>OdoMeter</Form.Label>
                        <Form.Control type='number' required name='odometer' defaultValue={fuelReading.odometer} />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Fuel [l]</Form.Label>
                        <Form.Control type='decimal' required name='fuel' defaultValue={fuelReading.fuel} />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Cost</Form.Label>
                        <Form.Control type='decimal' required name='cost' defaultValue={fuelReading.cost} />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Full Tank</Form.Label>
                        <Form.Check type='checkbox' name='isfulltank' defaultChecked={fuelReading.isfulltank} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' type='submit'>
                        Save Changes
                    </Button>
                    <Button variant='secondary' className='ms-2' onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default EditFuel;
