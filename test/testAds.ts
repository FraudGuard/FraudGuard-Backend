import { AdsFromEbayModel } from '../src/api/models';

export const Ad1 = new AdsFromEbayModel({
  _id: '1681374618',
  'ad-address': {
    street: { value: 'Lerchenstrasse 46' },
    state: { value: 'Nürtingen' },
    'zip-code': { value: '72622' },
    longitude: { value: '9.3557' },
    latitude: { value: '48.64' },
    radius: { value: '1.0' },
  },
  'ad-external-reference-id': {},
  'ad-source-id': {},
  'ad-status': { value: 'ACTIVE' },
  'ad-type': { value: 'OFFERED' },
  attributes: {
    attribute: [
      {
        value: [{ value: 'lego_duplo', 'localized-label': 'LEGO & Duplo' }],
        name: 'spielzeug.art',
        unit: '',
        'search-display': 'false',
        'fake-sub-category': 'true',
        type: 'ENUM',
        'localized-label': 'Art',
      },
      {
        value: [{ value: 'ja', 'localized-label': 'Versand möglich' }],
        name: 'spielzeug.versand',
        unit: '',
        'search-display': 'true',
        'fake-sub-category': 'false',
        'localized-tag': 'Versand möglich',
        type: 'ENUM',
        'localized-label': 'Nur Abholung',
      },
    ],
  },
  category: {
    'id-name': { value: 'Spielzeug' },
    'localized-name': { value: 'Spielzeug' },
    link: [],
    category: [],
    'parent-id': { value: '17' },
    id: '23',
  },
  'contact-name': { value: 'Alexander Benz' },
  'contact-name-initials': { value: 'AB' },
  description: {
    value:
      'Neuanschaffung gebrauchbar Sammlung etwas verkleinern, daher hier zum Verkauf LEGO Technic mobiler Schwerlastkran (42009)- vollständiges Set- nicht bespielt- incl. AufbauanleitungKann zusammengebaut Abholer, oder zerlegt versendet werden.Wird natürlich nochmal gereinigtBei Fragen einfach melden. nur sepa ',
  },
  displayoptions: {
    'reduced-ads-on-vip': { value: 'false' },
    'hide-ads-on-vip': { value: 'false' },
    'show-ratings': { value: 'false' },
    'ad-flagging-enabled': { value: 'true' },
    'hide-similard-ads-on-vip': { value: 'false' },
    'category-change-allowed': { value: 'false' },
  },
  documents: { document: [] },
  'features-active': { 'feature-active': [{ name: 'TOPAD', display: 'true' }] },
  id: '1681374618',
  imprint: {},
  link: [
    {
      href: 'https://api.ebay-kleinanzeigen.de:443/api/ads/1681374618',
      rel: 'self',
    },
    {
      href: 'https://api.ebay-kleinanzeigen.de:443/api/users/43301478/ads/1681374618',
      rel: 'self-user',
    },
    {
      href: 'https://www.ebay-kleinanzeigen.de/s-anzeige/lego-technic-42009-mobiler-schwerlastkran-mk-ii/1681374618-23-8219',
      rel: 'self-public-website',
    },
  ],
  locale: 'de_DE',
  locations: {
    location: [
      {
        'id-name': { value: '72622' },
        'localized-name': { value: '72622 Nürtingen' },
        longitude: { value: '9.321328' },
        latitude: { value: '48.613403' },
        radius: { value: '2.94' },
        regions: {
          region: [{ 'localized-name': { value: 'Baden-Württemberg' } }],
          'localized-label': 'Bundesland',
        },
        location: [],
        'parent-id': { value: '8211' },
        'children-count': { value: '0' },
        id: '8219',
      },
    ],
  },
  medias: { media: [] },
  originId: { value: '0' },
  otherAttributes: {},
  phone: { value: '0176/80426250' },
  pictures: {
    picture: [
      {
        link: [
          {
            href: 'https://i.ebayimg.com/00/s/MTIwMFgxNjAw/z/d-0AAOSwJEhgYKEI/$_0.JPG',
            rel: 'thumbnail',
          },
          {
            href: 'https://i.ebayimg.com/00/s/MTIwMFgxNjAw/z/d-0AAOSwJEhgYKEI/$_2.JPG',
            rel: 'teaser',
          },
          {
            href: 'https://i.ebayimg.com/00/s/MTIwMFgxNjAw/z/d-0AAOSwJEhgYKEI/$_1.JPG',
            rel: 'large',
          },
          {
            href: 'https://i.ebayimg.com/00/s/MTIwMFgxNjAw/z/d-0AAOSwJEhgYKEI/$_59.JPG',
            rel: 'extraLarge',
          },
          {
            href: 'https://i.ebayimg.com/00/s/MTIwMFgxNjAw/z/d-0AAOSwJEhgYKEI/$_57.JPG',
            rel: 'XXL',
          },
          {
            href: 'https://i.ebayimg.com/00/s/MTIwMFgxNjAw/z/d-0AAOSwJEhgYKEI/$_{imageId}.JPG',
            rel: 'canonicalUrl',
          },
        ],
      },
    ],
  },
  'poster-type': { value: 'PRIVATE' },
  price: {
    'currency-iso-code': { value: { value: 'USD', 'localized-label': 'USD' } },
    amount: { value: '200' },
    'price-type': { value: 'SPECIFIED_AMOUNT' },
  },
  'seller-account-type': { value: 'PRIVATE' },
  'start-date-time': { value: '2021-02-27T15:07:11.000+0100' },
  'store-id': {},
  title: {
    value: 'ziemlich neu LEGO Technic 42009 Mobiler Schwerlastkran MK II',
  },
  tracking: { 'user-account-type': { value: 'private' } },
  'user-id': { value: '43301478' },
  'user-rating': { averageRating: { value: '0.875' } },
  'user-since-date-time': { value: '2016-11-05T16:01:14.000+0100' },
  userBadges: {
    badges: [
      { name: 'rating', level: '2', value: '' },
      { name: 'friendliness', level: '1', value: '' },
      { name: 'replyRate', level: '2', value: '100%' },
      { name: 'replySpeed', level: '1', value: '3h' },
    ],
  },
  version: '1.16',
  searchQuery: 'lego',
  labeled: true,
  labeledDecision: false,
  toReview: false,
  updatedAt: { $date: { $numberLong: '1619816154092' } },
});

