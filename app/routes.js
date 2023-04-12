import { Router } from 'express';

const routes = new Router();
const Upload = require('./controller/Upload.controller');
const Auth = require('./controller/Auth.controller');
const Article = require('./controller/Article.controller');
const User = require('./controller/User.controller');
const authenticateToken = require('./middleware/auth');


routes.get("/", (req, res) => {
    res.render('index');
})

//upload
routes.post("/upload", authenticateToken, Upload.upload);
// routes.get("/files", Upload.getListFiles);

routes.get("/getArticle", authenticateToken, Article.getArticle);
routes.get("/getArticleFindById", authenticateToken, Article.getArticleFindById);
routes.post("/insertArticle", authenticateToken, Article.insertArticle);
routes.post("/editArticle", authenticateToken, Article.editArticle);

//user
routes.get("/getProfileUser", authenticateToken, User.getProfileUser);
routes.get("/getProfileUserFindById", authenticateToken, User.getProfileUser);
routes.post("/editProfileUser", authenticateToken, User.editProfileUser);

//Auth
routes.post("/login", Auth.login);
routes.post("/register", Auth.register);
routes.get("/token", Auth.token);
routes.delete("/logout", Auth.logout);


export default routes;