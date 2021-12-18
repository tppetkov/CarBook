import { useNavigate, useParams } from "react-router-dom";
import { db, auth } from "../../firebase-config";
import { collection, addDoc, getDocs, query, orderBy, limit } from "firebase/firestore";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AddFuel = () => {
    const navigate = useNavigate();
    const params = useParams();
    let vehicleid = params.vehicleid;
    const fuelReadingsCollectionRef = collection(db, "fuelReadings");

    const onAddFuelFormSubmitHandler = async (e) => {
        e.preventDefault();
        const { odometer, fuel, cost, isfulltank } = e.target;
        let currentConsumption = null;
        debugger;
        if (isfulltank.checked) {
            let lastReadingDoc = await getLastFuelReading();
            let lastReading = { ...lastReadingDoc.docs[0].data(), id: lastReadingDoc.docs[0].id };
            if (lastReading.isfulltank) {
                currentConsumption = ((odometer.value - lastReading.odometer) / fuel.value).toFixed(3);
            }
        }
        let fuelReading = {
            odometer: odometer.value,
            fuel: fuel.value,
            cost: cost.value,
            price: (cost.value / fuel.value).toFixed(3),
            isfulltank: isfulltank.checked,
            vehicleid: vehicleid,
            ownerid: auth.currentUser.uid,
            date: new Date(),
            consumption: currentConsumption,
        };
        console.log(fuelReading);
        await addDoc(fuelReadingsCollectionRef, fuelReading);
        navigate(-1);
    };

    const getLastFuelReading = async () => {
        let lastFuelReading = query(fuelReadingsCollectionRef, orderBy("date", "desc"), limit(1));
        return await getDocs(lastFuelReading);
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
