import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login } = useAuthContext();
    const navigate = useNavigate();

    const onLoginFormSubmitHandler = (e) => {
        e.preventDefault();

        let username = e.target.username.value;
        let password = e.target.password.value;

        login(username, password).then(navigate("/"));
    };

    return (
        <section className='login'>
            <form onSubmit={onLoginFormSubmitHandler}>
                <fieldset>
                    <legend>Login</legend>
                    <p className='field'>
                        <label htmlFor='username'>Username</label>
                        <span className='input'>
                            <input type='text' name='username' id='username' placeholder='Username' />
                            <span className='actions'></span>
                            <i className='fas fa-user'></i>
                        </span>
                    </p>
                    <p className='field'>
                        <label htmlFor='password'>Password</label>
                        <span className='input'>
                            <input type='password' name='password' id='password' placeholder='Password' />
                            <span className='actions'></span>
                            <i className='fas fa-key'></i>
                        </span>
                    </p>
                    <input className='button' type='submit' value='Login' />
                </fieldset>
            </form>
        </section>
    );
};

export default Login;
