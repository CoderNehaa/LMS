export const ACCESS_TOKEN_NAME = "access_token";
export const REFRESH_TOKEN_NAME = "refresh_token";
export const ACCESS_TOKEN_EXPIRY_TIME = "1h";
export const REFRESH_TOKEN_EXPIRY_TIME = "7d";

export const AUTH_RESPONSE_MESSAGES = {
  NEW_SIGNUP: (email: string) =>
    `Account created successfully! Check OTP on email ${email} and verify your account`,
  EXISTING_SIGNUP: (email: string) =>
    `Account already exists with email ${email}! Verify your account`,
};
