import React, { useState } from 'react';
import styles from './Auth.module.scss';

// Utils
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../../utils/validators';

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
    const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
    const [formState, inputChangeHandler, setFormData] = useForm(INITIAL_STATE);

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData({
                inputs: {
                    email: formState.inputs['email'],
                    password: formState.inputs['password'],
                },
                isValid: formState.inputs['email'].isValid && formState.inputs['password'].isValid,
            });
        } else {
            setFormData({
                inputs: {
                    ...formState.inputs,
                    name: {
                        value: '',
                        isValid: false,
                    },
                },
                isValid: false,
            });
        }

        setIsLoginMode(prevMode => !prevMode);
    }

    const authSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formState);
    }

    return (
        <Card className={styles['authentication']}>
            <h2 className={styles['authentication__header']}>Login</h2>
            <hr />
            <form onSubmit={authSubmitHandler}>
                {
                    !isLoginMode && (
                        <Input
                            element={InputElement.INPUT}
                            id="name"
                            type="text"
                            label="Your Name"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter a name."
                            getInput={inputChangeHandler}
                        />
                    )
                }
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
                    {isLoginMode ? 'LOGIN' : 'SIGN UP'}
                </Button>
            </form>
            <Button
                inverse
                onClick={switchModeHandler}
            >
                {isLoginMode ? 'New here? SIGN UP' : 'Already have an account? LOGIN'}
            </Button>
        </Card>
    );
};

export default Auth;