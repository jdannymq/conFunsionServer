const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Leaders = require('../models/leaders');

const leadersRouter = express.Router();
leadersRouter.use(bodyParser.json());

leadersRouter.route('/')
    .get((req, res, next) => {
        console.log('Estoy en get leaders');
        Leaders.find({}).then((leaders) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(leaders);
                },
                (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        console.log('Estoy en Post leaders');
        Leaders.create(req.body).then((leader) => {
                    console.log('leader created', leader);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(leader);
                },
                (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        console.log('Estoy en put');
        res.statusCode = 403;
        res.end('PUT operation not supported on /leaders');
    })
    .delete((req, res, next) => {
        console.log('Estoy en delete');
        Leaders.remove({})
            .then((resp) => {
                    console.log('leader remove', resp);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(resp);
                },
                (erro) => next(err))
            .catch((err) => (err));
    })


leadersRouter.route('/:leaderId')
    .get((req, res, next) => {
        console.log('Will send details dof the leader: ' + req.params.leaderId + ' to you!');
        Leaders.findById(req.params.leaderId)
            .then((leader) => {
                    if (leader != null) {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(leader);
                    } else {
                        err = new Error('Leader ' + req.params.leaderId + ' not found');
                        err.statusCode = 404;
                        return next(err);
                    }
                },
                (err) => next(err))
            .catch((err) => next(err));

    })
    .post((req, res, next) => {
        console.log('Estoy en Post con leaders');
        res.statusCode = 403;
        res.end('POST operation not supported on /leaders/' + req.params.leaderId);
    })
    .put((req, res, next) => {
        console.log('Updating the leader: ' + req.params.leaderId);
        Leaders.findByIdAndUpdate(req.params.leaderId, {
                $set: req.body
            }, { new: true })
            .then((leader) => {
                    console.log('leader update ', leader);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(leader);
                },
                (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        console.log('Deleting leader: ' + req.params.leaderId);
        Leaders.findByIdAndRemove(req.params.leaderId)
            .then((resp) => {
                    console.log('Deleting leader: ' + req.params.leaderId);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(resp);
                },
                (err) => next(err))
            .catch((err) => next(err));
    });


module.exports = leadersRouter;