import React from 'react';

export default function BasicBtn(props) {
    return (
        <button className={props.additionalStyle+' bg-blue text-color-white m-15'} onClick={ props.onClick }>
            { props.title }
        </button>
    )
}
