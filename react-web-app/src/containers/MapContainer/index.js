import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import TimeAgo from 'javascript-time-ago'
//import es from 'javascript-time-ago/locale/es'
import {} from 'font-awesome/css/font-awesome.css'
import './modal.css'
const getTimeAgo = (date) => new TimeAgo('es-AR').format(date);
export class MapContainer extends Component {
    constructor(props){
        super(props)

        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
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
    
    onMarkerClick = (props, marker, e) =>{
        console.log(marker)
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true
        });
    }
    componentWillReceiveProps(nextProps){
    
        if(nextProps.currentTicket.coords){
            const dateOfCreation = getTimeAgo(nextProps.currentTicket.createdOn);
            this.setState({
                ...nextProps.currentTicket,
                currentLocation:{lat:nextProps.currentTicket.coords[0], lng:nextProps.currentTicket.coords[1]},
                createOn:dateOfCreation,
            });
        }
    }
    componentDidMount(){
        if(this.props.currentTicket.coords){
            const dateOfCreation = getTimeAgo(this.props.currentTicket.createdOn);
            this.setState({
                ...this.props.currentTicket,
                currentLocation:{lat:this.props.currentTicket.coords[0], lng:this.props.currentTicket.coords[1]},
                createOn: dateOfCreation
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
                zoom={15}>
                
                <Marker 
                    onClick={this.onMarkerClick}  
                    position={{lat: coords[0], lng: coords[1]}} 
                />
                    
                <InfoWindow 
                    marker={this.state.activeMarker}
                    onOpen={this.windowHasOpened}
                    onClose={this.onInfoWindowClose}
                    visible={true}
                >
                    
                    <div className="Contenedor">
                        <div className="title">{title}</div>
                        <div className="title-line"></div>
                    <div className="fecha">{createOn}</div>
                    <hr/>
                    <div className="descripcion">{description}</div>
                    </div>
                    
                </InfoWindow>
            </Map>        
        );
    }
}
 
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GMAPS_API_KEY
})(MapContainer)