/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meteorList: this.props.data,
    };
    this.addPoints = this.addPoints.bind(this);
  }

  componentDidMount() {
    this.map = L.map('map');
    // initialize Open Street Map
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    this.map.fitWorld();
    this.addPoints();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ meteorList: nextProps.data }, () => {
      // make sure to re-render OSM map after list change
      this.addPoints();
    });
  }

  // this will add markers base on geoJSON array
  addPoints() {
    L.geoJSON(this.state.meteorList, {
      pointToLayer(feature, latlng) {
        return L.circleMarker(latlng);
      },
    }).addTo(this.map);
  }


  render() {
    return (
      <div id="map" style={{ width: '80%', height: '80vh' }} />
    );
  }
}
