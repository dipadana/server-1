const YoutubeAPI = require('../apis/YoutubeAPI')
const ParallelDotsAPI = require('../apis/ParallelDotsAPI')
const TmdbAPI = require('../apis/TmdbAPI')
const qs = require('querystring')

class YoutubeController {
    static searchByKeyWords(req, res, next) {
        let movieId = req.params.movieId
        let temp
        TmdbAPI({
            method: 'get',
            url: `/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
        })
        .then (({ data }) => {
            temp = data
            let id = data.original_title
            return YoutubeAPI.get(`/search?part=id&q=${id}&key=${process.env.KEY_API}`)
        })
        .then(({ data }) => {
            let obj = {
                detailMovie: temp,
                youtubeId: data.items[0].id.videoId
            }
            res.status(200).json(obj)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    }
    
    static findByEmotion (req, res, next) {
        const { text } = req.body
        let reqData = {
            text : text,
            api_key : process.env.PARALLELDOTS_KEY
        }
        let objData = {}
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
            objData['emotion'] = emotion
            // res.status(200).json(emotion)
        let emotObj = {
            happy: [ 36, 28, 99, 10752, 14, 27, 878, 53, 10751],
            sad: [ 35, 10751, 14, 10402],
            angry:  [ 35, 10749, 14, 10402],
            excited: [ 36, 28, 12, 18, 10749, 14, 27, 9648, 878, 53, 10752],
            fear : [ 35, 14, 10402],
            indiffrent : [ 36, 28, 12, 35, 80, 99, 18, 10751, 10749, 14, 27, 10402, 9648, 878, 10770, 53, 10752, 37]
        }
        let movieCode
        for (let key in emotObj) {
            if (emotion == key) {
                let randNum = Math.floor(Math.random()*emotObj[key].length)
                movieCode = emotObj[key][randNum]
            }
        }
        return TmdbAPI({
            method: 'get',
            url: `/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&with_genres=${movieCode}`
        })
        .then (({ data }) => {
            objData['list'] = data
            res.status(200).json(objData)
        })
        })
        .catch(console.log)}

    static findMovie (req, res, next) {

    }
}

module.exports = YoutubeController