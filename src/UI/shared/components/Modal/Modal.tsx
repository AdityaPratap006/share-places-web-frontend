import React from 'react';
import styles from './Modal.module.scss';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import BackDrop from '../BackDrop/BackDrop';

interface ModalOverlayProps {
    className?: string;
    style?: React.CSSProperties;
    headerClassName?: string;
    header: React.ReactNode;
    onSubmit?: (event?: React.FormEvent<HTMLFormElement>) => void;
    contentClassName?: string;
    footerClassName?: string;
    footerContent?: React.ReactNode;
}

const ModalOverlay: React.FC<ModalOverlayProps> = props => {
    const content = (
        <div className={`${styles['modal']} ${props.className}`} style={props.style}>
            <header className={`${styles['modal__header']} ${props.headerClassName}`}>
                <h2>{props.header}</h2>
            </header>
            <form onSubmit={props.onSubmit ? props.onSubmit : event => event.preventDefault()}>
                <div className={`${styles['modal__content']} ${props.contentClassName}`}>
                    {props.children}
                </div>
                <footer className={`${styles['modal__footer']} ${props.footerClassName}`}>
                    {props.footerContent}
                </footer>
            </form>
        </div>
    );
    return ReactDOM.createPortal(content, document.getElementById('modal-hook') as HTMLElement);
}

interface ModalProps extends ModalOverlayProps {
    show: boolean;
    onCancel: () => void;
}

const Modal: React.FC<ModalProps> = (props) => {
    return (
        <React.Fragment>
            {props.show && <BackDrop onClick={props.onCancel} />}
            <CSSTransition
                in={props.show}
                mountOnEnter
                unmountOnExit
                timeout={200}
                classNames={{
                    enterActive: styles['modal-enter'],
                    enterDone: styles['modal-enter-active'],
                    exitActive: styles['modal-exit'],
                    exit: styles['modal-exit-active'],
                }}
            >
                <ModalOverlay
                    {...props}
                />
            </CSSTransition>
        </React.Fragment>
    );
};

export default Modal;
