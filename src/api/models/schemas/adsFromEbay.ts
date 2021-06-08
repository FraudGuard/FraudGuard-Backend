import { Document } from 'mongoose';

/**
 *  Erstellt ein AdsFromEbaySchema Interface
 */
export interface AdsFromEbaySchema extends Document {
  _id: string;
  labeled: boolean;
  labeledDecision: boolean;
  toReview: boolean;
  comment:string;
  searchQuery?: string;

  'ad-address': {
    street: { value: string };
    state: { value: string };
    'zip-code': { value: string };
    longitude: { value: string };
    latitude: { value: string };
    radius: { value: string };
  };
  'ad-external-reference-id': any;
  'ad-source-id': any;
  'ad-status': any;
  'ad-type': any;
  attributes: {
    attribute: {
      value: {
        value: string;
        'localized-label': string;
      }[];
      name: string;
      unit: any;
      'search-display': string;
      'fake-sub-category': string;
      type: string;
      'localized-label': string;
      'localized-tag'?: string;
    }[];
  };
  category: {
    'id-name': { value: string };
    'localized-name': { value: string };
    link: any[];
    category: any[];
    'parent-id': { value: string };
    id: string;
  };
  'contact-name': { value: string };
  'contact-name-initials': { value: string };
  description: { value: string };
  displayoptions: {
    'reduced-ads-on-vip': { value: string };
    'hide-ads-on-vip': { value: string };
    'show-ratings': { value: string };
    'ad-flagging-enabled': { value: string };
    'hide-similard-ads-on-vip': { value: string };
    'category-change-allowed': { value: string };
  };
  documents: { document: [] };
  'features-active': { 'feature-active': any[] };
  id: string;
  imprint: any;
  link: { href: string; rel: string }[];
  locale: string;
  locations: {
    location: [
      {
        'id-name': { value: string };
        'localized-name': { value: string };
        longitude: { value: string };
        latitude: { value: string };
        radius: { value: string };
        regions: {
          region: [{ 'localized-name': { value: string } }];
          'localized-label': string;
        };
        location: [];
        'parent-id': { value: string };
        'children-count': { value: string };
        id: string;
      },
    ];
  };
  medias: { media: [] };
  originId: { value: string };
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
    amount: { value: string };
    'price-type': { value: string };
  };
  'seller-account-type': { value: string };
  'start-date-time': { value: string };
  'store-id': any;
  title: { value: string };
  tracking: {
    'user-account-type': { value: string };
  };
  'user-id': { value: string };
  'user-rating': { averageRating: any };
  'user-since-date-time': { value: string };
  // 'userBadges': { badges: { name: string; level: string; value: any }[] };
  userBadges: { badges: { name: string; level: string; value: any }[] }[];
  version: string;
  updatedAt: any;
}
