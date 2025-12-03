let color;

/* Images */
const nia_images = document.querySelectorAll(
  '*:not(.ol-overlay-container):not(.ol-control) > * > img,[role="img"],svg:not(.is-hidden),svg[role="img"],embed[type="image"],canvas,map,area,object[type="image"]'
);
let nia_imgElm = 0;
let nia_imgSvg = 0;
let nia_imgObject = 0;
let nia_imgError = 0;
let nia_imgWarning = 0;
let nia_imgBottomLine;

/* Tabs */
const nia_tabElm = document.querySelectorAll(
  ':where(a, button, input, select, textarea, summary, [tabindex]):not([aria-hidden="true"]):not([tabindex="-1"])'
);
let nia_tabError = 0;
let nia_tabBottomLine;

/* Lang */
const nia_langElm = document.querySelectorAll('body [lang]');
let nia_langFr = 0;
let nia_langEn = 0;
let nia_langDe = 0;
let nia_langLb = 0;
let nia_langOther = 0;
let nia_langBottomLine;

/* Headings */
const nia_headElm = document.querySelectorAll(
  '[role="heading"],h1,h2,h3,h4,h5,h6'
);
let nia_headRole = 0;
let nia_headHn = 0;
let nia_headBottomLine;

/* Forms */
const nia_formFields = document.querySelectorAll(
  'input[name]:not([type="submit"]):not([type="reset"]):not([type="button"]):not([type="hidden"]), select, textarea'
);
let nia_formElm = 0;
let nia_formWarning = 0;
let nia_formBottomLine;

/* Link */
const nia_linkElm = document.querySelectorAll(
  'a[href]:not([role="button"]),[role="link"][href]'
);
let nia_linkError = 0;
let nia_linkBottomLine;

/* Table */
const nia_tableElm = document.querySelectorAll('table, caption, th, td');
let nia_tableError = 0;
let nia_tableWarning = 0;
let nia_tableBottomLine;
