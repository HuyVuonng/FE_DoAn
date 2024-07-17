export interface postModel {
  id?: number;
  title: String;
  price: Number;
  acreage: Number;
  district: String;
  ward: String;
  descriptionPost: String;
  images: String[];

  phoneNumber: String;
  ownerHouse: String;
  zalo: Number;
  street: String;
  paymentType: Number;
  hostelTypeId: Number;
  accountId: Number;

  [key: string]: any;
}

export interface postSearchModel {
  id?: Number | null;
  title?: String | null;
  PriceRange?: Number | null;
  AcreageRange?: Number | null;
  district?: String | null;
  ward?: String | null;
  phoneNumber?: String | null;
  ownerHouse?: String | null;
  hostelTypeId?: Number | null;
  accountId?: Number | null;
  pageNumber?: Number;
  pageSize?: Number;
  [key: string]: any;
}

export interface commentModel {
  content: String;
  accountId: Number;
  createDate: String;
  postId: Number;
}
export interface payhistoryModel {
  postId: Number;
  accountId: Number;
  payCode: String;
  payDate: String;
  type: Number;
  price: Number;
}
