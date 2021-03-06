import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import * as vehicleApi from "../../services/vehicleService";

import Spinner from "../common/Spinner";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DeleteConfirmation from "../common/DeleteConfirmation";

const MyVehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [recordForDeletion, setRecordForDeletion] = useState("");
    const { user } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        vehicleApi.getMyVehicles(user.uid).then((response) => {
            setVehicles(response);
            setLoading(false);
        });
    }, [user.uid]);

    const handleDelete = async () => {
        await vehicleApi.deleteVehicle(recordForDeletion);
        setVehicles([...vehicles].filter((x) => x.id !== recordForDeletion));
        setRecordForDeletion();
        handleClose();
    };

    const onDeleteClickHandler = (id) => {
        setRecordForDeletion(id);
        setShow(true);
    };

    const handleClose = () => setShow(false);

    return (
        <Row>
            <Col md={12}>
                <h2 className='mt-5'>My Vehicles:</h2>
                {!loading ? (
                    <>
                        <Button
                            variant='secondary'
                            size='lg'
                            className='mt-3'
                            onClick={() => navigate("/myvehicles/add")}>
                            Add new vehicle
                        </Button>
                        <DeleteConfirmation show={show} handleClose={handleClose} onDelete={handleDelete} />
                        <div className='d-flex flex-row flex-wrap mt-3'>
                            {vehicles.map((x) => (
                                <Card style={{ width: "18rem" }} className='me-5 mt-3' key={x.id}>
                                    <Card.Body>
                                        <Card.Title>
                                            {x.brand} - {x.model}
                                            <button
                                                type='button'
                                                className='btn-close float-end'
                                                aria-label='Close'
                                                data-bs-toggle='tooltip'
                                                data-bs-placement='top'
                                                title='Delete vehicle'
                                                onClick={() => onDeleteClickHandler(x.id)}></button>
                                        </Card.Title>
                                        <Card.Text>
                                            {x.year} <br /> {x.engine}
                                        </Card.Text>
                                        <Button variant='primary' onClick={() => navigate(`/myvehicles/${x.id}`)}>
                                            Details
                                        </Button>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                    </>
                ) : (
                    <Spinner />
                )}
            </Col>
        </Row>
    );
};

export default MyVehicles;
