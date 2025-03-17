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
			// Check for login before continuing
			this.getRouter().getRoute("home").attachPatternMatched(this._checkLoggedIn, this);
			// Check if the server is reachable
			this.getOwnerComponent().checkServerReachability().then((bServerReachable) => {
				if (!bServerReachable) {
					that.showBusyIndicator().then(() => {;
						MessageBox.error(that.getBundleText("serverNotReachable"));
					});
				}
			});
		},
		/**
		 * Returns a promise which resolves with the resource bundle value of the given key <code>sI18nKey</code>
		 *
		 * @public
		 * @param {string} sI18nKey The key
		 * @param {string[]} [aPlaceholderValues] The values which will repalce the placeholders in the i18n value
		 * @returns {Promise<string>} The promise
		 */
		getBundleText: function(sI18nKey, aPlaceholderValues){
			return this.getBundleTextByModel(sI18nKey, this.getOwnerComponent().getModel("i18n"), aPlaceholderValues);
		},
		onSideNavButtonPress: function() {
			var oToolPage = this.byId("app");
			var bSideExpanded = oToolPage.getSideExpanded();
			this._setToggleButtonTooltip(bSideExpanded);
			oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
		},
		_setToggleButtonTooltip : function(bSideExpanded) {
			var oToggleButton = this.byId('sideNavigationToggleButton');
			this.getBundleText(bSideExpanded ? "expandMenuButtonText" : "collpaseMenuButtonText").then(function(sTooltipText){
				oToggleButton.setTooltip(sTooltipText);
			});
		},
	});
});
