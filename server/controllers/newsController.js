const axios = require('axios');
const { response } = require('express');

class newsController {
    static list(req, res, next) {
        axios({
            method: 'GET',
            url: 'https://newsapi.org/v2/everything?domains=goal.com,skysports.com,101greatgoals.com&apiKey=a7957eb121ce4b918b4538e62e2628e1&language=en&pageSize=50'
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