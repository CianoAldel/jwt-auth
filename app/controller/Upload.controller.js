const uploadFile = require("../middleware/upload");
const fs = require("fs");
const baseUrl = "http://localhost:3000/static/assets/uploads/";
var initModels = require("../../models/init-models");
const sequelize = require('../config/database');
var models = initModels(sequelize);

const upload = async (req, res) => {
  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file" });
    }

    const findUserId = await models.tb_user.findOne({
      where: {
        user_id: req.query.user_id
      }
    })

    if (findUserId !== null) {
    const updateUserPicture = await models.tb_user.update({
      user_pic_path: "/resources/static/assets/uploads/" + req.file.originalname,
    },
      {
        where: {
          user_id: req.query.user_id,
        }
      })
      res.status(200).send({
        message: "Uploaded the file successfully: " + req.file.originalname,
      });

    }else{

      res.status(500).send({
        message: `Could not upload the file: don't have user_id ${req.query.user_id}`,
      });
    }

  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};



module.exports = {
  upload,
  getListFiles,
  download,
};