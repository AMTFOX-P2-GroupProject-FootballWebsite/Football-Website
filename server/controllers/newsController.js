const axios = require('axios');
const { response } = require('express');

class newsController {
    static list(req, res, next) {
        console.log('masuk list')
        axios({
            method: 'GET',
            url: 'https://newsapi.org/v2/everything?q=premierleague&sortBy=publishedAt&apiKey=a7957eb121ce4b918b4538e62e2628e1&pageSize=100&page=1&language=en&source=gb'
        })
        .then(response => {
            console.log(response.data)
            const data = response.data
            res.status(200).json({data})
        })
        .catch(err => {
            res.status(500).json({err})
        })
    }
}

module.exports = newsController