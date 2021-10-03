import React, {useState, useEffect} from "react";
import './styles/lisOfSites.css';
import {Link} from "react-router-dom";
import axios from "axios";
import spinner from "./image/spinner.gif";
import './styles/loading.css';

const ListOfSuppliers = () => {
    const [supplier, setSupplier] = useState([]);
    const [setError] = useState([]);
    const [q, setQ] = useState("");
    const [searchParam] = useState(["supplierID", "name"]);
    const [filterParam] = useState(["All"]);
    const [values, setValues] = useState({
        loading: false,
    });

    const {
        loading
    } = values;

    const search = () => {
        return supplier.filter((item) => {
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

    const getSupplier = () => {
        setValues({...values,loading: true})
        return fetch(`http://localhost:8081/supplier/`, {
            method: "GET"
        })
            .then(response => {
                return response.json();
            })
            .catch(err => console.log(err));
    };

    const loadSupplier = () => {
        getSupplier()
            .then(data => {
                if(data.error) {
                    setError(data.error)
                } else {
                    setValues({...values,loading: false})
                    console.log(data[0].date)
                    setSupplier(data)
                }
            })
    };

    const deleteSupplier = (e, id) => {
        const r = window.confirm("Do you really want to delete the supplier ?");
        if(r == true) {
            axios.delete(`http://localhost:8081/supplier/delete/${id}`)
                .then(response => {
                    loadSupplier()
                })
        }

    };

    useEffect(() => {
        loadSupplier()
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
                        <h1><center>List Of Suppliers</center></h1><br/>
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
                                <Link to={`/add-supplier`}>
                                    <button className="button-black button2-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i className="fas fa-plus-circle">&nbsp;&nbsp;&nbsp;&nbsp;Add new supplier</i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
                                </Link>
                                </div>
                            </div>
                        </div>
                    </div><br/>
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead>
                            <tr>
                                <th>Supplier ID</th>
                                <th>Supplier Name</th>
                                <th>Address</th>
                                <th>Contact Number</th>
                                <th>View</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {search(supplier).map((c, i) => (
                                <tr key={i} className="align-top">
                                    <td>{c.supplierID}</td>
                                    <td>{c.name}</td>
                                    <td>{c.address}</td>
                                    <td>{c.contactNo}</td>
                                    <td>
                                        <Link to={`/view-supplier/${c._id}`}>
                                            <button className="btn btn-outline-secondary me-md-2">
                                                <i className="fas fa-eye"></i>
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/update-supplier/${c._id}`}>
                                            <button className="btn btn-outline-warning me-md-2">
                                                <i className="fas fa-edit"></i>
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button className="btn btn-outline-danger" onClick={e => deleteSupplier(e, c._id)}><i className="fas fa-trash"></i></button>
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

export default ListOfSuppliers;
