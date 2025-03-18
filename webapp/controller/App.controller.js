sap.ui.define([
	"./BaseController",
	"sap/m/MessageBox"
], function (
	BaseController,
	MessageBox
) {
	"use strict";

	return BaseController.extend("chartwallet.controller.App", {
		onInit: function () {
			const that = this;
			// apply content density mode to root view
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
			
			// Check if the server is reachable
			this.getOwnerComponent().checkServerReachability().then((bServerReachable) => {
				if (!bServerReachable) {
					that.showBusyIndicator().then(() => {;
						MessageBox.error(that.getBundleText("serverNotReachable"));
					});
				}
			});
		}
	});
});
