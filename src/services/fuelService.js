import { db, auth } from "../firebase-config";
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, orderBy, limit } from "firebase/firestore";

const fuelReadingsCollectionRef = collection(db, "fuelReadings");

export const addFuel = async (odometer, fuel, cost, isfulltank, vehicleid) => {
    let currentConsumption = null;
    if (isfulltank) {
        let lastReadingDoc = await getLastFuelReading();
        let lastReading = { ...lastReadingDoc.docs[0].data(), id: lastReadingDoc.docs[0].id };
        if (lastReading.isfulltank) {
            currentConsumption = ((odometer - lastReading.odometer) / fuel).toFixed(3);
        }
    }
    let fuelReading = {
        odometer: odometer,
        fuel: fuel,
        cost: cost,
        price: (cost / fuel).toFixed(3),
        isfulltank: isfulltank,
        vehicleid: vehicleid,
        ownerid: auth.currentUser.uid,
        date: new Date(),
        consumption: currentConsumption,
    };
    await addDoc(fuelReadingsCollectionRef, fuelReading);
};

const getLastFuelReading = async () => {
    let lastFuelReading = query(fuelReadingsCollectionRef, orderBy("date", "desc"), limit(1));
    return await getDocs(lastFuelReading);
};

export const editFuel = async (id, odometer, fuel, cost, isfulltank) => {
    const fuelDoc = doc(db, "fuelReadings", id);
    const newFields = { odometer: odometer, fuel: fuel, cost: cost, isfulltank: isfulltank };
    await updateDoc(fuelDoc, newFields);
};

export const deleteFuel = async (id) => {
    const fuelDoc = doc(db, "fuelReadings", id);
    await deleteDoc(fuelDoc);
};
