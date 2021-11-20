const removeNullKeyValues = (obj: Object) => {
  return Object.fromEntries(Object.entries(obj).filter((_, val) => val));
};

export default removeNullKeyValues;
