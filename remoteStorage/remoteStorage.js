const STORAGE_TOKEN = '3FR51KSPUMNX6503O7UTC7XKJ6D5AXANKHMJOHKR';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

/*
********** KEYS ********** 
* contacts
* board
* username
************************** 
*/

/**
 * Setzt einen Wert (value) im Backend.
 * @param {String} key - Name des "Felds" auf das im Backend zugegriffen werden soll.
 * @param {String} value - Wert der in das Feld/Key geschrieben werden soll.
 * @returns {String} 
 */
async function setItem(key, value) {
    if (!key || !value) {
        throw "Key and value are required.";
    }
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json());
}

/**
 * Liest einen Wert aus dem Backened vom übergeben Feld/Key aus und gibt diesen Wert als Rückgabeparameter zurück. 
 * @param {String} key -Name des "Felds" auf das im Backend zugegriffen werden soll.
 * @returns {String} - Gibt die Daten, welche aus dem Backend gelanden wurden zurück. 
 */
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) { 
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}