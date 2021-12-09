import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Register from "./components/Register";

import "./App.css";

function App() {
    return (
        <div className='App'>
            <header className='App-header'>
                <Navigation />
            </header>
            <Routes>
                <Route path='/' element={<Home />} exact />
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
            </Routes>
        </div>
    );
}

export default App;
