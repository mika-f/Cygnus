import { abspath } from "./utils";

const ROOT_PATH: string = `${process.env.XDG_CONFIG_HOME || abspath("~/.config")}/cygnus/`;
const ADDRESSES_PATH: string = `${ROOT_PATH}addresses.json`;

export {
  ROOT_PATH,
  ADDRESSES_PATH
};
