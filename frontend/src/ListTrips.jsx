import { useEffect, useState } from "react";
import "./ListTrips.css"
import ArchiveTrip from "./ArchiveTrip"
import EditTrip from "./EditTrip"
import { Trash, Pencil } from 'lucide-react';


export default function ListTrips({dummy, triggerFetch}) {

    const [trips, setTrips] = useState([]); 
    const [error, setError] = useState("");
    const [tripBeingEdited, setTripBeingEdited] = useState(null);

    console.log(tripBeingEdited)

    // on first page load, want to trigger this
    async function getTrips() {
        try {
            const res = await fetch("/api/active-trips");
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            setTrips(await res.json());
            setError(null);
        } catch (e) {
            setError(e.message);
        }
    }

    // when the page first loads, this issues the getTrips() function
    useEffect(() => {
        getTrips();
    }, [dummy]);

    // function to display a trip's name
    function displayTrip(trip) {
        return (
            <div key={`trip_${trip.id}`} className="trip_item">
                <div>{trip.name}</div>
                <div>{trip.location}</div>
                <Pencil className="button" onClick={() => setTripBeingEdited(tripBeingEdited === trip.id ? null : trip.id)} />
                { tripBeingEdited === trip.id && <EditTrip triggerFetch={triggerFetch} trip={trip}/>}
                <ArchiveTrip triggerFetch={triggerFetch} id={trip.id}/>
            </div>
        )
    }

    return (
        <div>
            {trips.map(displayTrip)}
        </div>
    )
}