import React from "react";
import { useSelector, useDispatch } from 'react-redux';

function Test() {

    const dispatch = useDispatch();

    function c0inc() {
        return {
            type: "INCRC0"
        }
    }

    return(
        <div
            style={{fontSize: "30px", margin: "40px"}}
        >
            <button style={{fontSize: "30px", marginRight: "30px"}}
                onClick={() => {
                    dispatch(c0inc());
                }}
            >Incr-c0</button>
            <button style={{fontSize: "30px"}}
                onClick={() => {
                    dispatch({
                        type: "INCRC1",
                        payload: 1
                    });
                }}
            >Incr-c1</button>
        </div>
    );
}

export default Test;