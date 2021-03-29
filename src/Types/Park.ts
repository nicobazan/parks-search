export interface Park {
  id: string;
  url: string;
  fullName: string;
  parkCode: string;
  description: string;
  latitude: string;
  longitude: string;
  latLong: string;
  activities?: (ActivitiesEntityOrTopicsEntity)[] | null;
  topics?: (ActivitiesEntityOrTopicsEntity)[] | null;
  states: string;
  contacts: Contacts;
  entranceFees?: (EntranceFeesEntityOrEntrancePassesEntity)[] | null;
  entrancePasses?: (EntranceFeesEntityOrEntrancePassesEntity)[] | null;
  fees?: (null)[] | null;
  directionsInfo: string;
  directionsUrl: string;
  operatingHours?: (OperatingHoursEntity)[] | null;
  addresses?: (AddressesEntity)[] | null;
  images?: (ImagesEntity)[] | null;
  weatherInfo: string;
  name: string;
  designation: string;
}
export interface ActivitiesEntityOrTopicsEntity {
  id: string;
  name: string;
}
export interface Contacts {
  phoneNumbers?: (PhoneNumbersEntity)[] | null;
  emailAddresses?: (EmailAddressesEntity)[] | null;
}
export interface PhoneNumbersEntity {
  phoneNumber: string;
  description: string;
  extension: string;
  type: string;
}
export interface EmailAddressesEntity {
  description: string;
  emailAddress: string;
}
export interface EntranceFeesEntityOrEntrancePassesEntity {
  cost: string;
  description: string;
  title: string;
}
export interface OperatingHoursEntity {
  exceptions?: (null)[] | null;
  description: string;
  standardHours: StandardHours;
  name: string;
}
export interface StandardHours {
  wednesday: string;
  monday: string;
  thursday: string;
  sunday: string;
  tuesday: string;
  friday: string;
  saturday: string;
}
export interface AddressesEntity {
  postalCode: string;
  city: string;
  stateCode: string;
  line1: string;
  type: string;
  line3: string;
  line2: string;
}
export interface ImagesEntity {
  credit: string;
  title: string;
  altText: string;
  caption: string;
  url: string;
}
