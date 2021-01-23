import React, { useState } from 'react';
import Book from './Book';
import { Button } from 'react-bootstrap';

function calculatePrice(data) {
    let total = 0;
    data.forEach(item => {
        total += item.price;
    });
    return total;
}

const Checkout = (props) => {
    
    const { data } = props;

    const [show, setShow] = useState(false);

    const handleClick = () => {
        setShow(true);
    }

    return (
        <>
        {
            !show ?
                <>
                    <div className="row">
                    {
                        data.length > 0 && data.map(item => <Book {...item} />)
                    }
                    </div>
                    <h2>Total Price: {calculatePrice(data)}</h2>
                    <Button onClick={handleClick}>Buy Now</Button>
                </>
            :
            <>
               <h2>Thank you for your purchase. will recieve mail soon!!!</h2> 
            </>
        }
        
        </>
    );
}

export default Checkout;
