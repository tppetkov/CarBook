import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import App from "../App";
import Navigation from "../components/common/Navigation";
import Home from "../components/Home/Home";
import DeleteConfirmation from "../components/common/DeleteConfirmation";

import { AuthProvider } from "../contexts/AuthContext";

Enzyme.configure({ adapter: new Adapter() });

it("should pass", () => {
    expect(1).toEqual(1);
});

it("should failed", () => {
    expect(true).toEqual(false);
});

describe("App", () => {
    it("should render App component", () => {
        shallow(<App />);
    });
});

describe("Home", () => {
    it("should render Home component", () => {
        shallow(<Home />);
    });
});

describe("Navigation failed", () => {
    it("should failed render Navigation component", () => {
        shallow(<Navigation />);
    });
});

describe("Navigation pass", () => {
    it("should render Navigation component", () => {
        let user = {
            email: "",
            accessToken: "",
            isAnonymous: true,
        };
        const NavigationTest = () => (
            <AuthProvider value={user}>
                <Navigation />
            </AuthProvider>
        );
        shallow(<NavigationTest />);
    });
});

describe("DeleteConfirmation", () => {
    it("should render DeleteConfirmation component", () => {
        const component = shallow(<DeleteConfirmation />);
        expect(component).toEqual({});
    });
});
