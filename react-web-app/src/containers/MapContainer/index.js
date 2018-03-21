import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import TimeAgo from 'javascript-time-ago'
import {} from 'font-awesome/css/font-awesome.css'
import './modal.css'
const getTimeAgo = (date) => new TimeAgo('es-AR').format(date);
export class MapContainer extends Component {
    constructor(props){
        super(props)

        this.state = {
            showingInfoWindow: false,
            selectedPlace: {},
            title:'',
            description:'',
            coords:[],
            currentLocation: {
                lat: -34.60368440000001,
                lng: -58.381559100000004
            },
            createOn: ''
        }
    }
    
    componentWillReceiveProps(nextProps){
    
        if(nextProps.currentTicket.coords){
            const dateOfCreation = getTimeAgo(nextProps.currentTicket.createdOn);
            this.setState({
                ...nextProps.currentTicket,
                currentLocation:{lat:nextProps.currentTicket.coords[0], lng:nextProps.currentTicket.coords[1]},
                createOn:dateOfCreation,
                showingInfoWindow: true
            });
        }
    }
    componentDidMount(){
        if(this.props.currentTicket.coords){
            const dateOfCreation = getTimeAgo(this.props.currentTicket.createdOn);
            this.setState({
                ...this.props.currentTicket,
                currentLocation:{lat:this.props.currentTicket.coords[0], lng:this.props.currentTicket.coords[1]},
                createOn: dateOfCreation,
                showingInfoWindow: true
            });
        }
    }
    render() {
        const { title, description, coords,createOn} = this.state;
        
        return (
            <Map
                google={this.props.google}
                style={{width: '100vw', height: '100vh'}}
                initialCenter={
                    this.state.currentLocation
                }
                center={this.state.currentLocation}
                zoom={15}>
            
                <InfoWindow 
                    
                    onOpen={this.windowHasOpened}
                    onClose={this.onInfoWindowClose}
                    visible={this.state.showingInfoWindow}
                    position={{lat: coords[0], lng: coords[1]}}
                >
                    
                    <div className="Contenedor">
                        <div className="ContentTitle">
                            <div style={{fontFamily: 'Lato-Heavy', fontSize: '15px', lineHeight: '22.5px'}}>
                                {title}
                            </div>
                            <div className="line" />
                        </div>
                        <div className="dateContainer">
                            <div style={{fontFamily: 'Lato-Medium',fontSize: '15px'}} className="fecha">
                                {createOn}
                            </div>
                        </div>
                        <hr/>
                        <div style={{fontFamily: 'Lato-Medium',fontSize: '15px'}} className="Descripcion">
                            {description}
                        </div>
                    </div>                    
                </InfoWindow>
            </Map>        
        );
    }
}
 
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GMAPS_API_KEY
})(MapContainer)