// Run the mutation to find the Drivers nearby
import gql from 'graphql-tag';

export default gql`
  mutation findDrivers($lat: Float, $lon: Float) {
    findDrivers(lat: $lat, lon: $lon) {
      id
      name
      geometry {
        coordinates
      }
    }
  }
`;
