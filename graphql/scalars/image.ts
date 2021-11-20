import { GraphQLScalarType } from "graphql";

const imageScalar = new GraphQLScalarType<Uint8Array, string>({
  name: "Image",
  description: "Image custom scalar type",
  serialize: (value: Uint8Array | unknown) => {
    return JSON.stringify(value as Uint8Array);
  },
  parseValue: (value: string | unknown) => {
    return JSON.parse(value as string) as Uint8Array;
  },
});

export default imageScalar;
