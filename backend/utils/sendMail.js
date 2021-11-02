const nodeMailer=require('nodemailer');
const sendMail=async(options)=>{
    const transporter=nodeMailer.createTransport({
        // host:process.env.SMTP_HOST,
        // port:465,
        service:process.env.SMPT_SERVICE,
        auth:{
            user:process.env.SMTP_EMAIL,
            pass:process.env.SMTP_PASSWORD,
        }
    });

    const mailOptions={
        from:process.env.SMTP_EMAIL,
        to:options.user,
        subject:options.subject,
        text:options.message
    }
    await transporter.sendMail(mailOptions);
}
module.exports=sendMail;