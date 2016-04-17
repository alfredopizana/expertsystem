app.controller("FirstpartialController",function($scope,localStorageService,defaultData,autoLoadData){	
	
	//Load Data
	$scope.atoms = autoLoadData.atoms();
	$scope.rules = autoLoadData.rules();

	//Auto Save Data on Local Storage
	$scope.$watchCollection('atoms',function(newValue,oldValue){
		localStorageService.set("localStorageFile-Atoms",$scope.atoms);
	});
	$scope.$watchCollection('listOfRules',function(newValue,oldValue){
		localStorageService.set("localStorageFile-Rules",$scope.rules);
	});

	//Load Default Data

	$scope.setAtoms = function(){
		$scope.atoms = defaultData.atoms;
	}



	
	/*$scope.atoms= defaultData.atoms;
	$scope.rules= defaultData.rules;*/

});