import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MapContainer } from '..';

import { Container, TicketsList } from '../../components';

import { fetchTickets } from '../../redux/actions/tickets'

import './style.css'

class Dashboard extends Component {
    constructor(props){
        super(props);

        this.dispatch = this.props.dispatch;

        this.state = {
            current: {}            
        }
    }

    componentDidMount(){

        this.dispatch(fetchTickets())

    }

    getCurrent = (ticketCode) => {
        if (ticketCode && this.props.tickets.all) {
            let currentTicket = this.props.tickets.all.tickets.find(ticket =>{
                return ticket.code === ticketCode;
            });
            if (currentTicket) {
                this.setState({
                    current:currentTicket
                });
            }
        }
    }

    render(){
    
        const { current } = this.state;
        return(
            <Container extraClass="dashboard">
                <div className="tickets-box">
                    <div className="title">
                        Tickets
                    </div>
                    <div className="title-line" />
                
                    <TicketsList tickets={this.props.tickets} getCode={this.getCurrent}/>
                
                </div>
                <div className="map">
                    <MapContainer currentTicket={current}/>
                </div>
            </Container>
        )
    }

}

const mapStateToProps = (state) =>({
    ...state,
    tickets :  state.tickets
})


export default connect(mapStateToProps) (Dashboard);


