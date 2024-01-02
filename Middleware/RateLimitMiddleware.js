const rateLimit = require('express-rate-limit')

const RateLimiter = (timeWindow, maxRequests) => {
    const limiter = rateLimit({
        windowMs: timeWindow,
        max: maxRequests,
        message: `Ha excedido el límite de ${maxRequests} solicitudes en ${timeWindow / 1000} segundos. Inténtelo de nuevo más tarde.`
    })

    return (req, res, next) => {
        if ((process.env.VERCEL_ENV === 'test') || (process.env.VERCEL_ENV === 'local')) { return next() }
        limiter(req, res, (err) => {
            if (err) {
                return res.status(429).send(err.message)
            }
            return next()
        })
    }
}

module.exports = RateLimiter
