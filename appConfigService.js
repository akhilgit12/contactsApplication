
(function(){
var app = angular.module("contactsApp");

app.service('AppDataSvc', function (AppDataValSvc)
{
	this.name=AppDataValSvc;
	this.author="Ak";
	this.buildDate=new Date().toDateString();
	
});

})();

//for calling in construtor mode new prepAppData()

//app.factory('AppDataSvc', prepAppData); calls in function call mode prepAppData()
