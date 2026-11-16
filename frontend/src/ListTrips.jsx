import { useEffect, useState } from "react";



export default function ListTrips() {

    const [trips, setTrips] = useState([]);

    // on first page load, want to trigger this
    async function getTrips() {
        try {
            const res = await fetch("/api/trips");
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            setTrips(await res.json());
            setError(null);
        } catch (e) {
            setError(e.message);
        }
    }

    // when the page first loads, this issues the getTrips() function
    useEffect( () => {
        getTrips();
    }, []);

    return (
        <div>
            Hello World!
            {JSON.stringify(trips)}
        </div>
    )
}