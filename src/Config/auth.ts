interface AuthConfig {
  jwt: {
    secret: string;
    expiresIn: string;
  }
}

export default {
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '1d',
  },
} as AuthConfig;
