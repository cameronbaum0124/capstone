import { useEffect, useState} from "react";

export default function CreateTrip({triggerFetch}) {

    const [name, setName] = useState("");
    const [trip_type, setTripType] = useState("");
    const [location, setLocation] = useState("");
    const [start_date, setStartDate] = useState("");
    const [end_date, setEndDate] = useState("");
    const [cost, setCost] = useState("");

    async function add(e) {
        e.preventDefault();

        const tripData = {
            name, 
            trip_type,
            location,
            start_date,
            end_date,
            cost: Number(cost)
        };

        if (!name.trim() || !trip_type || !location.trim() || !start_date.trim() || !end_date.trim() || !cost) return;
        const response = await fetch("/api/trips", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tripData),
        });

        const data = await response.json();

        // clearing all fields after successful POST request
        if (response.ok) {
            setName("");
            setTripType("");
            setLocation("");
            setStartDate("");
            setEndDate("");
            setCost("");
        }

        triggerFetch();
    }

    return (
        <div>
            <h2>Create Trip</h2>
            <form onSubmit={add}>
                <label htmlFor="name">Name:</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Trip Name"
                />
                <br />

                <label htmlFor="trip_type"><input id="trip_type" type="radio" name="trip_type" value="Faculty Led" onChange={(e) => setTripType(e.target.value)} />Faculty Led</label>
                <label htmlFor="trip_type"><input id="trip_type" type="radio" name="trip_type" value="Exchange" onChange={(e) => setTripType(e.target.value)} />Exchange</label>
                <label htmlFor="trip_type"><input id="trip_type" type="radio" name="trip_type" value="Direct" onChange={(e) => setTripType(e.target.value)} />Direct</label>
                <br />

                <label htmlFor="location">Location:</label>
                <input
                    id="location"
                    type="text"
                    name="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Location"
                />
                <br />

                <label htmlFor="start_date">Start Date:</label>
                <input
                    id="start_date"
                    type="text"
                    name="start_date"
                    value={start_date}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="Start Date"
                />
                <br />

                <label htmlFor="end_date">End Date:</label>
                <input
                    id="end_date"
                    type="text"
                    name="end_date"
                    value={end_date}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="End Date"
                />
                <br />

                <label htmlFor="cost">Cost:</label>
                <input
                    id="cost"
                    type="number"
                    name="cost"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    placeholder="Cost"
                />
                <br />

                <button>Submit</button>
            </form>
        </div>
    )
}