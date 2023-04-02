export class LoginRequest {
  username: string | undefined;
  password: string | undefined;
}

export class RequestResetPassword {
  email: string | undefined;
}

export class ValidateToken {
  email: string | undefined;
  token: string | undefined;
}

export class ResetPassword {
  email: string | undefined;
  newPassword: string | undefined;
  token: string | undefined;
}
