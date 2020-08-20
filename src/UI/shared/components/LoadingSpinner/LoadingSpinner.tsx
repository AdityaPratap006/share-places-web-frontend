import React from 'react';
import styles from './LoadingSpinner.module.scss';

interface LoadingSpinnerProps {
  asOverlay?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = props => {
  return (
    <div className={`${props.asOverlay && styles['loading-spinner__overlay']}`}>
      <div className={styles['lds-dual-ring']}></div>
    </div>
  );
};

export default LoadingSpinner;
