import React from 'react';
import styles from './SplashScreen.module.scss';
import Card from '../components/Card/Card';

const SplashScreen: React.FC = () => {
    return (
        <div className={styles['splash-screen']}>
            <Card className={styles['card']}>
                <h1>Welcome to SharePlaces!</h1>
            </Card>
        </div>
    );
};

export default SplashScreen;
