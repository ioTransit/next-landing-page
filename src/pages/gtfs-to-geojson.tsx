import { useState } from "react";
import { Button, ButtonClickEvent } from "~/components/button";

export default function GTFSToGeoJson() {
  const [url, seturl] = useState("https://www.metrostlouis.org/Transit/google_transit.zip");

  const submitClick = async (e: ButtonClickEvent) => {
    e.preventDefault()
    await fetch('api/gtfs-to-geojson', { method: 'POST', body: JSON.stringify({ url }) })
  }

  return (
    <div className="min-h-screen">
      <label>
        URL
        <input type="text" onChange={(e) => seturl(e.target.value)} value={url} />
      </label>
      <Button onClick={submitClick}>submit</Button>
    </div>
  );
}
