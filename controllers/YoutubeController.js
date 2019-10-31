const YoutubeAPI = require('../apis/YoutubeAPI')
const ParallelDotsAPI = require('../apis/ParallelDotsAPI')

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

        ParallelDotsAPI({
            method: 'GET',
            url: '/v5/emotion',
            data: {
                text, 
                api_key = process.env.PARALLELDOTS_KEY
            }
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
            console.log(emotion)

            /* Panggil TMDB */
        })


    }
}

module.exports = YoutubeController