import { Outlet, Link, useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";

const Root = () => {
  const { contacts } = useLoaderData();
  const favorite = DOMPurify.sanitize("&#9733");
  console.log(contacts)
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form role="search" id="search-form">
            <input
              type="search"
              aria-label="search contacts"
              placeholder="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true}>
              <div className="sr-only" aria-live="polite"></div>
            </div>
          </form>

          <form method="post">
            <button type="submit">New</button>
          </form>
        </div>
        <nav>
          {contacts.length ? 
          <ul>
          {contacts.map((contact, index) => (
            <li key={index}>
              <Link to={`/contacts/${contact.id}`}>
                {contact.first || contact.last ? (
                  <>
                    {contact.first} {contact.last}
                  </>
                ) : (
                  <i>No Name</i>
                )}{" "}
                {contact.favorite && <span dangerouslySetInnerHTML={{__html: favorite}}/>}
              </Link>
            </li>
          ))}
          </ul> :
          <p>
            <i>
              No Contacts
            </i>
          </p> }
          
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
};

export default Root;
