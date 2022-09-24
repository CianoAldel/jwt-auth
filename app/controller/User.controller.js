
var initModels = require("../../models/init-models");
const sequelize = require('../config/database');
var models = initModels(sequelize);

const getProfileUser = async (req, res) => {
    try {
        const sendToDB = await models.tb_user.findAll({})

        res.json({
            status: 200,
            message: 'success',
            result: sendToDB

        })

        if (sendToDB === null) {
            return res.json({
                status: 404,
                message: 'Not found user'
            })
        }
        
    } catch (error) {
        res.json({ status: 500, message: 'failed' })
    }
};

const getProfileUserFindById = async (req, res) => {
    try {
        const sendToDB = await models.tb_user.findOne({
            where: {
                user_id: req.query.user_id
            }
        })

        if (sendToDB === null) {
            return res.json({
                status: 404,
                message: 'Not found user_id :' + req.query.user_id
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


const editProfileUser = async (req, res) => {

    try {
        const sendToDB = await models.tb_user.update(
            {
                age: req.body.age,
                email: req.body.email,
                phone: req.body.phone,
            }, 
            {
                where: {
                    user_id: req.body.user_id
                }
            });

        res.json({
            status: 200,
            message: 'edit success profile user success'
        })

    } catch (error) {
        res.json({ status: 500, message: 'edit profile user failed' })
    }
};

module.exports = {
    getProfileUser,
    getProfileUserFindById,
    editProfileUser
};


