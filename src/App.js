import logo from './logo.svg';
import './App.css';
import ItemSelection from './components/ItemSelection'
import CashIn from './components/CashIn'
import Messages from './components/Messages'
import Change from './components/Change'
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const SERVICE_URL = "http://tsg-vending.herokuapp.com"

class App extends React.Component {

state = {

    loading : false,
    vendingContents : [
    {"id":1,
    "name": "test",
    "price": 1.99,
    "quantity" : 1
    }],

    selectedItem : {
    id : 0,
    name : '',
    price : 0,
    quantity : 0
    },

    itemID : '',
    moneyIn : '0.00',
    change : '',
    message : '',

    changeReturn : {
    "quarters": 0,
    "dimes": 0,
    "nickels": 0,
    "pennies": 0
    },

    iterator:0
}

componentDidMount() {
    console.log("App is now mounted.")
    this.setState({ loading: true })
    console.log("Loading item data")
    fetch(SERVICE_URL + "/items")
      .then(data => data.json())
      .then(data => this.setState(
        { vendingContents: data, loading: false }
      ))
}

handleItemSelect = (event) =>{

    if (event) event.preventDefault();
    let itemId = event.target.value;
    let currentId = this.state.itemID;

    this.setState({itemID : itemId});
}

handleMoneyIn = (event) =>{

    if (event) event.preventDefault();
    let current = this.state.moneyIn;
    let toAdd = event.target.value;
    current = parseFloat(current) + parseFloat(toAdd);

    current = current.toFixed(2);

    this.setState({moneyIn : current});

}

handleCalculatingChange = (event) =>{

    if (event) event.preventDefault();
    let wallet = this.state.moneyIn;

    if(parseFloat(wallet) == 0.0){

        this.setState({message:""});
        this.setState({itemID:""});
        this.setState({change:""})

    }else{

        var quarters = parseFloat(wallet).toFixed(2) / .25;
        wallet = parseFloat(wallet).toFixed(2) % .25;
        var dimes = parseFloat(wallet).toFixed(2) / .1;
        wallet = parseFloat(wallet).toFixed(2) % .1;
        var nickels = parseFloat(wallet).toFixed(2) / .05;
        wallet = parseFloat(wallet).toFixed(2) % .05;
        var pennies = parseFloat(wallet).toFixed(2) / .01;
        wallet = parseFloat(wallet).toFixed(2) % .01;

        var totalChange = ""
        if(parseInt(quarters) != 0){
            if(parseInt(quarters) == 1){
                totalChange += parseInt(quarters) + " Quarter";
            }else{
                totalChange += parseInt(quarters) + " Quarters"
            }
        }
        if(parseInt(dimes) != 0){

            if(totalChange == "" && parseInt(dimes) == 1){
                totalChange += parseInt(dimes) + " Dime";
            }else if(totalChange == "" && parseInt(dimes) != 1){
                totalChange += parseInt(dimes) + " Dimes";
            }else if(totalChange != "" && parseInt(dimes) == 1){
                totalChange += ", ";
                totalChange += parseInt(dimes) + " Dime";
            }else if(totalChange != "" && parseInt(dimes) != 1){
                totalChange += ", ";
                totalChange += parseInt(dimes) + " Dimes";
            }
        }
        if(parseInt(nickels) != 0){

            if(totalChange == "" && parseInt(nickels) == 1){
                totalChange += parseInt(nickels) + " Nickel";
            }else if(totalChange == "" && parseInt(nickels) != 1){
                totalChange += parseInt(nickels) + " Nickels";
            }else if(totalChange != "" && parseInt(nickels) == 1){
                totalChange += ", ";
                totalChange += parseInt(nickels) + " Nickel";
            }else if(totalChange != "" && parseInt(nickels) != 1){
                totalChange += ", ";
                totalChange += parseInt(nickels) + " Nickels";
            }

        }
        if(parseInt(pennies) != 0){

            if(totalChange == "" && parseInt(pennies) == 1){
                totalChange += parseInt(pennies) + " Penny";
            }else if(totalChange == "" && parseInt(pennies) != 1){
                totalChange += parseInt(pennies) + " Pennies";
            }else if(totalChange != "" && parseInt(pennies) == 1){
                totalChange += ", ";
                totalChange += parseInt(pennies) + " Penny";
            }else if(totalChange != "" && parseInt(pennies) != 1){
                totalChange += ", "
                totalChange += parseInt(pennies) + " Pennies";
            }
        }

        this.setState({change : totalChange});
        this.setState({moneyIn : "0.00"});


    }

}

handlePurchase = (event) =>{

    let wallet = this.state.moneyIn;
    let change = this.state.change;
    let itemID = this.state.itemID;
    console.log("in purchase");
    fetch(SERVICE_URL + '/money/' + wallet + '/item/' + itemID, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.newContactData),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.hasOwnProperty("quarters")){

                this.setState({message:"Thank You!!!"});


                this.setState({changeReturn: data});
                console.log(this.state.changeReturn);
                var changeText = "";

                var changeDue = '';
                if(this.state.changeReturn.quarters != 0){

                    if(this.state.changeReturn.quarters == 1){
                        changeDue += this.state.changeReturn.quarters + " Quarter";
                    }else{
                        changeDue += this.state.changeReturn.quarters + " Quarters";
                    }

                }
                if(this.state.changeReturn.dimes != 0){

                    if(changeDue == "" && this.state.changeReturn.dimes == 1){
                        changeDue += this.state.changeReturn.dimes + " Dime";
                    }else if(changeDue == "" && this.state.changeReturn.dimes != 1){
                        changeDue += this.state.changeReturn.dimes + " Dimes";
                    }else if(changeDue != "" && this.state.changeReturn.dimes == 1){
                        changeDue += ", ";
                        changeDue += this.state.changeReturn.dimes + " Dime";
                    }else if(changeDue != "" && this.state.changeReturn.dimes != 1){
                        changeDue += ", ";
                        changeDue += this.state.changeReturn.dimes + " Dimes";
                    }

                }
                if(this.state.changeReturn.nickels != 0){

                    if(changeDue == "" && this.state.changeReturn.nickels == 1){
                        changeDue += this.state.changeReturn.nickels + " Nickel";
                    }else if(changeDue == "" && this.state.changeReturn.nickels != 1){
                        changeDue += this.state.changeReturn.nickels + " Nickels";
                    }else if(changeDue != "" && this.state.changeReturn.nickels == 1){
                        changeDue += ", ";
                        changeDue += this.state.changeReturn.nickels + " Nickel";
                    }else if(changeDue != "" && this.state.changeReturn.nickels != 1){
                        changeDue += ", ";
                        changeDue += this.state.changeReturn.nickels + " Nickels";
                    }

                }
                if(this.state.changeReturn.pennies != 0){

                    if(changeDue == "" && this.state.changeReturn.pennies == 1){
                        changeDue += this.state.changeReturn.pennies + " Penny";
                    }else if(changeDue == "" && this.state.changeReturn.pennies != 1){
                        changeDue += this.state.changeReturn.pennies + " Pennies";
                    }else if(changeDue != "" && this.state.changeReturn.pennies == 1){
                        changeDue += ", ";
                        changeDue += this.state.changeReturn.pennies + " Penny";
                    }else if(changeDue != "" && this.state.changeReturn.pennies != 1){
                        changeDue += ", ";
                        changeDue += this.state.changeReturn.pennies + " Pennies";
                    }

                }

                this.setState({change:changeDue});



            }else{

                this.setState({message: data.message});
            }
        })
        .catch((error) => {
            console.log("made it to error");



        });

    this.setState({moneyIn:"0.00"});
    this.componentDidMount();

}

handleIteration = (event) =>{
    let toReturn = this.state.iterator;
    let toMod = this.state.iterator;
    toMod = parseInt(toMod) + 1;
    this.setState({iterator:toMod});
    return toReturn;
}

  render(){
    return (
        <Container fluid>
            <Row>
                <Col>
                    <h1 className="text-center">Vending Machine</h1>
                </Col>
            </Row>
            <hr />
            <Row> {/* This section holds vending machine contents and info panel */}
                <Col sm={8}> {/* Vending Machine Contents */}
                    <ItemSelection items={this.state.vendingContents} handleItem={this.handleItemSelect} iterator={this.state.iterator}/>
                </Col>
                <Col sm={4}> {/* Info panel */}
                    <h2 className="text-center">Total $ In</h2>
                    <CashIn handleMoney={this.handleMoneyIn} current={this.state.moneyIn}/>
                    <hr />
                    <h2 className="text-center">Messages</h2>
                    <Messages item={this.state.itemID} message={this.state.message} purchase={this.handlePurchase}/>
                    <hr />
                    <h2 className="text-center">Change</h2>
                    <Change handleChange={this.handleCalculatingChange} change={this.state.change}/>
                </Col>
            </Row>
        </Container>
    );
  }
}

export default App;
