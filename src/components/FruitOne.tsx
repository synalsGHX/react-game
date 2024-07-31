import React from 'react';

interface FruitOneProps {
    type: 'square' | 'circle' | 'triangle' | 'hexagon';
    x: number;
    y: number;
}

const FruitOne: React.FC<FruitOneProps> = ({ type, x, y }) => {
    const styles: React.CSSProperties = {
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        width: '50px',
        height: '50px'
    };

    switch (type) {
        case 'square':
            return <div style={{ ...styles }} className='square'></div>;
        case 'circle':
            return <div style={{ ...styles }} className='circle'></div>;
        case 'triangle':
            return (
                <div style={{ ...styles }} className='triangle'></div>
            );
        case 'hexagon':
            return (
                <div style={{ ...styles }} className='hexagon'></div>
            );
        default:
            return null;
    }
};

export default FruitOne;
