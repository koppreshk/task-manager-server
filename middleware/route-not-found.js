const notFound = (req,res) => res.status(404).send('Route does exist');

module.exports = notFound;