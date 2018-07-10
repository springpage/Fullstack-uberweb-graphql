/* global google*/
import _ from 'lodash';
import React, { Component } from 'react';
import DrivingWith from './DrivingWith';
import DriveReview from './DriveReview';
import carIcon from '../assets/car-icon.png';
import findDrivers from '../mutations/findDrivers';
import { graphql } from 'react-apollo';

// The Drive Now Page, include the map and other components
class DriveNow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showListDriver: false,
      showDriving: false,
      showReview: false,
      showButton: true,
      drivingDriver: null,
      drivers: [],
      tripNow: null
    };

    this.map = null;
  }

  // Run after clicking find Drivers
  findNearByDriver() {
    const pos = this.map.getCenter();
    const position = { lat: pos.lat(), lon: pos.lng() };

    this.props
      .mutate({
        variables: position
      })
      .then(results => {
        this.setState({
          showListDriver: true,
          drivers: results.data.findDrivers
        });

        // Make marker for that location
        let marker = new google.maps.Marker({
          position: { lat: pos.lat(), lng: pos.lng() },
          map: this.map
        });
      })
      .catch(err => console.log(err));
  }

  //Set the map center to the current Position
  setMyPosition() {
    navigator.geolocation.getCurrentPosition(Position => {
      const p = Position.coords;
      this.map.setCenter({ lat: p.latitude, lng: p.longitude });
    });
  }

  // Render the review component
  renderReview() {
    if (this.state.showReview && this.state.tripNow) {
      return (
        <DriveReview
          onAfterReview={this.onAfterReview.bind(this)}
          tripNow={this.state.tripNow}
        />
      );
    }
  }

  // Render Driving With Component
  renderDriving() {
    if (this.state.showDriving) {
      return (
        <DrivingWith
          drivingDriver={this.state.drivingDriver}
          onSaveTrip={this.onSaveTrip.bind(this)}
        />
      );
    }
  }

  // Driving With Component, show for 3 seconds
  drivingWith(driver) {
    this.setState({
      showListDriver: false,
      showDriving: true,
      showButton: false,
      drivingDriver: driver
    });

    setTimeout(() => {
      this.setState({ showDriving: false, showReview: true });
    }, 3000);
  }

  // After done reviewing, show the components like from the start
  onAfterReview() {
    this.setState({ showReview: false, showButton: true, tripNow: null });
  }

  // Save the trip to state
  onSaveTrip(tripNow) {
    this.setState({ tripNow: tripNow });
  }

  // Render the list of Drivers found
  renderDriverList() {
    if (this.state.showListDriver) {
      console.log('12345', this.state);
      return (
        <div className="row">
          <ul className="collection">
            {_.map(this.state.drivers, driver => {
              return (
                <li
                  className="collection-item"
                  key={driver.id}
                  style={{ height: 60 }}
                >
                  <div>
                    {driver.name}
                    <button
                      onClick={() => this.drivingWith(driver)}
                      className="btn grey darken-3 right"
                    >
                      <i className="material-icons">send</i>
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  }

  // Render Two Button Set Position and find Drivers
  renderButton() {
    if (this.state.showButton) {
      return (
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <div className="col s6 right-align">
            <button
              onClick={this.setMyPosition.bind(this)}
              className="grey darken-3 btn z-depth-2"
            >
              Set my position
            </button>
          </div>

          <div className="col s6 align-left">
            <button
              onClick={this.findNearByDriver.bind(this)}
              className="grey darken-3 btn z-depth-2"
            >
              Find driver here
            </button>
          </div>
        </div>
      );
    }
  }

  // After mount, render the map
  componentDidMount() {
    this.map = new google.maps.Map(this.refs.map, {
      zoom: 12,
      center: { lat: 47, lng: 2.2976143 }
    });
  }

  // watch for state and render the markers of drivers found
  renderMarker() {
    this.state.drivers.map(driver => {
      let pos = driver.geometry.coordinates;
      let driverPosition = { lat: pos[1], lng: pos[0] };

      let marker = new google.maps.Marker({
        position: driverPosition,
        icon: carIcon
      });
      marker.setMap(this.map);
      google.maps.event.addListener(marker, 'click', function() {
        let infowindow = new google.maps.InfoWindow({
          content: driver.name
        });
        infowindow.open(this.map, marker);
      });
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div ref="map" style={{ height: 400 }} />
        </div>
        {this.renderMarker()}
        {this.renderButton()}
        {this.renderDriverList()}
        {this.renderDriving()}
        {this.renderReview()}
      </div>
    );
  }
}

export default graphql(findDrivers)(DriveNow);
