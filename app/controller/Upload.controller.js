
const fs = require("fs");
const formidable = require('formidable');
var initModels = require("../../models/init-models");
const sequelize = require('../config/database');
var models = initModels(sequelize);

const upload = async (req, res) => {

  let form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, file) {
    let filepath = file.fileupload.filepath;
    let newpath = __basedir + "/resources/static/assets/uploads/"
    newpath += file.fileupload.originalFilename;

    const updatePicture = await models.tb_user.update({
      user_id: req.body.user_id,
      username: req.body.username,
      user_pic_path: "/resources/static/assets/uploads/" + file.fileupload.originalFilename,
    },
      {
        where: {
          user_id: req.body.user_id,
        }
      })

    fs.rename(filepath,newpath,function() {
      res.send("upload success");
    })
  })
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