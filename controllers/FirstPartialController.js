app.controller("FirstpartialController",function($scope,localStorageService,defaultData,autoLoadData){	
	
	//Load Data
	$scope.atoms = autoLoadData.atoms();
	$scope.rules = autoLoadData.rules();

	//Auto Save Data on Local Storage
	$scope.$watchCollection('atoms',function(newValue,oldValue){
		localStorageService.set("localStorageFile-Atoms",$scope.atoms);
	});
	$scope.$watchCollection('rules',function(newValue,oldValue){
		localStorageService.set("localStorageFile-Rules",$scope.rules);
		$scope.generateFactualBasis();
	});
	
	//Load Default Data
	$scope.setDefaultAtoms = function(){
		$scope.atoms = defaultData.atoms;
	}
	$scope.setDefaultRules =  function(){
		$scope.rules = defaultData.rules;
	}

	//Clear Data
	$scope.clearAtoms = function(){
		$scope.atoms = [];
	}
	$scope.clearRules = function(){
		$scope.rules = [];
	}

	//CreateAtom
	$scope.newAtom = {};
	$scope.saveAtom = function(){
		console.log($scope.newAtom);
		$scope.atoms.push($scope.newAtom);
		$scope.newAtom = {};
	};

	//Preview Rules
	$scope.temporalRule = [{
		antecedents: [],
		conclusions: []
	}];
	$scope.temporalElement = {};
	$scope.temporalStatus = false;
	$scope.element = {
		signo : false,
		typeOfUnion : false,
		elements:{}
	};
	$scope.addAtomToSentence = function(atom){
		$scope.temporalElement = {
			shortName:atom.shortName,
			sign:$scope.temporalStatus
		};
		$scope.temporalRule[0].antecedents.push($scope.temporalElement);
		$scope.temporalElement = {};
	};
	$scope.addAtomToConclusion = function(atom){
		$scope.temporalElement = {
			shortName:atom.shortName,
			sign:$scope.temporalStatus
		};
		$scope.temporalRule[0].conclusions.push($scope.temporalElement);
		$scope.temporalElement = {};
	};
	$scope.removeSentence = function(index){
	    $scope.temporalRule[0].antecedents.splice(index, 1);
	};
	$scope.removeConclusion = function(index){
	    $scope.temporalRule[0].conclusions.splice(index, 1);
	}
	//Add Rule
	$scope.saveRule = function(atomo){
		$scope.rules.push($scope.temporalRule[0]);
		$scope.temporalRule = [{
			antecedents: [],
			conclusions: []
		}];
	};

	//Factual Basis
	$scope.factualBasisAntecedents=[];
	$scope.factualBasisIntermediateConclusions= [];
	$scope.factualBasisConclusion= [];
	$scope.pendingToMove = [];
	$scope.generateFactualBasis = function(){
		angular.forEach($scope.rules,function(value,key){
			//Generate Antecedents
			angular.forEach(value.antecedents,function(atom,iterator){
				if(!containsObject({shortName:atom.shortName},$scope.factualBasisAntecedents,"shortName"))
					$scope.factualBasisAntecedents.push(
						{shortName: atom.shortName}
					);
			});
			//Generate Conclusions
			angular.forEach(value.conclusions,function(atom,iterator){
				if(!containsObject({shortName:atom.shortName},$scope.factualBasisConclusion,"shortName")){
					$scope.factualBasisConclusion.push(
						{shortName: atom.shortName}
					);
				}
			});

		});
		//Generate Intermediate Conclusions
		angular.forEach($scope.factualBasisConclusion,function(atom,iterator){
			if(containsObject({shortName:atom.shortName},$scope.factualBasisAntecedents,"shortName") && !containsObject({shortName:atom.shortName},$scope.pendingToMove,"shortName")){
				$scope.pendingToMove.push({shortName: atom.shortName});				
			}
		});
		angular.forEach($scope.pendingToMove,function(atom,iterator){
			if(!containsObject({shortName:atom.shortName},$scope.factualBasisIntermediateConclusions,"shortName")){
				$scope.factualBasisIntermediateConclusions.push({shortName: atom.shortName});
			}
			spliceElement({shortName:atom.shortName},$scope.factualBasisAntecedents,"shortName");
			spliceElement({shortName:atom.shortName},$scope.factualBasisConclusion,"shortName");	
		});
		$scope.pendingToMove = [];
	}

	//Generic functions
	function containsObject(obj,listObject,property) {
	    var x;
	    for (x in listObject) {
	        if (listObject.hasOwnProperty(x) && listObject[x][property] === obj[property]) {
	            return true;
	        }
	    }
	    return false;
	}
	function spliceElement(obj,listObject,property) {
	    var x;
	    for (x in listObject) {
	        if (listObject.hasOwnProperty(x) && listObject[x][property] === obj[property]) {
	        	listObject.splice(x, 1);
	            return true;
	        }
	    }
	    return false;
	}

	//inference Engine
	$scope.copyOfRules =[];
	$scope.copyOfRulesForExplanation = [];
	$scope.copyfactualBasisAntecedents=[];
	$scope.copyfactualBasisIntermediateConclusions= [];
	$scope.copyCactualBasisConclusions= [];
	$scope.baseFacts = [];
	$scope.listOfAtomsToBeEvaluated = [];
	$scope.listOfEvaluatedAtoms= [];
	$scope.evaluatedAtom = null;
	$scope.conclusionsToBeDeleted = [];
	$scope.queueToBeDeleted = [];

	$scope.startInferenceEngine = function(){
		$scope.evaluatedAtom = {};

		//Initialize Variables
		$scope.copyOfRules = angular.copy($scope.listOfRules);
		$scope.copyfactualBasisAntecedents= angular.copy($scope.factualBasisAntecedents);
		$scope.copyfactualBasisIntermediateConclusions=  angular.copy($scope.factualBasisIntermediateConclusions);
		$scope.copyCactualBasisConclusions= angular.copy($scope.factualBasisConclusion); 
		
		angular.forEach($scope.copyfactualBasisAntecedents,function(atom,iterator){
			$scope.listOfAtomsToBeEvaluated.push(
				{
					shortName : atom.shortName,
					typeOfSection : "Antecedent"
				}
			);
		});
		angular.forEach($scope.copyfactualBasisIntermediateConclusions,function(atom,iterator){
			$scope.listOfAtomsToBeEvaluated.push(
				{
					shortName : atom.shortName,
					typeOfSection : "IntermediateConclusion"
				}
			);
		});
		angular.forEach($scope.copyCactualBasisConclusions,function(atom,iterator){
			$scope.listOfAtomsToBeEvaluated.push(
				{
					shortName : atom.shortName,
					typeOfSection : "Conclusion"
				}
			);
		});
		if($scope.listOfAtomsToBeEvaluated.length){
			$scope.evaluatedAtom = $scope.listOfAtomsToBeEvaluated[0];
			spliceElement($scope.evaluatedAtom,$scope.listOfAtomsToBeEvaluated,"shortName");
		}
		$scope.numerateRules();
		$scope.copyOfRulesForExplanation = angular.copy($scope.copyOfRules);
	};

	$scope.numerateRules = function(){
		for(var x = 0 ; x < $scope.copyOfRules.length ;x++ ){
			$scope.copyOfRules[x] = angular.merge($scope.copyOfRules[x],{ruleNumber : x+1});
		}
	};

	$scope.evaluateAtom = function(value){
		if($scope.listOfAtomsToBeEvaluated.length >0)
		{		
			$scope.evaluatedAtom = angular.merge($scope.evaluatedAtom,{origin : "Human"});
			$scope.evaluatedAtom = angular.merge($scope.evaluatedAtom,{sign : value});
			$scope.evaluatedAtom = angular.merge($scope.evaluatedAtom,{explanation : ""});
			
			//Evaluate Atom in Rules
			$scope.evaluateAtomInRules($scope.evaluatedAtom,$scope.copyOfRules);

			$scope.baseFacts.push($scope.evaluatedAtom);
			$scope.listOfEvaluatedAtoms.push($scope.evaluatedAtom);
			spliceElement($scope.evaluatedAtom,$scope.listOfAtomsToBeEvaluated,"shortName");
			angular.forEach($scope.copyOfRules,function(rule,iterator){
				if(!(rule.antecedents.length > 0)){
						var _typeOfSection = getTypeOfSection(rule.conclusions[0],$scope.listOfAtomsToBeEvaluated);
						$scope.baseFacts.push({
									shortName : rule.conclusions[0].shortName,
									sign : true == rule.conclusions[0].sign,
									origin : "Computer",
									typeOfSection : _typeOfSection,
									explanation : "(" + rule.ruleNumber  + ")  " + $scope.getRuleExplanation(rule.ruleNumber)
						});
						$scope.conclusionsToBeDeleted.push(rule);
						//Should be checked
						$scope.evaluateAtomInRules({
									shortName : rule.conclusions[0].shortName,
									sign : true == rule.conclusions[0].sign,
									origin : "Computer",
									typeOfSection : _typeOfSection,
									explanation : rule.ruleNumber
						},$scope.copyOfRules);
				}
			});
			angular.forEach($scope.conclusionsToBeDeleted,function(value,iterator){
				$scope.spliceObject(value,$scope.copyOfRules);
				spliceElement({shortName:value.conclusions[0].shortName},$scope.listOfAtomsToBeEvaluated,"shortName");
			});
			if(!($scope.listOfAtomsToBeEvaluated.length > 0)){
				$scope.evaluatedAtom = angular.merge($scope.evaluatedAtom,{origin : "Computer"});
				$scope.evaluatedAtom = angular.merge($scope.evaluatedAtom,{sign : value});
				$scope.evaluatedAtom = angular.merge($scope.evaluatedAtom,{explanation : ""});
				$scope.baseFacts.push($scope.evaluatedAtom);
				$scope.evaluatedAtom = null;
			}else{
				$scope.evaluatedAtom = [];
				$scope.evaluatedAtom = $scope.listOfAtomsToBeEvaluated[0];
				spliceElement($scope.evaluatedAtom,$scope.listOfAtomsToBeEvaluated,"shortName");
			}
		}else{
			if($scope.evaluatedAtom){
				$scope.evaluatedAtom = angular.merge($scope.evaluatedAtom,{origin : "Computer"});
				$scope.evaluatedAtom = angular.merge($scope.evaluatedAtom,{sign : value});
				$scope.evaluatedAtom = angular.merge($scope.evaluatedAtom,{explanation : ""});
				$scope.baseFacts.push($scope.evaluatedAtom);
				$scope.evaluatedAtom = null;
			}
			Materialize.toast('No hay mas Atomos que analizar', 4000);
		}
	}
	$scope.canIDeductAnythingElse = function(){
		return null;
	}
	$scope.evaluateAtomInRules = function(atom,rules){
		angular.forEach(rules,function(rule,iterator){
			var returnValue = containsObjectWithIndex({shortName:atom.shortName},rule.antecedents,"shortName");
			if(returnValue > -1){

				if(atom.sign == rule.antecedents[returnValue].sign){
					rule.antecedents.splice(returnValue, 1);
					if(rule.conclusions.length>0 && rule.antecedents.length < 1){
						$scope.evaluateAtomInRules(rule.conclusions[0],rules);
					}
				}else{
					$scope.queueToBeDeleted.push(					
						{ruleIndex:rule.ruleNumber}
					);				
				}
			}else{
				
			}
			returnValue = -1;
		});
		angular.forEach($scope.queueToBeDeleted,function(rule,iterator){
			spliceElement({ruleNumber:rule.ruleIndex},rules,"ruleNumber");
		});
		$scope.queueToBeDeleted = [];
	}
	$scope.deleteRule = function(rule,listOfRules){
		var x;
	    for (x in listOfRules) {
	        if (listObject[x] === rule) {
	        	listObject.splice(x, 1);
	            return true;
	        }
	    }
	    return false;
	}
	function containsObjectWithIndex(obj,listObject,property) {
	    var x;
	    for (x in listObject) {
	        if (listObject.hasOwnProperty(x) && listObject[x][property] === obj[property]) {
	            return x;
	        }
	    }
	    return -1;
	}
	function getTypeOfSection(atom,listObject){
		var x;
		for(x in listObject){
				if(angular.equals(listObject[x]["shortName"],atom["shortName"])){
					return listObject[x]["typeOfSection"];
				}
		}
		return "!";
	}
	$scope.spliceObject = function (obj,listObject) {
	    var x;
	    for (x in listObject) {
	        if (angular.equals(listObject[x], obj)) {
	        	listObject.splice(x, 1);
	            return true;
	        }
	    }
	    return false;
	}
	$scope.getRuleExplanation = function(index){
			var x;
			//$scope.copyOfRulesForExplanation
			var text = " ";
			for(x in $scope.copyOfRulesForExplanation){
				if(angular.equals($scope.copyOfRulesForExplanation[x].ruleNumber,index)){
					for(var y in $scope.copyOfRulesForExplanation[x].antecedents){
						//var extraText = != $scope.copyOfRulesForExplanation[x].antecedents.length
						text += (y == 0 ? "": " ^ ")+ ($scope.copyOfRulesForExplanation[x].antecedents[y].sign ? "":"¬") + $scope.copyOfRulesForExplanation[x].antecedents[y].shortName;
					}
					text += " - > ";
					for(var y in $scope.copyOfRulesForExplanation[x].conclusions){
						text += (y == 0 ? "": " ^ ")+($scope.copyOfRulesForExplanation[x].conclusions[y].sign ? "":"¬") + $scope.copyOfRulesForExplanation[x].conclusions[y].shortName;
					}
				}
			}
			return text;
	}
	$scope.getExplanation = function(){
		var text = "";
		angular.forEach($scope.baseFacts,function(value,iterator){
			text += value.origin == "Computer" ? "<br>Por lo tanto yo deduje " + value.shortName + " de la regla " + value.explanation : "<br>Tu me dijiste " + (value.sign ? "Si " : "No ") + value.shortName;
		});
		Materialize.toast(text, 20000);
		return text;
	}
	$scope.generateFactualBasis();
});