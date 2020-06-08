const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Promotions = require('../models/promotions');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());


promoRouter.route('/')
    .get((req, res, next) => {
        console.log('Estoy en Get promotions');
        Promotions.find({}).then((promotions) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(promotions);
                },
                (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        console.log('Estoy en Post promotions');
        Promotions.create(req.body).then((promotion) => {
                    console.log('promotion created', promotion);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(promotion);
                },
                (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        console.log('Estoy en put de promotions');
        res.statusCode = 403;
        res.end('PUT operation not supported on /promotions');
    })
    .delete((req, res, next) => {
        console.log('Estoy en delete');
        Promotions.remove({})
            .then((resp) => {
                    console.log('promotion remove', resp);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(resp);
                },
                (erro) => next(err))
            .catch((err) => (err));
    })


promoRouter.route('/:promoId')
    .get((req, res, next) => {
        console.log('Will send details dof the promo: ' + req.params.promoId + ' to you!');
        Promotions.findById(req.params.promoId)
            .then((promotion) => {
                    if (promotion != null) {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(promotion);
                    } else {
                        err = new Error('Promotion ' + req.params.promoId + ' not found');
                        err.statusCode = 404;
                        return next(err);
                    }
                },
                (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        console.log('Estoy en Post con promociones');
        res.statusCode = 403;
        res.end('POST operation not supported on /promotions/' + req.params.promoId);
    })
    .put((req, res, next) => {
        console.log('Updating the promo: ' + req.params.promoId);
        Promotions.findByIdAndUpdate(req.params.promoId, {
                $set: req.body
            }, { new: true })
            .then((promotion) => {
                    console.log('promotion update ', promotion);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(promotion);
                },
                (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        console.log('Estoy en delete con promociones');
        Promotions.findByIdAndRemove(req.params.promoId)
            .then((resp) => {
                    console.log('Deleting promo: ' + req.params.promoId);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(resp);
                },
                (err) => next(err))
            .catch((err) => next(err));
    });


module.exports = promoRouter;