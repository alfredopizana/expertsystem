app.config(['$routeProvider','$locationProvider',
	function($routeProvider, $locationProvider) {
		$routeProvider
			.when("/",{
				templateUrl: "views/firstpartial.html",
				controller:  "FirstPartialController"
			})
			.when("/firstpartial",{
				templateUrl: "views/firstpartial.html",
				controller:  "FirstPartialController"
			})
			.when("/secondpartial",{
				templateUrl: "views/secondpartial.html",
				controller:  "SecondPartialController"

			})
			.when("/thirdpartial",{
				templateUrl: "views/thirdpartial.html",

			})
			.otherwise({redirectTo:"/"});
		//check browser support
		if(window.history && window.history.pushState){
			//$locationProvider.html5Mode(true); will cause an error $location in HTML5 mode requires a  tag to be present! Unless you set baseUrl tag after head tag like so: <head> <base href="/">
		// to know more about setting base URL visit: https://docs.angularjs.org/error/$location/nobase
		// if you don't wish to set base URL then use this
			$locationProvider.html5Mode({
				enabled: true,
				requireBase: false
			});
		}
	}
]);

