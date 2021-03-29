import React from 'react';
import { Button } from 'react-bootstrap';
import './Messages.css';

class Messages extends React.Component{

    render() {
        let{item, message, purchase} = this.props;
        return(
            <div>
                <input type="text" readOnly style={{alignItems: "center"}} value={message} className="col-12 Message-Text"/>
                <div>
                    <label>Item:</label>
                    <input type="text" readOnly value={item} className="Message-Text"/>
                </div>
                <div className="Message-Button">
                    <Button onClick={purchase}>Make Purchase</Button>
                </div>
            </div>
        )
    }

}

export default Messages