import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import * as constants from "../../data/Constants";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AddVehicle = () => {
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let allBrands = constants.carList.map((x) => x.brand);
        setBrands(allBrands);
    }, []);

    const vehiclesCollectionRef = collection(db, "vehicles");

    const onAddVehicleFormSubmitHandler = (e) => {
        e.preventDefault();
        const { brand, model, year, engine } = e.target;
        let ownerid = auth.currentUser.uid;
        addVehicle(brand.value, model.value, year.value, engine.value, ownerid).then(navigate("/myvehicles"));
    };

    const addVehicle = async (brand, model, year, engine, ownerid) => {
        await addDoc(vehiclesCollectionRef, { brand: brand, model: model, year: year, engine: engine, owner: ownerid });
    };

    const onBrandChangeHandler = (e) => {
        let brand = e.target.value;
        let modelsByBrand = constants.carList.filter((x) => x.brand === brand).map((x) => x.models)[0];
        setModels(modelsByBrand);
    };

    return (
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
    );
};

export default AddVehicle;
