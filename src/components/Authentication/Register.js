import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Register = () => {
    const { register } = useAuthContext();
    const navigate = useNavigate();

    const onRegisterSubmitHandler = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        register(email, password).then(navigate("/"));
    };

    return (
        <Form onSubmit={onRegisterSubmitHandler}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control type='email' name='email' placeholder='Enter email' />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' name='password' placeholder='Password' />
            </Form.Group>
            <Button variant='primary' type='submit'>
                Register
            </Button>
        </Form>
    );
};

export default Register;
