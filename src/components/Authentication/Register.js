import { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Register = () => {
    const [error, setError] = useState({});
    const { register } = useAuthContext();
    const navigate = useNavigate();

    const onRegisterSubmitHandler = async (e) => {
        try {
            e.preventDefault();

            setError({});
            const email = e.target.email.value;
            const password = e.target.password.value;

            await register(email, password);
            navigate("/");
        } catch (e) {
            setError(e);
        }
    };

    return (
        <Row>
            <Col md='4' className='mx-auto'>
                <Form className='mt-5' onSubmit={onRegisterSubmitHandler}>
                    <fieldset className='border'>
                        <legend className='w-auto text-center'>Register</legend>
                        <Form.Group className='mb-3' controlId='formBasicEmail'>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type='email' name='email' placeholder='Enter email' required />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formBasicPassword'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' name='password' placeholder='Password' required />
                        </Form.Group>
                        {error ? (
                            <Form.Control.Feedback type='invalid' style={{ display: "block" }}>
                                {error.message}
                            </Form.Control.Feedback>
                        ) : (
                            ""
                        )}
                        <Button variant='primary' type='submit' className='mt-3'>
                            Register
                        </Button>
                    </fieldset>
                </Form>
            </Col>
        </Row>
    );
};

export default Register;
