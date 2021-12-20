import { useState, useEffect } from "react";
import * as vehicleApi from "../../services/vehicleService";

import * as constants from "../../data/Constants";
import Spinner from "../common/Spinner";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SearchBox = () => {
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [error, setError] = useState({});
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let allBrands = constants.carList.map((x) => x.brand);
        setBrands(allBrands);
    }, []);

    const onSearchSubmitHandler = async (e) => {
        e.preventDefault();
        const { brand, model } = e.target;
        setError({});
        if (brand.value === "") {
            setError({ message: "Please select a brand!" });
            return;
        }
        setLoading(true);
        let results = await vehicleApi.search(brand.value, model.value);
        console.log(results);
        setSearchResults(results);
        setLoading(false);
    };

    const onBrandChangeHandler = (e) => {
        let brand = e.target.value;
        if (brand !== "") {
            let modelsByBrand = constants.carList.filter((x) => x.brand === brand).map((x) => x.models)[0];
            setModels([...modelsByBrand]);
        } else {
            setModels([]);
        }
    };
    return (
        <>
            <h3 className='mt-5'>Search:</h3>
            <Form onSubmit={onSearchSubmitHandler}>
                <Form.Group className='mb-3'>
                    <Form.Label>Brand</Form.Label>
                    <Form.Select aria-label='Select Brand' onChange={onBrandChangeHandler} name='brand'>
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
                {error ? (
                    <Form.Control.Feedback type='invalid' className='mb-3' style={{ display: "block" }}>
                        {error.message}
                    </Form.Control.Feedback>
                ) : null}
                <Button variant='primary' type='submit'>
                    Search
                </Button>
                {!loading ? (
                    searchResults.length > 0 ? (
                        <Table striped bordered hover size='md' responsive className='mt-5'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Model</th>
                                    <th>Brand</th>
                                    <th>Year</th>
                                    <th>Engine</th>
                                    <th>Average consumption</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchResults.map((x, i) => (
                                    <tr key={x.id}>
                                        <td>{i}</td>
                                        <td>{x.model}</td>
                                        <td>{x.brand}</td>
                                        <td>{x.year}</td>
                                        <td>{x.engine}</td>
                                        <td>{x.consumption}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : null
                ) : (
                    <Spinner />
                )}
            </Form>
        </>
    );
};

export default SearchBox;
