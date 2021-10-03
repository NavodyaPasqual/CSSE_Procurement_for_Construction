import React, {useState} from 'react';
import './styles/button.css';
import './styles/forms.css'
import axios from "axios";

const AddSupplier = () => {
    const [state, setState] = useState({
        supplierID: '',
        name: '',
        address: '',
        contactNo: '',
        loading: false,
        error: '',
    });


    const {
        supplierID,
        name,
        address,
        contactNo,
        loading
    } = state;

    const [content, setContent] = useState('')

    const handleContent = (event) => {
        console.log(event);
        setContent(event);
    }

    const handleChange = (name) => (event) => {
        setState({...state, [name]:event.target.value})
    };

    const clickSubmit = supplier => {
        supplier.preventDefault();
        axios
            .post(`http://localhost:8081/supplier/create`, {supplierID, name, address, contactNo}, {
                headers: {
                }
            })
            .then(response => {
                setState({...state, name: '',supplierID:'', address: '', contactNo: '',loading: true, error: ''})
                setContent('');
                window.location.href = "/suppliers";
            })
            .catch(error => {
                console.log(error.response);
                alert(error.response.data.error);
            });
    };

    const showLoading = () =>
        loading && (<div aria-live="polite" aria-atomic="true" className="position-relative">
            <div className="toast-container position-absolute top-0 end-0 p-3">
                <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">
                        <div className="spinner-border text-warning" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <strong className="me-auto">&nbsp;&nbsp;Loading</strong>
                        <small className="text-muted">just now</small>
                        <button type="button" className="btn-close" data-bs-dismiss="toast"
                                aria-label="Close"></button>
                    </div>
                </div>
            </div>
        </div>);

    return (
        <div className="background row p-4 d-flex justify-content-center">
            {showLoading()}
            <div className="container-1 w-50 mt-4 mb-5 shadow pb-4 pt-4  rounded">
                <h3><center>Add a Supplier</center></h3>
                <div className="p-3">
                    <form className="row g-3" onSubmit={clickSubmit}>
                        <div className="col-12">
                            <label htmlFor="supplierID" className="form-label">Supplier ID</label>
                            <div className="input-group mb-3">
                                <span className="input-group-text"><i className="fas fa-italic"></i></span>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="supplierID"
                                    name="supplierID"
                                    value={supplierID}
                                    onChange={handleChange('supplierID')}
                                />
                            </div>
                        </div>
                        <div className="col-12">
                            <label htmlFor="name" className="form-label">Supplier name</label>
                            <div className="input-group mb-3">
                                <span className="input-group-text"><i className="fas fa-users"></i></span>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={handleChange('name')}
                                />
                            </div>
                        </div>
                        <div className="col-12">
                            <label htmlFor="address" className="form-label">Address</label>
                            <div className="input-group mb-3">
                                <span className="input-group-text"><i className="fas fa-map-marker-alt"></i></span>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    name="address"
                                    value={address}
                                    onChange={handleChange('address')}
                                />
                            </div>
                        </div>
                        <div className="col-12">
                            <label htmlFor="contactNo" className="form-label">Contact Number</label>
                            <div className="input-group mb-3">
                                <span className="input-group-text"><i className="fas fa-phone"></i></span>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="contactNo"
                                    name="contactNo"
                                    value={contactNo}
                                    onChange={handleChange('contactNo')}
                                />
                            </div>
                        </div>
                        <button className="mt-5 button-black button2-black">Create the Supplier</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddSupplier;
