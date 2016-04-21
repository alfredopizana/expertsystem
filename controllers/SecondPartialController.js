app.controller("SecondPartialController",function($scope,localStorageService,defaultData,autoLoadData,arrayEvaluation){

	//Get Rules
	$scope.rules = autoLoadData.rules();

	//Variable to store atoms obtained from dynamic rules
	$scope.atomsInRules = [];
	$scope.selectedAtom = {};
	$scope.normalizedRules = [];

	$scope.normalizedRulesForPositiveAtom = [];
	$scope.normalizedRulesForNegativeAtom = [];

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
		object.sign = true;
		console.log(object);
		$scope.NormalizedRules = $scope.NormalizeRules($scope.normalizedRules);
		$scope.NormalizedRules = $scope.generateNormalizedRules(object,$scope.rules);

		splitNormalizedRules(object,$scope.rules); 
	}

	$scope.NormalizeRules = function(rules){
		var normalizedRules = [];

		return normalizedRules;
	}
	function splitNormalizedRules(object,list){

	}
	$scope.generateNormalizedRules = function(object,rules){
		angular.forEach(rules,function(rule,key){
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