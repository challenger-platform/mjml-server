import js from "@eslint/js";
import globals from "globals";

export default [
	js.configs.recommended,
	{
		rules: {
			'indent': ['error', 'tab', {
				'SwitchCase': 1,
			}],
			'no-tabs': 'off',
			"no-unused-vars": "error",
			"no-undef": "error",
			"prefer-const": "error",
		},
		languageOptions: {
			globals: {
				...globals.node
			}
		}
	}
];
