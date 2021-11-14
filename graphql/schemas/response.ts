import { gql } from "apollo-server";

interface responseType {
  status: number;
  message: string;
}

const response = gql`
  type response {
    message: String!
  }
`;

export default response;
export { responseType };
