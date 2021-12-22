import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import Container from "react-bootstrap/Container";

import AuthGuard from "./hoc/АuthGuard";
import Home from "./components/Home/Home";
import Navigation from "./components/common/Navigation";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import Logout from "./components/Authentication/Logout";
import MyVehicles from "./components/Vehicles/MyVehicles";
import AddVehicle from "./components/Vehicles/AddVehicle";
import Vehicle from "./components/Vehicles/Vehicle";
import AddFuel from "./components/FuelReadings/AddFuel";
import NotFound from "./components/common/NotFound";

import "./App.scss";

function App() {
    return (
        <AuthProvider>
            <div className='App'>
                <div className='app-header'>
                    <Navigation />
                </div>
                <div className='body-content'>
                    <Container fluid='md'>
                        <Container>
                            <Routes>
                                <Route path='*' element={<NotFound />} />
                                <Route path='/' element={<Home />} />
                                <Route path='login' element={<Login />} />
                                <Route path='register' element={<Register />} />
                                <Route path='logout' element={<Logout />} />
                                <Route
                                    path='myvehicles'
                                    element={
                                        <AuthGuard>
                                            <MyVehicles />
                                        </AuthGuard>
                                    }
                                />
                                <Route
                                    path='myvehicles/:vehicleid'
                                    element={
                                        <AuthGuard>
                                            <Vehicle />
                                        </AuthGuard>
                                    }
                                />
                                <Route
                                    path='myvehicles/add'
                                    element={
                                        <AuthGuard>
                                            <AddVehicle />
                                        </AuthGuard>
                                    }
                                />
                                <Route
                                    path='myvehicles/:vehicleid/addfuel'
                                    element={
                                        <AuthGuard>
                                            <AddFuel />
                                        </AuthGuard>
                                    }
                                />
                            </Routes>
                        </Container>
                    </Container>
                </div>
            </div>
        </AuthProvider>
    );
}

export default App;
