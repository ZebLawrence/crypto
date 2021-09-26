import React, { useEffect, useState } from 'react';
import Square from '../../assets/images/square';
import Arrow from '../../assets/images/arrow';
import './numberChange.scss';

const NumberChange = props => {
    const { val, showDirection } = props;
    const [flashClass, setFlashClass] = useState('flash');
    const [previousNum, setPreviousNum] = useState(0);
    const [arrowDirection, setArrowDirecttion] = useState(0);

    useEffect(() => {
        if (val > previousNum) {
            setArrowDirecttion(1);
        } else if (val < previousNum) {
            setArrowDirecttion(-1);
        } else {
            setArrowDirecttion(0);
        }

        setPreviousNum(val);
        setFlashClass('flash');
        let timer = null;
        clearTimeout(timer);
        setTimeout(() => {
            setFlashClass('');
        }, 200);
    }, [val]);

    const direction = showDirection && (
        <span className="direction">
            {arrowDirection === 0 && <Square /> }
            {arrowDirection === 1 && <Arrow up /> }
            {arrowDirection === -1 && <Arrow /> }
        </span>
    );

    return (
        <>
            <span className={`number-container ${flashClass}`}>{val}</span>
            {direction}
        </>
    );
};

export default NumberChange;
