import React, { useCallback, useEffect, useRef, useState } from 'react';
import Element from './FruitOne';
import './styles.css';

interface Shape {
    type: 'square' | 'circle' | 'triangle' | 'hexagon';
    speed: number;
    id: number;
    x: number;
    y: number;
    score: number
}

interface ShapeBase {
    type: 'square' | 'circle' | 'triangle' | 'hexagon';
    speed: number;
    score: number
}

const shapes: ShapeBase[] = [
    { type: 'square', speed: 1, score: 1, },
    { type: 'circle', speed: 1.25, score: 2, },
    { type: 'triangle', speed: 1.5, score: 3, },
    { type: 'hexagon', speed: 1.75, score: 4, }
];

const Game: React.FC<{ onGameOver: (score: number) => void }> = ({ onGameOver }) => {
    const [elements, setElements] = useState<Shape[]>([]);
    const [score, setScore] = useState(0);
    const gameScreenRef = useRef<HTMLDivElement>(null);
    const gestureState = useRef<boolean>(false)

    useEffect(() => {
        setElements(shapes.map(shape => ({
            ...shape,
            id: Math.random(),
            x: Math.random() * window.innerWidth,
            y: 0
        })));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setElements(prev =>
                prev.map(e => ({ ...e, y: e.y + e.speed * 5 }))
            );
        }, 100);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (elements.some(e => e.y >= window.innerHeight)) {
            onGameOver(score);
        }
    }, [elements, onGameOver, score]);


    const handleStart = () => {
        gestureState.current = true;
    }

    const handleOver = useCallback((e: TouchEvent | MouseEvent) => {
        if (!gestureState.current) return;
        const touch = (e as TouchEvent).touches ? (e as TouchEvent).touches[0] : (e as MouseEvent);
        const swipeX = touch.clientX;
        const swipeY = touch.clientY;
        setElements(prev => {
            const newElements = [...prev];
            newElements.forEach((el, index) => {
                if (Math.abs(el.x - swipeX) < 50 && Math.abs(el.y - swipeY) < 50) {
                    setScore(score + el.score);
                    newElements[index] = {
                        ...el,
                        id: Math.random(),
                        x: Math.random() * window.innerWidth,
                        y: 0
                    };
                }
            });
            return newElements;
        });
    }, [score]);

    const handleEnd = () => {
        gestureState.current = false;
    }
    useEffect(() => {
        const container = gameScreenRef.current;
        //按下
        container?.addEventListener('mousedown', handleStart);
        container?.addEventListener('touchstart', handleStart);
        //移动
        container?.addEventListener('mousemove', handleOver);
        container?.addEventListener('touchmove', handleOver);
        //松开
        container?.addEventListener('mouseup', handleEnd);
        container?.addEventListener('touchend', handleEnd);

        return () => {
            container?.removeEventListener('mousedown', handleStart);
            container?.removeEventListener('touchstart', handleStart);

            container?.removeEventListener('mousemove', handleOver);
            container?.removeEventListener('touchmove', handleOver);

            container?.removeEventListener('mouseup', handleEnd);
            container?.removeEventListener('touchend', handleEnd);
        };
    }, [handleOver]);

    return (
        <div ref={gameScreenRef} className="game">
            <h1>Score: {score}</h1>
            {elements.map(el => (
                <Element key={el.id} type={el.type} x={el.x} y={el.y} />
            ))}
        </div>
    );
};

export default Game;
