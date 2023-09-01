import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { env } from "~/env.mjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try{

    const body = z
    .object({
      email: z.string(),
      name: z.string(),
      agency: z.string(),
      city: z.string(),
      state: z.string(),
    })
    .parse(req.body);
    await axios.post(
      "https://api.hubapi.com/contacts/v1/contact/?hapikey=" + env.NEXT_PUBLIC_HUBSPOT_API_KEY,
      {
        ...Object.entries(body).map(([key, value]) => {
          return {
            property: key,
            value,
          };
        }),
      }
      );
    }catch(e){
      console.log(e);
      return res.status(500).end();
    }
}
