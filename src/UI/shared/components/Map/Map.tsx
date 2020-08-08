/// <reference types="@types/googlemaps" />
import React, { useRef, useEffect } from 'react';
import styles from './Map.module.scss';

interface MapProps {
    className?: string;
    style?: React.CSSProperties;
    center: {
        lat: number;
        lng: number;
    };
    zoom: number;
}

const Map: React.FC<MapProps> = (props) => {
    const mapRef = useRef<HTMLDivElement>(null);

    const { center, zoom } = props;

    useEffect(() => {
        const map = new window.google.maps.Map(mapRef.current!, {
            center: center,
            zoom: zoom,
        });

        new window.google.maps.Marker({
            position: center,
            map: map,
        });
    }, [center, zoom]);

    return (
        <div ref={mapRef} className={`${styles['map']} ${props.className}`} style={props.style}>

        </div>
    );
};

export default Map;
