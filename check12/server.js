const exp = require('express');
const app = exp();
const session = require('express-session');
const users = require('./db').usersDB;
const passport = require('./passport');

app.use(exp.json());
app.use(exp.urlencoded({extended:true}));

app.use(passport.initialize());
app.use(passport.session());

app.use(session({
    secret : 'qwertyuiop',
    resave: false,
    saveUninitialized: true,
}));

app.use('/',exp.static(__dirname + '/public'));

app.use('/signup',exp.static(__dirname + '/public/Sign'));

app.use('/success',exp.static(__dirname + '/public/OK'));

app.post('/login',passport.authenticate('local',{failureRedirect : '/signup'}),function(req,res){
    console.log("Logging In : " + req.user.username);
    return res.redirect('/success');
});

app.listen(7891,()=>{
    console.log('Server started at http://localhost:7891/');
})
