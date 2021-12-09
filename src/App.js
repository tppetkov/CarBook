import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";

import "./App.css";

function App() {
    return (
        <div className='App'>
            <header className='App-header'>
                <h1>Welcome to CarBook</h1>
            </header>
            <Routes>
                <Route path='/' element={<Home />} exact />
                <Route path='login' element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
