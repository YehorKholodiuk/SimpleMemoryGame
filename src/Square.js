import React from 'react';

const style = {
    background: 'lightgreen',
    border: '1px solid darkgreen',
    fontSize: '30px',
    fontWeight: '800',
    cursor: 'pointer',
    outline: 'none'
}

const Square = ({card, openCard, openClickable}) => (
    <button
        disabled={!openClickable}
        style={style}
        onClick={() => openCard(card.id)}
    >
        {card.open ? card.emoji : null}
    </button>
)

export default Square;

