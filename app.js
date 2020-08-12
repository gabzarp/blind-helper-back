const logger = require('koa-logger');
const Koa = require("koa")
const Router = require("koa-router")
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const User = require("./controllers/UserController")
const Contact = require("./controllers/ContactController")


const mongo = require('koa-mongo')

const app = new Koa();
const router = new Router();

app.use(cors());

app.use(bodyParser());

app.use(logger());

app.use(mongo({
    host: 'localhost',
    port: 27017,
    db: 'robotica-maluca',
    authSource: 'admin',
    max: 100,
    min: 1
}));

router.get("/users",User.getAllUsers)
.post("/user",User.createUser)
.post("/login",User.login)
.get("/contact",Contact.getAllContacts)
.get("/contact-by-user/:id", Contact.getContactsByUser)
.post("/contact",Contact.createContact)
.delete("/contact/:id",Contact.deleteContact)
.get("/notify/:id",(ctx)=>{ctx.body = ctx.params.id})

app.use(router.routes())
app.listen(3001);
