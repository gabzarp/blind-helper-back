var twilio = require('twilio');

const notify={
    sendSms: function(ctx){
        var accountSid = process.env.TWILIO_ACOUNT_SID; // Your Account SID from www.twilio.com/console
        var authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console
        
        var client = new twilio(accountSid, authToken);
        var user;
        return ctx.db.collection('user').findOne({'serial': ctx.params.id})
        .then((res)=>{
            user = res
            return ctx.db.collection("contact").find({"user": res._id.toString()}).toArray()
        })
        .then((results)=>{
            results.forEach(contact => {
                client.messages.create({
                    body: contact.name + ', ' + user.name + ' acabou de acionar o botão de panico em seu blind helper. Link para localização: https://www.google.com/maps/place/' + ctx.params.lat +',' + ctx.params.lon,
                    to: '+55' + contact.phone.replace('(','').replace(')','').replace(' ','').replace('-',''),  // Text this number
                    from: process.env.TWILIO_PHONE // From a valid Twilio number
                })
                .then((message)=>{
                    console.log(message)
                })
            })
        })
    }
}
module.exports = notify;