import React, { Component } from "react";
import { APIProvider, Map, AdvancedMarker, Marker } from '@vis.gl/react-google-maps'
import axios from "axios";
import './mapView.css'



export default class MapView extends Component {
    constructor() {
        super();
        this.state = {

            satelite01: { lat: 0, lng: 0 },
            satelite01Name: '',
            satelite02: { lat: 0, lng: 0 },
            satelite02Name: '',
            satelite03: { lat: 0, lng: 0 },
            satelite03Name: '',
            sateliteCenter: { lat: 0, lng: 0 },
            sateliteDefaultCenter: { lat: 0, lng: 0 },
            seconds: 0
        };
    }

    async getUser() {
        try {
            const response = await axios.get('http://localhost:3001/api/latest-data');
            console.log(response);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    getLiveLocation = async () => {

        const response = await this.getUser();
        if (response) {
            var satelite01 = this.state.satelite01;
            var satelite02 = this.state.satelite02;
            var satelite03 = this.state.satelite03;
            var satelite01Name = this.state.satelite01Name;
            var satelite02Name = this.state.satelite02Name;
            var satelite03Name = this.state.satelite03Name;
            console.log(response)
            satelite01Name = response[0].name;
            satelite02Name = response[1].name;
            satelite03Name = response[2].name;

            satelite01.lat = parseFloat(response[0].latitude);
            satelite02.lat = parseFloat(response[1].latitude);
            satelite03.lat = parseFloat(response[2].latitude);


            satelite01.lng = parseFloat(response[0].longitude);
            satelite02.lng = parseFloat(response[1].longitude);
            satelite03.lng = parseFloat(response[2].longitude);
            // satelite01Name = response[0].name === "SL-1 R/B" ? response[0].name : response[1].name
            // satelite02Name = response[1].name === "UNID" ? response[1].name : response[0].name

            // satelite01.lat = response[0].name === "SL-1 R/B" ? parseFloat(response[0].latitude) : parseFloat(response[1].latitude)
            // satelite02.lat = response[1].name === "UNID" ? parseFloat(response[1].latitude) : parseFloat(response[0].latitude)


            // satelite01.lng = response[0].name === "SL-1 R/B" ? parseFloat(response[0].longitude) : parseFloat(response[1].longitude)
            // satelite02.lng = response[1].name === "UNID" ? parseFloat(response[1].longitude) : parseFloat(response[0].longitude)
            // if(this.state.seconds === 2){
            // sateliteCenter.lat = (satelite01.lat + satelite02.lat) / 2;
            // sateliteCenter.lng = (satelite01.lng + satelite02.lng) / 2; 
            // }
            // console.log(satelite01)
            // console.log(satelite02)
            // console.log(sateliteCenter)
            // console.log(satelite01Name, satelite02Name)

            this.setState({
                satelite01: satelite01,
                satelite02: satelite02,
                satelite03: satelite03,
                satelite01Name: satelite01Name,
                satelite02Name: satelite02Name,
                satelite03Name: satelite03Name
            })

        }
        this.setState({ loading: false });
    }
    tick() {
        // if (this.props.biltyStatusId === 8 || this.props.biltyStatusId === 9 || this.props.biltyStatusId === 10) {
        //     }
        this.getLiveLocation();
        this.setState(state => ({
            seconds: state.seconds + 1
        }));
    }
    componentWillUnmount() {
        console.log("lets Unmount")
        clearInterval(this.interval);
    }

    async componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
        // this.getLiveLocation();
    }
    Click01Satelite = () => {
        let sateliteDefaultCenter = this.state.sateliteDefaultCenter;
        sateliteDefaultCenter.lat = -36.42;
        sateliteDefaultCenter.lng = 53.32;
        this.setState({ sateliteDefaultCenter: sateliteDefaultCenter });
    }
    render() {
        return (
            <>
                <table>
                    <thead>
                        <tr>
                            <th>Satellite Name</th>
                            <th>Latitude (lat)</th>
                            <th>Longitude (lng)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.state.satelite01Name}</td>
                            {/* <td><a onClick={this.Click01Satelite}> asdsad </a></td> */}
                            <td>{this.state.satelite01.lat}</td>
                            <td>{this.state.satelite01.lng}</td>
                        </tr>
                        <tr>
                            <td>{this.state.satelite02Name}</td>
                            <td>{this.state.satelite02.lat}</td>
                            <td>{this.state.satelite02.lng}</td>
                        </tr>
                        <tr>
                            <td>{this.state.satelite03Name}</td>
                            <td>{this.state.satelite03.lat}</td>
                            <td>{this.state.satelite03.lng}</td>
                        </tr>
                    </tbody>
                </table>
                <APIProvider apiKey={'AIzaSyBG4WuTT6-8Ssb-aPdpFH8sbqKWnMIt7uo'}>
                    <Map
                        style={{ width: '99vw', height: '80vh' }}
                        // defaultCenter={{lat: -36.59, lng: 138.12}}
                        defaultCenter={this.state.sateliteDefaultCenter}
                        defaultZoom={8}
                        onCenterChanged={this.onCenterChanged}
                        gestureHandling={'greedy'}
                        disableDefaultUI={true}>
                        <Marker title={this.state.satelite01Name} position={this.state.satelite01} />
                        <Marker title={this.state.satelite02Name} position={this.state.satelite02} />
                        <Marker title={this.state.satelite03Name} position={this.state.satelite03} />
                        {/* <Marker title={"Lahore"} position={this.state.positionLahore}/> */}
                        {/* <AdvancedMarker title={"Lahore"} position={this.state.positionLahore} /> */}
                        {/* <Marker title={"Islamabd"} position={this.state.positionIslamabd}/> */}
                        {/* <AdvancedMarker position={position}></AdvancedMarker> */}
                    </Map>
                    
                </APIProvider>
            </>
        );
    }
}
