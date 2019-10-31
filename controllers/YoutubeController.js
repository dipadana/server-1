const YoutubeAPI = require('../apis/YoutubeAPI')
const ParallelDotsAPI = require('../apis/ParallelDotsAPI')
const TmdbAPI = require('../apis/TmdbAPI')

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
        console.log(text, process.env.PARALLELDOTS_KEY)
        ParallelDotsAPI({
            method: 'POST',
            url: '/v5/emotion',
            data: {
                text, 
                api_key : process.env.PARALLELDOTS_KEY
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
            console.log(data)
            res.json(data)

            /* Panggil TMDB */
        })
        .catch (err => {
            console.log(err, 'err')
            res.json(err)
        })
    }

    static findMovie (req, res, next) {
        TmdbAPI({
            method: 'get',
            url: `/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&with_genres=80`
        })
        .then (({ data }) => {
            res.status(200).json(data)
        })
        .catch (err => {
            res.status(500).json(err)
        })
    }
}

module.exports = YoutubeController