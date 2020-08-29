const request = require('request');
const config  = require('config');

class People {
    
    _data = null

    async fetch() {
        return new Promise((done, reject) => {
            request(
                {
                    'url': `${config.get('sl_api_url')}/v2/people.json`,
                    'headers': {
                        'Authorization': `Bearer ${config.get('sl_api_key')}`
                    }
                },
                (err, response, body) => {
                    if (err) {
                        return reject(res.send);
                    }
                    this._data = JSON.parse(body).data;
                    done()
                }
            )
        })
    }

    get data() {
        return this._data;
    }

    set data(data) {
        this._data = data;
    }

    async frequency() {
        const frequency = {}
        
        this._data.map((person) => {
            const { email_address: email } = person;

            for (let i in email) {
                const c = email[i];
                const charCount = frequency[c];

                if (charCount) {
                    frequency[c] = charCount + 1;
                } else { 
                    frequency[c] = 1;
                }
            }
        });

        return frequency;
    }

}

module.exports.People = People