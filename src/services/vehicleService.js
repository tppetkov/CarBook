import { db } from "../firebase-config";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

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
