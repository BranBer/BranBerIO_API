import { gql } from "apollo-server";

interface responseType {
  status: number;
  message: string;
  accessToken: string;
}

const response = gql`
  type response {
    message: String!
    accessToken: String
  }
`;

export default response;
export { responseType };
