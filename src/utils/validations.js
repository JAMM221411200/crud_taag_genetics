export default {
	required: (value) => {
		if (Array.isArray(value)) {
			return value.length ? true : false;
		}

		if (value) return true;

		return "Campo requerido.";
	},
};
