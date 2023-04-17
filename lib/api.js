/**
 * This is an async function that is exported as a variable, which is responsible for parsing data from
 * the frontend to the backend (specifcally, from pages/index.jsx to pages/api/contact.js). The 'data' 
 * arguement is the variable 'values' from the frontend, which if you'll remember, is a variable that
 * references the current state of the form input.
 */

export const sendContactForm = async (data) =>
  fetch("/api/contact", {
  /**
   * This is an async function that is exported as a variable, which is responsible for parsing data from
   * the frontend to the backend (specifcally, from pages/index.jsx to pages/api/contact.js). The 'data' 
   * arguement is the variable 'values' from the frontend, which if you'll remember, is a variable that
   * references the current state of the form input.
   */
    method: "POST",
    /**
     * Normally, data is parsed as a JSON object, so order to manipulate the passed arguement as a string
     * (which we would want to do since we're sending an email), we need to call upon the 'stringify'
     * function, which does exactly what is sounds. The 'data' (which remember, is the current state of
     * the form as repersented by the passed variable 'values') becomes a data structure of strings
     * and keys, where each string now gets its own key
     */
    body: JSON.stringify(data),
    /**
     * Headers are a property that help web browsers render data. These two headers just make it easier
     * to parse JSON
     */
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    /**
     * After we have finished fetching from /api/contact, we 'then' (a Javascript keyword that can
     * be thought of in the same vein as the 'continue' keyword) check if the response is not ok -
     * where 'res' is a HTTP object that comes bundled with properties - such as .ok. If the response
     * is not ok, send an error stating the message failed to send. Else, return the JSON of the response.
     */
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to send message");
    return res.json();
  });
