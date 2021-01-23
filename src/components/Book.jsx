import React from 'react';
import { Card, Button } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';

const Book = (props) => {

    const { title, authors, price, average_rating, ratings_count, language_code } = props;

    return (
        <div>
          <Card style={{ width: '20rem' }} className="m-4 p-2">
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle>
                <span className="col-header">Author: </span> 
                <span className="sub-title"> {authors}</span>
            </Card.Subtitle>
            <Card.Body>
                <div className="row">
                    <Card.Text className="col-6">
                        <span className="col-header">Price:</span>
                        <span className="price"> {price}</span>
                    </Card.Text>
                    <Card.Text className="col-6">
                        <span className="col-header">Language:</span>
                        <span className="language"> {language_code}</span>
                    </Card.Text>
                </div>
                <div className="row rating">
                <ReactStars
                    value={average_rating}
                    edit={false}
                    size={24}
                    isHalf={true}
                />
                <span>({ratings_count})</span>
                </div>
            </Card.Body>
            {/* <Button>Buy Now</Button> */}
        </Card>  
        </div>
    );
}

export default Book;
