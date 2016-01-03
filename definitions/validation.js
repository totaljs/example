// All schemes use this delegate for validation.
// Each schema can have own validation `schema.setValidate()`.
F.onValidate = function(name, value, path) {
	switch (name) {
		case 'email':
			return value.isEmail();
		case 'name':
		case 'body':
			return value.length > 0;
		case 'password':
			if (!value.length)
				return false;
			if (value.length < 6)
				return 'error-password-short';
			return true;
	}
};