export const validationChecker = (initialState, error) => {
    return initialState ? undefined : (error ? 'invalid' : 'valid');
}

export const validation = ({ email, password, value }) => {
    return {
        initialEmailState: (() => {
            if(!email) return true;
            return false;
        })(),
        initialPasswordState: (() => {
            if(!password) return true;
            return false;
        })(),
        isRequired: (() => {
            if(value) return true

            return false
        })(),
        emailMatch: (() => {
            if(email) return !(/\S+@\S+\.\S+/.test(email));
        })(),
        minMaxMatch: (() => {
            if(password)
                return !(password.length > 11 && password.length < 100);
        })(),
        numberRequired: (() => {
            if(password)
                return !(/[0-9]/.test(password));
        })(),
    }
};