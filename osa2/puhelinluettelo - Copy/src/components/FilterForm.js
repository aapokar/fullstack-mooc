import React from "react";

const Filterform = (props) => {
    return ( 
        <div>
        filter shown with < input 
        value = {props.filter} 
        onChange = {props.handler} />
        </div>
    )}

export default Filterform