sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
], function (Controller, UIComponent, MessageToast, MessageBox, JSONModel) {
    "use strict";

    return Controller.extend("chartwallet.controller.Settings", {
        
        /**
         * Called when the controller is instantiated.
         * Initializes the settings model if not available.
         */
        onInit: function () {
     
        },
        
        /**
         * Handles the back navigation
         */
        onNavBack: function () {
            // Check for unsaved changes
            var oCurrentModel = this.getView().getModel().getData();
            var bHasChanges = !this._areObjectsEqual(oCurrentModel, this._oOriginalSettings);
            
            if (bHasChanges) {
                MessageBox.confirm("Ci sono modifiche non salvate. Sei sicuro di voler uscire?", {
                    actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                    emphasizedAction: MessageBox.Action.NO,
                    onClose: function (sAction) {
                        if (sAction === MessageBox.Action.YES) {
                            // Navigate back without saving
                            this._navBack();
                        }
                    }.bind(this)
                });
            } else {
                // No changes, just navigate back
                this._navBack();
            }
        },
        
        /**
         * Navigate back to previous page or to home
         * @private
         */
        _navBack: function () {
            var oHistory = sap.ui.core.routing.History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();
            
            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                this.oRouter.navTo("home", {}, true);
            }
        },
        
        /**
         * Save settings
         */
        onSave: function () {
            var oModel = this.getView().getModel();
            var oSettings = oModel.getData();
            
            // Show busy indicator
            this.getView().setBusy(true);
            
            // Simulate backend call
            setTimeout(function () {
                // Apply theme if changed
                this._applyTheme(oSettings.settings.theme);
                
                // Apply density if changed
                this._applyDensity(oSettings.settings.density);
                
                // Update original data
                this._oOriginalSettings = jQuery.extend(true, {}, oSettings);
                
                // Hide busy indicator
                this.getView().setBusy(false);
                
                // Show success message
                MessageToast.show("Impostazioni salvate con successo");
            }.bind(this), 1000);
            
            // In a real application, you would call your backend service here
            /*
            var oSettingsService = this.getOwnerComponent().getSettingsService();
            oSettingsService.saveSettings(oSettings)
                .then(function() {
                    // Success handling
                    MessageToast.show("Impostazioni salvate con successo");
                    this._oOriginalSettings = jQuery.extend(true, {}, oSettings);
                }.bind(this))
                .catch(function(oError) {
                    // Error handling
                    MessageBox.error("Errore durante il salvataggio: " + oError.message);
                })
                .finally(function() {
                    this.getView().setBusy(false);
                }.bind(this));
            */
        },
        
        /**
         * Cancel changes and restore original settings
         */
        onCancel: function () {
            // Ask for confirmation
            MessageBox.confirm("Vuoi annullare tutte le modifiche?", {
                actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                emphasizedAction: MessageBox.Action.YES,
                onClose: function (sAction) {
                    if (sAction === MessageBox.Action.YES) {
                        // Restore original data
                        var oModel = this.getView().getModel();
                        oModel.setData(jQuery.extend(true, {}, this._oOriginalSettings));
                        
                        MessageToast.show("Modifiche annullate");
                    }
                }.bind(this)
            });
        },
        
        /**
         * Apply selected theme
         * @private
         */
        _applyTheme: function (sTheme) {
            var sCurrentTheme = sap.ui.getCore().getConfiguration().getTheme();
            if (sCurrentTheme !== sTheme) {
                sap.ui.getCore().applyTheme(sTheme);
            }
        },
        
        /**
         * Apply selected content density
         * @private
         */
        _applyDensity: function (sDensity) {
            var $body = jQuery("body");
            
            // Remove existing classes
            $body.removeClass("sapUiSizeCozy sapUiSizeCompact");
            
            // Add the selected class
            if (sDensity === "compact") {
                $body.addClass("sapUiSizeCompact");
            } else {
                $body.addClass("sapUiSizeCozy");
            }
        },
        
        /**
         * Handle density changes in the UI
         * @private
         */
        _handleDensityChange: function () {
            var oView = this.getView();
            
            // Make sure the view is loaded
            if (!oView) {
                return;
            }
            
            // Find the segmented button
            var oSegmentedButton = oView.byId("idIconTabBar").$().find(".sapMSegmentedButton");
            
            if (oSegmentedButton) {
                oSegmentedButton.on("select", function (oEvent) {
                    var sDensity = oEvent.getSource().getSelectedKey();
                    this._applyDensity(sDensity);
                }.bind(this));
            }
        },
        
        /**
         * Deep compare two objects
         * @param {Object} obj1 First object to compare
         * @param {Object} obj2 Second object to compare
         * @returns {boolean} True if objects are equal
         * @private
         */
        _areObjectsEqual: function (obj1, obj2) {
            return JSON.stringify(obj1) === JSON.stringify(obj2);
        }
    });
});