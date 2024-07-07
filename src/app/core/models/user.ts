export interface signInModel {
  email: String;
  password: String;
  fullName: String;
  userAddress: String;
  phoneNumber: String;
  statusAccount: Number;
  roleId: Number;
}
export interface logInModel {
  email: String;
  password: String;
  isKeepLogin?: true;
}
