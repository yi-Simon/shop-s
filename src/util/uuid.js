import { v4 as uuidv4 } from "uuid";

export default function getUUID() {
  let userTempId = localStorage.getItem("USER_TEMPID");
  if (!userTempId) {
    userTempId = uuidv4();
    localStorage.setItem("USER_TEMPID", userTempId);
  }
  return userTempId;
}
