export interface AuthData {
  email: string;
  password: string;
  location: string | null | undefined;
}

export interface LoginSignUpUser {
  email: string;
  location: string;
}
