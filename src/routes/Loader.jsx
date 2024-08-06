import { createContact, getContacts } from "../contacts";


export const Loader = async () => {
    const contacts = await getContacts();
    return { contacts };
}

export const Action = async () => {
    const contact = await createContact();
    return { contact };
}