import GhostContentAPI from "@tryghost/content-api";
import axios from "axios";
import { env } from "~/env.mjs";

const initAdmin = () => {
  return {
    members: {
      add: async ({ email, name }: { email: string; name: string }) => {
        await axios.post(
          `${env.GHOST_URL}/ghost/api/admin/members`,
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
              Authorization: `Ghost ${env.GHOST_ADMIN_KEY}`,
            },
          }
        );
      },
    },
  };
};

const initContent = () => {
  return new GhostContentAPI({
    url: env.GHOST_URL,
    key: env.GHOST_CONTENT_KEY,
    version: "v5.0",
  });
};

export const ghost = {
  admin: initAdmin(),
  content: initContent(),
};
