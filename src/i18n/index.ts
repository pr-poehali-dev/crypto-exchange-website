import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ru from './locales/ru.json';
import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import it from './locales/it.json';
import pt from './locales/pt.json';
import zh from './locales/zh.json';
import ja from './locales/ja.json';
import ko from './locales/ko.json';
import ar from './locales/ar.json';
import hi from './locales/hi.json';
import tr from './locales/tr.json';
import pl from './locales/pl.json';
import nl from './locales/nl.json';
import sv from './locales/sv.json';
import da from './locales/da.json';
import no from './locales/no.json';
import fi from './locales/fi.json';
import cs from './locales/cs.json';
import sk from './locales/sk.json';
import hu from './locales/hu.json';
import ro from './locales/ro.json';
import bg from './locales/bg.json';
import hr from './locales/hr.json';
import sl from './locales/sl.json';
import et from './locales/et.json';
import lv from './locales/lv.json';
import lt from './locales/lt.json';
import uk from './locales/uk.json';
import be from './locales/be.json';
import ka from './locales/ka.json';
import am from './locales/am.json';
import he from './locales/he.json';
import fa from './locales/fa.json';
import ur from './locales/ur.json';
import bn from './locales/bn.json';
import ta from './locales/ta.json';
import te from './locales/te.json';
import ml from './locales/ml.json';
import kn from './locales/kn.json';
import gu from './locales/gu.json';
import or from './locales/or.json';
import pa from './locales/pa.json';
import as from './locales/as.json';
import ne from './locales/ne.json';
import si from './locales/si.json';
import my from './locales/my.json';
import km from './locales/km.json';
import lo from './locales/lo.json';
import ka_GE from './locales/ka_GE.json';
import hy from './locales/hy.json';
import az from './locales/az.json';
import kk from './locales/kk.json';
import ky from './locales/ky.json';
import uz from './locales/uz.json';
import tg from './locales/tg.json';
import mn from './locales/mn.json';
import vi from './locales/vi.json';
import th from './locales/th.json';
import id from './locales/id.json';
import ms from './locales/ms.json';
import tl from './locales/tl.json';
import haw from './locales/haw.json';
import mg from './locales/mg.json';
import sm from './locales/sm.json';
import to from './locales/to.json';
import fj from './locales/fj.json';
import mi from './locales/mi.json';
import is from './locales/is.json';
import fo from './locales/fo.json';
import ga from './locales/ga.json';
import gd from './locales/gd.json';
import cy from './locales/cy.json';
import br from './locales/br.json';
import eu from './locales/eu.json';
import ca from './locales/ca.json';
import gl from './locales/gl.json';
import mt from './locales/mt.json';
import sq from './locales/sq.json';
import mk from './locales/mk.json';
import bs from './locales/bs.json';
import sr from './locales/sr.json';
import me from './locales/me.json';
import el from './locales/el.json';
import sw from './locales/sw.json';
import zu from './locales/zu.json';
import xh from './locales/xh.json';
import af from './locales/af.json';
import yo from './locales/yo.json';
import ig from './locales/ig.json';
import ha from './locales/ha.json';
import so from './locales/so.json';
import rw from './locales/rw.json';
import ny from './locales/ny.json';
import sn from './locales/sn.json';
import st from './locales/st.json';
import tn from './locales/tn.json';
import ve from './locales/ve.json';
import ts from './locales/ts.json';
import ss from './locales/ss.json';
import nr from './locales/nr.json';
import nd from './locales/nd.json';

const resources = {
  ru: { translation: ru },
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr },
  de: { translation: de },
  it: { translation: it },
  pt: { translation: pt },
  zh: { translation: zh },
  ja: { translation: ja },
  ko: { translation: ko },
  ar: { translation: ar },
  hi: { translation: hi },
  tr: { translation: tr },
  pl: { translation: pl },
  nl: { translation: nl },
  sv: { translation: sv },
  da: { translation: da },
  no: { translation: no },
  fi: { translation: fi },
  cs: { translation: cs },
  sk: { translation: sk },
  hu: { translation: hu },
  ro: { translation: ro },
  bg: { translation: bg },
  hr: { translation: hr },
  sl: { translation: sl },
  et: { translation: et },
  lv: { translation: lv },
  lt: { translation: lt },
  uk: { translation: uk },
  be: { translation: be },
  ka: { translation: ka },
  am: { translation: am },
  he: { translation: he },
  fa: { translation: fa },
  ur: { translation: ur },
  bn: { translation: bn },
  ta: { translation: ta },
  te: { translation: te },
  ml: { translation: ml },
  kn: { translation: kn },
  gu: { translation: gu },
  or: { translation: or },
  pa: { translation: pa },
  as: { translation: as },
  ne: { translation: ne },
  si: { translation: si },
  my: { translation: my },
  km: { translation: km },
  lo: { translation: lo },
  ka_GE: { translation: ka_GE },
  hy: { translation: hy },
  az: { translation: az },
  kk: { translation: kk },
  ky: { translation: ky },
  uz: { translation: uz },
  tg: { translation: tg },
  mn: { translation: mn },
  vi: { translation: vi },
  th: { translation: th },
  id: { translation: id },
  ms: { translation: ms },
  tl: { translation: tl },
  haw: { translation: haw },
  mg: { translation: mg },
  sm: { translation: sm },
  to: { translation: to },
  fj: { translation: fj },
  mi: { translation: mi },
  is: { translation: is },
  fo: { translation: fo },
  ga: { translation: ga },
  gd: { translation: gd },
  cy: { translation: cy },
  br: { translation: br },
  eu: { translation: eu },
  ca: { translation: ca },
  gl: { translation: gl },
  mt: { translation: mt },
  sq: { translation: sq },
  mk: { translation: mk },
  bs: { translation: bs },
  sr: { translation: sr },
  me: { translation: me },
  el: { translation: el },
  sw: { translation: sw },
  zu: { translation: zu },
  xh: { translation: xh },
  af: { translation: af },
  yo: { translation: yo },
  ig: { translation: ig },
  ha: { translation: ha },
  so: { translation: so },
  rw: { translation: rw },
  ny: { translation: ny },
  sn: { translation: sn },
  st: { translation: st },
  tn: { translation: tn },
  ve: { translation: ve },
  ts: { translation: ts },
  ss: { translation: ss },
  nr: { translation: nr },
  nd: { translation: nd },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie'],
    },
  });

export default i18n;