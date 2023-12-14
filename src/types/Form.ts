import { Auth, UserCredential } from 'firebase/auth';

export type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type IUser = {
  email: string | null;
  id: string | null;
  isAuth: boolean;
};

export type InfoForm = {
  questionForLink: string;
  textForLink: string;
  title: string;
  buttonValue: string;
  path: string;
  functionForUserWithEmailAndPassword: (
    auth: Auth,
    emailUser: string,
    passwordUser: string
  ) => Promise<UserCredential>;
};
