import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import saveTrip from '../mutations/saveTrip';

class DrivingWith extends Component {
  // After this component is mount, run a mutation that save the trip to the database.
  componentDidMount() {
    const { drivingDriver, onSaveTrip } = this.props;
    this.props
      .mutate({
        variables: {
          driverID: drivingDriver.id,
          driverName: drivingDriver.name
        }
      })
      .then(results => {
        const tripNow = results.data.saveTrip.id;
        onSaveTrip(tripNow);
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="row center">
        <div className="card-panel">
          <span className="blue-text text-darken-2">
            You are driving with Driver {this.props.drivingDriver.name} ...
          </span>
        </div>
      </div>
    );
  }
}

export default graphql(saveTrip)(DrivingWith);
