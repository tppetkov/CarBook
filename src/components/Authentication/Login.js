import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
        <Row>
            <Col md='4' className='mx-auto'>
                <Form className='mt-5' onSubmit={loginSubmitHandler}>
                    <fieldset className='border'>
                        <legend className='w-auto text-center'>Login</legend>
                        <Form.Group className='mb-3' controlId='formBasicEmail'>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type='email' name='email' placeholder='Enter email' />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formBasicPassword'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' name='password' placeholder='Password' />
                        </Form.Group>
                        <Form.Text className='text-muted'>
                            Don`t have an account? <a href='register'>Sign Up</a> for free :)
                        </Form.Text>{" "}
                        <br />
                        <Button variant='primary' type='submit' className='mt-3'>
                            Sign In
                        </Button>
                    </fieldset>
                </Form>
            </Col>
        </Row>
    );
};

export default Login;
