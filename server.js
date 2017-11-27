const express = require('express')
const fs = require('fs')
const request = require('request')
const cheerio = require('cheerio')
const app     = express()
const async = require('async')

// const losAngelesDispensaries = require('./data/la-dispensaries.js')
const losAngelesDispensaries = ['https://weedmaps.com/dispensaries/vermont-25-cap#/details']

app.get('/la-dispensaries', function(req, res){
	async.map(losAngelesDispensaries, scrapeDispensaries, function(err, response) {
		if (err) return console.log(err)

	})

	res.json({ dispensaries: losAngelesDispensaries })
})

function scrapeDispensaries(url, cb) {
	request(url, function(error, response, html) {
		if (error) return console.log('error:',error)

		const $ = cheerio.load(html)
		const json = {
			name: '',
			address: '',
			phone: '',
			email: '',
			website: '',
			instagram: ''
		}

		$('.listing-details').filter(function() {
			const data = $(this)

			json.name = data.children().first().text()
		})

		$('.details-cards-sidebar').filter(function() {
			const data = $(this)

			// console.log('data:',data.children().map(function(i, el) {
			// 	console.log($(this).text())
			// }))
			// console.log('address:',data.children('div'))
			// data.children('div').map(function() {
			// 	console.log($(this).text())
			// })
			// console.log('phone:',data.children().eq(1))
			// console.log('email:',data.children().eq(1))
		})

		$('#instagram').filter(function() {
			const data = $(this)

			json.instagram = data.children().first().text()
		})
		console.log('json:',json)
	})
}

app.listen('8081')

console.log('Magic happens on port 8081')

exports = module.exports = app