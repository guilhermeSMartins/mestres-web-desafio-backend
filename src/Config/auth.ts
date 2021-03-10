interface AuthConfig {
  jwt: {
    secret: string;
    expiresIn: string;
  }
}

export default {
  jwt: {
    secret: '43022c2a-4233-4025-9b5b-1677a5b36bcf',
    expiresIn: '1d',
  },
} as AuthConfig;
