const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = async(email, name) => {
   sgMail.send({
    to: email,
    from: 'nawaca4339@dineroa.com',
    subject: 'Thanks for joining in!',
    text: `Welcome to the app, Mr.${name}!`,
   })
}

const cancelEmail = async(email, name) => {
    sgMail.send({
     to: email,
     from: 'nawaca4339@dineroa.com',
     subject: 'We are sorry to see you go!',
     text: `We hope to see you back soon, Mr.${name}!`,
    })
 }

module.exports = {
    sendWelcomeEmail,
    cancelEmail
}

// sgMail.send({
//     to: 'nawaca4339@dineroa.com',
//     from: 'nawaca4339@dineroa.com',
//     subject: 'This is first send grid email fire testing',
//     text: 'This is first send grid email fire testing',
// }).then(()=>{

// }).catch((error)=>{
//   console.log(error)
// })
