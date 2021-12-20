import { db } from "../firebase-config";
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDocs,
    query,
    where,
    orderBy,
    limit,
} from "firebase/firestore";
import { updateVehicle } from "./vehicleService";

const fuelReadingsCollectionRef = collection(db, "fuelReadings");

export const addFuel = async (odometer, fuel, cost, distance, isfulltank, vehicleid, userid) => {
    let currentConsumption = null;
    if (isfulltank) {
        let lastReadingDoc = await getLastFuelReading();
        if (lastReadingDoc.isfulltank) {
            currentConsumption = ((odometer - lastReadingDoc.odometer) / fuel).toFixed(3);
        }
    }
    let fuelReading = {
        odometer: odometer,
        fuel: fuel,
        cost: cost,
        price: (cost / fuel).toFixed(3),
        isfulltank: isfulltank,
        vehicleid: vehicleid,
        ownerid: userid,
        date: new Date(),
        consumption: currentConsumption,
        distance: parseInt(distance),
    };
    await addDoc(fuelReadingsCollectionRef, fuelReading);

    let vehicleToUpdate = {
        vehicleid: fuelReading.vehicleid,
        consumption: fuelReading.consumption,
        fuel: fuelReading.fuel,
        cost: fuelReading.cost,
    };

    await updateVehicle(vehicleToUpdate);
};

export const getLastFuelReading = async () => {
    let lastFuelReading = query(fuelReadingsCollectionRef, orderBy("date", "desc"), limit(1));
    let lastReadingDoc = await getDocs(lastFuelReading);
    let lastReading = { ...lastReadingDoc.docs[0].data(), id: lastReadingDoc.docs[0].id };

    return lastReading;
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

export const getFuelReadingsByVehicle = async (vehicleid) => {
    const getReadingsPerVehicle = query(fuelReadingsCollectionRef, where("vehicleid", "==", vehicleid));

    let fuelDocs = await getDocs(getReadingsPerVehicle);
    let result = fuelDocs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    let initialFuelReadings = [...result].map((x) => {
        return { ...x, date: x.date.toDate() };
    });

    return initialFuelReadings;
};
