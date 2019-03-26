const db = require('../dbConfig');

const get = () => db('zoos');

const getById = id =>
  db('zoos')
    .where({ id })
    .first();

const insert = zoo =>
  db('zoos')
    .insert(zoo)
    .then(ids => getById(ids[0]));

const update = (id, changes) =>
  db('zoos')
    .where({ id })
    .update(changes);

const remove = id =>
  db('zoos')
    .where({ id })
    .del();

module.exports = {
  get,
  getById,
  insert,
  update,
  remove
};

