sap.ui.define(
	["./BaseController", "sap/ui/dom/includeStylesheet", "sap/ui/model/json/JSONModel", "./../myLib/callApi"],
	function (BaseController, includeStyleSheet, JSONModel, apiCall) {
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
				const that = this;
				const oData = {
					email: this.getView().byId("loginEmailField").getValue(),
					password: this.getView().byId("loginPasswdField").getValue(),
				};

				apiCall.askToLogin(oData).then((oResp) => {
					// Se c'è il token lo salvo e vado alla home
					if (oResp.token) {
						this.getOwnerComponent()._setToken(oResp.token);
						this.getOwnerComponent()._setUser(oResp.user);
						console.log("Successfully logged in");
						this.navTo("home");
					}
				}, (oError) => {
					if (oError) {
						that.getView().byId("loginEmailField").setValueState("Error");
						that.getView().byId("loginPasswdField").setValueState("Error");
						return;
					}
				});
			},
		});
	},
);
