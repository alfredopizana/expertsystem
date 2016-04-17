app.factory('defaultData', function () {

	return { 
			atoms : [
				{
					name:"Calor",
					shortName:"C"
				},
				{
					name:"Playa",
					shortName:"P"
				},
				{
					name:"Huracanes",
					shortName:"H"
				},
				{
					name:"Viento",
					shortName:"Vi"
				},
				{
					name:"Baja Presion",
					shortName:"Bp"
				},
				{
					name:"Chelas",
					shortName:"Ch"
				},
				{
					name:"Cubierto",
					shortName:"Cu"
				},
				{
					name:"Trabajo",
					shortName:"T"
				},
				{
					name:"Sol",
					shortName:"S"
				},
				{
					name:"Nubes lejos",
					shortName:"Nl"
				},
				{
					name:"Nubes cerca",
					shortName:"Nc"
				},
				{
					name:"Lluvia",
					shortName:"Ll"
				},
				{
					name:"M",
					shortName:"Mojado"
				},
				{
					name:"Vacaciones",
					shortName:"Va"
				}
			],
			rules: [
				{
					antecedents:[
							{
									shortName:"C",
									sign: true
							},
							{
									shortName:"P",
									sign: true
							},
							{
									shortName:"H",
									sign: false
							}
						],
					conclusions:
						[
							{
									shortName:"S",
									sign: true
							}
						]
				},
				{
					antecedents:
						[{
								shortName:"H",
								sign: true
						},
						{
								shortName:"C",
								sign: true
						}],
					conclusions:
						[{
								shortName:"Nl",
								sign: true
						}]
				},
				{
					antecedents:
						[{
								shortName:"Nl",
								sign: true
						},
						{
								shortName:"Vi",
								sign: true
						}],
					conclusions:
						[{
								shortName:"Nc",
								sign: true
						}]
				},
				{
					antecedents:
						[{
								shortName:"Nc",
								sign: true
						},
						{
								shortName:"Bp",
								sign: true
						}],
					conclusions:
						[{
								shortName:"Ll",
								sign: true
						}]
				},
				{
					antecedents:
						[{
								shortName:"Ll",
								sign: true
						},
						{
								shortName:"Cu",
								sign: false
						}],
					conclusions:
						[{
								shortName:"M",
								sign: true
						}]
				},
				{
					antecedents:
						[{
								shortName:"S",
								sign: true
						},
						{
								shortName:"P",
								sign: true
						},
						{
								shortName:"Ch",
								sign: true
						}],
					conclusions:
						[{
								shortName:"Va",
								sign: true
						}]
				},
				{
					antecedents:
						[{
								shortName:"Ch",
								sign: false
						},
						{
								shortName:"T",
								sign: true
						}],
					conclusions:
						[{
								shortName:"Va",
								sign: false
						}]
				},
			],
			factualBasisAntecedents :[
				{
					shortName: "C"
				},
				{
					shortName: "P"
				},
				{
					shortName: "H"
				},
				{
					shortName: "Vi"
				},
				{
					shortName: "Bp"
				},
				{
					shortName: "Ch"
				},
				{
					shortName: "Cu"
				},
				{
					shortName: "T"
				}
			],
			factualBasisIntermediateConclusions: [
				{
					shortName: "S"
				},
				{
					shortName: "Nl"
				},
				{
					shortName: "Nc"
				},
				{
					shortName: "Ll"
				}
			],
			factualBasisConclusion: [
				{
					shortName: "M"
				},
				{
					shortName: "Va"
				}
			],
			baseFacts :[
				{
					shortName : "C",
					value : true,
					origin : "Human",
					typeOfSection : "Antecedent",
					explanation : ""
				},
				{
					shortName : "P",
					value : false,
					origin : "Human",
					typeOfSection : "Antecedent",
					explanation : ""
				},
				{
					shortName : "H",
					value : true,
					origin : "Human",
					typeOfSection : "Antecedent",
					explanation : ""
				},
				{
					shortName : "Nl",
					value : true,
					origin : "Computer",
					typeOfSection : "IntermediateConclusion",
					explanation : ""
				},
				{
					shortName : "Vi",
					value : false,
					origin : "Human",
					typeOfSection : "Antecedent",
					explanation : ""
				},
				{
					shortName : "Bp",
					value : true,
					origin : "Human",
					typeOfSection : "Antecedent",
					explanation : ""
				},
				{
					shortName : "Cu",
					value : false,
					origin : "Human",
					typeOfSection : "Antecedent",
					explanation : ""
				},
				{
					shortName : "Ch",
					value : true,
					origin : "Human",
					typeOfSection : "Antecedent",
					explanation : ""
				},
				{
					shortName : "T",
					value : true,
					origin : "Human",
					typeOfSection : "Antecedent",
					explanation : ""
				},
				{
					shortName : "S",
					value : true,
					origin : "Human",
					typeOfSection : "IntermediateConclusion",
					explanation : ""
				},
				{
					shortName : "Nc",
					value : true,
					origin : "Human",
					typeOfSection : "IntermediateConclusion",
					explanation : ""
				},
				{
					shortName : "Ll",
					value : true,
					origin : "Human",
					typeOfSection : "IntermediateConclusion",
					explanation : ""
				},
				{
					shortName : "M",
					value : true,
					origin : "Computer",
					typeOfSection : "Conclusion",
					explanation : ""
				}
			]
		}
});