export const Ad2 = new AdsFromEbayModel({
  _id: '1681374618',
  'ad-address': {
    street: { value: 'Lerchenstrasse 46' },
    state: { value: 'Nürtingen' },
    'zip-code': { value: '72622' },
    longitude: { value: '79.557' },
    latitude: { value: '4.664' },
    radius: { value: '1.0' },
  },
  'ad-external-reference-id': {},
  'ad-source-id': {},
  'ad-status': { value: 'ACTIVE' },
  'ad-type': { value: 'WANTED' },
  attributes: {
    attribute: [
      {
        value: [{ value: 'lego_duplo', 'localized-label': 'LEGO & Duplo' }],
        name: 'spielzeug.art',
        unit: '',
        'search-display': 'false',
        'fake-sub-category': 'true',
        type: 'ENUM',
        'localized-label': 'Art',
      },
      {
        value: [{ value: 'ja', 'localized-label': 'Versand möglich' }],
        name: 'spielzeug.versand',
        unit: '',
        'search-display': 'true',
        'fake-sub-category': 'false',
        'localized-tag': 'Versand möglich',
        type: 'ENUM',
        'localized-label': 'Versand',
      },
    ],
  },
  category: {
    'id-name': { value: 'Spielzeug' },
    'localized-name': { value: 'Spielzeug' },
    link: [],
    category: [],
    'parent-id': { value: '17' },
    id: '44',
  },
  'contact-name': { value: 'Aruba 3!' },
  'contact-name-initials': { value: 'AB' },
  description: {
    value:
      'kein sepa .Mit Versiegelung aber nicht neu, paypal freunde daher hier zum Verkauf :<br />Originalverpackter LEGO Technic mobiler Schwerlastkran (42009)<br /><br />- vollständiges Set<br />- nicht bespielt<br />- incl. Aufbauanleitung<br /><br /> Überweisung und nicht bar Bezahlung.<br /><br />Wird natürlich nochmal gereinigt<br /><br />Bei Fragen einfach melden whatsapp Nicht nur die Elite des Imperiums, sondern auch gelegentlich ein Spezialkommando der Rebellen nutzt das elegante Imperial Shuttle der Lamdba-Klasse , um durch die Galaxie zu reisen. Zum allerersten Mal gibt es dieses berühmte Star Wars Raumschiff nun als LEGO Modell im Minifiguren-Maßstab. Tauchen Sie mit der LEGO® Polizeistation (10278) in eine Welt voller Gaunereien, Ermittlungserfolge und Donuts ein',
  },
  displayoptions: {
    'reduced-ads-on-vip': { value: 'false' },
    'hide-ads-on-vip': { value: 'false' },
    'show-ratings': { value: 'false' },
    'ad-flagging-enabled': { value: 'true' },
    'hide-similard-ads-on-vip': { value: 'false' },
    'category-change-allowed': { value: 'false' },
  },
  documents: { document: [] },
  'features-active': { 'feature-active': [{ name: 'TOPAD', display: 'true' }] },
  id: '1681374618',
  imprint: {},
  link: [
    {
      href: 'https://api.ebay-kleinanzeigen.de:443/api/ads/1681374618',
      rel: 'self',
    },
    {
      href: 'https://api.ebay-kleinanzeigen.de:443/api/users/43301478/ads/1681374618',
      rel: 'self-user',
    },
    {
      href: 'https://www.ebay-kleinanzeigen.de/s-anzeige/lego-technic-42009-mobiler-schwerlastkran-mk-ii/1681374618-23-8219',
      rel: 'self-public-website',
    },
  ],
  locale: 'de_DE',
  locations: {
    location: [
      {
        'id-name': { value: '72622' },
        'localized-name': { value: '72622 Nürtingen' },
        longitude: { value: '9.321328' },
        latitude: { value: '48.613403' },
        radius: { value: '2.94' },
        regions: {
          region: [{ 'localized-name': { value: 'Baden-Württemberg' } }],
          'localized-label': 'Bundesland',
        },
        location: [],
        'parent-id': { value: '8211' },
        'children-count': { value: '0' },
        id: '8219',
      },
    ],
  },
  medias: { media: [] },
  originId: { value: '0' },
  otherAttributes: {},
  pictures: {
    picture: [
      {
        link: [
          {
            href: 'https://i.ebayimg.com/00/s/MTIwMFgxNjAw/z/d-0AAOSwJEhgYKEI/$_0.JPG',
            rel: 'thumbnail',
          },
          {
            href: 'https://i.ebayimg.com/00/s/MTIwMFgxNjAw/z/d-0AAOSwJEhgYKEI/$_2.JPG',
            rel: 'teaser',
          },
          {
            href: 'https://i.ebayimg.com/00/s/MTIwMFgxNjAw/z/d-0AAOSwJEhgYKEI/$_1.JPG',
            rel: 'large',
          },
          {
            href: 'https://i.ebayimg.com/00/s/MTIwMFgxNjAw/z/d-0AAOSwJEhgYKEI/$_59.JPG',
            rel: 'extraLarge',
          },
          {
            href: 'https://i.ebayimg.com/00/s/MTIwMFgxNjAw/z/d-0AAOSwJEhgYKEI/$_57.JPG',
            rel: 'XXL',
          },
          {
            href: 'https://i.ebayimg.com/00/s/MTIwMFgxNjAw/z/d-0AAOSwJEhgYKEI/$_{imageId}.JPG',
            rel: 'canonicalUrl',
          },
        ],
      },
    ],
  },
  'poster-type': { value: 'PRIVATE' },
  price: {
    'currency-iso-code': { value: { value: 'EUR', 'localized-label': 'EUR' } },
    amount: { value: '100' },
    'price-type': { value: 'PLEASE_CONTACT' },
  },
  'seller-account-type': { value: 'PRIVATE' },
  'start-date-time': { value: '2021-02-27T15:07:11.000+0100' },
  'store-id': {},
  title: {
    value:
      'Neu & OVP LEGO Technic 42009 Mobiler Schwerlastkran MK II - ungeöffnet und verschweißt ✅',
  },
  tracking: { 'user-account-type': { value: 'private' } },
  'user-id': { value: '43301478' },
  'user-rating': { averageRating: { value: '0.875' } },
  'user-since-date-time': { value: '2016-11-05T16:01:14.000+0100' },
  userBadges: {
    badges: [
      { name: 'rating', level: '2', value: '' },
      { name: 'friendliness', level: '1', value: '' },
      { name: 'replyRate', level: '2', value: '100%' },
      { name: 'replySpeed', level: '1', value: '3h' },
    ],
  },
  version: '1.16',
  searchQuery: 'lego',
  labeled: true,
  labeledDecision: false,
  toReview: false,
  updatedAt: { $date: { $numberLong: '1619816154092' } },
  fraud_score: '',
});

