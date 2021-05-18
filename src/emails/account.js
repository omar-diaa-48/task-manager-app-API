const sgMail = require('@sendgrid/mail');
const sgMailAPIKey = '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'
sgMail.setApiKey(sgMailAPIKey)
sgMail.send({
    to:'omardiaaelwakeel@gmail.com',
    from:'iv_3422@hotmail.com',
    subject:'test-email',
    text:'This is a test email. You can dumb it'
})