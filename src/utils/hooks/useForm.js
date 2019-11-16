import { useState, useEffect } from 'react';

const useForm = (callback, validate,) => {

	const [values, setValues] = useState({});
	const [errors, setErrors] = useState({});
	const [visibility, setVisibility] = useState(false);
	const [ isLoading, setLoading ] = useState(false);

	useEffect(() => {
		if(validate) setErrors(validate(values));
	}, [values, validate])

	const handleChange = (event) => {
		event.persist();
		setValues(values => ({ 
			...values, 
			[event.target.id]: event.target.value 
		}));
	};

	const handleSubmit = (event) => {
		if (event) event.preventDefault();
		setLoading(true);
		callback();
	};

	const resetForm = () => setValues({});
	const stopLoading = () => setLoading(false);
	const toggleVisibility = () => {
		if(values.password) setVisibility(!visibility)
	}

	return {
		errors,
		values,
		visibility,
		isLoading,
		stopLoading,
		resetForm,
		handleChange,
		handleSubmit,
		toggleVisibility,
	}
};

export default useForm;