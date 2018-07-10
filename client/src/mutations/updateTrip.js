//Mutation to update the review of a trip
import gql from 'graphql-tag';

export default gql`
  mutation updateTrip($tripID: String, $reviewText: String) {
    updateTrip(tripID: $tripID, reviewText: $reviewText) {
      review
      id
    }
  }
`;
