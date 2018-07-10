// Query to get the current user, used by the Header
import gql from 'graphql-tag';

export default gql`
  {
    user {
  		id
    }
  }
`;
