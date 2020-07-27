const sendgridAPIkey='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'
const sgMail=require('@sendgrid/mail')
sgMail.setApiKey(sendgridAPIkey);
const Welcome=(email,name)=>{
    console.log("hii")
  const msg = {

    to: email,
    from: 'faizhaq241@gmail.com',
    subject: 'Thanks for joining',
    text: 'Hi there ${name} '
  };
  sgMail.send(msg);
}

module.exports={
  Welcome
}
