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
					// Da rivedere perche non funziona
					if (oResp === "error") {
						console.log("Wrong credentials");
						that.getView().byId("loginEmailField").setValueState("Error");
						that.getView().byId("loginPasswdField").setValueState("Error");
						that.getView().byId("loginPasswdField").setValueStateText(that.getBundeText("wrongCredentials"));
						return;
					}
					// Praticamente impossibile che non ci sia il token
					if (!oResp.token) {
						console.log("No token received");
						return;
					}
					// Se c'è il token lo salvo e vado alla home
					if (oResp.token) {
						this.getOwnerComponent()._setToken(oResp.token);
						console.log("Successfully logged in");
						this.navTo("home");
					}
				});
			},
		});
	},
);
