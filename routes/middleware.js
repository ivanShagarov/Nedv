/**
 * This file contains the common middleware used by your routes.
 * 
 * Extend or replace these functions as your application requires.
 * 
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */

var _ = require('underscore'),
	querystring = require('querystring'),
	keystone = require('keystone');


/**
	Initialises the standard view locals
	
	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/

/*
exports.checkParams = function(req, res, next) {

console.log("Total0");

if (req.query.total) {

    console.log("Total12");

    keystone.list('Nedvizimost').model.count().exec(function(err, count) {

        console.log("Total " + count);
        return res.json(200, { status: 'OK', users: 0, Prods: "33" });

    });
}

}
*/

exports.initLocals = function(req, res, next) {
	
	var locals = res.locals;
	
	locals.navLinks = [
        { label: 'Главная',		key: 'home',		href: '/' },
        { label: 'Обратная связь',		key: 'contact',		href: '/contact' },
        { label: 'Недвижимость',		key: 'nedvizimost',		href: '/nedvizimost' },
        { label: 'Помощь',		key: 'help',		href: '/help' }
	];
	
	locals.user = req.user;
	
	next();
	
};

/**
	Fetches and clears the flashMessages before a view is rendered
*/

exports.flashMessages = function(req, res, next) {
	
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error')
	};
	
	res.locals.messages = _.any(flashMessages, function(msgs) { return msgs.length }) ? flashMessages : false;
	
	next();
	
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */

exports.requireUser = function(req, res, next) {
	
	if (!req.user) {
		req.flash('error', 'Пожалуйста, войдите под своим аккаунтом для получения доступа к этой странице.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
	
};
