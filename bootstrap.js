const fetch = require('node-fetch');

function waitServer(url, done, totalAttempts = 1) {
    const limitAttempts = 100;

    fetch(url)
        .then(() => done())
        .catch(() => {
            if (totalAttempts <= limitAttempts) {
                setTimeout(() => {
                    waitServer(url, done, totalAttempts + 1);
                    console.log(`Waiting ${url} ${totalAttempts}/${limitAttempts}...`);
                }, 3000);
            } else {
                console.log('Attempts limit to connect to api server is exceded');
                process.exit(1);
            }
        });
}

module.exports = (done) => {
    Promise
        .all([
            new Promise(resolve => waitServer('http://client:9000', resolve)),
            new Promise(resolve => waitServer('http://server:8000', resolve)),
            new Promise(resolve => waitServer('http://selenium-server:4444', resolve)),
        ])
        .then(() => done());
};
