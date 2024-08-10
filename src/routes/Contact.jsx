import { Form, useLoaderData, useFetcher } from "react-router-dom";

// import avatar from '../assets/you.png'
import DOMPurify from "dompurify";
import { getContact, updateContact } from "../contacts";

export const Loader = async ({params}) => {
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    })
  }
  return { contact };
}

export const Action = async ({request, params}) => {
const formData = await request.formData();
return updateContact(params.contactId, {
  favorite: formData.get("favorite") === "true"
})
}

const Contact = () => {
  const {contact} = useLoaderData();
  
  // const contact = {
  //   first: "Your",
  //   last: "Name",
  //   avatar: avatar,
  //   twitter: "your_handle",
  //   notes: "Some notes",
  //   favorite: true,
  // };


  return (
    <div id="contact">
      <div>
        <img
          src={
            contact.avatar ||
            `https://robohash.org/${contact.id}.png?size=200x200`
          }
          alt="avatar"
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>
        {contact.twitter && (
          <p>
            <a target="_blank" href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        )}
        {contact.notes && <p> {contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            action="destroy"
            method="post"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export const Favorite = (contact) => {
  
  const fetcher = useFetcher();
  const favorite = fetcher.formData ? fetcher.formData.get("favorite"):contact.contact.favorite;
  const entitysecured = DOMPurify.sanitize(favorite ? "&#9733" : "&#9734");
  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorite"}
      >
        <span dangerouslySetInnerHTML={{__html: entitysecured}}/>
      </button>
    </fetcher.Form>
  );
};

export default Contact;
