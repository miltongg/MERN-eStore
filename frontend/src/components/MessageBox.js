import React from 'react';
import {Alert} from "react-bootstrap";

export const MessageBox = (props) => {
    return (

        <Alert className="m-auto py-3 w-50 text-center fs-3" variant={props.variant || 'info'}>{props.children}</Alert>

    );
};
