import React from 'react';
import { Button } from 'react-bootstrap'
import './ItemSelection.css';

const ItemButton = ({ item, handleItem, iterator, key }) => {


    return (

        <Button className="btn btn-default" style={{backgroundColor: "lightblue"}} value={item.id} onClick={handleItem} className="Item-Display col-4 btn btn-danger">

        {iterator}

        <br/>
        <br/>
        {item.name}
        <br/>
        <br/>
        {item.price}
        <br/>
        {item.quantity}
        </Button>


    );
}


class ItemSelection extends React.Component {

static defaultProps = {

    items : [
        {
        "id" : 1,
        "name" : "test",
        "price" : 1.99,
        "quantity" : 3
        }]
}



    render(){
        let{handleItem, iterator} = this.props;
        return (
            <span>
                <span>
                    {this.props.items.map((item, i) => {
                        return <ItemButton item={item} handleItem={handleItem} iterator={i} key={i} />
                    })}
                </span>
            </span>
        )
    }
}

export default ItemSelection