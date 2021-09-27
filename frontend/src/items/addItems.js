import React from 'react';
import './styles/button.css';
import './styles/forms.css'

const AddItems = () => {

    return (
        <div className="background row p-4 d-flex justify-content-center">
            <div className="container-1 w-50 mt-4 mb-5 shadow pb-4 pt-4  rounded">
                <h3><center>Add a Item</center></h3>
                <div className="p-3">
                    <form className="row g-3">
                        <div className="col-12">
                            <label htmlFor="name" className="form-label">Item ID</label>
                            <div className="input-group mb-3">
                                <span className="input-group-text"><i className="fas fa-italic"></i></span>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                />
                            </div>
                        </div>
                        <div className="col-12">
                            <label htmlFor="contactNo" className="form-label">Item name</label>
                            <div className="input-group mb-3">
                                <span className="input-group-text"><i className="fas fa-building"></i></span>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="amount"
                                    name="amount"
                                />
                            </div>
                        </div>
                        <div className="col-12">
                            <label htmlFor="studentID" className="form-label">Quantity</label>
                            <div className="input-group mb-3">
                                <span className="input-group-text"><i className="fas fa-sort-numeric-up-alt"></i></span>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="date"
                                    name="date"
                                />
                            </div>
                        </div>
                        <button className="mt-5 button-black button2-black">Create the Item</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddItems;
