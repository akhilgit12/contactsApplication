
(function () {

	var app = angular.module("contactsApp");
	app.controller('ContactCtrl', function (contactDataSVC) {
		var self = this;
		self.editMode = false;
		contactDataSVC.getContacts()
			.then(function (data) {
				self.contacts = data;
			});
		this.selectContact = function (index) {
			self.successMessage = undefined;
			self.errorMessage = undefined;
			self.selectedContact = self.contacts[index];
		}
		this.toggleEditMode = function (index) {
			self.selectedContact = self.contacts[index];
			if(self.selectedContact.editMode == undefined){
				self.selectedContact.editMode = true;
			}
			else{
				self.editMode = ! self.editMode;
				self.selectedContact.editMode = !self.selectedContact.editMode;
			}
		};
		this.addContact = function () {
			self.addMode = true;
			this.selectedContact = {
				"id": new Date().toTimeString(),
				"picture":{"medium":"icons8-customer-100.png"}
			};
			this.editMode = true;
		}
		this.saveUser = function (index) {
			if(index != undefined){
				this.toggleEditMode(index);
			}
			var userDate = this.selectedContact;
			if (self.addMode) {
				contactDataSVC.addUser(userDate)
			.then(function () {
					self.successMessage = "Data updated Successfully";
					contactDataSVC.getContacts()
					.then(function (data) {
						self.contacts = data;
					});
				},
					function () {
						self.errorMessage = "Error in saving the values";
					}
				);
				self.addMode = false;
			}
			else {
				contactDataSVC.saveUser(userDate)
					.then(function () {
						self.successMessage = "Data updated Successfully";
					},
					function () {
						self.errorMessage = "Error in saving the values";
					}
					);
			}

		};
	});

})();