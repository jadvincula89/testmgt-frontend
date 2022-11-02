import React from 'react';

export default function SubmitBtn(props) {
    return (
        <button className='bg-green text-color-white m-15' onClick={ props.onClick }>
            { props.title }
        </button>
    )
}
