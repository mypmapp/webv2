'use strict';

module.exports = {
	app: {
		title: 'myPM',
		description: 'Full-Stack Property Management For Estate Agents',
		keywords: 'Vendor, Purchaser, Vendor-Purchase Profile Match, Appointment Management System'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MYPM',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
				//'public/lib/angularjs-utilities-master/examples/uber-wizard/styles/rcWizard.css',
				'public/lib/font-awesome/css/font-awesome.min.css',
				'public/lib/textAngular/dist/textAngular.css',
			],
			js: [
				'public/lib/jquery/dist/jquery.min.js',
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js', 
				'public/lib/angular-cookies/angular-cookies.js', 
				'public/lib/angular-animate/angular-animate.js', 
				'public/lib/angular-touch/angular-touch.js', 
				'public/lib/angular-sanitize/angular-sanitize.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/helpers/uniqueArrayItems.js',
				'public/lib/helpers/angular-messages.min.js',
				'public/lib/bootstrap/dist/js/bootstrap.min.js',
				//'public/lib/angularjs-utilities-master/lib/jquery.bootstrap.wizard.js',
				//'public/lib/angularjs-utilities-master/src/directives/rcSubmit.js',
				//'public/lib/angularjs-utilities-master/src/modules/rcForm.js',
				//'public/lib/angularjs-utilities-master/src/modules/rcDisabled.js',
				//'public/lib/angularjs-utilities-master/src/modules/rcWizard.js',
				//'public/lib/angular-ui-gravatar/dist/angular-ui-gravatar.js',
				'public/lib/textAngular/dist/textAngular-rangy.min.js',
				'public/lib/textAngular/dist/textAngular-sanitize.min.js',
				'public/lib/textAngular/dist/textAngular.min.js',
				//'public/lib/angular-file-upload/dist/angular-file-upload.min.js',
				'public/lib/ng-file-upload/ng-file-upload-shim.min.js',
				'public/lib/ng-file-upload/ng-file-upload.min.js',
				'public/lib/angular-input-masks/angular-input-masks-standalone.min.js',
				'public/lib/angular-i18n/angular-locale_en-gb.js',

				//'public/lib/helpers/googleApis.js',
				//'public/lib/helpers/googlePlacesDirective.js',
				//'public/lib/helpers/ngThumb.js',
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};
