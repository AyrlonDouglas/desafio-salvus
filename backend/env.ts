export function configuration() {
  // to load out of class
  return {
    JWT_SECRET: process.env.JWT_SECRET,
  };
}