export const Ad3 = new AdsFromEbayModel({
  _id: '1681374618',
  'ad-address': {
    street: { value: 'Lerchenstrasse 46' },
    state: { value: 'Nürtingen' },
    'zip-code': { value: '72622' },
    longitude: { value: '15.328' },
    latitude: { value: '55.23' },
    radius: { value: '1.0' },
  },
  'ad-external-reference-id': {},
  'ad-source-id': {},
  'ad-status': { value: 'ACTIVE' },
  'ad-type': { value: 'WANTED' },
  attributes: {
    attribute: [
      {
        value: [{ value: 'lego_duplo', 'localized-label': 'LEGO & Duplo' }],
        name: 'spielzeug.art',
        unit: '',
        'search-display': 'false',
        'fake-sub-category': 'true',
        type: 'ENUM',
        'localized-label': 'Art',
      },
      {
        value: [{ value: 'ja', 'localized-label': 'Versand möglich' }],
        name: 'spielzeug.versand',
        unit: '',
        'search-display': 'true',
        'fake-sub-category': 'false',
        'localized-tag': 'Versand möglich',
        type: 'ENUM',
        'localized-label': 'Nur Abholung',
      },
    ],
  },
  category: {
    'id-name': { value: 'Spielzeug' },
    'localized-name': { value: 'Spielzeug' },
    link: [],
    category: [],
    'parent-id': { value: '17' },
    id: '176',
  },
  'contact-name': { value: 'Alexander Benz GmbH' },
  'contact-name-initials': { value: 'AB' },
  description: {
    value: 'Test auf kopierte Beschreibungen und Anzeige',
  },
  displayoptions: {
    'reduced-ads-on-vip': { value: 'false' },
    'hide-ads-on-vip': { value: 'false' },
    'show-ratings': { value: 'false' },
    'ad-flagging-enabled': { value: 'true' },
    'hide-similard-ads-on-vip': { value: 'false' },
    'category-change-allowed': { value: 'false' },
  },
  documents: { document: [] },
  'features-active': { 'feature-active': [{ name: 'TOPAD', display: 'true' }] },
  id: '1681374618',
  imprint: {},
  link: [
    {
      href: 'https://api.ebay-kleinanzeigen.de:443/api/ads/1681374618',
      rel: 'self',
    },
    {
      href: 'https://api.ebay-kleinanzeigen.de:443/api/users/43301478/ads/1681374618',
      rel: 'self-user',
    },
    {
      href: 'https://www.ebay-kleinanzeigen.de/s-anzeige/lego-technic-42009-mobiler-schwerlastkran-mk-ii/1681374618-23-8219',
      rel: 'self-public-website',
    },
  ],
  locale: 'de_DE',
  locations: {
    location: [
      {
        'id-name': { value: '72622' },
        'localized-name': { value: '72622 Nürtingen' },
        longitude: { value: '15.328' },
        latitude: { value: '55.23' },
        radius: { value: '2.94' },
        regions: {
          region: [{ 'localized-name': { value: 'Baden-Württemberg' } }],
          'localized-label': 'Bundesland',
        },
        location: [],
        'parent-id': { value: '8211' },
        'children-count': { value: '0' },
        id: '8219',
      },
    ],
  },
  medias: { media: [] },
  originId: { value: '0' },
  otherAttributes: {},
  phone: { value: '0176/80426250' },
  pictures: {
    picture: [
      {
        link: [
          {
            href: 'https://i.ebayimg.com/00/s/MTIwMFgxNjAw/z/d-0AAOSwJEhgYKEI/$_0.JPG',
            rel: 'thumbnail',
          },
          {
            href: 'https://i.ebayimg.com/00/s/MTIwMFgxNjAw/z/d-0AAOSwJEhgYKEI/$_2.JPG',
            rel: 'teaser',
          },
          {
            href: 'https://i.ebayimg.com/00/s/MTIwMFgxNjAw/z/d-0AAOSwJEhgYKEI/$_1.JPG',
            rel: 'large',
          },
          {
            href: 'https://i.ebayimg.com/00/s/MTIwMFgxNjAw/z/d-0AAOSwJEhgYKEI/$_59.JPG',
            rel: 'extraLarge',
          },
          {
            href: 'https://i.ebayimg.com/00/s/MTIwMFgxNjAw/z/d-0AAOSwJEhgYKEI/$_57.JPG',
            rel: 'XXL',
          },
          {
            href: 'https://i.ebayimg.com/00/s/MTIwMFgxNjAw/z/d-0AAOSwJEhgYKEI/$_{imageId}.JPG',
            rel: 'canonicalUrl',
          },
        ],
      },
    ],
  },
  'poster-type': { value: 'PRIVATE' },
  price: {
    'currency-iso-code': {
      value: { value: 'EUR', 'localized-label': 'EUR' },
    },
    amount: { value: '0' },
    'price-type': { value: 'SPECIFIED_AMOUNT' },
  },
  'seller-account-type': { value: 'PRIVATE' },
  'start-date-time': { value: '2021-02-27T15:07:11.000+0100' },
  'store-id': {},
  title: {
    value:
      'Sammlung 45kg Lego 10268 vestas Windrad - Suche oder Tausche gebraucht',
  },
  tracking: { 'user-account-type': { value: 'private' } },
  'user-id': { value: '43301478' },
  'user-rating': { averageRating: { value: '0.875' } },
  'user-since-date-time': { value: '2016-11-05T16:01:14.000+0100' },
  userBadges: {
    badges: [
      { name: 'rating', level: '2', value: '' },
      { name: 'friendliness', level: '1', value: '' },
      { name: 'replyRate', level: '2', value: '100%' },
      { name: 'replySpeed', level: '1', value: '3h' },
    ],
  },
  version: '1.16',
  searchQuery: 'lego',
  labeled: true,
  labeledDecision: false,
  toReview: false,
  updatedAt: { $date: { $numberLong: '1619816154092' } },
});

