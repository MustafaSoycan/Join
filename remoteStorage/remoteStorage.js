const STORAGE_TOKEN = '3FR51KSPUMNX6503O7UTC7XKJ6D5AXANKHMJOHKR';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

/*
********** KEYS ********** 
* contacts
* 
*
************************** 
*/

async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) { 
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}