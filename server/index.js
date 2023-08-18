const api = require('./api')
const port = process.env.PORT || 5432

api.listen(port, () => {
    console.log(`API running on port ${port}`)
})
