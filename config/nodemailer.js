/**
 * The purpose of this file is configuring nodemailer to be used. It requires two functions:
 * the 'transporter', and 'mailOptions'. The transporter is a nodemailer object that allows us
 * to send mail, and 'mailOptions' is a data structure that contains the information pertaining
 * from whom the mail is from, and to whom it is going to.
 * I reccomend glossing over the nodemailer documentation:
 * https://nodemailer.com/about/
 */
import nodemailer from "nodemailer";

/**
 * It is a security risk to leave sensitive data such as passwords as plain text in backend files.
 * A qucik and easy solution is to abstract the data in a .env file. These are special files that
 * hold environment variables, which are normally named using all uppercase lettering. In runtime,
 * these two constants (email & pass), values' are replaced with the environment variables variables
 * described in .env.local. sample.env runs when the code is production, whereas .env.local is executed
 * only in development (such is the case when we run 'npm run dev'). I reccomened this article to understand 
 * environment variables better (in the context of backend Javascript): 
 * https://medium.com/chingu/an-introduction-to-environment-variables-and-how-to-use-them-f602f66d15fa
 */
const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

//We are creating our nodemailer transporter object and exporting it to use in other files
export const transporter = nodemailer.createTransport({
  /**
   * Nodemailer allows us a couple options, but because AP PRO Inc uses a gmail account,
   * we are using the gmail service. Nodemailer comes pre-packaged with SMTP connection
   * details to a breadth of email services, and gmail is one of them. This is why we
   * don't really need to mess with SMTP configuration ourselves:
   * https://nodemailer.com/smtp/well-known/
   */
  service: "gmail",
  /**
   * Gmail is famously not super secure, so we need to set up some extra intialization to allow
   * users to send messages to gmail accounts with 2FA enabled (as the AP Pro Inc gmail is).
   * We pass the user as 'email' from our .env, and since the pass has the same name as the 
   * const that references the environment variable EMAIL_PASS (the email's application password),
   * In other words, we are doing 'pass,' instead of 'pass: pass,' - they mean the same thing
   */
  auth: {
    user: email,
    pass,
  },
});

/**
 * Export a const variable containing the information that expresses to from whom and to whom
 * the mail is going from and to. Here, we have them both equal to 'email', AKA, any mail
 * AP Pro Inc recieves they will recieve from themselves, but the email content within will
 * contain the gmail account of the sender (as its required in the form).
 */
export const mailOptions = {
  from: email,
  to: email,
};
