const sgMail = require('@sendgrid/mail');
// const sgMailAPIKey = process.env.SGMAILAPIKEY
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to:email,
        from:'iv_3422@hotmail.com',
        subject:`Welcome ${name} to task-manager`,
        text:`Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
    console.log(`${email}, ${name}`);
}

const sendFollowCancelEmail = (email, name) => {
    sgMail.send({
        to:email,
        from:'iv_3422@hotmail.com',
        subject:`Sorry to see you leave ${name} :(`,
        text:`Please let us know why did you leave, so we can provide better service next time. Thanks for the good times :)`
    })
    console.log(`${email}, ${name}`);
}

module.exports = {
    sendWelcomeEmail,
    sendFollowCancelEmail
}