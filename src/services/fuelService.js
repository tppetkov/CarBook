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

export const addFuel = async (odometer, fuel, cost, isfulltank, vehicleid, userid) => {
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
        ownerid: userid,
        date: new Date(),
        consumption: currentConsumption,
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

export const getFuelReadingsByVehicle = async (vehicleid) => {
    const getReadingsPerVehicle = query(fuelReadingsCollectionRef, where("vehicleid", "==", vehicleid));

    let fuelDocs = await getDocs(getReadingsPerVehicle);
    let result = fuelDocs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    let initialFuelReadings = [...result].map((x) => {
        return { ...x, date: x.date.toDate() };
    });

    return initialFuelReadings;
};
