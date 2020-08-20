import React, { useEffect, useState } from 'react';
import styles from './Users.module.scss';

// Model
import { User } from '../../../models';

// Components
import UserList from '../components/UserList/UserList';
import ErrorModal from '../../shared/components/ErrorModal/ErrorModal';
import LoadingSpinner from '../../shared/components/LoadingSpinner/LoadingSpinner';

interface ResponseData {
    users: User[],
    message?: string;
}

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [responseError, setResponseError] = useState<string>();

    useEffect(() => {
        const sendRequest = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`http://localhost:5000/users`);
                const responseData: ResponseData = await response.json();

                if (!response.ok) {
                    throw new Error(responseData.message);
                }

                setUsers(responseData.users);
            } catch (err) {
                const error = err as Error;
                console.log(error);
                setResponseError(error.message || `Something went wrong!`);
            } finally {
                setIsLoading(false);
            }
        };

        sendRequest();
    }, []);

    const resetResponseErrorHandler = () => {
        setResponseError(undefined);
    }

    return (
        <React.Fragment>
            <ErrorModal
                error={responseError}
                onClear={resetResponseErrorHandler}
            />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && users && (
                <div className={styles['users-page']}>
                    <UserList
                        users={users}
                    />
                </div>
            )}
        </React.Fragment>
    );
};

export default Users;
