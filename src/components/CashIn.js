import React from 'react';
import { Button } from 'react-bootstrap'
import './CashIn.css'

class CashIn extends React.Component{

    render() {
        let{handleMoney, current} = this.props;
        return(
            <div>
                <input type="text" readOnly value={current} className="col-12 Wallet-Display"/>

                <div className="Cash-Buttons">
                    <Button value="1.00" onClick={handleMoney} className="col-4" style={{margin:"2px"}}>
                        Add Dollar
                    </Button>
                    <Button value="0.25" onClick={handleMoney} className="col-4" style={{margin:"2px"}}>
                        Add Quarter
                    </Button>
                </div>
                <div className="Cash-Buttons">
                    <Button value="0.10" onClick={handleMoney} className="col-4" style={{margin:"2px"}}>
                        Add Dime
                    </Button>
                    <Button value="0.05" onClick={handleMoney} className="col-4" style={{margin:"2px"}}>
                        Add Nickel
                    </Button>
                </div>
            </div>
        )
    }

}

export default CashIn