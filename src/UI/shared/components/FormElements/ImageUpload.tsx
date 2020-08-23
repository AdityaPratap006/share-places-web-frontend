import React, { useRef, useState, useEffect } from 'react';
import styles from './ImageUpload.module.scss';
import inputStyles from './Input.module.scss';
import Button from './Button';

interface ImageUploadProps {
    id: string;
    center?: boolean;
    onInput: (id: string, file: File, isValid: boolean) => void;
    errorText: string;
}

const ImageUpload: React.FC<ImageUploadProps> = (props) => {
    const [file, setFile] = useState<File>();
    const [previewUrl, setPreviewUrl] = useState<string>();
    const [isValid, setIsValid] = useState<boolean>(false);

    const filePickerRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!file) {
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = () => {
            if (typeof fileReader.result === 'string') {
                setPreviewUrl(fileReader.result);
            }
        };
        fileReader.readAsDataURL(file);
    }, [file]);

    const pickedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        let pickedFile: File | undefined;
        let fileIsValid = isValid;
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;
        }

        if (pickedFile) {
            props.onInput(props.id, pickedFile, fileIsValid);
        }
    }

    const pickImageHandler = () => {
        if (filePickerRef.current) {
            filePickerRef.current.click();
        }
    }

    return (
        <div className={inputStyles['form-control']}>
            <input
                ref={filePickerRef}
                id={props.id}
                style={{
                    display: 'none',
                }}
                type="file"
                accept=".jpg,.png,.jpeg"
                onChange={pickedHandler}
            />
            <div className={`${styles['image-upload']} ${props.center && styles['center']}`}>
                <div className={styles['image-upload__preview']}>
                    {previewUrl && <img alt="preview" src={previewUrl} />}
                    {!previewUrl && <p>Please pick an image.</p>}
                </div>
                <Button type="button" onClick={pickImageHandler}>
                    PICK IMAGE
                </Button>
            </div>
            {file && !isValid && <p>{props.errorText}</p>}
        </div>
    );
};

export default ImageUpload;
