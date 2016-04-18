app.controller("SecondPartialController",function($scope,localStorageService,defaultData,autoLoadData,arrayEvaluation){

	//Get Rules
	$scope.rules = autoLoadData.rules();

	//Variable to store atoms obtained from dynamic rules
	$scope.atomsInRules = [];
	$scope.selectedAtom = {};
	$scope.normalizedRules = [];

	//Function to generated atoms from rules
	$scope.obtainAtoms = function(){
		angular.forEach($scope.rules,function(rule,key){
			//Check antecedents
			angular.forEach(rule.antecedents,function(atom,iterator){
				if(!arrayEvaluation.containsObject({shortName:atom.shortName},$scope.atomsInRules,"shortName"))
					$scope.atomsInRules.push({shortName: atom.shortName});
			});
			//Generate conclusions
			angular.forEach(rule.conclusions,function(atom,iterator){
				if(!arrayEvaluation.containsObject({shortName:atom.shortName},$scope.atomsInRules,"shortName"))
					$scope.atomsInRules.push({shortName: atom.shortName});
			});
		});
	};
	
	$scope.selectAtom = function(object){
		$scope.selectedAtom = object.shortName;
		$scope.generateNormalizedRules();
	}

	$scope.generateNormalizedRules = function(){
		console.log("hello");
		angular.forEach($scope.rules,function(rule,key){
			//Check antecedents
			angular.forEach(rule.antecedents,function(atom,iterator){
				if(!arrayEvaluation.containsObjectWithArrayParameters({shortName:atom.shortName,sign:atom.sign},$scope.normalizedRules,["shortName","sign"]))
				{

					$scope.normalizedRules.push({shortName: atom.shortName,sign:atom.sign});

				}
			});
			//Generate conclusions
			angular.forEach(rule.conclusions,function(atom,iterator){
				if(!arrayEvaluation.containsObjectWithArrayParameters({shortName:atom.shortName},$scope.normalizedRules,"shortName")){
					$scope.normalizedRules.push({shortName: atom.shortName,sign:atom.sign});
				}
			});
		});
	}

	$scope.obtainAtoms();
});