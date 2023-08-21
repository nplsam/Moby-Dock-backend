const api = require('./api')
const PORT = process.env.PORT || 5432

api.listen(PORT, () => {
    console.log(`API running on port ${PORT}`)
})
