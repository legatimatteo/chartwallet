sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], function (Controller, History) {
    "use strict";

    return Controller.extend("chartwallet.controller.NotFound", {
        onInit: function () {
            // Verifica se l'utente è autenticato per determinare dove tornare
            this._isAuthenticated = this.getOwnerComponent().getIsLogged();
        },

        onNavBack: function () {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                // Se esiste una pagina precedente nella cronologia, torniamo a quella
                window.history.go(-1);
            } else {
                // Altrimenti, torniamo alla pagina iniziale in base allo stato di autenticazione
                if (this._isAuthenticated) {
                    this.getOwnerComponent().getRouter().navTo("main", {}, true);
                } else {
                    this.getOwnerComponent().getRouter().navTo("login", {}, true);
                }
            }
        }
    });
});