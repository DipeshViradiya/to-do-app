var express = require('express');
const app = express();

var hbs = require('hbs');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

var path = require('path');
var db = require('./db');
var viewPath = path.join(__dirname, './templates/view');

var {requireAuth} = require('./middleware/authMiddleware')

app.use(express.urlencoded({extended : false}));
app.set('view engine', 'hbs');
app.set('views',viewPath);
hbs.registerHelper('dateFormat', require('handlebars-dateformat'));

var routers = require('./routers/routers');
const authController = require('./controllers/authControllers');


app.use('/', routers);

// app.get('/', (req, res) => {
//     res.render('login.hbs');
// })

// app.post('/', (req, res) => {
//     var loginQuery = `select * from users where email = "${req.body.email}"`;
//     db.query(loginQuery, (err, row, field) => {
//         if(err || row.length < 1) {
//             res.status(401).send("Please enter correct email");
//         } else {
//             bcrypt.compare(req.body.password, row[0].password, function(err, result) {
//                 if(err) {
//                     res.redirect('/');
//                 } else {
//                     if(result){
//                         var token = jwt.sign({ email : req.body.email }, 'dipesh', { expiresIn: '1h' });
//                         res.cookie('jwt', token, { httpOnly : true, maxAge : 1000*60*60 });
//                         res.redirect('/todo');

//                     } else {
//                         res.status(401).send("PLease enter correct password");
//                     }
//                 } 
//             });
//         }
//     })
    
// })


// app.get('/signup', (req, res) => {
//     res.render('signup.hbs');
// })

// app.post('/signup', (req, res) => {
//     var email = req.body.email;
//     bcrypt.hash(req.body.password, 8, function(err, hash) {
//         var signupQuery = `insert into users(email, password) values ("${email}","${hash}")`;
//         db.query(signupQuery, (err, result) => {
//         if (err) {
//             throw err;
//         } else {
//                 if(result){
//                     var token = jwt.sign({ email : req.body.email }, 'dipesh', { expiresIn: '1h' });
//                     res.cookie('jwt', token, { httpOnly : true, maxAge : 1000*60*60 });
//                     res.redirect('/todo');

//                 } else {
//                     res.status(401).send("PLease enter correct password");
//                 }
//             } 
//     })
//     });
// })

// app.get('/todo', requireAuth, (req, res) => {
//     var showTasksQuery = "select * from tasks where id in (select distinct id from mapping where email = ? )";
//     db.query(showTasksQuery, [req.email], (err, rows, fields) => {
//         if (err) {
//             throw err;
//         }
//         res.render('index', { tasks : rows });
//     })
// })

// app.get('/todo/create-task', requireAuth, (req, res) => {
//     res.render('create-task');
// })

// app.post('/todo/create-task', requireAuth, function (req, res){
//     var title = req.body.title;
//     var desc = req.body.desc;
//     var createTaskQuery = `insert into tasks(title, detail, created) values ("${title}", "${desc}", now())`;
    
//     db.query(createTaskQuery, function(err, result){
//         if(err) throw err;
//         var createMapQuery = `insert into mapping values("${req.email}","${result.insertId}")`;
//         db.query(createMapQuery, function(err, result){
//             if(err) throw err;
//             res.redirect('/todo');
//         })
//     })
// })

// app.get('/todo/edit-task/:id', requireAuth, (req, res) => {
//     var id = req.params.id;
//     var editQuery = `select * from tasks where id= "${id}"`;
//     db.query(editQuery, function(err, rows, fields) {
//         res.render('edit-task', {task : rows[0]});
//     })
// })

// app.post('/todo/edit-task/:id', requireAuth, (req, res) => {
//     var title = req.body.title;
//     var detail = req.body.desc;
//     var id = req.params.id;
//     var editTaskQuery = `update tasks set title = "${title}" , detail = "${detail}" where id = "${id}"`;
//     db.query(editTaskQuery, function(err, result) {
//         if(err) throw err;
//         res.redirect('/todo');
//     })
    
// })

// app.get('/todo/delete-task/:id', requireAuth, (req, res) => {
//     var id = req.params.id;
//     var deleteTaskQuery = `delete from tasks where id = ${id}`;
//     var deleteMapQuery = `delete from mapping where id = ${id}`;
//     db.query(deleteTaskQuery, (err, result) => {
//         if(err) throw err;
//         db.query(deleteMapQuery, (err, result) => {
//             res.redirect('/todo');
//         })
        
//     })

// })

// app.get('/logout', requireAuth, function(req, res){


//         res.cookie('jwt', '', {maxAge:1});

//         res.redirect('/');

// })

app.listen(7000, (err) => {
    if(err){
        console.log(err);
    } else {
        console.log("Server : 7000");
    }
})