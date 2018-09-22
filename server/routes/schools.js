const express = require('express');
const aws = require('aws-sdk');
const router = express.Router();
const _ = require('lodash');
const {
    authenticate
} = require('../middleware/authenticate');
const {
    School
} = require('../models/School');

process.env.AWS_ACCESS_KEY_ID='';
process.env.S3_BUCKET ='';
process.env.AWS_SECRET_ACCESS_KEY='';
const S3_BUCKET = process.env.S3_BUCKET;
aws.config.region = '';
//Rotas de registro de escolas

router.post('/register', authenticate, (req, res) => {
    let school = _.pick(req.body, ['name', 'country', 'city', 'optionals', 'infrastructure', 'extras', 'photos']);

    // let photos = req.files.path;

    if (req.isAdmin) {
        School.create(school).then((school) => {
            res.status(200).send(school);
        }, (e) => {
            res.status(400).send(e);
        })
    } else {
        res.status(404).send();
    }
})

router.delete('/:id', authenticate, (req, res) => {
    let id = req.params.id;
    if (req.isAdmin) {
        School.findById(id).then((school) => {
            school.remove().then((school) => {
                res.status(200).send(school);
            }, (e) => {
                res.status(400).send(e);
            })
        })
    }
    else{
        res.status(404).send();
    }
})

router.get('/upload', (req, res) => {
    const s3 = new aws.S3();
console.log("caiu aqui")
 const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];

    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read'
    };
   
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if(err){
        console.log(err);
        return res.end();
      }
   
      const returnData = {      
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
      };

      res.write(JSON.stringify(returnData));
      res.end();
    });
  });

module.exports = router;