import { redirect } from "react-router-dom";
import { deleteContact } from "../contacts";

export const Action = async ({ params }) => {
//   throw new Error("oh dang!");
  await deleteContact(params.contactId);
  return redirect("/");
};
