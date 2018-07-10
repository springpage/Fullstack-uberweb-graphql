import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import updateTrip from '../mutations/updateTrip';

class DriveReview extends Component {
  state = { afterSubmit: false, reviewText: '' };

// On clicking Submit Review, run a mutation that update the review to the Trip
  onSubmit(tripNow, reviewText) {
    this.props
      .mutate({
        variables: {
          tripID: tripNow,
          reviewText: reviewText
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const { onAfterReview, tripNow } = this.props;
  // Just show OK button after submit the review
    if (this.state.afterSubmit) {
      return (
        <div className="row center">
          <div className="card-panel">
            <span className="blue-text text-darken-2">
              Your review was submitted.
            </span>
          </div>
          <div className="row center">
            <button
              onClick={() => {
                onAfterReview();
              }}
              className="grey darken-3 btn"
            >
              OK
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="row center">
        <div className="card-panel">
          <span className="blue-text text-darken-2">
            Your Drive finished. Please give your review.
          </span>
        </div>
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <textarea
                id="textarea1"
                className="materialize-textarea"
                value={this.state.reviewText}
                onChange={event => {
                  this.setState({ reviewText: event.target.value });
                }}
              />
            </div>
          </div>
        </form>
        <div className="row center">
          <button
            onClick={() => {
              this.setState({ afterSubmit: true });
              this.onSubmit(tripNow, this.state.reviewText);
            }}
            className="indigo accent-2 btn"
          >
            Submit review
          </button>
        </div>
      </div>
    );
  }
}

export default graphql(updateTrip)(DriveReview);
