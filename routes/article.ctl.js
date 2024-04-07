"use strict";

const fs = require("fs").promises;
function getArticles() {
    return fs.readFile("./databases/articles.json")
    .then((data) => {
        const articles = JSON.parse(data);
        return articles;
    })
    .catch(console.error);
}

const get = { 
    list: async (req, res) => {
        const content = req.query.content? req.query.content : '';

        const data = await getArticles();
        let result = []
        
        console.log(content);

        for(let i = 0; i < data.length; ++i) {
            if(data[i]['content'].toUpperCase().includes(content)) {
                let tmp = data[i];
                tmp['idx'] = i;
                result.push(tmp);
            }            
        }
        res.render('list', { articles: result });
    },
    post: (req, res) => {
        res.render('post');
    }
}

const post = {
    like: async (req, res) => {
        const articles = await getArticles();
        const idx = req.params.id;
        articles[idx]['like']++;

        await fs.writeFile("./databases/articles.json", JSON.stringify(articles));
        const resultHTML = `
        <div class="container">
            <div class="title-container">
                <a href="/article/">
                    <span style="font-size:3rem;"><strong>성균이야기</strong></span>
                </a>
            </div>
            <h1>Article Like Success!</h1>
            <a id="move-btn" href="/article">돌아가기</a>
        </div>
        `
        res.send({ success : true, result: resultHTML });
    },
    post: async (req, res) => {
        const article = req.body;

        article['like'] = 0;
        
        const articles = await getArticles();
        articles.push(article);

        await fs.writeFile("./databases/articles.json", JSON.stringify(articles));
        const resultHTML = `
        <div class="container">
            <div class="title-container">
                <a href="/article/">
                    <span style="font-size:3rem;"><strong>성균이야기</strong></span>
                </a>
            </div>
            <h1>Article Post Success!</h1>
            <a id="move-btn" href="/article">돌아가기</a>
        </div>
        `
        res.send({ success : true, result: resultHTML });
    }
};

module.exports = {
    get,
    post,
}