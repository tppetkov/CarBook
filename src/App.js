import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import Home from "./components/Home";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";

import "./App.css";

function App() {
    return (
        <AuthProvider>
            <div className='App'>
                <header className='App-header'>
                    <Navigation />
                </header>
                <Routes>
                    <Route path='/' element={<Home />} exact />
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                    <Route path='logout' element={<Logout />} />
                </Routes>
            </div>
        </AuthProvider>
    );
}

export default App;
