import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import axios from "axios";

class ApprovalChart extends Component{
    constructor(props){
        super(props);
        this.state = {
            orderApprovedStatus: 0,
            orderNotApprovedStatus:0,
            orderNotDecidedStatus: 0,
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8081/order/status-approved/count')
            .then(response => {
                this.setState({orderApprovedStatus: response.data})
            } )
        axios.get('http://localhost:8081/order/status-not-approved/count')
            .then(response => {
                this.setState({orderNotApprovedStatus: response.data})
            } )
        axios.get('http://localhost:8081/order/status-not-decided/count')
            .then(response => {
                this.setState({orderNotDecidedStatus: response.data})
            } )
    }

    static defaultProps = {
        displayLegend: true,
        legendPosition:'right',
    }

    render(){
        return (
            <div className="chart">
                <Bar
                    data={{
                        labels: ['Approved', 'Not Approved', 'Not Decided'],
                        datasets:[
                            {
                                label:'Approval Status',
                                data:[
                                    this.state.orderApprovedStatus,
                                    this.state.orderNotApprovedStatus,
                                    this.state.orderNotDecidedStatus
                                ],
                                backgroundColor:[
                                    'rgb(102, 255, 135, 0.6)',
                                    'rgba(255, 159, 64, 0.6)',
                                    'rgba(255, 99, 132, 0.6)'
                                ]
                            }
                        ]
                    }}
                    options={{
                        legend:{
                            display:this.props.displayLegend,
                            position:this.props.legendPosition
                        }
                    }}
                />

            </div>
        )
    }
}

export default ApprovalChart;
