import { Document } from 'mongoose';

export interface AdsFromEbaySchema extends Document {
  _id: string;
  labeled: boolean;
  labeledDecision: boolean;
  toReview: boolean;

  'ad-address': {
    street: string;
    state: string;
    'zip-code': number;
    longitude: number;
    latitude: number;
    radius: number;
  };
  'ad-external-reference-id': any;
  'ad-source-id': any;
  'ad-status': any;
  'ad-type': any;
  attributes: {
    attribute: any[];
    name: string;
    unit: any;
    'search-display': boolean;
    'fake-sub-category': boolean;
    type: string;
    'localized-label': string;
  }[];
  category: {
    'id-name': { value: string };
    'localized-name': { value: string };
    link: any[];
    category: any[];
    'parent-id': { value: number };
    id: number;
  };
  'contact-name': { value: string };
  'contact-name-initials': { value: string };
  description: { value: string };
  displayoptions: {
    'reduced-ads-on-vip': { value: boolean };
    'hide-ads-on-vip': { value: boolean };
    'show-ratings': { value: boolean };
    'ad-flagging-enabled': { value: boolean };
    'hide-similard-ads-on-vip': { value: boolean };
    'category-change-allowed': { value: boolean };
  };
  documents: { document: [] };
  'features-active': { 'feature-active': any[] };
  id: number;
  imprint: any;
  link: { href: string; rel: string }[];
  locale: string;
  locations: {
    location: [
      {
        'id-name': { value: string };
        'localized-name': { value: string };
        longitude: { value: number };
        latitude: { value: number };
        radius: { value: number };
        regions: {
          region: [{ 'localized-name': { value: string } }];
          'localized-label': string;
        };
        location: [];
        'parent-id': { value: number };
        'children-count': { value: 0 };
        id: 2533;
      },
    ];
  };
  medias: { media: [] };
  originId: { value: 0 };
  otherAttributes: any;
  phone: any;
  pictures: {
    picture: { link: { href: string; rel: string }[] }[];
  };
  'poster-type': { value: string };
  price: {
    'currency-iso-code': {
      value: { value: string; 'localized-label': string };
    };
    amount: { value: number };
    'price-type': { value: string };
  };
  'seller-account-type': { value: string };
  'start-date-time': { value: string };
  'store-id': any;
  title: { value: string };
  tracking: {
    'user-account-type': { value: string };
  };
  'user-id': { value: number };
  'user-rating': { averageRating: { value: number } };
  'user-since-date-time': { value: string };
  userBadges: { badges: { name: string; level: number; value: any }[] };
  version: string;
}
