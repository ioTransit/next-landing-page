import { z } from "zod";
import { Gtfs } from "gtfs-parser";

export default async function handler(req, res) {
  try {
    const { url } = z.object({ url: z.string() }).parse(JSON.parse(req.body));

    const gtfs = new Gtfs(url);
    await gtfs.init();

    const stopsGeojson = await gtfs.stopsToGeojson();
    const tripsGeojson = await gtfs.tripsToGeojson();
    const routesGeojson = await gtfs.routesToGeojson();

    return res.status(200).json({ stopsGeojson, routesGeojson, tripsGeojson });
  } catch (e) {
    res.status(500).json(e);
  }
}
