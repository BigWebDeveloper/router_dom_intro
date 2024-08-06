import { getContacts } from "../contacts";

export const Loader = async () => {
    const contacts = await getContacts();
    return { contacts };
}