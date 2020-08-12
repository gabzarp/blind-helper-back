const mongo = require('koa-mongo')

const user={
    getAllContacts: (ctx)=>{
        return ctx.db.collection("contact").find()
        .then((results)=>{
            ctx.body = results
            ctx.status = 200
        })
    },
    getContactsByUser: (ctx)=>{
        return ctx.db.collection("contact").find({"user": ctx.params.id}).toArray()
        .then((results)=>{
            ctx.body = results
            ctx.status = 200
        })
    },
    createContact: (ctx) => {
        return ctx.db.collection('contact').insertOne(ctx.request.body)  
        .then((results) => {
            ctx.body = results;
            ctx.status = 200;
        })
        .catch(err => { ctx.body = 'error: ' + err; ctx.status = 500; })            
    },
    deleteContact: (ctx) => {
        return ctx.db.collection('contact').deleteOne({"_id": mongo.ObjectID(ctx.params.id)})  
        .then((results) => {
            ctx.body = results;
            ctx.status = 200;
        })
        .catch(err => { ctx.body = 'error: ' + err; ctx.status = 500; })            
    }
}

module.exports=user