import { useEffect, useState } from "react";
import CreateTrip from "./CreateTrip"
import ListTrips from "./ListTrips";

export default function App() {

  const [dummy, setDummy] = useState(0);

  // a dummy function to track fetching across files (so that the page updates on a load)
  function triggerFetch() {
    setDummy(dummy+1)
  }

  return(
    <div>
      <ListTrips dummy={dummy} triggerFetch={triggerFetch}/>
      <CreateTrip triggerFetch={triggerFetch}/>
    </div>
  )
}
