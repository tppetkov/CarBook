import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const DeleteConfirmation = ({ show, handleClose, onDelete }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Are you sure you want to delete the record?</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                    Close
                </Button>
                <Button variant='primary' onClick={onDelete}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteConfirmation;
