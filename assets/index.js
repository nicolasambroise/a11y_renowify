(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) return;
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) processPreload(link);
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep) return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const homePageException = [
  "https://guichet.public.lu/fr/citoyens.html",
  "https://guichet.public.lu/fr/entreprises.html",
  "https://guichet.public.lu/fr/leichte-sprache.html",
  "https://guichet.public.lu/en/citoyens.html",
  "https://guichet.public.lu/en/entreprises.html",
  "https://guichet.public.lu/en/leichte-sprache.html",
  "https://guichet.public.lu/de/citoyens.html",
  "https://guichet.public.lu/de/entreprises.html",
  "https://guichet.public.lu/de/leichte-sprache.html",
  "https://cepas.public.lu/fr/espace-public.html",
  "https://cns.public.lu/fr/assure.html",
  "https://cns.public.lu/fr/employeur.html",
  "https://cns.public.lu/fr/professionnels-sante.html",
  "https://cns.public.lu/en/assure.html",
  "https://cns.public.lu/en/employeur.html",
  "https://cns.public.lu/en/professionnels-sante.html",
  "https://cns.public.lu/de/assure.html",
  "https://cns.public.lu/de/employeur.html",
  "https://cns.public.lu/de/professionnels-sante.html"
];
const onePageException = [
  "https://menscherechtshaus.public.lu",
  "https://nadal2024.public.lu"
];
const previewPage = [
  "preview-build",
  "preview-integr",
  "preview-qual",
  "wcm-build",
  "wcm-integr",
  "wcm-qual",
  "wcm.intranet.etat.lu",
  "aem-test-",
  "localhost:4502"
];
const declarationPage = [
  "/support/accessibilite.html",
  "/support/accessibilite/accessibilite-guichet.html"
];
const ctiePage = [
  ".public.lu",
  "gouvernement.lu",
  ".etat.lu",
  "sig-gr.eu",
  ".mae.lu",
  "lu-alert.lu"
];
const aemPageException = [
  "fpgun-jway",
  "demarches.services-publics",
  "fpgun-preintegr",
  "services-publics-test",
  "accessibilite.public.lu"
];
const body = document.body;
const currentUrl = window.location.href;
const filter = {
  debug_flag: false,
  // true = On affiche les logs dans la console
  only_redactor: false,
  // true = On execute uniquement les tests concernant les redacteurs
  only_nc: true
  // true = On execute uniquement les tests de criticité rouge et orange
};
const results = {
  critical: [],
  nc: [],
  dev: [],
  nth: [],
  man: []
};
const currentIsPreview = isPreview();
const currentIsCTIE = isCTIE();
const pageSettings = {
  isHomepage: isHomepage(),
  // True s'il s'agit de la homepage du site
  isPreview: currentIsPreview,
  // True s'il s'agit d'un environnement de dev (LOCAL, BUILD, INTEGR, QUAL)
  isDeclaration: isDeclaration(),
  // True s'il s'agit de la page contenant la declaration d'accessibilité
  isSitemap: isSitemap(),
  // True s'il s'agit de la page contenant le plan du site
  isErrorPage: isErrorPage(),
  // True s'il s'agit de la page erreur 404,...
  isPrototype: isPrototype(),
  // True s'il s'agit de la page prototype / atelier graphique
  isAEM: isAEM(),
  // True s'il s'agit d'un site réalisé avec AEM
  isCTIE: currentIsCTIE,
  // True s'il s'agit d'un site hébergé par le CTIE
  isSearchLogic: isSearchLogic(),
  // True s'il s'agit d'une page présentant des résultats de recherche
  isOnePage: isOnePage()
  // True s'il s'agit d'un site de type OnePage
};
luxembourgishStateWebsiteAlert();
function setItemToResultList(key, content) {
  if (key in results) {
    results[key].push(content);
  } else {
    alert(`erreur setItemToResultList : ${key} > ${content}`);
  }
}
function resetResults() {
  for (const key of Object.keys(results)) {
    results[key] = [];
  }
}
function isHomepage() {
  if (!currentUrl.includes("chrome-extension")) {
    const homepage = document.querySelector("h1.logo.logo--homepage");
    return Boolean(homepage || homePageException.includes(currentUrl));
  }
  return false;
}
function isPreview() {
  if (!currentUrl.includes("chrome-extension")) {
    return Boolean(
      previewPage.filter((str) => currentUrl.includes(str)).length
    );
  }
  return false;
}
function isDeclaration() {
  if (!currentUrl.includes("chrome-extension")) {
    return Boolean(
      declarationPage.filter((str) => currentUrl.includes(str)).length
    );
  }
  return false;
}
function isSitemap() {
  if (!currentUrl.includes("chrome-extension")) {
    const sitemap = document.querySelector(".cmp-sitemap");
    return Boolean(sitemap);
  }
  return false;
}
function isErrorPage() {
  if (!currentUrl.includes("chrome-extension")) {
    const errorpage = document.querySelector(".cmp-error404");
    return Boolean(errorpage);
  }
  return false;
}
function isPrototype() {
  if (!currentUrl.includes("chrome-extension")) {
    return Boolean(currentUrl.includes("/prototype/"));
  }
  return false;
}
function isAEM() {
  if (!currentUrl.includes("chrome-extension")) {
    if (currentIsCTIE) {
      return Boolean(
        aemPageException.filter((str) => !currentUrl.includes(str)).length
      );
    }
  }
  return false;
}
function isCTIE() {
  if (!currentUrl.includes("chrome-extension")) {
    if (currentIsPreview) {
      return true;
    }
    return Boolean(ctiePage.filter((str) => currentUrl.includes(str)).length);
  }
  return false;
}
function isSearchLogic() {
  if (!currentUrl.includes("chrome-extension")) {
    const searchpage = document.querySelector(".search-container");
    return Boolean(searchpage);
  }
  return false;
}
function isOnePage() {
  if (!currentUrl.includes("chrome-extension")) {
    return Boolean(onePageException.includes(currentUrl));
  }
  return false;
}
function luxembourgishStateWebsiteAlert() {
  if (!currentUrl.includes("chrome-extension")) {
    if (!pageSettings.isCTIE) {
      alert(
        `Ce plugin est destiné principalement aux sites étatiques luxembourgeois. (site actuel : ${currentUrl})`
      );
    }
  }
}
function beforeCheck() {
  seeMoreAccordion();
  seeMoreAddress();
  seeScrollElements();
}
function seeMoreAccordion() {
  const accordions = [...document.querySelectorAll(".cmp-accordion details")];
  accordions.forEach((accordion) => accordion.setAttribute("open", "true"));
}
function seeMoreAddress() {
  const addresses = [
    ...document.querySelectorAll(".geoportail-addresses button.see-more")
  ];
  addresses.forEach((address) => address.click());
}
function seeScrollElements() {
  const revealElements = body.querySelectorAll(".reveal");
  if (revealElements && revealElements.length > 0) {
    revealElements.forEach((item) => {
      item.setAttribute("style", "transition:none");
      item.classList.add("reveal-visible");
    });
  }
}
function hasDirectContent(item) {
  const langTag = item.closest("[lang]");
  if (!langTag) {
    return false;
  }
  const lang = langTag.getAttribute("lang");
  const clone2 = item.cloneNode(true);
  clone2.querySelectorAll("*").forEach((el) => el.remove());
  return clone2.textContent && sanitizeText(clone2.textContent, lang) !== "";
}
function sanitizeText(txt, locale) {
  if (locale === null) {
    locale = "fr";
  }
  const regexPonctuation = /[.:;,?!{}$()|©'"-\/]/g;
  const regexError = /<span\s+class=["']checkA11YSpan["'][^>]*>.*?<\/span>/gs;
  const regexBreakLine = /\n|\r/g;
  const regexDoubleSpace = /\s+/g;
  return txt === null ? "" : txt.toLowerCase().toLocaleLowerCase(locale).replaceAll(regexError, "").replaceAll(regexBreakLine, " ").replaceAll(regexPonctuation, " ").replaceAll(regexDoubleSpace, " ").trim();
}
function cleanNode(item) {
  const clone2 = item.cloneNode(true);
  if (clone2.textContent.trim() !== "" && clone2.nodeName !== "#text") {
    const spanToRemove = clone2.querySelectorAll(".checkA11YSpan");
    spanToRemove.forEach((el) => el.remove());
  }
  return clone2;
}
function isUpperCase(txt) {
  return txt === txt.toUpperCase();
}
function getClosestLang(node) {
  return node && node.closest("[lang]") ? node.closest("[lang]").getAttribute("lang") : "fr";
}
function isAtLeastOneItemVisible(items) {
  const itemsVisible = Array.from(items).filter((item) => isItemVisible(item));
  return itemsVisible.length > 0;
}
function isItemVisible(item) {
  return item.checkVisibility({
    opacityProperty: true,
    visibilityProperty: true
  });
}
function isItemFullyVisible(item) {
  if (isItemVisible(item)) {
    for (let el = item; el && el !== document.body; el = el.parentNode) {
      const style = window.getComputedStyle(el);
      if (style.width === "0" && style.height === "0") {
        return false;
      } else if (item == el && item.nodeName != "BR" && style.position != "absolute" && style.position != "fixed" && item.offsetWidth === 0 && item.offsetHeight === 0) {
        return false;
      }
    }
    return true;
  }
  return false;
}
function isItemSROnly(item) {
  let isSROnly = false;
  if (isItemVisible(item)) {
    while (item.parentElement && item.nodeName !== "HTML" && !isSROnly) {
      const style = window.getComputedStyle(item);
      if (style.clip === "rect(1px, 1px, 1px, 1px)" && style.overflow === "hidden") {
        isSROnly = true;
      }
      item = item.parentElement;
    }
  }
  return isSROnly;
}
function hasVisibleContent(item) {
  const langTag = item.closest("[lang]");
  if (!item.innerText || !langTag || sanitizeText(
    item.innerText,
    langTag.getAttribute("lang")
  ) === "") {
    return false;
  }
  const itemsVisible = Array.from(item.querySelectorAll("*")).filter(
    (el) => isItemFullyVisible(el) && el.innerText !== ""
  );
  return itemsVisible.length > 0;
}
function hasPseudoElement(item) {
  const before = window.getComputedStyle(item, "before");
  const after = window.getComputedStyle(item, "after");
  return before.getPropertyValue("content") != "none" && before.getPropertyValue("background-color") !== "rgba(0, 0, 0, 0)" && before.getPropertyValue("background-color") !== "rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box" || after.getPropertyValue("content") != "none" && after.getPropertyValue("background-color") !== "rgba(0, 0, 0, 0)" && after.getPropertyValue("background-color") !== "rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box";
}
function contrastLuminance(color) {
  const RedGammaCompressedLinearRatio = 0.2126;
  const GreenGammaCompressedLinearRatio = 0.7152;
  const BlueGammaCompressedLinearRatio = 0.0722;
  const SlopeOfLinearPortion = 12.92;
  const DiscontinuityCurveFactor = 0.04045;
  const curveSmoothingVariable = 0.055;
  const rgbArray = color.indexOf("#") >= 0 ? hexToRgbObject(color) : rgbToRgbObject(color);
  const linearRgbArray = [rgbArray.r, rgbArray.g, rgbArray.b].map(function(value) {
    value /= 255;
    return value <= DiscontinuityCurveFactor ? value / SlopeOfLinearPortion : Math.pow(
      (value + curveSmoothingVariable) / (1 + curveSmoothingVariable),
      2.4
    );
  });
  return linearRgbArray[0] * RedGammaCompressedLinearRatio + linearRgbArray[1] * GreenGammaCompressedLinearRatio + linearRgbArray[2] * BlueGammaCompressedLinearRatio;
}
function checkContrastRatio(lum1, lum2) {
  if (lum1 < 0 || lum2 < 0) {
    return 0;
  }
  const contrastSmoothingVariable = 0.05;
  const contrastRatio = 1 / (lum1 > lum2 ? (lum2 + contrastSmoothingVariable) / (lum1 + contrastSmoothingVariable) : (lum1 + contrastSmoothingVariable) / (lum2 + contrastSmoothingVariable));
  return contrastRatio;
}
function getInheritedBackgroundColor(item) {
  const backgroundColor = window.getComputedStyle(item).getPropertyValue("background-color");
  if (backgroundColor !== "rgba(0, 0, 0, 0)") {
    return backgroundColor;
  }
  if (!item.parentElement) {
    return "rgba(0, 0, 0, 0)";
  }
  return getInheritedBackgroundColor(item.parentElement);
}
function hexToRgbObject(hex) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(r, g, b) {
    return r + r + g + g + b + b;
  });
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: -1, g: -1, b: -1 };
}
function rgbToRgbObject(rgbStr) {
  const rgbFormat = rgbStr.match(/\d+/g);
  if (rgbFormat) {
    const [r, g, b] = rgbFormat.map(Number);
    return { r, g, b };
  } else {
    return { r: -1, g: -1, b: -1 };
  }
}
function isTrinomeColorTooLow(nia01b_color1, nia01b_color2, nia01b_color3) {
  if (nia01b_color2 !== nia01b_color3) {
    const nia01b_color1luminance = contrastLuminance(nia01b_color1);
    const nia01b_color2luminance = contrastLuminance(nia01b_color2);
    const nia01b_color3luminance = contrastLuminance(nia01b_color3);
    const nia01b_ratio12_inv = checkContrastRatio(
      nia01b_color1luminance,
      nia01b_color2luminance
    );
    const nia01b_ratio13_inv = checkContrastRatio(
      nia01b_color1luminance,
      nia01b_color3luminance
    );
    const nia01b_ratio23_inv = checkContrastRatio(
      nia01b_color2luminance,
      nia01b_color3luminance
    );
    if (filter.debug_flag && nia01b_ratio12_inv < 3)
      console.log(
        "01B - FAIL 3.3.3 Standard ratio : " + nia01b_ratio12_inv + " (" + nia01b_color1 + " vs " + nia01b_color2 + ")"
      );
    else if (filter.debug_flag && nia01b_ratio13_inv < 3)
      console.log(
        "01B - FAIL 3.3.3 Standard ratio : " + nia01b_ratio13_inv + " (" + nia01b_color1 + " vs " + nia01b_color3 + ")"
      );
    else if (filter.debug_flag && nia01b_ratio23_inv < 3)
      console.log(
        "01B - FAIL 3.3.3 Standard ratio : " + nia01b_ratio23_inv + " (" + nia01b_color2 + " vs " + nia01b_color3 + ")"
      );
    return nia01b_ratio12_inv < 3 && nia01b_ratio13_inv < 3 && nia01b_ratio23_inv < 3;
  } else {
    const nia01b_color1luminance = contrastLuminance(nia01b_color1);
    const nia01b_color2luminance = contrastLuminance(nia01b_color2);
    const nia01b_ratio12_inv = checkContrastRatio(
      nia01b_color1luminance,
      nia01b_color2luminance
    );
    if (filter.debug_flag && nia01b_ratio12_inv < 3)
      console.log(
        "01B - FAIL 3.3.3 Standard ratio : " + nia01b_ratio12_inv + " (" + nia01b_color1 + " vs " + nia01b_color2 + ")"
      );
    return nia01b_ratio12_inv < 3;
  }
}
function getInheritedPosition(item) {
  const position = window.getComputedStyle(item).getPropertyValue("position");
  if (position === "absolute" || position === "fixed") {
    return position;
  }
  if (!item.parentElement) {
    return "relative";
  }
  return getInheritedPosition(item.parentElement);
}
function setItemsOutline(items, color, classname, nomenclature) {
  const visibleItems = [...items].filter(
    (item) => isItemVisible(item)
  );
  if (filter.debug_flag) {
    console.log(
      `[ ${classname} ] Problème detecté sur ${items.length} éléments (dont ${visibleItems.length} visible)`
    );
  }
  visibleItems.forEach(
    (item) => setItemOutline(item, color, classname, nomenclature)
  );
}
function setItemOutline(item, color, classname, nomenclature) {
  if (filter.debug_flag) {
    console.log(item);
  }
  item.classList.add("checkA11YOutline__" + color, classname);
  const spanLabel = document.createElement("span");
  spanLabel.classList.add("checkA11YSpan", "checkA11YSpan__" + color);
  spanLabel.textContent = nomenclature;
  if (item.nodeName == "LI") {
    item.prepend(spanLabel);
  } else {
    item.before(spanLabel);
  }
}
const NcColors = ["red", "orange"];
function testChecker(nomenclature, destination, category, color, msg, test) {
  if (NcColors.includes(color) || !filter.only_nc) {
    if (test(color, destination, nomenclature)) {
      if (destination && destination !== "") {
        setItemToResultList(
          category,
          `<li><a href='#' data-destination='${destination}' class='result-focus label-${color}'>${nomenclature}
                     <span class='at' lang='en'>Color ${color}</span></a><span class='result-msg'>${msg}</span></li>`
        );
      } else {
        setItemToResultList(
          category,
          `<li><span class='result-focus label-${color}'>${nomenclature}
                         <span class='at' lang='en'>Color ${color}</span></span><span class='result-msg'>${msg}</span></li>`
        );
      }
    }
  }
}
function checkIfOneVisibleItemMatch(query, color, destination, nomenclature) {
  const nodes = document.querySelectorAll(query);
  let flag = false;
  if (nodes && nodes.length > 0) {
    if (isAtLeastOneItemVisible(nodes)) {
      flag = true;
      setItemsOutline(nodes, color, destination, nomenclature);
    }
  }
  return flag;
}
function checkIfOneItemMeetsTheCondition(query, color, destination, nomenclature, condition) {
  const nodes = document.querySelectorAll(query);
  let flag = false;
  for (let i = 0; i < nodes.length; i++) {
    if (condition(nodes[i])) {
      setItemOutline(nodes[i], color, destination, nomenclature);
      flag = true;
    }
  }
  return flag;
}
function checkIfQueryMeetsTheCondition(query, color, destination, nomenclature, condition, setOutline) {
  const nodes = document.querySelectorAll(query);
  let flag = false;
  if (condition(nodes)) {
    if (setOutline) {
      setItemsOutline(nodes, color, destination, nomenclature);
    }
    flag = true;
  }
  return flag;
}
function checkIfNoneVisibleItemMatch(query) {
  const nodes = document.querySelectorAll(query);
  let flag = true;
  if (nodes && nodes.length > 0) {
    if (query.startsWith("head") || isAtLeastOneItemVisible(nodes)) {
      flag = false;
    }
  }
  return flag;
}
function checkIfNoneItemMatch(query) {
  const nodes = document.querySelectorAll(query);
  return !Boolean(nodes && nodes.length > 0);
}
function check_test_01a() {
  if (!filter.only_redactor) {
    testChecker(
      "01-A",
      "nia01a1",
      "dev",
      "orange",
      "Présence d'éléments textuels insuffisamment contrasté",
      test01a1
    );
    if (!filter.only_nc) {
      testChecker(
        "01-A",
        "nia01a2",
        "man",
        "yellow",
        "Vérifier le contraste de certains éléments textuels",
        test01a2
      );
    }
  }
}
function test01a1(color, destination, nomenclature) {
  const query = "p, span:not(.checkA11YSpan), li, strong, h1, h2, h3, h4, h5, small, a:not([disabled]), button:not([disabled]), blockquote, q, dd, dt, label";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test01a1
  );
}
function condition_test01a1(node) {
  let flag = false;
  if (isItemVisible(node) && !isItemSROnly(node) && hasVisibleContent(node) && hasDirectContent(node)) {
    const nia01a_position = getInheritedPosition(node);
    const nia01a_pseudo = hasPseudoElement(node);
    const nia01a_textshadow = window.getComputedStyle(node).getPropertyValue("text-shadow");
    if (nia01a_position !== "absolute" && nia01a_position !== "fixed" && nia01a_textshadow === "none" && !nia01a_pseudo) {
      flag = isContrastTooLow(node);
      if (flag === false && (node.tagName === "A" || node.tagName === "BUTTON")) {
        node?.focus();
        flag = isContrastTooLow(node);
      }
    }
  }
  return flag;
}
function test01a2(color, destination, nomenclature) {
  const query = "p, span:not(.checkA11YSpan), li, strong, h1, h2, h3, h4, h5, small, a:not([disabled]), button:not([disabled]), blockquote, q, dd, dt, label";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test01a2
  );
}
function condition_test01a2(node) {
  let flag = false;
  if (isItemVisible(node) && !isItemSROnly(node) && hasVisibleContent(node) && hasDirectContent(node)) {
    const nia01a_position = getInheritedPosition(node);
    const nia01a_pseudo = hasPseudoElement(node);
    const nia01a_textshadow = window.getComputedStyle(node).getPropertyValue("text-shadow");
    if (nia01a_position === "absolute" || nia01a_position === "fixed" || nia01a_textshadow !== "none" || nia01a_pseudo) {
      flag = isContrastTooLow(node);
      if (flag === false && (node.tagName === "A" || node.tagName === "BUTTON")) {
        node?.focus();
        flag = isContrastTooLow(node);
      }
    }
  }
  return flag;
}
function isBold(item) {
  const nia01a_bold = window.getComputedStyle(item).getPropertyValue("font-weight");
  if (nia01a_bold === "bold" || nia01a_bold === "bolder" || nia01a_bold === "500" || nia01a_bold === "600" || nia01a_bold === "700" || nia01a_bold === "800" || nia01a_bold === "900") {
    return true;
  } else return false;
}
function getFontSize(item) {
  return parseFloat(
    window.getComputedStyle(item).getPropertyValue("font-size")
  );
}
function isContrastTooLow(node) {
  let flag = false;
  const nia01a_color1 = window.getComputedStyle(node).getPropertyValue("color");
  const nia01a_color2 = getInheritedBackgroundColor(node);
  const nia01a_color1luminance = contrastLuminance(nia01a_color1);
  const nia01a_color2luminance = contrastLuminance(nia01a_color2);
  const nia01a_ratio_inv = checkContrastRatio(
    nia01a_color1luminance,
    nia01a_color2luminance
  );
  if (nia01a_ratio_inv < 4.5) {
    const nia01a_large = getFontSize(node);
    const nia01a_isbold = isBold(node);
    if (nia01a_isbold === false && nia01a_large < 24 && nia01a_ratio_inv < 4.5) {
      if (filter.debug_flag) {
        console.log(
          "01A - FAIL 3.2.1 Standard ratio : " + nia01a_ratio_inv + " (" + nia01a_color1 + " vs " + nia01a_color2 + ")"
        );
      }
      flag = true;
    } else if (nia01a_isbold === true && nia01a_large < 18.5 && nia01a_ratio_inv < 4.5) {
      if (filter.debug_flag) {
        console.log(
          "01A - FAIL 3.2.2 Standard ratio : " + nia01a_ratio_inv + " (" + nia01a_color1 + " vs " + nia01a_color2 + ")"
        );
      }
      flag = true;
    } else if (nia01a_isbold === false && nia01a_large >= 24 && nia01a_ratio_inv < 3) {
      if (filter.debug_flag) {
        console.log(
          "01A - FAIL 3.2.3 Standard ratio : " + nia01a_ratio_inv + " (" + nia01a_color1 + " vs " + nia01a_color2 + ")"
        );
      }
      flag = true;
    } else if (nia01a_isbold === true && nia01a_large >= 18.5 && nia01a_ratio_inv < 3) {
      if (filter.debug_flag) {
        console.log(
          "01A - FAIL 3.2.4 Standard ratio : " + nia01a_ratio_inv + " (" + nia01a_color1 + " vs " + nia01a_color2 + ")"
        );
      }
      flag = true;
    }
  }
  return flag;
}
function check_test_01b() {
  if (!filter.only_redactor && !filter.only_nc) {
    testChecker(
      "01-B",
      "nia01b1",
      "man",
      "yellow",
      "Présence d'élément graphique avec background transparent sur un élément en position absolute - Contraste à vérifier manuellement",
      test01b1
    );
    testChecker(
      "01-B",
      "nia01b2",
      "man",
      "yellow",
      "Présence d'élément graphique avec background transparent - Contraste à vérifier",
      test01b2
    );
    testChecker(
      "01-B",
      "nia01b3",
      "man",
      "yellow",
      "Présence d'élément graphique insuffisamment contrasté (bicolor)",
      test01b3
    );
    testChecker(
      "01-B",
      "nia01b4",
      "man",
      "yellow",
      "Présence d'élément graphique insuffisamment contrasté (tricolor)",
      test01b4
    );
    testChecker(
      "01-B",
      "nia01b5",
      "man",
      "yellow",
      "Présence d'élément graphique avec background identique au fond de page - Contraste à vérifier manuellement",
      test01b5
    );
    testChecker(
      "01-B",
      "nia01b6",
      "man",
      "yellow",
      "Présence d'élément graphique sur un élément en position absolute - Contraste à vérifier manuellement",
      test01b6
    );
    testChecker(
      "01-B",
      "nia01b7",
      "man",
      "yellow",
      "Présence d'élément graphique avec une ombre portée - Contraste à vérifier manuellement",
      test01b7
    );
  }
}
function test01b1(color, destination, nomenclature) {
  const query = 'input:not([disabled]):not([type="file"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled])';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test01b1
  );
}
function condition_test01b1(node) {
  let flag = false;
  if (isItemVisible(node) && !isItemSROnly(node)) {
    const nia01b_color2 = window.getComputedStyle(node).getPropertyValue("background-color");
    const nia01b_position = window.getComputedStyle(node).getPropertyValue("position");
    if (nia01b_color2 === "rgba(0, 0, 0, 0)" && (nia01b_position === "absolute" || nia01b_position === "fixed")) {
      flag = true;
    }
  }
  return flag;
}
function test01b2(color, destination, nomenclature) {
  const query = 'input:not([disabled]):not([type="file"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled])';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test01b2
  );
}
function condition_test01b2(node) {
  let flag = false;
  const nodeComputedStyle = window.getComputedStyle(node);
  if (isItemVisible(node) && !isItemSROnly(node)) {
    let nia01b_color1 = nodeComputedStyle.getPropertyValue("border-color");
    if (nia01b_color1.length > 20 || nia01b_color1 === "rgba(0, 0, 0, 0)") {
      nia01b_color1 = nodeComputedStyle.getPropertyValue("border-bottom-color");
    }
    const nia01b_color2 = nodeComputedStyle.getPropertyValue("background-color");
    const nia01b_color3 = getInheritedBackgroundColor(
      node.parentElement
    );
    const nia01b_border = nodeComputedStyle.getPropertyValue("border-width");
    const nia01b_position = nodeComputedStyle.getPropertyValue("position");
    if (nia01b_position !== "absolute" && nia01b_position !== "fixed" && (nia01b_color2 === "rgba(0, 0, 0, 0)" && nia01b_color3 === "rgba(0, 0, 0, 0)" || nia01b_color1 === "rgba(0, 0, 0, 0)" && nia01b_color2 === "rgba(0, 0, 0, 0)" || nia01b_border === "0px" && nia01b_color2 === "rgba(0, 0, 0, 0)")) {
      flag = true;
    }
  }
  return flag;
}
function test01b3(color, destination, nomenclature) {
  const query = 'input:not([disabled]):not([type="file"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled])';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test01b3
  );
}
function condition_test01b3(node) {
  let flag = false;
  const nodeComputedStyle = window.getComputedStyle(node);
  if (isItemVisible(node) && !isItemSROnly(node)) {
    let nia01b_color1 = nodeComputedStyle.getPropertyValue("border-color");
    if (nia01b_color1.length > 20 || nia01b_color1 === "rgba(0, 0, 0, 0)") {
      nia01b_color1 = nodeComputedStyle.getPropertyValue("border-bottom-color");
    }
    const nia01b_color2 = nodeComputedStyle.getPropertyValue("background-color");
    const nia01b_color3 = getInheritedBackgroundColor(
      node.parentElement
    );
    const nia01b_border = nodeComputedStyle.getPropertyValue("border-width");
    const nia01b_position = nodeComputedStyle.getPropertyValue("position");
    if (nia01b_position !== "absolute" && nia01b_position !== "fixed" && !(nia01b_color2 === "rgba(0, 0, 0, 0)" && nia01b_color3 === "rgba(0, 0, 0, 0)" || nia01b_color1 === "rgba(0, 0, 0, 0)" && nia01b_color2 === "rgba(0, 0, 0, 0)" || nia01b_border === "0px" && nia01b_color2 === "rgba(0, 0, 0, 0)") && (nia01b_border === "0px" || nia01b_color1 === "rgba(0, 0, 0, 0)")) {
      const nia01b_color2luminance = contrastLuminance(nia01b_color2);
      const nia01b_color3luminance = contrastLuminance(nia01b_color3);
      const nia01b_ratio23_inv = checkContrastRatio(
        nia01b_color2luminance,
        nia01b_color3luminance
      );
      if (nia01b_ratio23_inv < 3) {
        if (filter.debug_flag) {
          console.log(
            "01B - FAIL 3.3.3 Standard ratio : " + nia01b_ratio23_inv + " (" + nia01b_color2 + " vs " + nia01b_color3 + ")"
          );
        }
        flag = true;
      }
    }
  }
  return flag;
}
function test01b4(color, destination, nomenclature) {
  const query = 'input:not([disabled]):not([type="file"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled])';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test01b4
  );
}
function condition_test01b4(node) {
  let flag = false;
  const nodeComputedStyle = window.getComputedStyle(node);
  if (isItemVisible(node) && !isItemSROnly(node)) {
    let nia01b_color1 = nodeComputedStyle.getPropertyValue("border-color");
    if (nia01b_color1.length > 20 || nia01b_color1 === "rgba(0, 0, 0, 0)") {
      nia01b_color1 = nodeComputedStyle.getPropertyValue("border-bottom-color");
    }
    const nia01b_color2 = nodeComputedStyle.getPropertyValue("background-color");
    const nia01b_color3 = getInheritedBackgroundColor(
      node.parentElement
    );
    const nia01b_position = nodeComputedStyle.getPropertyValue("position");
    const nia01b_boxshadow = nodeComputedStyle.getPropertyValue("box-shadow");
    if (nia01b_color1 && nia01b_color2 && nia01b_color3) {
      if (isTrinomeColorTooLow(nia01b_color1, nia01b_color2, nia01b_color3) && nia01b_position !== "absolute" && nia01b_position !== "fixed" && nia01b_boxshadow === "none") {
        flag = true;
      }
    }
  }
  return flag;
}
function test01b5(color, destination, nomenclature) {
  const query = 'input:not([disabled]):not([type="file"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled])';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test01b5
  );
}
function condition_test01b5(node) {
  let flag = false;
  const nodeComputedStyle = window.getComputedStyle(node);
  if (isItemVisible(node) && !isItemSROnly(node)) {
    let nia01b_color1 = nodeComputedStyle.getPropertyValue("border-color");
    if (nia01b_color1.length > 20 || nia01b_color1 === "rgba(0, 0, 0, 0)") {
      nia01b_color1 = nodeComputedStyle.getPropertyValue("border-bottom-color");
    }
    const nia01b_color2 = nodeComputedStyle.getPropertyValue("background-color");
    const nia01b_color3 = getInheritedBackgroundColor(
      node.parentElement
    );
    const nia01b_position = nodeComputedStyle.getPropertyValue("position");
    const nia01b_border = nodeComputedStyle.getPropertyValue("border-width");
    if (nia01b_position !== "absolute" && nia01b_position !== "fixed" && (nia01b_color1 === nia01b_color3 && nia01b_color2 === nia01b_color3 || (nia01b_border === "0px" || nia01b_color1 === "rgba(0, 0, 0, 0)") && nia01b_color2 === nia01b_color3)) {
      flag = true;
    }
  }
  return flag;
}
function test01b6(color, destination, nomenclature) {
  const query = 'input:not([disabled]):not([type="file"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled])';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test01b6
  );
}
function condition_test01b6(node) {
  let flag = false;
  const nodeComputedStyle = window.getComputedStyle(node);
  if (isItemVisible(node) && !isItemSROnly(node)) {
    let nia01b_color1 = nodeComputedStyle.getPropertyValue("border-color");
    if (nia01b_color1.length > 20 || nia01b_color1 === "rgba(0, 0, 0, 0)") {
      nia01b_color1 = nodeComputedStyle.getPropertyValue("border-bottom-color");
    }
    const nia01b_color2 = nodeComputedStyle.getPropertyValue("background-color");
    const nia01b_color3 = getInheritedBackgroundColor(
      node.parentElement
    );
    const nia01b_position = nodeComputedStyle.getPropertyValue("position");
    if (nia01b_color1 && nia01b_color2 && nia01b_color3) {
      if (isTrinomeColorTooLow(nia01b_color1, nia01b_color2, nia01b_color3) && (nia01b_position === "absolute" || nia01b_position === "fixed")) {
        flag = true;
      }
    }
  }
  return flag;
}
function test01b7(color, destination, nomenclature) {
  const query = 'input:not([disabled]):not([type="file"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled])';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test01b7
  );
}
function condition_test01b7(node) {
  let flag = false;
  const nodeComputedStyle = window.getComputedStyle(node);
  if (isItemVisible(node) && !isItemSROnly(node)) {
    let nia01b_color1 = nodeComputedStyle.getPropertyValue("border-color");
    if (nia01b_color1.length > 20 || nia01b_color1 === "rgba(0, 0, 0, 0)") {
      nia01b_color1 = nodeComputedStyle.getPropertyValue("border-bottom-color");
    }
    const nia01b_color2 = nodeComputedStyle.getPropertyValue("background-color");
    const nia01b_color3 = getInheritedBackgroundColor(
      node.parentElement
    );
    const nia01b_boxshadow = nodeComputedStyle.getPropertyValue("box-shadow");
    const nia01b_position = nodeComputedStyle.getPropertyValue("position");
    if (nia01b_color1 && nia01b_color2 && nia01b_color3) {
      if (isTrinomeColorTooLow(nia01b_color1, nia01b_color2, nia01b_color3) && nia01b_position !== "absolute" && nia01b_position !== "fixed" && nia01b_boxshadow !== "none") {
        flag = true;
      }
    }
  }
  return flag;
}
function check_test_01c() {
  const nia01c_btn = document.querySelector(
    'button.anchor[data-destination="#topsearch"][aria-expanded="false"]'
  );
  if (nia01c_btn) {
    nia01c_btn.click();
  }
  if (!filter.only_redactor) {
    testChecker(
      "01-C",
      "nia01c1",
      "dev",
      "orange",
      "Présence d'élément placeholder insuffisament contrasté",
      test01c1
    );
    if (!filter.only_nc) {
      testChecker(
        "01-C",
        "nia01c2",
        "man",
        "yellow",
        "Vérifier si l'élément placeholder est suffisament contrasté",
        test01c2
      );
      testChecker(
        "01-C",
        "nia01c3",
        "man",
        "yellow",
        "Vérifier si l'élément placeholder possède une opacité suffisante",
        test01c3
      );
    }
  }
}
function test01c1(color, destination, nomenclature) {
  const query = "input[placeholder]:not([disabled]), textarea[placeholder]:not([disabled])";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test01c1
  );
}
function condition_test01c1(node) {
  let flag = false;
  if (isItemVisible(node)) {
    const nia01c_color1 = window.getComputedStyle(node, "::placeholder").getPropertyValue("color");
    const nia01c_color2 = getInheritedBackgroundColor(node);
    if (nia01c_color1) {
      const nia01c_color1luminance = contrastLuminance(nia01c_color1);
      const nia01c_color2luminance = contrastLuminance(nia01c_color2);
      const nia01c_ratio_inv = checkContrastRatio(
        nia01c_color1luminance,
        nia01c_color2luminance
      );
      if (nia01c_ratio_inv < 4.5) {
        if (filter.debug_flag)
          console.log(
            "01C - FAIL 3.2.1 Standard ratio : " + nia01c_ratio_inv + " (" + nia01c_color1 + " vs " + nia01c_color2 + ")"
          );
        flag = true;
      }
    }
  }
  return flag;
}
function test01c2(color, destination, nomenclature) {
  const query = "input[placeholder]:not([disabled]), textarea[placeholder]:not([disabled])";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test01c2
  );
}
function condition_test01c2(node) {
  let flag = false;
  if (isItemVisible(node)) {
    const nia01c_color1 = window.getComputedStyle(node, "::placeholder").getPropertyValue("color");
    const nia01c_color2 = getInheritedBackgroundColor(node);
    if (nia01c_color1) {
      const nia01c_color1luminance = contrastLuminance(nia01c_color1);
      const nia01c_color2luminance = contrastLuminance(nia01c_color2);
      const nia01c_ratio_inv = checkContrastRatio(
        nia01c_color1luminance,
        nia01c_color2luminance
      );
      if (nia01c_ratio_inv >= 4.5 && nia01c_color1 === "rgb(0, 0, 0)" && nia01c_color2 !== "rgb(255, 255, 255)") {
        flag = true;
      }
    }
  }
  return flag;
}
function test01c3(color, destination, nomenclature) {
  const query = "input[placeholder]:not([disabled]), textarea[placeholder]:not([disabled])";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test01c3
  );
}
function condition_test01c3(node) {
  let flag = false;
  if (isItemVisible(node)) {
    const nia01c_opacity = window.getComputedStyle(node, "::placeholder").getPropertyValue("opacity");
    if (nia01c_opacity !== "1") {
      flag = true;
    }
  }
  return flag;
}
function check_test_01e() {
  if (!filter.only_redactor) {
    testChecker(
      "01-E",
      "nia01e",
      "man",
      "yellow",
      "Vérifier la présence d'une couleur de replis sur des éléments avec fond en dégradé.",
      test01e
    );
  }
}
function test01e(color, destination, nomenclature) {
  const query = "header, footer, .cmp-section, aside, article";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test01e
  );
}
function condition_test01e(node) {
  return Boolean(
    isItemVisible(node) && window.getComputedStyle(node).getPropertyValue("background-image").indexOf("linear-gradient") >= 0 && window.getComputedStyle(node).getPropertyValue("background-color") == "rgba(0, 0, 0, 0)"
  );
}
function check_test_01f() {
  if (!filter.only_redactor) {
    testChecker(
      "01-F",
      "nia01f1",
      "dev",
      "orange",
      "Absence de déclaration de couleurs sur la balise body",
      test01f1
    );
    testChecker(
      "01-F",
      "nia01f2",
      "dev",
      "orange",
      "Le jeu de couleurs par défaut sur la balise body n'est pas assez contrasté",
      test01f2
    );
    if (!filter.only_nc) {
      testChecker(
        "01-F",
        "nia01f3",
        "dev",
        "yellow",
        "Un ratio de contrast de 7:1 est recommandé pour le texte principal",
        test01f3
      );
    }
  }
}
function test01f1() {
  const nia01f_color = window.getComputedStyle(document.body).getPropertyValue("color");
  const nia01f_bg = window.getComputedStyle(document.body).getPropertyValue("background-color");
  return Boolean(
    nia01f_color === "" || nia01f_color === "rgba(0, 0, 0, 0)" || nia01f_bg === "" || nia01f_bg === "rgba(0, 0, 0, 0)"
  );
}
function test01f2() {
  const nia01f_color = window.getComputedStyle(document.body).getPropertyValue("color");
  const nia01f_bg = window.getComputedStyle(document.body).getPropertyValue("background-color");
  let flag = false;
  if (nia01f_color !== "" && nia01f_color !== "rgba(0, 0, 0, 0)" && nia01f_bg !== "" && nia01f_bg !== "rgba(0, 0, 0, 0)") {
    const nia01f_color_luminance = contrastLuminance(nia01f_color);
    const nia01f_bg_rgb_luminance = contrastLuminance(nia01f_bg);
    const nia01f_ratio_inv = checkContrastRatio(
      nia01f_color_luminance,
      nia01f_bg_rgb_luminance
    );
    if (nia01f_ratio_inv < 4.5) {
      flag = true;
    }
  }
  return flag;
}
function test01f3() {
  let flag = false;
  const nia01f_color = window.getComputedStyle(document.body).getPropertyValue("color");
  const nia01f_bg = window.getComputedStyle(document.body).getPropertyValue("background-color");
  if (nia01f_color !== "" && nia01f_color !== "rgba(0, 0, 0, 0)" && nia01f_bg !== "" && nia01f_bg !== "rgba(0, 0, 0, 0)") {
    const nia01f_color_luminance = contrastLuminance(nia01f_color);
    const nia01f_bg_rgb_luminance = contrastLuminance(nia01f_bg);
    const nia01f_ratio_inv = checkContrastRatio(
      nia01f_color_luminance,
      nia01f_bg_rgb_luminance
    );
    if (nia01f_ratio_inv < 7) {
      flag = true;
    }
  }
  return flag;
}
function check_part_01() {
  if (filter.debug_flag) console.log("01 Couleur");
  check_test_01a();
  check_test_01b();
  check_test_01c();
  check_test_01e();
  check_test_01f();
}
function check_test_02a() {
  testChecker(
    "02-A",
    "nia02a1",
    "nc",
    "red",
    "Présence d'images sans alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-1-1' target='_blank'>RAWeb 1.1.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-image-decorative-est-dotee-dune-alternative-textuelle-appropriee' target='_blank'>Opquast 111</a>]",
    test02a1
  );
  testChecker(
    "02-A",
    "nia02a2",
    "nth",
    "yellow",
    "Présence d'images sans attribut alt [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-1-1' target='_blank'>RAWeb 1.1.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-image-decorative-est-dotee-dune-alternative-textuelle-appropriee' target='_blank'>Opquast 111</a>]",
    test02a2
  );
}
function test02a1(color, destination, nomenclature) {
  const query = '*:not(.ol-overlay-container) > *:not(.ol-overlay-container) >  img:not([alt]):not([aria-label]):not([aria-labelledby]):not([title]), [role="image"]:not([aria-label]):not([aria-labelledby])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test02a2(color, destination, nomenclature) {
  const query = "*:not(.ol-overlay-container) > *:not(.ol-overlay-container) > img:not([alt])";
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_test_02b() {
  testChecker(
    "02-B",
    "nia02b1",
    "nc",
    "red",
    "Absence de certains attributs sur des SVG (aria-hidden=true) [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-4' target='_blank'>RAWeb 1.2.4</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-image-decorative-est-dotee-dune-alternative-textuelle-appropriee' target='_blank'>Opquast 111</a>]",
    test02b1
  );
  testChecker(
    "02-B",
    "nia02b2",
    "nth",
    "yellow",
    "Absence de certains attributs sur des SVG (focusable=false) [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-image-decorative-est-dotee-dune-alternative-textuelle-appropriee' target='_blank'>Opquast 111</a>]",
    test02b2
  );
  testChecker(
    "02-B",
    "nia02b3",
    "nc",
    "red",
    "Les images vectorielle porteuse d'information doivent posséder une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-1-5' target='_blank'>RAWeb 1.1.5</a>]",
    test02b3
  );
  testChecker(
    "02-B",
    "nia02b4",
    "nc",
    "red",
    "Les images vectorielle de décoration ne doivent pas posséder une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-4' target='_blank'>RAWeb 1.2.4</a> - [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-image-decorative-est-dotee-dune-alternative-textuelle-appropriee' target='_blank'>Opquast 111</a>]",
    test02b4
  );
  testChecker(
    "02-B",
    "nia02b5",
    "nc",
    "red",
    "Les images vectorielles de décoration ne doivent pas posséder une alternative textuelle dans des balises 'title' ou 'desc' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-4' target='_blank'>RAWeb 1.2.4</a>]",
    test02b5
  );
}
function test02b1(color, destination, nomenclature) {
  const query = 'svg:not([aria-hidden="true"]):not(.iconset)';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test02b2(color, destination, nomenclature) {
  const query = 'svg:not([focusable="false"]):not(.iconset)';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test02b3(color, destination, nomenclature) {
  const query = 'svg[role="img"]:not([title]):not([aria-labelledby]):not([aria-label])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test02b4(color, destination, nomenclature) {
  const query = 'svg[aria-hidden="true"][aria-label], svg[aria-hidden="true"][aria-labelledby]';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test02b5(color, destination, nomenclature) {
  const query = 'svg[aria-hidden="true"] title, svg[aria-hidden="true"] desc';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test02b5
  );
}
function condition_test02b5(node) {
  return Boolean(
    node.hasAttribute("title") && node.getAttribute("title").length > 0 || node.hasAttribute("desc") && node.getAttribute("desc").length > 0
  );
}
function check_test_02c() {
  if (!filter.only_redactor && pageSettings.isAEM) {
    testChecker(
      "02-C",
      "nia02c",
      "dev",
      "red",
      "Présence d'image de search-logic sans attribut alt vide",
      test02c
    );
  }
}
function test02c(color, destination, nomenclature) {
  const query = '.cmp-focus img:not([alt=""])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_test_02d() {
  if (!filter.only_redactor && pageSettings.isAEM) {
    testChecker(
      "02-D",
      "nia02d",
      "dev",
      "orange",
      "Présence d'un caption non lié correctement à son image",
      test02d
    );
  }
}
function test02d(color, destination, nomenclature) {
  const query = '.cmp-image[data-cmp-hook-image="imageV3"] .cmp-image__title';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_test_02e() {
  if (!filter.only_redactor && pageSettings.isAEM) {
    testChecker(
      "02-E",
      "nia02e",
      "dev",
      "orange",
      "Les captions des images ne sont pas correctement restitué, il manque un attribut aria-label sur la balise figure",
      test02e
    );
  }
}
function test02e(color, destination, nomenclature) {
  const query = 'figure[data-cmp-hook-image="figure"]:not([aria-label]) figcaption';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_test_02f() {
  if (!filter.only_redactor) {
    testChecker(
      "02-F",
      "nia02f1",
      "nc",
      "red",
      "Les zones d'image réactive porteuse d'information doivent avoir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-1-2' target='_blank'>RAWeb 1.1.2</a>]",
      test02f1
    );
    testChecker(
      "02-F",
      "nia02f2",
      "nc",
      "red",
      "Les boutons de type image (balise input avec attribut type=image doivent avoir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-1-3' target='_blank'>RAWeb 1.1.3</a>]",
      test02f2
    );
    testChecker(
      "02-F",
      "nia02f3",
      "nc",
      "red",
      "Les images objects porteuses d'information doivent avoir une alternative textuelle - à vérifier manuellement la présence d'un mécanisme de remplacement [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-1-6' target='_blank'>RAWeb 1.1.6</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-image-porteuse-dinformation-est-dotee-dune-alternative-textuelle-appropriee' target='_blank'>Opquast 113</a>]",
      test02f3
    );
    testChecker(
      "02-F",
      "nia02f4",
      "nc",
      "red",
      "Les images embarquée porteuses d'information doivent avoir une alternative textuelle - à vérifier manuellement la présence d'un mécanisme de remplacement [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-1-7' target='_blank'>RAWeb 1.1.7</a>]",
      test02f4
    );
    testChecker(
      "02-F",
      "nia02f5",
      "nc",
      "red",
      "Les images bitmap (balise canvas) porteuses d'information doivent avoir une alternative textuelle - à vérifier manuellement la présence d'un mécanisme de remplacement [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-1-8' target='_blank'>RAWeb 1.1.8</a>]",
      test02f5
    );
  }
}
function test02f1(color, destination, nomenclature) {
  const query = "area:not([aria-label]):not([alt])";
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test02f2(color, destination, nomenclature) {
  const query = 'input[type="image"]:not([alt]):not([aria-label]):not([aria-labelledby]):not([title])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test02f3(color, destination, nomenclature) {
  const query = 'object[type^="image/"]:not([role="img"]):not([aria-label]):not([aria-labelledby]):not([title])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test02f4(color, destination, nomenclature) {
  const query = 'embed[type^="image/"]:not([role="img"]):not([aria-label]):not([aria-labelledby]):not([title])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test02f5(color, destination, nomenclature) {
  const query = 'canvas[type^="image/"]:not([role="img"]):not([aria-label]):not([aria-labelledby])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_test_02g() {
  testChecker(
    "02-G",
    "nia02g1",
    "nc",
    "red",
    "Les images de décoration ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-1' target='_blank'>RAWeb 1.2.1</a>]",
    test02g1
  );
  if (!filter.only_redactor) {
    testChecker(
      "02-G",
      "nia02g2",
      "nc",
      "red",
      "Les zone non cliquable de décoration ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-2' target='_blank'>RAWeb 1.2.2</a>]",
      test02g2
    );
    testChecker(
      "02-G",
      "nia02g3",
      "nc",
      "red",
      "Les images object de décoration ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-3' target='_blank'>RAWeb 1.2.3</a>]",
      test02g3
    );
    testChecker(
      "02-G",
      "nia02g4",
      "nc",
      "red",
      "Les images bitmap de décoration (canvas) ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-5' target='_blank'>RAWeb 1.2.5</a>]",
      test02g4
    );
    testChecker(
      "02-G",
      "nia02g5",
      "nc",
      "red",
      "Les images embarquées de décoration ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-6' target='_blank'>RAWeb 1.2.6</a>]",
      test02g5
    );
    testChecker(
      "02-G",
      "nia02g6",
      "nc",
      "red",
      "Les images object de décoration ne doivent pas avoir de contenu alternatif présent entre ses balises [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-3' target='_blank'>RAWeb 1.2.3</a>]",
      test02g6
    );
    testChecker(
      "02-G",
      "nia02g7",
      "nc",
      "red",
      "Les images bitmap de décoration (canvas) ne doivent pas avoir de contenu alternatif présent entre ses balises [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-3' target='_blank'>RAWeb 1.2.3</a>]",
      test02g7
    );
  }
}
function test02g1(color, destination, nomenclature) {
  const query = 'img:where([alt=""],[aria-hidden="true"],[role="presentation"],[role="none"]):where([aria-label][aria-labelledby][title])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test02g2(color, destination, nomenclature) {
  const query = 'area:not([href]):where([alt=""],[aria-hidden="true"],[role="presentation"],[role="none"]):where([aria-label],[aria-labelledby],[title])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test02g3(color, destination, nomenclature) {
  const query = 'object[type^="image/"][aria-hidden="true"]:where([aria-label],[aria-labelledby],[title])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test02g4(color, destination, nomenclature) {
  const query = 'canvas[aria-hidden="true"]:where([aria-label],[aria-labelledby],[title])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test02g5(color, destination, nomenclature) {
  const query = 'embed[type^="image/"][aria-hidden="true"]:where([aria-label],[aria-labelledby],[title])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test02g6(color, destination, nomenclature) {
  const query = 'object[type^="image/"][aria-hidden="true"]';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test02g6
  );
}
function condition_test02g6(node) {
  return Boolean(isItemVisible(node) && node.textContent.length > 0);
}
function test02g7(color, destination, nomenclature) {
  const query = 'canvas[aria-hidden="true"]';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test02g7
  );
}
function condition_test02g7(node) {
  return Boolean(isItemVisible(node) && node.textContent.length > 0);
}
function check_test_02h() {
  testChecker(
    "02-H",
    "nia02h1",
    "nc",
    "red",
    "Problème de référence introuvable sur un attribut aria-labelledby",
    test02h1
  );
  if (!filter.only_nc) {
    testChecker(
      "02-H",
      "nia02h2",
      "nth",
      "yellow",
      "Présence d'alternative textuelle trop longue [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-3-9' target='_blank'>RAWeb 1.3.9</a>]",
      test02h2
    );
  }
}
function test02h1(color, destination, nomenclature) {
  const query = ':where(img,svg,canvas,embed[type^="image/"],object[type^="image/"]):where([alt],[aria-label],[aria-labelledby],[title]):not([aria-hidden="true"]):not([role="presentation"]):not([role="none"])';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test02h1
  );
}
function condition_test02h1(node) {
  let flag = false;
  if (node.hasAttribute("aria-labelledby")) {
    const nia02h_label = document.querySelectorAll(
      "[id='" + node.getAttribute("aria-labelledby") + "']"
    );
    if (!nia02h_label || nia02h_label.length !== 1) {
      flag = true;
    }
  }
  return flag;
}
function test02h2(color, destination, nomenclature) {
  const query = ':where(img,svg,canvas,embed[type^="image/"],object[type^="image/"]):where([alt],[aria-label],[aria-labelledby],[title]):not([aria-hidden="true"]):not([role="presentation"]):not([role="none"])';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test02h2
  );
}
function condition_test02h2(node) {
  let flag = false;
  const nia02h_lang = node && node.closest("[lang]") ? node.closest("[lang]").getAttribute("lang") : null;
  if (node.hasAttribute("aria-labelledby")) {
    const nia02h_label = document.querySelectorAll(
      "[id='" + node.getAttribute("aria-labelledby") + "']"
    );
    if (nia02h_label && nia02h_label.length !== 1 && (sanitizeText(cleanNode(nia02h_label[0]).textContent, nia02h_lang).length > 150 || node.hasAttribute("aria-label") && sanitizeText(node.getAttribute("aria-label"), nia02h_lang).length > 150 || node.hasAttribute("alt") && sanitizeText(node.getAttribute("alt"), nia02h_lang).length > 150 || node.hasAttribute("title") && sanitizeText(node.getAttribute("title"), nia02h_lang).length > 150)) {
      flag = true;
    }
  }
  return flag;
}
function check_test_02i() {
  testChecker(
    "02-I",
    "nia02i",
    "nth",
    "yellow",
    "Présence d'image-lien avec une alternative textuelle non pertinente [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-6-1-5' target='_blank'>RAWeb 6.1.5</a>, <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-image-lien-est-dotee-dune-alternative-textuelle-appropriee' target='_blank'> Opquast 112</a>]",
    test02i
  );
}
function test02i(color, destination, nomenclature) {
  const query = 'a:not(.blocklink):not([role="button"]):has(> img),a:not(.blocklink):not([role="button"]):has(> svg)';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test02i
  );
}
function condition_test02i(node) {
  return Boolean(
    isItemVisible(node) && node.childElementCount === 1 && (node.getElementsByTagName("img")[0] !== void 0 && node.getElementsByTagName("img")[0].getAttribute("alt") === "" || node.getElementsByTagName("svg")[0] !== void 0)
  );
}
function check_test_02j() {
  if (!filter.only_nc && pageSettings.isAEM) {
    testChecker(
      "02-J",
      "nia02j",
      "nth",
      "yellow",
      "Présence d'images redimentionnées côté Client [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-vignettes-et-apercus-ne-sont-pas-des-images-de-taille-superieure-redimensionnees-cote-client' target='_blank'>Opquast 114</a>]",
      test02j
    );
  }
}
function test02j(color, destination, nomenclature) {
  const query = '*:not(.feed-item-content > p):not(.feed-item-header):not(.ol-full-screen-false) > img:not([src$=".svg"])';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test02j
  );
}
function condition_test02j(node) {
  let nia02j_flag = false;
  let nia02j_ratio_max = 3.5;
  let nia02j_ratio_min = 0.5;
  if (isItemVisible(node)) {
    nia02j_ratio_max = 3.5;
    if (Boolean(node.closest(".search-result")) || Boolean(node.closest(".cmp-focus"))) {
      nia02j_ratio_max = 5;
      if (filter.debug_flag)
        console.log(nia02j_ratio_max + " " + node.getAttribute("src"));
    }
    const nia02j_css_h = node.height;
    const nia02j_css_w = node.width;
    const nia02j_html_h = Number(node.getAttribute("height"));
    const nia02j_html_w = Number(node.getAttribute("width"));
    const nia02j_natural_h = node.naturalHeight;
    const nia02j_natural_w = node.naturalWidth;
    if (nia02j_html_h && (Math.abs(nia02j_html_h / nia02j_css_h) < nia02j_ratio_min || Math.abs(nia02j_html_h / nia02j_css_h) > nia02j_ratio_max)) {
      if (filter.debug_flag)
        console.log("Html Height : " + nia02j_html_h + " vs " + nia02j_css_h);
      nia02j_flag = true;
    } else if (nia02j_html_w && (Math.abs(nia02j_html_w / nia02j_css_w) < nia02j_ratio_min || Math.abs(nia02j_html_w / nia02j_css_w) > nia02j_ratio_max)) {
      if (filter.debug_flag)
        console.log("Html Width : " + nia02j_html_w + " vs " + nia02j_css_w);
      nia02j_flag = true;
    } else if ((Math.abs(nia02j_natural_h / nia02j_css_h) < nia02j_ratio_min || Math.abs(nia02j_natural_h / nia02j_css_h) > nia02j_ratio_max) && nia02j_natural_h > 1) {
      if (filter.debug_flag)
        console.log(
          "Natural Height : " + nia02j_natural_h + " vs " + nia02j_css_h
        );
      nia02j_flag = true;
    } else if ((Math.abs(nia02j_natural_w / nia02j_css_w) < nia02j_ratio_min || Math.abs(nia02j_natural_w / nia02j_css_w) > nia02j_ratio_max) && nia02j_natural_w > 1) {
      if (filter.debug_flag)
        console.log(
          "Natural Width : " + nia02j_natural_w + " vs " + nia02j_css_w
        );
      nia02j_flag = true;
    }
  }
  return nia02j_flag;
}
function check_part_02() {
  if (filter.debug_flag) console.log("02 Images");
  check_test_02a();
  check_test_02b();
  check_test_02c();
  check_test_02d();
  check_test_02e();
  check_test_02f();
  check_test_02g();
  check_test_02h();
  check_test_02i();
  check_test_02j();
}
function check_test_03a() {
  if (!filter.only_redactor) {
    testChecker(
      "03-A",
      "nia03a",
      "nth",
      "yellow",
      "Vérifier la présence de suffixe sur les liens externes (ou problème de traduction du suffixe) [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/lutilisateur-est-averti-des-ouvertures-de-nouvelles-fenetres' target='_blank'>Opquast 141</a>]",
      test03a
    );
  }
}
function test03a(color, destination, nomenclature) {
  const query = 'html[lang="fr"] a[target="_blank"]:not([title$="- Nouvelle fenêtre"]):not([title$="- Nouvelle fenêtre (Pdf)"]):not(.mapboxgl-ctrl-logo):not(.blocklink), html[lang="fr"] a[title$="- Nouvelle fenêtre"]:not([target="_blank"]), html[lang="en"] a[target="_blank"]:not([title$="- New window"]):not([title$="- New window (Pdf)"]):not(.mapboxgl-ctrl-logo):not(.blocklink),html[lang="en"] a[title$="- New window"]:not([target="_blank"]), html[lang="de"] a[target="_blank"]:not([title$="- Neues Fenster"]):not([title$="- Neues Fenster (Pdf)"]):not(.mapboxgl-ctrl-logo):not(.blocklink),html[lang="de"] a[title$="- Neues Fenster"]:not([target="_blank"]),html[lang="lb"] a[target="_blank"]:not([title$="- Nei Fënster"]):not([title$="- Nei Fënster (Pdf)"]):not(.mapboxgl-ctrl-logo):not(.blocklink),html[lang="lb"] a[title$="- Nei Fënster"]:not([target="_blank"])';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test03a
  );
}
function condition_test03a(node) {
  return Boolean(
    isItemVisible(node) && (!node.hasAttribute("title") || node.closest("[lang]") && node.closest("[lang]").getAttribute("lang") === "en" && !node.getAttribute("title").endsWith("- New window") || node.closest("[lang]") && node.closest("[lang]").getAttribute("lang") === "fr" && !node.getAttribute("title").endsWith("- Nouvelle fenêtre") || node.closest("[lang]") && node.closest("[lang]").getAttribute("lang") === "de" && !node.getAttribute("title").endsWith("- Neues Fenster") || node.closest("[lang]") && node.closest("[lang]").getAttribute("lang") === "lb" && !node.getAttribute("title").endsWith("- Nei Fënster"))
  );
}
function check_test_03b() {
  testChecker(
    "03-B",
    "nia03b",
    "nc",
    "red",
    "Vérifier qu'il n'y a pas de lien avec un titre non pertinant [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-6.1.1' target='_blank'>RAWeb 6.1.1</a>]",
    test03b
  );
}
function test03b(color, destination, nomenclature) {
  const query = 'a[title=" "],a[title="Nouvelle fenêtre"],a[title="- Nouvelle fenêtre"],a[title$="Nouvelle fenêtre - Nouvelle fenêtre"], a[title="   - Nouvelle fenêtre"]';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_test_03c() {
  if (!filter.only_redactor) {
    testChecker(
      "03-C",
      "nia03c",
      "nc",
      "orange",
      "Présence du suffixe 'Nouvelle fenêtre' sur une page non rédigée en français (de même pour les autres langues)",
      test03c
    );
  }
}
function test03c(color, destination, nomenclature) {
  const query = 'html:not([lang="fr"]) .cmp-section__content:not([lang="fr"]) *:not(.book-download) > a[title$="- Nouvelle fenêtre"]:not([lang="fr"]), html:not([lang="en"]) .cmp-section__content:not([lang="en"]) *:not(.book-download) > a[title$="- New window"]:not([lang="en"]), html:not([lang="de"]) .cmp-section__content:not([lang="de"]) *:not(.book-download) > a[title$="- Neues Fenster"]:not([lang="de"]), html:not([lang="lb"]) .cmp-section__content:not([lang="lb"]) *:not(.book-download) > a[title$="- Nei Fënster"]:not([lang="lb"])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_test_03d() {
  if (!filter.only_redactor) {
    testChecker(
      "03-D",
      "nia03d",
      "nc",
      "red",
      "Présence d'un conflit dans les attributs des liens",
      test03d
    );
  }
}
function test03d(color, destination, nomenclature) {
  const query = "a[aria-label][aria-labelledby]";
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_test_03e() {
  testChecker(
    "03-E",
    "nia03e",
    "nc",
    "red",
    "Présence de liens dont l'attribut title ne reprend pas le contenu textuel [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-6-1-5' target='_blank'>RAWeb 6.1.5</a>]",
    test03e
  );
}
function test03e(color, destination, nomenclature) {
  const query = "a[title]";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test03e
  );
}
function condition_test03e(node) {
  let nia03e_flag = false;
  if (isItemVisible(node)) {
    const nia03e_lang = node && node.closest("[lang]") ? node.closest("[lang]").getAttribute("lang") : null;
    const nia03e_title = sanitizeText(node.getAttribute("title"), nia03e_lang);
    const nia03e_innerText = cleanNode(node).innerText;
    const nia03e_content = sanitizeText(nia03e_innerText, nia03e_lang);
    if (nia03e_title !== "" && !nia03e_title.includes(nia03e_content) && !nia03e_title.includes(nia03e_content.replace(/(pdf)([1-9])/, "$1 $2"))) {
      if (filter.debug_flag) {
        console.log(
          "%cERROR",
          "font-weight:700;color:darkred",
          "[" + nia03e_title + "] VS [" + nia03e_content + "] "
        );
      }
      nia03e_flag = true;
    }
  }
  return nia03e_flag;
}
function check_test_03f() {
  testChecker(
    "03-F",
    "nia03f",
    "nc",
    "red",
    "Présence de liens dont le contenu est vide [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-6-2-1' target='_blank'>RAWeb 6.2.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-libelle-de-chaque-lien-decrit-sa-fonction-ou-la-nature-du-contenu-vers-lequel-il-pointe' target='_blank'>Opquast 131</a>]",
    test03f
  );
}
function test03f(color, destination, nomenclature) {
  const query = 'a[href]:not([href^="#"]),[role="link"][href]:not([href^="#"])';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test03f
  );
}
function condition_test03f(node) {
  return Boolean(
    isItemVisible(node) && !node.hasAttribute("title") && node.closest("[lang]") && sanitizeText(
      node.innerText,
      node.closest("[lang]").getAttribute("lang")
    ).length === 0 && node.querySelectorAll(
      'img:not([alt=""]):not([aria-hidden="true"]):not([hidden])'
    ).length === 0
  );
}
function check_test_03g() {
  testChecker(
    "03-G",
    "nia03g",
    "nth",
    "yellow",
    "Présence d'un lien sans destination",
    test03g
  );
}
function test03g(color, destination, nomenclature) {
  const query = 'a:not([href]),[role="link"]:not([href])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
const nia03h_regexmail = /^((?=.+@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*(?:\.[A-Za-z]{2,}))$/;
const nia03h_regexphone = /^((\+|00)|\((\+|00)[0-9]{1,4}\))?[0-9+\-\s().]*$/;
function check_test_03h() {
  testChecker(
    "03-H",
    "nia03h1",
    "nth",
    "yellow",
    "Le texte d'un lien mailto doit correspondre à l'adresse email pointé",
    test03h1
  );
  testChecker(
    "03-H",
    "nia03h2",
    "nc",
    "red",
    "Présence de liens mailto: non valide",
    test03h2
  );
  testChecker(
    "03-H",
    "nia03h3",
    "nc",
    "red",
    "Présence de liens tel: non valide",
    test03h3
  );
  testChecker(
    "03-H",
    "nia03h4",
    "nc",
    "red",
    "Présence de liens fax: non valide",
    test03h4
  );
}
function test03h1(color, destination, nomenclature) {
  const query = '*:not(.mcgyver-slot) > a[href^="mailto:"]';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test03h1
  );
}
function condition_test03h1(node) {
  return Boolean(
    isItemVisible(node) && node.getAttribute("href") && node.getAttribute("href").replace("mailto:", "") != node.innerText
  );
}
function test03h2(color, destination, nomenclature) {
  const query = '*:not(.mcgyver-slot) > a[href^="mailto:"]';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test03h2
  );
}
function condition_test03h2(node) {
  return Boolean(
    isItemVisible(node) && node.getAttribute("href") && !nia03h_regexmail.test(
      node.getAttribute("href").replace("mailto:", "")
    )
  );
}
function test03h3(color, destination, nomenclature) {
  const query = '*:not(.mcgyver-slot) > a[href^="tel:"]';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test03h3
  );
}
function condition_test03h3(node) {
  return Boolean(
    isItemVisible(node) && node.getAttribute("href") && !nia03h_regexphone.test(
      node.getAttribute("href").replace("tel:", "")
    )
  );
}
function test03h4(color, destination, nomenclature) {
  const query = '*:not(.mcgyver-slot) > a[href^="fax:"]';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test03h4
  );
}
function condition_test03h4(node) {
  return Boolean(
    isItemVisible(node) && node.getAttribute("href") && !nia03h_regexphone.test(
      node.getAttribute("href").replace("fax:", "")
    )
  );
}
function check_test_03i() {
  testChecker(
    "03-I",
    "nia03i",
    "nth",
    "yellow",
    "Présence de liens non pertinents [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-libelle-de-chaque-lien-decrit-sa-fonction-ou-la-nature-du-contenu-vers-lequel-il-pointe' target='_blank'> Opquast 132</a>]",
    test03i
  );
}
function test03i(color, destination, nomenclature) {
  const query = 'html[lang="fr"] a';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test03i
  );
}
function condition_test03i(node) {
  return Boolean(
    isItemVisible(node) && (node.innerHTML === "ici" || node.innerHTML === "cliquer ici" || node.innerHTML === "cliquez ici" || node.innerHTML === "lire la suite" || node.innerHTML === "lien")
  );
}
function check_test_03j() {
  if (!filter.only_redactor) {
    testChecker(
      "03-J",
      "nia03j",
      "nth",
      "orange",
      "Présence de liens externes qui s'ouvrent dans la fenêtre courante",
      test03j
    );
  }
}
function test03j(color, destination, nomenclature) {
  const host = window.location.host;
  const query = 'a[href^="http"]:not([href*="' + host + '"]):not([target="_blank"])';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test03j
  );
}
function condition_test03j(node) {
  return Boolean(isItemVisible(node) && node.closest(".feed-wrapper") === null);
}
function check_test_03k() {
  if (pageSettings.isAEM) {
    testChecker(
      "03-K",
      "",
      "nth",
      "yellow",
      "Présence de trop de liens 'Pour en savoir plus'",
      test03k
    );
  }
}
function test03k() {
  const nia03k_nodes = document.querySelectorAll(
    ".cmp-focus .focus-more.btn, .cmp-contentbox a.btn"
  );
  return nia03k_nodes && nia03k_nodes.length > 15 && isAtLeastOneItemVisible(nia03k_nodes);
}
function check_test_03l() {
  testChecker(
    "03-L",
    "nia03l",
    "nth",
    "yellow",
    "Réservez le soulignement aux liens",
    test03l
  );
}
function test03l(color, destination, nomenclature) {
  const query = 'body *:not(a):not(mark):not(h1):not(h2):not(h3):not(h4):not(h5):not(h6):not(button):not([role="tab"]):not(input):not(li.nav-item--active)';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test03l
  );
}
function condition_test03l(node) {
  return Boolean(
    isItemVisible(node) && window.getComputedStyle(node).textDecorationLine === "underline" && node.closest("a") === null
  );
}
function check_test_03m() {
  testChecker(
    "03-M",
    "nia03m",
    "nth",
    "orange",
    "Présence d'un lien erroné (espace present dans l'attribut href)",
    test03m
  );
}
function test03m(color, destination, nomenclature) {
  const query = 'a[href*=" "],[role="link"][href*=" "]';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_test_03n() {
  if (!filter.only_redactor) {
    testChecker(
      "03-N",
      "nia03n",
      "man",
      "yellow",
      "Présence d'un lien non souligné, vérifier son contraste avec le texte environnant",
      test03n
    );
  }
}
function test03n(color, destination, nomenclature) {
  const query = "main *:not(li.nav-item) > p:not(.nav-back) > a:not(.btn), main *:not(.cmp-autocompleteSearch__keywords) > li:not(.cmp-focus-list-item):not(.nav-item):not(.cmp-languagenavigation__item):not(.cmp-breadcrumb__item):not(.subnav-item):not(.cmp-grid__item ):not(.filter-item):not(.cmp-list__item):not(.pagination-page):not(.pagination-next):not(.pagination-prev) > a:not(.toc-anchor)";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test03n
  );
}
function condition_test03n(node) {
  return Boolean(
    isItemVisible(node) && hasVisibleContent(node) && hasDirectContent(node) && window.getComputedStyle(node).textDecorationLine !== "underline"
  );
}
function check_test_03o() {
  if (!filter.only_redactor && pageSettings.isAEM && !pageSettings.isPreview) {
    testChecker(
      "03-O",
      "nia03o",
      "man",
      "orange",
      "Présence d'un lien vers un environnement de test",
      test03o
    );
  }
}
function test03o(color, destination, nomenclature) {
  const query = "a";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test03o
  );
}
function condition_test03o(node) {
  return Boolean(
    isItemVisible(node) && node.hasAttribute("href") && node.getAttribute("href").includes("wcm-")
  );
}
const nia03p_regex = /^.+ \((?:[A-Z]{2}, )?[A-Za-z]+, \d{1,4},\d{1,2} [A-Za-z]{2}\)$/g;
function check_test_03p() {
  if (!filter.only_redactor && pageSettings.isAEM) {
    testChecker(
      "03-P",
      "nia03p",
      "nth",
      "yellow",
      "Formalisme des liens de téléchargement : name (FR, Pdf ,poids)",
      test03p
    );
  }
}
function test03p(color, destination, nomenclature) {
  const query = "a";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test03p
  );
}
function condition_test03p(node) {
  return Boolean(
    isItemVisible(node) && node.hasAttribute("href") && (node.getAttribute("href").includes(".pdf") || node.getAttribute("href").includes(".doc") || node.getAttribute("href").includes(".xls")) && nia03p_regex.test(node.getAttribute("href") || "")
  );
}
function check_test_03q() {
  testChecker(
    "03-Q",
    "nia03q",
    "dev",
    "red",
    "Présence de liens avec un contenu identique (titre + aria-label) et des cibles différentes",
    test03q
  );
}
function test03q(color, destination, nomenclature) {
  const query = "a[href]";
  return checkIfQueryMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test03q,
    false
  );
}
function condition_test03q(nodes) {
  let nia03q_flag = false;
  let nia03q_content;
  let nia03q_array = [];
  if (nodes && nodes.length > 0 && isAtLeastOneItemVisible(nodes)) {
    for (let i = 0; i < nodes.length; i++) {
      nia03q_content = nodes[i].textContent;
      if (nodes[i].hasAttribute("aria-label") && nodes[i].hasAttribute("title") && nodes[i].getAttribute("title") != nodes[i].getAttribute("aria-label"))
        nia03q_content += " " + nodes[i].getAttribute("title") + " " + nodes[i].getAttribute("aria-label");
      else if (nodes[i].hasAttribute("aria-label") && nodes[i].hasAttribute("title") && nodes[i].getAttribute("title") == nodes[i].getAttribute("aria-label"))
        nia03q_content += " " + nodes[i].getAttribute("title");
      else if (nodes[i].hasAttribute("title"))
        nia03q_content += " " + nodes[i].getAttribute("title");
      else if (nodes[i].hasAttribute("aria-label"))
        nia03q_content += " " + nodes[i].getAttribute("aria-label");
      if (nia03q_array.indexOf({
        content: nia03q_content,
        target: nodes[i].getAttribute("href")
      }) >= 0) {
        nia03q_flag = true;
        setItemOutline(nodes[i], "red", "nia03q", "03-Q");
      } else {
        nia03q_array.push({
          content: nia03q_content,
          target: nodes[i].getAttribute("href")
        });
      }
    }
  }
  return nia03q_flag;
}
function check_part_03() {
  if (filter.debug_flag) console.log("03 Liens");
  check_test_03a();
  check_test_03b();
  check_test_03c();
  check_test_03d();
  check_test_03e();
  check_test_03f();
  check_test_03g();
  check_test_03h();
  check_test_03i();
  check_test_03j();
  check_test_03k();
  check_test_03l();
  check_test_03m();
  check_test_03n();
  check_test_03o();
  check_test_03p();
  check_test_03q();
}
function check_test_04a() {
  testChecker(
    "04-A",
    "nia04a1",
    "nc",
    "red",
    "Absence d'attribut autocomplete ou attribut erroné sur des champs formulaire (name) - utiliser 'family-name' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]",
    test04a1
  );
  testChecker(
    "04-A",
    "nia04a2",
    "nc",
    "red",
    "Absence d'attribut autocomplete ou attribut erroné sur des champs formulaire (firstname) - utiliser 'given-name' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]",
    test04a2
  );
  testChecker(
    "04-A",
    "nia04a3",
    "nc",
    "red",
    "Absence d'attribut autocomplete ou attribut erroné sur des champs formulaire (email) - utiliser 'email' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]",
    test04a3
  );
  testChecker(
    "04-A",
    "nia04a4",
    "nc",
    "red",
    "Absence d'attribut autocomplete ou attribut erroné sur des champs formulaire (phone) - utiliser 'tel' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]",
    test04a4
  );
  testChecker(
    "04-A",
    "nia04a5",
    "nc",
    "red",
    "Absence d'attribut autocomplete ou attribut erroné sur des champs formulaire (postal) - utiliser 'postal-code' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]",
    test04a5
  );
  testChecker(
    "04-A",
    "nia04a6",
    "nc",
    "red",
    "Absence d'attribut autocomplete ou attribut erroné sur des champs formulaire (country) - utiliser 'country-name' ou 'country' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]",
    test04a6
  );
  testChecker(
    "04-A",
    "nia04a7",
    "nc",
    "red",
    "Attribut erroné sur des champs formulaire (matricule) - Enlever l'attribut [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]",
    test04a7
  );
  testChecker(
    "04-A",
    "nia04a8",
    "nc",
    "red",
    "Absence d'attribut autocomplete ou attribut erroné sur des champs formulaire (ville) - Utiliser 'address-level2' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]",
    test04a8
  );
  testChecker(
    "04-A",
    "nia04a9",
    "nc",
    "red",
    "Absence d'attribut autocomplete ou attribut erroné sur des champs formulaire (adresse) - Utiliser 'street-address' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]",
    test04a9
  );
  testChecker(
    "04-A",
    "nia04a10",
    "nc",
    "red",
    "Absence d'attribut autocomplete ou attribut erroné sur des champs formulaire (organisation) - utiliser 'organization' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]",
    test04a10
  );
  testChecker(
    "04-A",
    "nia04a11",
    "nc",
    "red",
    "Absence d'attribut autocomplete ou attribut erroné sur des champs formulaire (function) - utiliser 'organization-title' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]",
    test04a11
  );
  if (pageSettings.isCTIE) {
    testChecker(
      "04-A",
      "nia04a12",
      "man",
      "yellow",
      "Présence d'attribut autocomplete vraisemblablement erronée sur des champs formulaire [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]",
      test04a12
    );
  }
}
function test04a1(color, destination, nomenclature) {
  const query = 'input[name="name"]:not([autocomplete="family-name"]):not([autocomplete^="section-"][autocomplete$="family-name"]), input[name="lastname"]:not([autocomplete="family-name"]):not([autocomplete^="section-"][autocomplete$="family-name"])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test04a2(color, destination, nomenclature) {
  const query = 'input[name="firstname"]:not([autocomplete="given-name"]):not([autocomplete^="section-"][autocomplete$="given-name"])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test04a3(color, destination, nomenclature) {
  const query = 'input[type="email"]:not([autocomplete="email"]):not([autocomplete^="section-"][autocomplete$="email"]):not([autocomplete="work email"])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test04a4(color, destination, nomenclature) {
  const query = 'input[type="tel"]:not([autocomplete="tel"]):not([autocomplete^="section-"][autocomplete$="tel"]):not([autocomplete="fax tel"]):not([autocomplete="home tel"]):not([autocomplete="mobile tel"]):not([autocomplete="work tel"]), input[name="phone"]:not([autocomplete="tel"]):not([autocomplete^="section-"][autocomplete$="tel"]):not([autocomplete="fax tel"]):not([autocomplete="home tel"]):not([autocomplete="mobile tel"]):not([autocomplete="work tel"])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test04a5(color, destination, nomenclature) {
  const query = 'input[name="postal"]:not([autocomplete="postal-code"]):not([autocomplete^="section-"][autocomplete$="postal-code"]),input[type="postal-code"]:not([autocomplete="postal-code"]):not([autocomplete^="section-"][autocomplete$="postal-code"])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test04a6(color, destination, nomenclature) {
  const query = 'input[name="country"]:not([autocomplete="country-name"]):not([autocomplete^="section-"][autocomplete$="country-name"]), select[name="country"]:not([autocomplete="country"]):not([autocomplete^="section-"][autocomplete$="country"])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test04a7(color, destination, nomenclature) {
  const query = 'input[name="matricule"][autocomplete]';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test04a8(color, destination, nomenclature) {
  const query = 'input[name="city"]:not([autocomplete="address-level2"]):not([autocomplete^="section-"][autocomplete$="address-level2"]), input[name="ville"]:not([autocomplete="address-level2"]):not([autocomplete^="section-"][autocomplete$="address-level2"])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test04a9(color, destination, nomenclature) {
  const query = 'textarea[name="adresse"]:not([autocomplete="street-address"]):not([autocomplete^="section-"][autocomplete$="street-address"]), input[name="adresse"]:not([autocomplete="street-address"]):not([autocomplete^="section-"][autocomplete$="street-address"]), input[name="street"]:not([autocomplete="street-address"]):not([autocomplete^="section-"][autocomplete$="street-address"])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test04a10(color, destination, nomenclature) {
  const query = 'input[name="organisation"]:not([autocomplete="organization"]):not([autocomplete^="section-"][autocomplete$="organization"]), input[name="organization"]:not([autocomplete="organization"]):not([autocomplete^="section-"][autocomplete$="organization"]),input[name="organism"]:not([autocomplete="organization"]):not([autocomplete^="section-"][autocomplete$="organization"])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test04a11(color, destination, nomenclature) {
  const query = 'input[name="fonction"]:not([autocomplete="organization-title"]):not([autocomplete^="section-"][autocomplete$="organization-title"]), input[name="function"]:not([autocomplete="organization-title"]):not([autocomplete^="section-"][autocomplete$="organization-title"])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test04a12(color, destination, nomenclature) {
  const query = '[autocomplete="name"],[autocomplete="honorific-suffix"],[autocomplete="nickname"],[autocomplete="address-level1"],[autocomplete="address-level3"],[autocomplete="address-level4"],[autocomplete="cc-name"],[autocomplete="cc-given-name"],[autocomplete="cc-additional-name"],[autocomplete="cc-number"],[autocomplete="cc-exp"],[autocomplete="cc-exp-month"],[autocomplete="cc-exp-year"],[autocomplete="cc-csc"],[autocomplete="cc-type"],[autocomplete="transaction-currency"],[autocomplete="transaction-amount"],[autocomplete="language"],[autocomplete="bday-day"],[autocomplete="bday-month"],[autocomplete="bday-year"],[autocomplete="sex"],[autocomplete="photo"],[autocomplete="tel-area-code"],[autocomplete="tel-local"],[autocomplete="tel-local-prefix"],[autocomplete="tel-local-suffix"],[autocomplete="tel-extension"],[autocomplete="impp"]';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
const nia04b_regex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
function check_test_04b() {
  testChecker(
    "04-B",
    "nia04b",
    "nc",
    "red",
    "Présence de champs email sans indication de format [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-10-5' target='_blank'>RAWeb 11.10.5</a>]",
    test04b
  );
}
function test04b(color, destination, nomenclature) {
  const query = 'input[id][type="email"]';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test04b
  );
}
function condition_test04b(node) {
  const id = node.getAttribute("id");
  if (isItemVisible(node) && id && id.trim() !== "") {
    const label = document.querySelector(
      "label[for='" + id.trim() + "']"
    );
    const destination = node.getAttribute("aria-describedby");
    if (label && label.textContent.length > 0) {
      if (label.innerText.match(nia04b_regex)) {
        return false;
      }
      let loopResult = true;
      if (destination && destination.trim() !== "") {
        destination.split(/(\s+)/).forEach((elem) => {
          const target = document.querySelectorAll(
            "[id='" + elem.trim() + "']"
          );
          if (elem.trim().length > 0 && target && target.length === 1 && target[0].innerText.match(nia04b_regex)) {
            loopResult = false;
          }
        });
      }
      return loopResult;
    }
  }
  return false;
}
function check_test_04c() {
  if (pageSettings.isAEM) {
    testChecker(
      "04-C",
      "nia04c",
      "nth",
      "yellow",
      `Vérifier si le bouton de soumission possède bien l'intitulé "Prévisualiser puis envoyer" [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-12-1' target='_blank'>RAWeb 11.12.1</a>]`,
      test04c
    );
  }
}
function test04c(color, destination, nomenclature) {
  const query = 'html[lang="fr"] main form[action*="support/contact"] button.cmp-form-button[type="SUBMIT"][name="preview"]';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test04c
  );
}
function condition_test04c(node) {
  return Boolean(
    isItemVisible(node) && node.textContent && node.textContent !== "Prévisualiser puis envoyer"
  );
}
function check_test_04d() {
  testChecker(
    "04-D",
    "nia04d1",
    "nc",
    "red",
    "Présence de champs sans label [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-1-1' target='_blank'>RAWeb 11.1.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-champ-de-formulaire-est-associe-dans-le-code-source-a-une-etiquette-qui-lui-est-propre' target='_blank'>Opquast 67</a>]",
    test04d1
  );
  testChecker(
    "04-D",
    "nia04d2",
    "nc",
    "red",
    "Présence de champs avec plus d'un label [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-1-1' target='_blank'>RAWeb 11.1.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-champ-de-formulaire-est-associe-dans-le-code-source-a-une-etiquette-qui-lui-est-propre' target='_blank'>Opquast 67</a>]",
    test04d2
  );
}
function test04d1(color, destination, nomenclature) {
  const query = "input:not([aria-label]):not([aria-labelledby]):not([type='hidden']):not([type='submit']):not([type='reset']):not([type='button']), select:not([aria-label]):not([aria-labelledby]), textarea:not([aria-label]):not([aria-labelledby])";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test04d1
  );
}
function condition_test04d1(node) {
  let flag = false;
  if (isItemVisible(node)) {
    const nia04d_id = node.getAttribute("id");
    if (!nia04d_id || nia04d_id === "") {
      flag = true;
    } else {
      const nia04d_label = document.querySelectorAll(
        "label[for='" + nia04d_id + "']"
      );
      if (!nia04d_label || nia04d_label.length === 0) {
        flag = true;
      }
    }
  }
  return flag;
}
function test04d2(color, destination, nomenclature) {
  const query = "input[id]:not([aria-label]):not([aria-labelledby]):not([type='hidden']):not([type='submit']):not([type='reset']):not([type='button']), select[id]:not([aria-label]):not([aria-labelledby]), textarea[id]:not([aria-label]):not([aria-labelledby])";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test04d2
  );
}
function condition_test04d2(node) {
  let flag = false;
  if (isItemVisible(node)) {
    const nia04d_id = node.getAttribute("id");
    if (nia04d_id && nia04d_id !== "") {
      const nia04d_label = document.querySelectorAll(
        "label[for='" + nia04d_id + "']"
      );
      if (nia04d_label && nia04d_label.length > 1) {
        flag = true;
      }
    }
  }
  return flag;
}
function check_test_04e() {
  testChecker(
    "04-E",
    "nia04e",
    "nc",
    "red",
    "Absence de la légende dans un fieldset [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-6-1' target='_blank'>RAWeb 11.6.1</a>]",
    test04e
  );
}
function test04e(color, destination, nomenclature) {
  const query = "fieldset";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test04e
  );
}
function condition_test04e(node) {
  return Boolean(
    isItemVisible(node) && !(node.firstElementChild && node.firstElementChild.tagName && node.firstElementChild.tagName === "LEGEND" && node.firstElementChild.textContent !== "" || node.firstElementChild && node.firstElementChild.firstElementChild && node.firstElementChild.firstElementChild.tagName && node.firstElementChild.firstElementChild.tagName === "LEGEND" && node.firstElementChild.firstElementChild.textContent !== "" || node.firstElementChild && sanitizeText(node.firstElementChild.textContent, "fr") === "" && node.firstElementChild.nextSibling && node.firstElementChild.nextSibling.tagName == "LEGEND" && node.firstElementChild.nextSibling.textContent != "")
  );
}
function check_test_04f() {
  if (!filter.only_redactor && pageSettings.isAEM) {
    testChecker(
      "04-F",
      "",
      "nc",
      "red",
      "Absence d'indication de la signification de l'astérisque sur un champ obligatoire [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-10-1' target='_blank'>RAWeb 11.10.1</a>]",
      test04f1
    );
    testChecker(
      "04-F",
      "nia04f2",
      "nc",
      "red",
      "Absence d'astérisque sur un champ obligatoire [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-10-1' target='_blank'>RAWeb 11.10.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/letiquette-de-chaque-champ-de-formulaire-indique-si-la-saisie-est-obligatoire' target='_blank'>Opquast 69</a>]",
      test04f2
    );
  }
}
function test04f1() {
  const pre_query = 'form [required]:not([required="false"]), form [aria-required="true"]';
  if (document.querySelectorAll(pre_query).length > 0) {
    const query = ".cmp-ratings, .cmp-form__mandatory-text, .mandatory-label";
    return checkIfNoneVisibleItemMatch(query);
  }
  return false;
}
function test04f2(color, destination, nomenclature) {
  const query = 'form [required]:not([required="false"]), form [aria-required="true"]';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test04f2
  );
}
function condition_test04f2(node) {
  let flag = false;
  if (isItemVisible(node)) {
    if (node.parentElement && node.parentElement.tagName !== "LABEL" && node.getAttribute("type") !== "checkbox" && node.getAttribute("type") !== "radio") {
      const nia04f_id = node.getAttribute("id");
      if (!nia04f_id || nia04f_id === "") {
        flag = true;
      } else {
        const nia04f_label = document.querySelectorAll(
          "label[for='" + nia04f_id + "']"
        );
        if (!nia04f_label || nia04f_label.length === 0 || !nia04f_label[0].textContent.includes("*")) {
          flag = true;
        }
      }
    } else {
      const nia04f_fieldset = node.closest("fieldset.cmp-form-options");
      if (!nia04f_fieldset || nia04f_fieldset === null) {
        if (node.parentElement && node.parentElement.textContent && !node.parentElement.textContent.includes("*")) {
          flag = true;
        }
      } else {
        const nia04f_legend = nia04f_fieldset.getElementsByTagName("legend");
        if (!nia04f_legend || nia04f_legend.length !== 1 || !nia04f_legend[0].textContent.includes("*")) {
          flag = true;
        }
      }
    }
  }
  return flag;
}
function check_test_04g() {
  testChecker(
    "04-G",
    "nia04g",
    "nc",
    "red",
    "Présence d'autocomplete sur un champ de type 'checkbox' ou 'Radiobutton' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]",
    test04g
  );
}
function test04g(color, destination, nomenclature) {
  const query = 'input[type="checkbox"][autocomplete]:not([autocomplete="off"]),input[type="radio"][autocomplete]:not([autocomplete="off"])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_test_04h() {
  if (!filter.only_redactor) {
    testChecker(
      "04-H",
      "nia04h",
      "nc",
      "orange",
      "Le Champ et l'étiquette doivent être accolé [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-5-1' target='_blank'>RAWeb 11.5.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-etiquette-de-formulaire-est-visuellement-rattachee-au-champ-quelle-decrit' target='_blank'>Opquast 75</a>]",
      test04h
    );
  }
}
function test04h(color, destination, nomenclature) {
  const query = 'input[id]:not([type="button"]):not([type="reset"]):not([type="submit"]),select[id],textarea[id]';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test04h
  );
}
function condition_test04h(node) {
  let flag = false;
  if (isItemVisible(node)) {
    const nia04h_id = node.getAttribute("id");
    if (!nia04h_id || nia04h_id === "") {
      setItemOutline(node, "orange", "nia04h", "04-H");
      flag = true;
    } else {
      const nia04h_label = document.querySelectorAll(
        "label[for='" + nia04h_id + "']"
      );
      if (!nia04h_label || nia04h_label.length === 0) {
        flag = true;
      } else if (isItemVisible(nia04h_label[0]) && !isItemSROnly(nia04h_label[0])) {
        let nia04h_distance_vertical = getDistanceBetweenVerticalElements(
          node,
          nia04h_label[0]
        );
        let nia04h_distance_horizontal = getDistanceBetweenHorizontalElements(
          node,
          nia04h_label[0]
        );
        if (nia04h_distance_vertical > 100 && nia04h_distance_horizontal > 100) {
          if (filter.debug_flag) {
            console.log(
              "[nia04h] distance : [" + nia04h_distance_horizontal + ":" + nia04h_distance_vertical + "]"
            );
          }
          if (node.parentElement === nia04h_label[0] && nia04h_label[0].firstElementChild !== null) {
            let nia04h_distance_wrapper = getDistanceBetweenHorizontalElements(
              node,
              nia04h_label[0].firstElementChild
            );
            if (filter.debug_flag) {
              console.log(
                "[nia04h] wrap distance : [" + nia04h_distance_wrapper + "]"
              );
            }
            if (nia04h_distance_wrapper > 100) {
              flag = true;
            }
          } else {
            flag = true;
          }
        }
      }
    }
  }
  return flag;
}
function getPositionAtTopRight(e) {
  let rect;
  if (e.nodeName !== "#text") {
    rect = e.getBoundingClientRect();
  } else {
    const range2 = document.createRange();
    range2.selectNode(e);
    rect = range2.getBoundingClientRect();
  }
  return { x: rect.left + rect.width, y: rect.top };
}
function getPositionAtTopLeft(e) {
  let rect;
  if (e.nodeName !== "#text") {
    rect = e.getBoundingClientRect();
  } else {
    const range2 = document.createRange();
    range2.selectNode(e);
    rect = range2.getBoundingClientRect();
  }
  return { x: rect.left, y: rect.top };
}
function getDistanceBetweenVerticalElements(a, b) {
  const inputPosition = getPositionAtTopLeft(a);
  const labelPosition = getPositionAtTopLeft(b);
  return Math.hypot(
    inputPosition.x - labelPosition.x,
    inputPosition.y - labelPosition.y
  );
}
function getDistanceBetweenHorizontalElements(a, b) {
  const inputPosition = getPositionAtTopLeft(a);
  const labelPosition = getPositionAtTopRight(b);
  return Math.hypot(
    inputPosition.x - labelPosition.x,
    inputPosition.y - labelPosition.y
  );
}
function check_test_04i() {
  if (!filter.only_redactor) {
    testChecker(
      "04-I",
      "nia04i",
      "nc",
      "red",
      "Présence d'attribut aria-describedby non lié à un texte d'aide (ou lié à plusieurs textes d'aide ayant le même 'id') [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-informations-completant-letiquette-dun-champ-sont-associees-a-celui-ci-dans-le-code-source' target='_blank'>Opquast 68</a>]",
      test04i
    );
  }
}
function test04i(color, destination, nomenclature) {
  const query = "input[aria-describedby]";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test04i
  );
}
function condition_test04i(node) {
  const destination = node.getAttribute("aria-describedby");
  let loopResult = false;
  if (isItemVisible(node) && destination && destination.trim() !== "") {
    destination.split(/(\s+)/).forEach((elem) => {
      if (elem.trim().length > 0 && (!document.querySelectorAll("[id='" + elem.trim() + "']") || document.querySelectorAll("[id='" + elem.trim() + "']").length !== 1)) {
        loopResult = true;
      }
    });
  }
  return loopResult;
}
function check_test_04j() {
  testChecker(
    "04-J",
    "nia04j",
    "nc",
    "red",
    "Absence du format de saisie dans un texte d'aide [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-format-de-saisie-des-champs-de-formulaire-qui-le-necessitent-est-indique' target='_blank'>Opquast 70</a>]",
    test04j
  );
}
function test04j(color, destination, nomenclature) {
  const query = "input[type='email']:not([aria-describedby]), input[type='tel']:not([aria-describedby]), input[pattern]:not([aria-describedby]):not([pattern='.*\\\\S.*'])";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test04j
  );
}
function condition_test04j(node) {
  let flag = false;
  if (isItemVisible(node)) {
    const nia04j_id = node.getAttribute("id");
    if (!nia04j_id || nia04j_id === "") {
      flag = true;
    } else {
      const nia04j_label = document.querySelectorAll(
        "[for='" + nia04j_id + "']"
      );
      if (!nia04j_label || nia04j_label.length !== 1) {
        flag = true;
      } else if (nia04j_label[0].innerText.indexOf("@") < 0) {
        flag = true;
      }
    }
  }
  return flag;
}
let nia04k_array = [
  "envoyer",
  "effacer",
  "annuler",
  "confirmer",
  "valider",
  "poursuivre",
  "rechercher"
];
function check_test_04k() {
  if (pageSettings.isAEM) {
    testChecker(
      "04-K",
      "nia04k",
      "nth",
      "yellow",
      "Présence de label de bouton insuffisament pertinent",
      test04k
    );
  }
}
function test04k(color, destination, nomenclature) {
  const query = 'html[lang="fr"] input[type="submit"], html[lang="fr"] input[type="reset"], html[lang="fr"] input[type="button"]';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test04k
  );
}
function condition_test04k(node) {
  return Boolean(
    isItemVisible(node) && node.textContent && nia04k_array.includes(node.textContent)
  );
}
function check_test_04l() {
  if (!filter.only_nc) {
    testChecker(
      "04-L",
      "nia04l",
      "nth",
      "yellow",
      "Formulaire avec bouton de soumission mal placé",
      test04l
    );
  }
}
function test04l(color, destination, nomenclature) {
  const query = "*:not(.filter-search-bar) > form";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test04l
  );
}
function condition_test04l(node) {
  let flag = false;
  if (isItemVisible(node)) {
    const nia04l_childs = node.querySelectorAll(
      'input:not([type="hidden"]) , button'
    );
    const nia04l_lastchilds = nia04l_childs[nia04l_childs.length - 1];
    if (!(nia04l_lastchilds.tagName === "BUTTON" || nia04l_lastchilds.tagName === "INPUT" && nia04l_lastchilds.hasAttribute("type") && (nia04l_lastchilds.getAttribute("type").toUpperCase() == "SUBMIT" || nia04l_lastchilds.getAttribute("type").toUpperCase() == "RESET" || nia04l_lastchilds.getAttribute("type").toUpperCase() == "BUTTON"))) {
      flag = true;
    }
  }
  return flag;
}
function check_test_04m() {
  if (!filter.only_redactor) {
    testChecker(
      "04-M",
      "nia04m",
      "man",
      "orange",
      "Un groupe de Checkbox/Radio doit être structuré dans un fieldset",
      test04m
    );
  }
}
function test04m(color, destination, nomenclature) {
  const query = 'input[type="checkbox"],input[type="radio"]';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test04m
  );
}
function condition_test04m(node) {
  return Boolean(
    isItemVisible(node) && node.parentElement && !node.parentElement.closest("fieldset") && node.parentElement.closest("cmp-form-options") && node.parentElement.closest("cmp-form-options").querySelectorAll('input[type="checkbox"],input[type="radio"]').length > 1
  );
}
function check_test_04n() {
  testChecker(
    "04-N",
    "nia04n",
    "nc",
    "red",
    "Absence du format de saisie dans un datepicker [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-format-de-saisie-des-champs-de-formulaire-qui-le-necessitent-est-indique' target='_blank'>Opquast 70</a>]",
    test04n
  );
}
function test04n(color, destination, nomenclature) {
  const query = "input[type='text'].datepicker:not([aria-describedby]), input[type='text'][pattern='([0-9]{2}-){2}[0-9]{4}']:not([aria-describedby])";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test04n
  );
}
function condition_test04n(node) {
  let flag = false;
  if (isItemVisible(node)) {
    const nia04n_id = node.getAttribute("id");
    if (!nia04n_id || nia04n_id === "") {
      flag = true;
    } else {
      const nia04n_label = document.querySelectorAll(
        "[for='" + nia04n_id + "']"
      );
      if (!nia04n_label || nia04n_label.length !== 1 || nia04n_label[0].innerText.indexOf("(") < 0) {
        flag = true;
      }
    }
  }
  return flag;
}
function check_test_04o() {
  testChecker(
    "04-O",
    "nia04o1",
    "nc",
    "red",
    "Type de champ erroné sur des champs formulaire (email) - utiliser type='email'",
    test04o1
  );
  testChecker(
    "04-O",
    "nia04o2",
    "nc",
    "red",
    "Type de champ erroné sur des champs formulaire (tel) - utiliser type='tel'",
    test04o2
  );
  testChecker(
    "04-O",
    "nia04o2",
    "nth",
    "yellow",
    "Type de champ à vérifier sur des champs formulaire (datepicker) - utiliser type='date'",
    test04o3
  );
}
function test04o1(color, destination, nomenclature) {
  const query = 'input[name="email"]:not([type="email"])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test04o2(color, destination, nomenclature) {
  const query = 'input[name="tel"]:not([type="tel"]), input[name="phone"]:not([type="tel"])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test04o3(color, destination, nomenclature) {
  const query = 'input[name*="date"]:not([type="date"])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_test_04p() {
  testChecker(
    "04-P",
    "nia04p",
    "nth",
    "yellow",
    "Présence d'un attribut max-lenght sur un champ de saisi. Cela peut poser des problèmes pour le copier/coller de valeur",
    test04p
  );
}
function test04p(color, destination, nomenclature) {
  const query = "input[max-lenght],textarea[max-lenght]";
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_part_04() {
  if (filter.debug_flag) {
    console.log("04 Formulaire");
  }
  check_test_04a();
  check_test_04b();
  check_test_04c();
  check_test_04d();
  check_test_04e();
  check_test_04f();
  check_test_04g();
  check_test_04h();
  check_test_04i();
  check_test_04j();
  check_test_04k();
  check_test_04l();
  check_test_04m();
  check_test_04n();
  check_test_04o();
  check_test_04p();
}
function check_test_05a() {
  testChecker(
    "05-A",
    "nia05a",
    "nc",
    "orange",
    "Présence de balises vides [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-9-1' target='_blank'>RAWeb 8.9.1</a>]",
    test05a
  );
}
function test05a(color, destination, nomenclature) {
  const query = '*:not(.ol-attribution) > :where(p, th, strong, em, a, q, blockquote, aside, ul, li, dl, dd, dt):not([aria-hidden="true"]):not(.mapboxgl-ctrl-logo):not(.at):not(.sr-only):not([role="presentation"]):empty';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test05a
  );
}
function condition_test05a(node) {
  return Boolean(isItemVisible(node) && node.childElementCount === 0);
}
function check_test_05b() {
  testChecker(
    "05-B",
    "nia05b",
    "nc",
    "orange",
    "Présence de balises vides (ou avec un contenu assimilable à vide) [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-9-1' target='_blank'>RAWeb 8.9.1</a>]",
    test05b
  );
}
function test05b(color, destination, nomenclature) {
  const query = '*:not(.ol-attribution):not([aria-hidden="true"]):not(.pagination-page) > :where(p, th, strong, em, a, q, blockquote, aside, ul, li, dl, dd, dt):not([aria-hidden="true"]):not(.mapboxgl-ctrl-logo):not(:empty)';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test05b
  );
}
function condition_test05b(node) {
  return Boolean(
    isItemVisible(node) && node.childElementCount === 0 && sanitizeText(
      cleanNode(node).innerText,
      node.closest("[lang]").getAttribute("lang")
    ) === ""
  );
}
function check_test_05c() {
  if (!filter.only_redactor) {
    testChecker(
      "05-C",
      "",
      "dev",
      "orange",
      "Vérifier qu'un doctype est correctement déclaré [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-1-1' target='_blank'>RAWeb 8.1.1</a>]",
      test05c
    );
  }
}
function test05c() {
  const nia05c_doctype = new XMLSerializer().serializeToString(
    document.doctype
  );
  return nia05c_doctype !== "<!DOCTYPE html>";
}
function check_test_05d() {
  testChecker(
    "05-D",
    "",
    "nc",
    "red",
    "Vérifier qu'un titre de page est défini [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-5-1' target='_blank'>RAWeb 8.5.1</a>]",
    test05d
  );
}
function test05d() {
  return document.title === "";
}
function check_test_05e() {
  if (!filter.only_redactor) {
    testChecker(
      "05-E",
      "nia05e1",
      "nc",
      "red",
      "Vérifier la valeur de définition du sens de lecture [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-10-2' target='_blank'>RAWeb 8.10.2</a>]",
      test05e1
    );
    testChecker(
      "05-E",
      "nia05e2",
      "nc",
      "red",
      "Présence d'élément avec un sens de lecture de droite vers la gauche [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-10-2' target='_blank'>RAWeb 8.10.2</a>]",
      test05e2
    );
  }
}
const nia05e2_rtl_isocode = [
  "ar",
  "ara",
  "arc",
  "ae",
  "ave",
  "egy",
  "he",
  "heb",
  "nqo",
  "pal",
  "phn",
  "sam",
  "syc",
  "syr",
  "fa",
  "per",
  "fas",
  "ku",
  "kur",
  "dv",
  "ha",
  "khw",
  "ks",
  "pa",
  "ur",
  "yi"
];
function test05e1(color, destination, nomenclature) {
  const query = '[dir]:not([dir="rtl"]):not([dir="ltr"]):not([dir="auto"])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test05e2(color, destination, nomenclature) {
  const query = '[dir="rtl"]';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test05e2
  );
}
function condition_test05e2(node) {
  return Boolean(
    isItemVisible(node) && node.closest("[lang]") && nia05e2_rtl_isocode.indexOf(
      node.closest("[lang]").getAttribute("lang") || ""
    ) < 0
  );
}
function check_test_05f() {
  if (!filter.only_redactor) {
    testChecker(
      "05-F",
      "nia05f",
      "dev",
      "orange",
      "Présence d'Id dupliqué [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-2-1' target='_blank'>RAWeb 8.2.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-identifiant-html-nest-utilise-quune-seule-fois-par-page' target='_blank'>Opquast 229</a>]",
      test05f
    );
  }
}
function test05f(color, destination, nomenclature) {
  const query = "[id]:not(script):not(link)";
  return checkIfQueryMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test05f,
    false
  );
}
function condition_test05f(nodes) {
  const nia05f_ids = [];
  let flag = false;
  if (nodes && nodes.length > 0) {
    for (let i = 0; i < nodes.length; i++) {
      const nia05f_currentId = nodes[i].id ? nodes[i].id : "";
      if (nia05f_currentId.indexOf("language-") !== 0 && nia05f_currentId.indexOf("-") !== 0) {
        const nia05f_index = nia05f_ids.findIndex(
          (x) => x.id === nia05f_currentId
        );
        if (nia05f_index >= 0 && nia05f_ids[nia05f_index]) {
          if (filter.debug_flag) {
            console.log(nia05f_ids[nia05f_index]);
          }
          nia05f_ids[nia05f_index].occurrence++;
          setItemOutline(nodes[i], "orange", "nia05f", "05-F");
          flag = true;
        } else {
          nia05f_ids.push({ id: nia05f_currentId, occurrence: 1 });
        }
      }
    }
  }
  return flag;
}
function check_test_05g() {
  if (pageSettings.isCTIE && !filter.only_redactor) {
    testChecker(
      "05-G",
      "",
      "nth",
      "gray",
      "Absence de la govbar, vérifier si ce n'est pas un oubli",
      test05g1
    );
    testChecker(
      "05-G",
      "nia05g2",
      "nth",
      "yellow",
      "Problème de traduction dans la Govbar",
      test05g2
    );
    testChecker(
      "05-G",
      "nia05g3",
      "nth",
      "yellow",
      "Problème de traduction dans la Govbar",
      test05g3
    );
    testChecker(
      "05-G",
      "nia05g4",
      "nth",
      "yellow",
      "Problème de traduction dans la Govbar",
      test05g4
    );
    testChecker(
      "05-G",
      "nia05g5",
      "nth",
      "yellow",
      "Problème de traduction dans la Govbar",
      test05g5
    );
  }
}
function test05g1() {
  const query = "#govbar.govbar";
  return checkIfNoneVisibleItemMatch(query);
}
function test05g2(color, destination, nomenclature) {
  const query = 'html[lang="fr"] #govbar.govbar[lang]:not([lang="fr"])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test05g3(color, destination, nomenclature) {
  const query = 'html[lang="en"] #govbar.govbar[lang]:not([lang="en"])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test05g4(color, destination, nomenclature) {
  const query = 'html[lang="de"] #govbar.govbar[lang]:not([lang="de"])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test05g5(color, destination, nomenclature) {
  const query = 'html:not([lang="fr"]):not([lang="en"]):not([lang="de"]) #govbar.govbar[lang]:not([lang="fr"])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_test_05h() {
  testChecker(
    "05-H",
    "nia05h",
    "nc",
    "red",
    "Présence de multiple saut de ligne [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-9-1' target='_blank'>RAWeb 8.9.1</a>], privilégier l'utilisation du composant separator",
    test05h
  );
}
function test05h(color, destination, nomenclature) {
  const query = "br + br";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test05h
  );
}
function condition_test05h(node) {
  return Boolean(
    isItemVisible(node) && (node.previousSibling && node.previousSibling.nodeName === "BR" || node.previousSibling && node.previousSibling.previousSibling && node.previousSibling.previousSibling.nodeName === "BR" && (node.previousSibling.nodeName === "#text" || node.previousSibling.nodeName === "#comment") && (node.previousSibling.textContent === " " || node.previousSibling.textContent === ""))
  );
}
function check_test_05i() {
  if (!pageSettings.isSearchLogic && !pageSettings.isSitemap && !filter.only_redactor) {
    testChecker(
      "05-I",
      "",
      "nth",
      "yellow",
      "Absence de métadonnée qui décrit le contenu [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-code-source-de-chaque-page-contient-une-metadonnee-qui-en-decrit-le-contenu' target='_blank'>Opquast 3</a>]",
      test05i
    );
  }
}
function test05i() {
  const query = 'head meta[name="description"]';
  return checkIfNoneVisibleItemMatch(query);
}
function check_test_05j() {
  testChecker(
    "05-J",
    "",
    "nth",
    "yellow",
    "Absence de Favicon [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-code-source-des-pages-contient-un-appel-valide-a-un-icone-de-favori' target='_blank'>Opquast 99</a>]",
    test05j
  );
}
function test05j() {
  const query = "head link[rel*='icon']";
  return checkIfNoneVisibleItemMatch(query);
}
function check_test_05k() {
  if (!pageSettings.isHomepage && !filter.only_redactor && pageSettings.isAEM) {
    testChecker(
      "05-K",
      "",
      "nth",
      "yellow",
      "Absence de Fils d'Ariane [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-page-affiche-une-information-permettant-de-connaitre-son-emplacement-dans-larborescence-du-site' target='_blank'>Opquast 151</a>]",
      test05k
    );
  }
}
function test05k() {
  const query = ".cmp-breadcrumb,.cmp-breadcrumb-demarches";
  return checkIfNoneVisibleItemMatch(query);
}
function check_test_05l() {
  if (!filter.only_redactor) {
    testChecker(
      "05-L",
      "test05q1",
      "dev",
      "red",
      "Le focus clavier est supprimé d'un élément accordéon [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-focus-clavier-nest-ni-supprime-ni-masque' target='_blank'>Opquast 160</a>]",
      test05l
    );
  }
}
function test05l(color, destination, nomenclature) {
  const query = "summary";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test05l
  );
}
function condition_test05l(node) {
  node.addEventListener("focus", (e) => {
    if (window.getComputedStyle(e.target).outline === "0") {
      return true;
    }
  });
  node.focus();
  setTimeout(() => {
  }, 2e3);
  return false;
}
function check_test_05m() {
  testChecker(
    "05-M",
    "nia05m",
    "nth",
    "yellow",
    "Présence de texte justifié [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-styles-ne-justifient-pas-le-texte' target='_blank'>Opquast 186</a>]",
    test05m
  );
}
function test05m(color, destination, nomenclature) {
  const query = "p";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test05m
  );
}
function condition_test05m(node) {
  return Boolean(
    isItemVisible(node) && node.style.textAlign === "justify"
  );
}
function check_test_05n() {
  testChecker(
    "05-N",
    "nia05n1",
    "nth",
    "yellow",
    "Présence de titre non-pertinent car trop court.",
    test05n1
  );
  testChecker(
    "05-N",
    "nia05n2",
    "nth",
    "yellow",
    "Présence de titre en majuscule [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-mises-en-majuscules-a-des-fins-decoratives-sont-effectuees-a-laide-des-styles' target='_blank'>Opquast 187</a>]",
    test05n2
  );
}
function test05n1(color, destination, nomenclature) {
  const query = "h1,h2,h3,h4,h5,h6";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test05n1
  );
}
function condition_test05n1(node) {
  const item = cleanNode(node).textContent.trim() || "";
  if (item === "FAQ") {
    return false;
  }
  return Boolean(
    isItemVisible(node) && item.replace(/  |\r\n|\n|\r/gm, "").length <= 3 && !node.querySelector('img:not([alt=""])')
  );
}
function test05n2(color, destination, nomenclature) {
  const query = "h1,h2,h3,h4,h5,h6";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test05n2
  );
}
function condition_test05n2(node) {
  const item = cleanNode(node).textContent.trim() || "";
  if (item === "RGPD") {
    return false;
  }
  return Boolean(
    isItemVisible(node) && hasVisibleContent(node) && item.replace(/  |\r\n|\n|\r/gm, "").length > 3 && isUpperCase(item)
  );
}
function check_test_05o() {
  if (!filter.only_redactor && pageSettings.isSearchLogic && pageSettings.isAEM) {
    const nia05o_isSearch = document.getElementById("mainSearch");
    if (nia05o_isSearch) {
      testChecker(
        "05-0",
        "",
        "nc",
        "red",
        "La page des résultats de recherche doit indiquer le nombre de résultats [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/la-page-des-resultats-de-recherche-indique-le-nombre-de-resultats-le-nombre-de-pages-de-resultats-et-le-nombre-de-resultats-par-page' target='_blank'>Opquast 13</a>]",
        test05o1
      );
      testChecker(
        "05-0",
        "",
        "nth",
        "yellow",
        "Présence de filtre recommandé sur les listes de résultats de recherche",
        test05o2
      );
      testChecker(
        "05-0",
        "nia05o3",
        "dev",
        "red",
        "Présence de tag non traduit dans les filtres de recherche",
        test05o3
      );
      testChecker(
        "05-0",
        "nia05o4",
        "dev",
        "red",
        "Présence de tag non traduit dans les filtres de recherche",
        test05o4
      );
    }
  }
}
function test05o1() {
  const nia05o_searchCount = document.querySelector(".search-meta-count");
  return !nia05o_searchCount || !isItemVisible(nia05o_searchCount);
}
function test05o2() {
  const nia05o_searchCount = document.querySelector(".search-meta-count");
  const nia05o_filter = document.querySelector(
    ".search-filters, .filters-content"
  );
  return Boolean(
    nia05o_searchCount && isItemVisible(nia05o_searchCount) && parseFloat(nia05o_searchCount.textContent) > 100 && (!nia05o_filter || nia05o_filter.textContent && nia05o_filter.textContent.length === 0)
  );
}
function test05o3(color, destination, nomenclature) {
  const query = '.filters li.filter-item button[aria-label^="Projects_tags"]';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test05o4(color, destination, nomenclature) {
  const query = '.filters details summary span[role="heading"]';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test05o4
  );
}
function condition_test05o4(node) {
  return Boolean(node.textContent.indexOf("projects_tags") === 0);
}
function check_test_05p() {
  testChecker(
    "05-P",
    "nia05p",
    "nth",
    "yellow",
    "Présence de sections vides (ou avec un contenu assimilable à vide) [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-9-1' target='_blank'>RAWeb 8.9.1</a>]",
    test05p
  );
}
function test05p(color, destination, nomenclature) {
  const query = filter.only_redactor ? "main section.cmp-section" : "section.cmp-section";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test05p
  );
}
function condition_test05p(node) {
  return Boolean(
    node && node.closest("[lang]") && sanitizeText(
      node.innerText,
      node.closest("[lang]").getAttribute("lang")
    ) === "" && isItemVisible(node) && node.querySelectorAll("img,iframe").length === 0
  );
}
function check_test_05q() {
  if (!filter.only_nc) {
    testChecker(
      "05-Q",
      "test05q1",
      "nth",
      "yellow",
      "Le lien sur le logo redirige vers la page d’accueil et possède un attribut title respectant la nomenclature suivante : « XXX – Accueil »",
      test05q1
    );
    testChecker(
      "05-Q",
      "test05q2",
      "nth",
      "yellow",
      "Pas d'indication du mot 'logo' dans le texte alt du logo",
      test05q2
    );
    testChecker(
      "05-Q",
      "test05q3",
      "man",
      "yellow",
      "Si du texte est présent sur le logo, veuillez saisir un texte alt",
      test05q3
    );
  }
}
function test05q1(color, destination, nomenclature) {
  const query = 'html[lang="fr"] header .logo a';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test05q1
  );
}
function condition_test05q1(node) {
  let flag = !node.hasAttribute("href");
  let found = false;
  if (node.getAttribute("href") && !node.getAttribute("href").includes("fr.html") && flag === false) {
    for (let j = 0; j < homePageException.length; j++) {
      if (homePageException[j].substring(homePageException[j].indexOf("//")) === node.getAttribute("href")) {
        found = true;
        break;
      }
    }
    if (found === false) {
      flag = true;
    }
  }
  return flag;
}
function test05q2(color, destination, nomenclature) {
  const query = 'html[lang="fr"] header .logo a';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test05q2
  );
}
function condition_test05q2(node) {
  return Boolean(
    node && node.getAttribute("href") && node.getAttribute("href").includes("fr.html") && node.getAttribute("title") && (!node.getAttribute("title").includes("- Accueil") || node.getAttribute("title").includes("logo"))
  );
}
function test05q3(color, destination, nomenclature) {
  const query = 'html[lang="fr"] header .logo a';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test05q3
  );
}
function condition_test05q3(node) {
  const img = node.querySelector("img");
  const tagline = node.parentElement ? node.parentElement.querySelector(".logo-tagline") : "";
  return Boolean(
    img && img.getAttribute("alt") && img.getAttribute("alt") === "" && (tagline === "" || tagline.innerText === "")
  );
}
function check_test_05r() {
  if (pageSettings.isCTIE) {
    testChecker(
      "05-R",
      "",
      "man",
      "yellow",
      "Vérifier que le titre de l'onglet respecte la nomenclature du CTIE",
      test05r
    );
  }
}
function test05r() {
  return !document.getElementsByTagName("title")[0].innerText.includes("Luxembourg");
}
function check_test_05s() {
  if (!filter.only_redactor && pageSettings.isCTIE && !pageSettings.isPreview) {
    testChecker(
      "05-S",
      "",
      "man",
      "yellow",
      "Vérifier que l'URL respecte bien le formalisme des noms de domaine de l'état",
      test05s
    );
  }
}
function test05s() {
  return !(currentUrl.includes("public.lu") || currentUrl.includes("mae.lu") || currentUrl.includes("ctie.lu") || currentUrl.includes("gouvernement.lu"));
}
function check_test_05t() {
  if (!filter.only_redactor) {
    testChecker(
      "05-T",
      "nia05t",
      "dev",
      "yellow",
      "Absence de balise de texte autour d'un texte",
      test05t
    );
  }
}
function test05t(color, destination, nomenclature) {
  const query = "div:not(.ol-scale-line-inner), section";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test05t
  );
}
function condition_test05t(node) {
  let nia05t_flag = false;
  let nia05t_sanitizeText;
  if (node && isItemVisible(node) && node.childNodes && node.childNodes.length > 0) {
    for (let i = 0; i < node.childNodes.length; i++) {
      if (node.childNodes[i].nodeName === "#text") {
        if (node.childNodes[i].textContent && node.childNodes[i].textContent.trim() !== "") {
          nia05t_sanitizeText = sanitizeText(
            node.childNodes[i].textContent,
            null
          );
          if (nia05t_sanitizeText !== "") {
            nia05t_flag = true;
            break;
          }
        }
      }
    }
  }
  return Boolean(nia05t_flag);
}
function check_part_05() {
  if (filter.debug_flag) console.log("05 Element Obligatoire");
  check_test_05a();
  check_test_05b();
  check_test_05c();
  check_test_05d();
  check_test_05e();
  check_test_05f();
  check_test_05g();
  check_test_05h();
  check_test_05i();
  check_test_05j();
  check_test_05k();
  check_test_05l();
  check_test_05m();
  check_test_05n();
  check_test_05o();
  check_test_05p();
  check_test_05q();
  check_test_05r();
  check_test_05s();
  check_test_05t();
}
function check_test_06a() {
  if (!filter.only_redactor) {
    testChecker(
      "06-A",
      "nia06a",
      "dev",
      "red",
      "Vérifier qu'il n'y a pas de role sur les container de liste [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-3-1' target='_blank'>RAWeb 9.3.1</a>]",
      test06a
    );
  }
}
function test06a(color, destination, nomenclature) {
  const query = 'ul[role]:not([role="list"]):not([role="listbox"]),ol[role]:not([role="list"]):not([role="tablist"]),li[role]:not([role="listitem"]):not([role="option"]):not([role="presentation"]),dl[role]:not([role="listitem"])';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test06a
  );
}
function condition_test06a(node) {
  return Boolean(
    isItemVisible(node) && !(node.tagName === "LI" && node.getAttribute("role") === "tab" && node.parentElement && node.parentElement.getAttribute("role") === "tablist" && (node.parentElement.tagName === "UL" || node.parentElement.tagName === "OL") && (node.getAttribute("tabindex") === "0" && node.getAttribute("aria-selected") === "true" || node.getAttribute("tabindex") === "-1" && node.getAttribute("aria-selected") !== "true"))
  );
}
function check_test_06b() {
  testChecker(
    "06-B",
    "nia06b",
    "nc",
    "red",
    "Présence d'un élement non autorisé dans une liste [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-3-1' target='_blank'>RAWeb 9.3.1</a>]",
    test06b
  );
}
function test06b(color, destination, nomenclature) {
  const query = ':where(ul,ol,[role="list"]) > *:not(li):not([role="listitem"]):not(.checkA11YSpan):not([role="presentation"])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_test_06c() {
  if (!filter.only_redactor) {
    testChecker(
      "06-C",
      "nia06c1",
      "dev",
      "yellow",
      "Il y a un problème avec la structuration du header, il lui manque le role=banner [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]",
      test06c1
    );
    testChecker(
      "06-C",
      "nia06c2",
      "dev",
      "red",
      "Il n'y a aucun element header visible [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]",
      test06c2
    );
    testChecker(
      "06-C",
      "nia06c3",
      "dev",
      "red",
      "Il y a un plusieurs elements header visible [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]",
      test06c3
    );
    testChecker(
      "06-C",
      "nia06c4",
      "dev",
      "red",
      "Il y a un problème avec la structuration du header, celui-ci ne doit pas être enfant de la balise main [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]",
      test06c4
    );
  }
}
function test06c1(color, destination, nomenclature) {
  const query = 'header.page-header:not([role="banner"])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test06c2() {
  const query = 'header[role="banner"]';
  return checkIfNoneItemMatch(query);
}
function test06c3(color, destination, nomenclature) {
  const query = 'header[role="banner"]';
  return checkIfQueryMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test06c3,
    true
  );
}
function condition_test06c3(nodes) {
  let counter = 0;
  if (nodes && nodes.length > 1) {
    for (let i = 0; i < nodes.length; i++) {
      if (isItemVisible(nodes[i])) {
        counter++;
      }
    }
  }
  return counter > 1;
}
function test06c4(color, destination, nomenclature) {
  const query = 'main header[role="banner"]';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_test_06d() {
  if (pageSettings.isCTIE && !filter.only_redactor) {
    testChecker(
      "06-D",
      "",
      "dev",
      "yellow",
      "Il y a un problème avec la structuration de la navigation principale [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]",
      test06d
    );
  }
}
function test06d() {
  const query = 'nav.page-headernav[role="navigation"],nav.headernav[role="navigation"],nav#headernav[role="navigation"]';
  return checkIfNoneVisibleItemMatch(query);
}
function check_test_06e() {
  if (!filter.only_redactor) {
    testChecker(
      "06-E",
      "nia06e1",
      "nc",
      "red",
      "Présence d'une zone de navigation sans attribut role",
      test06e1
    );
  }
  if (!filter.only_redactor && pageSettings.isAEM) {
    testChecker(
      "06-E",
      "nia06e2",
      "nc",
      "red",
      "Présence d'une balise nav utilisé en dehors d'une zone de navigation [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]",
      test06e2
    );
  }
}
function test06e1(color, destination, nomenclature) {
  const query = 'nav:not([role="navigation"])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test06e2(color, destination, nomenclature) {
  const query = "*:not(.page-langs):not(.right-part):not(.cmp-directory):not(.top-container):not(.skiplinks):not(.navigation-wrapper) > nav:not(.page-headernav):not(.page-headernavmobile):not(.page-headernav-desk):not(.automaticnav):not(.cmp-breadcrumb):not(.page-localnav):not(.cmp-backtonav):not(.cmp-breadcrumb-demarches):not(.topnav):not(.page-bloub):not(#headernav):not(#headernav-desktop):not(.headernav-detached):not(.headernav):not(.headernav-fixed):not(.page-subheadernav)";
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_test_06f() {
  if (!filter.only_redactor) {
    testChecker(
      "06-F",
      "nia06f1",
      "nth",
      "orange",
      "Présence d'une zone de contenu principal sans attribut role",
      test06f1
    );
  }
  testChecker(
    "06-F",
    "nia06f2",
    "nc",
    "red",
    "Présence de plusieurs zones de contenu principal [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]",
    test06f2
  );
}
function test06f1(color, destination, nomenclature) {
  const query = 'main:not([role="main"])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test06f2(color, destination, nomenclature) {
  const query = 'main,[role="main"]';
  return checkIfQueryMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test06f2,
    true
  );
}
function condition_test06f2(nodes) {
  let counter = 0;
  if (nodes && nodes.length > 1) {
    for (let i = 0; i < nodes.length; i++) {
      if (isItemVisible(nodes[i])) {
        counter++;
      }
    }
  }
  return counter > 1;
}
function check_test_06g() {
  if (!filter.only_redactor && pageSettings.isAEM) {
    testChecker(
      "06-G",
      "nia06g1",
      "nth",
      "red",
      "Présence d'une zone de pied de page sans attribut role",
      test06g1
    );
  }
  if (!filter.only_redactor && pageSettings.isAEM) {
    testChecker(
      "06-G",
      "",
      "dev",
      "yellow",
      "Il y a un problème avec la structuration du footer [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]",
      test06g2
    );
  }
  if (!filter.only_redactor && pageSettings.isAEM) {
    testChecker(
      "06-G",
      "nia06g3",
      "dev",
      "yellow",
      "Absence d'un titre principal pour le footer",
      test06g3
    );
  }
  if (!filter.only_redactor && pageSettings.isAEM) {
    testChecker(
      "06-G",
      "",
      "nc",
      "red",
      "Absence de la déclaration d'accessibilité dans le footer",
      test06g4
    );
    testChecker(
      "06-G",
      "nia06g5",
      "nc",
      "red",
      "Les liens du footer doivent être structurés sous forme de liste",
      test06g5
    );
  }
}
function test06g1(color, destination, nomenclature) {
  const query = 'footer.page-footer:not([role="contentinfo"])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test06g2() {
  const query = 'footer.page-footer[role="contentinfo"]';
  return checkIfNoneVisibleItemMatch(query);
}
function test06g3(color, destination, nomenclature) {
  const query = 'footer h3, footer [role="heading"][aria-level="3"]';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test06g3
  );
}
function condition_test06g3(node) {
  return Boolean(
    isItemVisible(node) && node.closest("footer") && node.closest("footer").querySelector('h2,[role="heading"][aria-level="2"]') === null
  );
}
function test06g4() {
  const query = 'footer a[href$="accessibilite.html"], footer a[href$="barrierefreiheit.html"], footer a[href$="accessibility.html"]';
  return checkIfNoneVisibleItemMatch(query);
}
function test06g5(color, destination, nomenclature) {
  const query = 'footer a[href$="accessibilite.html"], footer a[href$="barrierefreiheit.html"], footer a[href$="accessibility.html"]';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test06g5
  );
}
function condition_test06g5(node) {
  return Boolean(isItemVisible(node) && !node.closest("ul"));
}
function check_test_06h() {
  testChecker(
    "06-H",
    "nia06h1",
    "nc",
    "red",
    "Chaque cadre doit avoir un titre  [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-2-1-1' target='_blank'>RAWeb 2.1.1</a>]",
    test06h1
  );
  if (!filter.only_redactor) {
    testChecker(
      "06-H",
      "nia06h2",
      "nc",
      "red",
      "Présence de cadre avec attribut noresize",
      test06h2
    );
    testChecker(
      "06-H",
      "nia06h3",
      "dev",
      "orange",
      "Présence de cadre avec attribut obsolète scrolling=no",
      test06h3
    );
    testChecker(
      "06-H",
      "nia06h4",
      "nc",
      "red",
      "Présence de cadre vide",
      test06h4
    );
    testChecker(
      "06-H",
      "nia06h5",
      "nc",
      "red",
      "Présence de cadre avec attribut de présentation (height, width)",
      test06h5
    );
  }
}
function test06h1(color, destination, nomenclature) {
  const query = "frame:not([title]),iframe:not([title])";
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test06h2(color, destination, nomenclature) {
  const query = "iframe[noresize]";
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test06h3(color, destination, nomenclature) {
  const query = "iframe[scrolling=no]";
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test06h4(color, destination, nomenclature) {
  const query = 'iframe:not([src]),iframe[src=""]';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test06h5(color, destination, nomenclature) {
  const query = "iframe[width], iframe[height]";
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
const nia06j2_regex = /^(- )/g;
function check_test_06j() {
  testChecker(
    "06-J",
    "nia06j1",
    "nc",
    "orange",
    "Présence d'une liste à un seul élément [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-3-1' target='_blank'>RAWeb 9.3.1</a>]",
    test06j1
  );
  testChecker(
    "06-J",
    "nia06j2",
    "nth",
    "yellow",
    "Présence d'une liste simulée avec des tirets",
    test06j2
  );
}
function test06j1(color, destination, nomenclature) {
  const query = '*:not(.geoportail-addresses):not(.subnav-item) > ul:not(.cmp-focus-list):not(.article-metas),ol,[role="list"]';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test06j1
  );
}
function condition_test06j1(node) {
  return Boolean(
    isItemVisible(node) && node.querySelectorAll('li,[role="listitem"]').length < 2
  );
}
function test06j2(color, destination, nomenclature) {
  const query = "p";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test06j2
  );
}
function condition_test06j2(node) {
  return Boolean(
    isItemVisible(node) && nia06j2_regex.test(node.innerText.trim())
  );
}
function check_test_06k() {
  if (!filter.only_redactor) {
    testChecker(
      "06-K",
      "nia06k",
      "nth",
      "yellow",
      "Présence d'abréviation non explicitée",
      test06k
    );
  }
}
function test06k(color, destination, nomenclature) {
  const query = "abbr:not([title])";
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_test_06l() {
  if (pageSettings.isAEM && !filter.only_redactor) {
    testChecker(
      "06-L",
      "nia06l1",
      "dev",
      "orange",
      "Présence d'accordéon sans structure details/summary",
      test06l1
    );
    testChecker(
      "06-L",
      "nia06l2",
      "dev",
      "orange",
      "Présence d'accordéon avec qqch d'autre qu'une balise Hx dans la balise summary [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8.2.1' target='_blank'>RAWeb 8.2.1</a>]",
      test06l2
    );
  }
}
function test06l1(color, destination, nomenclature) {
  const query = ".cmp-accordion > *:not(details):not(span.checkA11YSpan):not(span.cmp-accordionItem__icon), .cmp-accordion > details > *:not(summary):not(span.checkA11YSpan):not(.cmp-accordion__panel):not(.accordion-local-toggle), .filters-content .filter:not(details):not(fieldset), .filters-content > details > *:not(summary):not(.filter-content)";
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test06l2(color, destination, nomenclature) {
  const query = 'details > summary:not(.cmp-hours__summary) > *:not(h1):not(h2):not(h3):not(h4):not(h5):not(h6):not([role="heading"]):not(svg[aria-hidden="true"]):not(span.checkA11YSpan):not(span.cmp-accordionItem__icon):not(.filter-subtitle)';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_test_06m() {
  if (pageSettings.isAEM && !filter.only_redactor) {
    testChecker(
      "06-M",
      "nia06m1",
      "dev",
      "orange",
      "Présence d'une carte Geoportail sans carte visible",
      test06m1
    );
    testChecker(
      "06-M",
      "nia06m2",
      "nc",
      "red",
      "Présence d'une carte Geoportail sans adresse visible",
      test06m2
    );
    testChecker(
      "06-M",
      "nia06m3",
      "dev",
      "orange",
      "Présence d'une liste d'adresse Geoportail n'utilisant pas une structure de liste 'ul' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-3-1' target='_blank'>RAWeb 9.3.1</a>]",
      test06m3
    );
    if (!filter.only_nc) {
      testChecker(
        "06-M",
        "nia06m4",
        "nth",
        "yellow",
        "Présence d'une adresse Geoportail unique présent dans une structure de liste 'ul' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-3-1' target='_blank'>RAWeb 9.3.1</a>]",
        test06m4
      );
    }
    testChecker(
      "06-M",
      "nia06m5",
      "dev",
      "orange",
      "Présence d'une liste d'info de contact dans une adresse Geoportail n'utilisant pas une structure de liste 'dl' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-3-3' target='_blank'>RAWeb 9.3.3</a>]",
      test06m5
    );
    if (!filter.only_nc) {
      testChecker(
        "06-M",
        "nia06m6",
        "dev",
        "yellow",
        "Les différents éléments d'une adresse Geoportail doivent être regroupée dans une balise 'p' ou 'dd'",
        test06m6
      );
    }
  }
}
function test06m1(color, destination, nomenclature) {
  const query = ".geoportail";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test06m1
  );
}
function condition_test06m1(node) {
  if (isItemVisible(node)) {
    const map = node.querySelectorAll(".geoportail-map");
    return Boolean(!map || map.length !== 1 || !isAtLeastOneItemVisible(map));
  }
  return false;
}
function test06m2(color, destination, nomenclature) {
  const query = ".geoportail";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test06m2
  );
}
function condition_test06m2(node) {
  if (isItemVisible(node)) {
    const adresses = node.querySelectorAll(".geoportail-addresses .vcard");
    return Boolean(
      !adresses || adresses.length === 0 || !isAtLeastOneItemVisible(adresses)
    );
  }
  return false;
}
function test06m3(color, destination, nomenclature) {
  const query = ".geoportail";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test06m3
  );
}
function condition_test06m3(node) {
  if (isItemVisible(node)) {
    const adresses = node.querySelectorAll(".geoportail-addresses .vcard");
    return Boolean(
      adresses && adresses.length > 1 && adresses[0].parentElement && adresses[0].parentElement.tagName !== "LI"
    );
  }
  return false;
}
function test06m4(color, destination, nomenclature) {
  const query = ".geoportail";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test06m4
  );
}
function condition_test06m4(node) {
  if (isItemVisible(node)) {
    const adresses = node.querySelectorAll(".geoportail-addresses .vcard");
    return Boolean(
      adresses && adresses.length === 1 && adresses[0].parentElement && adresses[0].parentElement.tagName === "LI"
    );
  }
  return false;
}
function test06m5(color, destination, nomenclature) {
  const query = ".geoportail";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test06m5
  );
}
function condition_test06m5(node) {
  let flag = false;
  if (isItemVisible(node)) {
    const adresses = node.querySelectorAll(".geoportail-addresses .vcard");
    if (adresses && adresses.length > 0) {
      const contact = adresses[0].querySelectorAll("dl:not(.cmp-hours__list)");
      if (!contact || contact.length !== 1 || !isAtLeastOneItemVisible(contact)) {
        flag = true;
      }
    }
  }
  return flag;
}
function test06m6(color, destination, nomenclature) {
  const query = ".geoportail";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test06m6
  );
}
function condition_test06m6(node) {
  let flag = false;
  if (isItemVisible(node)) {
    const adresses = node.querySelectorAll(".geoportail-addresses .vcard");
    if (adresses && adresses.length > 0) {
      const streetAdress = adresses[0].querySelectorAll(
        'span[itemprop="streetAddress"]'
      );
      if (!streetAdress || streetAdress.length !== 1 || !isAtLeastOneItemVisible(streetAdress) || streetAdress[0].parentElement && streetAdress[0].parentElement.tagName !== "P" && streetAdress[0].parentElement.tagName !== "DD") {
        flag = true;
      }
    }
  }
  return flag;
}
function check_test_06n() {
  if (pageSettings.isAEM && !filter.only_redactor) {
    testChecker(
      "06-N",
      "nia06n1",
      "dev",
      "orange",
      "Le sommaire doit être structuré dans une balise 'nav' avec un role='navigation' et un attribut aria-label",
      test06n1
    );
    if (document.querySelector(".page-bloub")) {
      testChecker(
        "06-N",
        "",
        "dev",
        "red",
        "Le sommaire ne contient pas d'élément de navigation",
        test06n2
      );
    }
    if (document.querySelector(".page-bloub a.is-active")) {
      testChecker(
        "06-N",
        "",
        "dev",
        "orange",
        "Dans le sommaire, le lien ancre vers la section en cours de consultation doit être identifié par l’attribut aria_current=’true’ ou 'step' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-10-9-1' target='_blank'>RAWeb 10.9.1</a>]",
        test06n3
      );
    }
  }
}
function test06n1(color, destination, nomenclature) {
  const query = ".page-bloub:not(nav), .page-bloub:not([role=navigation]), .page-bloub:not([aria-label])";
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test06n2() {
  const query = ".page-bloub ul > li > a";
  return checkIfNoneVisibleItemMatch(query);
}
function test06n3() {
  const query = '.page-bloub ul > li > a.is-active[aria-current="true"], .page-bloub ul > li > a.is-active[aria-current="step"]';
  return checkIfNoneVisibleItemMatch(query);
}
function check_test_06o() {
  if (pageSettings.isAEM) {
    testChecker(
      "06-O",
      "nia06o1",
      "dev",
      "yellow",
      "Absence de titre sur un composant focus",
      test06o1
    );
    if (!filter.only_redactor) {
      testChecker(
        "06-O",
        "nia06o2",
        "dev",
        "orange",
        "Les items du focus doivent être dans une seule et même liste 'ul' (exception si 1 seul item)",
        test06o2
      );
      testChecker(
        "06-O",
        "nia06o3",
        "dev",
        "orange",
        "S’il n’y a qu’un seul item dans le focus celui-ci ne doit pas être liste 'ul')",
        test06o3
      );
      testChecker(
        "06-O",
        "nia06o4",
        "dev",
        "orange",
        "Si l’intégralité des items ne contiennent qu’un seul élément textuel celui-ci sera dans un 'p'",
        test06o4
      );
      testChecker(
        "06-O",
        "nia06o5",
        "dev",
        "orange",
        "Le premier élément informatif dans le DOM de chaque item doit être le titre",
        test06o5
      );
      testChecker(
        "06-O",
        "nia06o6",
        "dev",
        "orange",
        "Les items du focus doivent avoir un contenu",
        test06o6
      );
      if (!filter.only_nc) {
        testChecker(
          "06-O",
          "nia06o7",
          "man",
          "yellow",
          "Vérifier s’il est normal d’avoir un focus-on-top comme seul élément du focus",
          test06o7
        );
      }
    }
  }
}
function test06o1(color, destination, nomenclature) {
  const query = ".cmp-focus:not(:has(:is(h2, h3, h4, h5)))";
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test06o2(color, destination, nomenclature) {
  const query = ".cmp-focus";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test06o2
  );
}
function condition_test06o2(node) {
  const lists = node.querySelectorAll("ul, ul ul");
  const items = node.querySelectorAll(
    ".cmp-focus-list-item, .cmp-focus-top, .search-result"
  );
  return !(lists && items && (lists.length === 0 && items.length === 0 || lists.length === 1 && items.length > 1 || lists.length === 0 && items.length === 1 || lists.length === 1 && items.length === 1));
}
function test06o3(color, destination, nomenclature) {
  const query = ".cmp-focus";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test06o3
  );
}
function condition_test06o3(node) {
  const lists = node.querySelectorAll("ul, ul ul");
  const items = node.querySelectorAll(
    ".cmp-focus-list-item, .cmp-focus-top, .search-result"
  );
  return lists && items && lists.length === 1 && items.length === 1;
}
function test06o4(color, destination, nomenclature) {
  const query = ".cmp-focus";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test06o4
  );
}
function condition_test06o4(node) {
  const items = node.querySelectorAll(
    ".cmp-focus-list-item, .cmp-focus-top, .search-result"
  );
  let counter = 0;
  if (items) {
    for (let j = 0; j < items.length; j++) {
      const itemTitle = items[j].querySelector(":is(h3, h4, h5, h6)");
      const itemContent = sanitizeText(cleanNode(items[j]).textContent, "fr");
      if (itemTitle) {
        const itemTitleCleaned = cleanNode(itemTitle);
        if (itemContent == sanitizeText(itemTitleCleaned.textContent, "fr")) {
          counter++;
        }
      }
    }
    if (counter > 0 && counter === items.length) {
      return true;
    }
  }
  return false;
}
function test06o5(color, destination, nomenclature) {
  const query = ".cmp-focus";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test06o5
  );
}
function condition_test06o5(node) {
  const items = node.querySelectorAll(
    ".cmp-focus-list-item, .cmp-focus-top, .search-result"
  );
  let flag = false;
  if (items) {
    for (let j = 0; j < items.length; j++) {
      const itemTitle = items[j].querySelector(":is(h3, h4, h5, h6)");
      const itemContent = sanitizeText(cleanNode(items[j]).textContent, "fr");
      if (itemTitle) {
        const itemTitleCleaned = cleanNode(itemTitle);
        if (itemContent !== sanitizeText(itemTitleCleaned.textContent, "fr") && itemContent.indexOf(
          sanitizeText(itemTitleCleaned.textContent, "fr")
        ) !== 0) {
          if (filter.debug_flag) {
            console.log("content : " + itemContent);
            console.log(
              "title   : " + sanitizeText(itemTitleCleaned.textContent, "fr")
            );
          }
          flag = true;
          setItemOutline(items[j], "orange", "nia06o5", "06-O");
        }
      }
    }
  }
  return flag;
}
function test06o6(color, destination, nomenclature) {
  const query = ".cmp-focus";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test06o6
  );
}
function condition_test06o6(node) {
  const items = node.querySelectorAll(
    ".cmp-focus-list-item, .cmp-focus-top, .search-result"
  );
  let flag = false;
  if (items) {
    for (let j = 0; j < items.length; j++) {
      const itemContent = sanitizeText(cleanNode(items[j]).textContent, "fr");
      if (itemContent === "") {
        flag = true;
        setItemOutline(items[j], "orange", "nia06o6", "06-O");
      }
    }
  }
  return flag;
}
function test06o7(color, destination, nomenclature) {
  const query = ".cmp-focus";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test06o7
  );
}
function condition_test06o7(node) {
  const items = node.querySelectorAll(
    ".cmp-focus-list-item, .cmp-focus-top, .search-result"
  );
  return items && items[0] && items[0].classList.contains("cmp-focus-top") && items.length === 1;
}
function check_test_06p() {
  if (!filter.only_redactor && pageSettings.isAEM) {
    testChecker(
      "06-P",
      "nia06p1",
      "dev",
      "orange",
      "Les items du grid doivent être structuré sous forme de liste (ul, ol ou dl)",
      test06p1
    );
    testChecker(
      "06-P",
      "nia06p2",
      "dev",
      "orange",
      "Le premier élément informatif dans le DOM de chaque item doit être le titre (par exemple h3)",
      test06p2
    );
    testChecker(
      "06-P",
      "nia06p3",
      "dev",
      "orange",
      "Si l’intégralité des items ne contiennent qu’un seul élément textuel celui-ci sera dans une balise paragraphe 'p'",
      test06p3
    );
    testChecker(
      "06-P",
      "nia06p4",
      "dev",
      "orange",
      "Les items du grid doivent avoir un contenu",
      test06p4
    );
  }
}
function test06p1(color, destination, nomenclature) {
  const query = ".cmp-grid";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test06p1
  );
}
function condition_test06p1(node) {
  return node.tagName !== "UL" && node.tagName !== "OL" && node.tagName !== "DL";
}
function test06p2(color, destination, nomenclature) {
  const query = ".cmp-grid li, .cmp-grid dt";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test06p2
  );
}
function condition_test06p2(node) {
  const itemTitle = node.querySelector(":is(h3, h4, h5, h6)");
  if (itemTitle) {
    const itemContent = sanitizeText(cleanNode(node).textContent, "fr");
    const itemTitleSani = itemTitle ? sanitizeText(cleanNode(itemTitle).textContent, "fr") : "";
    if (itemContent.indexOf(itemTitleSani) !== 0) {
      if (filter.debug_flag) {
        console.log(itemContent);
        console.log(itemTitleSani);
      }
      return true;
    }
  }
  return false;
}
function test06p3(color, destination, nomenclature) {
  const query = ".cmp-grid";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test06p3
  );
}
function condition_test06p3(node) {
  const items = node.querySelectorAll("li,dt");
  let counter = 0;
  for (let i = 0; i < items.length; i++) {
    const itemTitle = items[i].querySelector(":is(h3, h4, h5, h6)");
    const itemContent = sanitizeText(cleanNode(items[i]).textContent, "fr");
    const itemTitleSani = itemTitle ? sanitizeText(cleanNode(itemTitle).textContent, "fr") : "";
    if (itemContent === itemTitleSani) {
      counter++;
    }
  }
  if (counter === items.length) {
    return true;
  }
  return false;
}
function test06p4(color, destination, nomenclature) {
  const query = ".cmp-grid li, .cmp-grid dt";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test06p4
  );
}
function condition_test06p4(node) {
  const itemContent = sanitizeText(cleanNode(node).textContent, "fr");
  const hasImgInfo = node.querySelector('img:not([alt=""])');
  return itemContent === "" && hasImgInfo === null;
}
function check_test_06q() {
  if (pageSettings.isAEM) {
    if (!filter.only_redactor) {
      testChecker(
        "06-Q",
        "nia06q1",
        "dev",
        "orange",
        "Vérifier les attributs role dans le système d'onglet",
        test06q1
      );
    }
    testChecker(
      "06-Q",
      "nia06q2",
      "dev",
      "orange",
      "Absence d'attribut aria-label sur le système d'onglet (à ajouter dans le cq_dialog)",
      test06q2
    );
    if (!filter.only_redactor) {
      testChecker(
        "06-Q",
        "nia06q3",
        "nth",
        "yellow",
        "Structurer idéalement les indicateurs d'onglet dans des éléments bouton avec un attribut role=’tab’ ainsi qu’un attribut aria_controls lié avec l’id de son contenu.",
        test06q3
      );
    }
    if (!filter.only_redactor) {
      testChecker(
        "06-Q",
        "nia06q4",
        "dev",
        "orange",
        "Chaque item d’onglet actif aura un attribut aria_selected=’true’, sinon il aura la valeur ‘false’ ainsi qu'un attribut tabindex='-1' dans le cas contraire.",
        test06q4
      );
    }
    if (!filter.only_redactor) {
      testChecker(
        "06-Q",
        "nia06q5",
        "dev",
        "orange",
        "Chaque contenu d’onglet sera dans un element possédant les attributs role=’tabpanel’, tabindex=’0’ et ainsi qu’un aria_labelledby faisant référence au titre de l’onglet.",
        test06q5
      );
    }
  }
}
function test06q1(color, destination, nomenclature) {
  const query = '.cmp-tabs > *:not([role="tablist"]):not([role="tabpanel"]), .cmp-tabs > [role="tablist"] > *:not([role="tab"])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test06q2(color, destination, nomenclature) {
  const query = '.cmp-tabs > [role="tablist"]:not([aria-label]):not([aria-labelledby])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test06q3(color, destination, nomenclature) {
  const query = '.cmp-tabs > [role="tablist"] > [role="tab"]:not(button), .cmp-tabs > [role="tablist"] > [role="tab"]:not([aria-controls])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test06q4(color, destination, nomenclature) {
  const query = '.cmp-tabs > [role="tablist"] > [role="tab"]:not([aria-selected]), .cmp-tabs > [role="tablist"] > [role="tab"][aria-selected=false]:not([tabindex="-1"])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test06q5(color, destination, nomenclature) {
  const query = '.cmp-tabs > [role="tablist"] > [role="tab"]:not([id]), .cmp-tabs > [role="tabpanel"]:not([aria-labelledby]), .cmp-tabs > [role="tabpanel"]:not([tabindex="0"])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_test_06r() {
  if (!filter.only_redactor && pageSettings.isAEM) {
    testChecker(
      "06-R",
      "",
      "man",
      "yellow",
      "Vérifier la présence du bouton de retour en haut de page (exception : page avec peu de contenu)",
      test06r1
    );
    testChecker(
      "06-R",
      "nia06r2",
      "dev",
      "yellow",
      "L’élément Back_to_Top doit être un lien ancre qui cible #top",
      test06r2
    );
    testChecker(
      "06-R",
      "nia06r3",
      "dev",
      "yellow",
      "L’élément Back_to_Top doit avoir un attribut title",
      test06r3
    );
  }
}
function test06r1() {
  const query = "a.back";
  return checkIfNoneItemMatch(query);
}
function test06r2(color, destination, nomenclature) {
  const query = 'a.back:not(:is([href="#top"],[href="#"]))';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test06r3(color, destination, nomenclature) {
  const query = 'a.back:not([title]), a.back[title=""]';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_test_06s() {
  if (!filter.only_redactor && !pageSettings.isHomepage && pageSettings.isAEM) {
    testChecker(
      "06-S",
      "",
      "dev",
      "orange",
      "Les pages secondaires doivent disposer d’un breadcrumb.",
      test06s1
    );
    testChecker(
      "06-S",
      "nia06s2",
      "dev",
      "orange",
      "Il manque l'attribut role sur la balise nav du breadcrumb.",
      test06s2
    );
    testChecker(
      "06-S",
      "nia06s3",
      "dev",
      "orange",
      "Il manque l'attribut aria-label sur la balise nav du breadcrumb.",
      test06s3
    );
    testChecker(
      "06-S",
      "nia06s4",
      "dev",
      "red",
      "Les liens du breadcrumb doivent être présenté dans une liste ul/ol.",
      test06s4
    );
    testChecker(
      "06-S",
      "nia06s5",
      "dev",
      "red",
      "Absence de l'attribut aria-current sur le dernier item du fils d'ariane --> Vérifier dans les propriétés de la page que celle-ci n'est pas cachée dans la navigation.",
      test06s5
    );
  }
}
function test06s1() {
  const query = "nav[id^=breadcrumb-], nav.cmp-breadcrumb";
  return checkIfNoneVisibleItemMatch(query);
}
function test06s2(color, destination, nomenclature) {
  const query = ':is(nav[id^=breadcrumb-], nav.cmp-breadcrumb):not([role="navigation"])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test06s3(color, destination, nomenclature) {
  const query = ":is(nav[id^=breadcrumb-], nav.cmp-breadcrumb):not([aria-label])";
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test06s4(color, destination, nomenclature) {
  const query = ":is(nav[id^=breadcrumb-], nav.cmp-breadcrumb) .cmp-breadcrumb__list > .cmp-breadcrumb__item:not(li)";
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test06s5(color, destination, nomenclature) {
  const query = ':is(nav[id^=breadcrumb-], nav.cmp-breadcrumb) .cmp-breadcrumb__list > .cmp-breadcrumb__item:not([aria-current="page"]):last-child > span:not([aria-current="page"])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_test_06t() {
  if (!filter.only_redactor && !pageSettings.isHomepage && pageSettings.isAEM && currentUrl.includes("/cart.html")) {
    testChecker(
      "06-T",
      "nia06t1",
      "nc",
      "red",
      "Le titre de la page doit reprendre le titre de l'étape du panier.",
      test06t1
    );
    testChecker(
      "06-T",
      "nia06t2",
      "dev",
      "orange",
      "Les différentes meta doivent être présentées sous forme de liste ('ul' ou 'dl')",
      test06t2
    );
    testChecker(
      "06-T",
      "nia06t3",
      "dev",
      "orange",
      "Liste de selection pour la quantité doit être liée au titre de la publication",
      test06t3
    );
    testChecker(
      "06-T",
      "nia06t4",
      "dev",
      "orange",
      "Présence d'un bouton radio hors d'une balise fieldset",
      test06t4
    );
    testChecker(
      "06-T",
      "nia06t5",
      "dev",
      "orange",
      "Un bouton radio ne devrait pas être seul",
      test06t5
    );
  }
}
function test06t1() {
  const nia06t1_h2 = document.querySelector(".basket h2");
  if (!nia06t1_h2 || !document.title.includes(nia06t1_h2.textContent)) {
    setItemOutline(nia06t1_h2, "red", "nia06t1", "06-T");
    return true;
  }
  return false;
}
function test06t2() {
  const nia06t2_nodes = document.querySelector(".basket-order-item-metas");
  if (nia06t2_nodes && nia06t2_nodes.nodeName !== "UL" && nia06t2_nodes.nodeName !== "DL") {
    setItemOutline(nia06t2_nodes, "orange", "nia06t2", "06-T");
    return true;
  }
  return false;
}
function test06t3() {
  const nia06t3_nodes = document.querySelector(
    ".basket-order-item-actions select.basket-order-item-qty"
  );
  if (nia06t3_nodes && (nia06t3_nodes.previousElementSibling.nodeName !== "LABEL" || !nia06t3_nodes.hasAttribute("aria-describedby"))) {
    setItemOutline(nia06t3_nodes, "orange", "nia06t3", "06-T");
    return true;
  }
  return false;
}
function test06t4() {
  const nia06t4_nodes = document.querySelector('.basket input[type="radio"]');
  if (nia06t4_nodes && nia06t4_nodes.closest('fieldset, [role="group"]') === null) {
    setItemOutline(nia06t4_nodes, "orange", "nia06t4", "06-T");
    return true;
  }
  return false;
}
function test06t5() {
  const nia06t4_nodes = document.querySelector('.basket input[type="radio"]');
  if (nia06t4_nodes && nia06t4_nodes.closest('fieldset, [role="group"]')) {
    const nia06t5_nodes = nia06t4_nodes.closest('fieldset, [role="group"]').querySelectorAll('input[type="radio"]');
    if (nia06t5_nodes && nia06t5_nodes.length < 2) {
      setItemOutline(nia06t4_nodes, "orange", "nia06t5", "06-T");
      return true;
    }
  }
  return false;
}
function check_test_06u() {
  if (!filter.only_redactor && pageSettings.isAEM) {
    testChecker(
      "06-U",
      "nia06u1",
      "dev",
      "orange",
      "Il manque l'attribut role sur la balise nav du localnav",
      test06u1
    );
    testChecker(
      "06-U",
      "nia06u2",
      "dev",
      "orange",
      "Il manque l'attribut aria-labelledby sur la balise nav du localnav",
      test06u2
    );
    testChecker(
      "06-U",
      "nia06u3",
      "dev",
      "red",
      "Le composant localnav doit avoir un titre Hn lié avec un couple aria-labelledby-id unique (celui-ci peut être visuellement masqué)",
      test06u3
    );
    testChecker(
      "06-U",
      "nia06u4",
      "dev",
      "red",
      "Le composant localnav doit contenir des items.",
      test06u4
    );
    testChecker(
      "06-U",
      "nia06u5",
      "nth",
      "yellow",
      "Le composant localnav doit idéalement contenir plusieurs items.",
      test06u5
    );
  }
}
function test06u1(color, destination, nomenclature) {
  const query = 'nav.page-localnav:not([role="navigation"])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test06u2(color, destination, nomenclature) {
  const query = "nav.page-localnav:not([aria-labelledby])";
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test06u3(color, destination, nomenclature) {
  const query = 'nav.page-localnav[aria-labelledby="localnav-title"] #localnav-title';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test06u3
  );
}
function condition_test06u3(node) {
  return Boolean(
    node && node.tagName !== "H2" && node.tagName !== "H3" && node.tagName !== "H4"
  );
}
function test06u4(color, destination, nomenclature) {
  const query = "nav.page-localnav";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test06u4
  );
}
function condition_test06u4(node) {
  return Boolean(
    isItemVisible(node) && (!node.querySelectorAll("ul li.nav-item") || node.querySelectorAll("ul li.nav-item").length === 0)
  );
}
function test06u5(color, destination, nomenclature) {
  const query = "nav.page-localnav";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test06u5
  );
}
function condition_test06u5(node) {
  return Boolean(
    isItemVisible(node) && node.querySelectorAll("ul li.nav-item") && node.querySelectorAll("ul li.nav-item").length === 1
  );
}
function check_part_06() {
  if (filter.debug_flag) console.log("06 Structure");
  check_test_06a();
  check_test_06b();
  check_test_06c();
  check_test_06d();
  check_test_06e();
  check_test_06f();
  check_test_06g();
  check_test_06h();
  check_test_06j();
  check_test_06k();
  check_test_06l();
  check_test_06m();
  check_test_06n();
  check_test_06o();
  check_test_06p();
  check_test_06q();
  check_test_06r();
  check_test_06s();
  check_test_06t();
  check_test_06u();
}
function check_test_07a() {
  if (!filter.only_redactor && pageSettings.isAEM) {
    testChecker(
      "07-A",
      "nia07a",
      "dev",
      "red",
      "Présence du bouton d'ouverture du menu en dehors de la balise nav.",
      test07a
    );
  }
}
function test07a(color, destination, nomenclature) {
  const query = 'button.anchor[data-destination^="#headernav"]:not(.anchor-close)';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test07a
  );
}
function condition_test07a(node) {
  return Boolean(node.closest("nav") === null);
}
function check_test_07b() {
  testChecker(
    "07-B",
    "nia07b1",
    "dev",
    "orange",
    "Aria-label absent de la région de recherche",
    test07b1
  );
  testChecker(
    "07-B",
    "nia07b2",
    "dev",
    "red",
    "Problème avec le placeholder de la recherche",
    test07b2
  );
  testChecker(
    "07-B",
    "nia07b3",
    "nth",
    "orange",
    "Problème avec la pertinence du titre de la recherche",
    test07b3
  );
  testChecker(
    "07-B",
    "nia07b4",
    "dev",
    "yellow",
    "Présence d'un role=search sur les éléments de recherche secondaire",
    test07b4
  );
  if (!filter.only_redactor && pageSettings.isAEM && pageSettings.isSearchLogic) {
    testChecker(
      "07-B",
      "nia07b5",
      "dev",
      "yellow",
      "Il est recommander de présenter les filtres avec une structure en accordéon details/summary ou dans des éléments fieldset",
      test07b5
    );
  }
  if (!filter.only_redactor && pageSettings.isAEM && pageSettings.isSearchLogic) {
    testChecker(
      "07-B",
      "",
      "dev",
      "orange",
      "Absence du nombre de resultat de la recherche",
      test07b6
    );
  }
  if (!filter.only_redactor && pageSettings.isAEM && pageSettings.isSearchLogic) {
    testChecker(
      "07-B",
      "nia07b7",
      "dev",
      "yellow",
      "Les résultats doivent être présentés sous forme d’une suite de balise 'article' ou 'li'",
      test07b7
    );
  }
  if (!filter.only_redactor) {
    testChecker(
      "07-B",
      "nia07b8",
      "dev",
      "red",
      "La pagination doit être structurée dans un élément 'nav'  avec le role=navigation et un aria_label",
      test07b8
    );
  }
  if (!filter.only_redactor) {
    testChecker(
      "07-B",
      "nia07b9",
      "dev",
      "red",
      "Les différents éléments de la pagination doivent être sous forme de liste (ul ou ol)",
      test07b9
    );
  }
  if (!filter.only_redactor && pageSettings.isAEM) {
    testChecker(
      "07-B",
      "nia07b10",
      "dev",
      "red",
      "Les item de la pagination doivent être dans une balise li et leur enfant posseder un aria-label pertinent",
      test07b10
    );
    testChecker(
      "07-B",
      "nia07b11",
      "dev",
      "red",
      "La page active de la pagination doit avoir un aria_current=‘page’",
      test07b11
    );
  }
}
function test07b1(color, destination, nomenclature) {
  const query = "role[search]:not([aria-label])";
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test07b2(color, destination, nomenclature) {
  const query = 'input[type="search"]';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test07b2
  );
}
function condition_test07b2(node) {
  return Boolean(
    isItemVisible(node) && node.hasAttribute("placeholder") && node.hasAttribute("title") && node.getAttribute("placeholder") !== node.getAttribute("title")
  );
}
function test07b3(color, destination, nomenclature) {
  const query = 'input[type="search"]';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test07b3
  );
}
function condition_test07b3(node) {
  return Boolean(
    isItemVisible(node) && node.getAttribute("title") && node.getAttribute("title").length < 15
  );
}
function test07b4(color, destination, nomenclature) {
  const query = 'main form[role="search"]:not([action$="recherche.html"]):not([aria-label="Globale"]):not([aria-label="Global"])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test07b5(color, destination, nomenclature) {
  const query = ".filters-content .filter:not(details):not(fieldset)";
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test07b6() {
  const query = ".search-meta-count";
  return checkIfNoneVisibleItemMatch(query);
}
function test07b7(color, destination, nomenclature) {
  const query = ".search-results .search-result > *:not(article):not(li)";
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test07b8(color, destination, nomenclature) {
  const query = 'nav:not([role="navigation"]) > :is(ol,ul).pagination, *:not(nav) > :is(ol,ul).pagination, nav:not([aria-label]) > :is(ol,ul).pagination';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test07b9(color, destination, nomenclature) {
  const query = "nav > .pagination:not(ol,ul)";
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test07b10(color, destination, nomenclature) {
  const query = "nav > .pagination:not(ol,ul)";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test07b10
  );
}
function condition_test07b10(node) {
  return Boolean(
    isItemVisible(node) && (node.tagName !== "LI" || !node.firstElementChild || node.firstElementChild.tagName === "A" && (!node.firstElementChild.hasAttribute("aria-label") || node.firstElementChild.getAttribute("aria-label").length < 4))
  );
}
function test07b11(color, destination, nomenclature) {
  const query = "nav > .pagination:not(ol,ul)";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test07b11
  );
}
function condition_test07b11(node) {
  return Boolean(
    isItemVisible(node) && node.hasAttribute("aria-current") && node.getAttribute("aria-current") === "page"
  );
}
function check_test_07c() {
  if (pageSettings.isAEM) {
    testChecker(
      "07-C",
      "nia07c",
      "nc",
      "red",
      "Présence de tooltip non accessible sur les résultats de recherches [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-10-13-1' target='_blank'>RAWeb 10.13.1</a>]",
      test07c
    );
  }
}
function test07c(color, destination, nomenclature) {
  const query = ".search-view";
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_test_07d() {
  if (!filter.only_redactor && pageSettings.isAEM) {
    testChecker(
      "07-D",
      "nia07d1",
      "nc",
      "red",
      "Absence de l'aria-label sur le menu de selection de langue (à ajouter dans le cqdialog)",
      test07d1
    );
    testChecker(
      "07-D",
      "nia07d2",
      "dev",
      "orange",
      "Faiblesse de la structure du menu de switch des langues : ne pas utiliser role=menu",
      test07d2
    );
    testChecker(
      "07-D",
      "nia07d3",
      "dev",
      "orange",
      "Les liens vers les versions linguistiques doivent avoir les attributs lang, hreflang et posséder un attribut title dont le contenu textuel est tel que : « de – Deutsch »",
      test07d3
    );
  }
}
function test07d1(color, destination, nomenclature) {
  const query = 'nav[id^="language-"]:not([aria-label]), div > ul.cmp-languagenavigation__group:not([aria-label])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test07d2(color, destination, nomenclature) {
  const query = '#page-langs ul[role="menu"] > li[role="none"]';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test07d3(color, destination, nomenclature) {
  const query = '.cmp-languagenavigation__group .cmp-languagenavigation__item-link:not([title*=" - "]),.cmp-languagenavigation__group .cmp-languagenavigation__item-link:not([lang]),.cmp-languagenavigation__group .cmp-languagenavigation__item-link:not([hreflang])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_test_07e() {
  if (!filter.only_redactor && pageSettings.isAEM) {
    testChecker(
      "07-E",
      "nia07e",
      "dev",
      "orange",
      "Traduction manquante dans le composant Multimedia Player",
      test07e
    );
  }
}
function test07e(color, destination, nomenclature) {
  const query = '.cmp-multiplayer .player_img img[alt="Lire la vidéo Youtube, voir légende ci-après"][lang]:not([lang="fr"])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
let nia07f_list21 = "", nia07f_list22 = "", nia07f_list23 = "", nia07f_list24 = "", nia07f_list31 = "", nia07f_list32 = "", nia07f_list33 = "", nia07f_list34 = "", nia07f_list41 = "", nia07f_list42 = "", nia07f_list43 = "", nia07f_list44 = "";
const nia07f_menu = document.querySelector(
  "nav.topnav > .page-headernav .navigation-container > ul.nav ,nav.page-headernav .navigation-container > ul.nav, nav.page-headernav-desk .navigation-container > ul.nav, nav.headernav-detached .navigation-container > ul.nav, .page-headernav > nav .navigation-container > ul.nav"
);
const nia07f_btnOpen = document.querySelector(
  ".topnav > button.anchor.anchor-scroll, .page-headernav > button.anchor.anchor-scroll, .page-headernavmobile > button.anchor.anchor-scroll"
);
const nia07f_btnClose = document.querySelector(
  '[aria-modal="true"] button.anchor-close, .anchor-destination.modal-menu button.anchor-close'
);
let nia07f_mobilElement = getMobilElement();
const nia07f_isModal = checkIfModal();
function check_test_07f() {
  if (!filter.only_redactor && pageSettings.isAEM) {
    testChecker(
      "07-F",
      "nia07f1",
      "dev",
      "orange",
      "Role navigation absent de la barre de navigation",
      test07f1
    );
    if (!filter.only_nc) {
      testChecker(
        "07-F",
        "nia07f2",
        "dev",
        "yellow",
        "Attribut Aria-label absent de la barre de navigation",
        test07f2
      );
    }
    init_test07f();
    testChecker(
      "07-F",
      "nia07f21",
      "dev",
      "orange",
      "Absence de lien pour se rendre à la page passerelle <span class='cy-hidden'>pour l'élément de menu n°" + nia07f_list21.slice(0, -1) + "</span>",
      test07f21
    );
    testChecker(
      "07-F",
      "nia07f22",
      "dev",
      "orange",
      "Absence de bouton pour déplier le sous-menu <span class='cy-hidden'>pour l'élément de menu n°" + nia07f_list22.slice(0, -1) + "</span>",
      test07f22
    );
    testChecker(
      "07-F",
      "nia07f23",
      "dev",
      "orange",
      "Un problème a été detecté <span class='cy-hidden'>pour l'élément de menu n°" + nia07f_list23.slice(0, -1) + "</span> : absence de sous-menu alors que la classe has-subnav est présente",
      test07f23
    );
    testChecker(
      "07-F",
      "nia07f24",
      "dev",
      "orange",
      "Un problème a été detecté <span class='cy-hidden'>pour l'élément de menu n°" + nia07f_list24.slice(0, -1) + "</span> : absence de l'attribut aria-expanded",
      test07f24
    );
    testChecker(
      "07-F",
      "nia07f31",
      "dev",
      "orange",
      "Un problème a été detecté <span class='cy-hidden'>pour l'élément de menu n°" + nia07f_list31.slice(0, -1) + "</span> : conflit sur le lien pour aller sur la page passerelle",
      test07f31
    );
    testChecker(
      "07-F",
      "nia07f32",
      "dev",
      "orange",
      "Un problème a été detecté <span class='cy-hidden'>pour l'élément de menu n°" + nia07f_list32.slice(0, -1) + "</span> : absence de bouton pour déplier le sous-menu",
      test07f32
    );
    testChecker(
      "07-F",
      "nia07f33",
      "dev",
      "orange",
      "Un problème a été detecté <span class='cy-hidden'>pour l'élément de menu n°" + nia07f_list33.slice(0, -1) + "</span> : absence de sous-menu alors que la classe has-subnav est présente",
      test07f33
    );
    testChecker(
      "07-F",
      "nia07f34",
      "dev",
      "orange",
      "Un problème a été detecté <span class='cy-hidden'>pour l'élément de menu n°" + nia07f_list34.slice(0, -1) + "</span> : absence de l'attribut aria-expanded",
      test07f34
    );
    testChecker(
      "07-F",
      "nia07f41",
      "dev",
      "orange",
      "Un problème a été detecté <span class='cy-hidden'>pour l'élément de menu n°" + nia07f_list41.slice(0, -1) + "</span> : absence de lien pour acceder aux pages passerelle",
      test07f41
    );
    testChecker(
      "07-F",
      "nia07f42",
      "dev",
      "orange",
      "Un problème a été detecté <span class='cy-hidden'>pour l'élément de menu n°" + nia07f_list42.slice(0, -1) + "</span> : remplacer les boutons par des liens de navigation",
      test07f42
    );
    testChecker(
      "07-F",
      "nia07f43",
      "dev",
      "orange",
      "Un problème a été detecté <span class='cy-hidden'>pour l'élément de menu n°" + nia07f_list43.slice(0, -1) + "</span> : un item du menu sans sous-menu contient une liste ul",
      test07f43
    );
    testChecker(
      "07-F",
      "nia07f44",
      "dev",
      "orange",
      "Un problème a été detecté <span class='cy-hidden'>pour l'élément de menu n°" + nia07f_list44.slice(0, -1) + "</span> : présence d'attributs aria-expanded ou aria-haspopup sur un item du menu",
      test07f44
    );
    if (!filter.only_nc) {
      testChecker(
        "07-F",
        "nia07f51",
        "dev",
        "yellow",
        "Absence de l'attribut aria-haspopup=dialog du bouton d'ouverture du menu",
        test07f51
      );
    }
    testChecker(
      "07-F",
      "nia07f52",
      "dev",
      "red",
      "Erreur dans la valeur de l'attribut aria-expanded du bouton d'ouverture du menu",
      test07f52
    );
    testChecker(
      "07-F",
      "nia07f53",
      "dev",
      "red",
      "Conflit dans le type d'ouverture du menu : Modal ou Disclosure ?",
      test07f53
    );
    testChecker(
      "07-F",
      "nia07f54",
      "dev",
      "red",
      "Conflit entre les attributs aria-haspopup et aria-expanded du bouton d'ouverture du menu",
      test07f54
    );
    testChecker(
      "07-F",
      "nia07f55",
      "dev",
      "red",
      "Vocalisation du menu caché en mobile",
      test07f55
    );
    if (nia07f_btnOpen && isItemVisible(nia07f_btnOpen)) {
      if (nia07f_mobilElement && !isItemVisible(nia07f_mobilElement)) {
        nia07f_btnOpen.click();
        nia07f_mobilElement = getMobilElement();
      }
      testChecker(
        "07-F",
        "nia07f56",
        "dev",
        "red",
        "Attention le texte du bouton d'ouverture du menu change à l'ouverture du menu cela ne devrai pas être le cas",
        test07f56
      );
      if (nia07f_isModal) {
        testChecker(
          "07-F",
          "nia07f62",
          "dev",
          "red",
          "Erreur dans la valeur de l'attribut aria-hidden du menu modal ouvert",
          test07f62
        );
        testChecker(
          "07-F",
          "nia07f63",
          "dev",
          "red",
          "Erreur dans la valeur de l'attribut aria-modal du menu modal ouvert",
          test07f63
        );
        testChecker(
          "07-F",
          "nia07f64",
          "dev",
          "red",
          "Erreur dans la valeur de l'attribut role du menu modal ouvert",
          test07f64
        );
        testChecker(
          "07-F",
          "nia07f65",
          "dev",
          "red",
          "Erreur dans la valeur de l'attribut aria-label du menu modal ouvert",
          test07f65
        );
        testChecker(
          "07-F",
          "nia07f66",
          "dev",
          "orange",
          "Le premier élément interactif de la fenêtre modale du menu doit être le button de fermeture",
          test07f66
        );
      } else {
        testChecker(
          "07-F",
          "nia07f70",
          "dev",
          "red",
          "Erreur dans la valeur de l'attribut aria-hidden du menu disclosure ouvert",
          test07f70
        );
        testChecker(
          "07-F",
          "nia07f71",
          "dev",
          "red",
          "Erreur dans la valeur de l'attribut aria-modal du menu disclosure ouvert",
          test07f71
        );
        testChecker(
          "07-F",
          "nia07f72",
          "dev",
          "red",
          "Erreur dans la valeur de l'attribut role du menu disclosure ouvert",
          test07f72
        );
      }
      nia07f_postTraitement();
    }
  }
}
function test07f1(color, destination, nomenclature) {
  const query = 'nav#headernav:not([role="navigation"])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test07f2(color, destination, nomenclature) {
  const query = "nav#headernav:not([aria-label]):not([aria-labelledby])";
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function init_test07f() {
  const hasPagePasserelle = checkIfHasPagePasserelle();
  if (nia07f_menu) {
    const nia07f10_nodes = nia07f_menu.querySelectorAll(":scope > li");
    if (nia07f10_nodes && nia07f10_nodes.length > 0) {
      for (let i = 0; i < nia07f10_nodes.length; i++) {
        if (isItemVisible(nia07f10_nodes[i])) {
          const nia07f11_nodes = nia07f10_nodes[i].querySelectorAll(
            ":scope > a, :scope > .quick-navigation > a"
          );
          const nia07f12_nodes = nia07f10_nodes[i].querySelectorAll(
            ":scope > button, :scope > .disclosure--container > button"
          );
          const nia07f13_nodes = nia07f10_nodes[i].querySelectorAll(
            ":scope > ul, :scope > .disclosure--container > ul"
          );
          if (hasSubElements(nia07f10_nodes[i])) {
            if (hasPagePasserelle) {
              VariationWithSubElementsWithPagePasserelle(
                nia07f10_nodes[i],
                nia07f11_nodes,
                nia07f12_nodes,
                nia07f13_nodes,
                i + 1
              );
            } else {
              VariationWithSubElementsWithoutPagePasserelle(
                nia07f10_nodes[i],
                nia07f11_nodes,
                nia07f12_nodes,
                nia07f13_nodes,
                i + 1
              );
            }
          } else {
            VariationWithoutSubElements(
              nia07f10_nodes[i],
              nia07f11_nodes,
              nia07f12_nodes,
              nia07f13_nodes,
              i + 1
            );
          }
        }
      }
    }
  }
}
function test07f21() {
  return nia07f_list21 !== "";
}
function test07f22() {
  return nia07f_list22 !== "";
}
function test07f23() {
  return nia07f_list23 !== "";
}
function test07f24() {
  return nia07f_list24 !== "";
}
function test07f31() {
  return nia07f_list31 !== "";
}
function test07f32() {
  return nia07f_list32 !== "";
}
function test07f33() {
  return nia07f_list23 !== "";
}
function test07f34() {
  return nia07f_list24 !== "";
}
function test07f41() {
  return nia07f_list41 !== "";
}
function test07f42() {
  return nia07f_list42 !== "";
}
function test07f43() {
  return nia07f_list43 !== "";
}
function test07f44() {
  return nia07f_list44 !== "";
}
function test07f51() {
  let flag = false;
  if (nia07f_btnOpen && (isItemVisible(nia07f_btnOpen) || nia07f_btnClose && isItemVisible(nia07f_btnClose))) {
    if (nia07f_mobilElement && !nia07f_btnOpen.hasAttribute("aria-expanded") && !nia07f_btnOpen.hasAttribute("aria-haspopup")) {
      if (filter.debug_flag)
        console.log(
          " - F5.1 : Absence de l'attribut aria-haspopup=dialog du bouton d'ouverture du menu"
        );
      flag = true;
    }
  }
  return flag;
}
function test07f52() {
  let flag = false;
  if (nia07f_btnOpen && (isItemVisible(nia07f_btnOpen) || nia07f_btnClose && isItemVisible(nia07f_btnClose))) {
    if (nia07f_mobilElement && nia07f_btnOpen.hasAttribute("aria-expanded") && nia07f_btnOpen.getAttribute("aria-expanded") === "true") {
      if (filter.debug_flag)
        console.log(
          " - F5.2 : Erreur dans la valeur de l'attribut aria-expanded du bouton d'ouverture du menu"
        );
      flag = true;
    }
  }
  return flag;
}
function test07f53() {
  let flag = false;
  if (nia07f_btnOpen && (isItemVisible(nia07f_btnOpen) || nia07f_btnClose && isItemVisible(nia07f_btnClose))) {
    if (nia07f_mobilElement && nia07f_btnOpen.hasAttribute("aria-expanded") && (Boolean(nia07f_mobilElement.closest('[role="dialog"]')) || Boolean(nia07f_mobilElement.closest('[aria-modal="true"]')))) {
      if (filter.debug_flag) {
        console.log(
          " - F5.3 : Conflit dans le type d'ouverture du menu : Modal ou Disclosure ?"
        );
      }
      flag = true;
    }
  }
  return flag;
}
function test07f54() {
  let flag = false;
  if (nia07f_btnOpen && (isItemVisible(nia07f_btnOpen) || nia07f_btnClose && isItemVisible(nia07f_btnClose))) {
    if (nia07f_mobilElement && nia07f_btnOpen.hasAttribute("aria-expanded") && nia07f_btnOpen.hasAttribute("aria-haspopup")) {
      if (filter.debug_flag) {
        console.log(
          " - F5.4 : Conflit entre les attributs aria-haspopup et aria-expanded du bouton d'ouverture du menu"
        );
      }
      flag = true;
    }
  }
  return flag;
}
function test07f55() {
  let flag = false;
  if (nia07f_btnOpen && (isItemVisible(nia07f_btnOpen) || nia07f_btnClose && isItemVisible(nia07f_btnClose))) {
    if (nia07f_mobilElement && nia07f_mobilElement.hasAttribute("aria-hidden") && (nia07f_mobilElement.getAttribute("aria-hidden") === "false" && !isItemVisible(nia07f_mobilElement) || nia07f_mobilElement.getAttribute("aria-hidden") === "true" && isItemVisible(nia07f_mobilElement))) {
      if (filter.debug_flag) {
        console.log(" - F5.5 : Vocalisation du menu caché en mobile");
      }
      flag = true;
    }
  }
  return flag;
}
function test07f56() {
  let flag = false;
  const lang = nia07f_btnOpen && nia07f_btnOpen.closest("[lang]") ? nia07f_btnOpen.closest("[lang]").getAttribute("lang") : null;
  const nia07f_btnOpen_new = document.querySelector(
    ".topnav > button.anchor.anchor-scroll, .page-headernav > button.anchor.anchor-scroll, .page-headernavmobile > button.anchor.anchor-scroll"
  );
  if (nia07f_btnOpen && nia07f_btnOpen_new && sanitizeText(cleanNode(nia07f_btnOpen).innerText, lang) !== sanitizeText(
    cleanNode(nia07f_btnOpen_new).innerText,
    lang
  )) {
    if (filter.debug_flag) {
      console.log(
        " - F6.1 Attention le texte du bouton d'ouverture du menu à changé cela ne devrai pas être le cas"
      );
      console.log(nia07f_btnOpen.innerText);
      console.log(nia07f_btnOpen_new.innerText);
    }
    flag = true;
  }
  return flag;
}
function test07f62() {
  let flag = false;
  if (nia07f_mobilElement && nia07f_mobilElement.hasAttribute("aria-hidden") && nia07f_mobilElement.getAttribute("aria-hidden") !== "false") {
    if (filter.debug_flag) {
      console.log(
        " - F6.2 Erreur dans la valeur de l'attribut aria-hidden du menu modal ouvert"
      );
      console.log(nia07f_mobilElement.getAttribute("aria-hidden"));
      console.log(nia07f_mobilElement.getAttribute("aria-hidden") !== "false");
    }
    flag = true;
  }
  return flag;
}
function test07f63() {
  let flag = false;
  if (nia07f_mobilElement && !nia07f_mobilElement.hasAttribute("aria-modal") || nia07f_mobilElement.getAttribute("aria-modal") !== "true") {
    if (filter.debug_flag) {
      console.log(
        " - F6.3 Erreur dans la valeur de l'attribut aria-modal du menu modal ouvert"
      );
    }
    flag = true;
  }
  return flag;
}
function test07f64() {
  let flag = false;
  if (nia07f_mobilElement && !nia07f_mobilElement.hasAttribute("role") || nia07f_mobilElement.getAttribute("role") !== "dialog") {
    if (filter.debug_flag) {
      console.log(
        " - F6.4 Erreur dans la valeur de l'attribut role du menu modal ouvert"
      );
    }
    flag = true;
  }
  return flag;
}
function test07f65() {
  let flag = false;
  if (nia07f_mobilElement && !(nia07f_mobilElement.hasAttribute("aria-label") || nia07f_mobilElement.hasAttribute("aria-labelledby"))) {
    if (filter.debug_flag) {
      console.log(
        " - F6.5 Erreur dans la valeur de l'attribut aria-label du menu modal ouvert"
      );
    }
    flag = true;
  }
  return flag;
}
function test07f66() {
  let flag = false;
  if (nia07f_mobilElement && nia07f_mobilElement.querySelector(
    "input, a, button, select, summary, textarea, [tabindex]"
  ).tagName !== "BUTTON" || !nia07f_mobilElement.querySelector(
    "input, a, button, select, summary, textarea, [tabindex]"
  ).classList.contains("anchor-close")) {
    if (filter.debug_flag) {
      console.log(
        " - F6.6 Erreur au niveau du bouton close du menu modal ouvert"
      );
    }
    flag = true;
  }
  return flag;
}
function test07f70() {
  let flag = false;
  if (nia07f_mobilElement && nia07f_mobilElement.hasAttribute("aria-hidden") && nia07f_mobilElement.getAttribute("aria-hidden") !== "false") {
    if (filter.debug_flag) {
      console.log(
        " - F7.0 Erreur dans la valeur de l'attribut aria-hidden du menu disclosure ouvert"
      );
    }
    flag = true;
  }
  return flag;
}
function test07f71() {
  let flag = false;
  if (nia07f_mobilElement && nia07f_mobilElement.hasAttribute("aria-modal") && nia07f_mobilElement.getAttribute("aria-modal") === "true") {
    if (filter.debug_flag) {
      console.log(
        " - F7.1 Erreur dans la valeur de l'attribut aria-modal du menu disclosure ouvert"
      );
    }
    flag = true;
  }
  return flag;
}
function test07f72() {
  let flag = false;
  if (nia07f_mobilElement && nia07f_mobilElement.hasAttribute("role") && nia07f_mobilElement.getAttribute("role") === "dialog") {
    if (filter.debug_flag) {
      console.log(
        " - F7.2 Erreur dans la valeur de l'attribut role du menu disclosure ouvert"
      );
    }
    flag = true;
  }
  return flag;
}
function nia07f_postTraitement() {
  if (nia07f_btnOpen && isItemVisible(nia07f_btnOpen)) {
    nia07f_btnOpen.click();
  } else if (nia07f_btnClose && isItemVisible(nia07f_btnClose)) {
    nia07f_btnClose.click();
  } else if (filter.debug_flag) {
    console.log("Absence de bouton close ?");
    if (nia07f_btnClose) {
      console.log(nia07f_btnClose);
      console.log("visible ? " + isItemVisible(nia07f_btnClose));
    }
  }
}
function checkIfHasPagePasserelle() {
  let flag = false;
  if (nia07f_menu) {
    const nia07f03_node = nia07f_menu.querySelector(
      ":scope > li.has-subnav > a"
    );
    if (nia07f03_node) {
      flag = true;
      if (filter.debug_flag)
        console.log(" - Le menu utilise des pages passerelles");
    } else {
      if (filter.debug_flag)
        console.log(" - Le menu n'utilise pas de pages passerelles");
    }
  }
  return flag;
}
function checkIfModal() {
  if (nia07f_btnOpen && (isItemVisible(nia07f_btnOpen) || nia07f_btnClose && isItemVisible(nia07f_btnClose))) {
    if (nia07f_mobilElement) {
      if (!nia07f_btnOpen.hasAttribute("aria-expanded")) {
        if (filter.debug_flag) {
          console.log(" - Le menu mobile s'ouvre dans une modale");
        }
        return true;
      } else if (filter.debug_flag) {
        console.log(" - Le menu mobile s'ouvre dans une dropdown");
      }
    }
  }
  return false;
}
function hasSubElements(node) {
  return node.classList.contains("has-subnav");
}
function VariationWithSubElementsWithPagePasserelle(node, nia07f11_nodes, nia07f12_nodes, nia07f13_nodes, y) {
  if (!nia07f11_nodes || nia07f11_nodes.length !== 1) {
    if (filter.debug_flag)
      console.log(
        " - F2.1 Absence de lien pour se rendre à la page passerelle pour l'élément de menu n°" + y
      );
    nia07f_list21 += y + ",";
    setItemOutline(node, "orange", "nia07f21", "07-F");
  } else if (!nia07f12_nodes || nia07f12_nodes.length !== 1) {
    if (filter.debug_flag)
      console.log(
        " - F2.2 Absence de bouton pour déplier le sous-menu pour l'élement de menu n°" + y
      );
    nia07f_list22 += y + ",";
    setItemOutline(node, "orange", "nia07f22", "07-F");
  } else if (!nia07f13_nodes || nia07f13_nodes.length !== 1) {
    if (filter.debug_flag)
      console.log(
        " - F2.3 Un problème a été detecté pour l'élement de menu n°" + y + " (absence de sous-menu alors que la classe has-subnav est présente)"
      );
    nia07f_list23 += y + ",";
    setItemOutline(node, "orange", "nia07f23", "07-F");
  } else if (nia07f12_nodes && !nia07f12_nodes[0].hasAttribute("aria-expanded")) {
    if (filter.debug_flag)
      console.log(
        " - F2.4 Un problème a été detecté pour l'élement de menu n°" + y + " (absence de l'attribut aria-expanded)"
      );
    nia07f_list24 += y + ",";
    setItemOutline(node, "orange", "nia07f24", "07-F");
  } else {
    if (filter.debug_flag)
      console.log(
        " - L'item de menu " + y + " avec page passerelles et sous-menu est OK"
      );
  }
}
function VariationWithSubElementsWithoutPagePasserelle(node, nia07f11_nodes, nia07f12_nodes, nia07f13_nodes, y) {
  if (nia07f11_nodes && nia07f11_nodes.length > 0) {
    if (filter.debug_flag)
      console.log(
        " - F3.1 Présence d'un lien pour se rendre à une page passerelle sur l'élement de menu n°" + y
      );
    nia07f_list31 += y + ",";
    setItemOutline(node, "orange", "nia07f31", "07-F");
  } else if (!nia07f12_nodes || nia07f12_nodes.length !== 1) {
    if (filter.debug_flag)
      console.log(
        " - F3.2 Absence de bouton pour déplier le sous-menu pour l'élement de menu n°" + y
      );
    nia07f_list32 += y + ",";
    setItemOutline(node, "orange", "nia07f32", "07-F");
  } else if (!nia07f13_nodes || nia07f13_nodes.length !== 1) {
    if (filter.debug_flag)
      console.log(
        " - F3.3 Un problème a été detecté pour l'élement de menu n°" + y + " (absence de sous-menu alors que la classe has-subnav est présente)"
      );
    nia07f_list33 += y + ",";
    setItemOutline(node, "orange", "nia07f33", "07-F");
  } else if (nia07f12_nodes && !nia07f12_nodes[0].hasAttribute("aria-expanded")) {
    if (filter.debug_flag)
      console.log(
        " - F3.4 Un problème a été detecté pour l'élement de menu n°" + y + " (absence de l'attribut aria-expanded)"
      );
    nia07f_list34 += y + ",";
    setItemOutline(node, "orange", "nia07f34", "07-F");
  } else {
    if (filter.debug_flag)
      console.log(
        " - L'item de menu " + y + " sans page passerelles et sous-menu est OK"
      );
  }
}
function VariationWithoutSubElements(node, nia07f11_nodes, nia07f12_nodes, nia07f13_nodes, y) {
  if (!nia07f11_nodes || nia07f11_nodes.length !== 1) {
    if (filter.debug_flag)
      console.log(
        " - F4.1 Un problème a été detecté pour l'élement de menu n°" + y
      );
    nia07f_list41 += y + ",";
    setItemOutline(node, "orange", "nia07f41", "07-F");
  } else if (nia07f12_nodes && nia07f12_nodes.length > 0) {
    if (filter.debug_flag)
      console.log(
        " - F4.2 Un problème a été detecté pour l'élement de menu n°" + y
      );
    nia07f_list42 += y + ",";
    setItemOutline(node, "orange", "nia07f42", "07-F");
  } else if (nia07f13_nodes && nia07f13_nodes.length > 0) {
    if (filter.debug_flag)
      console.log(
        " - F4.3 Un problème a été detecté pour l'élement de menu n°" + y
      );
    nia07f_list43 += y + ",";
    setItemOutline(node, "orange", "nia07f43", "07-F");
  } else if (nia07f11_nodes && (nia07f11_nodes[0].hasAttribute("aria-expanded") || nia07f11_nodes[0].hasAttribute("aria-haspopup"))) {
    if (filter.debug_flag)
      console.log(
        " - F4.4 Un problème a été detecté pour l'élement de menu n°" + y
      );
    nia07f_list44 += y + ",";
    setItemOutline(node, "orange", "nia07f44", "07-F");
  } else {
    if (filter.debug_flag)
      console.log(" - L'item de menu " + y + " sans sous-menu est OK");
  }
}
function getMobilElement() {
  const nia07f_btnOpenDest = nia07f_btnOpen ? nia07f_btnOpen.getAttribute("data-destination") : null;
  return nia07f_btnOpenDest ? document.querySelector(nia07f_btnOpenDest) : null;
}
function check_test_07g() {
  if (!filter.only_redactor && pageSettings.isAEM) {
    testChecker(
      "07-G",
      "nia07g1",
      "dev",
      "red",
      "Les items du menu et du sous menu sont sous forme de liste ul/li",
      test07g1
    );
    testChecker(
      "07-G",
      "nia07g2",
      "dev",
      "red",
      "Les éléments du menu et des sous_menus doivent avoir un intitulé",
      test07g2
    );
    testChecker(
      "07-G",
      "nia07g3",
      "dev",
      "red",
      "Les pages parentes de la page courante doivent avoir un attribut aria_current='true'",
      test07g3
    );
    testChecker(
      "07-G",
      "nia07g4",
      "dev",
      "red",
      "Une des pages enfant d'un menu actif doit avoir un attribut aria_current='page'",
      test07g4
    );
    testChecker(
      "07-G",
      "",
      "dev",
      "red",
      "Il ne peut y avoir qu'un seul élément dans le menu avec l'attribut aria_current='page'",
      test07g5
    );
  }
}
function test07g1(color, destination, nomenclature) {
  const query = "nav#headernav .nav--primary:not(ul), nav#headernav ul.nav--primary > .nav-item:not(li), nav#headernav ul.nav--primary > li.nav-item.has-subnav .subnav-item:not(li)";
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function test07g2(color, destination, nomenclature) {
  const query = "nav#headernav :is(a,button)";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test07g2
  );
}
function condition_test07g2(node) {
  return Boolean(!node.textContent || node.textContent === "");
}
function test07g3(color, destination, nomenclature) {
  const query = 'nav#headernav li.subnav-item a[aria-current="page"]';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test07g3
  );
}
function condition_test07g3(node) {
  return Boolean(
    node.parentElement.closest(".has-subnav") && !(node.parentElement.closest(".has-subnav").getElementsByTagName("a")[0] && node.parentElement.closest(".has-subnav").getElementsByTagName("a")[0].hasAttribute("aria-current") && node.parentElement.closest(".has-subnav").getElementsByTagName("a")[0].getAttribute("aria-current") === "true")
  );
}
function test07g4(color, destination, nomenclature) {
  const query = 'nav#headernav li a[aria-current="true"]';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test07g4
  );
}
function condition_test07g4(node) {
  return Boolean(
    node.parentElement.classList.contains("has-subnav") && !(node.parentElement.querySelectorAll(
      '.subnav-item > a[aria-current="page"], .subnav-item > a[aria-current="true"]'
    ) && node.parentElement.querySelectorAll(
      '.subnav-item > a[aria-current="page"], .subnav-item > a[aria-current="true"]'
    ).length === 1)
  );
}
function test07g5() {
  const node = document.querySelectorAll(
    'nav#headernav li a[aria-current="page"]'
  );
  return node && node.length > 1;
}
function check_test_07h() {
  if (!filter.only_redactor && pageSettings.isAEM) {
    testChecker(
      "07-H",
      "nia07h",
      "dev",
      "red",
      "Présence d'un sous-menu contenant moins de 2 éléments",
      test07h
    );
  }
}
function test07h(color, destination, nomenclature) {
  const query = "header nav .nav-item.has-subnav > ul";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test07h
  );
}
function condition_test07h(node) {
  return Boolean(isItemVisible(node) && node.getElementsByTagName.length < 2);
}
function check_test_07i() {
  if (!filter.only_redactor && pageSettings.isAEM) {
    testChecker(
      "07-I",
      "nia07i",
      "man",
      "yellow",
      "Nom de menu ou de sous-menu en double dans la navigation principale",
      test07i
    );
  }
}
function test07i(color, destination, nomenclature) {
  const query = "header nav";
  return checkIfQueryMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test07i,
    false
  );
}
function condition_test07i(nodes) {
  let nia07i_flag = false;
  let nia07i_content = "";
  let nia07i_items;
  let nia07i_array = [];
  if (nodes && nodes.length > 0 && isAtLeastOneItemVisible(nodes)) {
    for (let i = 0; i < nodes.length; i++) {
      if (isItemVisible(nodes[i])) {
        nia07i_items = nodes[i].querySelectorAll(".nav-item,.subnav-item");
        nia07i_array = [];
        for (let j = 0; j < nia07i_items.length; j++) {
          nia07i_content = nia07i_items[j].textContent;
          if (nia07i_array.indexOf(nia07i_content) > -1) {
            nia07i_flag = true;
            setItemOutline(nia07i_items[j], "yellow", "nia07i", "07-I");
          } else {
            nia07i_array.push(nia07i_content);
          }
        }
      }
    }
  }
  return nia07i_flag;
}
function check_test_07j() {
  if (!filter.only_redactor && pageSettings.isAEM && pageSettings.isSearchLogic) {
    testChecker(
      "07-J",
      "nia07j",
      "nth",
      "yellow",
      "Le terme recherché doit être mis en relief avec un soulignement pointillé",
      test07j
    );
  }
}
function test07j(color, destination, nomenclature) {
  const query = "mark";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test07j
  );
}
function condition_test07j(node) {
  return Boolean(
    isItemVisible(node) && !(window.getComputedStyle(node, null).textDecorationLine === "dotted" || window.getComputedStyle(node, null).textDecorationLine === "dashed" || window.getComputedStyle(node, null).borderBottomStyle === "dotted" || window.getComputedStyle(node, null).borderBottomStyle === "dashed")
  );
}
function check_test_07k() {
  if (!filter.only_redactor && pageSettings.isAEM && pageSettings.isCTIE) {
    testChecker(
      "07-K",
      "",
      "nth",
      "yellow",
      "Le logo Renow est absent du footer ou celui-ci ne redirige pas vers renow.public.lu",
      test07k
    );
  }
}
function test07k() {
  const query = 'footer .footer__copyright a.renow[href="https://renow.public.lu"] img[alt="Renow"]';
  return checkIfNoneVisibleItemMatch(query);
}
function check_test_07l() {
  if (!filter.only_redactor) {
    testChecker(
      "07-L",
      "nia07l",
      "nth",
      "yellow",
      'Le dernier élément de substitution dans font-family doit être une famille générique : "serif" ou "sans-serif"',
      test07l
    );
  }
}
function test07l(color, destination, nomenclature) {
  const query = "body,h1,h2,h3,p,li,strong,em,a,dt,dd,span:not(.checkA11YSpan)";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test07l
  );
}
function condition_test07l(node) {
  return Boolean(
    isItemVisible(node) && !(window.getComputedStyle(node, null).getPropertyValue("font-family").indexOf("serif") > -1)
  );
}
function check_part_07() {
  if (filter.debug_flag) console.log("07 AEM Component");
  check_test_07a();
  check_test_07b();
  check_test_07c();
  check_test_07d();
  check_test_07e();
  check_test_07f();
  check_test_07g();
  check_test_07h();
  check_test_07i();
  check_test_07j();
  check_test_07k();
  check_test_07l();
}
function check_test_08a() {
  testChecker(
    "08-A",
    "nia08a",
    "nc",
    "red",
    "Absence de l'attribut scope sur les en-tete de tableau [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-5-7-1' target='_blank'>RAWeb 5.7.1</a>]",
    test08a
  );
}
function test08a(color, destination, nomenclature) {
  const query = ':where([role="table"],table:not([role="presentation"])) th:not([scope="row"]):not([scope="col"]):not([id]):not([headers]):not([role="rowheader"]):not([role="columnheader"]):not(:only-child)';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_test_08b() {
  testChecker(
    "08-B",
    "nia08b",
    "nc",
    "red",
    "Presence d'attribut obsolete sur un tableau",
    test08b
  );
}
function test08b(color, destination, nomenclature) {
  const query = ':where([role="table"],table):where([align],[bgcolor],[border],[frame],[cellpadding],[cellspacing],[width],[summary],[rules])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_test_08c() {
  testChecker(
    "08-C",
    "nia08c",
    "nth",
    "yellow",
    "Presence attributs header obsolete dans un tableau",
    test08c
  );
}
function test08c(color, destination, nomenclature) {
  const query = "th[header], td[header]";
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_test_08d() {
  testChecker(
    "08-D",
    "nia08d",
    "nc",
    "red",
    "Presence d'élements incompatible avec un tableau de mise en forme [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-5-8-1' target='_blank'>RAWeb 5.8.1</a>]",
    test08d
  );
}
function test08d(color, destination, nomenclature) {
  const query = 'table[role="presentation"][summary], table[role="presentation"] :where(caption,thead,th,tfoot,[role="rowheader"],[role="columnheader"],td[scope],td[headers],td[axis])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_test_08e() {
  testChecker(
    "08-E",
    "nia08e",
    "nc",
    "red",
    "Présence d'un tableau de données sans en-tête [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-5-6-1' target='_blank'>RAWeb 5.6.1</a>]",
    test08e
  );
}
function test08e(color, destination, nomenclature) {
  const query = ':where([role="table"],table:not([role="presentation"]))';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test08e
  );
}
function condition_test08e(node) {
  return Boolean(
    isItemVisible(node) && node.innerHTML.indexOf("<th") < 0 && node.innerHTML.indexOf(' role="columnheader"') < 0 && node.innerHTML.indexOf(' role="rowheader"') < 0
  );
}
function check_test_08f() {
  testChecker(
    "08-F",
    "nia08f1",
    "nc",
    "red",
    "Présence d'un tableau complexe sans résumé [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-5-1-1' target='_blank'>RAWeb 5.1.1</a>]",
    test08f1
  );
  testChecker(
    "08-F",
    "nia08f2",
    "nth",
    "yellow",
    "Présence d'un tableau de données sans résumé",
    test08f2
  );
}
function isTableComplex(elem) {
  const th_multiple = elem.querySelectorAll(
    "tbody > tr > *:not(*:first-child)"
  );
  let nia08f_rowspan, nia08f_colspan;
  for (let i = 0; i < th_multiple.length; i++) {
    if (th_multiple[i].nodeName === "TH") {
      return true;
    }
  }
  const th_all = elem.querySelectorAll("tr > th");
  for (let i = 0; i < th_all.length; i++) {
    nia08f_rowspan = th_all[i].getAttribute("rowSpan");
    nia08f_colspan = th_all[i].getAttribute("colSpan");
    if (nia08f_rowspan !== null && Number(nia08f_rowspan) > 1 || nia08f_colspan !== null && Number(nia08f_colspan) > 1)
      return true;
  }
  return false;
}
function test08f1(color, destination, nomenclature) {
  const query = 'table:not([summary]):not([aria-describedby]):not([role="presentation"])';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test08f1
  );
}
function condition_test08f1(node) {
  return Boolean(
    isItemVisible(node) && (!node.querySelector(":scope > caption") || node.querySelector(":scope > caption").textContent === "") && isTableComplex(node)
  );
}
function test08f2(color, destination, nomenclature) {
  const query = 'table:not([summary]):not([aria-describedby]):not([role="presentation"])';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test08f2
  );
}
function condition_test08f2(node) {
  return Boolean(
    isItemVisible(node) && (!node.querySelector(":scope > caption") || node.querySelector(":scope > caption").textContent === "") && !isTableComplex(node)
  );
}
function check_part_08() {
  if (filter.debug_flag) console.log("08 Tableau");
  check_test_08a();
  check_test_08b();
  check_test_08c();
  check_test_08d();
  check_test_08e();
  check_test_08f();
}
function check_test_09a() {
  if (pageSettings.isSitemap && pageSettings.isAEM) {
    if (!filter.only_nc && !filter.only_redactor) {
      testChecker(
        "09-A",
        "nia09a1",
        "man",
        "yellow",
        "Présence de la page support mais il manque la page Contact dans le plan du site, vérifier si c'est volontaire [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]",
        test09a1
      );
    }
    testChecker(
      "09-A",
      "nia09a2",
      "nc",
      "red",
      "Il manque la page Contact dans le plan du site [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]",
      test09a2
    );
    if (!filter.only_nc && !filter.only_redactor) {
      testChecker(
        "09-A",
        "nia09a3",
        "man",
        "yellow",
        "Présence de la page support mais il manque la page Accessibilité dans le plan du site, vérifier si c'est volontaire [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]",
        test09a3
      );
    }
    testChecker(
      "09-A",
      "nia09a4",
      "nc",
      "red",
      "Il manque la page Accessibilité dans le plan du site [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]",
      test09a4
    );
    testChecker(
      "09-A",
      "nia09a5",
      "nc",
      "red",
      "Il manque la page Accessibilité dans le footer [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]",
      test09a5
    );
    if (!filter.only_nc && !filter.only_redactor) {
      testChecker(
        "09-A",
        "nia09a6",
        "man",
        "yellow",
        "Présence de la page support mais il manque la page Aspect légaux dans le plan du site, vérifier si c'est volontaire [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]",
        test09a6
      );
    }
    testChecker(
      "09-A",
      "nia09a7",
      "nc",
      "red",
      "Il manque la page Aspect légaux dans le plan du site [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]",
      test09a7
    );
    testChecker(
      "09-A",
      "nia09a8",
      "nc",
      "red",
      "Il manque la page Aspect légaux dans le footer [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]",
      test09a8
    );
    if (!filter.only_nc && !filter.only_redactor) {
      testChecker(
        "09-A",
        "nia09a9",
        "man",
        "yellow",
        "Présence de la page support mais il manque la page A propos dans le plan du site, vérifier si c'est volontaire [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]",
        test09a9
      );
    }
    testChecker(
      "09-A",
      "nia09a10",
      "nc",
      "red",
      "Il manque la page A propos dans le plan du site [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]",
      test09a10
    );
    testChecker(
      "09-A",
      "nia09a11",
      "nc",
      "red",
      "Il manque la page A propos dans le footer [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]",
      test09a11
    );
  }
}
function test09a1() {
  const support = document.querySelectorAll(
    '.cmp-sitemap a[href$="support.html"]'
  );
  if (support && support.length > 0) {
    const footer_contact = document.querySelectorAll(
      '.page-footernav a[href*="contact"][href$=".html"]'
    );
    const sitemap_contact = document.querySelectorAll(
      '.cmp-sitemap a[href*="contact"][href$=".html"]'
    );
    const result = footer_contact && footer_contact.length > 0 && (!sitemap_contact || sitemap_contact.length === 0);
    if (result === true) {
      setItemsOutline(footer_contact, "yellow", "nia09a1", "09-A");
    }
    return result;
  }
  return false;
}
function test09a2() {
  const support = document.querySelectorAll(
    '.cmp-sitemap a[href$="support.html"]'
  );
  if (!support || support.length === 0) {
    const footer_contact = document.querySelectorAll(
      '.page-footernav a[href*="contact"][href$=".html"]'
    );
    const sitemap_contact = document.querySelectorAll(
      '.cmp-sitemap a[href*="contact"][href$=".html"]'
    );
    const result = footer_contact && footer_contact.length > 0 && (!sitemap_contact || sitemap_contact.length === 0);
    if (result === true) {
      setItemsOutline(footer_contact, "red", "nia09a2", "09-A");
    }
    return result;
  }
  return false;
}
function test09a3() {
  const support = document.querySelectorAll(
    '.cmp-sitemap a[href$="support.html"]'
  );
  if (support && support.length > 0) {
    const footer_accessibilite = document.querySelectorAll(
      '.page-footernav a[href*="accessibilite"][href$=".html"]'
    );
    const sitemap_accessibilite = document.querySelectorAll(
      '.cmp-sitemap a[href*="accessibilite"][href$=".html"]'
    );
    const result = footer_accessibilite && footer_accessibilite.length > 0 && (!sitemap_accessibilite || sitemap_accessibilite.length === 0);
    if (result === true) {
      setItemsOutline(footer_accessibilite, "yellow", "nia09a3", "09-A");
    }
    return result;
  }
  return false;
}
function test09a4() {
  const support = document.querySelectorAll(
    '.cmp-sitemap a[href$="support.html"]'
  );
  if (!support || support.length === 0) {
    const footer_accessibilite = document.querySelectorAll(
      '.page-footernav a[href*="accessibilite"][href$=".html"]'
    );
    const sitemap_accessibilite = document.querySelectorAll(
      '.cmp-sitemap a[href*="accessibilite"][href$=".html"]'
    );
    const result = footer_accessibilite && footer_accessibilite.length > 0 && (!sitemap_accessibilite || sitemap_accessibilite.length === 0);
    if (result === true) {
      setItemsOutline(footer_accessibilite, "red", "nia09a4", "09-A");
    }
    return result;
  }
  return false;
}
function test09a5() {
  const footer_accessibilite = document.querySelectorAll(
    '.page-footernav a[href*="accessibilite"][href$=".html"]'
  );
  const sitemap_accessibilite = document.querySelectorAll(
    '.cmp-sitemap a[href*="accessibilite"][href$=".html"]'
  );
  const result = sitemap_accessibilite && sitemap_accessibilite.length > 0 && (!footer_accessibilite || footer_accessibilite.length === 0);
  if (result === true) {
    setItemsOutline(sitemap_accessibilite, "red", "nia09a5", "09-A");
  }
  return result;
}
function test09a6() {
  const support = document.querySelectorAll(
    '.cmp-sitemap a[href$="support.html"]'
  );
  if (support && support.length > 0) {
    const footer_aspectlegaux = document.querySelectorAll(
      '.page-footernav a[href*="aspects-legaux"][href$=".html"]'
    );
    const sitemap_aspectlegaux = document.querySelectorAll(
      '.cmp-sitemap a[href*="aspects-legaux"][href$=".html"]'
    );
    const result = footer_aspectlegaux && footer_aspectlegaux.length > 0 && (!sitemap_aspectlegaux || sitemap_aspectlegaux.length === 0);
    if (result === true) {
      setItemsOutline(footer_aspectlegaux, "yellow", "nia09a6", "09-A");
    }
    return result;
  }
  return false;
}
function test09a7() {
  const support = document.querySelectorAll(
    '.cmp-sitemap a[href$="support.html"]'
  );
  if (!support || support.length === 0) {
    const footer_aspectlegaux = document.querySelectorAll(
      '.page-footernav a[href*="aspects-legaux"][href$=".html"]'
    );
    const sitemap_aspectlegaux = document.querySelectorAll(
      '.cmp-sitemap a[href*="aspects-legaux"][href$=".html"]'
    );
    const result = footer_aspectlegaux && footer_aspectlegaux.length > 0 && (!sitemap_aspectlegaux || sitemap_aspectlegaux.length === 0);
    if (result === true) {
      setItemsOutline(footer_aspectlegaux, "red", "nia09a7", "09-A");
    }
    return result;
  }
  return false;
}
function test09a8() {
  const footer_aspectlegaux = document.querySelectorAll(
    '.page-footernav a[href*="aspects-legaux"][href$=".html"]'
  );
  const sitemap_aspectlegaux = document.querySelectorAll(
    '.cmp-sitemap a[href*="aspects-legaux"][href$=".html"]'
  );
  const result = sitemap_aspectlegaux && sitemap_aspectlegaux.length > 0 && (!footer_aspectlegaux || footer_aspectlegaux.length === 0);
  if (result === true) {
    setItemsOutline(sitemap_aspectlegaux, "red", "nia09a8", "09-A");
  }
  return result;
}
function test09a9() {
  const support = document.querySelectorAll(
    '.cmp-sitemap a[href$="support.html"]'
  );
  if (support && support.length > 0) {
    const footer_apropos = document.querySelectorAll(
      '.page-footernav a[href*="a-propos"][href$=".html"]'
    );
    const sitemap_apropos = document.querySelectorAll(
      '.cmp-sitemap a[href*="a-propos"][href$=".html"]'
    );
    const result = footer_apropos && footer_apropos.length > 0 && (!sitemap_apropos || sitemap_apropos.length === 0);
    if (result === true) {
      setItemsOutline(footer_apropos, "yellow", "nia09a9", "09-A");
    }
    return result;
  }
  return false;
}
function test09a10() {
  const support = document.querySelectorAll(
    '.cmp-sitemap a[href$="support.html"]'
  );
  if (!support || support.length === 0) {
    const footer_apropos = document.querySelectorAll(
      '.page-footernav a[href*="a-propos"][href$=".html"]'
    );
    const sitemap_apropos = document.querySelectorAll(
      '.cmp-sitemap a[href*="a-propos"][href$=".html"]'
    );
    const result = footer_apropos && footer_apropos.length > 0 && (!sitemap_apropos || sitemap_apropos.length === 0);
    if (result === true) {
      setItemsOutline(footer_apropos, "red", "nia09a10", "09-A");
    }
    return result;
  }
  return false;
}
function test09a11() {
  const footer_apropos = document.querySelectorAll(
    '.page-footernav a[href*="a-propos"][href$=".html"]'
  );
  const sitemap_apropos = document.querySelectorAll(
    '.cmp-sitemap a[href*="a-propos"][href$=".html"]'
  );
  const result = sitemap_apropos && sitemap_apropos.length > 0 && (!footer_apropos || footer_apropos.length === 0);
  if (result === true) {
    setItemsOutline(sitemap_apropos, "red", "nia09a11", "09-A");
  }
  return result;
}
function check_test_09b() {
  if (pageSettings.isSitemap && pageSettings.isAEM) {
    testChecker(
      "09-B",
      "nia09b",
      "nth",
      "orange",
      "Presence de la page Error dans le plan du site",
      test09b
    );
  }
}
function test09b(color, destination, nomenclature) {
  const query = '.cmp-sitemap a[href*="error.html"]';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_test_09c() {
  if (!filter.only_redactor) {
    testChecker(
      "09-C",
      "nia09c",
      "nth",
      "orange",
      "Presence d'attibut tabindex positif [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-8-1' target='_blank'>RAWeb 12.8.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/la-navigation-au-clavier-seffectue-dans-un-ordre-previsible' target='_blank'>Opquast 162</a>]",
      test09c
    );
  }
}
function test09c(color, destination, nomenclature) {
  const query = '[tabindex]:not([tabindex="0"]):not([tabindex="-1"])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_test_09d() {
  if (pageSettings.isAEM && !pageSettings.isOnePage) {
    if (!filter.only_nc) {
      testChecker(
        "09-D",
        "nia09d1",
        "man",
        "yellow",
        "Le site doit être muni de 2 systèmes de navigation (exception : One-page, etc.) [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-1-1' target='_blank'>RAWeb 12.1.1</a>]",
        test09d1
      );
    }
    testChecker(
      "09-D",
      "nia09d2",
      "nc",
      "red",
      "Le site doit être muni de 2 systèmes de navigation (exception : One-page, etc.) [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-1-1' target='_blank'>RAWeb 12.1.1</a>]",
      test09d2
    );
  }
}
function test09d1() {
  const footer_links = document.querySelectorAll(
    'footer .nav-item > a:not([target="_blank"])'
  );
  return footer_links && footer_links.length <= 3 && navCounter() < 2;
}
function test09d2() {
  const footer_links = document.querySelectorAll(
    'footer .nav-item > a:not([target="_blank"])'
  );
  return (!footer_links || footer_links.length > 3) && navCounter() < 2;
}
function navCounter() {
  const nia09d_nav = document.querySelector(
    'nav #headernav, nav#headernav, *:not(#headerwrapper-mobile) > nav[class^="page-headernav"]:not(.page-headernavmobile)'
  );
  const nia09d_nav_fixed = document.querySelector(
    ".header-icons > nav.headernav-fixed"
  );
  const nia09d_nav_btn = document.querySelector(
    '[class^="page-headernav"] button.anchor[data-destination^="#headernav"], [class^="headernav"] button.anchor[data-destination^="#headernav"]'
  );
  const nia09d_search = document.querySelector(
    '*:not(#headerwrapper-mobile) > div.topsearch[role="search"]:not(:has(button.anchor:not([aria-haspopup="dialog"]))), div.topsearch-desk[role="search"], div.topsearch-desktop[role="search"]'
  );
  const nia09d_search_fixed = document.querySelector(
    '.header-icons > div.topsearch[role="search"]'
  );
  const nia09d_search_btn = document.querySelector(
    'div.topsearch[role="search"] button.anchor'
  );
  const nia09d_plan = document.querySelector(
    'footer .page-footernav ul > li.nav-item a[href*="plan"][href$=".html"],footer .page-footernav ul > li.nav-item a[href*="sitemap"][href$=".html"],footer .page-footernav ul > li.nav-item a[href*="seitenverzeichnis"][href$=".html"]'
  );
  let nia09d_counter = 0;
  if (nia09d_nav && isItemVisible(nia09d_nav)) {
    nia09d_counter++;
  } else if (nia09d_nav_btn && isItemVisible(nia09d_nav_btn)) {
    nia09d_counter++;
  } else if (nia09d_nav && nia09d_nav_fixed && isItemVisible(nia09d_nav_fixed)) {
    nia09d_counter++;
  } else if (filter.debug_flag) {
    console.log("navigation principale non trouvé");
  }
  if (nia09d_search && isItemVisible(nia09d_search)) {
    nia09d_counter++;
  } else if (nia09d_search_btn && isItemVisible(nia09d_search_btn)) {
    nia09d_counter++;
  } else if (nia09d_search && nia09d_search_fixed && isItemVisible(nia09d_search_fixed)) {
    nia09d_counter++;
  } else if (filter.debug_flag) {
    console.log("recherche non trouvée");
  }
  if (nia09d_plan && isItemVisible(nia09d_plan)) {
    nia09d_counter++;
  } else if (filter.debug_flag) {
    console.log("plan du site non trouvé");
  }
  return nia09d_counter;
}
function check_test_09e() {
  if (!filter.only_redactor && pageSettings.isAEM) {
    testChecker(
      "09-E",
      "nia09e1",
      "dev",
      "red",
      "Un skiplinks actif n'est pas correctement lié à sa destination [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-7-1' target='_blank'>RAWeb 12.7.1</a>]",
      test09e1
    );
    testChecker(
      "09-E",
      "nia09e2",
      "man",
      "yellow",
      "Un skiplinks actif possède une destination non visible, vérifier si celui-ci fonctionne correctement [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-7-1' target='_blank'>RAWeb 12.7.1</a>]",
      test09e2
    );
    testChecker(
      "09-E",
      "nia09e3",
      "nth",
      "yellow",
      "Les skiplinks doivent se trouver dans un element nav avec un aria-label et un role=navigation",
      test09e3
    );
    if (!filter.only_nc && !pageSettings.isPreview) {
      testChecker(
        "09-E",
        "nia09e4",
        "nth",
        "yellow",
        "Les skiplinks situé dans l’entête doivent être les premiers éléments tabulable de la page (hors modale des cookies)",
        test09e4
      );
    }
    testChecker(
      "09-E",
      "nia09e5",
      "nth",
      "yellow",
      "S’il y a plusieurs Skiplinks, ils doivent être structurée sous forme de liste 'ul'",
      test09e5
    );
    testChecker(
      "09-E",
      "",
      "nc",
      "red",
      "Absence de skiplinks pour aller à la zone de contenu principale [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-7-1' target='_blank'>RAWeb 12.7.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-page-contient-des-liens-dacces-rapide-places-au-debut-du-code-source' target='_blank'>Opquast 159</a>]",
      test09e6
    );
  }
}
function test09e1(color, destination, nomenclature) {
  const query = "body > .skiplinks a[href]";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test09e1
  );
}
function condition_test09e1(node) {
  const destination = node.getAttribute("href");
  return Boolean(
    node.getAttribute("href") && isItemVisible(node) && destination && destination !== "" && !document.querySelector(destination)
  );
}
function test09e2(color, destination, nomenclature) {
  const query = "body > .skiplinks a[href]";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test09e2
  );
}
function condition_test09e2(node) {
  const destination = node.getAttribute("href");
  if (destination && destination !== "") {
    const destinationTarget = document.querySelector(destination);
    return Boolean(
      node.getAttribute("href") && isItemVisible(node) && destinationTarget && !isItemVisible(destinationTarget)
    );
  }
  return false;
}
function test09e3(color, destination, nomenclature) {
  const query = "body > .skiplinks, body > .xfpage > .skiplinks";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test09e3
  );
}
function condition_test09e3(node) {
  return Boolean(
    node.firstElementChild && (node.firstElementChild.nodeName !== "NAV" || !node.firstElementChild.hasAttribute("aria-label") || !node.firstElementChild.hasAttribute("role") || node.firstElementChild.getAttribute("role") !== "navigation")
  );
}
function test09e4(color, destination, nomenclature) {
  const query = "body > *:not(#orejime):not(#a42-ac):not(.checkA11YSpan):not(link):not(svg.iconset)";
  return checkIfQueryMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test09e4,
    false
  );
}
function condition_test09e4(nodes) {
  const node = nodes[0];
  if (node && node.classList && node.classList.contains("skiplinks")) {
    return false;
  }
  const child = node.firstElementChild;
  if (child && child.classList && child.classList.contains("skiplinks")) {
    return false;
  }
  setItemOutline(node, "yellow", "nia09e4", "09-E");
  return true;
}
function test09e5(color, destination, nomenclature) {
  const query = "body > .skiplinks a[href]";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test09e5
  );
}
function condition_test09e5(node) {
  return Boolean(
    node.parentElement && node.parentElement.childElementCount > 1 && node.parentElement.nodeName !== "LI"
  );
}
function test09e6() {
  const query = 'body > .skiplinks a[href="#main"], body > .xfpage > .skiplinks a[href="#main"]';
  return checkIfNoneVisibleItemMatch(query);
}
function check_test_09f() {
  if (!filter.only_redactor && !filter.only_nc) {
    testChecker(
      "09-F",
      "nia09f",
      "man",
      "yellow",
      "Taille d'éléments interactifs minimum attendue est de 24px par 24px (marges comprises) [<a href='https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html' target='_blank'>WCAG 2.2 SC258</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/la-taille-des-elements-cliquables-est-suffisante' target='_blank'>Opquast 181</a>]",
      test09f
    );
  }
}
function test09f(color, destination, nomenclature) {
  const query = '*:not(.cmp-text) > *:not(p) > a:not(.feed-item-timing):not(.cmp-breadcrumb__item-link):not(.geoportail-skip):not(.cmp-image__link), button, input:not([type="file"]):not([type="radio"]):not([type="checkbox"]), select, details, textarea, [tabindex="0"], [tabindex="-1"]';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition09f
  );
}
function condition09f(node) {
  let nia09f_flag = false;
  if (isItemVisible(node) && !isItemSROnly(node)) {
    const nia09f_rect = node.getBoundingClientRect();
    const nia09f_horizontal = nia09f_rect["width"] + parseFloat(window.getComputedStyle(node)["marginLeft"]) + parseFloat(window.getComputedStyle(node)["marginRight"]);
    const nia09f_vertical = nia09f_rect["height"] + parseFloat(window.getComputedStyle(node)["marginTop"]) + parseFloat(window.getComputedStyle(node)["marginBottom"]);
    if (nia09f_rect["width"] !== 0 && nia09f_rect["height"] !== 0) {
      if (nia09f_horizontal < 24 || nia09f_vertical < 24) {
        const parent = node.parentElement;
        if (parent && (parent.tagName === "LI" || parent.childElementCount === 1)) {
          const nia09f_rect_parent = parent.getBoundingClientRect();
          const nia09f_horizontal_parent = nia09f_rect_parent["width"] + parseFloat(window.getComputedStyle(parent)["marginLeft"]) + parseFloat(window.getComputedStyle(parent)["marginRight"]);
          const nia09f_vertical_parent = nia09f_rect_parent["height"] + parseFloat(window.getComputedStyle(parent)["marginTop"]) + parseFloat(window.getComputedStyle(parent)["marginBottom"]);
          if (nia09f_horizontal_parent < 24 || nia09f_vertical_parent < 24) {
            if (nia09f_vertical_parent > 18 && nia09f_horizontal_parent > 50) ;
            else {
              if (filter.debug_flag) console.log(nia09f_rect);
              nia09f_flag = true;
              setItemOutline(node, "yellow", "nia09f", "09-F");
            }
          }
        } else if (parent && parent.tagName !== "P" && parent.tagName !== "SPAN" && parent.tagName !== "SMALL" && parent.tagName !== "DD" && parent.tagName !== "STRONG") {
          if (filter.debug_flag) {
            console.log(nia09f_rect);
          }
          nia09f_flag = true;
          setItemOutline(node, "yellow", "nia09f", "09-F");
        } else if (nia09f_vertical > 18 && nia09f_horizontal > 50) ;
        else {
          nia09f_flag = true;
          setItemOutline(node, "yellow", "nia09f", "09-F");
        }
      }
    }
  }
  return nia09f_flag;
}
function check_test_09g() {
  if (!filter.only_redactor) {
    testChecker(
      "09-G",
      "nia09g",
      "nth",
      "orange",
      "Absence des items obligatoire sur la page d'erreur (Barre de recherche, lien vers l'accueil, le plan du site et la page contact)",
      test09g
    );
  }
}
function test09g(color, destination, nomenclature) {
  const query = ".cmp-error404";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test09g
  );
}
function condition_test09g(node) {
  if (isItemVisible(node)) {
    const search = node.querySelector("#topsearch");
    const list = node.querySelectorAll("ul > li > a");
    const contact = node.querySelector('a[href*="contact"]');
    const plan = node.querySelector('a[href*="plan"]');
    if (search === null || list === null || contact === null || plan === null) {
      return true;
    } else if (list.length < 3) {
      return true;
    } else if (!isItemVisible(search) || !isItemVisible(contact) || !isItemVisible(plan)) {
      return true;
    }
  }
  return false;
}
function check_part_09() {
  if (filter.debug_flag) console.log("09 Navigation");
  check_test_09a();
  check_test_09b();
  check_test_09c();
  check_test_09d();
  check_test_09e();
  check_test_09f();
  check_test_09g();
}
function check_test_10a() {
  testChecker(
    "10-A",
    "nia10a",
    "nc",
    "red",
    "Présence de balise HTML obsolètes ou servant à la présentation de l'information [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-10-1-1' target='_blank'>RAWeb 10.1.1</a>]",
    test10a
  );
}
function test10a(color, destination, nomenclature) {
  const query = "acronym,applet,basefont,big,center,dir,font,frame,frameset,isindex,noframes,s,strike,tt,u,blink,marquee";
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_test_10b() {
  testChecker(
    "10-B",
    "nia10b",
    "man",
    "yellow",
    'Présence de balises "i" ou "b", voir pour les remplacer par "em" et "strong" lorsque nécessaire',
    test10b
  );
}
function test10b(color, destination, nomenclature) {
  const query = 'i:not([role="presentation"][aria-hidden="true"]), *:not(.cmp-hours__list) > * > * > b';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_test_10c() {
  testChecker(
    "10-C",
    "nia10c",
    "nc",
    "red",
    "Présence d'attributs HTML obsoletes",
    test10c
  );
}
function test10c(color, destination, nomenclature) {
  const query = "link[rev], a[rev],link[charset], a[charset],a[shape],a[coords],img[longdesc], iframe[longdesc],link[target],area[nohref],head[profile],html[version],img[name],meta[scheme],object[archive],object[classid],object[codebase],object[codetype],object[declare],object[standby],param[valuetype],param[type],td[axis],t[axis],td[abbr], t[abbr],td[scope],caption[align], iframe[align], img[align], input[align], object[align], legend[align], table[align], hr[align], div[align], h1[align], h2[align], h3[align], h4[align], h5[align], h6[align], p[align], col[align], colgroup[align], tbody[align], td[align], tfoot[align], th[align], thead[align], tr[align],body[alink],body[link],body[vlink],body[text],body[background],table[bgcolor], tr[bgcolor], td[bgcolor], th[bgcolor], body[bgcolor],table[border], object[border],table[cellpadding],table[cellspacing],col[char], colgroup[char], tbody[char], td[char], tfoot[char], th[char], thead[char],tr[char],col[charoff], colgroup[charoff], tbody[charoff], td[charoff], tfoot[charoff], th[charoff], thead[charoff], tr[charoff],br[clear],dl[compact], menu[compact], ol[compact], ul[compact],table[frame],iframe[frameborder],img[hspace], object[hspace],img[vspace], object[vspace],iframe[marginheight],iframe[marginwidth],hr[noshade],td[nowrap], th[nowrap],table[rules],iframe[scrolling],hr[size],li[type], ol[type], ul[type],col[valign], colgroup[valign], tbody[valign], td[valign], tfoot[valign], th[valign], thead[valign], tr[valign],hr[width], table[width], td[width], th[width], col[width], colgroup[width], pre[width]";
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_test_10d() {
  testChecker(
    "10-D",
    "nia10d",
    "nc",
    "red",
    "Présence d'attributs HTML servant à la présentation de l'information [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-10-1-2' target='_blank'>RAWeb 10.1.2</a>]",
    test10d
  );
}
function test10d(color, destination, nomenclature) {
  const query = '[align], [alink], [background], [bgcolor], [border], [cellpadding], [cellspacing], [char], [charoff], [clear], [color], [compact], [frameborder], [hspace], [link], [marginheight], [marginwidth], [text], [valign], [vlink], [vspace], [size]:not(select), *:not(symbol) > *:not(g):not(svg[aria-hidden="true"]) > [width]:not(img):not(object):not(embed):not(canvas):not(svg):not(rect),*:not(symbol) > *:not(g):not(svg[aria-hidden="true"]) > [height]:not(img):not(object):not(embed):not(canvas):not(svg):not(rect)';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_part_10() {
  if (filter.debug_flag) console.log("10 Old tag");
  check_test_10a();
  check_test_10b();
  check_test_10c();
  check_test_10d();
}
function check_test_11a() {
  if (!filter.only_redactor) {
    testChecker(
      "11-A",
      "nia11a",
      "nc",
      "red",
      "Aucune langue défini par défaut sur la page [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-3-1' target='_blank'>RAWeb 8.3.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-code-source-de-chaque-page-indique-la-langue-principale-du-contenu' target='_blank'>Opquast 125</a>]",
      test11a
    );
  }
}
function test11a(color, destination, nomenclature) {
  const query = "html:not([lang])";
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_test_11b() {
  if (!pageSettings.isPrototype && !filter.only_redactor) {
    testChecker(
      "11-B",
      "nia11b",
      "nth",
      "orange",
      'Présence de "Lorem ipsum" sur la page',
      test11b
    );
  }
}
function test11b(color, destination, nomenclature) {
  const query = ".cmp-text";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test11b
  );
}
function condition_test11b(node) {
  return Boolean(
    isItemVisible(node) && node.textContent.includes("Lorem ipsum")
  );
}
function check_test_11c() {
  testChecker(
    "11-C",
    "nia11c1",
    "man",
    "orange",
    "Forte probabilité de texte en langue étrangère présent sur la page (sans attribut 'lang')",
    test11c1
  );
  testChecker(
    "11-C",
    "nia11c2",
    "man",
    "yellow",
    "Forte probabilité de texte en langue étrangère présent sur la page",
    test11c2
  );
}
function test11c1(color, destination, nomenclature) {
  const query = ".cmp-text, .cmp-focus-list-description";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test11c1
  );
}
function test11c2(color, destination, nomenclature) {
  const query = ".cmp-text, .cmp-focus-list-description";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test11c2
  );
}
function condition_test11c1(node) {
  const lang = getClosestLang(node);
  const dictionary = makeDictionary(lang || "fr");
  let flag = false;
  if (!node.querySelector("[lang]")) {
    for (let j = 0; j < dictionary.length; j++) {
      if (node.textContent.toLowerCase().includes(dictionary[j])) {
        if (filter.debug_flag) {
          console.log("keyword detected : " + dictionary[j]);
        }
        flag = true;
        break;
      }
    }
  }
  return flag;
}
function condition_test11c2(node) {
  const lang = getClosestLang(node);
  const dictionary = makeDictionary(lang || "fr");
  let flag = false;
  if (node.querySelector("[lang]")) {
    for (let j = 0; j < dictionary.length; j++) {
      if (node.textContent.toLowerCase().includes(dictionary[j])) {
        if (filter.debug_flag) {
          console.log("keyword detected : " + dictionary[j]);
        }
        flag = true;
        break;
      }
    }
  }
  return flag;
}
function makeDictionary(lang) {
  const nia11c_array_fr = [
    " les ",
    " y ",
    " en ",
    " chez ",
    " dont ",
    " même ",
    " le ",
    " déjà ",
    " pas ",
    " bientôt ",
    " avoir ",
    " lorsque ",
    " mais ",
    " ainsi ",
    " pour ",
    " autant ",
    " leur ",
    " dans ",
    " se ",
    " aucun "
  ];
  const nia11c_array_en = [
    " the ",
    " will ",
    " would ",
    " shall ",
    " might ",
    " may ",
    " do ",
    " does ",
    " did ",
    " should ",
    " could ",
    " must ",
    " yet ",
    " still ",
    " even ",
    " though ",
    " whether ",
    " some ",
    " any ",
    " whose "
  ];
  const nia11c_array_de = [
    " doch ",
    " schon ",
    " halt ",
    " denn ",
    " eben ",
    " nun ",
    " gar ",
    " überhaupt ",
    " sich ",
    " wird ",
    " damit ",
    " deshalb ",
    " dazu ",
    " während ",
    " keiner ",
    " etwas ",
    " nichts ",
    " allein ",
    " zwar ",
    " ebenfalls ",
    " für "
  ];
  if (lang === "fr") {
    return nia11c_array_en.concat(nia11c_array_de);
  } else if (lang === "en") {
    return nia11c_array_fr.concat(nia11c_array_de);
  } else if (lang === "de") {
    return nia11c_array_fr.concat(nia11c_array_en);
  } else {
    return nia11c_array_fr.concat(nia11c_array_en).concat(nia11c_array_de);
  }
}
function check_part_11() {
  if (filter.debug_flag) console.log("11 Langue");
  check_test_11a();
  check_test_11b();
  check_test_11c();
}
function check_test_12a() {
  if (!filter.only_redactor && pageSettings.isAEM) {
    testChecker(
      "12-A",
      "nia12a",
      "dev",
      "red",
      "Absence de certaines propriétés sur le champ de recherche (role=search et aria-label=Globale)",
      test12a
    );
  }
}
function test12a(color, destination, nomenclature) {
  const query = '.topsearch:not([role="search"]), html[lang="fr"] .topsearch:not([aria-label="Globale"])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_test_12b() {
  if (pageSettings.isAEM) {
    testChecker(
      "12-B",
      "nia12b",
      "dev",
      "red",
      "Problème dans les intitulés du champ de recherche (title et placeholder)",
      test12b
    );
  }
}
function test12b(color, destination, nomenclature) {
  const query = 'html[lang="fr"] #topsearch > #search-field-top:not([title^="Rechercher"]), html[lang="fr"] #topsearch > #search-field-top:not([placeholder^="Rechercher"]), html[lang="fr"] #topsearch > button:not([title^="Rechercher"])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_test_12c() {
  if (pageSettings.isAEM) {
    testChecker(
      "12-C",
      "nia12c1",
      "nc",
      "red",
      "L'attribut title d'un bouton du site ne reprend pas son contenu textuel",
      test12c1
    );
    testChecker(
      "12-C",
      "nia12c2",
      "nc",
      "red",
      "L'attribut title d'un bouton du site n'est pas identique à son aria-label",
      test12c2
    );
    if (!filter.only_nc && !filter.only_redactor) {
      testChecker(
        "12-C",
        "nia12c3",
        "dev",
        "yellow",
        "L'attribut title d'un bouton du site, différent de son contenu textuel, n'est pas complété par un attribut aria-label",
        test12c3
      );
    }
  }
}
function test12c1(color, destination, nomenclature) {
  const query = '.topsearch button:not(.anchor-close), button.anchor[data-destination^="#headernav"]:not(.anchor-close), button.anchor[data-destination^="#filters"]:not(.anchor-close), button.anchor[data-destination^="#bloub"]:not(.anchor-close)';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test12c1
  );
}
function test12c2(color, destination, nomenclature) {
  const query = '.topsearch button:not(.anchor-close), button.anchor[data-destination^="#headernav"]:not(.anchor-close), button.anchor[data-destination^="#filters"]:not(.anchor-close), button.anchor[data-destination^="#bloub"]:not(.anchor-close)';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test12c2
  );
}
function test12c3(color, destination, nomenclature) {
  const query = '.topsearch button:not(.anchor-close), button.anchor[data-destination^="#headernav"]:not(.anchor-close), button.anchor[data-destination^="#filters"]:not(.anchor-close), button.anchor[data-destination^="#bloub"]:not(.anchor-close)';
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test12c3
  );
}
function condition_test12c1(node) {
  let flag = false;
  if (isItemVisible(node)) {
    const lang = getClosestLang(node);
    const title = node.hasAttribute("title") ? sanitizeText(node.getAttribute("title"), lang) : "";
    const clean = cleanNode(node);
    const content = sanitizeText(
      clean.innerText !== "" ? clean.innerText : clean.textContent,
      lang
    );
    if (node.hasAttribute("title") && !title.includes(content)) {
      if (filter.debug_flag) {
        console.log(
          "%cERROR",
          "font-weight:700;color:darkred",
          "[" + title + "] VS [" + content + "] "
        );
      }
      flag = true;
    }
  }
  return flag;
}
function condition_test12c2(node) {
  if (isItemVisible(node)) {
    const lang = getClosestLang(node);
    const title = node.hasAttribute("title") ? sanitizeText(node.getAttribute("title"), lang) : "";
    const label = node.hasAttribute("aria-label") ? sanitizeText(node.getAttribute("aria-label"), lang) : "";
    return node.hasAttribute("title") && node.hasAttribute("aria-label") && label !== title;
  }
  return false;
}
function condition_test12c3(node) {
  if (isItemVisible(node)) {
    const lang = getClosestLang(node);
    const title = node.hasAttribute("title") ? sanitizeText(node.getAttribute("title"), lang) : "";
    const clean = cleanNode(node);
    const content = sanitizeText(
      clean.innerText !== "" ? clean.innerText : clean.textContent,
      lang
    );
    return node.hasAttribute("title") && !node.hasAttribute("aria-label") && title.includes(content) && title !== content;
  }
  return false;
}
function check_test_12d() {
  if (!filter.only_redactor) {
    testChecker(
      "12-D",
      "nia12d",
      "dev",
      "yellow",
      "Il n'est pas nécessaire d'ajouter un role button sur un éléments boutons",
      test12d
    );
  }
}
function test12d(color, destination, nomenclature) {
  const query = "button[role=button]";
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_part_12() {
  if (filter.debug_flag) console.log("12 Boutons");
  check_test_12a();
  check_test_12b();
  check_test_12c();
  check_test_12d();
}
function check_test_13a() {
  testChecker(
    "13-A",
    "nia13a",
    "nth",
    "yellow",
    "Présence d'espaces pour créer des effets de marges ou d'alignement (touche espace ou retour à la ligne) [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-10-1-3' target='_blank'>RAWeb 10.1.3</a>]",
    test13a
  );
}
function test13a(color, destination, nomenclature) {
  const query = ".cmp-text, *:not(.cmp-text) > p";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test13a
  );
}
function condition_test13a(node) {
  return Boolean(
    isItemVisible(node) && node.innerText && (/ {3,}/g.test(node.innerText) || /\s{4,}/g.test(node.innerText))
  );
}
let nia13b_limit = 14;
function check_test_13b() {
  if (screen.width < 500) {
    nia13b_limit = 12;
  }
  testChecker(
    "13-B",
    "nia13b1",
    "nth",
    "yellow",
    "Taille de police recommandée pour le texte principal : 16px sur desktop et de 14px sur mobile",
    test13b1
  );
  testChecker(
    "13-B",
    "nia13b2",
    "nth",
    "yellow",
    "Taille de police minimum recommandée pour le texte secondaire : 12px",
    test13b2
  );
}
function test13b1(color, destination, nomenclature) {
  const query = "main .cmp-section *:not(.cmp-contentbox) > .cmp-text p";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test13b1
  );
}
function condition_test13b1(node) {
  const fs = parseFloat(
    window.getComputedStyle(node).getPropertyValue("font-size")
  );
  return Boolean(isItemVisible(node) && fs > 0 && fs < nia13b_limit);
}
function test13b2(color, destination, nomenclature) {
  const query = "p, span, li:not(.cmp-carousel__indicator), strong, h1, h2, h3, h4, h5, small, a, button, blockquote, q, dd, dt, label";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test13b2
  );
}
function condition_test13b2(node) {
  const fs = parseFloat(
    window.getComputedStyle(node).getPropertyValue("font-size")
  );
  return Boolean(isItemVisible(node) && fs > 0 && fs < 11);
}
function check_test_13c() {
  if (pageSettings.isDeclaration) {
    testChecker(
      "13-C",
      "",
      "nc",
      "red",
      "Information manquante dans la déclaration d'accessibilité : Organisme déclarant",
      test13c1
    );
    testChecker(
      "13-C",
      "",
      "nc",
      "red",
      "Information manquante dans la déclaration d'accessibilité : Nom du site",
      test13c2
    );
    testChecker(
      "13-C",
      "",
      "nc",
      "red",
      "Information manquante dans la déclaration d'accessibilité : état de conformité",
      test13c3
    );
    testChecker(
      "13-C",
      "",
      "nc",
      "red",
      "Information manquante dans la déclaration d'accessibilité : Date de la déclaration",
      test13c4
    );
    testChecker(
      "13-C",
      "",
      "nc",
      "red",
      "Information manquante dans la déclaration d'accessibilité : Email de contact",
      test13c5
    );
  }
}
function test13c1() {
  const query = ".basic-information.organization-name";
  return checkIfNoneVisibleItemMatch(query);
}
function test13c2() {
  const query = ".basic-information.website-name";
  return checkIfNoneVisibleItemMatch(query);
}
function test13c3() {
  const query = ".basic-information.conformance-status";
  return checkIfNoneVisibleItemMatch(query);
}
function test13c4() {
  const query = ".basic-information.statement-created-date";
  return checkIfNoneVisibleItemMatch(query);
}
function test13c5() {
  const query = ".basic-information.feedback > .email";
  return checkIfNoneVisibleItemMatch(query);
}
function check_part_13() {
  if (filter.debug_flag) console.log("13 Rédaction");
  check_test_13a();
  check_test_13b();
  check_test_13c();
}
function check_test_14a() {
  testChecker(
    "14-A",
    "nia14a",
    "nc",
    "red",
    "Présence de titre avec un attribut role",
    test14a
  );
}
function test14a(color, destination, nomenclature) {
  const query = 'h1[role]:not([role="heading"]),h2[role]:not([role="heading"]),h3[role]:not([role="heading"]),h4[role]:not([role="heading"]),h5[role]:not([role="heading"]),h6[role]:not([role="heading"])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_test_14b() {
  testChecker(
    "14-B",
    "nia14b",
    "nc",
    "red",
    "Présence d'attribut aria-level en dehors de titre",
    test14b
  );
}
function test14b(color, destination, nomenclature) {
  const query = '[aria-level]:not(h1):not(h2):not(h3):not(h4):not(h5):not(h6):not([role="heading"])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_test_14c() {
  if (!filter.only_redactor) {
    testChecker(
      "14-C",
      "nia14c",
      "nc",
      "red",
      "Présence de titre caché aux outils d'assistance",
      test14c
    );
  }
}
function test14c(color, destination, nomenclature) {
  const query = "h1[aria-hidden],h2[aria-hidden],h3[aria-hidden],h4[aria-hidden],h5[aria-hidden],h6[aria-hidden]";
  return checkIfQueryMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test14c,
    false
  );
}
function condition_test14c(nodes) {
  const heading = document.querySelectorAll(
    "h1:not([aria-hidden]),h2:not([aria-hidden]),h3:not([aria-hidden]),h4:not([aria-hidden]),h5:not([aria-hidden]),h6:not([aria-hidden])"
  );
  let flag = false;
  let find = false;
  if (nodes && nodes.length > 0 && isAtLeastOneItemVisible(nodes)) {
    for (let i = 0; i < nodes.length; i++) {
      if (isItemVisible(nodes[i])) {
        find = false;
        for (let j = 0; j < heading.length; j++) {
          if (nodes[i].tagName === heading[j].tagName && sanitizeText(cleanNode(nodes[i]).textContent, "fr") == sanitizeText(cleanNode(heading[j]).textContent, "fr")) {
            find = true;
            break;
          }
        }
        if (find === false) {
          setItemOutline(nodes[i], "red", "nia14c", "14-C");
          flag = true;
        }
      }
    }
  }
  return flag;
}
function check_test_14d() {
  testChecker(
    "14-D",
    "nia14d",
    "nth",
    "yellow",
    "Présence de texte ressemblant à des titres n'étant pas balisé comme tel - A vérifier au cas par cas [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-1-3' target='_blank'>RAWeb 9.1.3</a>]",
    test14d
  );
}
function test14d(color, destination, nomenclature) {
  const query = "p:not(.cmp-form__mandatory-text) > :where(strong, b):first-child ,span > :where(strong, b):first-child ,div > :where(strong, b):first-child , *:not(.accordionItem) > *:not(figcaption):not(.article-summary):not(.article-metas):not(.search-metas):not(.cmp-grid__textContainer):not(.feed-item-content):not(.meta-themes):not(.description):not(.meta-published-update) > p:not(.cmp-lastupdate):not(.cmp-form__mandatory-text):not(.at):not(.feed-item-author):not(.orejime-Notice-description):first-child";
  return checkIfOneItemMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test14d
  );
}
function condition_test14d(node) {
  return Boolean(
    isItemVisible(node) && node.textContent && node.textContent.length > 0 && node.textContent.length < 150 && parseFloat(window.getComputedStyle(node).getPropertyValue("font-size")) > 16 && (window.getComputedStyle(node).getPropertyValue("font-weight") == "bold" || window.getComputedStyle(node).getPropertyValue("font-weight") == "bolder" || window.getComputedStyle(node).getPropertyValue("font-weight") == "500" || window.getComputedStyle(node).getPropertyValue("font-weight") == "600" || window.getComputedStyle(node).getPropertyValue("font-weight") == "700" || window.getComputedStyle(node).getPropertyValue("font-weight") == "800" || window.getComputedStyle(node).getPropertyValue("font-weight") == "900") && node.parentNode && node === node.parentNode.firstElementChild && (node === node.parentNode.firstChild || node.parentNode.firstChild && node.parentNode.firstChild.nodeName === "#text" && node.parentNode.firstChild.textContent === "") && node.childElementCount === 0
  );
}
function check_test_14e() {
  if (!filter.only_nc) {
    testChecker(
      "14-E",
      "nia14e",
      "nth",
      "yellow",
      'Présence de sauts de titres [<a href="https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-1-1" target="_blank">RAWeb 9.1.1</a>]',
      test14e
    );
  }
}
function test14e(color, destination, nomenclature) {
  const query = ':where(h1,h2,h3,h4,h5,h6,[role="heading"]):not([aria-hidden])';
  return checkIfQueryMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test14e,
    false
  );
}
function condition_test14e(nodes) {
  let flag = false;
  let current_level = 0, previous_level = 0;
  if (nodes && nodes.length > 0) {
    for (let i = 0; i < nodes.length; i++) {
      if (isItemVisible(nodes[i])) {
        if (nodes[i].tagName === "H1" || nodes[i].hasAttribute("aria-level") && nodes[i].hasAttribute("role") && nodes[i].getAttribute("aria-level") === "1" && nodes[i].getAttribute("role") === "heading") {
          current_level = 1;
        } else if (nodes[i].tagName === "H3" || nodes[i].hasAttribute("aria-level") && nodes[i].hasAttribute("role") && nodes[i].getAttribute("aria-level") === "3" && nodes[i].getAttribute("role") === "heading") {
          current_level = 3;
        } else if (nodes[i].tagName === "H4" || nodes[i].hasAttribute("aria-level") && nodes[i].hasAttribute("role") && nodes[i].getAttribute("aria-level") === "4" && nodes[i].getAttribute("role") === "heading") {
          current_level = 4;
        } else if (nodes[i].tagName === "H5" || nodes[i].hasAttribute("aria-level") && nodes[i].hasAttribute("role") && nodes[i].getAttribute("aria-level") === "5" && nodes[i].getAttribute("role") === "heading") {
          current_level = 5;
        } else if (nodes[i].tagName === "H6" || nodes[i].hasAttribute("aria-level") && nodes[i].hasAttribute("role") && nodes[i].getAttribute("aria-level") === "6" && nodes[i].getAttribute("role") === "heading") {
          current_level = 6;
        } else {
          current_level = 2;
        }
        if (current_level - previous_level > 1) {
          setItemOutline(nodes[i], "yellow", "nia14e", "14-E");
          if (filter.debug_flag)
            console.log(
              "  > " + nodes[i].innerText + " | current : " + current_level + " | previous :" + previous_level
            );
          flag = true;
        }
        previous_level = current_level;
      }
    }
  }
  return flag;
}
function check_test_14f() {
  if (!filter.only_nc) {
    testChecker(
      "14-F",
      "nia14f",
      "man",
      "yellow",
      "Présence de 2 titres H1. Pertinence de ceux-ci à vérifier manuellement",
      test14f
    );
  }
}
function test14f(color, destination, nomenclature) {
  const query = 'h1, [role="heading"][aria-level="1"]';
  return checkIfQueryMeetsTheCondition(
    query,
    color,
    destination,
    nomenclature,
    condition_test14f,
    true
  );
}
function condition_test14f(nodes) {
  let counter = 0;
  if (nodes && nodes.length > 1 && isAtLeastOneItemVisible(nodes)) {
    for (let i = 0; i < nodes.length; i++) {
      if (isItemVisible(nodes[i])) {
        counter++;
      }
    }
  }
  return counter > 1;
}
function check_part_14() {
  if (filter.debug_flag) console.log("14 Titre");
  check_test_14a();
  check_test_14b();
  check_test_14c();
  check_test_14d();
  check_test_14e();
  check_test_14f();
}
function check_test_15a() {
  testChecker(
    "15-A",
    "nia15a",
    "dev",
    "yellow",
    `Doter chaque lien ayant un attribut target="_blank" d'un attribut rel="noreferrer noopener". [<a href="https://checklists.opquast.com/fr/assurance-qualite-web/les-liens-externes-qui-ouvrent-une-nouvelle-fenetre-ne-partagent-pas-dinformation-de-contexte" target="_blank">Opquast 25</a>]`,
    test15a
  );
}
function test15a(color, destination, nomenclature) {
  const query = filter.only_redactor ? '.cmp-text a[target="_blank"]:not([rel~="noreferrer"]):not([rel~="noopener"])' : 'a[target="_blank"]:not([rel~="noreferrer"]):not([rel~="noopener"])';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_test_15b() {
  testChecker(
    "15-B",
    "nia15b",
    "nth",
    "yellow",
    'Les pages utilisant le protocole HTTPS ne doivent pas proposer de ressources HTTP [<a href="https://checklists.opquast.com/fr/assurance-qualite-web/les-pages-utilisant-le-protocole-https-ne-proposent-pas-de-ressources-http" target="_blank">Opquast 195</a>]',
    test15b
  );
}
function test15b(color, destination, nomenclature) {
  const query = filter.only_redactor ? '.cmp-text a[target="_blank"][href^="http://"]' : 'a[target="_blank"][href^="http://"]';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_test_15c() {
  if (!filter.only_redactor) {
    testChecker(
      "15-C",
      "",
      "dev",
      "red",
      'Les pages doivent utiliser le protocole HTTPS [<a href="https://checklists.opquast.com/fr/assurance-qualite-web/toutes-les-pages-utilisent-le-protocole-https" target="_blank">Opquast 192</a>]',
      test15c
    );
  }
}
function test15c() {
  return window.location.protocol !== "https:";
}
function check_test_15d() {
  if (!filter.only_redactor) {
    testChecker(
      "15-D",
      "",
      "dev",
      "yellow",
      'Le code source de chaque page contient une métadonnée qui définit le jeu de caractères UTF-8 [<a href="https://checklists.opquast.com/fr/assurance-qualite-web/le-code-source-de-chaque-page-contient-une-metadonnee-qui-definit-le-jeu-de-caracteres" target="_blank">Opquast 225</a>, <a href="https://checklists.opquast.com/fr/assurance-qualite-web/le-codage-de-caracteres-utilise-est-utf-8" target="_blank">226</a>]',
      test15d
    );
  }
}
function test15d() {
  const query = 'head meta[charset="UTF-8"]';
  return checkIfNoneVisibleItemMatch(query);
}
function check_test_15e() {
  testChecker(
    "15-E",
    "nia15e",
    "nth",
    "yellow",
    "Vérifiez si ce document ne peut pas être fourni au format PDF ou HTML",
    test15e
  );
}
function test15e(color, destination, nomenclature) {
  const query = 'a[href$=".doc"], a[href$=".docx"], a[href$=".xls"], a[href$=".xlsx"], a[href$=".ppt"], a[href$=".pptx"], a[href$=".txt"]';
  return checkIfOneVisibleItemMatch(query, color, destination, nomenclature);
}
function check_test_15f() {
  if (!filter.only_redactor) {
    testChecker(
      "15-F",
      "",
      "dev",
      "red",
      "L'URL de la page ne doit pas utilisé de caractère spéciaux",
      test15f
    );
  }
}
function test15f() {
  const nia15f_regex = /[^A-Za-z0-9\-._~:/?#[\]@!$&'()*+,;=%]/g;
  return currentUrl.match(nia15f_regex) !== null;
}
function check_test_15g() {
  if (!filter.only_redactor && pageSettings.isAEM && pageSettings.isCTIE) {
    testChecker(
      "15-G",
      "",
      "nth",
      "yellow",
      "Absence de la modale de cookie Orejime",
      test15g
    );
  }
}
function test15g() {
  const query = "#orejime";
  return checkIfNoneVisibleItemMatch(query);
}
function check_part_15() {
  if (filter.debug_flag) console.log("15 Sécurité");
  check_test_15a();
  check_test_15b();
  check_test_15c();
  check_test_15d();
  check_test_15e();
  check_test_15f();
  check_test_15g();
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var isArray_1;
var hasRequiredIsArray;
function requireIsArray() {
  if (hasRequiredIsArray) return isArray_1;
  hasRequiredIsArray = 1;
  var isArray = Array.isArray;
  isArray_1 = isArray;
  return isArray_1;
}
var _freeGlobal;
var hasRequired_freeGlobal;
function require_freeGlobal() {
  if (hasRequired_freeGlobal) return _freeGlobal;
  hasRequired_freeGlobal = 1;
  var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
  _freeGlobal = freeGlobal;
  return _freeGlobal;
}
var _root;
var hasRequired_root;
function require_root() {
  if (hasRequired_root) return _root;
  hasRequired_root = 1;
  var freeGlobal = require_freeGlobal();
  var freeSelf = typeof self == "object" && self && self.Object === Object && self;
  var root = freeGlobal || freeSelf || Function("return this")();
  _root = root;
  return _root;
}
var _Symbol;
var hasRequired_Symbol;
function require_Symbol() {
  if (hasRequired_Symbol) return _Symbol;
  hasRequired_Symbol = 1;
  var root = require_root();
  var Symbol2 = root.Symbol;
  _Symbol = Symbol2;
  return _Symbol;
}
var _getRawTag;
var hasRequired_getRawTag;
function require_getRawTag() {
  if (hasRequired_getRawTag) return _getRawTag;
  hasRequired_getRawTag = 1;
  var Symbol2 = require_Symbol();
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var nativeObjectToString = objectProto.toString;
  var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
    try {
      value[symToStringTag] = void 0;
      var unmasked = true;
    } catch (e) {
    }
    var result = nativeObjectToString.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }
  _getRawTag = getRawTag;
  return _getRawTag;
}
var _objectToString;
var hasRequired_objectToString;
function require_objectToString() {
  if (hasRequired_objectToString) return _objectToString;
  hasRequired_objectToString = 1;
  var objectProto = Object.prototype;
  var nativeObjectToString = objectProto.toString;
  function objectToString(value) {
    return nativeObjectToString.call(value);
  }
  _objectToString = objectToString;
  return _objectToString;
}
var _baseGetTag;
var hasRequired_baseGetTag;
function require_baseGetTag() {
  if (hasRequired_baseGetTag) return _baseGetTag;
  hasRequired_baseGetTag = 1;
  var Symbol2 = require_Symbol(), getRawTag = require_getRawTag(), objectToString = require_objectToString();
  var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
  var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
  function baseGetTag(value) {
    if (value == null) {
      return value === void 0 ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
  }
  _baseGetTag = baseGetTag;
  return _baseGetTag;
}
var isObjectLike_1;
var hasRequiredIsObjectLike;
function requireIsObjectLike() {
  if (hasRequiredIsObjectLike) return isObjectLike_1;
  hasRequiredIsObjectLike = 1;
  function isObjectLike(value) {
    return value != null && typeof value == "object";
  }
  isObjectLike_1 = isObjectLike;
  return isObjectLike_1;
}
var isSymbol_1;
var hasRequiredIsSymbol;
function requireIsSymbol() {
  if (hasRequiredIsSymbol) return isSymbol_1;
  hasRequiredIsSymbol = 1;
  var baseGetTag = require_baseGetTag(), isObjectLike = requireIsObjectLike();
  var symbolTag = "[object Symbol]";
  function isSymbol(value) {
    return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
  }
  isSymbol_1 = isSymbol;
  return isSymbol_1;
}
var _isKey;
var hasRequired_isKey;
function require_isKey() {
  if (hasRequired_isKey) return _isKey;
  hasRequired_isKey = 1;
  var isArray = requireIsArray(), isSymbol = requireIsSymbol();
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
  function isKey(value, object) {
    if (isArray(value)) {
      return false;
    }
    var type = typeof value;
    if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
      return true;
    }
    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
  }
  _isKey = isKey;
  return _isKey;
}
var isObject_1;
var hasRequiredIsObject;
function requireIsObject() {
  if (hasRequiredIsObject) return isObject_1;
  hasRequiredIsObject = 1;
  function isObject(value) {
    var type = typeof value;
    return value != null && (type == "object" || type == "function");
  }
  isObject_1 = isObject;
  return isObject_1;
}
var isFunction_1;
var hasRequiredIsFunction;
function requireIsFunction() {
  if (hasRequiredIsFunction) return isFunction_1;
  hasRequiredIsFunction = 1;
  var baseGetTag = require_baseGetTag(), isObject = requireIsObject();
  var asyncTag = "[object AsyncFunction]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
  function isFunction(value) {
    if (!isObject(value)) {
      return false;
    }
    var tag = baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }
  isFunction_1 = isFunction;
  return isFunction_1;
}
var _coreJsData;
var hasRequired_coreJsData;
function require_coreJsData() {
  if (hasRequired_coreJsData) return _coreJsData;
  hasRequired_coreJsData = 1;
  var root = require_root();
  var coreJsData = root["__core-js_shared__"];
  _coreJsData = coreJsData;
  return _coreJsData;
}
var _isMasked;
var hasRequired_isMasked;
function require_isMasked() {
  if (hasRequired_isMasked) return _isMasked;
  hasRequired_isMasked = 1;
  var coreJsData = require_coreJsData();
  var maskSrcKey = (function() {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
  })();
  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }
  _isMasked = isMasked;
  return _isMasked;
}
var _toSource;
var hasRequired_toSource;
function require_toSource() {
  if (hasRequired_toSource) return _toSource;
  hasRequired_toSource = 1;
  var funcProto = Function.prototype;
  var funcToString = funcProto.toString;
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {
      }
      try {
        return func + "";
      } catch (e) {
      }
    }
    return "";
  }
  _toSource = toSource;
  return _toSource;
}
var _baseIsNative;
var hasRequired_baseIsNative;
function require_baseIsNative() {
  if (hasRequired_baseIsNative) return _baseIsNative;
  hasRequired_baseIsNative = 1;
  var isFunction = requireIsFunction(), isMasked = require_isMasked(), isObject = requireIsObject(), toSource = require_toSource();
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  var funcProto = Function.prototype, objectProto = Object.prototype;
  var funcToString = funcProto.toString;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var reIsNative = RegExp(
    "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) {
      return false;
    }
    var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }
  _baseIsNative = baseIsNative;
  return _baseIsNative;
}
var _getValue;
var hasRequired_getValue;
function require_getValue() {
  if (hasRequired_getValue) return _getValue;
  hasRequired_getValue = 1;
  function getValue(object, key) {
    return object == null ? void 0 : object[key];
  }
  _getValue = getValue;
  return _getValue;
}
var _getNative;
var hasRequired_getNative;
function require_getNative() {
  if (hasRequired_getNative) return _getNative;
  hasRequired_getNative = 1;
  var baseIsNative = require_baseIsNative(), getValue = require_getValue();
  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : void 0;
  }
  _getNative = getNative;
  return _getNative;
}
var _nativeCreate;
var hasRequired_nativeCreate;
function require_nativeCreate() {
  if (hasRequired_nativeCreate) return _nativeCreate;
  hasRequired_nativeCreate = 1;
  var getNative = require_getNative();
  var nativeCreate = getNative(Object, "create");
  _nativeCreate = nativeCreate;
  return _nativeCreate;
}
var _hashClear;
var hasRequired_hashClear;
function require_hashClear() {
  if (hasRequired_hashClear) return _hashClear;
  hasRequired_hashClear = 1;
  var nativeCreate = require_nativeCreate();
  function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
    this.size = 0;
  }
  _hashClear = hashClear;
  return _hashClear;
}
var _hashDelete;
var hasRequired_hashDelete;
function require_hashDelete() {
  if (hasRequired_hashDelete) return _hashDelete;
  hasRequired_hashDelete = 1;
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }
  _hashDelete = hashDelete;
  return _hashDelete;
}
var _hashGet;
var hasRequired_hashGet;
function require_hashGet() {
  if (hasRequired_hashGet) return _hashGet;
  hasRequired_hashGet = 1;
  var nativeCreate = require_nativeCreate();
  var HASH_UNDEFINED = "__lodash_hash_undefined__";
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED ? void 0 : result;
    }
    return hasOwnProperty.call(data, key) ? data[key] : void 0;
  }
  _hashGet = hashGet;
  return _hashGet;
}
var _hashHas;
var hasRequired_hashHas;
function require_hashHas() {
  if (hasRequired_hashHas) return _hashHas;
  hasRequired_hashHas = 1;
  var nativeCreate = require_nativeCreate();
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
  }
  _hashHas = hashHas;
  return _hashHas;
}
var _hashSet;
var hasRequired_hashSet;
function require_hashSet() {
  if (hasRequired_hashSet) return _hashSet;
  hasRequired_hashSet = 1;
  var nativeCreate = require_nativeCreate();
  var HASH_UNDEFINED = "__lodash_hash_undefined__";
  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
    return this;
  }
  _hashSet = hashSet;
  return _hashSet;
}
var _Hash;
var hasRequired_Hash;
function require_Hash() {
  if (hasRequired_Hash) return _Hash;
  hasRequired_Hash = 1;
  var hashClear = require_hashClear(), hashDelete = require_hashDelete(), hashGet = require_hashGet(), hashHas = require_hashHas(), hashSet = require_hashSet();
  function Hash(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  Hash.prototype.clear = hashClear;
  Hash.prototype["delete"] = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;
  _Hash = Hash;
  return _Hash;
}
var _listCacheClear;
var hasRequired_listCacheClear;
function require_listCacheClear() {
  if (hasRequired_listCacheClear) return _listCacheClear;
  hasRequired_listCacheClear = 1;
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }
  _listCacheClear = listCacheClear;
  return _listCacheClear;
}
var eq_1;
var hasRequiredEq;
function requireEq() {
  if (hasRequiredEq) return eq_1;
  hasRequiredEq = 1;
  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }
  eq_1 = eq;
  return eq_1;
}
var _assocIndexOf;
var hasRequired_assocIndexOf;
function require_assocIndexOf() {
  if (hasRequired_assocIndexOf) return _assocIndexOf;
  hasRequired_assocIndexOf = 1;
  var eq = requireEq();
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }
  _assocIndexOf = assocIndexOf;
  return _assocIndexOf;
}
var _listCacheDelete;
var hasRequired_listCacheDelete;
function require_listCacheDelete() {
  if (hasRequired_listCacheDelete) return _listCacheDelete;
  hasRequired_listCacheDelete = 1;
  var assocIndexOf = require_assocIndexOf();
  var arrayProto = Array.prototype;
  var splice = arrayProto.splice;
  function listCacheDelete(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    --this.size;
    return true;
  }
  _listCacheDelete = listCacheDelete;
  return _listCacheDelete;
}
var _listCacheGet;
var hasRequired_listCacheGet;
function require_listCacheGet() {
  if (hasRequired_listCacheGet) return _listCacheGet;
  hasRequired_listCacheGet = 1;
  var assocIndexOf = require_assocIndexOf();
  function listCacheGet(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    return index < 0 ? void 0 : data[index][1];
  }
  _listCacheGet = listCacheGet;
  return _listCacheGet;
}
var _listCacheHas;
var hasRequired_listCacheHas;
function require_listCacheHas() {
  if (hasRequired_listCacheHas) return _listCacheHas;
  hasRequired_listCacheHas = 1;
  var assocIndexOf = require_assocIndexOf();
  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }
  _listCacheHas = listCacheHas;
  return _listCacheHas;
}
var _listCacheSet;
var hasRequired_listCacheSet;
function require_listCacheSet() {
  if (hasRequired_listCacheSet) return _listCacheSet;
  hasRequired_listCacheSet = 1;
  var assocIndexOf = require_assocIndexOf();
  function listCacheSet(key, value) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }
  _listCacheSet = listCacheSet;
  return _listCacheSet;
}
var _ListCache;
var hasRequired_ListCache;
function require_ListCache() {
  if (hasRequired_ListCache) return _ListCache;
  hasRequired_ListCache = 1;
  var listCacheClear = require_listCacheClear(), listCacheDelete = require_listCacheDelete(), listCacheGet = require_listCacheGet(), listCacheHas = require_listCacheHas(), listCacheSet = require_listCacheSet();
  function ListCache(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype["delete"] = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;
  _ListCache = ListCache;
  return _ListCache;
}
var _Map;
var hasRequired_Map;
function require_Map() {
  if (hasRequired_Map) return _Map;
  hasRequired_Map = 1;
  var getNative = require_getNative(), root = require_root();
  var Map = getNative(root, "Map");
  _Map = Map;
  return _Map;
}
var _mapCacheClear;
var hasRequired_mapCacheClear;
function require_mapCacheClear() {
  if (hasRequired_mapCacheClear) return _mapCacheClear;
  hasRequired_mapCacheClear = 1;
  var Hash = require_Hash(), ListCache = require_ListCache(), Map = require_Map();
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      "hash": new Hash(),
      "map": new (Map || ListCache)(),
      "string": new Hash()
    };
  }
  _mapCacheClear = mapCacheClear;
  return _mapCacheClear;
}
var _isKeyable;
var hasRequired_isKeyable;
function require_isKeyable() {
  if (hasRequired_isKeyable) return _isKeyable;
  hasRequired_isKeyable = 1;
  function isKeyable(value) {
    var type = typeof value;
    return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
  }
  _isKeyable = isKeyable;
  return _isKeyable;
}
var _getMapData;
var hasRequired_getMapData;
function require_getMapData() {
  if (hasRequired_getMapData) return _getMapData;
  hasRequired_getMapData = 1;
  var isKeyable = require_isKeyable();
  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
  }
  _getMapData = getMapData;
  return _getMapData;
}
var _mapCacheDelete;
var hasRequired_mapCacheDelete;
function require_mapCacheDelete() {
  if (hasRequired_mapCacheDelete) return _mapCacheDelete;
  hasRequired_mapCacheDelete = 1;
  var getMapData = require_getMapData();
  function mapCacheDelete(key) {
    var result = getMapData(this, key)["delete"](key);
    this.size -= result ? 1 : 0;
    return result;
  }
  _mapCacheDelete = mapCacheDelete;
  return _mapCacheDelete;
}
var _mapCacheGet;
var hasRequired_mapCacheGet;
function require_mapCacheGet() {
  if (hasRequired_mapCacheGet) return _mapCacheGet;
  hasRequired_mapCacheGet = 1;
  var getMapData = require_getMapData();
  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }
  _mapCacheGet = mapCacheGet;
  return _mapCacheGet;
}
var _mapCacheHas;
var hasRequired_mapCacheHas;
function require_mapCacheHas() {
  if (hasRequired_mapCacheHas) return _mapCacheHas;
  hasRequired_mapCacheHas = 1;
  var getMapData = require_getMapData();
  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }
  _mapCacheHas = mapCacheHas;
  return _mapCacheHas;
}
var _mapCacheSet;
var hasRequired_mapCacheSet;
function require_mapCacheSet() {
  if (hasRequired_mapCacheSet) return _mapCacheSet;
  hasRequired_mapCacheSet = 1;
  var getMapData = require_getMapData();
  function mapCacheSet(key, value) {
    var data = getMapData(this, key), size = data.size;
    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }
  _mapCacheSet = mapCacheSet;
  return _mapCacheSet;
}
var _MapCache;
var hasRequired_MapCache;
function require_MapCache() {
  if (hasRequired_MapCache) return _MapCache;
  hasRequired_MapCache = 1;
  var mapCacheClear = require_mapCacheClear(), mapCacheDelete = require_mapCacheDelete(), mapCacheGet = require_mapCacheGet(), mapCacheHas = require_mapCacheHas(), mapCacheSet = require_mapCacheSet();
  function MapCache(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype["delete"] = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;
  _MapCache = MapCache;
  return _MapCache;
}
var memoize_1;
var hasRequiredMemoize;
function requireMemoize() {
  if (hasRequiredMemoize) return memoize_1;
  hasRequiredMemoize = 1;
  var MapCache = require_MapCache();
  var FUNC_ERROR_TEXT = "Expected a function";
  function memoize(func, resolver) {
    if (typeof func != "function" || resolver != null && typeof resolver != "function") {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    var memoized = function() {
      var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
      if (cache.has(key)) {
        return cache.get(key);
      }
      var result = func.apply(this, args);
      memoized.cache = cache.set(key, result) || cache;
      return result;
    };
    memoized.cache = new (memoize.Cache || MapCache)();
    return memoized;
  }
  memoize.Cache = MapCache;
  memoize_1 = memoize;
  return memoize_1;
}
var _memoizeCapped;
var hasRequired_memoizeCapped;
function require_memoizeCapped() {
  if (hasRequired_memoizeCapped) return _memoizeCapped;
  hasRequired_memoizeCapped = 1;
  var memoize = requireMemoize();
  var MAX_MEMOIZE_SIZE = 500;
  function memoizeCapped(func) {
    var result = memoize(func, function(key) {
      if (cache.size === MAX_MEMOIZE_SIZE) {
        cache.clear();
      }
      return key;
    });
    var cache = result.cache;
    return result;
  }
  _memoizeCapped = memoizeCapped;
  return _memoizeCapped;
}
var _stringToPath;
var hasRequired_stringToPath;
function require_stringToPath() {
  if (hasRequired_stringToPath) return _stringToPath;
  hasRequired_stringToPath = 1;
  var memoizeCapped = require_memoizeCapped();
  var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
  var reEscapeChar = /\\(\\)?/g;
  var stringToPath = memoizeCapped(function(string) {
    var result = [];
    if (string.charCodeAt(0) === 46) {
      result.push("");
    }
    string.replace(rePropName, function(match, number, quote, subString) {
      result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
    });
    return result;
  });
  _stringToPath = stringToPath;
  return _stringToPath;
}
var _arrayMap;
var hasRequired_arrayMap;
function require_arrayMap() {
  if (hasRequired_arrayMap) return _arrayMap;
  hasRequired_arrayMap = 1;
  function arrayMap(array, iteratee) {
    var index = -1, length = array == null ? 0 : array.length, result = Array(length);
    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }
  _arrayMap = arrayMap;
  return _arrayMap;
}
var _baseToString;
var hasRequired_baseToString;
function require_baseToString() {
  if (hasRequired_baseToString) return _baseToString;
  hasRequired_baseToString = 1;
  var Symbol2 = require_Symbol(), arrayMap = require_arrayMap(), isArray = requireIsArray(), isSymbol = requireIsSymbol();
  var symbolProto = Symbol2 ? Symbol2.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
  function baseToString(value) {
    if (typeof value == "string") {
      return value;
    }
    if (isArray(value)) {
      return arrayMap(value, baseToString) + "";
    }
    if (isSymbol(value)) {
      return symbolToString ? symbolToString.call(value) : "";
    }
    var result = value + "";
    return result == "0" && 1 / value == -Infinity ? "-0" : result;
  }
  _baseToString = baseToString;
  return _baseToString;
}
var toString_1;
var hasRequiredToString;
function requireToString() {
  if (hasRequiredToString) return toString_1;
  hasRequiredToString = 1;
  var baseToString = require_baseToString();
  function toString(value) {
    return value == null ? "" : baseToString(value);
  }
  toString_1 = toString;
  return toString_1;
}
var _castPath;
var hasRequired_castPath;
function require_castPath() {
  if (hasRequired_castPath) return _castPath;
  hasRequired_castPath = 1;
  var isArray = requireIsArray(), isKey = require_isKey(), stringToPath = require_stringToPath(), toString = requireToString();
  function castPath(value, object) {
    if (isArray(value)) {
      return value;
    }
    return isKey(value, object) ? [value] : stringToPath(toString(value));
  }
  _castPath = castPath;
  return _castPath;
}
var _toKey;
var hasRequired_toKey;
function require_toKey() {
  if (hasRequired_toKey) return _toKey;
  hasRequired_toKey = 1;
  var isSymbol = requireIsSymbol();
  function toKey(value) {
    if (typeof value == "string" || isSymbol(value)) {
      return value;
    }
    var result = value + "";
    return result == "0" && 1 / value == -Infinity ? "-0" : result;
  }
  _toKey = toKey;
  return _toKey;
}
var _baseGet;
var hasRequired_baseGet;
function require_baseGet() {
  if (hasRequired_baseGet) return _baseGet;
  hasRequired_baseGet = 1;
  var castPath = require_castPath(), toKey = require_toKey();
  function baseGet(object, path) {
    path = castPath(path, object);
    var index = 0, length = path.length;
    while (object != null && index < length) {
      object = object[toKey(path[index++])];
    }
    return index && index == length ? object : void 0;
  }
  _baseGet = baseGet;
  return _baseGet;
}
var get_1;
var hasRequiredGet;
function requireGet() {
  if (hasRequiredGet) return get_1;
  hasRequiredGet = 1;
  var baseGet = require_baseGet();
  function get2(object, path, defaultValue) {
    var result = object == null ? void 0 : baseGet(object, path);
    return result === void 0 ? defaultValue : result;
  }
  get_1 = get2;
  return get_1;
}
var getExports = requireGet();
const get = /* @__PURE__ */ getDefaultExportFromCjs(getExports);
var _baseHas;
var hasRequired_baseHas;
function require_baseHas() {
  if (hasRequired_baseHas) return _baseHas;
  hasRequired_baseHas = 1;
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  function baseHas(object, key) {
    return object != null && hasOwnProperty.call(object, key);
  }
  _baseHas = baseHas;
  return _baseHas;
}
var _baseIsArguments;
var hasRequired_baseIsArguments;
function require_baseIsArguments() {
  if (hasRequired_baseIsArguments) return _baseIsArguments;
  hasRequired_baseIsArguments = 1;
  var baseGetTag = require_baseGetTag(), isObjectLike = requireIsObjectLike();
  var argsTag = "[object Arguments]";
  function baseIsArguments(value) {
    return isObjectLike(value) && baseGetTag(value) == argsTag;
  }
  _baseIsArguments = baseIsArguments;
  return _baseIsArguments;
}
var isArguments_1;
var hasRequiredIsArguments;
function requireIsArguments() {
  if (hasRequiredIsArguments) return isArguments_1;
  hasRequiredIsArguments = 1;
  var baseIsArguments = require_baseIsArguments(), isObjectLike = requireIsObjectLike();
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var propertyIsEnumerable = objectProto.propertyIsEnumerable;
  var isArguments = baseIsArguments(/* @__PURE__ */ (function() {
    return arguments;
  })()) ? baseIsArguments : function(value) {
    return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
  };
  isArguments_1 = isArguments;
  return isArguments_1;
}
var _isIndex;
var hasRequired_isIndex;
function require_isIndex() {
  if (hasRequired_isIndex) return _isIndex;
  hasRequired_isIndex = 1;
  var MAX_SAFE_INTEGER2 = 9007199254740991;
  var reIsUint = /^(?:0|[1-9]\d*)$/;
  function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER2 : length;
    return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
  }
  _isIndex = isIndex;
  return _isIndex;
}
var isLength_1;
var hasRequiredIsLength;
function requireIsLength() {
  if (hasRequiredIsLength) return isLength_1;
  hasRequiredIsLength = 1;
  var MAX_SAFE_INTEGER2 = 9007199254740991;
  function isLength(value) {
    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER2;
  }
  isLength_1 = isLength;
  return isLength_1;
}
var _hasPath;
var hasRequired_hasPath;
function require_hasPath() {
  if (hasRequired_hasPath) return _hasPath;
  hasRequired_hasPath = 1;
  var castPath = require_castPath(), isArguments = requireIsArguments(), isArray = requireIsArray(), isIndex = require_isIndex(), isLength = requireIsLength(), toKey = require_toKey();
  function hasPath(object, path, hasFunc) {
    path = castPath(path, object);
    var index = -1, length = path.length, result = false;
    while (++index < length) {
      var key = toKey(path[index]);
      if (!(result = object != null && hasFunc(object, key))) {
        break;
      }
      object = object[key];
    }
    if (result || ++index != length) {
      return result;
    }
    length = object == null ? 0 : object.length;
    return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
  }
  _hasPath = hasPath;
  return _hasPath;
}
var has_1;
var hasRequiredHas;
function requireHas() {
  if (hasRequiredHas) return has_1;
  hasRequiredHas = 1;
  var baseHas = require_baseHas(), hasPath = require_hasPath();
  function has2(object, path) {
    return object != null && hasPath(object, path, baseHas);
  }
  has_1 = has2;
  return has_1;
}
var hasExports = requireHas();
const has = /* @__PURE__ */ getDefaultExportFromCjs(hasExports);
var _stackClear;
var hasRequired_stackClear;
function require_stackClear() {
  if (hasRequired_stackClear) return _stackClear;
  hasRequired_stackClear = 1;
  var ListCache = require_ListCache();
  function stackClear() {
    this.__data__ = new ListCache();
    this.size = 0;
  }
  _stackClear = stackClear;
  return _stackClear;
}
var _stackDelete;
var hasRequired_stackDelete;
function require_stackDelete() {
  if (hasRequired_stackDelete) return _stackDelete;
  hasRequired_stackDelete = 1;
  function stackDelete(key) {
    var data = this.__data__, result = data["delete"](key);
    this.size = data.size;
    return result;
  }
  _stackDelete = stackDelete;
  return _stackDelete;
}
var _stackGet;
var hasRequired_stackGet;
function require_stackGet() {
  if (hasRequired_stackGet) return _stackGet;
  hasRequired_stackGet = 1;
  function stackGet(key) {
    return this.__data__.get(key);
  }
  _stackGet = stackGet;
  return _stackGet;
}
var _stackHas;
var hasRequired_stackHas;
function require_stackHas() {
  if (hasRequired_stackHas) return _stackHas;
  hasRequired_stackHas = 1;
  function stackHas(key) {
    return this.__data__.has(key);
  }
  _stackHas = stackHas;
  return _stackHas;
}
var _stackSet;
var hasRequired_stackSet;
function require_stackSet() {
  if (hasRequired_stackSet) return _stackSet;
  hasRequired_stackSet = 1;
  var ListCache = require_ListCache(), Map = require_Map(), MapCache = require_MapCache();
  var LARGE_ARRAY_SIZE = 200;
  function stackSet(key, value) {
    var data = this.__data__;
    if (data instanceof ListCache) {
      var pairs = data.__data__;
      if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new MapCache(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }
  _stackSet = stackSet;
  return _stackSet;
}
var _Stack;
var hasRequired_Stack;
function require_Stack() {
  if (hasRequired_Stack) return _Stack;
  hasRequired_Stack = 1;
  var ListCache = require_ListCache(), stackClear = require_stackClear(), stackDelete = require_stackDelete(), stackGet = require_stackGet(), stackHas = require_stackHas(), stackSet = require_stackSet();
  function Stack(entries) {
    var data = this.__data__ = new ListCache(entries);
    this.size = data.size;
  }
  Stack.prototype.clear = stackClear;
  Stack.prototype["delete"] = stackDelete;
  Stack.prototype.get = stackGet;
  Stack.prototype.has = stackHas;
  Stack.prototype.set = stackSet;
  _Stack = Stack;
  return _Stack;
}
var _defineProperty;
var hasRequired_defineProperty;
function require_defineProperty() {
  if (hasRequired_defineProperty) return _defineProperty;
  hasRequired_defineProperty = 1;
  var getNative = require_getNative();
  var defineProperty = (function() {
    try {
      var func = getNative(Object, "defineProperty");
      func({}, "", {});
      return func;
    } catch (e) {
    }
  })();
  _defineProperty = defineProperty;
  return _defineProperty;
}
var _baseAssignValue;
var hasRequired_baseAssignValue;
function require_baseAssignValue() {
  if (hasRequired_baseAssignValue) return _baseAssignValue;
  hasRequired_baseAssignValue = 1;
  var defineProperty = require_defineProperty();
  function baseAssignValue(object, key, value) {
    if (key == "__proto__" && defineProperty) {
      defineProperty(object, key, {
        "configurable": true,
        "enumerable": true,
        "value": value,
        "writable": true
      });
    } else {
      object[key] = value;
    }
  }
  _baseAssignValue = baseAssignValue;
  return _baseAssignValue;
}
var _assignMergeValue;
var hasRequired_assignMergeValue;
function require_assignMergeValue() {
  if (hasRequired_assignMergeValue) return _assignMergeValue;
  hasRequired_assignMergeValue = 1;
  var baseAssignValue = require_baseAssignValue(), eq = requireEq();
  function assignMergeValue(object, key, value) {
    if (value !== void 0 && !eq(object[key], value) || value === void 0 && !(key in object)) {
      baseAssignValue(object, key, value);
    }
  }
  _assignMergeValue = assignMergeValue;
  return _assignMergeValue;
}
var _createBaseFor;
var hasRequired_createBaseFor;
function require_createBaseFor() {
  if (hasRequired_createBaseFor) return _createBaseFor;
  hasRequired_createBaseFor = 1;
  function createBaseFor(fromRight) {
    return function(object, iteratee, keysFunc) {
      var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
      while (length--) {
        var key = props[fromRight ? length : ++index];
        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }
      return object;
    };
  }
  _createBaseFor = createBaseFor;
  return _createBaseFor;
}
var _baseFor;
var hasRequired_baseFor;
function require_baseFor() {
  if (hasRequired_baseFor) return _baseFor;
  hasRequired_baseFor = 1;
  var createBaseFor = require_createBaseFor();
  var baseFor = createBaseFor();
  _baseFor = baseFor;
  return _baseFor;
}
var _cloneBuffer = { exports: {} };
_cloneBuffer.exports;
var hasRequired_cloneBuffer;
function require_cloneBuffer() {
  if (hasRequired_cloneBuffer) return _cloneBuffer.exports;
  hasRequired_cloneBuffer = 1;
  (function(module, exports) {
    var root = require_root();
    var freeExports = exports && !exports.nodeType && exports;
    var freeModule = freeExports && true && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var Buffer = moduleExports ? root.Buffer : void 0, allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;
    function cloneBuffer(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }
      var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
      buffer.copy(result);
      return result;
    }
    module.exports = cloneBuffer;
  })(_cloneBuffer, _cloneBuffer.exports);
  return _cloneBuffer.exports;
}
var _Uint8Array;
var hasRequired_Uint8Array;
function require_Uint8Array() {
  if (hasRequired_Uint8Array) return _Uint8Array;
  hasRequired_Uint8Array = 1;
  var root = require_root();
  var Uint8Array = root.Uint8Array;
  _Uint8Array = Uint8Array;
  return _Uint8Array;
}
var _cloneArrayBuffer;
var hasRequired_cloneArrayBuffer;
function require_cloneArrayBuffer() {
  if (hasRequired_cloneArrayBuffer) return _cloneArrayBuffer;
  hasRequired_cloneArrayBuffer = 1;
  var Uint8Array = require_Uint8Array();
  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array(result).set(new Uint8Array(arrayBuffer));
    return result;
  }
  _cloneArrayBuffer = cloneArrayBuffer;
  return _cloneArrayBuffer;
}
var _cloneTypedArray;
var hasRequired_cloneTypedArray;
function require_cloneTypedArray() {
  if (hasRequired_cloneTypedArray) return _cloneTypedArray;
  hasRequired_cloneTypedArray = 1;
  var cloneArrayBuffer = require_cloneArrayBuffer();
  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }
  _cloneTypedArray = cloneTypedArray;
  return _cloneTypedArray;
}
var _copyArray;
var hasRequired_copyArray;
function require_copyArray() {
  if (hasRequired_copyArray) return _copyArray;
  hasRequired_copyArray = 1;
  function copyArray(source, array) {
    var index = -1, length = source.length;
    array || (array = Array(length));
    while (++index < length) {
      array[index] = source[index];
    }
    return array;
  }
  _copyArray = copyArray;
  return _copyArray;
}
var _baseCreate;
var hasRequired_baseCreate;
function require_baseCreate() {
  if (hasRequired_baseCreate) return _baseCreate;
  hasRequired_baseCreate = 1;
  var isObject = requireIsObject();
  var objectCreate = Object.create;
  var baseCreate = /* @__PURE__ */ (function() {
    function object() {
    }
    return function(proto) {
      if (!isObject(proto)) {
        return {};
      }
      if (objectCreate) {
        return objectCreate(proto);
      }
      object.prototype = proto;
      var result = new object();
      object.prototype = void 0;
      return result;
    };
  })();
  _baseCreate = baseCreate;
  return _baseCreate;
}
var _overArg;
var hasRequired_overArg;
function require_overArg() {
  if (hasRequired_overArg) return _overArg;
  hasRequired_overArg = 1;
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }
  _overArg = overArg;
  return _overArg;
}
var _getPrototype;
var hasRequired_getPrototype;
function require_getPrototype() {
  if (hasRequired_getPrototype) return _getPrototype;
  hasRequired_getPrototype = 1;
  var overArg = require_overArg();
  var getPrototype = overArg(Object.getPrototypeOf, Object);
  _getPrototype = getPrototype;
  return _getPrototype;
}
var _isPrototype;
var hasRequired_isPrototype;
function require_isPrototype() {
  if (hasRequired_isPrototype) return _isPrototype;
  hasRequired_isPrototype = 1;
  var objectProto = Object.prototype;
  function isPrototype2(value) {
    var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
    return value === proto;
  }
  _isPrototype = isPrototype2;
  return _isPrototype;
}
var _initCloneObject;
var hasRequired_initCloneObject;
function require_initCloneObject() {
  if (hasRequired_initCloneObject) return _initCloneObject;
  hasRequired_initCloneObject = 1;
  var baseCreate = require_baseCreate(), getPrototype = require_getPrototype(), isPrototype2 = require_isPrototype();
  function initCloneObject(object) {
    return typeof object.constructor == "function" && !isPrototype2(object) ? baseCreate(getPrototype(object)) : {};
  }
  _initCloneObject = initCloneObject;
  return _initCloneObject;
}
var isArrayLike_1;
var hasRequiredIsArrayLike;
function requireIsArrayLike() {
  if (hasRequiredIsArrayLike) return isArrayLike_1;
  hasRequiredIsArrayLike = 1;
  var isFunction = requireIsFunction(), isLength = requireIsLength();
  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
  }
  isArrayLike_1 = isArrayLike;
  return isArrayLike_1;
}
var isArrayLikeObject_1;
var hasRequiredIsArrayLikeObject;
function requireIsArrayLikeObject() {
  if (hasRequiredIsArrayLikeObject) return isArrayLikeObject_1;
  hasRequiredIsArrayLikeObject = 1;
  var isArrayLike = requireIsArrayLike(), isObjectLike = requireIsObjectLike();
  function isArrayLikeObject(value) {
    return isObjectLike(value) && isArrayLike(value);
  }
  isArrayLikeObject_1 = isArrayLikeObject;
  return isArrayLikeObject_1;
}
var isBuffer = { exports: {} };
var stubFalse_1;
var hasRequiredStubFalse;
function requireStubFalse() {
  if (hasRequiredStubFalse) return stubFalse_1;
  hasRequiredStubFalse = 1;
  function stubFalse() {
    return false;
  }
  stubFalse_1 = stubFalse;
  return stubFalse_1;
}
isBuffer.exports;
var hasRequiredIsBuffer;
function requireIsBuffer() {
  if (hasRequiredIsBuffer) return isBuffer.exports;
  hasRequiredIsBuffer = 1;
  (function(module, exports) {
    var root = require_root(), stubFalse = requireStubFalse();
    var freeExports = exports && !exports.nodeType && exports;
    var freeModule = freeExports && true && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var Buffer = moduleExports ? root.Buffer : void 0;
    var nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0;
    var isBuffer2 = nativeIsBuffer || stubFalse;
    module.exports = isBuffer2;
  })(isBuffer, isBuffer.exports);
  return isBuffer.exports;
}
var isPlainObject_1;
var hasRequiredIsPlainObject;
function requireIsPlainObject() {
  if (hasRequiredIsPlainObject) return isPlainObject_1;
  hasRequiredIsPlainObject = 1;
  var baseGetTag = require_baseGetTag(), getPrototype = require_getPrototype(), isObjectLike = requireIsObjectLike();
  var objectTag = "[object Object]";
  var funcProto = Function.prototype, objectProto = Object.prototype;
  var funcToString = funcProto.toString;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var objectCtorString = funcToString.call(Object);
  function isPlainObject(value) {
    if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
      return false;
    }
    var proto = getPrototype(value);
    if (proto === null) {
      return true;
    }
    var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
    return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
  }
  isPlainObject_1 = isPlainObject;
  return isPlainObject_1;
}
var _baseIsTypedArray;
var hasRequired_baseIsTypedArray;
function require_baseIsTypedArray() {
  if (hasRequired_baseIsTypedArray) return _baseIsTypedArray;
  hasRequired_baseIsTypedArray = 1;
  var baseGetTag = require_baseGetTag(), isLength = requireIsLength(), isObjectLike = requireIsObjectLike();
  var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", weakMapTag = "[object WeakMap]";
  var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
  function baseIsTypedArray(value) {
    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
  }
  _baseIsTypedArray = baseIsTypedArray;
  return _baseIsTypedArray;
}
var _baseUnary;
var hasRequired_baseUnary;
function require_baseUnary() {
  if (hasRequired_baseUnary) return _baseUnary;
  hasRequired_baseUnary = 1;
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }
  _baseUnary = baseUnary;
  return _baseUnary;
}
var _nodeUtil = { exports: {} };
_nodeUtil.exports;
var hasRequired_nodeUtil;
function require_nodeUtil() {
  if (hasRequired_nodeUtil) return _nodeUtil.exports;
  hasRequired_nodeUtil = 1;
  (function(module, exports) {
    var freeGlobal = require_freeGlobal();
    var freeExports = exports && !exports.nodeType && exports;
    var freeModule = freeExports && true && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = (function() {
      try {
        var types = freeModule && freeModule.require && freeModule.require("util").types;
        if (types) {
          return types;
        }
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e) {
      }
    })();
    module.exports = nodeUtil;
  })(_nodeUtil, _nodeUtil.exports);
  return _nodeUtil.exports;
}
var isTypedArray_1;
var hasRequiredIsTypedArray;
function requireIsTypedArray() {
  if (hasRequiredIsTypedArray) return isTypedArray_1;
  hasRequiredIsTypedArray = 1;
  var baseIsTypedArray = require_baseIsTypedArray(), baseUnary = require_baseUnary(), nodeUtil = require_nodeUtil();
  var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
  var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
  isTypedArray_1 = isTypedArray;
  return isTypedArray_1;
}
var _safeGet;
var hasRequired_safeGet;
function require_safeGet() {
  if (hasRequired_safeGet) return _safeGet;
  hasRequired_safeGet = 1;
  function safeGet(object, key) {
    if (key === "constructor" && typeof object[key] === "function") {
      return;
    }
    if (key == "__proto__") {
      return;
    }
    return object[key];
  }
  _safeGet = safeGet;
  return _safeGet;
}
var _assignValue;
var hasRequired_assignValue;
function require_assignValue() {
  if (hasRequired_assignValue) return _assignValue;
  hasRequired_assignValue = 1;
  var baseAssignValue = require_baseAssignValue(), eq = requireEq();
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
      baseAssignValue(object, key, value);
    }
  }
  _assignValue = assignValue;
  return _assignValue;
}
var _copyObject;
var hasRequired_copyObject;
function require_copyObject() {
  if (hasRequired_copyObject) return _copyObject;
  hasRequired_copyObject = 1;
  var assignValue = require_assignValue(), baseAssignValue = require_baseAssignValue();
  function copyObject(source, props, object, customizer) {
    var isNew = !object;
    object || (object = {});
    var index = -1, length = props.length;
    while (++index < length) {
      var key = props[index];
      var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
      if (newValue === void 0) {
        newValue = source[key];
      }
      if (isNew) {
        baseAssignValue(object, key, newValue);
      } else {
        assignValue(object, key, newValue);
      }
    }
    return object;
  }
  _copyObject = copyObject;
  return _copyObject;
}
var _baseTimes;
var hasRequired_baseTimes;
function require_baseTimes() {
  if (hasRequired_baseTimes) return _baseTimes;
  hasRequired_baseTimes = 1;
  function baseTimes(n, iteratee) {
    var index = -1, result = Array(n);
    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }
  _baseTimes = baseTimes;
  return _baseTimes;
}
var _arrayLikeKeys;
var hasRequired_arrayLikeKeys;
function require_arrayLikeKeys() {
  if (hasRequired_arrayLikeKeys) return _arrayLikeKeys;
  hasRequired_arrayLikeKeys = 1;
  var baseTimes = require_baseTimes(), isArguments = requireIsArguments(), isArray = requireIsArray(), isBuffer2 = requireIsBuffer(), isIndex = require_isIndex(), isTypedArray = requireIsTypedArray();
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer2(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
    for (var key in value) {
      if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
      (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
      isIndex(key, length)))) {
        result.push(key);
      }
    }
    return result;
  }
  _arrayLikeKeys = arrayLikeKeys;
  return _arrayLikeKeys;
}
var _nativeKeysIn;
var hasRequired_nativeKeysIn;
function require_nativeKeysIn() {
  if (hasRequired_nativeKeysIn) return _nativeKeysIn;
  hasRequired_nativeKeysIn = 1;
  function nativeKeysIn(object) {
    var result = [];
    if (object != null) {
      for (var key in Object(object)) {
        result.push(key);
      }
    }
    return result;
  }
  _nativeKeysIn = nativeKeysIn;
  return _nativeKeysIn;
}
var _baseKeysIn;
var hasRequired_baseKeysIn;
function require_baseKeysIn() {
  if (hasRequired_baseKeysIn) return _baseKeysIn;
  hasRequired_baseKeysIn = 1;
  var isObject = requireIsObject(), isPrototype2 = require_isPrototype(), nativeKeysIn = require_nativeKeysIn();
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  function baseKeysIn(object) {
    if (!isObject(object)) {
      return nativeKeysIn(object);
    }
    var isProto = isPrototype2(object), result = [];
    for (var key in object) {
      if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
        result.push(key);
      }
    }
    return result;
  }
  _baseKeysIn = baseKeysIn;
  return _baseKeysIn;
}
var keysIn_1;
var hasRequiredKeysIn;
function requireKeysIn() {
  if (hasRequiredKeysIn) return keysIn_1;
  hasRequiredKeysIn = 1;
  var arrayLikeKeys = require_arrayLikeKeys(), baseKeysIn = require_baseKeysIn(), isArrayLike = requireIsArrayLike();
  function keysIn(object) {
    return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
  }
  keysIn_1 = keysIn;
  return keysIn_1;
}
var toPlainObject_1;
var hasRequiredToPlainObject;
function requireToPlainObject() {
  if (hasRequiredToPlainObject) return toPlainObject_1;
  hasRequiredToPlainObject = 1;
  var copyObject = require_copyObject(), keysIn = requireKeysIn();
  function toPlainObject(value) {
    return copyObject(value, keysIn(value));
  }
  toPlainObject_1 = toPlainObject;
  return toPlainObject_1;
}
var _baseMergeDeep;
var hasRequired_baseMergeDeep;
function require_baseMergeDeep() {
  if (hasRequired_baseMergeDeep) return _baseMergeDeep;
  hasRequired_baseMergeDeep = 1;
  var assignMergeValue = require_assignMergeValue(), cloneBuffer = require_cloneBuffer(), cloneTypedArray = require_cloneTypedArray(), copyArray = require_copyArray(), initCloneObject = require_initCloneObject(), isArguments = requireIsArguments(), isArray = requireIsArray(), isArrayLikeObject = requireIsArrayLikeObject(), isBuffer2 = requireIsBuffer(), isFunction = requireIsFunction(), isObject = requireIsObject(), isPlainObject = requireIsPlainObject(), isTypedArray = requireIsTypedArray(), safeGet = require_safeGet(), toPlainObject = requireToPlainObject();
  function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
    var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
    if (stacked) {
      assignMergeValue(object, key, stacked);
      return;
    }
    var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : void 0;
    var isCommon = newValue === void 0;
    if (isCommon) {
      var isArr = isArray(srcValue), isBuff = !isArr && isBuffer2(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
      newValue = srcValue;
      if (isArr || isBuff || isTyped) {
        if (isArray(objValue)) {
          newValue = objValue;
        } else if (isArrayLikeObject(objValue)) {
          newValue = copyArray(objValue);
        } else if (isBuff) {
          isCommon = false;
          newValue = cloneBuffer(srcValue, true);
        } else if (isTyped) {
          isCommon = false;
          newValue = cloneTypedArray(srcValue, true);
        } else {
          newValue = [];
        }
      } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
        newValue = objValue;
        if (isArguments(objValue)) {
          newValue = toPlainObject(objValue);
        } else if (!isObject(objValue) || isFunction(objValue)) {
          newValue = initCloneObject(srcValue);
        }
      } else {
        isCommon = false;
      }
    }
    if (isCommon) {
      stack.set(srcValue, newValue);
      mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
      stack["delete"](srcValue);
    }
    assignMergeValue(object, key, newValue);
  }
  _baseMergeDeep = baseMergeDeep;
  return _baseMergeDeep;
}
var _baseMerge;
var hasRequired_baseMerge;
function require_baseMerge() {
  if (hasRequired_baseMerge) return _baseMerge;
  hasRequired_baseMerge = 1;
  var Stack = require_Stack(), assignMergeValue = require_assignMergeValue(), baseFor = require_baseFor(), baseMergeDeep = require_baseMergeDeep(), isObject = requireIsObject(), keysIn = requireKeysIn(), safeGet = require_safeGet();
  function baseMerge(object, source, srcIndex, customizer, stack) {
    if (object === source) {
      return;
    }
    baseFor(source, function(srcValue, key) {
      stack || (stack = new Stack());
      if (isObject(srcValue)) {
        baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
      } else {
        var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : void 0;
        if (newValue === void 0) {
          newValue = srcValue;
        }
        assignMergeValue(object, key, newValue);
      }
    }, keysIn);
  }
  _baseMerge = baseMerge;
  return _baseMerge;
}
var identity_1;
var hasRequiredIdentity;
function requireIdentity() {
  if (hasRequiredIdentity) return identity_1;
  hasRequiredIdentity = 1;
  function identity(value) {
    return value;
  }
  identity_1 = identity;
  return identity_1;
}
var _apply;
var hasRequired_apply;
function require_apply() {
  if (hasRequired_apply) return _apply;
  hasRequired_apply = 1;
  function apply(func, thisArg, args) {
    switch (args.length) {
      case 0:
        return func.call(thisArg);
      case 1:
        return func.call(thisArg, args[0]);
      case 2:
        return func.call(thisArg, args[0], args[1]);
      case 3:
        return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }
  _apply = apply;
  return _apply;
}
var _overRest;
var hasRequired_overRest;
function require_overRest() {
  if (hasRequired_overRest) return _overRest;
  hasRequired_overRest = 1;
  var apply = require_apply();
  var nativeMax = Math.max;
  function overRest(func, start, transform) {
    start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
    return function() {
      var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
      while (++index < length) {
        array[index] = args[start + index];
      }
      index = -1;
      var otherArgs = Array(start + 1);
      while (++index < start) {
        otherArgs[index] = args[index];
      }
      otherArgs[start] = transform(array);
      return apply(func, this, otherArgs);
    };
  }
  _overRest = overRest;
  return _overRest;
}
var constant_1;
var hasRequiredConstant;
function requireConstant() {
  if (hasRequiredConstant) return constant_1;
  hasRequiredConstant = 1;
  function constant(value) {
    return function() {
      return value;
    };
  }
  constant_1 = constant;
  return constant_1;
}
var _baseSetToString;
var hasRequired_baseSetToString;
function require_baseSetToString() {
  if (hasRequired_baseSetToString) return _baseSetToString;
  hasRequired_baseSetToString = 1;
  var constant = requireConstant(), defineProperty = require_defineProperty(), identity = requireIdentity();
  var baseSetToString = !defineProperty ? identity : function(func, string) {
    return defineProperty(func, "toString", {
      "configurable": true,
      "enumerable": false,
      "value": constant(string),
      "writable": true
    });
  };
  _baseSetToString = baseSetToString;
  return _baseSetToString;
}
var _shortOut;
var hasRequired_shortOut;
function require_shortOut() {
  if (hasRequired_shortOut) return _shortOut;
  hasRequired_shortOut = 1;
  var HOT_COUNT = 800, HOT_SPAN = 16;
  var nativeNow = Date.now;
  function shortOut(func) {
    var count = 0, lastCalled = 0;
    return function() {
      var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
      lastCalled = stamp;
      if (remaining > 0) {
        if (++count >= HOT_COUNT) {
          return arguments[0];
        }
      } else {
        count = 0;
      }
      return func.apply(void 0, arguments);
    };
  }
  _shortOut = shortOut;
  return _shortOut;
}
var _setToString;
var hasRequired_setToString;
function require_setToString() {
  if (hasRequired_setToString) return _setToString;
  hasRequired_setToString = 1;
  var baseSetToString = require_baseSetToString(), shortOut = require_shortOut();
  var setToString = shortOut(baseSetToString);
  _setToString = setToString;
  return _setToString;
}
var _baseRest;
var hasRequired_baseRest;
function require_baseRest() {
  if (hasRequired_baseRest) return _baseRest;
  hasRequired_baseRest = 1;
  var identity = requireIdentity(), overRest = require_overRest(), setToString = require_setToString();
  function baseRest(func, start) {
    return setToString(overRest(func, start, identity), func + "");
  }
  _baseRest = baseRest;
  return _baseRest;
}
var _isIterateeCall;
var hasRequired_isIterateeCall;
function require_isIterateeCall() {
  if (hasRequired_isIterateeCall) return _isIterateeCall;
  hasRequired_isIterateeCall = 1;
  var eq = requireEq(), isArrayLike = requireIsArrayLike(), isIndex = require_isIndex(), isObject = requireIsObject();
  function isIterateeCall(value, index, object) {
    if (!isObject(object)) {
      return false;
    }
    var type = typeof index;
    if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
      return eq(object[index], value);
    }
    return false;
  }
  _isIterateeCall = isIterateeCall;
  return _isIterateeCall;
}
var _createAssigner;
var hasRequired_createAssigner;
function require_createAssigner() {
  if (hasRequired_createAssigner) return _createAssigner;
  hasRequired_createAssigner = 1;
  var baseRest = require_baseRest(), isIterateeCall = require_isIterateeCall();
  function createAssigner(assigner) {
    return baseRest(function(object, sources) {
      var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
      customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
      if (guard && isIterateeCall(sources[0], sources[1], guard)) {
        customizer = length < 3 ? void 0 : customizer;
        length = 1;
      }
      object = Object(object);
      while (++index < length) {
        var source = sources[index];
        if (source) {
          assigner(object, source, index, customizer);
        }
      }
      return object;
    });
  }
  _createAssigner = createAssigner;
  return _createAssigner;
}
var merge_1;
var hasRequiredMerge;
function requireMerge() {
  if (hasRequiredMerge) return merge_1;
  hasRequiredMerge = 1;
  var baseMerge = require_baseMerge(), createAssigner = require_createAssigner();
  var merge2 = createAssigner(function(object, source, srcIndex) {
    baseMerge(object, source, srcIndex);
  });
  merge_1 = merge2;
  return merge_1;
}
var mergeExports = requireMerge();
const merge = /* @__PURE__ */ getDefaultExportFromCjs(mergeExports);
var _setCacheAdd;
var hasRequired_setCacheAdd;
function require_setCacheAdd() {
  if (hasRequired_setCacheAdd) return _setCacheAdd;
  hasRequired_setCacheAdd = 1;
  var HASH_UNDEFINED = "__lodash_hash_undefined__";
  function setCacheAdd(value) {
    this.__data__.set(value, HASH_UNDEFINED);
    return this;
  }
  _setCacheAdd = setCacheAdd;
  return _setCacheAdd;
}
var _setCacheHas;
var hasRequired_setCacheHas;
function require_setCacheHas() {
  if (hasRequired_setCacheHas) return _setCacheHas;
  hasRequired_setCacheHas = 1;
  function setCacheHas(value) {
    return this.__data__.has(value);
  }
  _setCacheHas = setCacheHas;
  return _setCacheHas;
}
var _SetCache;
var hasRequired_SetCache;
function require_SetCache() {
  if (hasRequired_SetCache) return _SetCache;
  hasRequired_SetCache = 1;
  var MapCache = require_MapCache(), setCacheAdd = require_setCacheAdd(), setCacheHas = require_setCacheHas();
  function SetCache(values) {
    var index = -1, length = values == null ? 0 : values.length;
    this.__data__ = new MapCache();
    while (++index < length) {
      this.add(values[index]);
    }
  }
  SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
  SetCache.prototype.has = setCacheHas;
  _SetCache = SetCache;
  return _SetCache;
}
var _baseFindIndex;
var hasRequired_baseFindIndex;
function require_baseFindIndex() {
  if (hasRequired_baseFindIndex) return _baseFindIndex;
  hasRequired_baseFindIndex = 1;
  function baseFindIndex(array, predicate, fromIndex, fromRight) {
    var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
    while (fromRight ? index-- : ++index < length) {
      if (predicate(array[index], index, array)) {
        return index;
      }
    }
    return -1;
  }
  _baseFindIndex = baseFindIndex;
  return _baseFindIndex;
}
var _baseIsNaN;
var hasRequired_baseIsNaN;
function require_baseIsNaN() {
  if (hasRequired_baseIsNaN) return _baseIsNaN;
  hasRequired_baseIsNaN = 1;
  function baseIsNaN(value) {
    return value !== value;
  }
  _baseIsNaN = baseIsNaN;
  return _baseIsNaN;
}
var _strictIndexOf;
var hasRequired_strictIndexOf;
function require_strictIndexOf() {
  if (hasRequired_strictIndexOf) return _strictIndexOf;
  hasRequired_strictIndexOf = 1;
  function strictIndexOf(array, value, fromIndex) {
    var index = fromIndex - 1, length = array.length;
    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }
  _strictIndexOf = strictIndexOf;
  return _strictIndexOf;
}
var _baseIndexOf;
var hasRequired_baseIndexOf;
function require_baseIndexOf() {
  if (hasRequired_baseIndexOf) return _baseIndexOf;
  hasRequired_baseIndexOf = 1;
  var baseFindIndex = require_baseFindIndex(), baseIsNaN = require_baseIsNaN(), strictIndexOf = require_strictIndexOf();
  function baseIndexOf(array, value, fromIndex) {
    return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
  }
  _baseIndexOf = baseIndexOf;
  return _baseIndexOf;
}
var _arrayIncludes;
var hasRequired_arrayIncludes;
function require_arrayIncludes() {
  if (hasRequired_arrayIncludes) return _arrayIncludes;
  hasRequired_arrayIncludes = 1;
  var baseIndexOf = require_baseIndexOf();
  function arrayIncludes(array, value) {
    var length = array == null ? 0 : array.length;
    return !!length && baseIndexOf(array, value, 0) > -1;
  }
  _arrayIncludes = arrayIncludes;
  return _arrayIncludes;
}
var _arrayIncludesWith;
var hasRequired_arrayIncludesWith;
function require_arrayIncludesWith() {
  if (hasRequired_arrayIncludesWith) return _arrayIncludesWith;
  hasRequired_arrayIncludesWith = 1;
  function arrayIncludesWith(array, value, comparator) {
    var index = -1, length = array == null ? 0 : array.length;
    while (++index < length) {
      if (comparator(value, array[index])) {
        return true;
      }
    }
    return false;
  }
  _arrayIncludesWith = arrayIncludesWith;
  return _arrayIncludesWith;
}
var _cacheHas;
var hasRequired_cacheHas;
function require_cacheHas() {
  if (hasRequired_cacheHas) return _cacheHas;
  hasRequired_cacheHas = 1;
  function cacheHas(cache, key) {
    return cache.has(key);
  }
  _cacheHas = cacheHas;
  return _cacheHas;
}
var _Set;
var hasRequired_Set;
function require_Set() {
  if (hasRequired_Set) return _Set;
  hasRequired_Set = 1;
  var getNative = require_getNative(), root = require_root();
  var Set = getNative(root, "Set");
  _Set = Set;
  return _Set;
}
var noop_1;
var hasRequiredNoop;
function requireNoop() {
  if (hasRequiredNoop) return noop_1;
  hasRequiredNoop = 1;
  function noop() {
  }
  noop_1 = noop;
  return noop_1;
}
var _setToArray;
var hasRequired_setToArray;
function require_setToArray() {
  if (hasRequired_setToArray) return _setToArray;
  hasRequired_setToArray = 1;
  function setToArray(set) {
    var index = -1, result = Array(set.size);
    set.forEach(function(value) {
      result[++index] = value;
    });
    return result;
  }
  _setToArray = setToArray;
  return _setToArray;
}
var _createSet;
var hasRequired_createSet;
function require_createSet() {
  if (hasRequired_createSet) return _createSet;
  hasRequired_createSet = 1;
  var Set = require_Set(), noop = requireNoop(), setToArray = require_setToArray();
  var INFINITY = 1 / 0;
  var createSet = !(Set && 1 / setToArray(new Set([, -0]))[1] == INFINITY) ? noop : function(values) {
    return new Set(values);
  };
  _createSet = createSet;
  return _createSet;
}
var _baseUniq;
var hasRequired_baseUniq;
function require_baseUniq() {
  if (hasRequired_baseUniq) return _baseUniq;
  hasRequired_baseUniq = 1;
  var SetCache = require_SetCache(), arrayIncludes = require_arrayIncludes(), arrayIncludesWith = require_arrayIncludesWith(), cacheHas = require_cacheHas(), createSet = require_createSet(), setToArray = require_setToArray();
  var LARGE_ARRAY_SIZE = 200;
  function baseUniq(array, iteratee, comparator) {
    var index = -1, includes = arrayIncludes, length = array.length, isCommon = true, result = [], seen = result;
    if (comparator) {
      isCommon = false;
      includes = arrayIncludesWith;
    } else if (length >= LARGE_ARRAY_SIZE) {
      var set = iteratee ? null : createSet(array);
      if (set) {
        return setToArray(set);
      }
      isCommon = false;
      includes = cacheHas;
      seen = new SetCache();
    } else {
      seen = iteratee ? [] : result;
    }
    outer:
      while (++index < length) {
        var value = array[index], computed = iteratee ? iteratee(value) : value;
        value = comparator || value !== 0 ? value : 0;
        if (isCommon && computed === computed) {
          var seenIndex = seen.length;
          while (seenIndex--) {
            if (seen[seenIndex] === computed) {
              continue outer;
            }
          }
          if (iteratee) {
            seen.push(computed);
          }
          result.push(value);
        } else if (!includes(seen, computed, comparator)) {
          if (seen !== result) {
            seen.push(computed);
          }
          result.push(value);
        }
      }
    return result;
  }
  _baseUniq = baseUniq;
  return _baseUniq;
}
var uniq_1;
var hasRequiredUniq;
function requireUniq() {
  if (hasRequiredUniq) return uniq_1;
  hasRequiredUniq = 1;
  var baseUniq = require_baseUniq();
  function uniq2(array) {
    return array && array.length ? baseUniq(array) : [];
  }
  uniq_1 = uniq2;
  return uniq_1;
}
var uniqExports = requireUniq();
const uniq = /* @__PURE__ */ getDefaultExportFromCjs(uniqExports);
const defaultLocaleResolver = (i18n2, locale) => {
  const locales = [];
  const list = [];
  locales.push(locale);
  if (!locale) {
    locales.push(i18n2.locale);
  }
  if (i18n2.enableFallback) {
    locales.push(i18n2.defaultLocale);
  }
  locales.filter(Boolean).map((entry) => entry.toString()).forEach(function(currentLocale) {
    if (!list.includes(currentLocale)) {
      list.push(currentLocale);
    }
    if (!i18n2.enableFallback) {
      return;
    }
    const codes = currentLocale.split("-");
    if (codes.length === 3) {
      list.push(`${codes[0]}-${codes[1]}`);
    }
    list.push(codes[0]);
  });
  return uniq(list);
};
class Locales {
  constructor(i18n2) {
    this.i18n = i18n2;
    this.registry = {};
    this.register("default", defaultLocaleResolver);
  }
  register(locale, localeResolver) {
    if (typeof localeResolver !== "function") {
      const result = localeResolver;
      localeResolver = (() => result);
    }
    this.registry[locale] = localeResolver;
  }
  get(locale) {
    let locales = this.registry[locale] || this.registry[this.i18n.locale] || this.registry.default;
    if (typeof locales === "function") {
      locales = locales(this.i18n, locale);
    }
    if (!(locales instanceof Array)) {
      locales = [locales];
    }
    return locales;
  }
}
const en$2 = (n, ord) => {
  const s = String(n).split("."), v0 = !s[1], t0 = Number(s[0]) == n, n10 = t0 && s[0].slice(-1), n100 = t0 && s[0].slice(-2);
  if (ord) return n10 == 1 && n100 != 11 ? "one" : n10 == 2 && n100 != 12 ? "two" : n10 == 3 && n100 != 13 ? "few" : "other";
  return n == 1 && v0 ? "one" : "other";
};
function useMakePlural({ pluralizer, includeZero = true, ordinal = false }) {
  return function(_i18n, count) {
    return [
      includeZero && count === 0 ? "zero" : "",
      pluralizer(count, ordinal)
    ].filter(Boolean);
  };
}
const defaultPluralizer = useMakePlural({
  pluralizer: en$2,
  includeZero: true
});
class Pluralization {
  constructor(i18n2) {
    this.i18n = i18n2;
    this.registry = {};
    this.register("default", defaultPluralizer);
  }
  register(locale, pluralizer) {
    this.registry[locale] = pluralizer;
  }
  get(locale) {
    return this.registry[locale] || this.registry[this.i18n.locale] || this.registry["default"];
  }
}
var _baseSlice;
var hasRequired_baseSlice;
function require_baseSlice() {
  if (hasRequired_baseSlice) return _baseSlice;
  hasRequired_baseSlice = 1;
  function baseSlice(array, start, end) {
    var index = -1, length = array.length;
    if (start < 0) {
      start = -start > length ? 0 : length + start;
    }
    end = end > length ? length : end;
    if (end < 0) {
      end += length;
    }
    length = start > end ? 0 : end - start >>> 0;
    start >>>= 0;
    var result = Array(length);
    while (++index < length) {
      result[index] = array[index + start];
    }
    return result;
  }
  _baseSlice = baseSlice;
  return _baseSlice;
}
var _castSlice;
var hasRequired_castSlice;
function require_castSlice() {
  if (hasRequired_castSlice) return _castSlice;
  hasRequired_castSlice = 1;
  var baseSlice = require_baseSlice();
  function castSlice(array, start, end) {
    var length = array.length;
    end = end === void 0 ? length : end;
    return !start && end >= length ? array : baseSlice(array, start, end);
  }
  _castSlice = castSlice;
  return _castSlice;
}
var _hasUnicode;
var hasRequired_hasUnicode;
function require_hasUnicode() {
  if (hasRequired_hasUnicode) return _hasUnicode;
  hasRequired_hasUnicode = 1;
  var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsVarRange = "\\ufe0e\\ufe0f";
  var rsZWJ = "\\u200d";
  var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
  function hasUnicode(string) {
    return reHasUnicode.test(string);
  }
  _hasUnicode = hasUnicode;
  return _hasUnicode;
}
var _asciiToArray;
var hasRequired_asciiToArray;
function require_asciiToArray() {
  if (hasRequired_asciiToArray) return _asciiToArray;
  hasRequired_asciiToArray = 1;
  function asciiToArray(string) {
    return string.split("");
  }
  _asciiToArray = asciiToArray;
  return _asciiToArray;
}
var _unicodeToArray;
var hasRequired_unicodeToArray;
function require_unicodeToArray() {
  if (hasRequired_unicodeToArray) return _unicodeToArray;
  hasRequired_unicodeToArray = 1;
  var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsVarRange = "\\ufe0e\\ufe0f";
  var rsAstral = "[" + rsAstralRange + "]", rsCombo = "[" + rsComboRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsZWJ = "\\u200d";
  var reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
  var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
  function unicodeToArray(string) {
    return string.match(reUnicode) || [];
  }
  _unicodeToArray = unicodeToArray;
  return _unicodeToArray;
}
var _stringToArray;
var hasRequired_stringToArray;
function require_stringToArray() {
  if (hasRequired_stringToArray) return _stringToArray;
  hasRequired_stringToArray = 1;
  var asciiToArray = require_asciiToArray(), hasUnicode = require_hasUnicode(), unicodeToArray = require_unicodeToArray();
  function stringToArray(string) {
    return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
  }
  _stringToArray = stringToArray;
  return _stringToArray;
}
var _createCaseFirst;
var hasRequired_createCaseFirst;
function require_createCaseFirst() {
  if (hasRequired_createCaseFirst) return _createCaseFirst;
  hasRequired_createCaseFirst = 1;
  var castSlice = require_castSlice(), hasUnicode = require_hasUnicode(), stringToArray = require_stringToArray(), toString = requireToString();
  function createCaseFirst(methodName) {
    return function(string) {
      string = toString(string);
      var strSymbols = hasUnicode(string) ? stringToArray(string) : void 0;
      var chr = strSymbols ? strSymbols[0] : string.charAt(0);
      var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
      return chr[methodName]() + trailing;
    };
  }
  _createCaseFirst = createCaseFirst;
  return _createCaseFirst;
}
var upperFirst_1;
var hasRequiredUpperFirst;
function requireUpperFirst() {
  if (hasRequiredUpperFirst) return upperFirst_1;
  hasRequiredUpperFirst = 1;
  var createCaseFirst = require_createCaseFirst();
  var upperFirst = createCaseFirst("toUpperCase");
  upperFirst_1 = upperFirst;
  return upperFirst_1;
}
var capitalize_1;
var hasRequiredCapitalize;
function requireCapitalize() {
  if (hasRequiredCapitalize) return capitalize_1;
  hasRequiredCapitalize = 1;
  var toString = requireToString(), upperFirst = requireUpperFirst();
  function capitalize(string) {
    return upperFirst(toString(string).toLowerCase());
  }
  capitalize_1 = capitalize;
  return capitalize_1;
}
var _arrayReduce;
var hasRequired_arrayReduce;
function require_arrayReduce() {
  if (hasRequired_arrayReduce) return _arrayReduce;
  hasRequired_arrayReduce = 1;
  function arrayReduce(array, iteratee, accumulator, initAccum) {
    var index = -1, length = array == null ? 0 : array.length;
    if (initAccum && length) {
      accumulator = array[++index];
    }
    while (++index < length) {
      accumulator = iteratee(accumulator, array[index], index, array);
    }
    return accumulator;
  }
  _arrayReduce = arrayReduce;
  return _arrayReduce;
}
var _basePropertyOf;
var hasRequired_basePropertyOf;
function require_basePropertyOf() {
  if (hasRequired_basePropertyOf) return _basePropertyOf;
  hasRequired_basePropertyOf = 1;
  function basePropertyOf(object) {
    return function(key) {
      return object == null ? void 0 : object[key];
    };
  }
  _basePropertyOf = basePropertyOf;
  return _basePropertyOf;
}
var _deburrLetter;
var hasRequired_deburrLetter;
function require_deburrLetter() {
  if (hasRequired_deburrLetter) return _deburrLetter;
  hasRequired_deburrLetter = 1;
  var basePropertyOf = require_basePropertyOf();
  var deburredLetters = {
    // Latin-1 Supplement block.
    "À": "A",
    "Á": "A",
    "Â": "A",
    "Ã": "A",
    "Ä": "A",
    "Å": "A",
    "à": "a",
    "á": "a",
    "â": "a",
    "ã": "a",
    "ä": "a",
    "å": "a",
    "Ç": "C",
    "ç": "c",
    "Ð": "D",
    "ð": "d",
    "È": "E",
    "É": "E",
    "Ê": "E",
    "Ë": "E",
    "è": "e",
    "é": "e",
    "ê": "e",
    "ë": "e",
    "Ì": "I",
    "Í": "I",
    "Î": "I",
    "Ï": "I",
    "ì": "i",
    "í": "i",
    "î": "i",
    "ï": "i",
    "Ñ": "N",
    "ñ": "n",
    "Ò": "O",
    "Ó": "O",
    "Ô": "O",
    "Õ": "O",
    "Ö": "O",
    "Ø": "O",
    "ò": "o",
    "ó": "o",
    "ô": "o",
    "õ": "o",
    "ö": "o",
    "ø": "o",
    "Ù": "U",
    "Ú": "U",
    "Û": "U",
    "Ü": "U",
    "ù": "u",
    "ú": "u",
    "û": "u",
    "ü": "u",
    "Ý": "Y",
    "ý": "y",
    "ÿ": "y",
    "Æ": "Ae",
    "æ": "ae",
    "Þ": "Th",
    "þ": "th",
    "ß": "ss",
    // Latin Extended-A block.
    "Ā": "A",
    "Ă": "A",
    "Ą": "A",
    "ā": "a",
    "ă": "a",
    "ą": "a",
    "Ć": "C",
    "Ĉ": "C",
    "Ċ": "C",
    "Č": "C",
    "ć": "c",
    "ĉ": "c",
    "ċ": "c",
    "č": "c",
    "Ď": "D",
    "Đ": "D",
    "ď": "d",
    "đ": "d",
    "Ē": "E",
    "Ĕ": "E",
    "Ė": "E",
    "Ę": "E",
    "Ě": "E",
    "ē": "e",
    "ĕ": "e",
    "ė": "e",
    "ę": "e",
    "ě": "e",
    "Ĝ": "G",
    "Ğ": "G",
    "Ġ": "G",
    "Ģ": "G",
    "ĝ": "g",
    "ğ": "g",
    "ġ": "g",
    "ģ": "g",
    "Ĥ": "H",
    "Ħ": "H",
    "ĥ": "h",
    "ħ": "h",
    "Ĩ": "I",
    "Ī": "I",
    "Ĭ": "I",
    "Į": "I",
    "İ": "I",
    "ĩ": "i",
    "ī": "i",
    "ĭ": "i",
    "į": "i",
    "ı": "i",
    "Ĵ": "J",
    "ĵ": "j",
    "Ķ": "K",
    "ķ": "k",
    "ĸ": "k",
    "Ĺ": "L",
    "Ļ": "L",
    "Ľ": "L",
    "Ŀ": "L",
    "Ł": "L",
    "ĺ": "l",
    "ļ": "l",
    "ľ": "l",
    "ŀ": "l",
    "ł": "l",
    "Ń": "N",
    "Ņ": "N",
    "Ň": "N",
    "Ŋ": "N",
    "ń": "n",
    "ņ": "n",
    "ň": "n",
    "ŋ": "n",
    "Ō": "O",
    "Ŏ": "O",
    "Ő": "O",
    "ō": "o",
    "ŏ": "o",
    "ő": "o",
    "Ŕ": "R",
    "Ŗ": "R",
    "Ř": "R",
    "ŕ": "r",
    "ŗ": "r",
    "ř": "r",
    "Ś": "S",
    "Ŝ": "S",
    "Ş": "S",
    "Š": "S",
    "ś": "s",
    "ŝ": "s",
    "ş": "s",
    "š": "s",
    "Ţ": "T",
    "Ť": "T",
    "Ŧ": "T",
    "ţ": "t",
    "ť": "t",
    "ŧ": "t",
    "Ũ": "U",
    "Ū": "U",
    "Ŭ": "U",
    "Ů": "U",
    "Ű": "U",
    "Ų": "U",
    "ũ": "u",
    "ū": "u",
    "ŭ": "u",
    "ů": "u",
    "ű": "u",
    "ų": "u",
    "Ŵ": "W",
    "ŵ": "w",
    "Ŷ": "Y",
    "ŷ": "y",
    "Ÿ": "Y",
    "Ź": "Z",
    "Ż": "Z",
    "Ž": "Z",
    "ź": "z",
    "ż": "z",
    "ž": "z",
    "Ĳ": "IJ",
    "ĳ": "ij",
    "Œ": "Oe",
    "œ": "oe",
    "ŉ": "'n",
    "ſ": "s"
  };
  var deburrLetter = basePropertyOf(deburredLetters);
  _deburrLetter = deburrLetter;
  return _deburrLetter;
}
var deburr_1;
var hasRequiredDeburr;
function requireDeburr() {
  if (hasRequiredDeburr) return deburr_1;
  hasRequiredDeburr = 1;
  var deburrLetter = require_deburrLetter(), toString = requireToString();
  var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
  var rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
  var rsCombo = "[" + rsComboRange + "]";
  var reComboMark = RegExp(rsCombo, "g");
  function deburr(string) {
    string = toString(string);
    return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
  }
  deburr_1 = deburr;
  return deburr_1;
}
var _asciiWords;
var hasRequired_asciiWords;
function require_asciiWords() {
  if (hasRequired_asciiWords) return _asciiWords;
  hasRequired_asciiWords = 1;
  var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
  function asciiWords(string) {
    return string.match(reAsciiWord) || [];
  }
  _asciiWords = asciiWords;
  return _asciiWords;
}
var _hasUnicodeWord;
var hasRequired_hasUnicodeWord;
function require_hasUnicodeWord() {
  if (hasRequired_hasUnicodeWord) return _hasUnicodeWord;
  hasRequired_hasUnicodeWord = 1;
  var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
  function hasUnicodeWord(string) {
    return reHasUnicodeWord.test(string);
  }
  _hasUnicodeWord = hasUnicodeWord;
  return _hasUnicodeWord;
}
var _unicodeWords;
var hasRequired_unicodeWords;
function require_unicodeWords() {
  if (hasRequired_unicodeWords) return _unicodeWords;
  hasRequired_unicodeWords = 1;
  var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
  var rsApos = "['’]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
  var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq;
  var reUnicodeWord = RegExp([
    rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
    rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
    rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
    rsUpper + "+" + rsOptContrUpper,
    rsOrdUpper,
    rsOrdLower,
    rsDigits,
    rsEmoji
  ].join("|"), "g");
  function unicodeWords(string) {
    return string.match(reUnicodeWord) || [];
  }
  _unicodeWords = unicodeWords;
  return _unicodeWords;
}
var words_1;
var hasRequiredWords;
function requireWords() {
  if (hasRequiredWords) return words_1;
  hasRequiredWords = 1;
  var asciiWords = require_asciiWords(), hasUnicodeWord = require_hasUnicodeWord(), toString = requireToString(), unicodeWords = require_unicodeWords();
  function words(string, pattern, guard) {
    string = toString(string);
    pattern = guard ? void 0 : pattern;
    if (pattern === void 0) {
      return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
    }
    return string.match(pattern) || [];
  }
  words_1 = words;
  return words_1;
}
var _createCompounder;
var hasRequired_createCompounder;
function require_createCompounder() {
  if (hasRequired_createCompounder) return _createCompounder;
  hasRequired_createCompounder = 1;
  var arrayReduce = require_arrayReduce(), deburr = requireDeburr(), words = requireWords();
  var rsApos = "['’]";
  var reApos = RegExp(rsApos, "g");
  function createCompounder(callback) {
    return function(string) {
      return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
    };
  }
  _createCompounder = createCompounder;
  return _createCompounder;
}
var camelCase_1;
var hasRequiredCamelCase;
function requireCamelCase() {
  if (hasRequiredCamelCase) return camelCase_1;
  hasRequiredCamelCase = 1;
  var capitalize = requireCapitalize(), createCompounder = require_createCompounder();
  var camelCase2 = createCompounder(function(result, word, index) {
    word = word.toLowerCase();
    return result + (index ? capitalize(word) : word);
  });
  camelCase_1 = camelCase2;
  return camelCase_1;
}
var camelCaseExports = requireCamelCase();
const camelCase = /* @__PURE__ */ getDefaultExportFromCjs(camelCaseExports);
function camelCaseKeys(target) {
  if (!target) {
    return {};
  }
  return Object.keys(target).reduce((buffer, key) => {
    buffer[camelCase(key)] = target[key];
    return buffer;
  }, {});
}
function isSet(value) {
  return value !== void 0 && value !== null;
}
function createTranslationOptions(i18n2, scope, options) {
  let translationOptions = [{ scope }];
  if (isSet(options.defaults)) {
    translationOptions = translationOptions.concat(options.defaults);
  }
  if (isSet(options.defaultValue)) {
    const message = typeof options.defaultValue === "function" ? options.defaultValue(i18n2, scope, options) : options.defaultValue;
    translationOptions.push({ message });
    delete options.defaultValue;
  }
  return translationOptions;
}
var isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, mathceil = Math.ceil, mathfloor = Math.floor, bignumberError = "[BigNumber Error] ", tooManyDigits = bignumberError + "Number primitive has more than 15 significant digits: ", BASE = 1e14, LOG_BASE = 14, MAX_SAFE_INTEGER = 9007199254740991, POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13], SQRT_BASE = 1e7, MAX = 1e9;
function clone(configObject) {
  var div, convertBase, parseNumeric, P = BigNumber2.prototype = { constructor: BigNumber2, toString: null, valueOf: null }, ONE = new BigNumber2(1), DECIMAL_PLACES = 20, ROUNDING_MODE = 4, TO_EXP_NEG = -7, TO_EXP_POS = 21, MIN_EXP = -1e7, MAX_EXP = 1e7, CRYPTO = false, MODULO_MODE = 1, POW_PRECISION = 0, FORMAT = {
    prefix: "",
    groupSize: 3,
    secondaryGroupSize: 0,
    groupSeparator: ",",
    decimalSeparator: ".",
    fractionGroupSize: 0,
    fractionGroupSeparator: " ",
    // non-breaking space
    suffix: ""
  }, ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz", alphabetHasNormalDecimalDigits = true;
  function BigNumber2(v, b) {
    var alphabet, c, caseChanged, e, i, isNum, len, str, x = this;
    if (!(x instanceof BigNumber2)) return new BigNumber2(v, b);
    if (b == null) {
      if (v && v._isBigNumber === true) {
        x.s = v.s;
        if (!v.c || v.e > MAX_EXP) {
          x.c = x.e = null;
        } else if (v.e < MIN_EXP) {
          x.c = [x.e = 0];
        } else {
          x.e = v.e;
          x.c = v.c.slice();
        }
        return;
      }
      if ((isNum = typeof v == "number") && v * 0 == 0) {
        x.s = 1 / v < 0 ? (v = -v, -1) : 1;
        if (v === ~~v) {
          for (e = 0, i = v; i >= 10; i /= 10, e++) ;
          if (e > MAX_EXP) {
            x.c = x.e = null;
          } else {
            x.e = e;
            x.c = [v];
          }
          return;
        }
        str = String(v);
      } else {
        if (!isNumeric.test(str = String(v))) return parseNumeric(x, str, isNum);
        x.s = str.charCodeAt(0) == 45 ? (str = str.slice(1), -1) : 1;
      }
      if ((e = str.indexOf(".")) > -1) str = str.replace(".", "");
      if ((i = str.search(/e/i)) > 0) {
        if (e < 0) e = i;
        e += +str.slice(i + 1);
        str = str.substring(0, i);
      } else if (e < 0) {
        e = str.length;
      }
    } else {
      intCheck(b, 2, ALPHABET.length, "Base");
      if (b == 10 && alphabetHasNormalDecimalDigits) {
        x = new BigNumber2(v);
        return round(x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE);
      }
      str = String(v);
      if (isNum = typeof v == "number") {
        if (v * 0 != 0) return parseNumeric(x, str, isNum, b);
        x.s = 1 / v < 0 ? (str = str.slice(1), -1) : 1;
        if (BigNumber2.DEBUG && str.replace(/^0\.0*|\./, "").length > 15) {
          throw Error(tooManyDigits + v);
        }
      } else {
        x.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
      }
      alphabet = ALPHABET.slice(0, b);
      e = i = 0;
      for (len = str.length; i < len; i++) {
        if (alphabet.indexOf(c = str.charAt(i)) < 0) {
          if (c == ".") {
            if (i > e) {
              e = len;
              continue;
            }
          } else if (!caseChanged) {
            if (str == str.toUpperCase() && (str = str.toLowerCase()) || str == str.toLowerCase() && (str = str.toUpperCase())) {
              caseChanged = true;
              i = -1;
              e = 0;
              continue;
            }
          }
          return parseNumeric(x, String(v), isNum, b);
        }
      }
      isNum = false;
      str = convertBase(str, b, 10, x.s);
      if ((e = str.indexOf(".")) > -1) str = str.replace(".", "");
      else e = str.length;
    }
    for (i = 0; str.charCodeAt(i) === 48; i++) ;
    for (len = str.length; str.charCodeAt(--len) === 48; ) ;
    if (str = str.slice(i, ++len)) {
      len -= i;
      if (isNum && BigNumber2.DEBUG && len > 15 && (v > MAX_SAFE_INTEGER || v !== mathfloor(v))) {
        throw Error(tooManyDigits + x.s * v);
      }
      if ((e = e - i - 1) > MAX_EXP) {
        x.c = x.e = null;
      } else if (e < MIN_EXP) {
        x.c = [x.e = 0];
      } else {
        x.e = e;
        x.c = [];
        i = (e + 1) % LOG_BASE;
        if (e < 0) i += LOG_BASE;
        if (i < len) {
          if (i) x.c.push(+str.slice(0, i));
          for (len -= LOG_BASE; i < len; ) {
            x.c.push(+str.slice(i, i += LOG_BASE));
          }
          i = LOG_BASE - (str = str.slice(i)).length;
        } else {
          i -= len;
        }
        for (; i--; str += "0") ;
        x.c.push(+str);
      }
    } else {
      x.c = [x.e = 0];
    }
  }
  BigNumber2.clone = clone;
  BigNumber2.ROUND_UP = 0;
  BigNumber2.ROUND_DOWN = 1;
  BigNumber2.ROUND_CEIL = 2;
  BigNumber2.ROUND_FLOOR = 3;
  BigNumber2.ROUND_HALF_UP = 4;
  BigNumber2.ROUND_HALF_DOWN = 5;
  BigNumber2.ROUND_HALF_EVEN = 6;
  BigNumber2.ROUND_HALF_CEIL = 7;
  BigNumber2.ROUND_HALF_FLOOR = 8;
  BigNumber2.EUCLID = 9;
  BigNumber2.config = BigNumber2.set = function(obj) {
    var p, v;
    if (obj != null) {
      if (typeof obj == "object") {
        if (obj.hasOwnProperty(p = "DECIMAL_PLACES")) {
          v = obj[p];
          intCheck(v, 0, MAX, p);
          DECIMAL_PLACES = v;
        }
        if (obj.hasOwnProperty(p = "ROUNDING_MODE")) {
          v = obj[p];
          intCheck(v, 0, 8, p);
          ROUNDING_MODE = v;
        }
        if (obj.hasOwnProperty(p = "EXPONENTIAL_AT")) {
          v = obj[p];
          if (v && v.pop) {
            intCheck(v[0], -MAX, 0, p);
            intCheck(v[1], 0, MAX, p);
            TO_EXP_NEG = v[0];
            TO_EXP_POS = v[1];
          } else {
            intCheck(v, -MAX, MAX, p);
            TO_EXP_NEG = -(TO_EXP_POS = v < 0 ? -v : v);
          }
        }
        if (obj.hasOwnProperty(p = "RANGE")) {
          v = obj[p];
          if (v && v.pop) {
            intCheck(v[0], -MAX, -1, p);
            intCheck(v[1], 1, MAX, p);
            MIN_EXP = v[0];
            MAX_EXP = v[1];
          } else {
            intCheck(v, -MAX, MAX, p);
            if (v) {
              MIN_EXP = -(MAX_EXP = v < 0 ? -v : v);
            } else {
              throw Error(bignumberError + p + " cannot be zero: " + v);
            }
          }
        }
        if (obj.hasOwnProperty(p = "CRYPTO")) {
          v = obj[p];
          if (v === !!v) {
            if (v) {
              if (typeof crypto != "undefined" && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
                CRYPTO = v;
              } else {
                CRYPTO = !v;
                throw Error(bignumberError + "crypto unavailable");
              }
            } else {
              CRYPTO = v;
            }
          } else {
            throw Error(bignumberError + p + " not true or false: " + v);
          }
        }
        if (obj.hasOwnProperty(p = "MODULO_MODE")) {
          v = obj[p];
          intCheck(v, 0, 9, p);
          MODULO_MODE = v;
        }
        if (obj.hasOwnProperty(p = "POW_PRECISION")) {
          v = obj[p];
          intCheck(v, 0, MAX, p);
          POW_PRECISION = v;
        }
        if (obj.hasOwnProperty(p = "FORMAT")) {
          v = obj[p];
          if (typeof v == "object") FORMAT = v;
          else throw Error(bignumberError + p + " not an object: " + v);
        }
        if (obj.hasOwnProperty(p = "ALPHABET")) {
          v = obj[p];
          if (typeof v == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(v)) {
            alphabetHasNormalDecimalDigits = v.slice(0, 10) == "0123456789";
            ALPHABET = v;
          } else {
            throw Error(bignumberError + p + " invalid: " + v);
          }
        }
      } else {
        throw Error(bignumberError + "Object expected: " + obj);
      }
    }
    return {
      DECIMAL_PLACES,
      ROUNDING_MODE,
      EXPONENTIAL_AT: [TO_EXP_NEG, TO_EXP_POS],
      RANGE: [MIN_EXP, MAX_EXP],
      CRYPTO,
      MODULO_MODE,
      POW_PRECISION,
      FORMAT,
      ALPHABET
    };
  };
  BigNumber2.isBigNumber = function(v) {
    if (!v || v._isBigNumber !== true) return false;
    if (!BigNumber2.DEBUG) return true;
    var i, n, c = v.c, e = v.e, s = v.s;
    out: if ({}.toString.call(c) == "[object Array]") {
      if ((s === 1 || s === -1) && e >= -MAX && e <= MAX && e === mathfloor(e)) {
        if (c[0] === 0) {
          if (e === 0 && c.length === 1) return true;
          break out;
        }
        i = (e + 1) % LOG_BASE;
        if (i < 1) i += LOG_BASE;
        if (String(c[0]).length == i) {
          for (i = 0; i < c.length; i++) {
            n = c[i];
            if (n < 0 || n >= BASE || n !== mathfloor(n)) break out;
          }
          if (n !== 0) return true;
        }
      }
    } else if (c === null && e === null && (s === null || s === 1 || s === -1)) {
      return true;
    }
    throw Error(bignumberError + "Invalid BigNumber: " + v);
  };
  BigNumber2.maximum = BigNumber2.max = function() {
    return maxOrMin(arguments, -1);
  };
  BigNumber2.minimum = BigNumber2.min = function() {
    return maxOrMin(arguments, 1);
  };
  BigNumber2.random = (function() {
    var pow2_53 = 9007199254740992;
    var random53bitInt = Math.random() * pow2_53 & 2097151 ? function() {
      return mathfloor(Math.random() * pow2_53);
    } : function() {
      return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0);
    };
    return function(dp) {
      var a, b, e, k, v, i = 0, c = [], rand = new BigNumber2(ONE);
      if (dp == null) dp = DECIMAL_PLACES;
      else intCheck(dp, 0, MAX);
      k = mathceil(dp / LOG_BASE);
      if (CRYPTO) {
        if (crypto.getRandomValues) {
          a = crypto.getRandomValues(new Uint32Array(k *= 2));
          for (; i < k; ) {
            v = a[i] * 131072 + (a[i + 1] >>> 11);
            if (v >= 9e15) {
              b = crypto.getRandomValues(new Uint32Array(2));
              a[i] = b[0];
              a[i + 1] = b[1];
            } else {
              c.push(v % 1e14);
              i += 2;
            }
          }
          i = k / 2;
        } else if (crypto.randomBytes) {
          a = crypto.randomBytes(k *= 7);
          for (; i < k; ) {
            v = (a[i] & 31) * 281474976710656 + a[i + 1] * 1099511627776 + a[i + 2] * 4294967296 + a[i + 3] * 16777216 + (a[i + 4] << 16) + (a[i + 5] << 8) + a[i + 6];
            if (v >= 9e15) {
              crypto.randomBytes(7).copy(a, i);
            } else {
              c.push(v % 1e14);
              i += 7;
            }
          }
          i = k / 7;
        } else {
          CRYPTO = false;
          throw Error(bignumberError + "crypto unavailable");
        }
      }
      if (!CRYPTO) {
        for (; i < k; ) {
          v = random53bitInt();
          if (v < 9e15) c[i++] = v % 1e14;
        }
      }
      k = c[--i];
      dp %= LOG_BASE;
      if (k && dp) {
        v = POWS_TEN[LOG_BASE - dp];
        c[i] = mathfloor(k / v) * v;
      }
      for (; c[i] === 0; c.pop(), i--) ;
      if (i < 0) {
        c = [e = 0];
      } else {
        for (e = -1; c[0] === 0; c.splice(0, 1), e -= LOG_BASE) ;
        for (i = 1, v = c[0]; v >= 10; v /= 10, i++) ;
        if (i < LOG_BASE) e -= LOG_BASE - i;
      }
      rand.e = e;
      rand.c = c;
      return rand;
    };
  })();
  BigNumber2.sum = function() {
    var i = 1, args = arguments, sum = new BigNumber2(args[0]);
    for (; i < args.length; ) sum = sum.plus(args[i++]);
    return sum;
  };
  convertBase = /* @__PURE__ */ (function() {
    var decimal = "0123456789";
    function toBaseOut(str, baseIn, baseOut, alphabet) {
      var j, arr = [0], arrL, i = 0, len = str.length;
      for (; i < len; ) {
        for (arrL = arr.length; arrL--; arr[arrL] *= baseIn) ;
        arr[0] += alphabet.indexOf(str.charAt(i++));
        for (j = 0; j < arr.length; j++) {
          if (arr[j] > baseOut - 1) {
            if (arr[j + 1] == null) arr[j + 1] = 0;
            arr[j + 1] += arr[j] / baseOut | 0;
            arr[j] %= baseOut;
          }
        }
      }
      return arr.reverse();
    }
    return function(str, baseIn, baseOut, sign, callerIsToString) {
      var alphabet, d, e, k, r, x, xc, y, i = str.indexOf("."), dp = DECIMAL_PLACES, rm = ROUNDING_MODE;
      if (i >= 0) {
        k = POW_PRECISION;
        POW_PRECISION = 0;
        str = str.replace(".", "");
        y = new BigNumber2(baseIn);
        x = y.pow(str.length - i);
        POW_PRECISION = k;
        y.c = toBaseOut(
          toFixedPoint(coeffToString(x.c), x.e, "0"),
          10,
          baseOut,
          decimal
        );
        y.e = y.c.length;
      }
      xc = toBaseOut(str, baseIn, baseOut, callerIsToString ? (alphabet = ALPHABET, decimal) : (alphabet = decimal, ALPHABET));
      e = k = xc.length;
      for (; xc[--k] == 0; xc.pop()) ;
      if (!xc[0]) return alphabet.charAt(0);
      if (i < 0) {
        --e;
      } else {
        x.c = xc;
        x.e = e;
        x.s = sign;
        x = div(x, y, dp, rm, baseOut);
        xc = x.c;
        r = x.r;
        e = x.e;
      }
      d = e + dp + 1;
      i = xc[d];
      k = baseOut / 2;
      r = r || d < 0 || xc[d + 1] != null;
      r = rm < 4 ? (i != null || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : i > k || i == k && (rm == 4 || r || rm == 6 && xc[d - 1] & 1 || rm == (x.s < 0 ? 8 : 7));
      if (d < 1 || !xc[0]) {
        str = r ? toFixedPoint(alphabet.charAt(1), -dp, alphabet.charAt(0)) : alphabet.charAt(0);
      } else {
        xc.length = d;
        if (r) {
          for (--baseOut; ++xc[--d] > baseOut; ) {
            xc[d] = 0;
            if (!d) {
              ++e;
              xc = [1].concat(xc);
            }
          }
        }
        for (k = xc.length; !xc[--k]; ) ;
        for (i = 0, str = ""; i <= k; str += alphabet.charAt(xc[i++])) ;
        str = toFixedPoint(str, e, alphabet.charAt(0));
      }
      return str;
    };
  })();
  div = /* @__PURE__ */ (function() {
    function multiply(x, k, base) {
      var m, temp, xlo, xhi, carry = 0, i = x.length, klo = k % SQRT_BASE, khi = k / SQRT_BASE | 0;
      for (x = x.slice(); i--; ) {
        xlo = x[i] % SQRT_BASE;
        xhi = x[i] / SQRT_BASE | 0;
        m = khi * xlo + xhi * klo;
        temp = klo * xlo + m % SQRT_BASE * SQRT_BASE + carry;
        carry = (temp / base | 0) + (m / SQRT_BASE | 0) + khi * xhi;
        x[i] = temp % base;
      }
      if (carry) x = [carry].concat(x);
      return x;
    }
    function compare2(a, b, aL, bL) {
      var i, cmp;
      if (aL != bL) {
        cmp = aL > bL ? 1 : -1;
      } else {
        for (i = cmp = 0; i < aL; i++) {
          if (a[i] != b[i]) {
            cmp = a[i] > b[i] ? 1 : -1;
            break;
          }
        }
      }
      return cmp;
    }
    function subtract(a, b, aL, base) {
      var i = 0;
      for (; aL--; ) {
        a[aL] -= i;
        i = a[aL] < b[aL] ? 1 : 0;
        a[aL] = i * base + a[aL] - b[aL];
      }
      for (; !a[0] && a.length > 1; a.splice(0, 1)) ;
    }
    return function(x, y, dp, rm, base) {
      var cmp, e, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0, yL, yz, s = x.s == y.s ? 1 : -1, xc = x.c, yc = y.c;
      if (!xc || !xc[0] || !yc || !yc[0]) {
        return new BigNumber2(
          // Return NaN if either NaN, or both Infinity or 0.
          !x.s || !y.s || (xc ? yc && xc[0] == yc[0] : !yc) ? NaN : (
            // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
            xc && xc[0] == 0 || !yc ? s * 0 : s / 0
          )
        );
      }
      q = new BigNumber2(s);
      qc = q.c = [];
      e = x.e - y.e;
      s = dp + e + 1;
      if (!base) {
        base = BASE;
        e = bitFloor(x.e / LOG_BASE) - bitFloor(y.e / LOG_BASE);
        s = s / LOG_BASE | 0;
      }
      for (i = 0; yc[i] == (xc[i] || 0); i++) ;
      if (yc[i] > (xc[i] || 0)) e--;
      if (s < 0) {
        qc.push(1);
        more = true;
      } else {
        xL = xc.length;
        yL = yc.length;
        i = 0;
        s += 2;
        n = mathfloor(base / (yc[0] + 1));
        if (n > 1) {
          yc = multiply(yc, n, base);
          xc = multiply(xc, n, base);
          yL = yc.length;
          xL = xc.length;
        }
        xi = yL;
        rem = xc.slice(0, yL);
        remL = rem.length;
        for (; remL < yL; rem[remL++] = 0) ;
        yz = yc.slice();
        yz = [0].concat(yz);
        yc0 = yc[0];
        if (yc[1] >= base / 2) yc0++;
        do {
          n = 0;
          cmp = compare2(yc, rem, yL, remL);
          if (cmp < 0) {
            rem0 = rem[0];
            if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);
            n = mathfloor(rem0 / yc0);
            if (n > 1) {
              if (n >= base) n = base - 1;
              prod = multiply(yc, n, base);
              prodL = prod.length;
              remL = rem.length;
              while (compare2(prod, rem, prodL, remL) == 1) {
                n--;
                subtract(prod, yL < prodL ? yz : yc, prodL, base);
                prodL = prod.length;
                cmp = 1;
              }
            } else {
              if (n == 0) {
                cmp = n = 1;
              }
              prod = yc.slice();
              prodL = prod.length;
            }
            if (prodL < remL) prod = [0].concat(prod);
            subtract(rem, prod, remL, base);
            remL = rem.length;
            if (cmp == -1) {
              while (compare2(yc, rem, yL, remL) < 1) {
                n++;
                subtract(rem, yL < remL ? yz : yc, remL, base);
                remL = rem.length;
              }
            }
          } else if (cmp === 0) {
            n++;
            rem = [0];
          }
          qc[i++] = n;
          if (rem[0]) {
            rem[remL++] = xc[xi] || 0;
          } else {
            rem = [xc[xi]];
            remL = 1;
          }
        } while ((xi++ < xL || rem[0] != null) && s--);
        more = rem[0] != null;
        if (!qc[0]) qc.splice(0, 1);
      }
      if (base == BASE) {
        for (i = 1, s = qc[0]; s >= 10; s /= 10, i++) ;
        round(q, dp + (q.e = i + e * LOG_BASE - 1) + 1, rm, more);
      } else {
        q.e = e;
        q.r = +more;
      }
      return q;
    };
  })();
  function format(n, i, rm, id) {
    var c0, e, ne, len, str;
    if (rm == null) rm = ROUNDING_MODE;
    else intCheck(rm, 0, 8);
    if (!n.c) return n.toString();
    c0 = n.c[0];
    ne = n.e;
    if (i == null) {
      str = coeffToString(n.c);
      str = id == 1 || id == 2 && (ne <= TO_EXP_NEG || ne >= TO_EXP_POS) ? toExponential(str, ne) : toFixedPoint(str, ne, "0");
    } else {
      n = round(new BigNumber2(n), i, rm);
      e = n.e;
      str = coeffToString(n.c);
      len = str.length;
      if (id == 1 || id == 2 && (i <= e || e <= TO_EXP_NEG)) {
        for (; len < i; str += "0", len++) ;
        str = toExponential(str, e);
      } else {
        i -= ne + (id === 2 && e > ne);
        str = toFixedPoint(str, e, "0");
        if (e + 1 > len) {
          if (--i > 0) for (str += "."; i--; str += "0") ;
        } else {
          i += e - len;
          if (i > 0) {
            if (e + 1 == len) str += ".";
            for (; i--; str += "0") ;
          }
        }
      }
    }
    return n.s < 0 && c0 ? "-" + str : str;
  }
  function maxOrMin(args, n) {
    var k, y, i = 1, x = new BigNumber2(args[0]);
    for (; i < args.length; i++) {
      y = new BigNumber2(args[i]);
      if (!y.s || (k = compare(x, y)) === n || k === 0 && x.s === n) {
        x = y;
      }
    }
    return x;
  }
  function normalise(n, c, e) {
    var i = 1, j = c.length;
    for (; !c[--j]; c.pop()) ;
    for (j = c[0]; j >= 10; j /= 10, i++) ;
    if ((e = i + e * LOG_BASE - 1) > MAX_EXP) {
      n.c = n.e = null;
    } else if (e < MIN_EXP) {
      n.c = [n.e = 0];
    } else {
      n.e = e;
      n.c = c;
    }
    return n;
  }
  parseNumeric = /* @__PURE__ */ (function() {
    var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i, dotAfter = /^([^.]+)\.$/, dotBefore = /^\.([^.]+)$/, isInfinityOrNaN = /^-?(Infinity|NaN)$/, whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
    return function(x, str, isNum, b) {
      var base, s = isNum ? str : str.replace(whitespaceOrPlus, "");
      if (isInfinityOrNaN.test(s)) {
        x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
      } else {
        if (!isNum) {
          s = s.replace(basePrefix, function(m, p1, p2) {
            base = (p2 = p2.toLowerCase()) == "x" ? 16 : p2 == "b" ? 2 : 8;
            return !b || b == base ? p1 : m;
          });
          if (b) {
            base = b;
            s = s.replace(dotAfter, "$1").replace(dotBefore, "0.$1");
          }
          if (str != s) return new BigNumber2(s, base);
        }
        if (BigNumber2.DEBUG) {
          throw Error(bignumberError + "Not a" + (b ? " base " + b : "") + " number: " + str);
        }
        x.s = null;
      }
      x.c = x.e = null;
    };
  })();
  function round(x, sd, rm, r) {
    var d, i, j, k, n, ni, rd, xc = x.c, pows10 = POWS_TEN;
    if (xc) {
      out: {
        for (d = 1, k = xc[0]; k >= 10; k /= 10, d++) ;
        i = sd - d;
        if (i < 0) {
          i += LOG_BASE;
          j = sd;
          n = xc[ni = 0];
          rd = mathfloor(n / pows10[d - j - 1] % 10);
        } else {
          ni = mathceil((i + 1) / LOG_BASE);
          if (ni >= xc.length) {
            if (r) {
              for (; xc.length <= ni; xc.push(0)) ;
              n = rd = 0;
              d = 1;
              i %= LOG_BASE;
              j = i - LOG_BASE + 1;
            } else {
              break out;
            }
          } else {
            n = k = xc[ni];
            for (d = 1; k >= 10; k /= 10, d++) ;
            i %= LOG_BASE;
            j = i - LOG_BASE + d;
            rd = j < 0 ? 0 : mathfloor(n / pows10[d - j - 1] % 10);
          }
        }
        r = r || sd < 0 || // Are there any non-zero digits after the rounding digit?
        // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
        // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
        xc[ni + 1] != null || (j < 0 ? n : n % pows10[d - j - 1]);
        r = rm < 4 ? (rd || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || r || rm == 6 && // Check whether the digit to the left of the rounding digit is odd.
        (i > 0 ? j > 0 ? n / pows10[d - j] : 0 : xc[ni - 1]) % 10 & 1 || rm == (x.s < 0 ? 8 : 7));
        if (sd < 1 || !xc[0]) {
          xc.length = 0;
          if (r) {
            sd -= x.e + 1;
            xc[0] = pows10[(LOG_BASE - sd % LOG_BASE) % LOG_BASE];
            x.e = -sd || 0;
          } else {
            xc[0] = x.e = 0;
          }
          return x;
        }
        if (i == 0) {
          xc.length = ni;
          k = 1;
          ni--;
        } else {
          xc.length = ni + 1;
          k = pows10[LOG_BASE - i];
          xc[ni] = j > 0 ? mathfloor(n / pows10[d - j] % pows10[j]) * k : 0;
        }
        if (r) {
          for (; ; ) {
            if (ni == 0) {
              for (i = 1, j = xc[0]; j >= 10; j /= 10, i++) ;
              j = xc[0] += k;
              for (k = 1; j >= 10; j /= 10, k++) ;
              if (i != k) {
                x.e++;
                if (xc[0] == BASE) xc[0] = 1;
              }
              break;
            } else {
              xc[ni] += k;
              if (xc[ni] != BASE) break;
              xc[ni--] = 0;
              k = 1;
            }
          }
        }
        for (i = xc.length; xc[--i] === 0; xc.pop()) ;
      }
      if (x.e > MAX_EXP) {
        x.c = x.e = null;
      } else if (x.e < MIN_EXP) {
        x.c = [x.e = 0];
      }
    }
    return x;
  }
  function valueOf(n) {
    var str, e = n.e;
    if (e === null) return n.toString();
    str = coeffToString(n.c);
    str = e <= TO_EXP_NEG || e >= TO_EXP_POS ? toExponential(str, e) : toFixedPoint(str, e, "0");
    return n.s < 0 ? "-" + str : str;
  }
  P.absoluteValue = P.abs = function() {
    var x = new BigNumber2(this);
    if (x.s < 0) x.s = 1;
    return x;
  };
  P.comparedTo = function(y, b) {
    return compare(this, new BigNumber2(y, b));
  };
  P.decimalPlaces = P.dp = function(dp, rm) {
    var c, n, v, x = this;
    if (dp != null) {
      intCheck(dp, 0, MAX);
      if (rm == null) rm = ROUNDING_MODE;
      else intCheck(rm, 0, 8);
      return round(new BigNumber2(x), dp + x.e + 1, rm);
    }
    if (!(c = x.c)) return null;
    n = ((v = c.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE;
    if (v = c[v]) for (; v % 10 == 0; v /= 10, n--) ;
    if (n < 0) n = 0;
    return n;
  };
  P.dividedBy = P.div = function(y, b) {
    return div(this, new BigNumber2(y, b), DECIMAL_PLACES, ROUNDING_MODE);
  };
  P.dividedToIntegerBy = P.idiv = function(y, b) {
    return div(this, new BigNumber2(y, b), 0, 1);
  };
  P.exponentiatedBy = P.pow = function(n, m) {
    var half, isModExp, i, k, more, nIsBig, nIsNeg, nIsOdd, y, x = this;
    n = new BigNumber2(n);
    if (n.c && !n.isInteger()) {
      throw Error(bignumberError + "Exponent not an integer: " + valueOf(n));
    }
    if (m != null) m = new BigNumber2(m);
    nIsBig = n.e > 14;
    if (!x.c || !x.c[0] || x.c[0] == 1 && !x.e && x.c.length == 1 || !n.c || !n.c[0]) {
      y = new BigNumber2(Math.pow(+valueOf(x), nIsBig ? n.s * (2 - isOdd(n)) : +valueOf(n)));
      return m ? y.mod(m) : y;
    }
    nIsNeg = n.s < 0;
    if (m) {
      if (m.c ? !m.c[0] : !m.s) return new BigNumber2(NaN);
      isModExp = !nIsNeg && x.isInteger() && m.isInteger();
      if (isModExp) x = x.mod(m);
    } else if (n.e > 9 && (x.e > 0 || x.e < -1 || (x.e == 0 ? x.c[0] > 1 || nIsBig && x.c[1] >= 24e7 : x.c[0] < 8e13 || nIsBig && x.c[0] <= 9999975e7))) {
      k = x.s < 0 && isOdd(n) ? -0 : 0;
      if (x.e > -1) k = 1 / k;
      return new BigNumber2(nIsNeg ? 1 / k : k);
    } else if (POW_PRECISION) {
      k = mathceil(POW_PRECISION / LOG_BASE + 2);
    }
    if (nIsBig) {
      half = new BigNumber2(0.5);
      if (nIsNeg) n.s = 1;
      nIsOdd = isOdd(n);
    } else {
      i = Math.abs(+valueOf(n));
      nIsOdd = i % 2;
    }
    y = new BigNumber2(ONE);
    for (; ; ) {
      if (nIsOdd) {
        y = y.times(x);
        if (!y.c) break;
        if (k) {
          if (y.c.length > k) y.c.length = k;
        } else if (isModExp) {
          y = y.mod(m);
        }
      }
      if (i) {
        i = mathfloor(i / 2);
        if (i === 0) break;
        nIsOdd = i % 2;
      } else {
        n = n.times(half);
        round(n, n.e + 1, 1);
        if (n.e > 14) {
          nIsOdd = isOdd(n);
        } else {
          i = +valueOf(n);
          if (i === 0) break;
          nIsOdd = i % 2;
        }
      }
      x = x.times(x);
      if (k) {
        if (x.c && x.c.length > k) x.c.length = k;
      } else if (isModExp) {
        x = x.mod(m);
      }
    }
    if (isModExp) return y;
    if (nIsNeg) y = ONE.div(y);
    return m ? y.mod(m) : k ? round(y, POW_PRECISION, ROUNDING_MODE, more) : y;
  };
  P.integerValue = function(rm) {
    var n = new BigNumber2(this);
    if (rm == null) rm = ROUNDING_MODE;
    else intCheck(rm, 0, 8);
    return round(n, n.e + 1, rm);
  };
  P.isEqualTo = P.eq = function(y, b) {
    return compare(this, new BigNumber2(y, b)) === 0;
  };
  P.isFinite = function() {
    return !!this.c;
  };
  P.isGreaterThan = P.gt = function(y, b) {
    return compare(this, new BigNumber2(y, b)) > 0;
  };
  P.isGreaterThanOrEqualTo = P.gte = function(y, b) {
    return (b = compare(this, new BigNumber2(y, b))) === 1 || b === 0;
  };
  P.isInteger = function() {
    return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
  };
  P.isLessThan = P.lt = function(y, b) {
    return compare(this, new BigNumber2(y, b)) < 0;
  };
  P.isLessThanOrEqualTo = P.lte = function(y, b) {
    return (b = compare(this, new BigNumber2(y, b))) === -1 || b === 0;
  };
  P.isNaN = function() {
    return !this.s;
  };
  P.isNegative = function() {
    return this.s < 0;
  };
  P.isPositive = function() {
    return this.s > 0;
  };
  P.isZero = function() {
    return !!this.c && this.c[0] == 0;
  };
  P.minus = function(y, b) {
    var i, j, t, xLTy, x = this, a = x.s;
    y = new BigNumber2(y, b);
    b = y.s;
    if (!a || !b) return new BigNumber2(NaN);
    if (a != b) {
      y.s = -b;
      return x.plus(y);
    }
    var xe = x.e / LOG_BASE, ye = y.e / LOG_BASE, xc = x.c, yc = y.c;
    if (!xe || !ye) {
      if (!xc || !yc) return xc ? (y.s = -b, y) : new BigNumber2(yc ? x : NaN);
      if (!xc[0] || !yc[0]) {
        return yc[0] ? (y.s = -b, y) : new BigNumber2(xc[0] ? x : (
          // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
          ROUNDING_MODE == 3 ? -0 : 0
        ));
      }
    }
    xe = bitFloor(xe);
    ye = bitFloor(ye);
    xc = xc.slice();
    if (a = xe - ye) {
      if (xLTy = a < 0) {
        a = -a;
        t = xc;
      } else {
        ye = xe;
        t = yc;
      }
      t.reverse();
      for (b = a; b--; t.push(0)) ;
      t.reverse();
    } else {
      j = (xLTy = (a = xc.length) < (b = yc.length)) ? a : b;
      for (a = b = 0; b < j; b++) {
        if (xc[b] != yc[b]) {
          xLTy = xc[b] < yc[b];
          break;
        }
      }
    }
    if (xLTy) {
      t = xc;
      xc = yc;
      yc = t;
      y.s = -y.s;
    }
    b = (j = yc.length) - (i = xc.length);
    if (b > 0) for (; b--; xc[i++] = 0) ;
    b = BASE - 1;
    for (; j > a; ) {
      if (xc[--j] < yc[j]) {
        for (i = j; i && !xc[--i]; xc[i] = b) ;
        --xc[i];
        xc[j] += BASE;
      }
      xc[j] -= yc[j];
    }
    for (; xc[0] == 0; xc.splice(0, 1), --ye) ;
    if (!xc[0]) {
      y.s = ROUNDING_MODE == 3 ? -1 : 1;
      y.c = [y.e = 0];
      return y;
    }
    return normalise(y, xc, ye);
  };
  P.modulo = P.mod = function(y, b) {
    var q, s, x = this;
    y = new BigNumber2(y, b);
    if (!x.c || !y.s || y.c && !y.c[0]) {
      return new BigNumber2(NaN);
    } else if (!y.c || x.c && !x.c[0]) {
      return new BigNumber2(x);
    }
    if (MODULO_MODE == 9) {
      s = y.s;
      y.s = 1;
      q = div(x, y, 0, 3);
      y.s = s;
      q.s *= s;
    } else {
      q = div(x, y, 0, MODULO_MODE);
    }
    y = x.minus(q.times(y));
    if (!y.c[0] && MODULO_MODE == 1) y.s = x.s;
    return y;
  };
  P.multipliedBy = P.times = function(y, b) {
    var c, e, i, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc, base, sqrtBase, x = this, xc = x.c, yc = (y = new BigNumber2(y, b)).c;
    if (!xc || !yc || !xc[0] || !yc[0]) {
      if (!x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc) {
        y.c = y.e = y.s = null;
      } else {
        y.s *= x.s;
        if (!xc || !yc) {
          y.c = y.e = null;
        } else {
          y.c = [0];
          y.e = 0;
        }
      }
      return y;
    }
    e = bitFloor(x.e / LOG_BASE) + bitFloor(y.e / LOG_BASE);
    y.s *= x.s;
    xcL = xc.length;
    ycL = yc.length;
    if (xcL < ycL) {
      zc = xc;
      xc = yc;
      yc = zc;
      i = xcL;
      xcL = ycL;
      ycL = i;
    }
    for (i = xcL + ycL, zc = []; i--; zc.push(0)) ;
    base = BASE;
    sqrtBase = SQRT_BASE;
    for (i = ycL; --i >= 0; ) {
      c = 0;
      ylo = yc[i] % sqrtBase;
      yhi = yc[i] / sqrtBase | 0;
      for (k = xcL, j = i + k; j > i; ) {
        xlo = xc[--k] % sqrtBase;
        xhi = xc[k] / sqrtBase | 0;
        m = yhi * xlo + xhi * ylo;
        xlo = ylo * xlo + m % sqrtBase * sqrtBase + zc[j] + c;
        c = (xlo / base | 0) + (m / sqrtBase | 0) + yhi * xhi;
        zc[j--] = xlo % base;
      }
      zc[j] = c;
    }
    if (c) {
      ++e;
    } else {
      zc.splice(0, 1);
    }
    return normalise(y, zc, e);
  };
  P.negated = function() {
    var x = new BigNumber2(this);
    x.s = -x.s || null;
    return x;
  };
  P.plus = function(y, b) {
    var t, x = this, a = x.s;
    y = new BigNumber2(y, b);
    b = y.s;
    if (!a || !b) return new BigNumber2(NaN);
    if (a != b) {
      y.s = -b;
      return x.minus(y);
    }
    var xe = x.e / LOG_BASE, ye = y.e / LOG_BASE, xc = x.c, yc = y.c;
    if (!xe || !ye) {
      if (!xc || !yc) return new BigNumber2(a / 0);
      if (!xc[0] || !yc[0]) return yc[0] ? y : new BigNumber2(xc[0] ? x : a * 0);
    }
    xe = bitFloor(xe);
    ye = bitFloor(ye);
    xc = xc.slice();
    if (a = xe - ye) {
      if (a > 0) {
        ye = xe;
        t = yc;
      } else {
        a = -a;
        t = xc;
      }
      t.reverse();
      for (; a--; t.push(0)) ;
      t.reverse();
    }
    a = xc.length;
    b = yc.length;
    if (a - b < 0) {
      t = yc;
      yc = xc;
      xc = t;
      b = a;
    }
    for (a = 0; b; ) {
      a = (xc[--b] = xc[b] + yc[b] + a) / BASE | 0;
      xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
    }
    if (a) {
      xc = [a].concat(xc);
      ++ye;
    }
    return normalise(y, xc, ye);
  };
  P.precision = P.sd = function(sd, rm) {
    var c, n, v, x = this;
    if (sd != null && sd !== !!sd) {
      intCheck(sd, 1, MAX);
      if (rm == null) rm = ROUNDING_MODE;
      else intCheck(rm, 0, 8);
      return round(new BigNumber2(x), sd, rm);
    }
    if (!(c = x.c)) return null;
    v = c.length - 1;
    n = v * LOG_BASE + 1;
    if (v = c[v]) {
      for (; v % 10 == 0; v /= 10, n--) ;
      for (v = c[0]; v >= 10; v /= 10, n++) ;
    }
    if (sd && x.e + 1 > n) n = x.e + 1;
    return n;
  };
  P.shiftedBy = function(k) {
    intCheck(k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
    return this.times("1e" + k);
  };
  P.squareRoot = P.sqrt = function() {
    var m, n, r, rep, t, x = this, c = x.c, s = x.s, e = x.e, dp = DECIMAL_PLACES + 4, half = new BigNumber2("0.5");
    if (s !== 1 || !c || !c[0]) {
      return new BigNumber2(!s || s < 0 && (!c || c[0]) ? NaN : c ? x : 1 / 0);
    }
    s = Math.sqrt(+valueOf(x));
    if (s == 0 || s == 1 / 0) {
      n = coeffToString(c);
      if ((n.length + e) % 2 == 0) n += "0";
      s = Math.sqrt(+n);
      e = bitFloor((e + 1) / 2) - (e < 0 || e % 2);
      if (s == 1 / 0) {
        n = "5e" + e;
      } else {
        n = s.toExponential();
        n = n.slice(0, n.indexOf("e") + 1) + e;
      }
      r = new BigNumber2(n);
    } else {
      r = new BigNumber2(s + "");
    }
    if (r.c[0]) {
      e = r.e;
      s = e + dp;
      if (s < 3) s = 0;
      for (; ; ) {
        t = r;
        r = half.times(t.plus(div(x, t, dp, 1)));
        if (coeffToString(t.c).slice(0, s) === (n = coeffToString(r.c)).slice(0, s)) {
          if (r.e < e) --s;
          n = n.slice(s - 3, s + 1);
          if (n == "9999" || !rep && n == "4999") {
            if (!rep) {
              round(t, t.e + DECIMAL_PLACES + 2, 0);
              if (t.times(t).eq(x)) {
                r = t;
                break;
              }
            }
            dp += 4;
            s += 4;
            rep = 1;
          } else {
            if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
              round(r, r.e + DECIMAL_PLACES + 2, 1);
              m = !r.times(r).eq(x);
            }
            break;
          }
        }
      }
    }
    return round(r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m);
  };
  P.toExponential = function(dp, rm) {
    if (dp != null) {
      intCheck(dp, 0, MAX);
      dp++;
    }
    return format(this, dp, rm, 1);
  };
  P.toFixed = function(dp, rm) {
    if (dp != null) {
      intCheck(dp, 0, MAX);
      dp = dp + this.e + 1;
    }
    return format(this, dp, rm);
  };
  P.toFormat = function(dp, rm, format2) {
    var str, x = this;
    if (format2 == null) {
      if (dp != null && rm && typeof rm == "object") {
        format2 = rm;
        rm = null;
      } else if (dp && typeof dp == "object") {
        format2 = dp;
        dp = rm = null;
      } else {
        format2 = FORMAT;
      }
    } else if (typeof format2 != "object") {
      throw Error(bignumberError + "Argument not an object: " + format2);
    }
    str = x.toFixed(dp, rm);
    if (x.c) {
      var i, arr = str.split("."), g1 = +format2.groupSize, g2 = +format2.secondaryGroupSize, groupSeparator = format2.groupSeparator || "", intPart = arr[0], fractionPart = arr[1], isNeg = x.s < 0, intDigits = isNeg ? intPart.slice(1) : intPart, len = intDigits.length;
      if (g2) {
        i = g1;
        g1 = g2;
        g2 = i;
        len -= i;
      }
      if (g1 > 0 && len > 0) {
        i = len % g1 || g1;
        intPart = intDigits.substr(0, i);
        for (; i < len; i += g1) intPart += groupSeparator + intDigits.substr(i, g1);
        if (g2 > 0) intPart += groupSeparator + intDigits.slice(i);
        if (isNeg) intPart = "-" + intPart;
      }
      str = fractionPart ? intPart + (format2.decimalSeparator || "") + ((g2 = +format2.fractionGroupSize) ? fractionPart.replace(
        new RegExp("\\d{" + g2 + "}\\B", "g"),
        "$&" + (format2.fractionGroupSeparator || "")
      ) : fractionPart) : intPart;
    }
    return (format2.prefix || "") + str + (format2.suffix || "");
  };
  P.toFraction = function(md) {
    var d, d0, d1, d2, e, exp, n, n0, n1, q, r, s, x = this, xc = x.c;
    if (md != null) {
      n = new BigNumber2(md);
      if (!n.isInteger() && (n.c || n.s !== 1) || n.lt(ONE)) {
        throw Error(bignumberError + "Argument " + (n.isInteger() ? "out of range: " : "not an integer: ") + valueOf(n));
      }
    }
    if (!xc) return new BigNumber2(x);
    d = new BigNumber2(ONE);
    n1 = d0 = new BigNumber2(ONE);
    d1 = n0 = new BigNumber2(ONE);
    s = coeffToString(xc);
    e = d.e = s.length - x.e - 1;
    d.c[0] = POWS_TEN[(exp = e % LOG_BASE) < 0 ? LOG_BASE + exp : exp];
    md = !md || n.comparedTo(d) > 0 ? e > 0 ? d : n1 : n;
    exp = MAX_EXP;
    MAX_EXP = 1 / 0;
    n = new BigNumber2(s);
    n0.c[0] = 0;
    for (; ; ) {
      q = div(n, d, 0, 1);
      d2 = d0.plus(q.times(d1));
      if (d2.comparedTo(md) == 1) break;
      d0 = d1;
      d1 = d2;
      n1 = n0.plus(q.times(d2 = n1));
      n0 = d2;
      d = n.minus(q.times(d2 = d));
      n = d2;
    }
    d2 = div(md.minus(d0), d1, 0, 1);
    n0 = n0.plus(d2.times(n1));
    d0 = d0.plus(d2.times(d1));
    n0.s = n1.s = x.s;
    e = e * 2;
    r = div(n1, d1, e, ROUNDING_MODE).minus(x).abs().comparedTo(
      div(n0, d0, e, ROUNDING_MODE).minus(x).abs()
    ) < 1 ? [n1, d1] : [n0, d0];
    MAX_EXP = exp;
    return r;
  };
  P.toNumber = function() {
    return +valueOf(this);
  };
  P.toPrecision = function(sd, rm) {
    if (sd != null) intCheck(sd, 1, MAX);
    return format(this, sd, rm, 2);
  };
  P.toString = function(b) {
    var str, n = this, s = n.s, e = n.e;
    if (e === null) {
      if (s) {
        str = "Infinity";
        if (s < 0) str = "-" + str;
      } else {
        str = "NaN";
      }
    } else {
      if (b == null) {
        str = e <= TO_EXP_NEG || e >= TO_EXP_POS ? toExponential(coeffToString(n.c), e) : toFixedPoint(coeffToString(n.c), e, "0");
      } else if (b === 10 && alphabetHasNormalDecimalDigits) {
        n = round(new BigNumber2(n), DECIMAL_PLACES + e + 1, ROUNDING_MODE);
        str = toFixedPoint(coeffToString(n.c), n.e, "0");
      } else {
        intCheck(b, 2, ALPHABET.length, "Base");
        str = convertBase(toFixedPoint(coeffToString(n.c), e, "0"), 10, b, s, true);
      }
      if (s < 0 && n.c[0]) str = "-" + str;
    }
    return str;
  };
  P.valueOf = P.toJSON = function() {
    return valueOf(this);
  };
  P._isBigNumber = true;
  P[Symbol.toStringTag] = "BigNumber";
  P[Symbol.for("nodejs.util.inspect.custom")] = P.valueOf;
  if (configObject != null) BigNumber2.set(configObject);
  return BigNumber2;
}
function bitFloor(n) {
  var i = n | 0;
  return n > 0 || n === i ? i : i - 1;
}
function coeffToString(a) {
  var s, z, i = 1, j = a.length, r = a[0] + "";
  for (; i < j; ) {
    s = a[i++] + "";
    z = LOG_BASE - s.length;
    for (; z--; s = "0" + s) ;
    r += s;
  }
  for (j = r.length; r.charCodeAt(--j) === 48; ) ;
  return r.slice(0, j + 1 || 1);
}
function compare(x, y) {
  var a, b, xc = x.c, yc = y.c, i = x.s, j = y.s, k = x.e, l = y.e;
  if (!i || !j) return null;
  a = xc && !xc[0];
  b = yc && !yc[0];
  if (a || b) return a ? b ? 0 : -j : i;
  if (i != j) return i;
  a = i < 0;
  b = k == l;
  if (!xc || !yc) return b ? 0 : !xc ^ a ? 1 : -1;
  if (!b) return k > l ^ a ? 1 : -1;
  j = (k = xc.length) < (l = yc.length) ? k : l;
  for (i = 0; i < j; i++) if (xc[i] != yc[i]) return xc[i] > yc[i] ^ a ? 1 : -1;
  return k == l ? 0 : k > l ^ a ? 1 : -1;
}
function intCheck(n, min, max, name) {
  if (n < min || n > max || n !== mathfloor(n)) {
    throw Error(bignumberError + (name || "Argument") + (typeof n == "number" ? n < min || n > max ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(n));
  }
}
function isOdd(n) {
  var k = n.c.length - 1;
  return bitFloor(n.e / LOG_BASE) == k && n.c[k] % 2 != 0;
}
function toExponential(str, e) {
  return (str.length > 1 ? str.charAt(0) + "." + str.slice(1) : str) + (e < 0 ? "e" : "e+") + e;
}
function toFixedPoint(str, e, z) {
  var len, zs;
  if (e < 0) {
    for (zs = z + "."; ++e; zs += z) ;
    str = zs + str;
  } else {
    len = str.length;
    if (++e > len) {
      for (zs = z, e -= len; --e; zs += z) ;
      str += zs;
    } else if (e < len) {
      str = str.slice(0, e) + "." + str.slice(e);
    }
  }
  return str;
}
var BigNumber = clone();
var RoundingModeMap;
(function(RoundingModeMap2) {
  RoundingModeMap2[RoundingModeMap2["up"] = BigNumber.ROUND_UP] = "up";
  RoundingModeMap2[RoundingModeMap2["down"] = BigNumber.ROUND_DOWN] = "down";
  RoundingModeMap2[RoundingModeMap2["truncate"] = BigNumber.ROUND_DOWN] = "truncate";
  RoundingModeMap2[RoundingModeMap2["halfUp"] = BigNumber.ROUND_HALF_UP] = "halfUp";
  RoundingModeMap2[RoundingModeMap2["default"] = BigNumber.ROUND_HALF_UP] = "default";
  RoundingModeMap2[RoundingModeMap2["halfDown"] = BigNumber.ROUND_HALF_DOWN] = "halfDown";
  RoundingModeMap2[RoundingModeMap2["halfEven"] = BigNumber.ROUND_HALF_EVEN] = "halfEven";
  RoundingModeMap2[RoundingModeMap2["banker"] = BigNumber.ROUND_HALF_EVEN] = "banker";
  RoundingModeMap2[RoundingModeMap2["ceiling"] = BigNumber.ROUND_CEIL] = "ceiling";
  RoundingModeMap2[RoundingModeMap2["ceil"] = BigNumber.ROUND_CEIL] = "ceil";
  RoundingModeMap2[RoundingModeMap2["floor"] = BigNumber.ROUND_FLOOR] = "floor";
})(RoundingModeMap || (RoundingModeMap = {}));
function expandRoundMode(roundMode) {
  var _a;
  return (_a = RoundingModeMap[roundMode]) !== null && _a !== void 0 ? _a : RoundingModeMap.default;
}
var _baseRepeat;
var hasRequired_baseRepeat;
function require_baseRepeat() {
  if (hasRequired_baseRepeat) return _baseRepeat;
  hasRequired_baseRepeat = 1;
  var MAX_SAFE_INTEGER2 = 9007199254740991;
  var nativeFloor = Math.floor;
  function baseRepeat(string, n) {
    var result = "";
    if (!string || n < 1 || n > MAX_SAFE_INTEGER2) {
      return result;
    }
    do {
      if (n % 2) {
        result += string;
      }
      n = nativeFloor(n / 2);
      if (n) {
        string += string;
      }
    } while (n);
    return result;
  }
  _baseRepeat = baseRepeat;
  return _baseRepeat;
}
var _trimmedEndIndex;
var hasRequired_trimmedEndIndex;
function require_trimmedEndIndex() {
  if (hasRequired_trimmedEndIndex) return _trimmedEndIndex;
  hasRequired_trimmedEndIndex = 1;
  var reWhitespace = /\s/;
  function trimmedEndIndex(string) {
    var index = string.length;
    while (index-- && reWhitespace.test(string.charAt(index))) {
    }
    return index;
  }
  _trimmedEndIndex = trimmedEndIndex;
  return _trimmedEndIndex;
}
var _baseTrim;
var hasRequired_baseTrim;
function require_baseTrim() {
  if (hasRequired_baseTrim) return _baseTrim;
  hasRequired_baseTrim = 1;
  var trimmedEndIndex = require_trimmedEndIndex();
  var reTrimStart = /^\s+/;
  function baseTrim(string) {
    return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
  }
  _baseTrim = baseTrim;
  return _baseTrim;
}
var toNumber_1;
var hasRequiredToNumber;
function requireToNumber() {
  if (hasRequiredToNumber) return toNumber_1;
  hasRequiredToNumber = 1;
  var baseTrim = require_baseTrim(), isObject = requireIsObject(), isSymbol = requireIsSymbol();
  var NAN = 0 / 0;
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
  var reIsBinary = /^0b[01]+$/i;
  var reIsOctal = /^0o[0-7]+$/i;
  var freeParseInt = parseInt;
  function toNumber(value) {
    if (typeof value == "number") {
      return value;
    }
    if (isSymbol(value)) {
      return NAN;
    }
    if (isObject(value)) {
      var other = typeof value.valueOf == "function" ? value.valueOf() : value;
      value = isObject(other) ? other + "" : other;
    }
    if (typeof value != "string") {
      return value === 0 ? value : +value;
    }
    value = baseTrim(value);
    var isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
  }
  toNumber_1 = toNumber;
  return toNumber_1;
}
var toFinite_1;
var hasRequiredToFinite;
function requireToFinite() {
  if (hasRequiredToFinite) return toFinite_1;
  hasRequiredToFinite = 1;
  var toNumber = requireToNumber();
  var INFINITY = 1 / 0, MAX_INTEGER = 17976931348623157e292;
  function toFinite(value) {
    if (!value) {
      return value === 0 ? value : 0;
    }
    value = toNumber(value);
    if (value === INFINITY || value === -INFINITY) {
      var sign = value < 0 ? -1 : 1;
      return sign * MAX_INTEGER;
    }
    return value === value ? value : 0;
  }
  toFinite_1 = toFinite;
  return toFinite_1;
}
var toInteger_1;
var hasRequiredToInteger;
function requireToInteger() {
  if (hasRequiredToInteger) return toInteger_1;
  hasRequiredToInteger = 1;
  var toFinite = requireToFinite();
  function toInteger(value) {
    var result = toFinite(value), remainder = result % 1;
    return result === result ? remainder ? result - remainder : result : 0;
  }
  toInteger_1 = toInteger;
  return toInteger_1;
}
var repeat_1;
var hasRequiredRepeat;
function requireRepeat() {
  if (hasRequiredRepeat) return repeat_1;
  hasRequiredRepeat = 1;
  var baseRepeat = require_baseRepeat(), isIterateeCall = require_isIterateeCall(), toInteger = requireToInteger(), toString = requireToString();
  function repeat2(string, n, guard) {
    if (guard ? isIterateeCall(string, n, guard) : n === void 0) {
      n = 1;
    } else {
      n = toInteger(n);
    }
    return baseRepeat(toString(string), n);
  }
  repeat_1 = repeat2;
  return repeat_1;
}
var repeatExports = requireRepeat();
const repeat = /* @__PURE__ */ getDefaultExportFromCjs(repeatExports);
function digitCount(numeric) {
  if (numeric.isZero()) {
    return 1;
  }
  return Math.floor(Math.log10(numeric.abs().toNumber()) + 1);
}
function getAbsolutePrecision(numeric, { precision, significant }) {
  if (significant && precision !== null && precision > 0) {
    return precision - digitCount(numeric);
  }
  return precision;
}
function roundNumber(numeric, options) {
  const precision = getAbsolutePrecision(numeric, options);
  if (precision === null) {
    return numeric.toString();
  }
  const roundMode = expandRoundMode(options.roundMode);
  if (precision >= 0) {
    return numeric.toFixed(precision, roundMode);
  }
  const rounder = Math.pow(10, Math.abs(precision));
  numeric = new BigNumber(numeric.div(rounder).toFixed(0, roundMode)).times(rounder);
  return numeric.toString();
}
function replaceInFormat(format, { formattedNumber, unit }) {
  return format.replace("%n", formattedNumber).replace("%u", unit);
}
function computeSignificand({ significand, whole, precision }) {
  if (whole === "0" || precision === null) {
    return significand;
  }
  const limit = Math.max(0, precision - whole.length);
  return (significand !== null && significand !== void 0 ? significand : "").substr(0, limit);
}
function formatNumber(input, options) {
  var _a, _b, _c;
  const originalNumber = new BigNumber(input);
  if (options.raise && !originalNumber.isFinite()) {
    throw new Error(`"${input}" is not a valid numeric value`);
  }
  const roundedNumber = roundNumber(originalNumber, options);
  const numeric = new BigNumber(roundedNumber);
  const isNegative = numeric.lt(0);
  const isZero = numeric.isZero();
  let [whole, significand] = roundedNumber.split(".");
  const buffer = [];
  let formattedNumber;
  const positiveFormat = (_a = options.format) !== null && _a !== void 0 ? _a : "%n";
  const negativeFormat = (_b = options.negativeFormat) !== null && _b !== void 0 ? _b : `-${positiveFormat}`;
  const format = isNegative && !isZero ? negativeFormat : positiveFormat;
  whole = whole.replace("-", "");
  while (whole.length > 0) {
    buffer.unshift(whole.substr(Math.max(0, whole.length - 3), 3));
    whole = whole.substr(0, whole.length - 3);
  }
  whole = buffer.join("");
  formattedNumber = buffer.join(options.delimiter);
  if (options.significant) {
    significand = computeSignificand({
      whole,
      significand,
      precision: options.precision
    });
  } else {
    significand = significand !== null && significand !== void 0 ? significand : repeat("0", (_c = options.precision) !== null && _c !== void 0 ? _c : 0);
  }
  if (options.stripInsignificantZeros && significand) {
    significand = significand.replace(/0+$/, "");
  }
  if (originalNumber.isNaN()) {
    formattedNumber = input.toString();
  }
  if (significand && originalNumber.isFinite()) {
    formattedNumber += (options.separator || ".") + significand;
  }
  return replaceInFormat(format, {
    formattedNumber,
    unit: options.unit
  });
}
function getFullScope(i18n2, scope, options) {
  let result = "";
  if (scope instanceof String || typeof scope === "string") {
    result = scope;
  }
  if (scope instanceof Array) {
    result = scope.join(i18n2.defaultSeparator);
  }
  if (options.scope) {
    result = [options.scope, result].join(i18n2.defaultSeparator);
  }
  return result;
}
function inferType(instance) {
  var _a, _b;
  if (instance === null) {
    return "null";
  }
  const type = typeof instance;
  if (type !== "object") {
    return type;
  }
  return ((_b = (_a = instance === null || instance === void 0 ? void 0 : instance.constructor) === null || _a === void 0 ? void 0 : _a.name) === null || _b === void 0 ? void 0 : _b.toLowerCase()) || "object";
}
function interpolate(i18n2, message, options) {
  options = Object.keys(options).reduce((buffer, key) => {
    buffer[i18n2.transformKey(key)] = options[key];
    return buffer;
  }, {});
  const matches = message.match(i18n2.placeholder);
  if (!matches) {
    return message;
  }
  while (matches.length) {
    let value;
    const placeholder = matches.shift();
    const name = placeholder.replace(i18n2.placeholder, "$1");
    if (isSet(options[name])) {
      value = options[name].toString().replace(/\$/gm, "_#$#_");
    } else if (name in options) {
      value = i18n2.nullPlaceholder(i18n2, placeholder, message, options);
    } else {
      value = i18n2.missingPlaceholder(i18n2, placeholder, message, options);
    }
    const regex = new RegExp(placeholder.replace(/\{/gm, "\\{").replace(/\}/gm, "\\}"), "g");
    message = message.replace(regex, value);
  }
  return message.replace(/_#\$#_/g, "$");
}
function lookup(i18n2, scope, options = {}) {
  options = Object.assign({}, options);
  const locale = "locale" in options ? options.locale : i18n2.locale;
  const localeType = inferType(locale);
  const locales = i18n2.locales.get(localeType === "string" ? locale : typeof locale).slice();
  const keys = getFullScope(i18n2, scope, options).split(i18n2.defaultSeparator).map((component) => i18n2.transformKey(component));
  const entries = locales.map((locale2) => keys.reduce((path, key) => path && path[key], i18n2.translations[locale2]));
  entries.push(options.defaultValue);
  return entries.find((entry) => isSet(entry));
}
function numberToDelimited(input, options) {
  const numeric = new BigNumber(input);
  if (!numeric.isFinite()) {
    return input.toString();
  }
  if (!options.delimiterPattern.global) {
    throw new Error(`options.delimiterPattern must be a global regular expression; received ${options.delimiterPattern}`);
  }
  let [left, right] = numeric.toString().split(".");
  left = left.replace(options.delimiterPattern, (digitToDelimiter) => `${digitToDelimiter}${options.delimiter}`);
  return [left, right].filter(Boolean).join(options.separator);
}
var _arrayPush;
var hasRequired_arrayPush;
function require_arrayPush() {
  if (hasRequired_arrayPush) return _arrayPush;
  hasRequired_arrayPush = 1;
  function arrayPush(array, values) {
    var index = -1, length = values.length, offset = array.length;
    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }
  _arrayPush = arrayPush;
  return _arrayPush;
}
var _isFlattenable;
var hasRequired_isFlattenable;
function require_isFlattenable() {
  if (hasRequired_isFlattenable) return _isFlattenable;
  hasRequired_isFlattenable = 1;
  var Symbol2 = require_Symbol(), isArguments = requireIsArguments(), isArray = requireIsArray();
  var spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : void 0;
  function isFlattenable(value) {
    return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
  }
  _isFlattenable = isFlattenable;
  return _isFlattenable;
}
var _baseFlatten;
var hasRequired_baseFlatten;
function require_baseFlatten() {
  if (hasRequired_baseFlatten) return _baseFlatten;
  hasRequired_baseFlatten = 1;
  var arrayPush = require_arrayPush(), isFlattenable = require_isFlattenable();
  function baseFlatten(array, depth, predicate, isStrict, result) {
    var index = -1, length = array.length;
    predicate || (predicate = isFlattenable);
    result || (result = []);
    while (++index < length) {
      var value = array[index];
      if (depth > 0 && predicate(value)) {
        if (depth > 1) {
          baseFlatten(value, depth - 1, predicate, isStrict, result);
        } else {
          arrayPush(result, value);
        }
      } else if (!isStrict) {
        result[result.length] = value;
      }
    }
    return result;
  }
  _baseFlatten = baseFlatten;
  return _baseFlatten;
}
var _arraySome;
var hasRequired_arraySome;
function require_arraySome() {
  if (hasRequired_arraySome) return _arraySome;
  hasRequired_arraySome = 1;
  function arraySome(array, predicate) {
    var index = -1, length = array == null ? 0 : array.length;
    while (++index < length) {
      if (predicate(array[index], index, array)) {
        return true;
      }
    }
    return false;
  }
  _arraySome = arraySome;
  return _arraySome;
}
var _equalArrays;
var hasRequired_equalArrays;
function require_equalArrays() {
  if (hasRequired_equalArrays) return _equalArrays;
  hasRequired_equalArrays = 1;
  var SetCache = require_SetCache(), arraySome = require_arraySome(), cacheHas = require_cacheHas();
  var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
  function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
      return false;
    }
    var arrStacked = stack.get(array);
    var othStacked = stack.get(other);
    if (arrStacked && othStacked) {
      return arrStacked == other && othStacked == array;
    }
    var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : void 0;
    stack.set(array, other);
    stack.set(other, array);
    while (++index < arrLength) {
      var arrValue = array[index], othValue = other[index];
      if (customizer) {
        var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
      }
      if (compared !== void 0) {
        if (compared) {
          continue;
        }
        result = false;
        break;
      }
      if (seen) {
        if (!arraySome(other, function(othValue2, othIndex) {
          if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
            return seen.push(othIndex);
          }
        })) {
          result = false;
          break;
        }
      } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
        result = false;
        break;
      }
    }
    stack["delete"](array);
    stack["delete"](other);
    return result;
  }
  _equalArrays = equalArrays;
  return _equalArrays;
}
var _mapToArray;
var hasRequired_mapToArray;
function require_mapToArray() {
  if (hasRequired_mapToArray) return _mapToArray;
  hasRequired_mapToArray = 1;
  function mapToArray(map) {
    var index = -1, result = Array(map.size);
    map.forEach(function(value, key) {
      result[++index] = [key, value];
    });
    return result;
  }
  _mapToArray = mapToArray;
  return _mapToArray;
}
var _equalByTag;
var hasRequired_equalByTag;
function require_equalByTag() {
  if (hasRequired_equalByTag) return _equalByTag;
  hasRequired_equalByTag = 1;
  var Symbol2 = require_Symbol(), Uint8Array = require_Uint8Array(), eq = requireEq(), equalArrays = require_equalArrays(), mapToArray = require_mapToArray(), setToArray = require_setToArray();
  var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
  var boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", mapTag = "[object Map]", numberTag = "[object Number]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]";
  var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]";
  var symbolProto = Symbol2 ? Symbol2.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
  function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
    switch (tag) {
      case dataViewTag:
        if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
          return false;
        }
        object = object.buffer;
        other = other.buffer;
      case arrayBufferTag:
        if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
          return false;
        }
        return true;
      case boolTag:
      case dateTag:
      case numberTag:
        return eq(+object, +other);
      case errorTag:
        return object.name == other.name && object.message == other.message;
      case regexpTag:
      case stringTag:
        return object == other + "";
      case mapTag:
        var convert = mapToArray;
      case setTag:
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
        convert || (convert = setToArray);
        if (object.size != other.size && !isPartial) {
          return false;
        }
        var stacked = stack.get(object);
        if (stacked) {
          return stacked == other;
        }
        bitmask |= COMPARE_UNORDERED_FLAG;
        stack.set(object, other);
        var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
        stack["delete"](object);
        return result;
      case symbolTag:
        if (symbolValueOf) {
          return symbolValueOf.call(object) == symbolValueOf.call(other);
        }
    }
    return false;
  }
  _equalByTag = equalByTag;
  return _equalByTag;
}
var _baseGetAllKeys;
var hasRequired_baseGetAllKeys;
function require_baseGetAllKeys() {
  if (hasRequired_baseGetAllKeys) return _baseGetAllKeys;
  hasRequired_baseGetAllKeys = 1;
  var arrayPush = require_arrayPush(), isArray = requireIsArray();
  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
  }
  _baseGetAllKeys = baseGetAllKeys;
  return _baseGetAllKeys;
}
var _arrayFilter;
var hasRequired_arrayFilter;
function require_arrayFilter() {
  if (hasRequired_arrayFilter) return _arrayFilter;
  hasRequired_arrayFilter = 1;
  function arrayFilter(array, predicate) {
    var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
    while (++index < length) {
      var value = array[index];
      if (predicate(value, index, array)) {
        result[resIndex++] = value;
      }
    }
    return result;
  }
  _arrayFilter = arrayFilter;
  return _arrayFilter;
}
var stubArray_1;
var hasRequiredStubArray;
function requireStubArray() {
  if (hasRequiredStubArray) return stubArray_1;
  hasRequiredStubArray = 1;
  function stubArray() {
    return [];
  }
  stubArray_1 = stubArray;
  return stubArray_1;
}
var _getSymbols;
var hasRequired_getSymbols;
function require_getSymbols() {
  if (hasRequired_getSymbols) return _getSymbols;
  hasRequired_getSymbols = 1;
  var arrayFilter = require_arrayFilter(), stubArray = requireStubArray();
  var objectProto = Object.prototype;
  var propertyIsEnumerable = objectProto.propertyIsEnumerable;
  var nativeGetSymbols = Object.getOwnPropertySymbols;
  var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
    if (object == null) {
      return [];
    }
    object = Object(object);
    return arrayFilter(nativeGetSymbols(object), function(symbol) {
      return propertyIsEnumerable.call(object, symbol);
    });
  };
  _getSymbols = getSymbols;
  return _getSymbols;
}
var _nativeKeys;
var hasRequired_nativeKeys;
function require_nativeKeys() {
  if (hasRequired_nativeKeys) return _nativeKeys;
  hasRequired_nativeKeys = 1;
  var overArg = require_overArg();
  var nativeKeys = overArg(Object.keys, Object);
  _nativeKeys = nativeKeys;
  return _nativeKeys;
}
var _baseKeys;
var hasRequired_baseKeys;
function require_baseKeys() {
  if (hasRequired_baseKeys) return _baseKeys;
  hasRequired_baseKeys = 1;
  var isPrototype2 = require_isPrototype(), nativeKeys = require_nativeKeys();
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  function baseKeys(object) {
    if (!isPrototype2(object)) {
      return nativeKeys(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty.call(object, key) && key != "constructor") {
        result.push(key);
      }
    }
    return result;
  }
  _baseKeys = baseKeys;
  return _baseKeys;
}
var keys_1;
var hasRequiredKeys;
function requireKeys() {
  if (hasRequiredKeys) return keys_1;
  hasRequiredKeys = 1;
  var arrayLikeKeys = require_arrayLikeKeys(), baseKeys = require_baseKeys(), isArrayLike = requireIsArrayLike();
  function keys(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
  }
  keys_1 = keys;
  return keys_1;
}
var _getAllKeys;
var hasRequired_getAllKeys;
function require_getAllKeys() {
  if (hasRequired_getAllKeys) return _getAllKeys;
  hasRequired_getAllKeys = 1;
  var baseGetAllKeys = require_baseGetAllKeys(), getSymbols = require_getSymbols(), keys = requireKeys();
  function getAllKeys(object) {
    return baseGetAllKeys(object, keys, getSymbols);
  }
  _getAllKeys = getAllKeys;
  return _getAllKeys;
}
var _equalObjects;
var hasRequired_equalObjects;
function require_equalObjects() {
  if (hasRequired_equalObjects) return _equalObjects;
  hasRequired_equalObjects = 1;
  var getAllKeys = require_getAllKeys();
  var COMPARE_PARTIAL_FLAG = 1;
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
    if (objLength != othLength && !isPartial) {
      return false;
    }
    var index = objLength;
    while (index--) {
      var key = objProps[index];
      if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
        return false;
      }
    }
    var objStacked = stack.get(object);
    var othStacked = stack.get(other);
    if (objStacked && othStacked) {
      return objStacked == other && othStacked == object;
    }
    var result = true;
    stack.set(object, other);
    stack.set(other, object);
    var skipCtor = isPartial;
    while (++index < objLength) {
      key = objProps[index];
      var objValue = object[key], othValue = other[key];
      if (customizer) {
        var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
      }
      if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
        result = false;
        break;
      }
      skipCtor || (skipCtor = key == "constructor");
    }
    if (result && !skipCtor) {
      var objCtor = object.constructor, othCtor = other.constructor;
      if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
        result = false;
      }
    }
    stack["delete"](object);
    stack["delete"](other);
    return result;
  }
  _equalObjects = equalObjects;
  return _equalObjects;
}
var _DataView;
var hasRequired_DataView;
function require_DataView() {
  if (hasRequired_DataView) return _DataView;
  hasRequired_DataView = 1;
  var getNative = require_getNative(), root = require_root();
  var DataView = getNative(root, "DataView");
  _DataView = DataView;
  return _DataView;
}
var _Promise;
var hasRequired_Promise;
function require_Promise() {
  if (hasRequired_Promise) return _Promise;
  hasRequired_Promise = 1;
  var getNative = require_getNative(), root = require_root();
  var Promise2 = getNative(root, "Promise");
  _Promise = Promise2;
  return _Promise;
}
var _WeakMap;
var hasRequired_WeakMap;
function require_WeakMap() {
  if (hasRequired_WeakMap) return _WeakMap;
  hasRequired_WeakMap = 1;
  var getNative = require_getNative(), root = require_root();
  var WeakMap = getNative(root, "WeakMap");
  _WeakMap = WeakMap;
  return _WeakMap;
}
var _getTag;
var hasRequired_getTag;
function require_getTag() {
  if (hasRequired_getTag) return _getTag;
  hasRequired_getTag = 1;
  var DataView = require_DataView(), Map = require_Map(), Promise2 = require_Promise(), Set = require_Set(), WeakMap = require_WeakMap(), baseGetTag = require_baseGetTag(), toSource = require_toSource();
  var mapTag = "[object Map]", objectTag = "[object Object]", promiseTag = "[object Promise]", setTag = "[object Set]", weakMapTag = "[object WeakMap]";
  var dataViewTag = "[object DataView]";
  var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set), weakMapCtorString = toSource(WeakMap);
  var getTag = baseGetTag;
  if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
    getTag = function(value) {
      var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString:
            return dataViewTag;
          case mapCtorString:
            return mapTag;
          case promiseCtorString:
            return promiseTag;
          case setCtorString:
            return setTag;
          case weakMapCtorString:
            return weakMapTag;
        }
      }
      return result;
    };
  }
  _getTag = getTag;
  return _getTag;
}
var _baseIsEqualDeep;
var hasRequired_baseIsEqualDeep;
function require_baseIsEqualDeep() {
  if (hasRequired_baseIsEqualDeep) return _baseIsEqualDeep;
  hasRequired_baseIsEqualDeep = 1;
  var Stack = require_Stack(), equalArrays = require_equalArrays(), equalByTag = require_equalByTag(), equalObjects = require_equalObjects(), getTag = require_getTag(), isArray = requireIsArray(), isBuffer2 = requireIsBuffer(), isTypedArray = requireIsTypedArray();
  var COMPARE_PARTIAL_FLAG = 1;
  var argsTag = "[object Arguments]", arrayTag = "[object Array]", objectTag = "[object Object]";
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
    var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
    objTag = objTag == argsTag ? objectTag : objTag;
    othTag = othTag == argsTag ? objectTag : othTag;
    var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
    if (isSameTag && isBuffer2(object)) {
      if (!isBuffer2(other)) {
        return false;
      }
      objIsArr = true;
      objIsObj = false;
    }
    if (isSameTag && !objIsObj) {
      stack || (stack = new Stack());
      return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
    }
    if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
      var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
      if (objIsWrapped || othIsWrapped) {
        var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
        stack || (stack = new Stack());
        return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
      }
    }
    if (!isSameTag) {
      return false;
    }
    stack || (stack = new Stack());
    return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
  }
  _baseIsEqualDeep = baseIsEqualDeep;
  return _baseIsEqualDeep;
}
var _baseIsEqual;
var hasRequired_baseIsEqual;
function require_baseIsEqual() {
  if (hasRequired_baseIsEqual) return _baseIsEqual;
  hasRequired_baseIsEqual = 1;
  var baseIsEqualDeep = require_baseIsEqualDeep(), isObjectLike = requireIsObjectLike();
  function baseIsEqual(value, other, bitmask, customizer, stack) {
    if (value === other) {
      return true;
    }
    if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
      return value !== value && other !== other;
    }
    return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
  }
  _baseIsEqual = baseIsEqual;
  return _baseIsEqual;
}
var _baseIsMatch;
var hasRequired_baseIsMatch;
function require_baseIsMatch() {
  if (hasRequired_baseIsMatch) return _baseIsMatch;
  hasRequired_baseIsMatch = 1;
  var Stack = require_Stack(), baseIsEqual = require_baseIsEqual();
  var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
  function baseIsMatch(object, source, matchData, customizer) {
    var index = matchData.length, length = index, noCustomizer = !customizer;
    if (object == null) {
      return !length;
    }
    object = Object(object);
    while (index--) {
      var data = matchData[index];
      if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
        return false;
      }
    }
    while (++index < length) {
      data = matchData[index];
      var key = data[0], objValue = object[key], srcValue = data[1];
      if (noCustomizer && data[2]) {
        if (objValue === void 0 && !(key in object)) {
          return false;
        }
      } else {
        var stack = new Stack();
        if (customizer) {
          var result = customizer(objValue, srcValue, key, object, source, stack);
        }
        if (!(result === void 0 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result)) {
          return false;
        }
      }
    }
    return true;
  }
  _baseIsMatch = baseIsMatch;
  return _baseIsMatch;
}
var _isStrictComparable;
var hasRequired_isStrictComparable;
function require_isStrictComparable() {
  if (hasRequired_isStrictComparable) return _isStrictComparable;
  hasRequired_isStrictComparable = 1;
  var isObject = requireIsObject();
  function isStrictComparable(value) {
    return value === value && !isObject(value);
  }
  _isStrictComparable = isStrictComparable;
  return _isStrictComparable;
}
var _getMatchData;
var hasRequired_getMatchData;
function require_getMatchData() {
  if (hasRequired_getMatchData) return _getMatchData;
  hasRequired_getMatchData = 1;
  var isStrictComparable = require_isStrictComparable(), keys = requireKeys();
  function getMatchData(object) {
    var result = keys(object), length = result.length;
    while (length--) {
      var key = result[length], value = object[key];
      result[length] = [key, value, isStrictComparable(value)];
    }
    return result;
  }
  _getMatchData = getMatchData;
  return _getMatchData;
}
var _matchesStrictComparable;
var hasRequired_matchesStrictComparable;
function require_matchesStrictComparable() {
  if (hasRequired_matchesStrictComparable) return _matchesStrictComparable;
  hasRequired_matchesStrictComparable = 1;
  function matchesStrictComparable(key, srcValue) {
    return function(object) {
      if (object == null) {
        return false;
      }
      return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
    };
  }
  _matchesStrictComparable = matchesStrictComparable;
  return _matchesStrictComparable;
}
var _baseMatches;
var hasRequired_baseMatches;
function require_baseMatches() {
  if (hasRequired_baseMatches) return _baseMatches;
  hasRequired_baseMatches = 1;
  var baseIsMatch = require_baseIsMatch(), getMatchData = require_getMatchData(), matchesStrictComparable = require_matchesStrictComparable();
  function baseMatches(source) {
    var matchData = getMatchData(source);
    if (matchData.length == 1 && matchData[0][2]) {
      return matchesStrictComparable(matchData[0][0], matchData[0][1]);
    }
    return function(object) {
      return object === source || baseIsMatch(object, source, matchData);
    };
  }
  _baseMatches = baseMatches;
  return _baseMatches;
}
var _baseHasIn;
var hasRequired_baseHasIn;
function require_baseHasIn() {
  if (hasRequired_baseHasIn) return _baseHasIn;
  hasRequired_baseHasIn = 1;
  function baseHasIn(object, key) {
    return object != null && key in Object(object);
  }
  _baseHasIn = baseHasIn;
  return _baseHasIn;
}
var hasIn_1;
var hasRequiredHasIn;
function requireHasIn() {
  if (hasRequiredHasIn) return hasIn_1;
  hasRequiredHasIn = 1;
  var baseHasIn = require_baseHasIn(), hasPath = require_hasPath();
  function hasIn(object, path) {
    return object != null && hasPath(object, path, baseHasIn);
  }
  hasIn_1 = hasIn;
  return hasIn_1;
}
var _baseMatchesProperty;
var hasRequired_baseMatchesProperty;
function require_baseMatchesProperty() {
  if (hasRequired_baseMatchesProperty) return _baseMatchesProperty;
  hasRequired_baseMatchesProperty = 1;
  var baseIsEqual = require_baseIsEqual(), get2 = requireGet(), hasIn = requireHasIn(), isKey = require_isKey(), isStrictComparable = require_isStrictComparable(), matchesStrictComparable = require_matchesStrictComparable(), toKey = require_toKey();
  var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
  function baseMatchesProperty(path, srcValue) {
    if (isKey(path) && isStrictComparable(srcValue)) {
      return matchesStrictComparable(toKey(path), srcValue);
    }
    return function(object) {
      var objValue = get2(object, path);
      return objValue === void 0 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
    };
  }
  _baseMatchesProperty = baseMatchesProperty;
  return _baseMatchesProperty;
}
var _baseProperty;
var hasRequired_baseProperty;
function require_baseProperty() {
  if (hasRequired_baseProperty) return _baseProperty;
  hasRequired_baseProperty = 1;
  function baseProperty(key) {
    return function(object) {
      return object == null ? void 0 : object[key];
    };
  }
  _baseProperty = baseProperty;
  return _baseProperty;
}
var _basePropertyDeep;
var hasRequired_basePropertyDeep;
function require_basePropertyDeep() {
  if (hasRequired_basePropertyDeep) return _basePropertyDeep;
  hasRequired_basePropertyDeep = 1;
  var baseGet = require_baseGet();
  function basePropertyDeep(path) {
    return function(object) {
      return baseGet(object, path);
    };
  }
  _basePropertyDeep = basePropertyDeep;
  return _basePropertyDeep;
}
var property_1;
var hasRequiredProperty;
function requireProperty() {
  if (hasRequiredProperty) return property_1;
  hasRequiredProperty = 1;
  var baseProperty = require_baseProperty(), basePropertyDeep = require_basePropertyDeep(), isKey = require_isKey(), toKey = require_toKey();
  function property(path) {
    return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
  }
  property_1 = property;
  return property_1;
}
var _baseIteratee;
var hasRequired_baseIteratee;
function require_baseIteratee() {
  if (hasRequired_baseIteratee) return _baseIteratee;
  hasRequired_baseIteratee = 1;
  var baseMatches = require_baseMatches(), baseMatchesProperty = require_baseMatchesProperty(), identity = requireIdentity(), isArray = requireIsArray(), property = requireProperty();
  function baseIteratee(value) {
    if (typeof value == "function") {
      return value;
    }
    if (value == null) {
      return identity;
    }
    if (typeof value == "object") {
      return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
    }
    return property(value);
  }
  _baseIteratee = baseIteratee;
  return _baseIteratee;
}
var _baseForOwn;
var hasRequired_baseForOwn;
function require_baseForOwn() {
  if (hasRequired_baseForOwn) return _baseForOwn;
  hasRequired_baseForOwn = 1;
  var baseFor = require_baseFor(), keys = requireKeys();
  function baseForOwn(object, iteratee) {
    return object && baseFor(object, iteratee, keys);
  }
  _baseForOwn = baseForOwn;
  return _baseForOwn;
}
var _createBaseEach;
var hasRequired_createBaseEach;
function require_createBaseEach() {
  if (hasRequired_createBaseEach) return _createBaseEach;
  hasRequired_createBaseEach = 1;
  var isArrayLike = requireIsArrayLike();
  function createBaseEach(eachFunc, fromRight) {
    return function(collection, iteratee) {
      if (collection == null) {
        return collection;
      }
      if (!isArrayLike(collection)) {
        return eachFunc(collection, iteratee);
      }
      var length = collection.length, index = fromRight ? length : -1, iterable = Object(collection);
      while (fromRight ? index-- : ++index < length) {
        if (iteratee(iterable[index], index, iterable) === false) {
          break;
        }
      }
      return collection;
    };
  }
  _createBaseEach = createBaseEach;
  return _createBaseEach;
}
var _baseEach;
var hasRequired_baseEach;
function require_baseEach() {
  if (hasRequired_baseEach) return _baseEach;
  hasRequired_baseEach = 1;
  var baseForOwn = require_baseForOwn(), createBaseEach = require_createBaseEach();
  var baseEach = createBaseEach(baseForOwn);
  _baseEach = baseEach;
  return _baseEach;
}
var _baseMap;
var hasRequired_baseMap;
function require_baseMap() {
  if (hasRequired_baseMap) return _baseMap;
  hasRequired_baseMap = 1;
  var baseEach = require_baseEach(), isArrayLike = requireIsArrayLike();
  function baseMap(collection, iteratee) {
    var index = -1, result = isArrayLike(collection) ? Array(collection.length) : [];
    baseEach(collection, function(value, key, collection2) {
      result[++index] = iteratee(value, key, collection2);
    });
    return result;
  }
  _baseMap = baseMap;
  return _baseMap;
}
var _baseSortBy;
var hasRequired_baseSortBy;
function require_baseSortBy() {
  if (hasRequired_baseSortBy) return _baseSortBy;
  hasRequired_baseSortBy = 1;
  function baseSortBy(array, comparer) {
    var length = array.length;
    array.sort(comparer);
    while (length--) {
      array[length] = array[length].value;
    }
    return array;
  }
  _baseSortBy = baseSortBy;
  return _baseSortBy;
}
var _compareAscending;
var hasRequired_compareAscending;
function require_compareAscending() {
  if (hasRequired_compareAscending) return _compareAscending;
  hasRequired_compareAscending = 1;
  var isSymbol = requireIsSymbol();
  function compareAscending(value, other) {
    if (value !== other) {
      var valIsDefined = value !== void 0, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
      var othIsDefined = other !== void 0, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
      if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
        return 1;
      }
      if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
        return -1;
      }
    }
    return 0;
  }
  _compareAscending = compareAscending;
  return _compareAscending;
}
var _compareMultiple;
var hasRequired_compareMultiple;
function require_compareMultiple() {
  if (hasRequired_compareMultiple) return _compareMultiple;
  hasRequired_compareMultiple = 1;
  var compareAscending = require_compareAscending();
  function compareMultiple(object, other, orders) {
    var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
    while (++index < length) {
      var result = compareAscending(objCriteria[index], othCriteria[index]);
      if (result) {
        if (index >= ordersLength) {
          return result;
        }
        var order = orders[index];
        return result * (order == "desc" ? -1 : 1);
      }
    }
    return object.index - other.index;
  }
  _compareMultiple = compareMultiple;
  return _compareMultiple;
}
var _baseOrderBy;
var hasRequired_baseOrderBy;
function require_baseOrderBy() {
  if (hasRequired_baseOrderBy) return _baseOrderBy;
  hasRequired_baseOrderBy = 1;
  var arrayMap = require_arrayMap(), baseGet = require_baseGet(), baseIteratee = require_baseIteratee(), baseMap = require_baseMap(), baseSortBy = require_baseSortBy(), baseUnary = require_baseUnary(), compareMultiple = require_compareMultiple(), identity = requireIdentity(), isArray = requireIsArray();
  function baseOrderBy(collection, iteratees, orders) {
    if (iteratees.length) {
      iteratees = arrayMap(iteratees, function(iteratee) {
        if (isArray(iteratee)) {
          return function(value) {
            return baseGet(value, iteratee.length === 1 ? iteratee[0] : iteratee);
          };
        }
        return iteratee;
      });
    } else {
      iteratees = [identity];
    }
    var index = -1;
    iteratees = arrayMap(iteratees, baseUnary(baseIteratee));
    var result = baseMap(collection, function(value, key, collection2) {
      var criteria = arrayMap(iteratees, function(iteratee) {
        return iteratee(value);
      });
      return { "criteria": criteria, "index": ++index, "value": value };
    });
    return baseSortBy(result, function(object, other) {
      return compareMultiple(object, other, orders);
    });
  }
  _baseOrderBy = baseOrderBy;
  return _baseOrderBy;
}
var sortBy_1;
var hasRequiredSortBy;
function requireSortBy() {
  if (hasRequiredSortBy) return sortBy_1;
  hasRequiredSortBy = 1;
  var baseFlatten = require_baseFlatten(), baseOrderBy = require_baseOrderBy(), baseRest = require_baseRest(), isIterateeCall = require_isIterateeCall();
  var sortBy2 = baseRest(function(collection, iteratees) {
    if (collection == null) {
      return [];
    }
    var length = iteratees.length;
    if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
      iteratees = [];
    } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
      iteratees = [iteratees[0]];
    }
    return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
  });
  sortBy_1 = sortBy2;
  return sortBy_1;
}
var sortByExports = requireSortBy();
const sortBy = /* @__PURE__ */ getDefaultExportFromCjs(sortByExports);
var _baseZipObject;
var hasRequired_baseZipObject;
function require_baseZipObject() {
  if (hasRequired_baseZipObject) return _baseZipObject;
  hasRequired_baseZipObject = 1;
  function baseZipObject(props, values, assignFunc) {
    var index = -1, length = props.length, valsLength = values.length, result = {};
    while (++index < length) {
      var value = index < valsLength ? values[index] : void 0;
      assignFunc(result, props[index], value);
    }
    return result;
  }
  _baseZipObject = baseZipObject;
  return _baseZipObject;
}
var zipObject_1;
var hasRequiredZipObject;
function requireZipObject() {
  if (hasRequiredZipObject) return zipObject_1;
  hasRequiredZipObject = 1;
  var assignValue = require_assignValue(), baseZipObject = require_baseZipObject();
  function zipObject2(props, values) {
    return baseZipObject(props || [], values || [], assignValue);
  }
  zipObject_1 = zipObject2;
  return zipObject_1;
}
var zipObjectExports = requireZipObject();
const zipObject = /* @__PURE__ */ getDefaultExportFromCjs(zipObjectExports);
const DECIMAL_UNITS = {
  "0": "unit",
  "1": "ten",
  "2": "hundred",
  "3": "thousand",
  "6": "million",
  "9": "billion",
  "12": "trillion",
  "15": "quadrillion",
  "-1": "deci",
  "-2": "centi",
  "-3": "mili",
  "-6": "micro",
  "-9": "nano",
  "-12": "pico",
  "-15": "femto"
};
const INVERTED_DECIMAL_UNITS = zipObject(Object.values(DECIMAL_UNITS), Object.keys(DECIMAL_UNITS).map((key) => parseInt(key, 10)));
function numberToHuman(i18n2, input, options) {
  const roundOptions = {
    roundMode: options.roundMode,
    precision: options.precision,
    significant: options.significant
  };
  let units;
  if (inferType(options.units) === "string") {
    const scope = options.units;
    units = lookup(i18n2, scope);
    if (!units) {
      throw new Error(`The scope "${i18n2.locale}${i18n2.defaultSeparator}${getFullScope(i18n2, scope, {})}" couldn't be found`);
    }
  } else {
    units = options.units;
  }
  let formattedNumber = roundNumber(new BigNumber(input), roundOptions);
  const unitExponents = (units2) => sortBy(Object.keys(units2).map((name) => INVERTED_DECIMAL_UNITS[name]), (numeric) => numeric * -1);
  const calculateExponent = (num, units2) => {
    const exponent2 = num.isZero() ? 0 : Math.floor(Math.log10(num.abs().toNumber()));
    return unitExponents(units2).find((exp) => exponent2 >= exp) || 0;
  };
  const determineUnit = (units2, exponent2) => {
    const expName = DECIMAL_UNITS[exponent2.toString()];
    return units2[expName] || "";
  };
  const exponent = calculateExponent(new BigNumber(formattedNumber), units);
  const unit = determineUnit(units, exponent);
  formattedNumber = roundNumber(new BigNumber(formattedNumber).div(Math.pow(10, exponent)), roundOptions);
  if (options.stripInsignificantZeros) {
    let [whole, significand] = formattedNumber.split(".");
    significand = (significand || "").replace(/0+$/, "");
    formattedNumber = whole;
    if (significand) {
      formattedNumber += `${options.separator}${significand}`;
    }
  }
  return options.format.replace("%n", formattedNumber || "0").replace("%u", unit).trim();
}
const STORAGE_UNITS = ["byte", "kb", "mb", "gb", "tb", "pb", "eb"];
function numberToHumanSize(i18n2, input, options) {
  const roundMode = expandRoundMode(options.roundMode);
  const base = 1024;
  const num = new BigNumber(input).abs();
  const smallerThanBase = num.lt(base);
  let numberToBeFormatted;
  const computeExponent = (numeric, units) => {
    const max = units.length - 1;
    const exp = new BigNumber(Math.log(numeric.toNumber())).div(Math.log(base)).integerValue(BigNumber.ROUND_DOWN).toNumber();
    return Math.min(max, exp);
  };
  const storageUnitKey = (units) => {
    const keyEnd = smallerThanBase ? "byte" : units[exponent];
    return `number.human.storage_units.units.${keyEnd}`;
  };
  const exponent = computeExponent(num, STORAGE_UNITS);
  if (smallerThanBase) {
    numberToBeFormatted = num.integerValue();
  } else {
    numberToBeFormatted = new BigNumber(roundNumber(num.div(Math.pow(base, exponent)), {
      significant: options.significant,
      precision: options.precision,
      roundMode: options.roundMode
    }));
  }
  const format = i18n2.translate("number.human.storage_units.format", {
    defaultValue: "%n %u"
  });
  const unit = i18n2.translate(storageUnitKey(STORAGE_UNITS), {
    count: num.integerValue().toNumber()
  });
  let formattedNumber = numberToBeFormatted.toFixed(options.precision, roundMode);
  if (options.stripInsignificantZeros) {
    formattedNumber = formattedNumber.replace(/(\..*?)0+$/, "$1").replace(/\.$/, "");
  }
  return format.replace("%n", formattedNumber).replace("%u", unit);
}
function parseDate(input) {
  if (input instanceof Date) {
    return input;
  }
  if (typeof input === "number") {
    const date2 = /* @__PURE__ */ new Date();
    date2.setTime(input);
    return date2;
  }
  const matches = new String(input).match(/(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}):(\d{2})(?:[.,](\d{1,3}))?)?(Z|\+00:?00)?/);
  if (matches) {
    const parts = matches.slice(1, 8).map((match) => parseInt(match, 10) || 0);
    parts[1] -= 1;
    const [year, month, day, hour, minute, second, milliseconds] = parts;
    const timezone = matches[8];
    if (timezone) {
      return new Date(Date.UTC(year, month, day, hour, minute, second, milliseconds));
    } else {
      return new Date(year, month, day, hour, minute, second, milliseconds);
    }
  }
  if (input.match(/([A-Z][a-z]{2}) ([A-Z][a-z]{2}) (\d+) (\d+:\d+:\d+) ([+-]\d+) (\d+)/)) {
    const date2 = /* @__PURE__ */ new Date();
    date2.setTime(Date.parse([RegExp.$1, RegExp.$2, RegExp.$3, RegExp.$6, RegExp.$4, RegExp.$5].join(" ")));
  }
  const date = /* @__PURE__ */ new Date();
  date.setTime(Date.parse(input));
  return date;
}
function pluralize({ i18n: i18n2, count, scope, options, baseScope }) {
  options = Object.assign({}, options);
  let translations;
  let message;
  if (typeof scope === "object" && scope) {
    translations = scope;
  } else {
    translations = lookup(i18n2, scope, options);
  }
  if (!translations) {
    return i18n2.missingTranslation.get(scope, options);
  }
  const pluralizer = i18n2.pluralization.get(options.locale);
  const keys = pluralizer(i18n2, count);
  const missingKeys = [];
  while (keys.length) {
    const key = keys.shift();
    if (isSet(translations[key])) {
      message = translations[key];
      break;
    }
    missingKeys.push(key);
  }
  if (!isSet(message)) {
    return i18n2.missingTranslation.get(baseScope.split(i18n2.defaultSeparator).concat([missingKeys[0]]), options);
  }
  options.count = count;
  return i18n2.interpolate(i18n2, message, options);
}
const DEFAULT_OPTIONS = {
  meridian: { am: "AM", pm: "PM" },
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],
  abbrDayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  monthNames: [
    null,
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  abbrMonthNames: [
    null,
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ]
};
function strftime(date, format, options = {}) {
  const { abbrDayNames, dayNames, abbrMonthNames, monthNames, meridian: AM_PM, utc } = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options);
  if (isNaN(date.getTime())) {
    throw new Error("strftime() requires a valid date object, but received an invalid date.");
  }
  const weekDay = utc ? date.getUTCDay() : date.getDay();
  const day = utc ? date.getUTCDate() : date.getDate();
  const year = utc ? date.getUTCFullYear() : date.getFullYear();
  const month = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
  const hour = utc ? date.getUTCHours() : date.getHours();
  let hour12 = hour;
  const meridian = hour > 11 ? "pm" : "am";
  const secs = utc ? date.getUTCSeconds() : date.getSeconds();
  const mins = utc ? date.getUTCMinutes() : date.getMinutes();
  const offset = utc ? 0 : date.getTimezoneOffset();
  const absOffsetHours = Math.floor(Math.abs(offset / 60));
  const absOffsetMinutes = Math.abs(offset) - absOffsetHours * 60;
  const timezoneoffset = (offset > 0 ? "-" : "+") + (absOffsetHours.toString().length < 2 ? "0" + absOffsetHours : absOffsetHours) + (absOffsetMinutes.toString().length < 2 ? "0" + absOffsetMinutes : absOffsetMinutes);
  if (hour12 > 12) {
    hour12 = hour12 - 12;
  } else if (hour12 === 0) {
    hour12 = 12;
  }
  format = format.replace("%a", abbrDayNames[weekDay]);
  format = format.replace("%A", dayNames[weekDay]);
  format = format.replace("%b", abbrMonthNames[month]);
  format = format.replace("%B", monthNames[month]);
  format = format.replace("%d", day.toString().padStart(2, "0"));
  format = format.replace("%e", day.toString());
  format = format.replace("%-d", day.toString());
  format = format.replace("%H", hour.toString().padStart(2, "0"));
  format = format.replace("%-H", hour.toString());
  format = format.replace("%k", hour.toString());
  format = format.replace("%I", hour12.toString().padStart(2, "0"));
  format = format.replace("%-I", hour12.toString());
  format = format.replace("%l", hour12.toString());
  format = format.replace("%m", month.toString().padStart(2, "0"));
  format = format.replace("%-m", month.toString());
  format = format.replace("%M", mins.toString().padStart(2, "0"));
  format = format.replace("%-M", mins.toString());
  format = format.replace("%p", AM_PM[meridian]);
  format = format.replace("%P", AM_PM[meridian].toLowerCase());
  format = format.replace("%S", secs.toString().padStart(2, "0"));
  format = format.replace("%-S", secs.toString());
  format = format.replace("%w", weekDay.toString());
  format = format.replace("%y", year.toString().padStart(2, "0").substr(-2));
  format = format.replace("%-y", year.toString().padStart(2, "0").substr(-2).replace(/^0+/, ""));
  format = format.replace("%Y", year.toString());
  format = format.replace(/%z/i, timezoneoffset);
  return format;
}
var _baseRange;
var hasRequired_baseRange;
function require_baseRange() {
  if (hasRequired_baseRange) return _baseRange;
  hasRequired_baseRange = 1;
  var nativeCeil = Math.ceil, nativeMax = Math.max;
  function baseRange(start, end, step, fromRight) {
    var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result = Array(length);
    while (length--) {
      result[fromRight ? length : ++index] = start;
      start += step;
    }
    return result;
  }
  _baseRange = baseRange;
  return _baseRange;
}
var _createRange;
var hasRequired_createRange;
function require_createRange() {
  if (hasRequired_createRange) return _createRange;
  hasRequired_createRange = 1;
  var baseRange = require_baseRange(), isIterateeCall = require_isIterateeCall(), toFinite = requireToFinite();
  function createRange(fromRight) {
    return function(start, end, step) {
      if (step && typeof step != "number" && isIterateeCall(start, end, step)) {
        end = step = void 0;
      }
      start = toFinite(start);
      if (end === void 0) {
        end = start;
        start = 0;
      } else {
        end = toFinite(end);
      }
      step = step === void 0 ? start < end ? 1 : -1 : toFinite(step);
      return baseRange(start, end, step, fromRight);
    };
  }
  _createRange = createRange;
  return _createRange;
}
var range_1;
var hasRequiredRange;
function requireRange() {
  if (hasRequiredRange) return range_1;
  hasRequiredRange = 1;
  var createRange = require_createRange();
  var range2 = createRange();
  range_1 = range2;
  return range_1;
}
var rangeExports = requireRange();
const range = /* @__PURE__ */ getDefaultExportFromCjs(rangeExports);
const within = (start, end, actual) => actual >= start && actual <= end;
function timeAgoInWords(i18n2, fromTime, toTime, options = {}) {
  const scope = options.scope || "datetime.distance_in_words";
  const t = (name, count = 0) => i18n2.t(name, { count, scope });
  fromTime = parseDate(fromTime);
  toTime = parseDate(toTime);
  let fromInSeconds = fromTime.getTime() / 1e3;
  let toInSeconds = toTime.getTime() / 1e3;
  if (fromInSeconds > toInSeconds) {
    [fromTime, toTime, fromInSeconds, toInSeconds] = [
      toTime,
      fromTime,
      toInSeconds,
      fromInSeconds
    ];
  }
  const distanceInSeconds = Math.round(toInSeconds - fromInSeconds);
  const distanceInMinutes = Math.round((toInSeconds - fromInSeconds) / 60);
  const distanceInHours = distanceInMinutes / 60;
  const distanceInDays = distanceInHours / 24;
  const distanceInHoursRounded = Math.round(distanceInMinutes / 60);
  const distanceInDaysRounded = Math.round(distanceInDays);
  const distanceInMonthsRounded = Math.round(distanceInDaysRounded / 30);
  if (within(0, 1, distanceInMinutes)) {
    if (!options.includeSeconds) {
      return distanceInMinutes === 0 ? t("less_than_x_minutes", 1) : t("x_minutes", distanceInMinutes);
    }
    if (within(0, 4, distanceInSeconds)) {
      return t("less_than_x_seconds", 5);
    }
    if (within(5, 9, distanceInSeconds)) {
      return t("less_than_x_seconds", 10);
    }
    if (within(10, 19, distanceInSeconds)) {
      return t("less_than_x_seconds", 20);
    }
    if (within(20, 39, distanceInSeconds)) {
      return t("half_a_minute");
    }
    if (within(40, 59, distanceInSeconds)) {
      return t("less_than_x_minutes", 1);
    }
    return t("x_minutes", 1);
  }
  if (within(2, 44, distanceInMinutes)) {
    return t("x_minutes", distanceInMinutes);
  }
  if (within(45, 89, distanceInMinutes)) {
    return t("about_x_hours", 1);
  }
  if (within(90, 1439, distanceInMinutes)) {
    return t("about_x_hours", distanceInHoursRounded);
  }
  if (within(1440, 2519, distanceInMinutes)) {
    return t("x_days", 1);
  }
  if (within(2520, 43199, distanceInMinutes)) {
    return t("x_days", distanceInDaysRounded);
  }
  if (within(43200, 86399, distanceInMinutes)) {
    return t("about_x_months", Math.round(distanceInMinutes / 43200));
  }
  if (within(86400, 525599, distanceInMinutes)) {
    return t("x_months", distanceInMonthsRounded);
  }
  let fromYear = fromTime.getFullYear();
  if (fromTime.getMonth() + 1 >= 3) {
    fromYear += 1;
  }
  let toYear = toTime.getFullYear();
  if (toTime.getMonth() + 1 < 3) {
    toYear -= 1;
  }
  const leapYears = fromYear > toYear ? 0 : range(fromYear, toYear).filter((year) => new Date(year, 1, 29).getMonth() == 1).length;
  const minutesInYear = 525600;
  const minuteOffsetForLeapYear = leapYears * 1440;
  const minutesWithOffset = distanceInMinutes - minuteOffsetForLeapYear;
  const distanceInYears = Math.trunc(minutesWithOffset / minutesInYear);
  const diff = parseFloat((minutesWithOffset / minutesInYear - distanceInYears).toPrecision(3));
  if (diff < 0.25) {
    return t("about_x_years", distanceInYears);
  }
  if (diff < 0.75) {
    return t("over_x_years", distanceInYears);
  }
  return t("almost_x_years", distanceInYears + 1);
}
const guessStrategy = function(i18n2, scope) {
  if (scope instanceof Array) {
    scope = scope.join(i18n2.defaultSeparator);
  }
  const message = scope.split(i18n2.defaultSeparator).slice(-1)[0];
  return i18n2.missingTranslationPrefix + message.replace("_", " ").replace(/([a-z])([A-Z])/g, (_match, p1, p2) => `${p1} ${p2.toLowerCase()}`);
};
const messageStrategy = (i18n2, scope, options) => {
  const fullScope = getFullScope(i18n2, scope, options);
  const locale = "locale" in options ? options.locale : i18n2.locale;
  const localeType = inferType(locale);
  const fullScopeWithLocale = [
    localeType == "string" ? locale : localeType,
    fullScope
  ].join(i18n2.defaultSeparator);
  return `[missing "${fullScopeWithLocale}" translation]`;
};
const errorStrategy = (i18n2, scope, options) => {
  const fullScope = getFullScope(i18n2, scope, options);
  const fullScopeWithLocale = [i18n2.locale, fullScope].join(i18n2.defaultSeparator);
  throw new Error(`Missing translation: ${fullScopeWithLocale}`);
};
class MissingTranslation {
  constructor(i18n2) {
    this.i18n = i18n2;
    this.registry = {};
    this.register("guess", guessStrategy);
    this.register("message", messageStrategy);
    this.register("error", errorStrategy);
  }
  register(name, strategy) {
    this.registry[name] = strategy;
  }
  get(scope, options) {
    var _a;
    return this.registry[(_a = options.missingBehavior) !== null && _a !== void 0 ? _a : this.i18n.missingBehavior](this.i18n, scope, options);
  }
}
var __awaiter = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const DEFAULT_I18N_OPTIONS = {
  defaultLocale: "en",
  locale: "en",
  defaultSeparator: ".",
  placeholder: /(?:\{\{|%\{)(.*?)(?:\}\}?)/gm,
  enableFallback: false,
  missingBehavior: "message",
  missingTranslationPrefix: "",
  missingPlaceholder: (_i18n, placeholder) => `[missing "${placeholder}" value]`,
  nullPlaceholder: (i18n2, placeholder, message, options) => i18n2.missingPlaceholder(i18n2, placeholder, message, options),
  transformKey: (key) => key
};
class I18n {
  constructor(translations = {}, options = {}) {
    this._locale = DEFAULT_I18N_OPTIONS.locale;
    this._defaultLocale = DEFAULT_I18N_OPTIONS.defaultLocale;
    this._version = 0;
    this.onChangeHandlers = [];
    this.translations = {};
    this.t = this.translate;
    this.p = this.pluralize;
    this.l = this.localize;
    this.distanceOfTimeInWords = this.timeAgoInWords;
    const { locale, enableFallback, missingBehavior, missingTranslationPrefix, missingPlaceholder, nullPlaceholder, defaultLocale, defaultSeparator, placeholder, transformKey } = Object.assign(Object.assign({}, DEFAULT_I18N_OPTIONS), options);
    this.locale = locale;
    this.defaultLocale = defaultLocale;
    this.defaultSeparator = defaultSeparator;
    this.enableFallback = enableFallback;
    this.locale = locale;
    this.missingBehavior = missingBehavior;
    this.missingTranslationPrefix = missingTranslationPrefix;
    this.missingPlaceholder = missingPlaceholder;
    this.nullPlaceholder = nullPlaceholder;
    this.placeholder = placeholder;
    this.pluralization = new Pluralization(this);
    this.locales = new Locales(this);
    this.missingTranslation = new MissingTranslation(this);
    this.transformKey = transformKey;
    this.interpolate = interpolate;
    this.store(translations);
  }
  store(translations) {
    merge(this.translations, translations);
    this.hasChanged();
  }
  get locale() {
    return this._locale || this.defaultLocale || "en";
  }
  set locale(newLocale) {
    if (typeof newLocale !== "string") {
      throw new Error(`Expected newLocale to be a string; got ${inferType(newLocale)}`);
    }
    const changed = this._locale !== newLocale;
    this._locale = newLocale;
    if (changed) {
      this.hasChanged();
    }
  }
  get defaultLocale() {
    return this._defaultLocale || "en";
  }
  set defaultLocale(newLocale) {
    if (typeof newLocale !== "string") {
      throw new Error(`Expected newLocale to be a string; got ${inferType(newLocale)}`);
    }
    const changed = this._defaultLocale !== newLocale;
    this._defaultLocale = newLocale;
    if (changed) {
      this.hasChanged();
    }
  }
  translate(scope, options) {
    options = Object.assign({}, options);
    const translationOptions = createTranslationOptions(this, scope, options);
    let translation;
    const hasFoundTranslation = translationOptions.some((translationOption) => {
      if (isSet(translationOption.scope)) {
        translation = lookup(this, translationOption.scope, options);
      } else if (isSet(translationOption.message)) {
        translation = translationOption.message;
      }
      return translation !== void 0 && translation !== null;
    });
    if (!hasFoundTranslation) {
      return this.missingTranslation.get(scope, options);
    }
    if (typeof translation === "string") {
      translation = this.interpolate(this, translation, options);
    } else if (typeof translation === "object" && translation && isSet(options.count)) {
      translation = pluralize({
        i18n: this,
        count: options.count || 0,
        scope: translation,
        options,
        baseScope: getFullScope(this, scope, options)
      });
    }
    if (options && translation instanceof Array) {
      translation = translation.map((entry) => typeof entry === "string" ? interpolate(this, entry, options) : entry);
    }
    return translation;
  }
  pluralize(count, scope, options) {
    return pluralize({
      i18n: this,
      count,
      scope,
      options: Object.assign({}, options),
      baseScope: getFullScope(this, scope, options !== null && options !== void 0 ? options : {})
    });
  }
  localize(type, value, options) {
    options = Object.assign({}, options);
    if (value === void 0 || value === null) {
      return "";
    }
    switch (type) {
      case "currency":
        return this.numberToCurrency(value);
      case "number":
        return formatNumber(value, Object.assign({ delimiter: ",", precision: 3, separator: ".", significant: false, stripInsignificantZeros: false }, lookup(this, "number.format")));
      case "percentage":
        return this.numberToPercentage(value);
      default: {
        let localizedValue;
        if (type.match(/^(date|time)/)) {
          localizedValue = this.toTime(type, value);
        } else {
          localizedValue = value.toString();
        }
        return interpolate(this, localizedValue, options);
      }
    }
  }
  toTime(scope, input) {
    const date = parseDate(input);
    const format = lookup(this, scope);
    if (date.toString().match(/invalid/i)) {
      return date.toString();
    }
    if (!format) {
      return date.toString();
    }
    return this.strftime(date, format);
  }
  numberToCurrency(input, options = {}) {
    return formatNumber(input, Object.assign(Object.assign(Object.assign({ delimiter: ",", format: "%u%n", precision: 2, separator: ".", significant: false, stripInsignificantZeros: false, unit: "$" }, camelCaseKeys(this.get("number.format"))), camelCaseKeys(this.get("number.currency.format"))), options));
  }
  numberToPercentage(input, options = {}) {
    return formatNumber(input, Object.assign(Object.assign(Object.assign({ delimiter: "", format: "%n%", precision: 3, stripInsignificantZeros: false, separator: ".", significant: false }, camelCaseKeys(this.get("number.format"))), camelCaseKeys(this.get("number.percentage.format"))), options));
  }
  numberToHumanSize(input, options = {}) {
    return numberToHumanSize(this, input, Object.assign(Object.assign(Object.assign({ delimiter: "", precision: 3, significant: true, stripInsignificantZeros: true, units: {
      billion: "Billion",
      million: "Million",
      quadrillion: "Quadrillion",
      thousand: "Thousand",
      trillion: "Trillion",
      unit: ""
    } }, camelCaseKeys(this.get("number.human.format"))), camelCaseKeys(this.get("number.human.storage_units"))), options));
  }
  numberToHuman(input, options = {}) {
    return numberToHuman(this, input, Object.assign(Object.assign(Object.assign({ delimiter: "", separator: ".", precision: 3, significant: true, stripInsignificantZeros: true, format: "%n %u", roundMode: "default", units: {
      billion: "Billion",
      million: "Million",
      quadrillion: "Quadrillion",
      thousand: "Thousand",
      trillion: "Trillion",
      unit: ""
    } }, camelCaseKeys(this.get("number.human.format"))), camelCaseKeys(this.get("number.human.decimal_units"))), options));
  }
  numberToRounded(input, options) {
    return formatNumber(input, Object.assign({ unit: "", precision: 3, significant: false, separator: ".", delimiter: "", stripInsignificantZeros: false }, options));
  }
  numberToDelimited(input, options = {}) {
    return numberToDelimited(input, Object.assign({ delimiterPattern: /(\d)(?=(\d\d\d)+(?!\d))/g, delimiter: ",", separator: "." }, options));
  }
  withLocale(locale, callback) {
    return __awaiter(this, void 0, void 0, function* () {
      const originalLocale = this.locale;
      try {
        this.locale = locale;
        yield callback();
      } finally {
        this.locale = originalLocale;
      }
    });
  }
  strftime(date, format, options = {}) {
    return strftime(date, format, Object.assign(Object.assign(Object.assign({}, camelCaseKeys(lookup(this, "date"))), { meridian: {
      am: lookup(this, "time.am") || "AM",
      pm: lookup(this, "time.pm") || "PM"
    } }), options));
  }
  update(path, override, options = { strict: false }) {
    if (options.strict && !has(this.translations, path)) {
      throw new Error(`The path "${path}" is not currently defined`);
    }
    const currentNode = get(this.translations, path);
    const currentType = inferType(currentNode);
    const overrideType = inferType(override);
    if (options.strict && currentType !== overrideType) {
      throw new Error(`The current type for "${path}" is "${currentType}", but you're trying to override it with "${overrideType}"`);
    }
    let newNode;
    if (overrideType === "object") {
      newNode = Object.assign(Object.assign({}, currentNode), override);
    } else {
      newNode = override;
    }
    const components = path.split(this.defaultSeparator);
    const prop = components.pop();
    let buffer = this.translations;
    for (const component of components) {
      if (!buffer[component]) {
        buffer[component] = {};
      }
      buffer = buffer[component];
    }
    buffer[prop] = newNode;
    this.hasChanged();
  }
  toSentence(items, options = {}) {
    const { wordsConnector, twoWordsConnector, lastWordConnector } = Object.assign(Object.assign({ wordsConnector: ", ", twoWordsConnector: " and ", lastWordConnector: ", and " }, camelCaseKeys(lookup(this, "support.array"))), options);
    const size = items.length;
    switch (size) {
      case 0:
        return "";
      case 1:
        return `${items[0]}`;
      case 2:
        return items.join(twoWordsConnector);
      default:
        return [
          items.slice(0, size - 1).join(wordsConnector),
          lastWordConnector,
          items[size - 1]
        ].join("");
    }
  }
  timeAgoInWords(fromTime, toTime, options = {}) {
    return timeAgoInWords(this, fromTime, toTime, options);
  }
  onChange(callback) {
    this.onChangeHandlers.push(callback);
    return () => {
      this.onChangeHandlers.splice(this.onChangeHandlers.indexOf(callback), 1);
    };
  }
  get version() {
    return this._version;
  }
  formatNumber(input, options = {}) {
    options = Object.assign(Object.assign({ delimiter: ",", precision: 3, separator: ".", unit: "", format: "%u%n", significant: false, stripInsignificantZeros: false }, camelCaseKeys(this.get("number.format"))), options);
    return formatNumber(input, options);
  }
  get(scope) {
    return lookup(this, scope);
  }
  runCallbacks() {
    this.onChangeHandlers.forEach((callback) => callback(this));
  }
  hasChanged() {
    this._version += 1;
    this.runCallbacks();
  }
}
const fr = { "panel": { "critical": "Points critiques", "nc": "Points non-conformes", "dev": "Problèmes techniques", "nth": "Nice to have", "man": "A vérifier manuellement", "none": "Pas de points remontés !", "papl": "Pour aller plus loin" }, "btn": { "show": "Afficher", "hide": "Masquer" }, "alert": { "hidden": "Element non visible actuellement, essayez de redimensionner votre fenêtre pour le faire apparaître" } };
const fr$1 = {
  fr
};
const en = { "panel": { "critical": "Critical points", "nc": "Non-conforming points", "dev": "Technical Issues", "nth": "Nice to have", "man": "To be verified manually", "none": "No points raised !", "papl": "To go further" }, "btn": { "show": "Show", "hide": "Hide" }, "alert": { "hidden": "This element is not currently visible; try resizing your window to make it appear" } };
const en$1 = {
  en
};
const i18n = new I18n({
  ...fr$1,
  ...en$1
});
i18n.defaultLocale = "fr";
i18n.locale = "fr";
const checkA11YPanel = document.createElement("div");
checkA11YPanel.setAttribute("id", "checkA11YPanel");
const panelActiveCN = "active";
const checkPanelActiveCN = "check-panel-active";
const checkPanelHiddenCN = "check-panel-hidden";
function createResultPanel() {
  const result = getResultContent();
  const thirdParty = getThirdPartyContent();
  setPanelContent(result, thirdParty);
  body.appendChild(checkA11YPanel);
  setEventOnFocusItems();
  window.scroll({ top: 0, left: 0, behavior: "smooth" });
}
function activateCheckA11YPanel() {
  const checkA11YPanelBtn = document.createElement("button");
  checkA11YPanelBtn.setAttribute("id", "checkA11YPanelBtn");
  checkA11YPanelBtn.setAttribute("title", `${i18n.t("btn.show")} Renowify`);
  checkA11YPanelBtn.setAttribute("class", "btn btn-icon-only");
  checkA11YPanelBtn.setAttribute("type", "button");
  checkA11YPanelBtn.innerHTML += `<span class="btn-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
       <path d="M17.5815,4.31594s-.08345-.04221-.11361-.04916c-.01933-.00445-.1007-.01398-.13452-.01562-1.00765-.04873-1.71397.34741-2.65795,1.20944l-1.49735,1.39803c-1.99276,2.11497-2.97409,3.36934-3.5014,4.04318-.13524.17285-.25714.32837-.33328.41466-.03996-.05619-.10193-.16998-.19604-.40076l-1.22314-2.73435-.04256-.11005c-.08282-.22123-.2082-.55598-.66773-.55598-.53192,0-.76097.12972-1.14984.37731-.21979.1358-.52067.32172-.52067.73404,0,.84553,1.21793,4.6287,1.63807,5.40821l.06805.12625c.10223.19313.2082.39295.40337.51455.18071.11379.32837.11379.94889.11379.27251,0,.58147,0,.87653-.12217.21341-.11382.52207-.41349.61561-.58782l3.48868-4.38893,2.87854-3.48407s.856-.9863,1.17797-1.27813c.08761-.0794.14853-.1775.14853-.29159,0-.13754-.077-.25771-.20616-.32085Z" fill="#00a811"/><path d="M12.82451,18.01997c-.2988.09989-.53162.16738-.75459.21832-.27191.06197-.57566.11148-.95471.15582-.22557.02606-.45258.03822-.67959.05095l-.27104.0165c-.86203-.0023-1.72206-.12916-2.55569-.37701-1.12034-.33445-2.14133-.88522-3.03436-1.6372-1.00799-.84783-1.7866-1.89869-2.31422-3.12296-.269-.62517-.46096-1.29089-.57101-1.97886-.11205-.70251-.14071-1.35026-.08743-1.98007.11061-1.30796.48876-2.52615,1.12408-3.62127.65761-1.1322,1.54539-2.07157,2.63968-2.79142.8484-.55859,1.7869-.95614,2.78908-1.18115.7575-.17081,1.51877-.24468,2.25772-.21689.75723.02753,1.50717.14974,2.22909.36372l.26319.07817.93125-1.30158-.4934-.1662C12.39161.20856,11.4048.03163,10.41014.00296c-.54265-.0162-1.08617.03678-1.59868.09181-.82442.08833-1.64388.30201-2.50531.65326-1.70873.69783-3.1412,1.79268-4.2575,3.25325-.82902,1.08413-1.41654,2.31448-1.74721,3.65719-.17867.72596-.27769,1.4878-.30144,2.37558l.03505.42569c.02432.31243.04894.62456.08947.93443.12538.95701.41032,1.9082.84726,2.82673.7462,1.57115,1.84309,2.88058,3.25993,3.89201,1.40902,1.00625,2.98946,1.61752,4.69758,1.81673.40133.0469.80414.07036,1.2049.07036.36425,0,.72709-.01937,1.08613-.05789.72539-.07848,1.46435-.24672,2.19635-.50009l.34-.1176-.92015-1.30845-.01201.004Z" fill="#00a811"/>
       </svg></span><span class="btn-text at">${i18n.t("btn.show")} Renowify</span>`;
  body.appendChild(checkA11YPanelBtn);
  checkA11YPanelBtn.addEventListener("click", () => openCheckA11YPanel());
  if (document.querySelector("#checkA11YPanel > .btn")) {
    document.querySelector("#checkA11YPanel > .btn").addEventListener("click", () => {
      closeCheckA11YPanel();
    });
  }
  openCheckA11YPanel();
  body.classList.add("panel-injected");
}
function openCheckA11YPanel() {
  checkA11YPanel.classList.add(panelActiveCN);
  body.classList.remove(checkPanelHiddenCN);
  body.classList.add(checkPanelActiveCN);
  if (document.querySelector("#checkA11YPanel > .btn")) {
    document.querySelector("#checkA11YPanel > .btn").focus();
  }
}
function closeCheckA11YPanel() {
  checkA11YPanel.classList.remove(panelActiveCN);
  body.classList.remove(checkPanelActiveCN);
  if (document.querySelector("#checkA11YPanelBtn")) {
    document.querySelector("#checkA11YPanelBtn").focus();
  }
  setTimeout(function() {
    body.classList.add(checkPanelHiddenCN);
  }, 2e3);
}
function getResultContent() {
  const data = [];
  console.log(Object.entries(results));
  for (const [key, value] of Object.entries(results)) {
    const values = value.join("");
    if (value.length > 0) {
      data.push(
        `<div class='frame'><h2 id='result_${key}'>${i18n.t("panel." + key)}</h2><ul>${values}</ul></div>`
      );
    }
  }
  if (data.length == 0) {
    return `<div class='frame'><p>${i18n.t("panel.none")}</p></div>`;
  } else {
    return data.join("");
  }
}
function getThirdPartyContent() {
  if (pageSettings.isPreview || filter.only_redactor) {
    return "";
  }
  const encodeURI = encodeURIComponent(currentUrl);
  const thirdParty = {
    w3c: {
      name: "Validator W3C",
      url: `https://validator.w3.org/nu/?doc=${encodeURI}`
    },
    wave: { name: "Wave", url: `https://wave.webaim.org/report#/${encodeURI}` },
    lighthouse: {
      name: "Lighthouse",
      url: `https://pagespeed.web.dev/analysis?url=${encodeURI}`
    }
  };
  let thirdPartyList = "";
  Object.entries(thirdParty).forEach(([key, value]) => {
    thirdPartyList += `<li id="result_${key}"><a href="${value.url}" target="_blank">${value.name}</a></li>`;
  });
  return `<details class="accordion frame"><summary class="accordion-summary">
           <h2 class="accordion-header">${i18n.t("panel.papl")}</h2>
           <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 11 17" fill="none" aria-hidden="true" focusable="false">
           <path d="M10 1L1 9L10 16" stroke="#035384" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
           </svg></summary><div class="accordion-panel"><ul>${thirdPartyList}</ul></div></details>`;
}
function setPanelContent(result, thirdParty) {
  checkA11YPanel.innerHTML = `<button title="${i18n.t("btn.hide")} Renowify" class="btn btn-icon-only" type="button"><span class="btn-icon">
      <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 11 17" fill="none" aria-hidden="true" focusable="false">
      <path d="M10 1L1 9L10 16" stroke="#035384" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      </span><span class="btn-text at">
      ${i18n.t("btn.hide")} Renowify</span></button>
      <div class="panel-header"><h1>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 94 24" fill="none" aria-hidden="true" focusable="false">
          <path d="M15.4426 21.624C15.0828 21.7438 14.8025 21.8248 14.534 21.8859C14.2066 21.9603 13.8408 22.0197 13.3844 22.0729C13.1127 22.1042 12.8394 22.1188 12.566 22.1341L12.2397 22.1539C11.2017 22.1511 10.1661 21.9989 9.16225 21.7015C7.81319 21.3001 6.58377 20.6392 5.50843 19.7368C4.29465 18.7194 3.3571 17.4584 2.72177 15.9893C2.39785 15.2391 2.1667 14.4402 2.03419 13.6146C1.89927 12.7716 1.86475 11.9943 1.92891 11.2385C2.06211 9.669 2.51745 8.20716 3.28247 6.89302C4.07433 5.53438 5.14335 4.40714 6.46103 3.54333C7.48262 2.87302 8.61273 2.39596 9.8195 2.12595C10.7316 1.92097 11.6483 1.83233 12.5381 1.86569C13.4499 1.89872 14.353 2.04537 15.2223 2.30215L15.5392 2.39596L16.6606 0.834058L16.0664 0.634609C14.9213 0.250272 13.7331 0.0379551 12.5353 0.00355535C11.8819 -0.0158832 11.2274 0.0476967 10.6103 0.113727C9.61758 0.219725 8.63082 0.476138 7.59354 0.897645C5.53598 1.73504 3.81107 3.04886 2.46688 4.80154C1.46861 6.1025 0.761155 7.57892 0.362979 9.19016C0.147835 10.0613 0.0286029 10.9755 0 12.0409L0.0422003 12.5517C0.0714887 12.9266 0.101135 13.3012 0.149929 13.673C0.300908 14.8214 0.644016 15.9628 1.17016 17.0651C2.06869 18.9505 3.38952 20.5218 5.0956 21.7355C6.79227 22.943 8.69535 23.6765 10.7522 23.9156C11.2354 23.9719 11.7205 24 12.2031 24C12.6417 24 13.0786 23.9768 13.5109 23.9305C14.3844 23.8364 15.2742 23.6345 16.1557 23.3304L16.5651 23.1893L15.4571 21.6192L15.4426 21.624Z" fill="#4F9E32"/>
          <path d="M21.1706 5.17921C21.1706 5.17921 21.0701 5.12856 21.0338 5.12022C21.0106 5.11488 20.9126 5.10344 20.8719 5.10148C19.6585 5.043 18.808 5.51837 17.6713 6.55281L15.8683 8.23044C13.4687 10.7684 12.287 12.2736 11.6521 13.0823C11.4892 13.2897 11.3424 13.4763 11.2507 13.5799C11.2026 13.5124 11.128 13.3759 11.0147 13.0989L9.54183 9.81771L9.49058 9.68565C9.39085 9.42018 9.23987 9.01848 8.68653 9.01848C8.04602 9.01848 7.77021 9.17415 7.30196 9.47125C7.0373 9.63421 6.675 9.85732 6.675 10.3521C6.675 11.3667 8.14156 15.9065 8.64747 16.842L8.72942 16.9935C8.85252 17.2252 8.98013 17.465 9.21514 17.6109C9.43274 17.7475 9.61055 17.7475 10.3577 17.7475C10.6859 17.7475 11.0579 17.7475 11.4132 17.6008C11.6702 17.4643 12.0419 17.1047 12.1545 16.8955L16.3554 11.6288L19.8216 7.44788C19.8216 7.44788 20.8523 6.26432 21.24 5.91413C21.3455 5.81884 21.4189 5.70113 21.4189 5.56423C21.4189 5.39918 21.3262 5.25499 21.1706 5.17921Z" fill="#4F9E32"/>
          <path d="M74.9194 4.89148V2.93155H77.0637V4.89148H74.9194ZM74.9194 14.8198V5.9037H77.0637V14.8198H74.9194Z" fill="#5A5B5C"/>
          <path d="M79.8537 14.8194V7.79873H79.0955V5.90334H79.8537C80.0145 3.38111 81.7236 2.69009 82.7873 2.69009H83.368V4.79467C82.2715 4.79467 82.0459 5.08399 81.9972 5.90334H83.2552V7.79872H81.9972V14.8194L79.8537 14.8194Z" fill="#5A5B5C"/>
          <path d="M85.5421 18.2499H24.2694V18.7537H85.3237L85.5421 18.2499Z" fill="#5A5B5C"/>
          <path d="M86.1351 18.7539L88.1967 14.0005L84.9239 5.9037H87.3745L89.4059 11.6229L91.5662 5.9037H94L88.4412 18.7539L86.1351 18.7539Z" fill="#5A5B5C"/>
          <path d="M24.2694 14.8198V5.9037H26.2361V6.69079H26.2682C26.8324 5.85548 27.2999 5.59844 28.3156 5.59844H28.364V7.67076C27.0743 7.71897 26.4133 8.40963 26.4133 9.74308V14.8198L24.2694 14.8198Z" fill="#5A5B5C"/>
          <path d="M31.4308 11.3176C31.5924 12.1051 32.5757 13.1492 33.8974 13.1492C34.784 13.1492 35.5258 12.7953 35.9609 12.0086H38.2179C37.6373 13.8076 35.7997 15.1091 33.8974 15.1091C31.2053 15.1091 29.1742 13.0201 29.1742 10.3859C29.1742 7.75087 31.1569 5.59844 33.8814 5.59844C36.4767 5.59844 38.5082 7.63849 38.5082 10.2412C38.5082 10.5787 38.4594 10.9319 38.3787 11.3176L31.4308 11.3176ZM36.3156 9.59841C36.106 8.31318 35.2194 7.55836 33.8814 7.55836C32.7045 7.55836 31.7051 8.23306 31.3664 9.59841H36.3156Z" fill="#5A5B5C"/>
          <path d="M46.0599 14.8198V10.3377C46.0599 8.52238 45.4633 7.55837 44.254 7.55837C43.5934 7.55837 42.4001 7.99198 42.4001 9.9519V14.8198H40.2559V5.90371H42.2393V6.67484C42.9487 5.98383 43.6741 5.59844 44.7059 5.59844C45.8664 5.59844 48.2035 6.32135 48.2035 9.55055V14.8198L46.0599 14.8198Z" fill="#5A5B5C"/>
          <path d="M49.8551 10.3695C49.8551 7.7991 51.9346 5.59844 54.6267 5.59844C57.3348 5.59844 59.3663 7.76719 59.3663 10.3376C59.3663 13.0042 57.3676 15.1091 54.6267 15.1091C51.9993 15.1091 49.8551 12.9404 49.8551 10.3695ZM57.222 10.3859C57.222 8.92372 56.1263 7.55837 54.6107 7.55837C53.1759 7.55837 51.9993 8.8755 51.9993 10.3695C51.9993 11.8636 53.0951 13.1492 54.6267 13.1492C56.1423 13.1492 57.222 11.8636 57.222 10.3859Z" fill="#5A5B5C"/>
          <path d="M68.2936 14.8198L66.6172 9.03647H66.5844L64.892 14.8198H63.57L60.346 5.9037H62.635L64.2634 11.3495H64.2954L65.7622 5.9037H67.4714L68.9222 11.3495H68.9542L70.5986 5.9037H72.8876L69.6156 14.8198H68.2936Z" fill="#5A5B5C"/>
        </svg>
        <span class="at">Renowify</span></h1></div>
      <div class="panel-body">${result}${thirdParty}</div>`;
}
function setEventOnFocusItems() {
  const nomenclatures = [...checkA11YPanel.querySelectorAll("a.result-focus")];
  nomenclatures.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const targetElement = document.querySelector(
        "." + item.getAttribute("data-destination")
      );
      if (targetElement !== null && isItemVisible(targetElement)) {
        const targetElementOffset = targetElement.getBoundingClientRect().top - body.getBoundingClientRect().top;
        window.scroll({
          top: targetElementOffset,
          left: 0,
          behavior: "smooth"
        });
        targetElement.style.setProperty("outline-width", "10px", "important");
        setTimeout(() => {
          targetElement.style.setProperty("outline-width", "3px", "important");
        }, 3e3);
      } else {
        alert(
          `${i18n.t("alert.hidden")} ( .${item.getAttribute("data-destination")} )`
        );
      }
    });
  });
}
function renowify(debug = false, redactor = true, nc = false) {
  console.clear();
  console.log("== Init Plugin Renowify");
  setFilter(debug, redactor, nc);
  chrome.storage.sync.get("debug", function(sync) {
    if (sync && sync.debug && sync.debug !== "") {
      console.log(`$ debug : ${sync.debug}`);
      filter.debug_flag = sync.debug;
    }
    if (filter.debug_flag) {
      for (const [key, value] of Object.entries(pageSettings)) {
        if (value == true) {
          console.log(`$ ${key}: ${value}`);
        }
      }
    }
    resetResults();
    if (document.body.classList.contains("renowify-script-injected")) {
      console.log("== Start Plugin Renowify ==");
      console.time("Renowify");
      beforeCheck();
      const checkPartFunctions = [
        check_part_01,
        check_part_02,
        check_part_03,
        check_part_04,
        check_part_05,
        check_part_06,
        check_part_07,
        check_part_08,
        check_part_09,
        check_part_10,
        check_part_11,
        check_part_12,
        check_part_13,
        check_part_14,
        check_part_15
      ];
      const checksPromises = checkPartFunctions.map(partPromiseResolve);
      async function resolveChecksPromise() {
        const promisesResults = await Promise.allSettled(checksPromises);
        logPromisesResult(promisesResults);
        createResultPanel();
        activateCheckA11YPanel();
        console.log("== End Plugin Renowify ==");
        console.timeEnd("Renowify");
      }
      resolveChecksPromise();
    }
  });
}
function setFilter(debug, redactor, nc) {
  filter.debug_flag = debug;
  filter.only_redactor = redactor;
  filter.only_nc = nc;
}
function partPromiseResolve(check_part_function) {
  return new Promise((resolve) => {
    check_part_function();
    setTimeout(resolve, 1);
  });
}
function logPromisesResult(promisesResults) {
  promisesResults.forEach(
    (result, index) => {
      const partIndex = `0${index + 1}`.slice(-2);
      if (filter.debug_flag) {
        console.log(`- Part ${partIndex} : ${result.status}`);
        if (result.status !== "fulfilled") {
          alert(`- Part ${partIndex} : ${result.status}`);
        }
      }
    }
  );
}
const app = document.querySelector("#app");
if (app) {
  const btn = document.createElement("button");
  btn.innerHTML = "Renowify";
  btn.addEventListener("click", () => renowify(false, false, false));
  app.appendChild(btn);
}
