/**
 * Sample code to guide the AP Pro Inc team at the COD CS club in Nodemailer,
 * based off of this video: https://www.youtube.com/watch?v=t2LvPXHLrek&t=960s
 */
import Head from 'next/head'
import { useState } from 'react'
import { sendContactForm } from '/lib/api';

//This const creates an initial set of values (an object), all of whom are empty, for the upcoming useState instance
const initValues = {
  name:"", 
  subject:"",
  email:"",
  message:""
}

//This sets the value of "values" equal to initVlaues, or in other words, equal to empty parameters for all values
const initState = {values:initValues}

export default function Home() {

  /**
   * we call the useState hook to be able to update the state of the input fields, where 'state' is the current state,
   * 'setState' is the value we are updating to, and 'initState' (which we discussed before) is the initial value being passed
   */
  const [state, setState] = useState(initState);
   //we can assign 'values' to equal the current state of our field (as defined in line 24)
   
  const {values} = state;

  /**
   * (It might make more sense to read the second paragraph's comment beneath the </Head> tag first to understand this better)
   * This function handles the change of the input fields. It calls upon 'setState' from our instance of
   * useState to pass a function whose parameter is the old state, called 'prev'.
   */
  const handleChange = ({target}) => 
    setState((prev) => ({
      /**
       * The ellipse operator is a Javascript syntax feature that allows use 'spread syntax',
       * basically, its used as a sort of implication that we are smearing the some value to
       * every member of some sort of data structure (indexes in an array for example)
       * This article uses some good examples (make sure you're looking at the 'spread syntax' portion,
       * although its good to know both): https://betterprogramming.pub/javascript-ellipses-the-spread-and-rest-syntax-c12df294548d
       * The reason why we are doing this is to retain any properties within the initState object
      */
      ...prev, 
      //we are now overriding the values property
      values:{
        //spread out the previous state's values, so if only on property is updated ('name' for example) - the rest don't get wiped
        ...prev.values,
        /**
         * we use 'target' as a dynamic variable of sorts (notice we passed it in this function).
         * Notice each input tag in the code below has a 'name' property. Whatever that 'name' 
         * proerty is equal to, we can set equal to 'target'. Then, we can assign that target a value.
         */
        [target.name]: target.value
      }
  }));

  /**
   * This is what is called when we click the 'submit' button at the bottom of the form. 
   * Notice the 'async' and 'await' keywords - they are foundational in REST API's.
   * Essentially, these keywords are used to resolve promises in Javascript. 
   * 'sendContactForm' is waiting for onSubmit to return a promise, which is activated
   * when the user clicks the button at the buttom of the form (you can think of it as
   * this function's event handler). Here's a quick guide:
   * https://www.geeksforgeeks.org/async-await-function-in-javascript/#
   * 
   */
  const onSubmit = async () => {
    //We pass 'values' - our current state - to sendContactForm (in /lib/api.js)
    await sendContactForm(values);
  }

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