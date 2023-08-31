import { z } from "zod";
import AdmZip from "adm-zip";
import axios from "axios";
import gtfs2geojson from "gtfs2geojson";

// export async function downloadFile(url: string) {
//   return await new Promise((resolve, reject) => {
//     https
//       .get(url, (response) => {
//         const code = response.statusCode ?? 0;

//         if (code >= 400) {
//           return reject(new Error(response.statusMessage));
//         }

//         // handle redirects
//         if (code > 300 && code < 400 && !!response.headers.location) {
//           return resolve(downloadFile(response.headers.location, targetFile));
//         }

//         response.pipe(fileWriter);
//       })
//       .on("error", (error: unknown) => {
//         reject(error);
//       });
//   });
// }
// export const extractZip = (zipFile: string, outputDir: string) => {
//   var zip = new admZip(zipFile);
//   console.log("start unzip");
//   zip.extractAllTo(outputDir);
//   console.log("finished unzip");
// };

export default async function handler(req, res) {
  try {
    const { url } = z.object({ url: z.string() }).parse(JSON.parse(req.body));
    // get url from request
    // console.log({ url });

    // const data = await fetch(url);
    // const data = await fetch(url).then((r) => {
    //   if (!r) return null;
    //   if (r.body) return Readable.fromWeb(r.body as ReadableStream<Uint8Array>);
    // });

    // if (data) {
    //   const something = fs.createReadStream(data);
    // }
    const body = await axios.get(url, {
      responseType: "arraybuffer",
    });
    const zip = new AdmZip(body.data); // eslint-disable-line
    const zipEntries = zip.getEntries(); // eslint-disable-line
    if (!zipEntries || !zipEntries.length) return;

    // for (let i = 0; i < zipEntries.length; i++) {
    //   console.log(zipEntries[i].entryName);
    //   //   if(!zipEntries[i]) continue
    //   //   const fileName =  zipEntries[i].entryName;
    //   //   console.log(zip.readAsText(fileName));
    // }

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
    const lines = stopsFile
      ? gtfs2geojson.stops(zip.readAsText(stopsFile.entryName))
      : null;

    return res.status(200).json({ stopsGeojson, routesGeojson, lines });
  } catch (e) {
    res.status(500).json(e);
  }
}
