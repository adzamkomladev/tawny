import { useDbInstance } from "../db/setup";
import * as schema from "../db/schema";

export const tables = schema;

// export function useWsDb() {
//   return wsDb;
// }

// export function useHttpDb() {
//   return httpDb;
// }

export function useDb() {
  return useDbInstance();
}