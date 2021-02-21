import React from 'react';
import PropTypes from 'prop-types';

import { transformFakerMap } from '../utils/fakerUtil';
import { Middleware } from './Middleware';
import { passValues } from '../utils/propsUtil';

export const Faker = ({ map, length, locale }) => (
  <Middleware
    handler={(req, res) => {
      let json;
      const params = passValues(req, { length, locale });

      if (length) {
        json = Array.from({ length: +(params.length || 5) }, () =>
          transformFakerMap(map, params.locale || 'en')
        );
      } else {
        json = transformFakerMap(map, params.locale);
      }

      res.send(json);
    }}
  />
);

Faker.propTypes = {
  map: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  length: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  locale: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([
      'az',
      'cz',
      'de',
      'de_AT',
      'de_CH',
      'en',
      'en_AU',
      'en_AU_ocker',
      'en_BORK',
      'en_CA',
      'en_GB',
      'en_IE',
      'en_IND',
      'en_US',
      'en_ZA',
      'es',
      'es_MX',
      'fa',
      'fi',
      'fr',
      'fr_CA',
      'fr_CH',
      'ge',
      'hy',
      'hr',
      'id_ID',
      'it',
      'ja',
      'ko',
      'nb_NO',
      'ne',
      'nl',
      'nl_BE',
      'pl',
      'pt_BR',
      'pt_PT',
      'ro',
      'ru',
      'sk',
      'sv',
      'tr',
      'uk',
      'vi',
      'zh_CN',
      'zh_TW',
    ]),
  ]),
};
