import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { Button, Spinner } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';
import Checkout from './Checkout';

function reviewComponent(cell, row) {
    const { ratings_count, average_rating } = row;
    return (
        <>
            <ReactStars
                value={average_rating}
                edit={false}
                size={18}
                isHalf={true}
            />
            <span>({ratings_count})</span>
        </>
    );
}


const Table = () => {

    const { SearchBar } = Search;

    const [data, setData] = useState([]);
    const [selected, setSelected] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show,setShow] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await axios.get('https://s3-ap-southeast-1.amazonaws.com/he-public-data/books8f8fe52.json');
            console.log(data);
            setData(data?.data);
            setLoading(false);
        };
        fetchData();
    }, []);

    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        hideSelectAll: true,
        onSelect: handleOnSelect,
    };

    const columns = [{
            dataField: 'title',
            text: 'Title',
        }, {
            dataField: 'authors',
            text: 'Authors',
        }, {
            dataField: 'price',
            text: 'Price',
            sort: true
        }, {
            dataField: 'average_rating',
            text: 'Rating',
            sort: true,
            formatter: reviewComponent
        },
        {
            dataField: 'language_code',
            text: 'Language',
            hidden: true
        }, {
            dataField: 'isbn',
            text: 'ISB Number',
            hidden: true
        }
    ];


    function handleOnSelect(row, isSelect) {
        if (isSelect) {
            setSelected([...selected, row]);
        } else {
            const removeIndex = selected.findIndex(o => {
                return o.bookID === row.bookID;
            });
            if (removeIndex !== -1) {
                selected.splice(removeIndex, 1);
            }
            setSelected(selected);
        }
        return true;
    }

    const handleSubmit = () => {
        if (selected.length === 0) {
            alert('please select atleast one book');
        } else {
            setData([]);
            setShow(true);
        }
    }

    return (
        <div className="custom-table">
            {
                loading && <Spinner animation="border" role="status" /> 
            }
            
            {
               data.length > 0 &&
               <>
                    <ToolkitProvider
                        columns={columns}
                        data={data}
                        keyField='isbn'
                        search
                    >
                    {
                        props => (
                            <div>
                                <SearchBar 
                                    {...props.searchProps}
                                    placeholder="Search Books by isbn, lang...."
                                />
                                <hr />
                                <BootstrapTable
                                    {...props.baseProps}
                                    selectRow={selectRow}
                                    pagination={paginationFactory()}
                                    striped
                                    hover
                                    condensed
                                    bordered={false}
                                />
                            </div>
                        )
                    }
                    </ToolkitProvider>
                    <Button 
                        className={`float-right ${selected.length > 0 ? 'btn-primary': 'btn-disabled'}`}
                        onClick={handleSubmit}
                    >
                    Submit
                    </Button>
               </> 
            }
            {
                show && <Checkout data={selected}/>
            }
                         
        </div>
    );
};

export default Table;
