const express =require('express')
const crors =require('cors')
const dbconn =require('./db/db')
const cookieSession = require('cookie-session')
const passportSetup = require("./passport");
const path =require('path')
const passport = require("passport")
const authRoutes = require('./router/auth')
const routes =require('./router/index')
const app  =express()

app.use(express.urlencoded({extended:false}))
app.use(express.json())


app.set('views','template')
app.set('view engine','ejs')

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: ["codesoftic"],
      resave: false,
      saveUninitialized: true,
      secret: 'SECRET'
    })
  );


app.use(passport.initialize());
app.use(passport.session());



app.use('/auth',authRoutes)
app.use('/api',routes)

app.listen(5000,()=>{
    console.log("Server Is runnig is 5000")
})