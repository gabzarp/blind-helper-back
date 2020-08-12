const bcrypt = require('bcryptjs');
const user={
    getAllUsers: (ctx)=>{
        return ctx.db.collection("user").find().toArray()
        .then((results)=>{
            ctx.body = results
            ctx.status = 200
        })
    },
    createUser: (ctx) => {
        return bcrypt.hash(ctx.request.body.password, 10)
        .then((hash)=>{
            ctx.request.body.password = hash;
            return ctx.db.collection('user').insertOne(ctx.request.body)  
        }) 
        .then((results) => {
            ctx.body = results;
            ctx.status = 200;
        })
        .catch(err => { ctx.body = 'error: ' + err; ctx.status = 500; })            
    },
    login: (ctx) => {
        return ctx.db.collection('user').findOne({ "email": ctx.request.body.email })
        .then(result=>{
            if (result == null){
                return false
            }
            return { status: bcrypt.compare(ctx.request.body.password ,result.password), user: result }
        })
        .then(res => {
            console.log(res)
            if (res.status) {
                ctx.body = res.user
            }
            else{
                ctx.body = res;
            }
            ctx.status = 200;
        })
        .catch(err => { ctx.body = 'error: ' + err; ctx.status = 500; })
    },
}

module.exports=user