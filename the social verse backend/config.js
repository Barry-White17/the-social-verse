import { v4 as uuidv4 } from "uuid";
import { v7 as uuidv7 } from "uuid";

const JWT_SECRET = uuidv4();
const COOKIE_SIGNATURE = uuidv7();
process.env.JWT_SECRET = JWT_SECRET;
