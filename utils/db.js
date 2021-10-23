const faunadb = require('faunadb')
export const q = faunadb.query

import config from '../configs/faunaConfig'

//Criando client
export const client = new faunadb.Client({
    secret: config.secret,
})