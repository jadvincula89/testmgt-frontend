import React from 'react';

export default function ExitBtn(props) {
    return (
        <button className={props.additionalStyle+'bg-gold text-color-white m-15'} onClick={ props.onClick }>
            { props.title }
        </button>
    )
}
