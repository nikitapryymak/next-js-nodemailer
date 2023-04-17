/**
 * In Next.js, all files within the api folder is treated as an API endpoint instead of a page.
 * This allows us to seemesly write backend code without interupting the processes of frontend.
 * I reccomend vercel's documentation on this: https://nextjs.org/docs/api-routes/introduction
 * contact.js serves the purpose of:
 * 1) receiving the form data
 * 2) constructing an email with said data
 * 3) sending the data to the proper email endpoint
 * 
 * Here is another article I highly reccomend reading: https://refine.dev/blog/next-js-api-routes/
 */

//import the nodemailer objects we configured earlier
import { mailOptions, transporter } from "../../config/nodemailer";

/**
 * (I reccomend you read the comments below this function first and come back to this paragraph, it'll
 * probably make more sense then)
 * 
 * This function accepts the arguement 'data', as parsed from /lib/api.js, and then accumaltes the
 * data therewithin to print a long string of data
 */
const generateEmailContent = (data) => {
  /**
   * 'stringData' is our accumlator variables, we will append text to it recursivley until it is done.
   */
  const stringData = Object.entries(data).reduce(
    (str, [key, val]) =>
      (str += `${key}: \n${val} \n \n`),"");
  return {
    text: stringData,
    //optional html data
  };
};

/**
 * This 'handler' function is responsible for handling the requests made to this endpoint (contact.js, that is).
 * It has two arguements: 'req' and 'res' (these should be familiar if you've ever worked with Express.js or
 * Node). 'req' is an instance of the incoming HTTP request, and 'res' is an instance of the HTTP server 
 * response. These two instances come bundled with some convientnet middleware that allows us to parse &
 * manipulate our data better.
 */
const handler = async (req, res) => {
  /**
   * Check if our HTTP request is a POST method. If it is - execute the code within the function.
   * Else, return a 400 HTTP error code of 'bad request'. In other words: "if this ain't a POST
   * method, something has gone wrong - don't execute the code any further and tell the server
   * there has been some sort of bad request error"
   */
  if (req.method === "POST") {
    //'req.body' correlates to the whole contents of our request (which is the contents of 'values' from index.jsx)
    const data = req.body;
    //Send an error response if some piece of the body code is empty (in the case someone submitted missing info somehow)
    if (!data || !data.name || !data.email || !data.subject || !data.message) {
      return res.status(400).send({ message: "Bad request" });
    }

    /**
     * Our 'transporter' object was already constructed in /config/nodemailer, remember it is a 
     * nodemailer object. We call the 'sendMail' function from nodemailer to actually send our 
     * data. We put within a try/catch block to try to send the mail first, and to catch &
     * errors we encoutner, and then return a bad status with a json message reporting the error.
     * We 'await' transporter.sendMail() because our handler function is asynchronous, and we need
     * to wait to return our promise.
     */
    try {
      await transporter.sendMail({
        //spread out mailOptions, which if you'll remember, is a data structure containing who the mail is from, and to who its going to
        ...mailOptions,
        /**
         * Call the generateEmailContent, which accepts data as its arguement (which we passed in /lib/api.js).
         * The function will return our the value of the nodemailer 'text' property (which needs to be to be
         * filled non empty if we want the email sent to actually contain the form data). This function can
         * also be configured to return HTML elements as well, as more thoroughly explained in the
         * video tutorial in index.js.
         */
        ...generateEmailContent(data),
        //The 'subject' property is a nodemailer property that fills the subject of the email. We pass it with our 'subject' field from 'data'.
        subject: data.subject,
      });
      //If the email was sent A-OK: send a HTTP 200 response of "everything went good"
      return res.status(200).json({ success: true });
      //catch the error, log it, and display its JSON contents:
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  }
  return res.status(400).json({ message: "Bad request" });
};

export default handler;