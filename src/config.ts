export default () => ({
  env: process.env.ENVIRONMENT,
  db: {
    url: process.env.DATABASE_URL,
  },
  jwt: {
    secretOrKey: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
});
