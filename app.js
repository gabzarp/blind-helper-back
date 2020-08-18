const logger = require('koa-logger');
const Koa = require("koa")
const Router = require("koa-router")
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const User = require("./controllers/UserController")
const Contact = require("./controllers/ContactController")
const Notify = require("./controllers/NotifyController")


const mongo = require('koa-mongo')

const app = new Koa();
const router = new Router();

app.use(cors());

app.use(bodyParser());

app.use(logger());

app.use(mongo({
    uri: process.env.DB_URI,
    max: 100,
    min: 1
}));

router.get("/users",User.getAllUsers)
.post("/user",User.createUser)
.post("/login",User.login)
.get("/contact",Contact.getAllContacts)
.get("/contact-by-user/:id", Contact.getContactsByUser)
.post("/contact",Contact.createContact)
.post("/helper/:id",User.helperAssociate)
.delete("/contact/:id",Contact.deleteContact)
.get("/notify/:id/:lat/:lon",Notify.sendSms)

app.use(router.routes())
app.listen(process.env.PORT);
