const axios = require('axios')
class FootballController{
    static showAll(req,res,next){
        // https://www.scorebat.com/video-api/v1/
        axios({
            method: 'GET',
            url: 'https://www.scorebat.com/video-api/v1/'
        })
        .then(response=>{
            let {data} = response
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = FootballController