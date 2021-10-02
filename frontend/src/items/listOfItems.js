import React, {useState, useEffect} from "react";
import './styles/lisOfItems.css';
import axios from "axios";
import {Link} from "react-router-dom";
import spinner from "./image/spinner.gif";
import './styles/loading.css';

const ListOfItems = () => {
    const [item, setItem] = useState([]);
    const [setError] = useState([]);
    const [q, setQ] = useState("");
    const [searchParam] = useState(["itemID", "name"]);
    const [filterParam] = useState(["All"]);
    const [values, setValues] = useState({
        loading: false,
    });
    const {
        loading
    } = values;

    const search = () => {
        return item.filter((item) => {
            if (item.region === filterParam) {
                return searchParam.some((newItem) => {
                    return (
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(q.toLowerCase()) > -1
                    );
                });
            } else if (filterParam == "All") {
                return searchParam.some((newItem) => {
                    return (
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(q.toLowerCase()) > -1
                    );
                });
            }
        });
    }

    const getItem = () => {
        setValues({...values,loading: true})
        return fetch(`http://localhost:8081/item/`, {
            method: "GET"
        })
            .then(response => {
                return response.json();
            })
            .catch(err => console.log(err));
    };

    const loadItem = () => {
        getItem()
            .then(data => {
                if(data.error) {
                    setError(data.error)
                } else {
                    setValues({...values,loading: false})
                    console.log(data[0].date)
                    setItem(data)
                }
            })
    };

    const deleteItem = (e, id) => {
        const r = window.confirm("Do you really want to delete the item ?");
        if(r == true) {
            axios.delete(`http://localhost:8081/item/delete/${id}`)
                .then(response => {
                    loadItem()
                })
        }

    };


    useEffect(() => {
        loadItem()
    }, [])

    const showLoading = () =>
        loading && (<div className="overlay-top">
            <h1 className="txt-main">Please wait....</h1>
            <img className="loadingImg" src={spinner} alt="inner" />
        </div>);

    return (
        <div className="background-st-ac p-3">
            {showLoading()}
            <div className="card shadow p-3 mb-4 bg-body rounded">
                <div className="row g-2">
                    <div className="col-md">
                        <h1><center>List Of Items</center></h1><br/>
                    </div>
                </div>
                <div className="search-wrapper">
                    <div className="row g-2">
                        <div className="col-md">
                            <div className="row">
                                <div className="justify-content-md-end">
                                    <div className="input-group justify-content-md-end">
                                        <input
                                            type="search"
                                            className="form-control"
                                            placeholder="Search..."
                                            value={q}
                                            onChange={(e) => setQ(e.target.value)}
                                        />
                                        <span className="input-group-text"><i className="fas fa-search"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="justify-content-md-end">
                                <div className="input-group justify-content-md-end">
                                <Link to={`/add-item`}>
                                    <button className="button-black button2-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i className="fas fa-plus-circle">&nbsp;&nbsp;&nbsp;&nbsp;Add new item</i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
                                </Link>
                                </div>
                            </div>
                        </div>
                    </div><br/>
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead>
                            <tr>
                                <th>Item ID</th>
                                <th>Item Name</th>
                                <th>View</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {search(item).map((c, i) => (
                                <tr key={i} className="align-top">
                                    <td>{c.itemID}</td>
                                    <td>{c.name}</td>
                                    <td>
                                        <Link to={`/view-item/${c._id}`}>
                                            <button className="btn btn-outline-secondary me-md-2">
                                                <i className="fas fa-eye"></i>
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/update-item/${c._id}`}>
                                            <button className="btn btn-outline-warning me-md-2">
                                                <i className="fas fa-edit"></i>
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button className="btn btn-outline-danger" onClick={e => deleteItem(e, c._id)}><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListOfItems;
