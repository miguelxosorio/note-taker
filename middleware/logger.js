// middleware - ex. logs http://localhost:3000/api/notes for app.get
const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

module.exports = logger;