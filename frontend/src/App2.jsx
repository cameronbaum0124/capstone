import { useEffect, useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  const [trips, setTrips] = useState([]);
  const [name, setName] = useState("");
  const [trip_type, setTripType] = useState("");
  const [location, setLocation] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [cost, setCost] = useState("");
  const [error, setError] = useState(null);

  /*
  async function load() {
    try {
      const res = await fetch("/api/items");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setItems(await res.json());
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  }*/

  function DynamicForm() {
    const fields = [
      { id: 'name', placeholder: 'Enter trip name', buttonText: 'Submit' },
      { id: 'trip_type', placeholder: 'Enter trip type', buttonText: 'Submit' },
      { id: 'location', placeholder: 'Enter trip location', buttonText: 'Submit' },
      { id: 'start_date', placeholder: 'Enter start date', buttonText: 'Submit' },
      { id: 'end_date', placeholder: 'Enter end date', buttonText: 'Submit' },
      { id: 'cost', placeholder: 'Enter trip cost', buttonText: 'Submit' }
    ]; 

    const [values, setValues] = useState({});

    const handleChange = (id, value) => {
      setValues({ ...values, [id]: value });
    };

    return (
      <form onSubmit={add}>
        {fields.map((field) => (
          <div key={field.id} style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder={field.placeholder}
              value={values[field.id] || ''}
              onChange={(e) => handleChange(field.id, e.target.value)}
            />
            <button type="submit" onClick={() => alert(`Submitted ${field.id}: ${values[field.id] || ''}`)}>
              {field.buttonText}
            </button>
          </div>
        ))}
      </form>
    )
  }

  async function load() {
    try {
      const res = await fetch("/api/trips");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setTrips(await res.json());
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function add(e, setterFunction, data) {
    e.preventDefault();

    if (!data.trim()) return;
    await fetch("/api/trips", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });
    setterFunction("");
    load();
  }

  async function remove(id) {
    await fetch(`/api/trips/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <main style={{ maxWidth: 480, margin: "3rem auto", fontFamily: "system-ui" }}>
      <h1>Items</h1>
      {error && <p style={{ color: "crimson" }}>API error: {error}</p>}
      {DynamicForm()}
      <ul>
        {trips.map((i) => (
          <li key={i.id}>
            {i.data} <button onClick={() => remove(i.id)}>x</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
