import { db } from "../firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const statisticsDoc = doc(db, "generalStatistics", "1");

export const getGeneralStatistics = async () => {
    let statisticDoc = await getDoc(statisticsDoc);
    let statistics = statisticDoc.data();

    return statistics;
};

export const updateVehicleStatistics = async () => {
    let previousState = await getGeneralStatistics();
    const newVehicle = { vehicles: previousState.vehicles + 1 };
    await updateDoc(statisticsDoc, newVehicle);
};

export const updateFuelReadingsStatistics = async (fuel, distance) => {
    let previousState = await getGeneralStatistics();
    const newFuel = {
        totalfuel: previousState.totalfuel + parseInt(fuel),
        fuelReadings: previousState.fuelReadings + 1,
        totalkm: previousState.totalkm + parseInt(distance),
    };
    await updateDoc(statisticsDoc, newFuel);
};
