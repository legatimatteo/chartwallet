sap.ui.define([], function () {
	"use strict";
	const _path = "/test/api/chartwallet/";

	return {
		callApi: async function (oData, sUrl) {
			const sFullUrl = `${_path}${sUrl}`;
			console.log("Chiamando URL:", sFullUrl);
			const _retData = $.ajax({
				type: "GET",
				url: sFullUrl,
				headers: {
					"API-KEY":
						"YvUSSAmGPSKMUEKS2iIeOVgq7qRD5Lie2Rpa6EGMsAyC4oklv199BDjo4fvc8IqY",
				},
				success: function (resp) {
					console.log(resp);
				},
				error: function (jqXHR, comment, error) {
					console.log(error + ":" + " " + comment);
				},
			});

			return _retData;
		},
	};
});
