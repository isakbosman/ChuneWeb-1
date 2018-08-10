const articleSources = require('./fetchArticles')
const { getValidCacheTime } = require('../globalHelpers'); 
const firestore = require('../firebase/firestore');
const axios = require('axios');
const moment = require('moment');
const crypto = require('crypto');

const fetchArtist = require('../fetchArtist');
const _ = require('lodash');

const generateSha1Key = (string) => {
    var shasum = crypto.createHash('sha1');
    shasum.update(string);
    return shasum.digest('hex');
}

const scrape = (name, artistId) => {
    return Promise.all(
        [name].map(name => 
            Promise.all([
                articleSources.fetchBillboard(name),
                articleSources.fetchPf(name),
                articleSources.fetchHnhh(name),
                //articleSource.fetchTsis(name),
                articleSources.fetch_your_edm(name),
                //articleSources.fetch_pigeon_planes(name),
                articleSources.fetch_louder_sound(name),
                //articleSources.fetch_ucr(name),
                //articleSources.fetch_cmt(name)
                   ])))
        .then(matches => {
            return Promise.all(_.flattenDeep(matches).map(article => {
                article.artistId = artistId;
                article.lastUpdatedAt = moment().toDate();
                article.date = article.date ? moment(article.date).toDate() : null;
                
                return firestore.collection('articles').doc(generateSha1Key(`${artistId}:${article.url}`)).set(article, {merge: true})
            }));
        }).then(results => {
            return firestore.collection('artists').doc(artistId).set({ articlesLastFetchedAt: moment().toDate() }, { merge: true })     
        }).catch(err => {
            console.log("ERR", err);
        })
};


const fetchArticles = (name) => {
    return fetchArtist(name).then(artist => {
        return scrape(name, artist.artistId);
    });
}

module.exports = fetchArticles;
