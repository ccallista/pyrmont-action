const express = require('express');
const router = express.Router();
const db = require('./newsModel.js');

module.exports = (db) => {
    const router = express.Router();

    // GET all news items
    router.get('/', (req, res) => {
        db.all('SELECT * FROM news', [], (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ news: rows });
            }
        });
    });

    //GET news item by id
    router.get('/:id', (req, res) => {
        const newsId = req.params.id;
        db.get('SELECT * FROM news WHERE news_id = ?', [newsId], (err, row) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ news: row });
            }
        });
    })

    return router;
}


