import faker from 'faker';

import { get } from './common';

/**
 * @param {Object} objMap
 * @param {'az' | 'cz' | 'de' | 'de_AT' | 'de_CH' | 'en' | 'en_AU' | 'en_AU_ocker' | 'en_BORK' | 'en_CA' | 'en_GB' | 'en_IE' | 'en_IND' | 'en_US' | 'en_ZA' | 'es' | 'es_MX' | 'fa' | 'fi' | 'fr' | 'fr_CA' | 'fr_CH' | 'ge' | 'hy' | 'hr' | 'id_ID' | 'it' | 'ja' | 'ko' | 'nb_NO' | 'ne' | 'nl' | 'nl_BE' | 'pl' | 'pt_BR' | 'pt_PT' | 'ro' | 'ru' | 'sk' | 'sv' | 'tr' | 'uk' | 'vi' | 'zh_CN' | 'zh_TW'} locale
 */
export function transformFakerMap(objMap, locale = 'en') {
  const jsonOutput = JSON.parse(JSON.stringify(objMap));
  faker.setLocale(locale);

  function assign(obj) {
    if (Array.isArray(obj)) obj.forEach((o) => assign(o));
    else {
      for (const prop in obj) {
        if (typeof obj[prop] === 'string') {
          obj[prop] = get(faker, obj[prop], () => 'not found')();
        } else if (Array.isArray(obj[prop])) {
          obj[prop].forEach((o) => assign(o));
        } else if (prop in obj) {
          assign(obj[prop]);
        }
      }
    }
  }

  assign(jsonOutput);
  return jsonOutput;
}
