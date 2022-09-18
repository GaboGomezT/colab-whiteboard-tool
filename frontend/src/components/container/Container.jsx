import React from "react";
import Board from "../board/Board";

class Container extends React.Component
{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="container">
                <div className="color-picker-container">
                    <input type="color" />
                </div>

                <div className="board-containerjj">
                    <Board></Board>
                </div>
            </div>
        )
    }
}

export default Container