sap.ui.define(
	["./BaseController", "sap/ui/dom/includeStylesheet"],
	function (BaseController, includeStyleSheet) {
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
		});
	},
);
