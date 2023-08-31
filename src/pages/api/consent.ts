import type { NextApiRequest, NextApiResponse } from "next";
// import { cookies } from "next/headers";

export default function Consent(req: NextApiRequest, res: NextApiResponse) {
  // const ga = cookies().get("google-analytics");

  res.status(200).json({ ga: true });
}
