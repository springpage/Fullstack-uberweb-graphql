//The mutation to save Trip
import gql from 'graphql-tag';

export default gql`
  mutation saveTrip($driverID: String, $driverName: String) {
    saveTrip(driverID: $driverID, driverName: $driverName) {
      id
    }
  }
`;
