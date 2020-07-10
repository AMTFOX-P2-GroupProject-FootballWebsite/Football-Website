const axios = require('axios');
const { response } = require('express');

class newsController {
    static list(req, res, next) {
        axios({
            method: 'GET',
            url: `https://newsapi.org/v2/everything?domains=goal.com,skysports.com,101greatgoals.com&apiKey=${process.env.APIKEY_NEWS}&language=en&pageSize=50`
        })
        .then(response => {
            const data = response.data
            res.status(200).json({data})
        })
        .catch(err => {
            res.status(500).json({err})
        })
    }
}

module.exports = newsController