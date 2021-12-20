import { db } from "../firebase-config";
import { collection, addDoc, doc, getDoc, updateDoc, getDocs, query, where } from "firebase/firestore";

const vehiclesCollectionRef = collection(db, "vehicles");

export const getMyVehicles = async (userid) => {
    const getMyVehicles = query(vehiclesCollectionRef, where("owner", "==", userid));
    let vehichleDocs = await getDocs(getMyVehicles);
    let myVehicles = vehichleDocs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    return myVehicles;
};

export const addVehicle = async (brand, model, year, engine, ownerid) => {
    await addDoc(vehiclesCollectionRef, { brand: brand, model: model, year: year, engine: engine, owner: ownerid });
};

export const search = async (brand, model) => {
    const searchVehicles =
        model !== ""
            ? query(vehiclesCollectionRef, where("brand", "==", brand), where("model", "==", model))
            : query(vehiclesCollectionRef, where("brand", "==", brand));
    let vehichleDocs = await getDocs(searchVehicles);
    let vehiclesResult = vehichleDocs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    return vehiclesResult;
};

export const updateVehicle = async (vehicle) => {
    let previousState = await getVehicleById(vehicle.vehicleid);
    const vehicleDoc = doc(db, "vehicles", vehicle.vehicleid);
    let propertiesForUpdate = {
        totalFuel: parseInt(previousState.totalFuel) + parseInt(vehicle.fuel),
        totalCost: parseInt(previousState.totalCost) + parseInt(vehicle.cost),
    };

    if (vehicle.consumption) {
        propertiesForUpdate.consumption = parseInt(vehicle.consumption);
    }

    await updateDoc(vehicleDoc, propertiesForUpdate);
};

export const getVehicleById = async (id) => {
    let vehicleRef = doc(db, "vehicles", id);
    let vehicleDoc = await getDoc(vehicleRef);
    let vehicle = vehicleDoc.data();

    return vehicle;
};
