app.factory('autoLoadData', function (localStorageService) {

    return {
    	atoms: function(){
				//Load Local Storage
				if(localStorageService.get("localStorageFile-Atoms"))
					return localStorageService.get("localStorageFile-Atoms");
				return [];
			},
		rules: function(){
				if(localStorageService.get("localStorageFile-Rules"))
					return localStorageService.get("localStorageFile-Rules");
				return [];
			}
    
	}
});