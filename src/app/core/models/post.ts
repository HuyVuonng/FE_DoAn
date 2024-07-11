export interface postModel {
  title: String;
  price: Number;
  acreage: Number;
  district: String;
  ward: String;
  descriptionPost: String;
  images: String[];

  phoneNumber: String;
  ownerHouse: String;

  paymentType: Number;
  hostelTypeId: Number;
  accountId: Number;

  [key: string]: any;
}
export interface postSearchModel {
  id?: Number | null;
  title?: String | null;
  price?: Number | null;
  acreage?: Number | null;
  district?: String | null;
  ward?: String | null;
  phoneNumber?: String | null;
  ownerHouse?: String | null;
  hostelTypeId?: Number | null;
  accountId?: Number | null;
  [key: string]: any;
}
