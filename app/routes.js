import { Router } from 'express';

const routes = new Router();
const Upload = require('./controller/Upload.controller');
const Auth = require('./controller/Auth.controller');
const authenticateToken = require('./middleware/auth');




routes.get("/", (req, res) => {
    res.render('index');
});


routes.get("/home",(req, res) => {
    
    res.render('home')
});

routes.get("/register", (req, res) => {
    res.render('register');
})

//upload
routes.post("/upload", Upload.upload);
routes.get("/files", Upload.getListFiles);


//login

routes.get('/posts', authenticateToken, (req, res) => {
    res.json({
        status: true
    })
})

routes.get("/token", Auth.token);
routes.post("/login", Auth.login);
routes.post("/register", Auth.register);
routes.delete("/logout", Auth.logout);




export default routes;