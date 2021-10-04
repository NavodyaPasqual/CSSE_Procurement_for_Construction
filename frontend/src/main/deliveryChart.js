import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import axios from "axios";

class DeliveryChart extends Component{
    constructor(props){
        super(props);
        this.state = {
            ordersDeliveryStatus: 0,
            ordersNotDeliveryStatus: 0,
            ordersPendingStatus: 0
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8081/order/status-delivered/count')
            .then(response => {
                this.setState({ordersDeliveryStatus: response.data})
                //console.log(this.state.ordersDeliveryStatus)
            } )
        axios.get('http://localhost:8081/order/status-not-delivered/count')
            .then(response => {
                this.setState({ordersNotDeliveryStatus: response.data})
            } )
        axios.get('http://localhost:8081/order/status-pending/count')
            .then(response => {
                this.setState({ordersPendingStatus: response.data})
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
                        labels: ['Delivered', 'Pending', 'Not Delivered'],
                        datasets:[
                            {
                                label:'Orders Delivery Status',
                                data:[
                                    this.state.ordersDeliveryStatus,
                                    this.state.ordersPendingStatus,
                                    this.state.ordersNotDeliveryStatus
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

export default DeliveryChart;
