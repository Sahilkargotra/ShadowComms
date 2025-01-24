import { Resend } from 'resend';

// if (!process.env.RESEND_API_KEY) {
//   console.error('RESEND_API_KEY is missing');
// }

export const resend = new Resend('re_6S9Veits_F25VDu9jH3ASUa37w3qk2VMm');         // hardcoded the resend  api here because  .env not working 

// resend.emails.send({
//     from: 'onboarding@resend.dev',
//     to: 'kargotrasahil@gmail.com',
//     subject: 'Test Email',
//     html: '<h1>Test</h1>',
//   }).then(response => console.log(response))
//     .catch(error => console.error(error));
// resend.apiKeys.create({ name: 'Production' });



