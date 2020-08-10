import React from 'react';
import styles from './Auth.module.scss';

// Utils
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../../utils/validators';

// Models
import { InputElement } from '../../../models';

// hooks
import { useForm, FormState } from '../../shared/hooks';

// Components
import Card from '../../shared/components/Card/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';

const INITIAL_STATE: FormState = {
    inputs: {
        email: {
            value: '',
            isValid: false,
        },
        password: {
            value: '',
            isValid: false,
        }
    },
    isValid: false,
}

const Auth: React.FC = () => {
    const [formState, inputChangeHandler] = useForm(INITIAL_STATE);

    const authSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formState);
    }

    return (
        <Card className={styles['authentication']}>
            <h2 className={styles['authentication__header']}>Login</h2>
            <hr />
            <form onSubmit={authSubmitHandler}>
                <Input
                    id="email"
                    element={InputElement.INPUT}
                    type="email"
                    label="E-mail"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Please enter a valid email address."
                    getInput={inputChangeHandler}
                    autoComplete="username"
                />
                <Input
                    id="password"
                    element={InputElement.INPUT}
                    type="password"
                    label="Password"
                    validators={[VALIDATOR_MINLENGTH(6)]}
                    errorText="Please enter a valid password (at least 6 characters)."
                    getInput={inputChangeHandler}
                    autoComplete="current-password"
                />
                <Button
                    type="submit"
                    disabled={!formState.isValid}
                >
                    LOGIN
                </Button>
            </form>
        </Card>
    );
};

export default Auth;
