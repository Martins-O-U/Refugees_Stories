import { useState } from 'react';


const useForm = (initialValue) => {

	const [visibility, setVisibility] = useState(initialValue);

	const handleOpen = () => {
        setVisibility(true);
    };

    const handleClose = () => {
        setVisibility(false);
    };

	return [
		visibility,
		handleOpen,
		handleClose,
	]
};

export default useForm;