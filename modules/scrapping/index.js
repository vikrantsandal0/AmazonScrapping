/**
 * Created by vikrant sandal on 09/10/2020.
 */
'use strict';
const validator = require('./validator');
const routeHandler = require('./routehandler');
const cache = require('./cache');


app.post('/scrapurl', validator.scrapurl, cache.scrapurl ,routeHandler.scrapurl);