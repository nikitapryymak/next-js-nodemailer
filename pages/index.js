import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { sendContactForm } from "../lib/api";

const initValues = { name: "", email: "", subject: "", message: "" };

const initState = { isLoading: false, error: "", values: initValues };

export default function Home() {
  const toast = useToast();
  const [state, setState] = useState(initState);
  const [touched, setTouched] = useState({});

  const { values, isLoading, error } = state;

  const onBlur = ({ target }) =>
    setTouched((prev) => ({ ...prev, [target.name]: true }));

  const handleChange = ({ target }) =>
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));

  const onSubmit = async () => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    try {
      await sendContactForm(values);
      setTouched({});
      setState(initState);
      toast({
        title: "Message sent.",
        status: "success",
        duration: 2000,
        position: "top",
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message,
      }));
    }
  };

  return (
    <>
      <Head>
        <title>Email tester</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        /**
         * The code below is a simple HTML form that does NOT rely upon any UI components. Take notice of
         * each input tag. They each have a 'value' field that is equal to 'value.X', where 'X' the tag's
         * name. Remember what the variable 'value' is: it is a reference to the state property it the
         * useState instance. We want the value of each tag to be equal to the value of the current 
         * state, which was called 'state'. Because 'values' is equal to the current state, we can
         * reference the fields of initValues directly through the variable 'values', as opposed of
         * doing 'state.values' every time. 
         * 
         * However, input tags are not able to change their state on their own, so each input tag
         * also needs an 'onChange' field to able to update their state. Each input calls the
         * function 'handleChange' every time it is changed.
         */
      }
      <main>
       <h1>Contact:</h1>
       <form>
        <fieldset>
          <legend>Input fields:</legend>
          <div>
            <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" value={values.name} onChange={handleChange} required/>
          </div>
          <div>
          <label htmlFor="subject">Subject:</label>
            <input type="text" id="sub" name="subject" value={values.subject} onChange={handleChange} required/>
          </div>
          <div>
          <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={values.email} onChange={handleChange} required/>
          </div>
          <div>
          <label htmlFor="message">Message:</label>
            <textarea type="text" id="message" name="message" value={values.message} onChange={handleChange} required/>
          </div>
          <div>
          <label htmlFor="submit">Submit info:</label>
            <button onClick={onSubmit} disabled={!values.name || !values.subject || !values.email || !values.message}>Submit</button>
          </div>
        </fieldset>
      </form>
      </main>
    </>
  )
}