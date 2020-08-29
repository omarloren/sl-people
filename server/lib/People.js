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

    frequency() {
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

    oneEditReplace(str1, str2) {
        let differenceFound = false;
        for (var i in str1) {
            if (str1[i] !== str2[i]) {
                if (differenceFound) {
                    return false
                }
                differenceFound = true;
            }
        }
        return true;
    }

    oneEditInsert(str1, str2) {
        let i1 = 0;
        let i2 = 0;

        while (i2 < str2.length && i1 < str1.length) {
            if (str1[i1] !== str2[i2]) {
                if (i1 !== i2) {
                    return false;
                }
                i2++;
            } else {
                i1++;
                i2++;
            }
        }
        return true;
    }

    oneEditAway(str1, str2) {
        if (str1.length === str2.length) {
            return this.oneEditInsert(str1, str2);
        } else if (str1.length + 1 === str2.length) {
            return this.oneEditInsert(str1, str2);
        } else if (str1.length - 1 === str2.length) {
            return this.oneEditInsert(str1, str2);
        }
        return false;
    }

    /**
     * Finds possible duplicate email addresses in the data set, based on whether or not a given is 
     * one edit/insert away from being equal 
     */
    emailDuplicates() {
        let addresses = [];
        let duplicates = []
        addresses = this._data.map((person) => person.email_address);

        for (let i = 0; i < addresses.length; i++) {
            const address = addresses[i];
            for (let j = i + 1; j < addresses.length; j++) {
                if (this.oneEditAway(address, addresses[j])) {
                    duplicates.push([address, addresses[j]])
                }
            }
        }
        return duplicates;
    }
}

module.exports.People = People