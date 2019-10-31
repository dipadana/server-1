const YoutubeAPI = require('../apis/YoutubeAPI')

class YoutubeController {
    static searchByKeyWords(req, res, next) {
        let { search } = req.params
        YoutubeAPI.get(`/search?part=id&q=${search}&key=${process.env.KEY_API}`)
        .then(({ data }) => {
            console.log(data)
            res.status(200).json(data)
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

module.exports = YoutubeController