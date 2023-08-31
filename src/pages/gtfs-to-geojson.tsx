import { downloadZip } from "client-zip";
import { useState } from "react";
import { Button, ButtonClickEvent } from "~/components/button";

export default function GTFSToGeoJson() {
  const [url, seturl] = useState("https://www.metrostlouis.org/Transit/google_transit.zip");

  const submitClick = async (e: ButtonClickEvent) => {
    e.preventDefault()
    const resp = await (await fetch('api/gtfs-to-geojson', { method: 'POST', body: JSON.stringify({ url }) })).json()
    console.log(resp)

    const stops = { name: "stops.json", lastModified: new Date(), input: JSON.stringify(resp.stopsGeojson) }
    const routes = { name: "routes.json", lastModified: new Date(), input: JSON.stringify(resp.routesGeojson) }
    const trips = { name: "trips.json", lastModified: new Date(), input: JSON.stringify(resp.tripsGeojson) }
    const blob = await downloadZip([stops, routes, trips]).blob()

    // make and click a temporary link to download the Blob
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "gtfs-geojson.zip"
    link.click()
    link.remove()
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
