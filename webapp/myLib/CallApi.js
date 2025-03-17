sap.ui.define([], function () {
	"use strict";
	const _path = "/i3s/";

	return {
		callApi: function (oData, sUrl) {
			const sFullUrl = `${_path}${sUrl}`;
			console.log("Chiamando URL:", sFullUrl);
			return new Promise ((resolve, reject) => {
				$.ajax({
					type: "POST",
					url: sFullUrl,
					dataType: "json",
            		contentType: "application/json",
					data: JSON.stringify(oData),
					success: function (resp) {
						console.log(resp);
						resolve(resp);
					},
					error: function (comment, error) {
						console.log(error + ":" + " " + comment);
						reject(error);
					},
				});
			});
		},
		askToLogin: function (oData, sUrl = "auth/login") {
			return this.callApi(oData, sUrl);
		}
	};
});
