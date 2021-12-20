import { db } from "../firebase-config";
import { collection, addDoc, doc, updateDoc, getDocs, query, where } from "firebase/firestore";

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
    const vehicleDoc = doc(db, "vehicles", vehicle.vehicleid);
    await updateDoc(vehicleDoc, { consumption: vehicle.consumption });
};
