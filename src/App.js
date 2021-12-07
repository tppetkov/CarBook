import "./App.css";

import Parse from "parse/dist/parse.min.js";
import { PersonComponent } from "./components/PersonComponent";

// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = "MtssiGAM5eFbIR5s4R2UZlIKwKk4Zx99qOhJNtac";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
const PARSE_JAVASCRIPT_KEY = "gEFJh1nxZSv2QBtmR6nleuMkt9J62XywSYsFz84a";
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App() {
    return (
        <div className='App'>
            <header className='App-header'>
                <h1>Welcome to CarBook</h1>
                <PersonComponent />
            </header>
        </div>
    );
}

export default App;
