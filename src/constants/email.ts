const SIGNUP_EMAIL_BODY = (otp: string, username?: string) => `
Hello ${username || "user"}, 

Welcome to writify! Your account is created successfully, kindly use ${otp} as OTP to verify your account!

`;
