const axios = require("axios");


module.exports = function (app) {
    app.get("/translate/:fromLang/:toLang/:word", (req, res) => {
        const fromLanguage = req.params.fromLang;
        const toLanguage = req.params.toLang;
        const wordSearch = req.params.word;
        axios.get(`https://systran-systran-platform-for-language-processing-v1.p.rapidapi.com/translation/text/translate?source=${fromLanguage}&target=${toLanguage}&input=${wordSearch}`,
            {
                headers: {
                    "x-rapidapi-host": "systran-systran-platform-for-language-processing-v1.p.rapidapi.com",
                    "x-rapidapi-key": "b98198b437mshea0ca9221f948fdp104f05jsneed7015c919a"
                }
            })
            .then(response => {
                console.log("translation", response.data.outputs[0].output);
                res.send(response.data.outputs[0].output)
            })
            .catch(error => {
                console.log(error);
            });
    });

    app.get("/expressions/:fromLang/:toLang/:word", (req, res) => {
        const fromLanguage = req.params.fromLang;
        const toLanguage = req.params.toLang;
        const wordSearch = req.params.word;
        axios.get(`https://systran-systran-platform-for-language-processing-v1.p.rapidapi.com/resources/dictionary/lookup?source=${fromLanguage}&target=${toLanguage}&input=${wordSearch}`,
            {
                headers: {
                    "x-rapidapi-host": "systran-systran-platform-for-language-processing-v1.p.rapidapi.com",
                    "x-rapidapi-key": "b98198b437mshea0ca9221f948fdp104f05jsneed7015c919a"
                  }
            })
            .then(response => {
                res.json(response.data)
            })
            .catch(error => {
                console.log(error);
            });
    });
}