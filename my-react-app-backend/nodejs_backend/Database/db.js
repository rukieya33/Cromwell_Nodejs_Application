'use strict';

const db = require('rethinkdb');


db.table('Register').insert([{ name: 'Star Trek TNG', episodes: 178 },
{ name: 'Battlestar Galactica', episodes: 75 }])