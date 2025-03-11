sap.ui.define(
	["./BaseController", "sap/ui/dom/includeStylesheet", "./../myLib/callApi"],
	function (BaseController, includeStyleSheet, apiCall) {
		"use strict";

		return BaseController.extend("chartwallet.controller.Login", {
			onInit: function () {
				// apply content density mode to root view
				this.getView().addStyleClass(
					this.getOwnerComponent().getContentDensityClass(),
				);

				// apply css
				includeStyleSheet("../style/login.css");
			},
			onLoginPress: function (oEvent) {
				/*const oData = {
					email: this.getView().byId("loginEmailField").getValue(),
					passwd: this.getView().byId("loginPasswdField").getValue(),
				};
				const sUrl = "auth/login";

				apiCall.callApi(oData, sUrl).then(() => {
					this.getOwnerComponent().setIsLogged(true);
					console.log("Successfully logged in");
				});*/

				const oData = {};
				const sUrl = "user/1";

				// apiCall.callApi(oData, sUrl).then(() => {
				// 	this.getOwnerComponent().setIsLogged(true);
				// 	console.log("Successfully logged in");
				// });

				this.getOwnerComponent().setIsLogged(true);
				this.navTo("home");
			},
		});
	},
);
