const YoutubeAPI = require('../apis/YoutubeAPI')
const ParallelDotsAPI = require('../apis/ParallelDotsAPI')
const qs = require('querystring')

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
    static findByEmotion (req, res, next) {
        const { text } = req.body
        let reqData = {
            text : text,
            api_key : process.env.PARALLELDOTS_KEY
        }
        ParallelDotsAPI({
            method: 'POST',
            url: '/v5/emotion',
            data: qs.stringify(reqData)
        })
        .then(({ data }) => {
            let emotion
            let dominant = 0
            for(let key in data.emotion){
                if(data.emotion[key]>dominant){
                    dominant = data.emotion[key]
                    emotion = key
                }
            }
            res.status(200).json(emotion)

            /* Panggil TMDB */
        })
        .catch(console.log)


    }
}

module.exports = YoutubeController