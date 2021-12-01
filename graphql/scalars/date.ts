import { GraphQLScalarType } from "graphql";

const dateScalar = new GraphQLScalarType<Date, string>({
  name: "Date",
  description: "Date custom scalar type",
  serialize: (value: Date | unknown) => {
    return value as string;
  },
  parseValue: (value: string | unknown) => {
    return new Date(value as string);
  },
});

export default dateScalar;
