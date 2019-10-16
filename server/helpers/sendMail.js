import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENGRID_API_KEY);

const sendMail = async (to, from, subject, text) => {
  const msg = {
    to, from, subject, text
  };
  const result = await sgMail.send(msg);

  return result;
};

export default sendMail;
