sap.ui.define(function () {
	"use strict";

	return {
		name: "QUnit test suite for the UI5 Application: chartwallet",
		defaults: {
			page: "ui5://test-resources/chartwallet/Test.qunit.html?testsuite={suite}&test={name}",
			qunit: {
				version: 2
			},
			sinon: {
				version: 1
			},
			ui5: {
				language: "EN",
				theme: "sap_horizon"
			},
			coverage: {
				only: "chartwallet/",
				never: "test-resources/chartwallet/"
			},
			loader: {
				paths: {
					"chartwallet": "../"
				}
			}
		},
		tests: {
			"unit/unitTests": {
				title: "Unit tests for chartwallet"
			},
			"integration/opaTests": {
				title: "Integration tests for chartwallet"
			}
		}
	};
});
