const axios = require('axios');
const { response } = require('express');

class matchDataController {
    static standing(req, res, next) {
        axios({
            method: 'GET',
            url: `http://livescore-api.com/api-client/leagues/table.json?key=${process.env.APIKEY_MATCH}&secret=dT90Rw4BKg49uwy6WHNODo1eXhdQzi6M&league=25&season=4`
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

module.exports = matchDataController