import GhostContentAPI from "@tryghost/content-api";
import axios from "axios";
import { env } from "~/env.mjs";

const initAdmin = () => {
  return {
    members: {
      add: async ({ email, name }: { email: string; name: string }) => {
        await axios.post(
          `${env.NEXT_PUBLIC_GHOST_URL}/ghost/api/admin/members`,
          {
            members: [
              {
                email,
                name,
              },
            ],
          },
          {
            headers: {
              Authorization: `Ghost ${env.NEXT_PUBLIC_GHOST_ADMIN_KEY}`,
            },
          }
        );
      },
    },
  };
};

const initContent = () => {
  return new GhostContentAPI({
    url: env.NEXT_PUBLIC_GHOST_URL,
    key: env.NEXT_PUBLIC_GHOST_CONTENT_KEY,
    version: "v5.0",
  });
};

export const ghost = {
  admin: initAdmin(),
  content: initContent(),
};
