const logger = (req, res, next) => {
    if (process.env.VERCEL_ENV !== 'test') {
        console.log(req.method, '->', req.originalUrl, ',Body:', req.body, ',Params:', req.params, ',Query:', req.query)
    }
    next()
}

module.exports = logger
