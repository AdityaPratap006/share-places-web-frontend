export enum InputValidatorTypes {
    VALIDATOR_TYPE_REQUIRE = 'REQUIRE',
    VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH',
    VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH',
    VALIDATOR_TYPE_MIN = 'MIN',
    VALIDATOR_TYPE_MAX = 'MAX',
    VALIDATOR_TYPE_EMAIL = 'EMAIL',
    VALIDATOR_TYPE_FILE = 'FILE',
}

export interface InputValidator {
    type: InputValidatorTypes;
    val?: number;
}

export const VALIDATOR_REQUIRE = () => ({ type: InputValidatorTypes.VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_FILE = () => ({ type: InputValidatorTypes.VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = (val: number) => ({
    type: InputValidatorTypes.VALIDATOR_TYPE_MINLENGTH,
    val: val
});
export const VALIDATOR_MAXLENGTH = (val: number) => ({
    type: InputValidatorTypes.VALIDATOR_TYPE_MAXLENGTH,
    val: val
});
export const VALIDATOR_MIN = (val: number) => ({ type: InputValidatorTypes.VALIDATOR_TYPE_MIN, val: val });
export const VALIDATOR_MAX = (val: number) => ({ type: InputValidatorTypes.VALIDATOR_TYPE_MAX, val: val });
export const VALIDATOR_EMAIL = () => ({ type: InputValidatorTypes.VALIDATOR_TYPE_EMAIL });

export const validate = (value: string, validators: InputValidator[]) => {
    let isValid = true;
    for (const validator of validators) {
        if (validator.val === undefined) {
            validator.val = 0;
        }

        if (validator.type === InputValidatorTypes.VALIDATOR_TYPE_REQUIRE) {
            isValid = isValid && value.trim().length > 0;
        }
        if (validator.type === InputValidatorTypes.VALIDATOR_TYPE_MINLENGTH) {
            isValid = isValid && value.trim().length >= validator.val;
        }
        if (validator.type === InputValidatorTypes.VALIDATOR_TYPE_MAXLENGTH) {
            isValid = isValid && value.trim().length <= validator.val;
        }
        if (validator.type === InputValidatorTypes.VALIDATOR_TYPE_MIN) {
            isValid = isValid && +value >= validator.val;
        }
        if (validator.type === InputValidatorTypes.VALIDATOR_TYPE_MAX) {
            isValid = isValid && +value <= validator.val;
        }
        if (validator.type === InputValidatorTypes.VALIDATOR_TYPE_EMAIL) {
            isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
        }
    }
    return isValid;
};
