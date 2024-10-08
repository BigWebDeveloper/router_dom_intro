import {
  Outlet,
  useLoaderData,
  Form,
  redirect,
  NavLink,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import DOMPurify from "dompurify";
import { getContacts } from "../contacts";
import { createContact } from "../contacts";
import { useEffect, useState } from "react";
// import { useEffect } from "react";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";
  const contacts = await getContacts(q);
  return { contacts, q };
};

export const action = async () => {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
};

const Root = () => {
  const { contacts, q } = useLoaderData();
  const navigation = useNavigation();
  const favorite = DOMPurify.sanitize("&#9733");
  const [query, setQuery] = useState(q);
  const submit = useSubmit();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    setQuery(q);
  }, [q]);

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form role="search" id="search-form">
            <input
              type="search"
              aria-label="search contacts"
              placeholder="search"
              className={searching ? "loading" : undefined}
              name="q"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);

                const isFirstSearch = q == null;
                submit(e.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching}>
              <div className="sr-only" aria-live="polite"></div>
            </div>
          </Form>

          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact, index) => (
                <li key={index}>
                  <NavLink
                    to={`/contacts/${contact.id}`}
                    className={({ isActive, ispending }) =>
                      isActive ? "active" : ispending ? "pending" : ""
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && (
                      <span dangerouslySetInnerHTML={{ __html: favorite }} />
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No Contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
};

export default Root;
