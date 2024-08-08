import { createContact, getContact, getContacts } from "../contacts";



export const Loaders = async () => {
    const contacts = await getContacts();
    return { contacts };
}

export const Action = async () => {
    const contact = await createContact();
    return { contact };
}

export const Loader = async ({params}) => {
    const contact = await getContact(params.contactId);
    return { contact };
}

