import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const EditFuel = ({
    fuelReading,
    show,
    handleClose,
    onEditFuelFormHandler,
    errors,
    validateOdometer,
    validateFuel,
    validateCost,
}) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Form onSubmit={(e) => onEditFuelFormHandler(e, fuelReading.id)}>
                <Modal.Body>
                    {errors.length > 0
                        ? errors.map((error) => (
                              <Form.Control.Feedback type='invalid' style={{ display: "block" }} key={error.key}>
                                  {error.message}
                              </Form.Control.Feedback>
                          ))
                        : null}
                    <Form.Group className='mb-3'>
                        <Form.Label>OdoMeter</Form.Label>
                        <Form.Control
                            type='number'
                            required
                            name='odometer'
                            defaultValue={fuelReading.odometer}
                            onBlur={validateOdometer}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Fuel [l]</Form.Label>
                        <Form.Control
                            type='decimal'
                            required
                            name='fuel'
                            defaultValue={fuelReading.fuel}
                            onBlur={validateFuel}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Cost</Form.Label>
                        <Form.Control
                            type='decimal'
                            required
                            name='cost'
                            defaultValue={fuelReading.cost}
                            onBlur={validateCost}
                        />
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
