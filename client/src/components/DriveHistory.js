import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/getTrips';

// The Drive History Page
class DriveHistory extends Component {
  renderTrips() {
    const { loading, user } = this.props.data;
    if (loading) return <div />;
    return user.trips.map(trip => {
      return (
        <div className="card darken-1" key={trip.driveDate}>
          <div className="card-content">
            <span className="card-title">Drived with {trip.driverName}</span>
            <p />
            <p className="right">
              On date: {new Date(trip.driveDate).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">Review: {trip.review}</div>
        </div>
      );
    });
  }
  render() {
    return <div>{this.renderTrips()}</div>;
  }
}

export default graphql(query)(DriveHistory);
