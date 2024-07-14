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

export interface changePassModel {
  email: String;
  oldPassword: String;
  newPassword: String;
  reNewPassword: String;
}

export interface forgotPassModel {
  id: Number;
  newPassword: String;
  reNewPassword: String;
}

export interface updateUserInforModel {
  id: Number;
  fullName: String;
  userAddress?: String;
  phoneNumber: String;
  statusAccount: Number;
  roleId?: Number;
  deleteFlag?: Boolean;
}
