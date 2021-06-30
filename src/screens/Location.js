import MapView ,{Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import React,{useEffect,useState } from 'react';
import {View, Text, Alert} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding'
import axios from 'axios';

const initialState = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}
const Location = ()=>{
    const [currentPosition, setCurrentPosition] = useState(initialState);

    useEffect(() => {
        Geolocation.getCurrentPosition(
            
            (position) =>{
                const {latitude,longitude} = position.coords;
                setCurrentPosition({
                    ...currentPosition,
                    latitude,
                    longitude
                })
            },
            (error)=> Alert.alert('Error',error.message),
            { timeout: 20000, maximumAge: 1000 });
        
    }, []);
    return (
        <MapView
        provider={PROVIDER_GOOGLE}
        region={currentPosition}
        zoomEnabled={true}
        showsUserLocation
        style={{flex:1}}
        initialRegion={currentPosition}
        >
        <Marker
        coordinate={currentPosition}
        pinColor={'red'}
        />
        </MapView>
    );
}

export default Location;
