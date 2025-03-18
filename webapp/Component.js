sap.ui.define(
	["sap/ui/core/UIComponent", "sap/ui/Device", "./model/models", "sap/ui/util/Storage", "sap/ui/model/json/JSONModel"],
	function (UIComponent, Device, models, Storage, JSONModel) {
		"use strict";

		return UIComponent.extend("chartwallet.Component", {
			metadata: {
				manifest: "json",
			},
			init: function () {
				// call the base component's init function
				UIComponent.prototype.init.call(this); // create the views based on the url/hash

				// create the device model
				this.setModel(models.createDeviceModel(), "device");

				// create the views based on the url/hash
				this.getRouter().initialize();						

				// TODO: Manage login
				this._isLogged = false;
			},

			/**
			 * This method can be called to determine whether the sapUiSizeCompact or sapUiSizeCozy
			 * design mode class should be set, which influences the size appearance of some controls.
			 * @public
			 * @returns {string} css class, either 'sapUiSizeCompact' or 'sapUiSizeCozy' - or an empty string if no css class should be set
			 */
			getContentDensityClass: function () {
				if (this.contentDensityClass === undefined) {
					// check whether FLP has already set the content density class; do nothing in this case
					if (
						document.body.classList.contains("sapUiSizeCozy") ||
						document.body.classList.contains("sapUiSizeCompact")
					) {
						this.contentDensityClass = "";
					} else if (!Device.support.touch) {
						// apply "compact" mode if touch is not supported
						this.contentDensityClass = "sapUiSizeCompact";
					} else {
						// "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
						this.contentDensityClass = "sapUiSizeCozy";
					}
				}
				return this.contentDensityClass;
			},
			/**
			 * Check for server reachability
			 * @returns boolean true if the server is reachable
			 */
			checkServerReachability: function () {
				const sUrl = "/i3s/status";

				return new Promise((resolve) => {
					$.ajax({
						type: "GET",
						url: sUrl,
						async: true,
						success: function (resp) {
							console.log("Server is reachable");
							resolve(true);
						},
						error: function (jqXHR, comment, error) {
							console.log(error + ": " + comment);
							resolve(false);
						},
					});
				});
			},
			/**
			 * Set the login status
			 * @param {*} token 
			 */
			_setUser(user) {
				const _userModel = new JSONModel(user);
				this.setModel(_userModel, "_userModel");
			},
			/**
			 * Set the login status
			 * @param {*} token 
			 */
			_setToken(token) {
				Storage.put("token", token);
				this._isLogged = true;
			},
			/**
			 * Get the login status
			 */
			_getToken() {
				return Storage.get("token");
			},
			/**
			 * Set the login status
			 * @param {*} status 
			 */
			getIsLogged() {
				return this._isLogged;
			}
		});
	},
);
