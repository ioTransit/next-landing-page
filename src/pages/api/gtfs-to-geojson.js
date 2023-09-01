import { z } from "zod";
import AdmZip from "adm-zip";
import axios from "axios";
import gtfs2geojson from "gtfs2geojson";

export default async function handler(req, res) {
  try {
    const { url } = z.object({ url: z.string() }).parse(JSON.parse(req.body));

    const body = await axios.get(url, {
      responseType: "arraybuffer",
    });
    const zip = new AdmZip(body.data); // eslint-disable-line
    const zipEntries = zip.getEntries(); // eslint-disable-line
    if (!zipEntries || !zipEntries.length) return;

    const getFile = (fileName) =>
      zipEntries.find((zipEntry) => {
        return zipEntry.entryName === fileName;
      });

    const stopsFile = getFile("stops.txt");
    const tripsFile = getFile("trips.txt");
    const routesFile = getFile("routes.txt");
    const shapesFile = getFile("shapes.txt");

    const stopsGeojson = stopsFile
      ? gtfs2geojson.stops(zip.readAsText(stopsFile.entryName))
      : null;
    const routesGeojson =
      tripsFile && routesFile && shapesFile
        ? gtfs2geojson.routes(
            zip.readAsText(shapesFile.entryName),
            zip.readAsText(routesFile.entryName),
            zip.readAsText(tripsFile.entryName)
          )
        : null;
    const tripsGeojson = stopsFile
      ? gtfs2geojson.stops(zip.readAsText(stopsFile.entryName))
      : null;

    return res.status(200).json({ stopsGeojson, routesGeojson, tripsGeojson });
  } catch (e) {
    res.status(500).json(e);
  }
}
