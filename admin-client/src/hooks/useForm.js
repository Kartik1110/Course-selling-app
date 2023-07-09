import { useState } from 'react';

export const useForm = (initialValues) => {
	const [state, setState] = useState(initialValues);

	/* This is used to set the form back to original state */
	const resetState = () => {
		setState(initialValues);
	};

	return [
		state,
		(e) => {
			setState({ ...state, [e.target.name]: e.target.value });
		},
		resetState,
	];
};
