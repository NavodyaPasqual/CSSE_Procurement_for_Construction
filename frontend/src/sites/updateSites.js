import React, {Component} from 'react';
import './styles/button.css';
import './styles/forms.css';
import './styles/alert.css';
import axios from "axios";

class UpdateSites extends Component {
    constructor(props) {
        super(props)
        this.onChangeSiteID = this.onChangeSiteID.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // State
        this.state = {
            siteID: '',
            name: '',
            location: '',
            loading: false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8081/site/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    siteID: res.data.siteID,
                    name: res.data.name,
                    location: res.data.location
                });

            })
            .catch((error) => {
                console.log(error);
            })
    }

    onChangeSiteID(e) {
        this.setState({ siteID: e.target.value })
    }

    onChangeName(e) {
        this.setState({ name: e.target.value })
    }

    onChangeLocation(e) {
        this.setState({ location: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const siteObject = {
            siteID: this.state.siteID,
            name: this.state.name,
            location: this.state.location,
            type: this.state.type
        };

        axios.put('http://localhost:8081/site/update/' + this.props.match.params.id, siteObject)
            .then((res) => {
                console.log(res.data)
                console.log('Site Details successfully updated')
            }).catch((error) => {
            console.log(error)
        })

        // Redirect to Item List
        this.props.history.push('/sites')
    }

    render(){
        return (
            <div className="background row p-4 d-flex justify-content-center">
                <div className="container-3 w-50 mt-4 shadow pb-4 pt-4 mb-5 rounded">
                    <div >
                        <center><h3>Edit Site</h3></center>
                        <div className="p-3">
                            <form className="row g-3" onSubmit={this.onSubmit}>
                                <div className="col-12">
                                    <label htmlFor="siteID" className="form-label">Site ID</label>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text"><i className="fas fa-italic"></i></span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="siteID"
                                            name="siteID"
                                            value={this.state.siteID}
                                            onChange={this.onChangeSiteID}
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="name" className="form-label">Site Name</label>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text"><i className="fas fa-building"></i></span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            name="name"
                                            value={this.state.name}
                                            onChange={this.onChangeName}
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="location" className="form-label">Site Location</label>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text"><i className="fas fa-map-marker-alt"></i></span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="location"
                                            name="location"
                                            value={this.state.location}
                                            onChange={this.onChangeLocation}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <button className="mt-4 button-red button2-red">Delete Site</button>
                                </div>
                                <div className="col-md-6 d-flex justify-content-md-end">
                                    <button className="mt-4 button-orange button2-orange">Update Site</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

};

export default UpdateSites;
