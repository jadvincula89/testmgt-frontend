import React from 'react';

export default function CancelBtn(props) {
    return (
        <button className='bg-red text-color-white m-15' onClick={ props.onClick }>
            { props.title }
        </button>
    )
}
