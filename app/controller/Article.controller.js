
var initModels = require("../../models/init-models");
const sequelize = require('../config/database');
var models = initModels(sequelize);

const getArticle = async (req, res) => {
    try {
        const sendToDB = await models.tb_article.findAll({})

        res.json({
            status: 200,
            message: 'success',
            result: sendToDB

        })

        if (sendToDB === null) {
            return res.json({
                status: 404,
                message: 'Not found article'
            })
        }

    } catch (error) {
        res.json({ status: 500, message: 'failed' })
    }
};

const getArticleFindById = async (req, res) => {

    try {
        const sendToDB = await models.tb_article.findOne({
            where: {
                article_id: req.query.article_id
            }
        })

        if (sendToDB === null) {
            return res.json({
                status: 404,
                message: 'Not found article_id :' + req.query.article_id
            })
        }

        res.json({
            status: 200,
            message: 'success',
            result: sendToDB

        })
    } catch (error) {
        res.json({ status: 500, message: 'failed' })
    }
};

const insertArticle = async (req, res) => {

    try {
        const sendToDB = await models.tb_article.create(
            {
                user_id: req.body.user_id,
                description: req.body.description
            }
            , {
                fields: [
                    'user_id',
                    'description'
                ]
            });
        res.json({
            status: 200,
            message: 'insert success article success'
        })
    } catch (error) {
        res.json({ status: 500, message: 'insert article failed' })
    }

};

const editArticle = async (req, res) => {

    try {
        const sendToDB = await models.tb_article.update(
            {
                description: req.body.description
            },
            {
                where: {
                    article_id: req.body.article_id
                }
            });

        res.json({
            status: 200,
            message: 'edit success article success'
        })

    } catch (error) {
        res.json({ status: 500, message: 'edit article failed' })
    }
};

module.exports = {
    getArticle,
    getArticleFindById,
    insertArticle,
    editArticle
};


