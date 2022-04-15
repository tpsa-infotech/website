import getConfig from "next/config";
import { Directus } from "@directus/sdk";

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();
const { url } = publicRuntimeConfig;
const { email, password, token } = serverRuntimeConfig;

const directus = new Directus(url);

export async function getDirectusClient() {
  return directus;
}