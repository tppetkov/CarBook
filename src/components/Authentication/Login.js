import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Login = () => {
    const { login } = useAuthContext();
    const navigate = useNavigate();

    const loginSubmitHandler = (e) => {
        e.preventDefault();

        let email = e.target.email.value;
        let password = e.target.password.value;

        login(email, password).then(navigate("/"));
    };

    return (
        <Form onSubmit={loginSubmitHandler}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control type='email' name='email' placeholder='Enter email' />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' name='password' placeholder='Password' />
            </Form.Group>
            <Button variant='primary' type='submit'>
                Submit
            </Button>
        </Form>
    );
};

export default Login;
