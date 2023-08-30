import { type NextApiRequest, type NextApiResponse } from "next";
import { z } from "zod";
import { type Readable } from "stream";
import { type ReadableStream } from "stream/web";
import fs from "fs";

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // get url from request
    const { url } = z.object({ url: z.string() }).parse(req.body);

    const data = await fetch(url);
    // const data = await fetch(url).then((r) => {
    //   if (!r) return null;
    //   if (r.body) return Readable.fromWeb(r.body as ReadableStream<Uint8Array>);
    // });

    // if (data) {
    //   const something = fs.createReadStream(data);
    // }

    res.status(200).json({ data });
  } catch (e) {
    res.status(500).json(e);
  }
}
