function getCollection(app, name) {
  return app.locals.db.collection(name);
}

module.exports = {
  getCollection,
};

