import { wsDb, httpDb } from "../db";
import * as schema from "../db/schema";

export const tables = schema;

export function useWsDb() {
  return wsDb;
}

export function useHttpDb() {
  return httpDb;
}