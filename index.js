const express = require('express');
const axios = require('axios');

const app = express();

app.get('/robots.txt', (req, res) => res.sendFile(__dirname + '/static/robots.txt'));
app.get('/sitemap.xml', (req, res) => res.sendFile(__dirname + '/static/sitemap.xml'));

app.use((req, res, next) => {
	if (req.url === '/factorio/mods') {
		res.redirect('/factorio/mods/');
		return;
	}
	next();
});

app.get('/factorio/mods/', (req, res) => res.sendFile(__dirname + '/static/factorio_ru.html'));
app.get('/factorio/mods/ru', (req, res) => res.sendFile(__dirname + '/static/factorio_ru.html'));
app.get('/factorio/mods/en', (req, res) => res.sendFile(__dirname + '/static/factorio_en.html'));
app.get('/factorio/mods/free-factorio-mods-downloader-ru.user.js', (req, res) => res.sendFile(__dirname + '/static/free-factorio-mods-downloader-ru.user.js'));
app.get('/factorio/mods/free-factorio-mods-downloader-en.user.js', (req, res) => res.sendFile(__dirname + '/static/free-factorio-mods-downloader-en.user.js'));
app.get('/factorio/mods/favicon.png', (req, res) => res.sendFile(__dirname + '/static/factorio_favicon.png'));

app.get('/factorio/mods/index.php', (req, res) => res.redirect('/factorio/mods/' + req.query.lang));

app.get('/factorio/mods/modinfo', async (req, res) => {
	const id = String(req.query.id);
	const response = await axios.get('https://mods.factorio.com/api/mods/' + encodeURIComponent(id) + '/full', {
		validateStatus: () => true
	});
	res.status(response.status).json(response.data);
});

app.get('/donate', (req, res) => res.sendFile(__dirname + '/static/donate.html'));
app.use('/', (req, res) => res.sendFile(__dirname + '/static/index.html'));

app.listen(5001);
