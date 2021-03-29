import React from 'react';
import { Button } from 'react-bootstrap'
import './Change.css'

class Change extends React.Component{

    render() {
        let{handleChange, change} = this.props;
        return(

            <div>
                <input type="text" readOnly value={change} className="col-12"/>
                <div className="Change-Button">
                    <Button onClick={handleChange}>
                        Return Change
                    </Button>
                </div>
            </div>

        )
    }
}
export default Change