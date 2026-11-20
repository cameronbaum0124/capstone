import { useEffect, useState} from "react";
import { Pencil } from 'lucide-react';

export default function EditTrip({triggerFetch, trip}) {

    const [name, setName] = useState(trip.name);
    const [trip_type, setTripType] = useState(trip.trip_type);
    const [location, setLocation] = useState(trip.location);
    const [start_date, setStartDate] = useState(trip.start_date);
    const [end_date, setEndDate] = useState(trip.end_date);
    const [cost, setCost] = useState(trip.cost);
    const [archived, setArchived] = useState(trip.archived);

    async function edit(e) {
        e.preventDefault();

        const tripData = {
            name, 
            trip_type,
            location,
            start_date,
            end_date,
            cost: Number(cost),
            archived
        };

        const response = await fetch(`/api/trips/${trip.id}`, {
            method: "PATCH",
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
            setArchived("");
        }

        triggerFetch();
    }

    return (
        <div>
            <h2>Edit Trip</h2>
            <form onSubmit={edit}>
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

                <label htmlFor="trip_type"><input id="trip_type" type="radio" checked={trip_type === "Faculty Led"} name="trip_type" value="Faculty Led" onChange={(e) => setTripType(e.target.value)} />Faculty Led</label>
                <label htmlFor="trip_type"><input id="trip_type" type="radio" checked={trip_type === "Exchange"} name="trip_type" value="Exchange" onChange={(e) => setTripType(e.target.value)} />Exchange</label>
                <label htmlFor="trip_type"><input id="trip_type" type="radio" checked={trip_type === "Direct"} name="trip_type" value="Direct" onChange={(e) => setTripType(e.target.value)} />Direct</label>
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
                
                <label htmlFor="archived">Archive?
                    <label htmlFor="archived"><input id="archived" type="radio" name="archived" checked={archived === true} value="true" onChange={(e) => setArchived(true)} />Yes</label>
                    <label htmlFor="archived"><input id="archived" type="radio" name="archived" checked={archived === false} value="false" onChange={(e) => setArchived(false)} />No</label>
                </label>
                <br />    

                <button>Submit</button>
            </form>
        </div>
    )
}