export const Ad4 = new AdsFromEbayModel({
  _id: '1681374618',
  'ad-address': {
    street: { value: 'Lerchenstrasse 46' },
    state: { value: 'Nürtingen' },
    'zip-code': { value: '72622' },
    longitude: { value: '15.328' },
    latitude: { value: '55.23' },
    radius: { value: '1.0' },
  },
  'ad-external-reference-id': {},
  'ad-source-id': {},
  'ad-status': { value: 'ACTIVE' },
  'ad-type': { value: 'OFFERED' },
  attributes: {
    attribute: [
      {
        value: [{ value: 'lego_duplo', 'localized-label': 'LEGO & Duplo' }],
        name: 'spielzeug.art',
        unit: '',
        'search-display': 'false',
        'fake-sub-category': 'true',
        type: 'ENUM',
        'localized-label': 'Art',
      },
      {
        value: [{ value: 'ja', 'localized-label': 'Versand möglich' }],
        name: 'spielzeug.versand',
        unit: '',
        'search-display': 'true',
        'fake-sub-category': 'false',
        'localized-tag': 'Versand möglich',
        type: 'ENUM',
        'localized-label': 'Versand möglich',
      },
    ],
  },
  category: {
    'id-name': { value: 'Spielzeug' },
    'localized-name': { value: 'Spielzeug' },
    link: [],
    category: [],
    'parent-id': { value: '17' },
    id: '176',
  },
  'contact-name': { value: 'Aruba !3' },
  'contact-name-initials': { value: 'AB' },
  description: {
    value: ' blablabla  Rechte gebraucht  ',
  },
  displayoptions: {
    'reduced-ads-on-vip': { value: 'false' },
    'hide-ads-on-vip': { value: 'false' },
    'show-ratings': { value: 'false' },
    'ad-flagging-enabled': { value: 'true' },
    'hide-similard-ads-on-vip': { value: 'false' },
    'category-change-allowed': { value: 'false' },
  },
  documents: { document: [] },
  'features-active': { 'feature-active': [{ name: 'TOPAD', display: 'true' }] },
  id: '1681374618',
  imprint: {},
  link: [
    {
      href: 'https://api.ebay-kleinanzeigen.de:443/api/ads/1681374618',
      rel: 'self',
    },
    {
      href: 'https://api.ebay-kleinanzeigen.de:443/api/users/43301478/ads/1681374618',
      rel: 'self-user',
    },
    {
      href: 'https://www.ebay-kleinanzeigen.de/s-anzeige/lego-technic-42009-mobiler-schwerlastkran-mk-ii/1681374618-23-8219',
      rel: 'self-public-website',
    },
  ],
  locale: 'de_DE',
  locations: {
    location: [
      {
        'id-name': { value: '72622' },
        'localized-name': { value: '72622 Nürtingen' },
        longitude: { value: '15.328' },
        latitude: { value: '55.23' },
        radius: { value: '2.94' },
        regions: {
          region: [{ 'localized-name': { value: 'Baden-Württemberg' } }],
          'localized-label': 'Bundesland',
        },
        location: [],
        'parent-id': { value: '8211' },
        'children-count': { value: '0' },
        id: '8219',
      },
    ],
  },
  medias: { media: [] },
  originId: { value: '0' },
  otherAttributes: {},
  phone: { value: '0176/80426250' },
  pictures: {
    picture: [
      {
        link: [
          {
            href: 'https://i.ebayimg.com/00/s/MTIwMFgxNjAw/z/d-0AAOSwJEhgYKEI/$_0.JPG',
            rel: 'thumbnail',
          },
          {
            href: 'https://i.ebayimg.com/00/s/MTIwMFgxNjAw/z/d-0AAOSwJEhgYKEI/$_2.JPG',
            rel: 'teaser',
          },
          {
            href: 'https://i.ebayimg.com/00/s/MTIwMFgxNjAw/z/d-0AAOSwJEhgYKEI/$_1.JPG',
            rel: 'large',
          },
          {
            href: 'https://i.ebayimg.com/00/s/MTIwMFgxNjAw/z/d-0AAOSwJEhgYKEI/$_59.JPG',
            rel: 'extraLarge',
          },
          {
            href: 'https://i.ebayimg.com/00/s/MTIwMFgxNjAw/z/d-0AAOSwJEhgYKEI/$_57.JPG',
            rel: 'XXL',
          },
          {
            href: 'https://i.ebayimg.com/00/s/MTIwMFgxNjAw/z/d-0AAOSwJEhgYKEI/$_{imageId}.JPG',
            rel: 'canonicalUrl',
          },
        ],
      },
    ],
  },
  'poster-type': { value: 'PRIVATE' },
  price: {
    'currency-iso-code': {
      value: { value: 'EUR', 'localized-label': 'EUR' },
    },
    amount: { value: '100' },
    'price-type': { value: 'SPECIFIED_AMOUNT' },
  },
  'seller-account-type': { value: 'PRIVATE' },
  'start-date-time': { value: '2021-02-27T15:07:11.000+0100' },
  'store-id': {},
  title: {
    value: '   blabla',
  },
  tracking: { 'user-account-type': { value: 'private' } },
  'user-id': { value: '43301478' },
  'user-rating': { averageRating: { value: '0.875' } },
  'user-since-date-time': { value: '2016-11-05T16:01:14.000+0100' },
  userBadges: {
    badges: [
      { name: 'rating', level: '2', value: '' },
      { name: 'friendliness', level: '1', value: '' },
      { name: 'replyRate', level: '2', value: '100%' },
      { name: 'replySpeed', level: '1', value: '3h' },
    ],
  },
  version: '1.16',
  searchQuery: 'lego',
  labeled: true,
  labeledDecision: false,
  toReview: false,
  updatedAt: { $date: { $numberLong: '1619816154092' } },
});
