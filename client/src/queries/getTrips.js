// Query to get the list of trips of a user, run by DriveHistory component
import gql from 'graphql-tag';

export default gql`
  {
    user {
      id
      trips {
        driverName
        driveDate
        review
      }
    }
  }
`;
