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
let currentUrl = window.location.href;
let homepageException = [
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
const paramPage = Object({
  isHomepage: false,
  // True s'il s'agit de la homepage du site
  isPreview: false,
  // True s'il s'agit d'un environnement de dev (LOCAL, BUILD, INTEGR, QUAL)
  isDecla: false,
  // True s'il s'agit de la page contenant la declaration d'accessibilité
  isSitemap: false,
  // True s'il s'agit de la page contenant le plan du site
  isPrototype: false,
  // True s'il s'agit de la page prototype / atelier graphique
  isAEM: false,
  // True s'il s'agit d'un site réalisé avec AEM
  isCTIE: false,
  // True s'il s'agit d'un site hébergé par le CTIE
  isSearchLogic: false,
  // True s'il s'agit d'une page présentant des résultats de recherche
  isOnePage: false
  // True s'il s'agit d'un site de type OnePage
});
if (!currentUrl.includes("chrome-extension")) {
  let homepage = document.querySelector("h1.logo.logo--homepage");
  let onePageException = [
    "https://menscherechtshaus.public.lu",
    "https://nadal2024.public.lu"
  ];
  if (homepage || homepageException.includes(currentUrl)) {
    paramPage.isHomepage = true;
  }
  if ((currentUrl.includes("preview-") || currentUrl.includes("wcm")) && currentUrl.includes(".etat.lu")) {
    paramPage.isPreview = true;
  } else if (currentUrl.includes("aem-test-") || currentUrl.includes("localhost:4502")) {
    paramPage.isPreview = true;
  }
  if (currentUrl.includes("/prototype/")) {
    paramPage.isPrototype = true;
  }
  if (currentUrl.includes("/actualites.html") || currentUrl.includes("/publications.html") || currentUrl.includes("/recherche.html")) {
    paramPage.isSearchLogic = true;
  }
  if (currentUrl.includes("/support/accessibilite.html") || currentUrl.includes("/support/accessibilite/accessibilite-guichet.html")) {
    paramPage.isDecla = true;
  }
  if (currentUrl.includes("plan-du-site.html") || currentUrl.includes("plan.html") || currentUrl.includes("plan-site.html")) {
    paramPage.isSitemap = true;
  }
  for (let i = 0; i < onePageException.length; i++) {
    if (currentUrl.includes(onePageException[i])) {
      paramPage.isOnePage = true;
      break;
    }
  }
  if (currentUrl.includes(".public.lu") || currentUrl.includes("gouvernement.lu") || currentUrl.includes(".etat.lu") || currentUrl.includes("sig-gr.eu") || currentUrl.includes(".mae.lu") || currentUrl.includes("lu-alert.lu") || paramPage.isPreview == true) {
    paramPage.isCTIE = true;
    if (!currentUrl.includes("fpgun-jway") && !currentUrl.includes("demarches.services-publics") && !currentUrl.includes("fpgun-preintegr") && !currentUrl.includes("services-publics-test") && !currentUrl.includes("accessibilite.public.lu")) {
      paramPage.isAEM = true;
    }
  } else if (!currentUrl.includes("localhost")) {
    alert(
      "Ce plugin est destiné principalement aux sites étatiques luxembourgeois. (" + currentUrl + ")"
    );
  }
}
const paramResult = Object({
  result_crit: "",
  result_nc: "",
  result_nth: "",
  result_dev: "",
  result_man: "",
  result_crit_nb: 0,
  result_nc_nb: 0,
  result_nth_nb: 0,
  result_dev_nb: 0,
  result_man_nb: 0
});
const paramFilter = Object({
  debug_flag: false,
  only_redactor: false,
  only_nc: true
});
const conditionObject = Object({});
function beforeCheck() {
  seeMoreAccordion();
  setTimeout(function() {
    seeMoreAddress();
  }, 5e3);
}
function seeMoreAccordion() {
  const accordion = document.querySelectorAll(".cmp-accordion details");
  for (let i = 0; i < accordion.length; i++) {
    accordion[i].setAttribute("open", "true");
  }
}
function seeMoreAddress() {
  const address = document.querySelectorAll(".geoportail-addresses ul li");
  for (let i = 0; i < address.length; i++) {
    address[i].style.display = "block";
  }
}
function setItemsOutline(items, color, classname, label) {
  if (paramFilter.debug_flag)
    console.log(
      "[" + classname + "] Problème detecté sur " + items.length + " éléments"
    );
  for (let i = 0; i < items.length; i++) {
    setItemOutline(items[i], color, classname, label);
  }
}
function setItemOutline(item, color, classname, label) {
  if (paramFilter.debug_flag) console.log(item);
  item.classList.add("checkA11YOutline__" + color);
  item.classList.add(classname);
  const spanLabel = document.createElement("span");
  spanLabel.classList.add("checkA11YSpan");
  spanLabel.classList.add("checkA11YSpan__" + color);
  spanLabel.textContent = label;
  if (item.nodeName == "LI") {
    item.prepend(spanLabel);
  } else {
    item.before(spanLabel);
  }
}
function isItemsVisible(items) {
  for (let i = 0; i < items.length; i++) {
    if (isItemVisible(items[i])) return true;
  }
  return false;
}
function isItemVisible(item) {
  if (item == null) return false;
  for (let el = item; el && el !== document.body; el = el.parentNode) {
    let style = window.getComputedStyle(el);
    if (style.display === "none") {
      return false;
    } else if (style.visibility === "hidden") {
      return false;
    } else if (style.opacity === "0") {
      return false;
    } else if (style.width === "0" && style.height === "0") {
      return false;
    } else if (item == el && item.nodeName != "BR" && style.position != "absolute" && style.position != "fixed" && item.offsetWidth === 0 && item.offsetHeight === 0) {
      return false;
    }
  }
  return true;
}
function isItemSROnly(item) {
  let style;
  while (item.parentElement) {
    style = window.getComputedStyle(item);
    if (style.clip == "rect(1px, 1px, 1px, 1px)" && style.display !== "none" && style.visibility !== "hidden" && style.overflow == "hidden")
      return true;
    item = item.parentElement;
  }
  return false;
}
function isItemDisplayNone(item) {
  while (item.parentElement) {
    if (window.getComputedStyle(item).display == "none") return true;
    item = item.parentElement;
  }
  return false;
}
function isItemHasVisibleContent(item) {
  let lang;
  if (!item || !item.innerText || !item.closest("[lang]"))
    return false;
  if (item && item.closest("[lang]"))
    lang = item.closest("[lang]").getAttribute("lang");
  if (item.innerText && sanitizeText(item.innerText, lang) == "")
    return false;
  let style_i, style_j;
  for (let i = 0; i < item.childNodes.length; i++) {
    if (item.childNodes[i].nodeName != "#text" && item.childNodes[i].nodeName != "#comment") {
      style_i = window.getComputedStyle(item.childNodes[i]);
      if (style_i.display == "none" || style_i.width == "1px" && style_i.height == "1px" && style_i.clip == "rect(1px, 1px, 1px, 1px)" && style_i.display !== "none" && style_i.visibility !== "hidden" && style_i.overflow == "hidden") ;
      else {
        for (let j = 0; j < item.childNodes[i].childNodes.length; j++) {
          if (item.childNodes[i].childNodes[j] && item.childNodes[i].childNodes[j].nodeName != "#text" && item.childNodes[i].childNodes[j].nodeName != "#comment") {
            style_j = window.getComputedStyle(
              item.childNodes[i].childNodes[j]
            );
            if (style_j.display == "none" || style_j.width == "1px" && style_j.height == "1px" && style_j.clip == "rect(1px, 1px, 1px, 1px)" && style_j.display !== "none" && style_j.visibility !== "hidden" && style_j.overflow == "hidden") ;
            else {
              return true;
            }
          }
        }
      }
    }
  }
  return true;
}
function isItemHasDirectContent(item) {
  let lang;
  if (!item || !item.closest("[lang]")) return false;
  if (item && item.closest("[lang]"))
    lang = item.closest("[lang]").getAttribute("lang");
  let tempElement = item.cloneNode(true);
  tempElement.querySelectorAll("*").forEach(function(el) {
    el.remove();
  });
  if (tempElement.textContent && sanitizeText(tempElement.textContent, lang) != "") {
    return true;
  }
  return false;
}
function sanitizeText(txt, locale) {
  if (txt == null) return "";
  if (locale == null || locale == void 0) locale = "fr";
  const regex_ponctuation = /[.:;,?!{}$()|©'"-\/]/g;
  const regex_error = /<span\s+class=["']checkA11YSpan["'][^>]*>.*?<\/span>/gs;
  const regex_breakline = /\n|\r/g;
  const regex_doublespace = /\s+/g;
  return txt.toLowerCase().toLocaleLowerCase(locale).replaceAll(regex_error, "").replaceAll(regex_breakline, " ").replaceAll(regex_ponctuation, " ").replaceAll(regex_doublespace, " ").trim();
}
function cleanNode(item) {
  let tempElement = item.cloneNode(true);
  if (tempElement != null && tempElement.textContent != null && tempElement.textContent.trim() != "") {
    tempElement.querySelectorAll(".checkA11YSpan").forEach(function(el) {
      el.remove();
    });
  }
  return tempElement;
}
function isUpperCase(txt) {
  return txt === String(txt).toUpperCase();
}
function hexToRgbArray(hex) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(r, g, b) {
    return r + r + g + g + b + b;
  });
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
function rgbToRgbArray(rgbStr) {
  if (!rgbStr.match(/\d+/g)) return { r: -1, g: -1, b: -1 };
  const [r, g, b] = rgbStr.match(/\d+/g).map(Number);
  return { r, g, b };
}
function contrastLuminance(color) {
  const rgbArray = color.indexOf("#") >= 0 ? hexToRgbArray(color) : rgbToRgbArray(color);
  if (rgbArray) {
    const a = [rgbArray.r, rgbArray.g, rgbArray.b].map(function(v) {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  } else {
    return -1e3;
  }
}
function contrastRatio(lum1, lum2) {
  if (lum1 < 0 || lum2 < 0) return 0;
  return 1 / (lum1 > lum2 ? (lum2 + 0.05) / (lum1 + 0.05) : (lum1 + 0.05) / (lum2 + 0.05));
}
function getInheritedBackgroundColor(item) {
  let backgroundColor = window.getComputedStyle(item).getPropertyValue("background-color");
  if (backgroundColor != "rgba(0, 0, 0, 0)") return backgroundColor;
  if (!item.parentElement) return "rgba(0, 0, 0, 0)";
  return getInheritedBackgroundColor(item.parentElement);
}
function getInheritedPosition(item) {
  let position = window.getComputedStyle(item).getPropertyValue("position");
  if (position == "absolute" || position == "fixed") return position;
  if (!item.parentElement) return "relative";
  return getInheritedPosition(item.parentElement);
}
function setItemToResultList(list, txt) {
  if (list == "crit") {
    paramResult.result_crit += txt;
    paramResult.result_crit_nb++;
  } else if (list == "nc") {
    paramResult.result_nc += txt;
    paramResult.result_nc_nb++;
  } else if (list == "nth") {
    paramResult.result_nth += txt;
    paramResult.result_nth_nb++;
  } else if (list == "man") {
    paramResult.result_man += txt;
    paramResult.result_man_nb++;
  } else if (list == "dev") {
    paramResult.result_dev += txt;
    paramResult.result_dev_nb++;
  } else {
    alert("erreur setItemToResultList : " + list + " > " + txt);
  }
}
function check_test_01a() {
  if (!paramFilter.only_redactor) {
    const nia01a_nodes = document.querySelectorAll(
      "p, span:not(.checkA11YSpan), li, strong, h1, h2, h3, h4, h5, small, a:not([disabled]), button:not([disabled]), blockquote, q, dd, dt, label"
    );
    let nia01a_flag1 = false;
    let nia01a_flag2 = false;
    let nia01a_color1, nia01a_color2, nia01a_position, nia01a_textshadow, nia01a_pseudo, nia01a_color1luminance, nia01a_color2luminance, nia01a_ratio_inv, nia01a_large, nia01a_isbold, nia01a_basecolor2, nia01a_pseudoElementBefore, nia01a_pseudoElementAfter;
    if (nia01a_nodes && nia01a_nodes.length > 0) {
      for (let i = 0; i < nia01a_nodes.length; i++) {
        if (isItemVisible(nia01a_nodes[i]) && !isItemSROnly(nia01a_nodes[i]) && isItemHasVisibleContent(nia01a_nodes[i]) && isItemHasDirectContent(nia01a_nodes[i])) {
          nia01a_color1 = window.getComputedStyle(nia01a_nodes[i]).getPropertyValue("color");
          nia01a_color2 = getInheritedBackgroundColor(nia01a_nodes[i]);
          nia01a_color1luminance = contrastLuminance(nia01a_color1);
          nia01a_color2luminance = contrastLuminance(nia01a_color2);
          nia01a_ratio_inv = contrastRatio(
            nia01a_color1luminance,
            nia01a_color2luminance
          );
          if (nia01a_ratio_inv < 4.5) {
            nia01a_position = getInheritedPosition(nia01a_nodes[i]);
            nia01a_pseudo = false;
            nia01a_textshadow = window.getComputedStyle(nia01a_nodes[i]).getPropertyValue("text-shadow");
            nia01a_basecolor2 = window.getComputedStyle(nia01a_nodes[i]).getPropertyValue("background-color");
            nia01a_pseudoElementBefore = window.getComputedStyle(
              nia01a_nodes[i],
              "before"
            );
            nia01a_pseudoElementAfter = window.getComputedStyle(
              nia01a_nodes[i],
              "after"
            );
            if (nia01a_basecolor2 == "rgba(0, 0, 0, 0)" && (nia01a_pseudoElementBefore.getPropertyValue("content") != "none" && nia01a_pseudoElementBefore.getPropertyValue(
              "background-color"
            ) != "rgba(0, 0, 0, 0)" || nia01a_pseudoElementAfter.getPropertyValue("content") != "none" && nia01a_pseudoElementBefore.getPropertyValue(
              "background-color"
            ) != "rgba(0, 0, 0, 0)")) {
              nia01a_pseudo = true;
            }
            nia01a_large = getFontSize(nia01a_nodes[i]);
            nia01a_isbold = isBold(nia01a_nodes[i]);
            if (nia01a_isbold == false && nia01a_large < 24 && nia01a_ratio_inv < 4.5) {
              if (paramFilter.debug_flag)
                console.log(
                  "01A - FAIL 3.2.1 Standard ratio : " + nia01a_ratio_inv + " (" + nia01a_color1 + " vs " + nia01a_color2 + ")"
                );
              if (nia01a_position != "absolute" && nia01a_position != "fixed" && nia01a_textshadow == "none" && !nia01a_pseudo) {
                setItemOutline(nia01a_nodes[i], "orange", "nia01a", "01-A");
                nia01a_flag1 = true;
              } else if (!paramFilter.only_nc) {
                setItemOutline(nia01a_nodes[i], "yellow", "nia01a", "01-A");
                nia01a_flag2 = true;
              }
            } else if (nia01a_isbold == true && nia01a_large < 18.5 && nia01a_ratio_inv < 4.5) {
              if (paramFilter.debug_flag)
                console.log(
                  "01A - FAIL 3.2.2 Standard ratio : " + nia01a_ratio_inv + " (" + nia01a_color1 + " vs " + nia01a_color2 + ")"
                );
              if (nia01a_position != "absolute" && nia01a_position != "fixed" && nia01a_textshadow == "none" && !nia01a_pseudo) {
                setItemOutline(nia01a_nodes[i], "orange", "nia01a", "01-A");
                nia01a_flag1 = true;
              } else if (!paramFilter.only_nc) {
                setItemOutline(nia01a_nodes[i], "yellow", "nia01a", "01-A");
                nia01a_flag2 = true;
              }
            } else if (nia01a_isbold == false && nia01a_large >= 24 && nia01a_ratio_inv < 3) {
              if (paramFilter.debug_flag)
                console.log(
                  "01A - FAIL 3.2.3 Standard ratio : " + nia01a_ratio_inv + " (" + nia01a_color1 + " vs " + nia01a_color2 + ")"
                );
              if (nia01a_position != "absolute" && nia01a_position != "fixed" && nia01a_textshadow == "none" && !nia01a_pseudo) {
                setItemOutline(nia01a_nodes[i], "orange", "nia01a", "01-A");
                nia01a_flag1 = true;
              } else if (!paramFilter.only_nc) {
                setItemOutline(nia01a_nodes[i], "yellow", "nia01a", "01-A");
                nia01a_flag2 = true;
              }
            } else if (nia01a_isbold == true && nia01a_large >= 18.5 && nia01a_ratio_inv < 3) {
              if (paramFilter.debug_flag)
                console.log(
                  "01A - FAIL 3.2.4 Standard ratio : " + nia01a_ratio_inv + " (" + nia01a_color1 + " vs " + nia01a_color2 + ")"
                );
              if (nia01a_position != "absolute" && nia01a_position != "fixed" && nia01a_textshadow == "none" && !nia01a_pseudo) {
                setItemOutline(nia01a_nodes[i], "orange", "nia01a", "01-A");
                nia01a_flag1 = true;
              } else if (!paramFilter.only_nc) {
                setItemOutline(nia01a_nodes[i], "yellow", "nia01a", "01-A");
                nia01a_flag2 = true;
              }
            }
          }
          if (nia01a_nodes[i].tagName == "A" || nia01a_nodes[i].tagName == "BUTTON") {
            nia01a_nodes[i]?.focus();
            nia01a_color1 = window.getComputedStyle(nia01a_nodes[i]).getPropertyValue("color");
            nia01a_color2 = getInheritedBackgroundColor(nia01a_nodes[i]);
            nia01a_color1luminance = contrastLuminance(nia01a_color1);
            nia01a_color2luminance = contrastLuminance(nia01a_color2);
            nia01a_ratio_inv = contrastRatio(
              nia01a_color1luminance,
              nia01a_color2luminance
            );
            if (nia01a_ratio_inv < 4.5) {
              nia01a_large = getFontSize(nia01a_nodes[i]);
              nia01a_isbold = isBold(nia01a_nodes[i]);
              if (nia01a_isbold == false && nia01a_large < 24 && nia01a_ratio_inv < 4.5) {
                if (paramFilter.debug_flag)
                  console.log(
                    "01A - FAIL 3.2.1 Standard ratio : " + nia01a_ratio_inv + " (" + nia01a_color1 + " vs " + nia01a_color2 + ")"
                  );
                if (nia01a_position != "absolute" && nia01a_position != "fixed") {
                  setItemOutline(nia01a_nodes[i], "orange", "nia01a", "01-A");
                  nia01a_flag1 = true;
                } else if (!paramFilter.only_nc) {
                  setItemOutline(nia01a_nodes[i], "yellow", "nia01a", "01-A");
                  nia01a_flag2 = true;
                }
              } else if (nia01a_isbold == true && nia01a_large < 18.5 && nia01a_ratio_inv < 4.5) {
                if (paramFilter.debug_flag)
                  console.log(
                    "01A - FAIL 3.2.2 Standard ratio : " + nia01a_ratio_inv + " (" + nia01a_color1 + " vs " + nia01a_color2 + ")"
                  );
                if (nia01a_position != "absolute" && nia01a_position != "fixed") {
                  setItemOutline(nia01a_nodes[i], "orange", "nia01a", "01-A");
                  nia01a_flag1 = true;
                } else if (!paramFilter.only_nc) {
                  setItemOutline(nia01a_nodes[i], "yellow", "nia01a", "01-A");
                  nia01a_flag2 = true;
                }
              } else if (nia01a_isbold == false && nia01a_large >= 24 && nia01a_ratio_inv < 3) {
                if (paramFilter.debug_flag)
                  console.log(
                    "01A - FAIL 3.2.3 Standard ratio : " + nia01a_ratio_inv + " (" + nia01a_color1 + " vs " + nia01a_color2 + ")"
                  );
                if (nia01a_position != "absolute" && nia01a_position != "fixed") {
                  setItemOutline(nia01a_nodes[i], "orange", "nia01a", "01-A");
                  nia01a_flag1 = true;
                } else if (!paramFilter.only_nc) {
                  setItemOutline(nia01a_nodes[i], "yellow", "nia01a", "01-A");
                  nia01a_flag2 = true;
                }
              } else if (nia01a_isbold == true && nia01a_large >= 18.5 && nia01a_ratio_inv < 3) {
                if (paramFilter.debug_flag)
                  console.log(
                    "01A - FAIL 3.2.4 Standard ratio : " + nia01a_ratio_inv + " (" + nia01a_color1 + " vs " + nia01a_color2 + ")"
                  );
                if (nia01a_position != "absolute" && nia01a_position != "fixed") {
                  setItemOutline(nia01a_nodes[i], "orange", "nia01a", "01-A");
                  nia01a_flag1 = true;
                } else if (!paramFilter.only_nc) {
                  setItemOutline(nia01a_nodes[i], "yellow", "nia01a", "01-A");
                  nia01a_flag2 = true;
                }
              }
            }
          }
        }
      }
    }
    if (nia01a_flag1 == true) {
      setItemToResultList(
        "dev",
        "<li><a href='#' data-destination='nia01a' class='result-focus label-orange'>01-A</a> : Présence d'éléments textuels insuffisamment contrasté</li>"
      );
    }
    if (nia01a_flag2 == true && !paramFilter.only_nc) {
      setItemToResultList(
        "man",
        "<li><a href='#' data-destination='nia01a' class='result-focus label-yellow'>01-A</a> : Vérifier le contraste de certains éléments textuels</li>"
      );
    }
  }
}
function isBold(item) {
  const nia01a_bold = window.getComputedStyle(item).getPropertyValue("font-weight");
  if (nia01a_bold == "bold" || nia01a_bold == "bolder" || nia01a_bold == "500" || nia01a_bold == "600" || nia01a_bold == "700" || nia01a_bold == "800" || nia01a_bold == "900") {
    return true;
  } else return false;
}
function getFontSize(item) {
  return parseFloat(
    window.getComputedStyle(item).getPropertyValue("font-size")
  );
}
function check_test_01b() {
  if (!paramFilter.only_redactor && !paramFilter.only_nc) {
    const nia01b_nodes = document.querySelectorAll(
      'input:not([disabled]):not([type="file"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled])'
    );
    let nia01b_flag1 = false, nia01b_flag2 = false, nia01b_flag3 = false, nia01b_flag4 = false, nia01b_flag5 = false, nia01b_flag6 = false;
    let nia01b_color1, nia01b_color2, nia01b_color3, nia01b_border, nia01b_position, nia01b_boxshadow, nia01b_color1luminance, nia01b_color2luminance, nia01b_color3luminance, nia01b_ratio12_inv, nia01b_ratio13_inv, nia01b_ratio23_inv;
    if (nia01b_nodes && nia01b_nodes.length > 0) {
      for (let i = 0; i < nia01b_nodes.length; i++) {
        if (isItemVisible(nia01b_nodes[i]) && !isItemSROnly(nia01b_nodes[i]) && !isItemDisplayNone(nia01b_nodes[i])) {
          nia01b_color1 = window.getComputedStyle(nia01b_nodes[i]).getPropertyValue("border-color");
          nia01b_color2 = window.getComputedStyle(nia01b_nodes[i]).getPropertyValue("background-color");
          nia01b_color3 = getInheritedBackgroundColor(
            nia01b_nodes[i].parentElement
          );
          nia01b_border = window.getComputedStyle(nia01b_nodes[i]).getPropertyValue("border-width");
          nia01b_position = window.getComputedStyle(nia01b_nodes[i]).getPropertyValue("position");
          if (nia01b_color1.length > 20)
            nia01b_color1 = window.getComputedStyle(nia01b_nodes[i]).getPropertyValue("border-bottom-color");
          if (nia01b_color1 == "rgba(0, 0, 0, 0)")
            nia01b_color1 = window.getComputedStyle(nia01b_nodes[i]).getPropertyValue("border-bottom-color");
          nia01b_boxshadow = window.getComputedStyle(nia01b_nodes[i]).getPropertyValue("box-shadow");
          if (nia01b_color2 == "rgba(0, 0, 0, 0)" && (nia01b_position == "absolute" || nia01b_position == "fixed")) {
            if (!paramFilter.only_nc) {
              setItemOutline(nia01b_nodes[i], "yellow", "nia01b1", "01-B");
              nia01b_flag1 = true;
            }
          } else if (nia01b_color2 == "rgba(0, 0, 0, 0)" && nia01b_color3 == "rgba(0, 0, 0, 0)") {
            if (!paramFilter.only_nc) {
              setItemOutline(nia01b_nodes[i], "yellow", "nia01b1", "01-B");
              nia01b_flag2 = true;
            }
          } else if (nia01b_color1 == "rgba(0, 0, 0, 0)" && nia01b_color2 == "rgba(0, 0, 0, 0)") {
            if (!paramFilter.only_nc) {
              setItemOutline(nia01b_nodes[i], "yellow", "nia01b1", "01-B");
              nia01b_flag2 = true;
            }
          } else if (nia01b_border == "0px" && nia01b_color2 == "rgba(0, 0, 0, 0)") {
            if (!paramFilter.only_nc) {
              setItemOutline(nia01b_nodes[i], "yellow", "nia01b1", "01-B");
              nia01b_flag2 = true;
            }
          } else if (nia01b_color1 == nia01b_color3 && nia01b_color2 == nia01b_color3) {
            if (!paramFilter.only_nc) {
              setItemOutline(nia01b_nodes[i], "yellow", "nia01b1", "01-B");
              nia01b_flag4 = true;
            }
          } else if ((nia01b_border == "0px" || nia01b_color1 == "rgba(0, 0, 0, 0)") && nia01b_color2 == nia01b_color3) {
            if (!paramFilter.only_nc) {
              setItemOutline(nia01b_nodes[i], "yellow", "nia01b1", "01-B");
              nia01b_flag4 = true;
            }
          } else if ((nia01b_border == "0px" || nia01b_color1 == "rgba(0, 0, 0, 0)") && nia01b_color2 && nia01b_color3) {
            nia01b_color2luminance = contrastLuminance(nia01b_color2);
            nia01b_color3luminance = contrastLuminance(nia01b_color3);
            nia01b_ratio23_inv = contrastRatio(
              nia01b_color2luminance,
              nia01b_color3luminance
            );
            if (nia01b_ratio23_inv < 3) {
              if (paramFilter.debug_flag) {
                console.log(nia01b_color2);
                console.log(nia01b_color3);
                console.log(nia01b_ratio23_inv);
                console.log(
                  "01B - FAIL 3.3.3 Standard ratio : " + nia01b_ratio23_inv + " (" + nia01b_color2 + " vs " + nia01b_color3 + ")"
                );
              }
              setItemOutline(nia01b_nodes[i], "yellow", "nia01b2", "01-B");
              nia01b_flag3 = true;
            }
          } else if (nia01b_color1 && nia01b_color2 && nia01b_color3) {
            nia01b_color1luminance = contrastLuminance(nia01b_color1);
            nia01b_color2luminance = contrastLuminance(nia01b_color2);
            nia01b_color3luminance = contrastLuminance(nia01b_color3);
            nia01b_ratio12_inv = contrastRatio(
              nia01b_color1luminance,
              nia01b_color2luminance
            );
            nia01b_ratio13_inv = contrastRatio(
              nia01b_color1luminance,
              nia01b_color3luminance
            );
            nia01b_ratio23_inv = contrastRatio(
              nia01b_color2luminance,
              nia01b_color3luminance
            );
            if (nia01b_ratio12_inv < 3 && nia01b_ratio13_inv < 3 && nia01b_ratio23_inv < 3) {
              if (paramFilter.debug_flag && nia01b_ratio12_inv < 3)
                console.log(
                  "01B - FAIL 3.3.3 Standard ratio : " + nia01b_ratio12_inv + " (" + nia01b_color1 + " vs " + nia01b_color2 + ")"
                );
              else if (paramFilter.debug_flag && nia01b_ratio13_inv < 3)
                console.log(
                  "01B - FAIL 3.3.3 Standard ratio : " + nia01b_ratio13_inv + " (" + nia01b_color1 + " vs " + nia01b_color3 + ")"
                );
              else if (paramFilter.debug_flag && nia01b_ratio23_inv < 3)
                console.log(
                  "01B - FAIL 3.3.3 Standard ratio : " + nia01b_ratio23_inv + " (" + nia01b_color2 + " vs " + nia01b_color3 + ")"
                );
              if (nia01b_position == "absolute" || nia01b_position == "fixed") {
                setItemOutline(nia01b_nodes[i], "yellow", "nia01b2", "01-B");
                nia01b_flag5 = true;
              } else if (nia01b_boxshadow != "none") {
                setItemOutline(nia01b_nodes[i], "yellow", "nia01b2", "01-B");
                nia01b_flag6 = true;
              } else {
                setItemOutline(nia01b_nodes[i], "yellow", "nia01b2", "01-B");
                nia01b_flag3 = true;
              }
            }
          } else {
            console.log("couleur de bordure inconnu");
          }
        }
      }
    }
    if (nia01b_flag1 == true) {
      setItemToResultList(
        "man",
        "<li><a href='#' data-destination='nia01b1' class='result-focus label-yellow'>01-B</a> : Présence d'élément graphique avec background transparent sur un élément en position absolute - Contraste à vérifier manuellement</li>"
      );
    }
    if (nia01b_flag2 == true) {
      setItemToResultList(
        "man",
        "<li><a href='#' data-destination='nia01b1' class='result-focus label-yellow'>01-B</a> : Présence d'élément graphique avec background transparent - Contraste à vérifier manuellement</li>"
      );
    }
    if (nia01b_flag3 == true) {
      setItemToResultList(
        "dev",
        "<li><a href='#' data-destination='nia01b2' class='result-focus label-yellow'>01-B</a> : Présence d'élément graphique insuffisamment contrasté</li>"
      );
    }
    if (nia01b_flag4 == true) {
      setItemToResultList(
        "man",
        "<li><a href='#' data-destination='nia01b1' class='result-focus label-yellow'>01-B</a> : Présence d'élément graphique avec background identique au fond de page - Contraste à vérifier manuellement</li>"
      );
    }
    if (nia01b_flag5 == true) {
      setItemToResultList(
        "man",
        "<li><a href='#' data-destination='nia01b1' class='result-focus label-yellow'>01-B</a> : Présence d'élément graphique sur un élément en position absolute - Contraste à vérifier manuellement</li>"
      );
    }
    if (nia01b_flag6 == true) {
      setItemToResultList(
        "man",
        "<li><a href='#' data-destination='nia01b1' class='result-focus label-yellow'>01-B</a> : Présence d'élément graphique avec une ombre portée - Contraste à vérifier manuellement</li>"
      );
    }
  }
}
function check_test_01c() {
  if (!paramFilter.only_redactor) {
    const nia01c_btn = document.querySelector(
      'button.anchor[data-destination="#topsearch"][aria-expanded="false"]'
    );
    if (nia01c_btn) {
      nia01c_btn.click();
    }
    const nia01c_nodes = document.querySelectorAll(
      "input[placeholder]:not([disabled]), textarea[placeholder]:not([disabled])"
    );
    let nia01c_flag1 = false;
    let nia01c_flag2 = false;
    let nia01c_flag3 = false;
    let nia01c_color1, nia01c_color2, nia01c_color1luminance, nia01c_color2luminance, nia01c_ratio_inv, nia01c_opacity;
    if (nia01c_nodes && nia01c_nodes.length > 0) {
      for (let i = 0; i < nia01c_nodes.length; i++) {
        if (isItemVisible(nia01c_nodes[i])) {
          nia01c_color1 = window.getComputedStyle(nia01c_nodes[i], "::placeholder").getPropertyValue("color");
          nia01c_color2 = getInheritedBackgroundColor(nia01c_nodes[i]);
          nia01c_opacity = window.getComputedStyle(nia01c_nodes[i], "::placeholder").getPropertyValue("opacity");
          if (nia01c_color1) {
            nia01c_color1luminance = contrastLuminance(nia01c_color1);
            nia01c_color2luminance = contrastLuminance(nia01c_color2);
            nia01c_ratio_inv = contrastRatio(
              nia01c_color1luminance,
              nia01c_color2luminance
            );
            if (nia01c_ratio_inv < 4.5) {
              if (paramFilter.debug_flag)
                console.log(
                  "01C - FAIL 3.2.1 Standard ratio : " + nia01c_ratio_inv + " (" + nia01c_color1 + " vs " + nia01c_color2 + ")"
                );
              setItemOutline(nia01c_nodes[i], "orange", "nia01c1", "01-C");
              nia01c_flag1 = true;
            } else if (nia01c_color1 == "rgb(0, 0, 0)" && nia01c_color2 != "rgb(255, 255, 255)" && !paramFilter.only_nc) {
              setItemOutline(nia01c_nodes[i], "yellow", "nia01c2", "01-C");
              nia01c_flag2 = true;
            }
          } else {
            if (paramFilter.debug_flag)
              console.log("couleur de placeholder inconnu");
          }
          if (nia01c_opacity != "1" && !paramFilter.only_nc) {
            setItemOutline(nia01c_nodes[i], "yellow", "nia01c3", "01-C");
            nia01c_flag3 = true;
          }
        }
      }
    }
    if (nia01c_flag1 == true) {
      setItemToResultList(
        "dev",
        "<li><a href='#' data-destination='nia01c1' class='result-focus label-orange'>01-C</a> : Présence d'élément placeholder insuffisament contrasté</li>"
      );
    }
    if (nia01c_flag2 == true && !paramFilter.only_nc) {
      setItemToResultList(
        "man",
        "<li><a href='#' data-destination='nia01c2' class='result-focus label-yellow'>01-C</a> : Vérifier si l'élément placeholder est suffisament contrasté</li>"
      );
    }
    if (nia01c_flag3 == true && !paramFilter.only_nc) {
      setItemToResultList(
        "man",
        "<li><a href='#' data-destination='nia01c3' class='result-focus label-yellow'>01-C</a> : Vérifier si l'élément placeholder possède une opacité suffisante</li>"
      );
    }
  }
}
function refactoring_template_1(query, index, destination, category, color, msg) {
  if (color == "red" || color == "orange" || !paramFilter.only_nc) {
    const nodes = document.querySelectorAll(query);
    if (nodes && nodes.length > 0 && isItemsVisible(nodes)) {
      setItemToResultList(
        category,
        "<li><a href='#' data-destination='" + destination + "' class='result-focus label-" + color + "'>" + index + "</a> : " + msg + "</li>"
      );
      setItemsOutline(nodes, color, destination, index);
    }
  }
}
function refactoring_template_2(query, index, destination, category, color, msg) {
  if (color == "red" || color == "orange" || !paramFilter.only_nc) {
    const nodes = document.querySelectorAll(query);
    let node;
    let flag = false;
    if (nodes && nodes.length > 0) {
      for (let i = 0; i < nodes.length; i++) {
        node = nodes[i];
        if (checkCondition(node, destination)) {
          setItemOutline(node, color, destination, index);
          flag = true;
        }
      }
    }
    if (flag == true) {
      setItemToResultList(
        category,
        "<li><a href='#' data-destination='" + destination + "' class='result-focus label-" + color + "'>" + index + "</a> : " + msg + "</li>"
      );
    }
  }
}
function refactoring_template_3(query, index, category, color, msg) {
  if (color == "red" || color == "orange" || !paramFilter.only_nc) {
    const node = document.querySelector(query);
    if (!node || node == null || node.tagName != "META" && node.tagName != "LINK" && node.tagName != "NAV" && !node.classList.contains("toc-anchor") && !node.classList.contains("back") && !isItemVisible(node)) {
      setItemToResultList(
        category,
        "<li><span class='result-focus label-" + color + "'>" + index + "</span> : " + msg + "</li>"
      );
    }
  }
}
function refactoring_template_4(condition, index, category, color, msg) {
  if (color == "red" || color == "orange" || !paramFilter.only_nc) {
    if (condition) {
      setItemToResultList(
        category,
        "<li><span class='result-focus label-" + color + "'>" + index + "</span> : " + msg + "</li>"
      );
    }
  }
}
function checkCondition(node, destination) {
  try {
    return conditionObject[destination](node);
  } catch (e) {
    console.error("Error evaluating function:", destination, e);
    return false;
  }
}
function check_test_01e() {
  conditionObject.nia01e = condition_test_01e;
  if (!paramFilter.only_redactor) {
    refactoring_template_2(
      "header, footer, .cmp-section, aside, article",
      "01-E",
      "nia01e",
      "man",
      "yellow",
      "Vérifier la présence d'une couleur de replis sur des éléments avec fond en dégradé."
    );
  }
}
function condition_test_01e(node) {
  return Boolean(
    isItemVisible(node) && window.getComputedStyle(node).getPropertyValue("background-image").indexOf("linear-gradient") >= 0 && window.getComputedStyle(node).getPropertyValue("background-color") == "rgba(0, 0, 0, 0)"
  );
}
function check_test_01f() {
  if (!paramFilter.only_redactor) {
    const nia01f_color = window.getComputedStyle(document.body).getPropertyValue("color");
    const nia01f_bg = window.getComputedStyle(document.body).getPropertyValue("background-color");
    if (paramFilter.debug_flag) {
      console.log(nia01f_color);
      console.log(nia01f_bg);
    }
    if (nia01f_color == "" || nia01f_color == "rgba(0, 0, 0, 0)" || nia01f_bg == "" || nia01f_bg == "rgba(0, 0, 0, 0)") {
      setItemToResultList(
        "dev",
        "<li><span class='result-focus label-orange'>01-F</span> : Absence de déclaration de couleurs sur la balise body</li>"
      );
    } else {
      const nia01f_color_luminance = contrastLuminance(nia01f_color);
      const nia01f_bg_rgb_luminance = contrastLuminance(nia01f_bg);
      const nia01f_ratio_inv = contrastRatio(
        nia01f_color_luminance,
        nia01f_bg_rgb_luminance
      );
      if (nia01f_ratio_inv < 4.5) {
        setItemToResultList(
          "dev",
          "<li><span class='result-focus label-orange'>01-F</span> : Le jeu de couleurs par défaut sur la balise body n'est pas assez contrasté</li>"
        );
      } else if (nia01f_ratio_inv < 7 && !paramFilter.only_nc) {
        setItemToResultList(
          "dev",
          "<li><span class='result-focus label-yellow'>01-F</span> : Un ratio de contrast de 7:1 est recommandé pour le texte principal</li>"
        );
      }
    }
  }
}
function check_part_01() {
  if (paramFilter.debug_flag) console.log("01 Couleur");
  check_test_01a();
  check_test_01b();
  check_test_01c();
  check_test_01e();
  check_test_01f();
}
function check_test_02a() {
  refactoring_template_1(
    '*:not(.ol-overlay-container) > *:not(.ol-overlay-container) >  img:not([alt]):not([aria-label]):not([aria-labelledby]):not([title]), [role="image"]:not([aria-label]):not([aria-labelledby])',
    "02-A",
    "nia02a1",
    "nc",
    "red",
    "Présence d'images sans alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-1-1' target='_blank'>RAWeb 1.1.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-image-decorative-est-dotee-dune-alternative-textuelle-appropriee' target='_blank'>Opquast 111</a>]"
  );
  refactoring_template_1(
    "*:not(.ol-overlay-container) > *:not(.ol-overlay-container) > img:not([alt])",
    "02-A",
    "nia02a2",
    "nth",
    "yellow",
    "Présence d'images sans attribut alt [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-1-1' target='_blank'>RAWeb 1.1.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-image-decorative-est-dotee-dune-alternative-textuelle-appropriee' target='_blank'>Opquast 111</a>]"
  );
}
function check_test_02b() {
  refactoring_template_1(
    'svg:not([aria-hidden="true"]):not(.iconset)',
    "02-B",
    "nia02b1",
    "nc",
    "red",
    "Absence de certains attributs sur des SVG (aria-hidden=true) [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-4' target='_blank'>RAWeb 1.2.4</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-image-decorative-est-dotee-dune-alternative-textuelle-appropriee' target='_blank'>Opquast 111</a>]"
  );
  refactoring_template_1(
    'svg:not([focusable="false"]):not(.iconset)',
    "02-B",
    "nia02b2",
    "nth",
    "yellow",
    "Absence de certains attributs sur des SVG (focusable=false) [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-image-decorative-est-dotee-dune-alternative-textuelle-appropriee' target='_blank'>Opquast 111</a>]"
  );
  refactoring_template_1(
    'svg[role="img"]:not([title]):not([aria-labelledby]):not([aria-label])',
    "02-B",
    "nia02b3",
    "nc",
    "red",
    "Les images vectorielle porteuse d'information doivent posséder une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-1-5' target='_blank'>RAWeb 1.1.5</a>]"
  );
  refactoring_template_1(
    'svg[aria-hidden="true"][aria-label], svg[aria-hidden="true"][aria-labelledby]',
    "02-B",
    "nia02b4",
    "nc",
    "red",
    "Les images vectorielle de décoration ne doivent pas posséder une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-4' target='_blank'>RAWeb 1.2.4</a> - [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-image-decorative-est-dotee-dune-alternative-textuelle-appropriee' target='_blank'>Opquast 111</a>]"
  );
  conditionObject.nia02b5 = condition_test_02b5;
  refactoring_template_2(
    'svg[aria-hidden="true"] title, svg[aria-hidden="true"] desc',
    "02-B",
    "nia02b5",
    "nc",
    "red",
    "Les images vectorielles de décoration ne doivent pas posséder une alternative textuelle dans des balises 'title' ou 'desc' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-4' target='_blank'>RAWeb 1.2.4</a>]"
  );
}
function condition_test_02b5(node) {
  return Boolean(
    node.hasAttribute("title") && node.getAttribute("title").length > 0 || node.hasAttribute("desc") && node.getAttribute("desc").length > 0
  );
}
function check_test_02c() {
  if (!paramFilter.only_redactor && paramPage.isAEM) {
    refactoring_template_1(
      '.cmp-focus img:not([alt=""])',
      "02-C",
      "nia02c",
      "dev",
      "red",
      "Présence d'image de search-logic sans attribut alt vide"
    );
  }
}
function check_test_02d() {
  if (!paramFilter.only_redactor && paramPage.isAEM) {
    refactoring_template_1(
      '.cmp-image[data-cmp-hook-image="imageV3"] .cmp-image__title',
      "02-D",
      "nia02d",
      "dev",
      "orange",
      "Présence d'un caption non lié correctement à son image"
    );
  }
}
function check_test_02e() {
  if (!paramFilter.only_redactor && paramPage.isAEM) {
    refactoring_template_1(
      'figure[data-cmp-hook-image="figure"]:not([aria-label]) figcaption',
      "02-E",
      "nia02e",
      "dev",
      "orange",
      "Les captions des images ne sont pas correctement restitué, il manque un attribut aria-label sur la balise figure"
    );
  }
}
function check_test_02f() {
  if (!paramFilter.only_redactor) {
    refactoring_template_1(
      "area:not([aria-label]):not([alt])",
      "02-F",
      "nia02f1",
      "nc",
      "red",
      "Les zones d'image réactive porteuse d'information doivent avoir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-1-2' target='_blank'>RAWeb 1.1.2</a>]"
    );
    refactoring_template_1(
      'input[type="image"]:not([alt]):not([aria-label]):not([aria-labelledby]):not([title])',
      "02-F",
      "nia02f2",
      "nc",
      "red",
      "Les boutons de type image (balise input avec attribut type=image doivent avoir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-1-3' target='_blank'>RAWeb 1.1.3</a>]"
    );
    refactoring_template_1(
      'object[type^="image/"]:not([role="img"]):not([aria-label]):not([aria-labelledby]):not([title])',
      "02-F",
      "nia02f3",
      "nc",
      "red",
      "Les images objects porteuses d'information doivent avoir une alternative textuelle - à vérifier manuellement la présence d'un mécanisme de remplacement [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-1-6' target='_blank'>RAWeb 1.1.6</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-image-porteuse-dinformation-est-dotee-dune-alternative-textuelle-appropriee' target='_blank'>Opquast 113</a>]"
    );
    refactoring_template_1(
      'embed[type^="image/"]:not([role="img"]):not([aria-label]):not([aria-labelledby]):not([title])',
      "02-F",
      "nia02f4",
      "nc",
      "red",
      "Les images embarquée porteuses d'information doivent avoir une alternative textuelle - à vérifier manuellement la présence d'un mécanisme de remplacement [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-1-7' target='_blank'>RAWeb 1.1.7</a>]"
    );
    refactoring_template_1(
      'canvas[type^="image/"]:not([role="img"]):not([aria-label]):not([aria-labelledby])',
      "02-F",
      "nia02f5",
      "nc",
      "red",
      "Les images bitmap (balise canvas) porteuses d'information doivent avoir une alternative textuelle - à vérifier manuellement la présence d'un mécanisme de remplacement [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-1-8' target='_blank'>RAWeb 1.1.8</a>]"
    );
  }
}
function check_test_02g() {
  refactoring_template_1(
    'img:where([alt=""],[aria-hidden="true"],[role="presentation"],[role="none"]):where([aria-label][aria-labelledby][title])',
    "02-G",
    "nia02g1",
    "nc",
    "red",
    "Les images de décoration ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-1' target='_blank'>RAWeb 1.2.1</a>]"
  );
  if (!paramFilter.only_redactor) {
    refactoring_template_1(
      'area:not([href]):where([alt=""],[aria-hidden="true"],[role="presentation"],[role="none"]):where([aria-label],[aria-labelledby],[title])',
      "02-G",
      "nia02g2",
      "nc",
      "red",
      "Les zone non cliquable de décoration ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-2' target='_blank'>RAWeb 1.2.2</a>]"
    );
    refactoring_template_1(
      'object[type^="image/"][aria-hidden="true"]:where([aria-label],[aria-labelledby],[title])',
      "02-G",
      "nia02g3",
      "nc",
      "red",
      "Les images object de décoration ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-3' target='_blank'>RAWeb 1.2.3</a>]"
    );
    refactoring_template_1(
      'canvas[aria-hidden="true"]:where([aria-label],[aria-labelledby],[title])',
      "02-G",
      "nia02g4",
      "nc",
      "red",
      "Les images bitmap de décoration (canvas) ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-5' target='_blank'>RAWeb 1.2.5</a>]"
    );
    refactoring_template_1(
      'embed[type^="image/"][aria-hidden="true"]:where([aria-label],[aria-labelledby],[title])',
      "02-G",
      "nia02g5",
      "nc",
      "red",
      "Les images embarquées de décoration ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-6' target='_blank'>RAWeb 1.2.6</a>]"
    );
    conditionObject.nia02g6 = condition_test_02g6;
    refactoring_template_2(
      'object[type^="image/"][aria-hidden="true"]',
      "02-G",
      "nia02g6",
      "nc",
      "red",
      "Les images object de décoration ne doivent pas avoir de contenu alternatif présent entre ses balises [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-3' target='_blank'>RAWeb 1.2.3</a>]"
    );
    conditionObject.nia02g7 = condition_test_02g7;
    refactoring_template_2(
      'canvas[aria-hidden="true"]',
      "02-G",
      "nia02g7",
      "nc",
      "red",
      "Les images bitmap de décoration (canvas) ne doivent pas avoir de contenu alternatif présent entre ses balises [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-3' target='_blank'>RAWeb 1.2.3</a>]"
    );
  }
}
function condition_test_02g6(node) {
  return Boolean(isItemVisible(node) && node.textContent.length > 0);
}
function condition_test_02g7(node) {
  return Boolean(isItemVisible(node) && node.textContent.length > 0);
}
function check_test_02h() {
  const nia02h_nodes = document.querySelectorAll(
    ':where(img,svg,canvas,embed[type^="image/"],object[type^="image/"]):where([alt],[aria-label],[aria-labelledby],[title]):not([aria-hidden="true"]):not([role="presentation"]):not([role="none"])'
  );
  let nia02h_flag = false;
  let nia02h_lang, nia02h_label;
  if (nia02h_nodes && nia02h_nodes.length > 0) {
    for (let i = 0; i < nia02h_nodes.length; i++) {
      if (nia02h_nodes[i] && nia02h_nodes[i].closest("[lang]"))
        nia02h_lang = nia02h_nodes[i].closest("[lang]").getAttribute("lang");
      if (nia02h_nodes[i].hasAttribute("aria-labelledby")) {
        nia02h_label = document.querySelectorAll(
          "[id='" + nia02h_nodes[i].getAttribute("aria-labelledby") + "']"
        );
        if (!nia02h_label || nia02h_label.length != 1) {
          setItemOutline(nia02h_nodes[i], "red", "nia02h1", "02-H");
          setItemToResultList(
            "nc",
            "<li><a href='#' data-destination='nia02h1' class='result-focus label-red'>02-H</a> : Problème de référence introuvable sur un attribut aria-labelledby</li>"
          );
        } else if (!paramFilter.only_nc && sanitizeText(cleanNode(nia02h_label[0]).textContent, nia02h_lang).length > 150) {
          setItemOutline(nia02h_nodes[i], "yellow", "nia02h", "02-H");
          nia02h_flag = true;
        }
      } else if (!paramFilter.only_nc && nia02h_nodes[i].hasAttribute("aria-label") && sanitizeText(nia02h_nodes[i].getAttribute("aria-label"), nia02h_lang).length > 150) {
        setItemOutline(nia02h_nodes[i], "yellow", "nia02h", "02-H");
        nia02h_flag = true;
      } else if (!paramFilter.only_nc && nia02h_nodes[i].hasAttribute("alt") && sanitizeText(nia02h_nodes[i].getAttribute("alt"), nia02h_lang).length > 150) {
        setItemOutline(nia02h_nodes[i], "yellow", "nia02h", "02-H");
        nia02h_flag = true;
      } else if (!paramFilter.only_nc && nia02h_nodes[i].hasAttribute("title") && sanitizeText(nia02h_nodes[i].getAttribute("title"), nia02h_lang).length > 150) {
        setItemOutline(nia02h_nodes[i], "yellow", "nia02h", "02-H");
        nia02h_flag = true;
      }
    }
  }
  if (nia02h_flag == true) {
    setItemToResultList(
      "nth",
      "<li><a href='#' data-destination='nia02h' class='result-focus label-yellow'>02-H</a> : Présence d'alternative textuelle trop longue [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-3-9' target='_blank'>RAWeb 1.3.9</a>]</li>"
    );
  }
}
function check_test_02i() {
  conditionObject.nia02i = condition_test_02i;
  refactoring_template_2(
    'a:not(.blocklink):not([role="button"]):has(> img),a:not(.blocklink):not([role="button"]):has(> svg)',
    "02-I",
    "nia02i",
    "nth",
    "yellow",
    "Présence d'image-lien avec une alternative textuelle non pertinente [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-6-1-5' target='_blank'>RAWeb 6.1.5</a>, <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-image-lien-est-dotee-dune-alternative-textuelle-appropriee' target='_blank'> Opquast 112</a>]"
  );
}
function condition_test_02i(node) {
  return Boolean(
    isItemVisible(node) && node.childElementCount == 1 && (node.getElementsByTagName("img")[0] != null && node.getElementsByTagName("img")[0].getAttribute("alt") == "" || node.getElementsByTagName("svg")[0] != null)
  );
}
function check_test_02j() {
  if (!paramFilter.only_nc && paramPage.isAEM) {
    const nia02j_nodes = document.querySelectorAll(
      '*:not(.feed-item-content > p):not(.feed-item-header):not(.ol-full-screen-false) > img:not([src$=".svg"])'
    );
    let nia02j_css_h, nia02j_css_w, nia02j_html_h, nia02j_html_w, nia02j_natural_h, nia02j_natural_w;
    let nia02j_flag = false;
    let nia02j_ratio_max = 3.5;
    let nia02j_ratio_min = 0.5;
    if (nia02j_nodes && nia02j_nodes.length > 0) {
      for (let i = 0; i < nia02j_nodes.length; i++) {
        if (isItemVisible(nia02j_nodes[i])) {
          nia02j_ratio_max = 3.5;
          if (Boolean(nia02j_nodes[i].closest(".search-result")) || Boolean(nia02j_nodes[i].closest(".cmp-focus"))) {
            nia02j_ratio_max = 5;
            if (paramFilter.debug_flag)
              console.log(
                nia02j_ratio_max + " " + nia02j_nodes[i].getAttribute("src")
              );
          }
          nia02j_css_h = nia02j_nodes[i].height;
          nia02j_css_w = nia02j_nodes[i].width;
          nia02j_html_h = Number(nia02j_nodes[i].getAttribute("height"));
          nia02j_html_w = Number(nia02j_nodes[i].getAttribute("width"));
          nia02j_natural_h = nia02j_nodes[i].naturalHeight;
          nia02j_natural_w = nia02j_nodes[i].naturalWidth;
          if (nia02j_html_h && (Math.abs(nia02j_html_h / nia02j_css_h) < nia02j_ratio_min || Math.abs(nia02j_html_h / nia02j_css_h) > nia02j_ratio_max)) {
            if (paramFilter.debug_flag)
              console.log(
                "Html Height : " + nia02j_html_h + " vs " + nia02j_css_h
              );
            setItemOutline(nia02j_nodes[i], "yellow", "nia02j", "02-J");
            nia02j_flag = true;
          } else if (nia02j_html_w && (Math.abs(nia02j_html_w / nia02j_css_w) < nia02j_ratio_min || Math.abs(nia02j_html_w / nia02j_css_w) > nia02j_ratio_max)) {
            if (paramFilter.debug_flag)
              console.log(
                "Html Width : " + nia02j_html_w + " vs " + nia02j_css_w
              );
            setItemOutline(nia02j_nodes[i], "yellow", "nia02j", "02-J");
            nia02j_flag = true;
          } else if ((Math.abs(nia02j_natural_h / nia02j_css_h) < nia02j_ratio_min || Math.abs(nia02j_natural_h / nia02j_css_h) > nia02j_ratio_max) && nia02j_natural_h > 1) {
            if (paramFilter.debug_flag)
              console.log(
                "Natural Height : " + nia02j_natural_h + " vs " + nia02j_css_h
              );
            setItemOutline(nia02j_nodes[i], "yellow", "nia02j", "02-J");
            nia02j_flag = true;
          } else if ((Math.abs(nia02j_natural_w / nia02j_css_w) < nia02j_ratio_min || Math.abs(nia02j_natural_w / nia02j_css_w) > nia02j_ratio_max) && nia02j_natural_w > 1) {
            if (paramFilter.debug_flag)
              console.log(
                "Natural Width : " + nia02j_natural_w + " vs " + nia02j_css_w
              );
            setItemOutline(nia02j_nodes[i], "yellow", "nia02j", "02-J");
            nia02j_flag = true;
          }
        }
      }
    }
    if (nia02j_flag == true) {
      setItemToResultList(
        "nth",
        "<li><a href='#' data-destination='nia02j' class='result-focus label-yellow'>02-J</a> : Présence d'image redimentionnées côté Client [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-vignettes-et-apercus-ne-sont-pas-des-images-de-taille-superieure-redimensionnees-cote-client' target='_blank'>Opquast 114</a>]</li>"
      );
    }
  }
}
function check_part_02() {
  if (paramFilter.debug_flag) console.log("02 Images");
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
  if (!paramFilter.only_redactor) {
    conditionObject.nia03a = condition_test_03a;
    refactoring_template_2(
      'html[lang="fr"] a[target="_blank"]:not([title$="- Nouvelle fenêtre"]):not([title$="- Nouvelle fenêtre (Pdf)"]):not(.mapboxgl-ctrl-logo):not(.blocklink), html[lang="fr"] a[title$="- Nouvelle fenêtre"]:not([target="_blank"]), html[lang="en"] a[target="_blank"]:not([title$="- New window"]):not([title$="- New window (Pdf)"]):not(.mapboxgl-ctrl-logo):not(.blocklink),html[lang="en"] a[title$="- New window"]:not([target="_blank"]), html[lang="de"] a[target="_blank"]:not([title$="- Neues Fenster"]):not([title$="- Neues Fenster (Pdf)"]):not(.mapboxgl-ctrl-logo):not(.blocklink),html[lang="de"] a[title$="- Neues Fenster"]:not([target="_blank"]),html[lang="lb"] a[target="_blank"]:not([title$="- Nei Fënster"]):not([title$="- Nei Fënster (Pdf)"]):not(.mapboxgl-ctrl-logo):not(.blocklink),html[lang="lb"] a[title$="- Nei Fënster"]:not([target="_blank"])',
      "03-A",
      "nia03a",
      "nth",
      "yellow",
      "Vérifier la présence de suffixe sur les liens externes (ou problème de traduction du suffixe) [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/lutilisateur-est-averti-des-ouvertures-de-nouvelles-fenetres' target='_blank'>Opquast 141</a>]"
    );
  }
}
function condition_test_03a(node) {
  return Boolean(
    isItemVisible(node) && (!node.hasAttribute("title") || node.closest("[lang]") && node.closest("[lang]").getAttribute("lang") == "en" && !node.getAttribute("title").endsWith("- New window") || node.closest("[lang]") && node.closest("[lang]").getAttribute("lang") == "fr" && !node.getAttribute("title").endsWith("- Nouvelle fenêtre") || node.closest("[lang]") && node.closest("[lang]").getAttribute("lang") == "de" && !node.getAttribute("title").endsWith("- Neues Fenster") || node.closest("[lang]") && node.closest("[lang]").getAttribute("lang") == "lb" && !node.getAttribute("title").endsWith("- Nei Fënster"))
  );
}
function check_test_03b() {
  refactoring_template_1(
    'a[title=" "],a[title="Nouvelle fenêtre"],a[title="- Nouvelle fenêtre"],a[title$="Nouvelle fenêtre - Nouvelle fenêtre"], a[title="   - Nouvelle fenêtre"]',
    "03-B",
    "nia03b",
    "nc",
    "red",
    "Vérifier qu'il n'y a pas de lien avec un titre non pertinant [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-6.1.1' target='_blank'>RAWeb 6.1.1</a>]"
  );
}
function check_test_03c() {
  if (!paramFilter.only_redactor) {
    refactoring_template_1(
      'html:not([lang="fr"]) .cmp-section__content:not([lang="fr"]) *:not(.book-download) > a[title$="- Nouvelle fenêtre"]:not([lang="fr"]), html:not([lang="en"]) .cmp-section__content:not([lang="en"]) *:not(.book-download) > a[title$="- New window"]:not([lang="en"]), html:not([lang="de"]) .cmp-section__content:not([lang="de"]) *:not(.book-download) > a[title$="- Neues Fenster"]:not([lang="de"]), html:not([lang="lb"]) .cmp-section__content:not([lang="lb"]) *:not(.book-download) > a[title$="- Nei Fënster"]:not([lang="lb"])',
      "03-C",
      "nia03c",
      "nc",
      "orange",
      "Présence du suffixe 'Nouvelle fenêtre' sur une page non rédigée en français (de même pour les autres langues)"
    );
  }
}
function check_test_03d() {
  if (!paramFilter.only_redactor) {
    refactoring_template_1(
      "a[aria-label][aria-labelledby]",
      "03-D",
      "nia03d",
      "nc",
      "red",
      "Présence d'un conflit dans les attributs des liens"
    );
  }
}
function check_test_03e() {
  const nia03e_nodes = document.querySelectorAll("a[title]");
  let nia03e_flag = false;
  let nia03e_content = "", nia03e_title = "", nia03e_lang, nia03e_innerText = "";
  if (nia03e_nodes && nia03e_nodes.length > 0) {
    for (let i = 0; i < nia03e_nodes.length; i++) {
      if (isItemVisible(nia03e_nodes[i])) {
        if (nia03e_nodes[i] && nia03e_nodes[i].closest("[lang]"))
          nia03e_lang = nia03e_nodes[i].closest("[lang]").getAttribute("lang");
        nia03e_title = sanitizeText(
          nia03e_nodes[i].getAttribute("title"),
          nia03e_lang
        );
        nia03e_innerText = cleanNode(nia03e_nodes[i]).innerText;
        nia03e_content = sanitizeText(nia03e_innerText, nia03e_lang);
        if (!nia03e_title.includes(nia03e_content) && !nia03e_title.includes(
          nia03e_content.replace(/(pdf)([1-9])/, "$1 $2")
        )) {
          if (paramFilter.debug_flag) {
            console.log(
              "%cERROR",
              "font-weight:700;color:darkred",
              "[" + nia03e_title + "] VS [" + nia03e_content + "] "
            );
          }
          setItemOutline(nia03e_nodes[i], "red", "nia03e", "03-E");
          nia03e_flag = true;
        }
      }
    }
  }
  if (nia03e_flag == true) {
    setItemToResultList(
      "nc",
      "<li><a href='#' data-destination='nia03e' class='result-focus label-red'>03-E</a> : Présence de liens dont l'attribut title ne reprend pas le contenu textuel [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-6-1-5' target='_blank'>RAWeb 6.1.5</a>]</li>"
    );
  }
}
function check_test_03f() {
  conditionObject.nia03f = condition_test_03f;
  refactoring_template_2(
    'a[href]:not([href^="#"]),[role="link"][href]:not([href^="#"])',
    "03-F",
    "nia03f",
    "nc",
    "red",
    "Présence de liens dont le contenu est vide [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-6-2-1' target='_blank'>RAWeb 6.2.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-libelle-de-chaque-lien-decrit-sa-fonction-ou-la-nature-du-contenu-vers-lequel-il-pointe' target='_blank'>Opquast 131</a>]"
  );
}
function condition_test_03f(node) {
  return Boolean(
    isItemVisible(node) && !node.hasAttribute("title") && node.closest("[lang]") && sanitizeText(
      node.innerText,
      node.closest("[lang]").getAttribute("lang")
    ).length == 0 && node.querySelectorAll(
      'img:not([alt=""]):not([aria-hidden="true"]):not([hidden])'
    ).length == 0
  );
}
function check_test_03g() {
  refactoring_template_1(
    'a:not([href]),[role="link"]:not([href])',
    "03-G",
    "nia03g",
    "nth",
    "yellow",
    "Présence d'un lien sans destination"
  );
}
const nia03h_regexmail = /^((?=.+@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*(?:\.[A-Za-z]{2,}))$/;
const nia03h_regexphone = /^((\+|00)|\((\+|00)[0-9]{1,4}\))?[0-9+\-\s().]*$/;
function check_test_03h() {
  conditionObject.nia03h1 = condition_test_03h1;
  refactoring_template_2(
    '*:not(.mcgyver-slot) > a[href^="mailto:"]',
    "03-H",
    "nia03h1",
    "nth",
    "yellow",
    "Le texte d'un lien mailto correspond à l'adresse email pointé"
  );
  conditionObject.nia03h2 = condition_test_03h2;
  refactoring_template_2(
    '*:not(.mcgyver-slot) > a[href^="mailto:"]',
    "03-H",
    "nia03h2",
    "nc",
    "red",
    "Présence de liens mailto: non valide"
  );
  conditionObject.nia03h3 = condition_test_03h3;
  refactoring_template_2(
    '*:not(.mcgyver-slot) > a[href^="tel:"]',
    "03-H",
    "nia03h3",
    "nc",
    "red",
    "Présence de liens tel: non valide"
  );
  conditionObject.nia03h4 = condition_test_03h4;
  refactoring_template_2(
    '*:not(.mcgyver-slot) > a[href^="fax:"]',
    "03-H",
    "nia03h4",
    "nc",
    "red",
    "Présence de liens fax: non valide"
  );
}
function condition_test_03h1(node) {
  return Boolean(
    isItemVisible(node) && node.getAttribute("href") && node.getAttribute("href").replace("mailto:", "") != node.innerText
  );
}
function condition_test_03h2(node) {
  return Boolean(
    isItemVisible(node) && node.getAttribute("href") && !nia03h_regexmail.test(
      node.getAttribute("href").replace("mailto:", "")
    )
  );
}
function condition_test_03h3(node) {
  return Boolean(
    isItemVisible(node) && node.getAttribute("href") && !nia03h_regexphone.test(
      node.getAttribute("href").replace("tel:", "")
    )
  );
}
function condition_test_03h4(node) {
  return Boolean(
    isItemVisible(node) && node.getAttribute("href") && !nia03h_regexphone.test(
      node.getAttribute("href").replace("fax:", "")
    )
  );
}
function check_test_03i() {
  conditionObject.nia03i = condition_test_03i;
  refactoring_template_2(
    'html[lang="fr"] a',
    "03-I",
    "nia03i",
    "nth",
    "yellow",
    "Présence de liens non pertinents [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-libelle-de-chaque-lien-decrit-sa-fonction-ou-la-nature-du-contenu-vers-lequel-il-pointe' target='_blank'> Opquast 132</a>]"
  );
}
function condition_test_03i(node) {
  return Boolean(
    isItemVisible(node) && (node.innerHTML == "ici" || node.innerHTML == "cliquer ici" || node.innerHTML == "cliquez ici" || node.innerHTML == "lire la suite" || node.innerHTML == "lien")
  );
}
function check_test_03j() {
  if (!paramFilter.only_redactor) {
    let url = window.location.host;
    if (!url) {
      return "";
    }
    conditionObject.nia03j = condition_test_03j;
    refactoring_template_2(
      'a[href^="http"]:not([href*="' + url + '"]):not([target="_blank"])',
      "03-J",
      "nia03j",
      "nth",
      "orange",
      "Présence de liens externes qui s'ouvrent dans la fenêtre courante"
    );
  }
}
function condition_test_03j(node) {
  return Boolean(isItemVisible(node) && node.closest(".feed-wrapper") == null);
}
function check_test_03k() {
  if (paramPage.isAEM) {
    const nia03k_nodes = document.querySelectorAll(
      ".cmp-focus .focus-more.btn, .cmp-contentbox a.btn"
    );
    refactoring_template_4(
      nia03k_nodes && nia03k_nodes.length > 15 && isItemsVisible(nia03k_nodes),
      "03-K",
      "nth",
      "yellow",
      "Présence de trop de liens 'Pour en savoir plus'"
    );
  }
}
function check_test_03l() {
  conditionObject.nia03l = condition_test_03l;
  refactoring_template_2(
    'body *:not(a):not(mark):not(h1):not(h2):not(h3):not(h4):not(h5):not(h6):not(button):not([role="tab"]):not(input):not(li.nav-item--active)',
    "03-L",
    "nia03l",
    "nth",
    "yellow",
    "Réservez le soulignement aux liens"
  );
}
function condition_test_03l(node) {
  return Boolean(
    isItemVisible(node) && window.getComputedStyle(node).textDecorationLine == "underline" && node.closest("a") == null
  );
}
function check_test_03m() {
  refactoring_template_1(
    'a[href*=" "],[role="link"][href*=" "]',
    "03-M",
    "nia03n",
    "nth",
    "orange",
    "Présence d'un lien erroné (espace present dans l'attribut href)"
  );
}
function check_test_03n() {
  if (!paramFilter.only_redactor) {
    conditionObject.nia03n = condition_test_03n;
    refactoring_template_2(
      "main *:not(li.nav-item) > p:not(.nav-back) > a:not(.btn), main *:not(.cmp-autocompleteSearch__keywords) > li:not(.cmp-focus-list-item):not(.nav-item):not(.cmp-languagenavigation__item):not(.cmp-breadcrumb__item):not(.subnav-item):not(.cmp-grid__item ):not(.filter-item):not(.cmp-list__item):not(.pagination-page):not(.pagination-next):not(.pagination-prev) > a:not(.toc-anchor)",
      "03-N",
      "nia03n",
      "man",
      "yellow",
      "Présence d'un lien non souligné, vérifier son contraste avec le texte environnant"
    );
  }
}
function condition_test_03n(node) {
  return Boolean(
    isItemVisible(node) && isItemHasVisibleContent(node) && isItemHasDirectContent(node) && window.getComputedStyle(node).textDecorationLine != "underline"
  );
}
function check_test_03o() {
  if (!paramFilter.only_redactor && paramPage.isAEM && !paramPage.isPreview) {
    conditionObject.nia03o = condition_test_03o;
    refactoring_template_2(
      "a",
      "03-O",
      "nia03o",
      "man",
      "orange",
      "Présence d'un lien vers un environnement de test"
    );
  }
}
function condition_test_03o(node) {
  return Boolean(
    isItemVisible(node) && node.hasAttribute("href") && node.getAttribute("href").includes("wcm-")
  );
}
const nia03p_regex = /^.+ \((?:[A-Z]{2}, )?[A-Za-z]+, \d{1,4},\d{1,2} [A-Za-z]{2}\)$/g;
function check_test_03p() {
  if (!paramFilter.only_redactor && paramPage.isAEM) {
    conditionObject.nia03p = condition_test_03p;
    refactoring_template_2(
      "a",
      "03-P",
      "nia03p",
      "nth",
      "yellow",
      "Formalisme des liens de téléchargement : name (FR, Pdf ,poids)"
    );
  }
}
function condition_test_03p(node) {
  return Boolean(
    isItemVisible(node) && node.hasAttribute("href") && (node.getAttribute("href").includes(".pdf") || node.getAttribute("href").includes(".doc") || node.getAttribute("href").includes(".xls")) && nia03p_regex.test(node.getAttribute("href") || "")
  );
}
function check_test_03q() {
  const nia03q_nodes = document.querySelectorAll("a[href]");
  let nia03q_flag = false;
  let nia03q_content;
  let nia03q_array = [];
  if (nia03q_nodes && nia03q_nodes.length > 0 && isItemsVisible(nia03q_nodes)) {
    for (let i = 0; i < nia03q_nodes.length; i++) {
      nia03q_content = nia03q_nodes[i].textContent;
      if (nia03q_nodes[i].hasAttribute("aria-label") && nia03q_nodes[i].hasAttribute("title") && nia03q_nodes[i].getAttribute("title") != nia03q_nodes[i].getAttribute("aria-label"))
        nia03q_content += " " + nia03q_nodes[i].getAttribute("title") + " " + nia03q_nodes[i].getAttribute("aria-label");
      else if (nia03q_nodes[i].hasAttribute("aria-label") && nia03q_nodes[i].hasAttribute("title") && nia03q_nodes[i].getAttribute("title") == nia03q_nodes[i].getAttribute("aria-label"))
        nia03q_content += " " + nia03q_nodes[i].getAttribute("title");
      else if (nia03q_nodes[i].hasAttribute("title"))
        nia03q_content += " " + nia03q_nodes[i].getAttribute("title");
      else if (nia03q_nodes[i].hasAttribute("aria-label"))
        nia03q_content += " " + nia03q_nodes[i].getAttribute("aria-label");
      if (nia03q_array.indexOf({
        content: nia03q_content,
        target: nia03q_nodes[i].getAttribute("href")
      }) >= 0) {
        nia03q_flag = true;
        setItemOutline(nia03q_nodes[i], "red", "nia03q", "03-Q");
      } else {
        nia03q_array.push({
          content: nia03q_content,
          target: nia03q_nodes[i].getAttribute("href")
        });
      }
    }
  }
  if (nia03q_flag == true) {
    setItemToResultList(
      "dev",
      "<li><a href='#' data-destination='nia03q' class='result-focus label-red'>03-Q</a> : Présence de liens avec un contenu identique (titre + aria-label) et des cibles différentes</li>"
    );
  }
}
function check_part_03() {
  if (paramFilter.debug_flag) console.log("03 Liens");
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
  refactoring_template_1(
    'input[name="name"]:not([autocomplete="family-name"]):not([autocomplete^="section-"][autocomplete$="family-name"]), input[name="lastname"]:not([autocomplete="family-name"]):not([autocomplete^="section-"][autocomplete$="family-name"])',
    "04-A",
    "nia04a1",
    "nc",
    "red",
    "Absence d'attribut autocomplete ou attribut erroné sur des champs formulaire (name) - utiliser 'family-name' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]"
  );
  refactoring_template_1(
    'input[name="firstname"]:not([autocomplete="given-name"]):not([autocomplete^="section-"][autocomplete$="given-name"])',
    "04-A",
    "nia04a2",
    "nc",
    "red",
    "Absence d'attribut autocomplete ou attribut erroné sur des champs formulaire (firstname) - utiliser 'given-name' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]"
  );
  refactoring_template_1(
    'input[type="email"]:not([autocomplete="email"]):not([autocomplete^="section-"][autocomplete$="email"]):not([autocomplete="work email"])',
    "04-A",
    "nia04a3",
    "nc",
    "red",
    "Absence d'attribut autocomplete ou attribut erroné sur des champs formulaire (email) - utiliser 'email' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]"
  );
  refactoring_template_1(
    'input[type="tel"]:not([autocomplete="tel"]):not([autocomplete^="section-"][autocomplete$="tel"]):not([autocomplete="fax tel"]):not([autocomplete="home tel"]):not([autocomplete="mobile tel"]):not([autocomplete="work tel"]), input[name="phone"]:not([autocomplete="tel"]):not([autocomplete^="section-"][autocomplete$="tel"]):not([autocomplete="fax tel"]):not([autocomplete="home tel"]):not([autocomplete="mobile tel"]):not([autocomplete="work tel"])',
    "04-A",
    "nia04a4",
    "nc",
    "red",
    "Absence d'attribut autocomplete ou attribut erroné sur des champs formulaire (phone) - utiliser 'tel' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]"
  );
  refactoring_template_1(
    'input[name="postal"]:not([autocomplete="postal-code"]):not([autocomplete^="section-"][autocomplete$="postal-code"]),input[type="postal-code"]:not([autocomplete="postal-code"]):not([autocomplete^="section-"][autocomplete$="postal-code"])',
    "04-A",
    "nia04a5",
    "nc",
    "red",
    "Absence d'attribut autocomplete ou attribut erroné sur des champs formulaire (postal) - utiliser 'postal-code' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]"
  );
  refactoring_template_1(
    'input[name="country"]:not([autocomplete="country-name"]):not([autocomplete^="section-"][autocomplete$="country-name"]), select[name="country"]:not([autocomplete="country"]):not([autocomplete^="section-"][autocomplete$="country"])',
    "04-A",
    "nia04a6",
    "nc",
    "red",
    "Absence d'attribut autocomplete ou attribut erroné sur des champs formulaire (country) - utiliser 'country-name' ou 'country' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]"
  );
  refactoring_template_1(
    'input[name="matricule"][autocomplete]',
    "04-A",
    "nia04a7",
    "nc",
    "red",
    "Attribut erroné sur des champs formulaire (matricule) - Enlever l'attribut [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]"
  );
  refactoring_template_1(
    'input[name="city"]:not([autocomplete="address-level2"]):not([autocomplete^="section-"][autocomplete$="address-level2"]), input[name="ville"]:not([autocomplete="address-level2"]):not([autocomplete^="section-"][autocomplete$="address-level2"])',
    "04-A",
    "nia04a8",
    "nc",
    "red",
    "Absence d'attribut autocomplete ou attribut erroné sur des champs formulaire (ville) - Utiliser 'address-level2' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]"
  );
  refactoring_template_1(
    'textarea[name="adresse"]:not([autocomplete="street-address"]):not([autocomplete^="section-"][autocomplete$="street-address"]), input[name="adresse"]:not([autocomplete="street-address"]):not([autocomplete^="section-"][autocomplete$="street-address"]), input[name="street"]:not([autocomplete="street-address"]):not([autocomplete^="section-"][autocomplete$="street-address"])',
    "04-A",
    "nia04a9",
    "nc",
    "red",
    "Absence d'attribut autocomplete ou attribut erroné sur des champs formulaire (adresse) - Utiliser 'street-address' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]"
  );
  refactoring_template_1(
    'input[name="organisation"]:not([autocomplete="organization"]):not([autocomplete^="section-"][autocomplete$="organization"]), input[name="organization"]:not([autocomplete="organization"]):not([autocomplete^="section-"][autocomplete$="organization"]),input[name="organism"]:not([autocomplete="organization"]):not([autocomplete^="section-"][autocomplete$="organization"])',
    "04-A",
    "nia04a10",
    "nc",
    "red",
    "Absence d'attribut autocomplete ou attribut erroné sur des champs formulaire (organisation) - utiliser 'organization' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]"
  );
  refactoring_template_1(
    'input[name="fonction"]:not([autocomplete="organization-title"]):not([autocomplete^="section-"][autocomplete$="organization-title"]), input[name="function"]:not([autocomplete="organization-title"]):not([autocomplete^="section-"][autocomplete$="organization-title"])',
    "04-A",
    "nia04a11",
    "nc",
    "red",
    "Absence d'attribut autocomplete ou attribut erroné sur des champs formulaire (function) - utiliser 'organization-title' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]"
  );
  if (paramPage.isCTIE) {
    refactoring_template_1(
      '[autocomplete="name"],[autocomplete="honorific-suffix"],[autocomplete="nickname"],[autocomplete="address-level1"],[autocomplete="address-level3"],[autocomplete="address-level4"],[autocomplete="cc-name"],[autocomplete="cc-given-name"],[autocomplete="cc-additional-name"],[autocomplete="cc-number"],[autocomplete="cc-exp"],[autocomplete="cc-exp-month"],[autocomplete="cc-exp-year"],[autocomplete="cc-csc"],[autocomplete="cc-type"],[autocomplete="transaction-currency"],[autocomplete="transaction-amount"],[autocomplete="language"],[autocomplete="bday-day"],[autocomplete="bday-month"],[autocomplete="bday-year"],[autocomplete="sex"],[autocomplete="photo"],[autocomplete="tel-area-code"],[autocomplete="tel-local"],[autocomplete="tel-local-prefix"],[autocomplete="tel-local-suffix"],[autocomplete="tel-extension"],[autocomplete="impp"]',
      "04-A",
      "nia04a12",
      "man",
      "yellow",
      "Présence d'attribut autocomplete vraisemblablement erronée sur des champs formulaire [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]"
    );
  }
}
const nia04b_regex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
function check_test_04b() {
  conditionObject.nia04b = condition_test_04b;
  refactoring_template_2(
    'input[type="email"]',
    "04-B",
    "nia04b",
    "nc",
    "red",
    "Présence de champs email sans indication de format [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-10-5' target='_blank'>RAWeb 11.10.5</a>]"
  );
}
function condition_test_04b(node) {
  return Boolean(
    isItemVisible(node) && (node.hasAttribute("id") && node.getAttribute("id") != "" && !document.querySelector(
      "label[for='" + node.getAttribute("id") + "']"
    ) && document.querySelector(
      "label[for='" + node.getAttribute("id") + "']"
    ).innerText.match(nia04b_regex) || node.hasAttribute("aria-describedby") && node.getAttribute("aria-describedby") != "" && !document.querySelector(
      "[id=" + node.getAttribute("aria-describedby") + "]"
    ) && document.querySelector(
      "[id=" + node.getAttribute("aria-describedby") + "]"
    ).innerText.match(nia04b_regex))
  );
}
function check_test_04c() {
  if (paramPage.isAEM) {
    conditionObject.nia04c = condition_test_04c;
    refactoring_template_2(
      'html[lang="fr"] main form[action*="support/contact"] button.cmp-form-button[type="SUBMIT"][name="preview"]',
      "04-C",
      "nia04c",
      "nth",
      "yellow",
      `Vérifier si le bouton de soumission possède bien l'intitulé "Prévisualiser puis envoyer" [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-12-1' target='_blank'>RAWeb 11.12.1</a>]`
    );
  }
}
function condition_test_04c(node) {
  return Boolean(
    isItemVisible(node) && node.textContent && node.textContent != "Prévisualiser puis envoyer"
  );
}
function check_test_04d() {
  const nia04d_nodes = document.querySelectorAll(
    "input:not([aria-label]):not([aria-labelledby]):not([type='hidden']):not([type='submit']):not([type='reset']):not([type='button']), select:not([aria-label]):not([aria-labelledby]), textarea:not([aria-label]):not([aria-labelledby])"
  );
  let nia04d_flag1 = false;
  let nia04d_flag2 = false;
  let nia04d_label, nia04d_id;
  if (nia04d_nodes && nia04d_nodes.length > 0) {
    for (let i = 0; i < nia04d_nodes.length; i++) {
      if (isItemVisible(nia04d_nodes[i])) {
        nia04d_id = nia04d_nodes[i].getAttribute("id");
        if (!nia04d_id || nia04d_id == "") {
          setItemOutline(nia04d_nodes[i], "red", "nia04d", "04-D");
          nia04d_flag1 = true;
        } else {
          nia04d_label = document.querySelectorAll(
            "label[for='" + nia04d_id + "']"
          );
          if (!nia04d_label || nia04d_label.length == 0) {
            setItemOutline(nia04d_nodes[i], "red", "nia04d", "04-D");
            nia04d_flag1 = true;
          } else if (nia04d_label.length > 1) {
            setItemOutline(nia04d_nodes[i], "red", "nia04d", "04-D");
            nia04d_flag2 = true;
          }
        }
      }
    }
  }
  if (nia04d_flag1 == true) {
    setItemToResultList(
      "nc",
      "<li><a href='#' data-destination='nia04d' class='result-focus label-red'>04-D</a> : Présence de champs sans label [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-1-1' target='_blank'>RAWeb 11.1.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-champ-de-formulaire-est-associe-dans-le-code-source-a-une-etiquette-qui-lui-est-propre' target='_blank'>Opquast 67</a>]</li>"
    );
  }
  if (nia04d_flag2 == true) {
    setItemToResultList(
      "nc",
      "<li><a href='#' data-destination='nia04d' class='result-focus label-red'>04-D</a> : Présence de champs avec plus d'un label [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-1-1' target='_blank'>RAWeb 11.1.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-champ-de-formulaire-est-associe-dans-le-code-source-a-une-etiquette-qui-lui-est-propre' target='_blank'>Opquast 67</a>]</li>"
    );
  }
}
function check_test_04e() {
  conditionObject.nia04e = condition_test_04e;
  refactoring_template_2(
    "fieldset",
    "04-E",
    "nia04e",
    "nc",
    "red",
    "Absence de la légende dans un fieldset [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-6-1' target='_blank'>RAWeb 11.6.1</a>]"
  );
}
function condition_test_04e(node) {
  return Boolean(
    isItemVisible(node) && !(node.firstElementChild && node.firstElementChild.tagName && node.firstElementChild.tagName == "LEGEND" || node.firstElementChild && node.firstElementChild.firstElementChild && node.firstElementChild.firstElementChild.tagName && node.firstElementChild.firstElementChild.tagName == "LEGEND" || node.firstElementChild && sanitizeText(node.firstElementChild.textContent, "fr") == "" && node.firstElementChild.nextSibling && node.firstElementChild.nextSibling.tagName == "LEGEND")
  );
}
function check_test_04f() {
  if (!paramFilter.only_redactor && paramPage.isAEM) {
    const nia04f_nodes = document.querySelectorAll(
      'form [required]:not([required="false"]), form [aria-required="true"]'
    );
    const nia04f_desc = document.querySelectorAll(
      ".cmp-ratings, .cmp-form__mandatory-text, .mandatory-label"
    );
    let nia04f_flag = false;
    let nia04f_id, nia04f_label;
    let nia04f_fieldset, nia04f_legend;
    if (nia04f_nodes && nia04f_nodes.length > 0) {
      for (let i = 0; i < nia04f_nodes.length; i++) {
        if (isItemVisible(nia04f_nodes[i])) {
          if (nia04f_nodes[i].parentElement && nia04f_nodes[i].parentElement.tagName != "LABEL" && nia04f_nodes[i].getAttribute("type") != "checkbox" && nia04f_nodes[i].getAttribute("type") != "radio") {
            nia04f_id = nia04f_nodes[i].getAttribute("id");
            if (!nia04f_id || nia04f_id == "") {
              setItemOutline(nia04f_nodes[i], "red", "nia04f", "04-F");
              nia04f_flag = true;
            } else {
              nia04f_label = document.querySelectorAll(
                "label[for='" + nia04f_id + "']"
              );
              if (!nia04f_label || nia04f_label.length == 0) {
                setItemOutline(nia04f_nodes[i], "red", "nia04f", "04-F");
                nia04f_flag = true;
              } else if (!nia04f_label[0].textContent.includes("*")) {
                setItemOutline(nia04f_nodes[i], "red", "nia04f", "04-F");
                nia04f_flag = true;
              }
            }
          } else {
            nia04f_fieldset = nia04f_nodes[i].closest(
              "fieldset.cmp-form-options"
            );
            if (!nia04f_fieldset || nia04f_fieldset == null) {
              if (nia04f_nodes[i].parentElement && nia04f_nodes[i].parentElement.textContent && !nia04f_nodes[i].parentElement.textContent.includes("*")) {
                setItemOutline(nia04f_nodes[i], "red", "nia04f", "04-F");
                nia04f_flag = true;
              }
            } else {
              nia04f_legend = nia04f_fieldset.getElementsByTagName("legend");
              if (!nia04f_legend || nia04f_legend.length != 1) {
                setItemOutline(nia04f_nodes[i], "red", "nia04f", "04-F");
                nia04f_flag = true;
              } else if (!nia04f_legend[0].textContent.includes("*")) {
                setItemOutline(nia04f_nodes[i], "red", "nia04f", "04-F");
                nia04f_flag = true;
              }
            }
          }
        }
      }
      if (nia04f_desc.length == 0) {
        setItemToResultList(
          "nc",
          "<li><span class='result-focus label-red'>04-F</span> : Absence d'indication de la signification de l'astérisque sur un champ obligatoire [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-10-1' target='_blank'>RAWeb 11.10.1</a>]</li>"
        );
      }
    }
    if (nia04f_flag == true) {
      setItemToResultList(
        "nc",
        "<li><a href='#' data-destination='nia04f' class='result-focus label-red'>04-F</a> : Absence d'astérisque sur un champ obligatoire [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-10-1' target='_blank'>RAWeb 11.10.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/letiquette-de-chaque-champ-de-formulaire-indique-si-la-saisie-est-obligatoire' target='_blank'>Opquast 69</a>]'</li>"
      );
    }
  }
}
function check_test_04g() {
  refactoring_template_1(
    'input[type="checkbox"][autocomplete]:not([autocomplete="off"]),input[type="radio"][autocomplete]:not([autocomplete="off"])',
    "04-G",
    "nia04g",
    "nc",
    "red",
    "Présence d'autocomplete sur un champ de type 'checkbox' ou 'Radiobutton' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]"
  );
}
function check_test_04h() {
  if (!paramFilter.only_redactor) {
    const nia04h_nodes = document.querySelectorAll(
      'input[id]:not([type="button"]):not([type="reset"]):not([type="submit"]),select[id],textarea[id]'
    );
    let nia04h_flag = false;
    let nia04h_id, nia04h_label;
    if (nia04h_nodes && nia04h_nodes.length > 0) {
      for (let i = 0; i < nia04h_nodes.length; i++) {
        if (isItemVisible(nia04h_nodes[i])) {
          nia04h_id = nia04h_nodes[i].getAttribute("id");
          if (!nia04h_id || nia04h_id == "") {
            setItemOutline(nia04h_nodes[i], "orange", "nia04h", "04-H");
            nia04h_flag = true;
          } else {
            nia04h_label = document.querySelectorAll(
              "label[for='" + nia04h_id + "']"
            );
            if (!nia04h_label || nia04h_label.length == 0) {
              setItemOutline(nia04h_nodes[i], "orange", "nia04h", "04-H");
              nia04h_flag = true;
            } else if (isItemVisible(nia04h_label[0]) && !isItemSROnly(nia04h_label[0])) {
              let nia04h_distance_vertical = getDistanceBetweenVerticalElements(
                nia04h_nodes[i],
                nia04h_label[0]
              );
              let nia04h_distance_horizontal = getDistanceBetweenHorizontalElements(
                nia04h_nodes[i],
                nia04h_label[0]
              );
              if (nia04h_distance_vertical > 100 && nia04h_distance_horizontal > 100) {
                if (paramFilter.debug_flag)
                  console.log(
                    "[nia04h] distance : [" + nia04h_distance_horizontal + ":" + nia04h_distance_vertical + "]"
                  );
                if (nia04h_nodes[i].parentElement == nia04h_label[0] && nia04h_label[0].firstElementChild != null) {
                  let nia04h_distance_wrapper = getDistanceBetweenHorizontalElements(
                    nia04h_nodes[i],
                    nia04h_label[0].firstElementChild
                  );
                  if (paramFilter.debug_flag)
                    console.log(
                      "[nia04h] wrap distance : [" + nia04h_distance_wrapper + "]"
                    );
                  if (nia04h_distance_wrapper > 100) {
                    setItemOutline(nia04h_nodes[i], "orange", "nia04h", "04-H");
                    nia04h_flag = true;
                  }
                } else {
                  setItemOutline(nia04h_nodes[i], "orange", "nia04h", "04-H");
                  nia04h_flag = true;
                }
              }
            }
          }
        }
      }
    }
    if (nia04h_flag == true) {
      setItemToResultList(
        "nc",
        "<li><a href='#' data-destination='nia04h' class='result-focus label-orange'>04-H</a> : Le Champ et l'étiquette doivent être accolé [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-5-1' target='_blank'>RAWeb 11.5.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-etiquette-de-formulaire-est-visuellement-rattachee-au-champ-quelle-decrit' target='_blank'>Opquast 75</a>]</li>"
      );
    }
  }
}
function getPositionAtTopRight(e) {
  let rect;
  if (e.nodeName != "#text") {
    rect = e.getBoundingClientRect();
  } else {
    const range = document.createRange();
    range.selectNode(e);
    rect = range.getBoundingClientRect();
  }
  return { x: rect.left + rect.width, y: rect.top };
}
function getPositionAtTopLeft(e) {
  let rect;
  if (e.nodeName != "#text") {
    rect = e.getBoundingClientRect();
  } else {
    const range = document.createRange();
    range.selectNode(e);
    rect = range.getBoundingClientRect();
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
  if (!paramFilter.only_redactor) {
    conditionObject.nia04i = condition_test_04i;
    refactoring_template_2(
      "input[aria-describedby]",
      "04-A",
      "nia04i",
      "nc",
      "red",
      "Présence d'attribut aria-describedby non lié à un texte d'aide [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-informations-completant-letiquette-dun-champ-sont-associees-a-celui-ci-dans-le-code-source' target='_blank'>Opquast 68</a>]"
    );
  }
}
function condition_test_04i(node) {
  return Boolean(
    isItemVisible(node) && (!node.hasAttribute("aria-describedby") || node.getAttribute("aria-describedby").trim() == "" || !document.querySelectorAll(
      "[id='" + node.getAttribute("aria-describedby") + "']"
    ) || document.querySelectorAll(
      "[id='" + node.getAttribute("aria-describedby") + "']"
    ).length != 1)
  );
}
function check_test_04j() {
  const nia04j_nodes = document.querySelectorAll(
    "input[type='email']:not([aria-describedby]), input[type='tel']:not([aria-describedby]), input[pattern]:not([aria-describedby]):not([pattern='.*\\\\S.*'])"
  );
  let nia04j_flag = false;
  let nia04j_label, nia04j_id;
  if (nia04j_nodes && nia04j_nodes.length > 0) {
    for (let i = 0; i < nia04j_nodes.length; i++) {
      if (isItemVisible(nia04j_nodes[i])) {
        nia04j_id = nia04j_nodes[i].getAttribute("id");
        if (!nia04j_id || nia04j_id == "") {
          setItemOutline(nia04j_nodes[i], "red", "nia04j", "04-J");
          nia04j_flag = true;
        } else {
          nia04j_label = document.querySelectorAll("[for='" + nia04j_id + "']");
          if (!nia04j_label || nia04j_label.length != 1) {
            setItemOutline(nia04j_nodes[i], "red", "nia04j", "04-J");
            nia04j_flag = true;
          } else if (nia04j_label[0].innerText.indexOf("@") < 0) {
            setItemOutline(nia04j_nodes[i], "red", "nia04j", "04-J");
            nia04j_flag = true;
          }
        }
      }
    }
  }
  if (nia04j_flag == true) {
    setItemToResultList(
      "nc",
      "<li><a href='#' data-destination='nia04j' class='result-focus label-red'>04-J</a> : Absence du format de saisie dans un texte d'aide [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-format-de-saisie-des-champs-de-formulaire-qui-le-necessitent-est-indique' target='_blank'>Opquast 70</a>]</li>"
    );
  }
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
  if (paramPage.isAEM) {
    conditionObject.nia04k = condition_test_04k;
    refactoring_template_2(
      'html[lang="fr"] input[type="submit"], html[lang="fr"] input[type="reset"], html[lang="fr"] input[type="button"]',
      "04-K",
      "nia04k",
      "nth",
      "yellow",
      "Présence de label de bouton insuffisament pertinent"
    );
  }
}
function condition_test_04k(node) {
  return Boolean(
    isItemVisible(node) && node.textContent && nia04k_array.includes(node.textContent)
  );
}
function check_test_04l() {
  if (!paramFilter.only_nc) {
    const nia04l_nodes = document.querySelectorAll(
      "*:not(.filter-search-bar) > form"
    );
    let nia04l_flag = false;
    let nia04l_childs, nia04l_lastchilds;
    if (nia04l_nodes && nia04l_nodes.length > 0) {
      for (let i = 0; i < nia04l_nodes.length; i++) {
        if (isItemVisible(nia04l_nodes[i])) {
          nia04l_childs = nia04l_nodes[i].querySelectorAll("input , button");
          nia04l_lastchilds = nia04l_childs[nia04l_childs.length - 1];
          if (nia04l_lastchilds.tagName == "BUTTON" || nia04l_lastchilds.tagName == "INPUT" && (nia04l_lastchilds.getAttribute("type") == "SUBMIT" || nia04l_lastchilds.getAttribute("type") == "RESET" || nia04l_lastchilds.getAttribute("type") == "BUTTON")) ;
          else {
            setItemOutline(nia04l_nodes[i], "yellow", "nia04l", "04-L");
            nia04l_flag = true;
          }
        }
      }
    }
    if (nia04l_flag == true) {
      setItemToResultList(
        "nth",
        "<li><a href='#' data-destination='nia04l' class='result-focus label-yellow'>04-L</a> : Formulaire avec bouton de soumission mal placé </li>"
      );
    }
  }
}
function check_test_04m() {
  if (!paramFilter.only_redactor) {
    conditionObject.nia04m = condition_test_04m;
    refactoring_template_2(
      'input[type="checkbox"],input[type="radio"]',
      "04-M",
      "nia04m",
      "man",
      "orange",
      "Un groupe de Checkbox/Radio doit être structuré dans un fieldset"
    );
  }
}
function condition_test_04m(node) {
  return Boolean(
    isItemVisible(node) && node.parentElement && !node.parentElement.closest("fieldset") && node.parentElement.closest("cmp-form-options") && node.parentElement.closest("cmp-form-options").querySelectorAll('input[type="checkbox"],input[type="radio"]').length > 1
  );
}
function check_test_04n() {
  const nia04n_nodes = document.querySelectorAll(
    "input[type='text'].datepicker:not([aria-describedby]), input[type='text'][pattern='([0-9]{2}-){2}[0-9]{4}']:not([aria-describedby])"
  );
  let nia04n_flag = false;
  let nia04n_label, nia04n_id;
  if (nia04n_nodes && nia04n_nodes.length > 0) {
    for (let i = 0; i < nia04n_nodes.length; i++) {
      if (isItemVisible(nia04n_nodes[i])) {
        nia04n_id = nia04n_nodes[i].getAttribute("id");
        if (!nia04n_id || nia04n_id == "") {
          setItemOutline(nia04n_nodes[i], "red", "nia04n", "04-N");
          nia04n_flag = true;
        } else {
          nia04n_label = document.querySelectorAll("[for='" + nia04n_id + "']");
          if (!nia04n_label || nia04n_label.length != 1) {
            setItemOutline(nia04n_nodes[i], "red", "nia04n", "04-N");
            nia04n_flag = true;
          } else if (nia04n_label[0].innerText.indexOf("(") < 0) {
            setItemOutline(nia04n_nodes[i], "red", "nia04n", "04-N");
            nia04n_flag = true;
          }
        }
      }
    }
  }
  if (nia04n_flag == true) {
    setItemToResultList(
      "nc",
      "<li><a href='#' data-destination='nia04n' class='result-focus label-red'>04-N</a> : Absence du format de saisie dans un datepicker [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-format-de-saisie-des-champs-de-formulaire-qui-le-necessitent-est-indique' target='_blank'>Opquast 70</a>]</li>"
    );
  }
}
function check_test_04o() {
  refactoring_template_1(
    'input[name="email"]:not([type="email"])',
    "04-O",
    "nia04o1",
    "nc",
    "red",
    "Type de champ erroné sur des champs formulaire (email) - utiliser type='email'"
  );
  refactoring_template_1(
    'input[name="tel"]:not([type="tel"]), input[name="phone"]:not([type="tel"])',
    "04-O",
    "nia04o2",
    "nc",
    "red",
    "Type de champ erroné sur des champs formulaire (tel) - utiliser type='tel'"
  );
  refactoring_template_1(
    'input[name*="date"]:not([type="date"])',
    "04-O",
    "nia04o2",
    "nth",
    "yellow",
    "Type de champ à vérifier sur des champs formulaire (datepicker) - utiliser type='date'"
  );
}
function check_test_04p() {
  refactoring_template_1(
    "input[max-lenght],textarea[max-lenght]",
    "04-P",
    "nia04p",
    "nth",
    "yellow",
    "Présence d'un attribut max-lenght sur un champ de saisi. Cela peut poser des problèmes pour le copier/coller de valeur"
  );
}
function check_part_04() {
  if (paramFilter.debug_flag) console.log("04 Formulaire");
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
  conditionObject.nia05a = condition_test_05a;
  refactoring_template_2(
    '*:not(.ol-attribution) > :where(p, th, strong, em, a, q, blockquote, aside, ul, li, dl, dd, dt):not([aria-hidden="true"]):not(.mapboxgl-ctrl-logo):not(.at):not(.sr-only):empty',
    "05-A",
    "nia05a",
    "nc",
    "orange",
    "Présence de balises vides [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-9-1' target='_blank'>RAWeb 8.9.1</a>]"
  );
}
function condition_test_05a(node) {
  return Boolean(isItemVisible(node) && node.childElementCount == 0);
}
function check_test_05b() {
  conditionObject.nia05b = condition_test_05b;
  refactoring_template_2(
    '*:not(.ol-attribution):not([aria-hidden="true"]):not(.pagination-page) > :where(p, th, strong, em, a, q, blockquote, aside, ul, li, dl, dd, dt):not([aria-hidden="true"]):not(.mapboxgl-ctrl-logo):not(:empty)',
    "05-B",
    "nia05b",
    "nc",
    "orange",
    "Présence de balises vides (ou avec un contenu assimilable à vide) [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-9-1' target='_blank'>RAWeb 8.9.1</a>]"
  );
}
function condition_test_05b(node) {
  return Boolean(
    isItemVisible(node) && node.childElementCount == 0 && sanitizeText(
      cleanNode(node).innerText,
      node.closest("[lang]").getAttribute("lang")
    ) == ""
  );
}
function check_test_05c() {
  if (!paramFilter.only_redactor) {
    const nia05c_doctype = new XMLSerializer().serializeToString(
      document.doctype
    );
    refactoring_template_4(
      nia05c_doctype != "<!DOCTYPE html>",
      "05-C",
      "dev",
      "orange",
      "Vérifier qu'un doctype est correctement déclaré [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-1-1' target='_blank'>RAWeb 8.1.1</a>]"
    );
  }
}
function check_test_05d() {
  refactoring_template_4(
    document.title == "",
    "05-D",
    "nc",
    "red",
    "Vérifier qu'un titre de page est défini [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-5-1' target='_blank'>RAWeb 8.5.1</a>]"
  );
}
function check_test_05e() {
  if (!paramFilter.only_redactor) {
    refactoring_template_1(
      '[dir]:not([dir="rtl"]):not([dir="ltr"]):not([dir="auto"])',
      "05-E",
      "nia05e1",
      "nc",
      "red",
      "Vérifier la valeur de définition du sens de lecture [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-10-2' target='_blank'>RAWeb 8.10.2</a>]"
    );
    conditionObject.nia05e = condition_test_05e;
    refactoring_template_2(
      '[dir="rtl"]',
      "05-E",
      "nia05e2",
      "nc",
      "red",
      "Présence d'élément avec un sens de lecture de droite vers la gauche [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-10-2' target='_blank'>RAWeb 8.10.2</a>]"
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
function condition_test_05e(node) {
  return Boolean(
    isItemVisible(node) && node.closest("[lang]") && nia05e2_rtl_isocode.indexOf(
      node.closest("[lang]").getAttribute("lang") || ""
    ) < 0
  );
}
function check_test_05f() {
  if (!paramFilter.only_redactor) {
    const nia05f_nodes = document.querySelectorAll(
      "[id]:not(script):not(link)"
    );
    let nia05f_ids = [];
    let nia05f_index;
    let nia05f_currentId;
    if (nia05f_nodes && nia05f_nodes.length > 0) {
      for (let i = 0; i < nia05f_nodes.length; i++) {
        nia05f_currentId = nia05f_nodes[i].id ? nia05f_nodes[i].id : "undefined";
        if (nia05f_currentId.indexOf("language-") != 0 && nia05f_currentId.indexOf("-") != 0) {
          nia05f_index = nia05f_ids.findIndex((x) => x.id === nia05f_currentId);
          if (nia05f_index >= 0 && nia05f_ids[nia05f_index]) {
            if (paramFilter.debug_flag) {
              console.log(nia05f_ids);
              console.log(nia05f_index);
            }
            nia05f_ids[nia05f_index].occurrence++;
          } else {
            nia05f_ids.push({ id: nia05f_currentId, occurrence: 1 });
          }
        }
      }
    }
  }
}
function check_test_05g() {
  if (paramPage.isCTIE && !paramFilter.only_redactor) {
    refactoring_template_3(
      "#govbar.govbar",
      "05-G",
      "nth",
      "gray",
      "Absence de la govbar, vérifier si ce n'est pas un oubli"
    );
    refactoring_template_1(
      'html[lang="fr"] #govbar.govbar[lang]:not([lang="fr"])',
      "05-G",
      "nia05g2",
      "nth",
      "yellow",
      "Problème de traduction dans la Govbar"
    );
    refactoring_template_1(
      'html[lang="en"] #govbar.govbar[lang]:not([lang="en"])',
      "05-G",
      "nia05g3",
      "nth",
      "yellow",
      "Problème de traduction dans la Govbar"
    );
    refactoring_template_1(
      'html[lang="de"] #govbar.govbar[lang]:not([lang="de"])',
      "05-G",
      "nia05g4",
      "nth",
      "yellow",
      "Problème de traduction dans la Govbar"
    );
    refactoring_template_1(
      'html:not([lang="fr"]):not([lang="en"]):not([lang="de"]) #govbar.govbar[lang]:not([lang="fr"])',
      "05-G",
      "nia05g5",
      "nth",
      "yellow",
      "Problème de traduction dans la Govbar"
    );
  }
}
function check_test_05h() {
  conditionObject.nia05h = condition_test_05h;
  refactoring_template_2(
    "br + br",
    "05-H",
    "nia05h",
    "nc",
    "red",
    "Présence de multiple saut de ligne [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-9-1' target='_blank'>RAWeb 8.9.1</a>], privilégier l'utilisation du composant separator"
  );
}
function condition_test_05h(node) {
  return Boolean(
    isItemVisible(node) && (node.previousSibling && node.previousSibling.nodeName == "BR" || node.previousSibling && node.previousSibling.previousSibling && node.previousSibling.previousSibling.nodeName == "BR" && (node.previousSibling.nodeName == "#text" || node.previousSibling.nodeName == "#comment") && (node.previousSibling.textContent == " " || node.previousSibling.textContent == ""))
  );
}
function check_test_05i() {
  if (!paramPage.isSearchLogic && !paramPage.isSitemap) {
    refactoring_template_3(
      'meta[name="description"]',
      "05-I",
      "nth",
      "yellow",
      "Absence de métadonnée qui en décrit le contenu [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-code-source-de-chaque-page-contient-une-metadonnee-qui-en-decrit-le-contenu' target='_blank'>Opquast 3</a>]"
    );
  }
}
function check_test_05j() {
  refactoring_template_3(
    "link[rel*='icon']",
    "05-J",
    "nth",
    "yellow",
    "Absence de Favicon [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-code-source-des-pages-contient-un-appel-valide-a-un-icone-de-favori' target='_blank'>Opquast 99</a>]"
  );
}
function check_test_05k() {
  if (!paramPage.isHomepage && !paramFilter.only_redactor && paramPage.isAEM) {
    refactoring_template_3(
      ".cmp-breadcrumb,.cmp-breadcrumb-demarches",
      "05-K",
      "nth",
      "yellow",
      "Absence de Fils d'Ariane [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-page-affiche-une-information-permettant-de-connaitre-son-emplacement-dans-larborescence-du-site' target='_blank'>Opquast 151</a>]"
    );
  }
}
function check_test_05l() {
  if (!paramFilter.only_redactor) {
    const nia05l_node = document.querySelector("summary");
    if (nia05l_node) {
      nia05l_node.addEventListener("focus", (e) => {
        if (window.getComputedStyle(e.target).outline == "0") {
          setItemOutline(nia05l_node, "red", "nia05l", "05-L");
          setItemToResultList(
            "dev",
            "<li><a href='#' data-destination='nia05l' class='result-focus label-red'>05-L</a> : Le focus clavier est supprimé d'un élément accordéon [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-focus-clavier-nest-ni-supprime-ni-masque' target='_blank'>Opquast 160</a>]</li>"
          );
        }
      });
      nia05l_node.focus();
    }
  }
}
function check_test_05m() {
  conditionObject.nia05m = condition_test_05m;
  refactoring_template_2(
    "p",
    "05-M",
    "nia05m",
    "nth",
    "yellow",
    "Présence de texte justifié [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-styles-ne-justifient-pas-le-texte' target='_blank'>Opquast 186</a>]"
  );
}
function condition_test_05m(node) {
  return Boolean(
    isItemVisible(node) && node.style.textAlign == "justify"
  );
}
function check_test_05n() {
  conditionObject.nia05n1 = condition_test_05n1;
  refactoring_template_2(
    "h1,h2,h3,h4,h5,h6",
    "05-N",
    "nia05n1",
    "nth",
    "yellow",
    "Présence de titre non-pertinent car trop court."
  );
  conditionObject.nia05n2 = condition_test_05n2;
  refactoring_template_2(
    "h1,h2,h3,h4,h5,h6",
    "05-N",
    "nia05n2",
    "nth",
    "yellow",
    "Présence de titre en majuscule [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-mises-en-majuscules-a-des-fins-decoratives-sont-effectuees-a-laide-des-styles' target='_blank'>Opquast 187</a>]"
  );
}
function condition_test_05n1(node) {
  const item = cleanNode(node).textContent || "";
  if (item == "FAQ") {
    return false;
  }
  return Boolean(
    isItemVisible(node) && item.length <= 3 && !node.querySelector('img:not([alt=""])')
  );
}
function condition_test_05n2(node) {
  const item = cleanNode(node).textContent || "";
  if (item == "RGPD") {
    return false;
  }
  return Boolean(
    isItemVisible(node) && isItemHasVisibleContent(node) && item.length > 3 && isUpperCase(item)
  );
}
function check_test_05o() {
  if (!paramFilter.only_redactor && paramPage.isSearchLogic && paramPage.isAEM) {
    const nia05o_isSearch = document.getElementById("mainSearch");
    if (nia05o_isSearch) {
      const nia05o_searchCount = document.querySelector(".search-meta-count");
      const nia05o_filter = document.querySelector(
        ".search-filters, .filters-content"
      );
      refactoring_template_4(
        !nia05o_searchCount || !isItemVisible(nia05o_searchCount),
        "05-0",
        "nc",
        "red",
        "La page des résultats de recherche doit indiquer le nombre de résultats [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/la-page-des-resultats-de-recherche-indique-le-nombre-de-resultats-le-nombre-de-pages-de-resultats-et-le-nombre-de-resultats-par-page' target='_blank'>Opquast 13</a>]"
      );
      refactoring_template_4(
        Boolean(
          nia05o_searchCount && isItemVisible(nia05o_searchCount) && parseFloat(nia05o_searchCount.textContent) > 100 && (!nia05o_filter || nia05o_filter.textContent && nia05o_filter.textContent.length == 0)
        ),
        "05-0",
        "nth",
        "yellow",
        "Présence de filtre recommandé sur les listes de résultats de recherche"
      );
      refactoring_template_1(
        '.filters li.filter-item button[aria-label^="Projects_tags"]',
        "05-0",
        "nia05o3",
        "dev",
        "red",
        "Présence de tag non traduit dans les filtres de recherche"
      );
      conditionObject.nia05o4 = condition_test_05o4;
      refactoring_template_2(
        '.filters details summary span[role="heading"]',
        "05-0",
        "nia05o4",
        "dev",
        "red",
        "Présence de tag non traduit dans les filtres de recherche"
      );
    }
  }
}
function condition_test_05o4(node) {
  return Boolean(node.textContent.indexOf("projects_tags") == 0);
}
function check_test_05p() {
  conditionObject.nia05p = condition_test_05p;
  let nia05p_nodes = "section.cmp-section";
  if (paramFilter.only_redactor) nia05p_nodes = "main section.cmp-section";
  refactoring_template_2(
    nia05p_nodes,
    "05-P",
    "nia05p",
    "nth",
    "yellow",
    "Présence de sections vides (ou avec un contenu assimilable à vide) [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-9-1' target='_blank'>RAWeb 8.9.1</a>]"
  );
}
function condition_test_05p(node) {
  return Boolean(
    node && node.closest("[lang]") && sanitizeText(
      node.innerText,
      node.closest("[lang]").getAttribute("lang")
    ) == "" && isItemVisible(node) && node.querySelectorAll("img,iframe").length == 0
  );
}
function check_test_05q() {
  if (!paramFilter.only_nc) {
    const nia05q_nodes = document.querySelectorAll(
      'html[lang="fr"] header .logo a'
    );
    let nia05q_flag1 = false;
    let nia05q_flag2 = false;
    let nia05q_flag3 = false;
    let nia05q_found = false;
    let nia05q_img, nia05q_tagline;
    if (nia05q_nodes && nia05q_nodes.length > 0) {
      for (let i = 0; i < nia05q_nodes.length; i++) {
        if (nia05q_nodes[i] && !nia05q_nodes[i].hasAttribute("href")) {
          setItemOutline(nia05q_nodes[i], "yellow", "nia05q1", "05-Q");
          nia05q_flag1 = true;
        } else if (nia05q_nodes[i].getAttribute("href") && !nia05q_nodes[i].getAttribute("href").includes("fr.html")) {
          nia05q_found = false;
          for (let j = 0; j < homepageException.length; j++) {
            if (homepageException[j].substring(
              homepageException[j].indexOf("//")
            ) == nia05q_nodes[i].getAttribute("href")) {
              nia05q_found = true;
              break;
            }
          }
          if (nia05q_found == false) {
            setItemOutline(nia05q_nodes[i], "yellow", "nia05q1", "05-Q");
            nia05q_flag1 = true;
          }
        } else if (nia05q_nodes[i] && nia05q_nodes[i].getAttribute("title") && !nia05q_nodes[i].getAttribute("title").includes("- Accueil")) {
          setItemOutline(nia05q_nodes[i], "yellow", "nia05q1", "05-Q");
          nia05q_flag2 = true;
        }
        if (nia05q_nodes[i] && nia05q_nodes[i].getAttribute("title") && nia05q_nodes[i].getAttribute("title").includes("logo")) {
          setItemOutline(nia05q_nodes[i], "yellow", "nia05q2", "05-Q");
          nia05q_flag2 = true;
        }
        nia05q_img = nia05q_nodes[i].querySelector("img");
        if (nia05q_nodes[i].parentElement)
          nia05q_tagline = nia05q_nodes[i].parentElement.querySelector(".logo-tagline");
        if (nia05q_img && nia05q_img.getAttribute("alt") && nia05q_img.getAttribute("alt") == "" && (!nia05q_tagline || nia05q_tagline.innerText == "")) {
          setItemOutline(nia05q_nodes[i], "yellow", "nia05q3", "05-Q");
          nia05q_flag3 = true;
        }
      }
    }
    if (nia05q_flag1 == true) {
      setItemToResultList(
        "nth",
        "<li><a href='#' data-destination='nia05q1' class='result-focus label-yellow'>05-Q</a> : Le lien sur le logo redirige vers la page d’accueil et possède un attribut title respectant la nomenclature suivante : « XXX – Accueil »</li>"
      );
    }
    if (nia05q_flag2 == true) {
      setItemToResultList(
        "nth",
        "<li><a href='#' data-destination='nia05q2' class='result-focus label-yellow'>05-Q</a> : Pas d'indication du mot 'logo' dans le texte alt du logo</li>"
      );
    }
    if (nia05q_flag3 == true) {
      setItemToResultList(
        "man",
        "<li><a href='#' data-destination='nia05q3' class='result-focus label-yellow'>05-Q</a> : Si du texte est présent sur le logo, veuillez saisir un texte alt</li>"
      );
    }
  }
}
function check_test_05r() {
  if (paramPage.isCTIE) {
    refactoring_template_4(
      !document.getElementsByTagName("title")[0].innerText.includes("Luxembourg"),
      "05-R",
      "man",
      "yellow",
      "Vérifier que le titre de l'onglet respecte la nomenclature du CTIE"
    );
  }
}
function check_test_05s() {
  if (!paramFilter.only_redactor && paramPage.isCTIE && !paramPage.isPreview) {
    refactoring_template_4(
      !(window.location.href.includes("public.lu") || window.location.href.includes("mae.lu") || window.location.href.includes("ctie.lu") || window.location.href.includes("gouvernement.lu")),
      "05-S",
      "man",
      "yellow",
      "Vérifier que l'URL respecte bien le formalisme des noms de domaine de l'état"
    );
  }
}
function check_test_05t() {
  if (!paramFilter.only_redactor) {
    conditionObject.nia05t = condition_test_05t;
    refactoring_template_2(
      "div, section",
      "05-T",
      "nia05t",
      "dev",
      "yellow",
      "Absence de balise de texte autour d'un texte"
    );
  }
}
function condition_test_05t(node) {
  let nia05t_flag = false;
  if (node && isItemVisible(node) && node.childNodes && node.childNodes.length > 0) {
    for (let i = 0; i < node.childNodes.length; i++) {
      if (node.childNodes[i].nodeName == "#text" && sanitizeText(cleanNode(node.childNodes[i]).textContent, null) != "") {
        nia05t_flag = true;
        break;
      }
    }
  }
  return Boolean(nia05t_flag);
}
function check_part_05() {
  if (paramFilter.debug_flag) console.log("05 Element Obligatoire");
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
  if (!paramFilter.only_redactor) {
    conditionObject.nia06a = condition_test_06a;
    refactoring_template_2(
      'ul[role]:not([role="list"]):not([role="listbox"]),ol[role]:not([role="list"]):not([role="tablist"]),li[role]:not([role="listitem"]):not([role="option"]),dl[role]:not([role="listitem"])',
      "06-A",
      "nia06a",
      "dev",
      "red",
      "Vérifier qu'il n'y a pas de role sur les container de liste [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-3-1' target='_blank'>RAWeb 9.3.1</a>]"
    );
  }
}
function condition_test_06a(node) {
  return Boolean(
    isItemVisible(node) && !(node.tagName == "LI" && node.getAttribute("role") == "tab" && node.parentElement && node.parentElement.getAttribute("role") == "tablist" && (node.parentElement.tagName == "UL" || node.parentElement.tagName == "OL") && (node.getAttribute("tabindex") == "0" && node.getAttribute("aria-selected") == "true" || node.getAttribute("tabindex") == "-1" && node.getAttribute("aria-selected") != "true"))
  );
}
function check_test_06b() {
  refactoring_template_1(
    ':where(ul,ol,[role="list"]) > *:not(li):not([role="listitem"]):not(.checkA11YSpan)',
    "06-B",
    "nia06b",
    "nc",
    "red",
    "Présence d'un élement non autorisé dans une liste [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-3-1' target='_blank'>RAWeb 9.3.1</a>]"
  );
}
function check_test_06c() {
  if (!paramFilter.only_redactor) {
    refactoring_template_1(
      'header.page-header:not([role="banner"])',
      "06-C",
      "nia06c1",
      "dev",
      "yellow",
      "Il y a un problème avec la structuration du header, il lui manque le role=banner [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]"
    );
  }
  if (!paramFilter.only_redactor) {
    const nia06c2_nodes = document.querySelectorAll('header[role="banner"]');
    let nia06c2_counter = 0;
    if (nia06c2_nodes == null || nia06c2_nodes.length == 0) {
      setItemToResultList(
        "dev",
        "<li><span class='result-focus label-red'>06-C</span> : Il n'y a aucun element header visible [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]</li>"
      );
    } else if (nia06c2_nodes.length > 1) {
      for (let i = 0; i < nia06c2_nodes.length; i++) {
        if (isItemVisible(nia06c2_nodes[i])) {
          nia06c2_counter++;
        }
        if (nia06c2_counter > 1) {
          setItemToResultList(
            "dev",
            "<li><span class='result-focus label-red'>06-C</span> : Il y a un plusieurs elements header visible [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]</li>"
          );
          setItemsOutline(nia06c2_nodes, "red", "nia06c2", "06-C");
          break;
        }
      }
    }
    refactoring_template_1(
      'main header[role="banner"]',
      "06-C",
      "nia06c3",
      "dev",
      "red",
      "Il y a un problème avec la structuration du header, celui-ci ne doit pas être enfant de la balise main [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]"
    );
  }
}
function check_test_06d() {
  if (paramPage.isCTIE && !paramFilter.only_redactor) {
    refactoring_template_3(
      'nav.page-headernav[role="navigation"],nav.headernav[role="navigation"],nav#headernav[role="navigation"]',
      "06-D",
      "dev",
      "yellow",
      "Il y a un problème avec la structuration de la navigation principale [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]"
    );
  }
}
function check_test_06e() {
  if (!paramFilter.only_redactor) {
    refactoring_template_1(
      'nav:not([role="navigation"])',
      "06-E",
      "nia06e1",
      "nc",
      "red",
      "Présence d'une zone de navigation sans attribut role"
    );
  }
  if (!paramFilter.only_redactor && paramPage.isAEM) {
    refactoring_template_1(
      "*:not(.page-langs):not(.right-part):not(.cmp-directory):not(.top-container):not(.skiplinks):not(.navigation-wrapper) > nav:not(.page-headernav):not(.page-headernavmobile):not(.page-headernav-desk):not(.automaticnav):not(.cmp-breadcrumb):not(.page-localnav):not(.cmp-backtonav):not(.cmp-breadcrumb-demarches):not(.topnav):not(.page-bloub):not(#headernav):not(#headernav-desktop):not(.headernav-detached):not(.headernav):not(.headernav-fixed):not(.page-subheadernav)",
      "06-E",
      "nia06e2",
      "nc",
      "red",
      "Présence d'une balise nav utilisé en dehors d'une zone de navigation [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]"
    );
  }
}
function check_test_06f() {
  if (!paramFilter.only_redactor) {
    refactoring_template_1(
      'main:not([role="main"])',
      "06-F",
      "nia06f1",
      "nth",
      "orange",
      "Présence d'une zone de contenu principal sans attribut role"
    );
    const nia06f2_nodes = document.querySelectorAll("main");
    let nia06f2_counter = 0;
    if (nia06f2_nodes && nia06f2_nodes.length > 1) {
      for (let i = 0; i < nia06f2_nodes.length; i++) {
        if (isItemVisible(nia06f2_nodes[i])) {
          nia06f2_counter++;
        }
        if (nia06f2_counter > 1) {
          setItemToResultList(
            "nc",
            "<li><a href='#' data-destination='nia06f2' class='result-focus label-red'>06-F</a> : Présence de plusieurs zone de contenu principal [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]</li>"
          );
          setItemsOutline(nia06f2_nodes, "red", "nia06f2", "06-F");
          break;
        }
      }
    }
  }
}
function check_test_06g() {
  if (!paramFilter.only_redactor && paramPage.isAEM) {
    refactoring_template_1(
      'footer.page-footer:not([role="contentinfo"])',
      "06-G",
      "nia06g1",
      "nth",
      "red",
      "Présence d'une zone de pied de page sans attribut role"
    );
  }
  if (!paramFilter.only_redactor && paramPage.isAEM) {
    refactoring_template_3(
      'footer.page-footer[role="contentinfo"]',
      "06-G",
      "dev",
      "yellow",
      "Il y a un problème avec la structuration du footer [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]"
    );
  }
  if (!paramFilter.only_redactor && paramPage.isAEM) {
    conditionObject.nia06g3 = condition_test_06g3;
    refactoring_template_2(
      'footer h3, footer [role="heading"][aria-level="3"]',
      "06-G",
      "nia06g3",
      "dev",
      "yellow",
      "Absence d'un titre principal pour le footer"
    );
  }
  if (!paramFilter.only_redactor && paramPage.isAEM) {
    refactoring_template_3(
      'footer a[href$="accessibilite.html"], footer a[href$="barrierefreiheit.html"], footer a[href$="accessibility.html"]',
      "06-G",
      "nc",
      "red",
      "Absence de la déclaration d'accessibilité dans le footer"
    );
    conditionObject.nia06g5 = condition_test_06g5;
    refactoring_template_2(
      'footer a[href$="accessibilite.html"], footer a[href$="barrierefreiheit.html"], footer a[href$="accessibility.html"]',
      "06-G",
      "nia06g5",
      "nc",
      "red",
      "Les liens du footer doivent être structurés sous forme de liste"
    );
  }
}
function condition_test_06g3(node) {
  return Boolean(
    isItemVisible(node) && node.closest("footer") && node.closest("footer").querySelector('h2,[role="heading"][aria-level="2"]') == null
  );
}
function condition_test_06g5(node) {
  return Boolean(isItemVisible(node) && !node.closest("ul"));
}
function check_test_06h() {
  refactoring_template_1(
    "frame:not([title]),iframe:not([title])",
    "06-H",
    "nia06h1",
    "nc",
    "red",
    "Chaque cadre doit avoir un titre  [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-2-1-1' target='_blank'>RAWeb 2.1.1</a>]"
  );
  if (!paramFilter.only_redactor) {
    refactoring_template_1(
      "iframe[noresize]",
      "06-H",
      "nia06h2",
      "nc",
      "red",
      "Présence de cadre avec attribut noresize"
    );
    refactoring_template_1(
      "iframe[scrolling=no]",
      "06-H",
      "nia06h3",
      "dev",
      "orange",
      "Présence de cadre avec attribut obsolète scrolling=no"
    );
    refactoring_template_1(
      'iframe:not([src]),iframe[src=""]',
      "06-H",
      "nia06h4",
      "nc",
      "red",
      "Présence de cadre vide"
    );
    refactoring_template_1(
      "iframe[width], iframe[height]",
      "06-H",
      "nia06h5",
      "nc",
      "red",
      "Présence de cadre avec attribut de présentation (height, width)"
    );
  }
}
const nia06j2_regex = /^(- )/g;
function check_test_06j() {
  conditionObject.nia06j1 = condition_test_06j1;
  refactoring_template_2(
    '*:not(.geoportail-addresses):not(.subnav-item) > ul:not(.cmp-focus-list):not(.article-metas),ol,[role="list"]',
    "06-J",
    "nia06j1",
    "nc",
    "orange",
    "Présence d'une liste à un seul élément [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-3-1' target='_blank'>RAWeb 9.3.1</a>]"
  );
  conditionObject.nia06j2 = condition_test_06j2;
  refactoring_template_2(
    "p",
    "06-J",
    "nia06j2",
    "nth",
    "yellow",
    "Présence d'une liste simulée avec des tirets"
  );
}
function condition_test_06j1(node) {
  return Boolean(
    isItemVisible(node) && node.querySelectorAll('li,[role="listitem"]').length < 2
  );
}
function condition_test_06j2(node) {
  return Boolean(
    isItemVisible(node) && nia06j2_regex.test(node.innerText.trim())
  );
}
function check_test_06k() {
  if (!paramFilter.only_redactor) {
    refactoring_template_1(
      "abbr:not([title])",
      "06-H",
      "nia06h",
      "nth",
      "yellow",
      "Présence d'abréviation non explicitée"
    );
  }
}
function check_test_06l() {
  if (paramPage.isAEM && !paramFilter.only_redactor) {
    refactoring_template_1(
      ".cmp-accordion > *:not(details):not(span.checkA11YSpan):not(span.cmp-accordionItem__icon), .cmp-accordion > details > *:not(summary):not(span.checkA11YSpan):not(.cmp-accordion__panel):not(.accordion-local-toggle), .filters-content > *:not(details), .filters-content > details > *:not(summary):not(.filter-content)",
      "06-L",
      "nia06l1",
      "dev",
      "orange",
      "Présence d'accordéon sans structure details/summary"
    );
    refactoring_template_1(
      'details > summary:not(.cmp-hours__summary) > *:not(h1):not(h2):not(h3):not(h4):not(h5):not(h6):not([role="heading"]):not(svg[aria-hidden="true"]):not(span.checkA11YSpan):not(span.cmp-accordionItem__icon):not(.filter-subtitle)',
      "06-L",
      "nia06l2",
      "dev",
      "orange",
      "Présence d'accordéon avec qqch d'autre qu'une balise Hx dans la balise summary [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8.2.1' target='_blank'>RAWeb 8.2.1</a>]"
    );
  }
}
function check_test_06m() {
  if (paramPage.isAEM && !paramFilter.only_redactor) {
    const nia06m_nodes = document.querySelectorAll(".geoportail");
    let nia06m1_flag = false, nia06m2_flag = false, nia06m3_flag = false, nia06m4_flag = false, nia06m5_flag = false, nia06m6_flag = false;
    let nia06m_map;
    let nia06m_Adress;
    let nia06m_Contact;
    let nia06m_StreetAdress;
    if (nia06m_nodes && nia06m_nodes.length > 0) {
      for (let i = 0; i < nia06m_nodes.length; i++) {
        if (isItemVisible(nia06m_nodes[i])) {
          nia06m_map = nia06m_nodes[i].querySelectorAll(".geoportail-map");
          if (!nia06m_map || nia06m_map.length != 1 || !isItemsVisible(nia06m_map)) {
            nia06m1_flag = true;
            setItemOutline(nia06m_nodes[i], "orange", "nia06m1", "06-M");
          }
          nia06m_Adress = nia06m_nodes[i].querySelectorAll(
            ".geoportail-addresses .vcard"
          );
          if (!nia06m_Adress || nia06m_Adress.length == 0 || !isItemsVisible(nia06m_Adress)) {
            nia06m2_flag = true;
            setItemOutline(nia06m_nodes[i], "red", "nia06m2", "06-M");
          } else if (nia06m_Adress && nia06m_Adress.length > 1 && nia06m_Adress[0].parentElement && nia06m_Adress[0].parentElement.tagName != "LI") {
            nia06m3_flag = true;
            setItemOutline(nia06m_nodes[i], "orange", "nia06m3", "06-M");
          } else if (nia06m_Adress && nia06m_Adress.length == 1 && nia06m_Adress[0].parentElement && nia06m_Adress[0].parentElement.tagName == "LI" && !paramFilter.only_nc) {
            nia06m4_flag = true;
            setItemOutline(nia06m_nodes[i], "yellow", "nia06m4", "06-M");
          }
          if (nia06m_Adress && nia06m_Adress.length > 0) {
            nia06m_Contact = nia06m_Adress[0].querySelectorAll(
              "dl:not(.cmp-hours__list)"
            );
            nia06m_StreetAdress = nia06m_Adress[0].querySelectorAll(
              'span[itemprop="streetAddress"]'
            );
            if (!nia06m_Contact || nia06m_Contact.length != 1 || !isItemsVisible(nia06m_Contact)) {
              nia06m5_flag = true;
              setItemOutline(nia06m_nodes[i], "orange", "nia06m5", "06-M");
            }
            if (!paramFilter.only_nc) {
              if (!nia06m_StreetAdress || nia06m_StreetAdress.length != 1 || !isItemsVisible(nia06m_StreetAdress) || nia06m_StreetAdress[0].parentElement && nia06m_StreetAdress[0].parentElement.tagName != "P" && nia06m_StreetAdress[0].parentElement.tagName != "DD") {
                nia06m6_flag = true;
                setItemOutline(nia06m_nodes[i], "yellow", "nia06m6", "06-M");
              }
            }
          }
        }
      }
    }
    if (nia06m1_flag == true) {
      setItemToResultList(
        "dev",
        "<li><a href='#' data-destination='nia06m1' class='result-focus label-orange'>06-M</a> : Présence d'une carte Geoportail sans carte visible</li>"
      );
    }
    if (nia06m2_flag == true) {
      setItemToResultList(
        "nc",
        "<li><a href='#' data-destination='nia06m2' class='result-focus label-red'>06-M</a> : Présence d'une carte Geoportail sans adresse visible</li>"
      );
    }
    if (nia06m3_flag == true) {
      setItemToResultList(
        "dev",
        "<li><a href='#' data-destination='nia06m3' class='result-focus label-orange'>06-M</a> : Présence d'une liste d'adresse Geoportail n'utilisant pas une structure de liste 'ul' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-3-1' target='_blank'>RAWeb 9.3.1</a>]</li>"
      );
    }
    if (nia06m4_flag == true && !paramFilter.only_nc) {
      setItemToResultList(
        "nth",
        "<li><a href='#' data-destination='nia06m4' class='result-focus label-yellow'>06-M</a> : Présence d'une adresse Geoportail unique présent dans une structure de liste 'ul' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-3-1' target='_blank'>RAWeb 9.3.1</a>]</li>"
      );
    }
    if (nia06m5_flag == true) {
      setItemToResultList(
        "dev",
        "<li><a href='#' data-destination='nia06m5' class='result-focus label-orange'>06-M</a> : Présence d'une liste d'info de contact dans une adresse Geoportail n'utilisant pas une structure de liste 'dl' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-3-3' target='_blank'>RAWeb 9.3.3</a>]</li>"
      );
    }
    if (nia06m6_flag == true && !paramFilter.only_nc) {
      setItemToResultList(
        "dev",
        "<li><a href='#' data-destination='nia06m6' class='result-focus label-yellow'>06-M</a> : Les différents éléments d'une adresse Geoportail doivent être regroupée dans une balise 'p' ou 'dd'</li>"
      );
    }
  }
}
function check_test_06n() {
  if (paramPage.isAEM && !paramFilter.only_redactor) {
    refactoring_template_1(
      ".page-bloub:not(nav), .page-bloub:not([role=navigation]), .page-bloub:not([aria-label])",
      "06-N",
      "nia06n1",
      "dev",
      "orange",
      "Le sommaire doit être structuré dans une balise 'nav' avec un role='navigation' et un attribut aria-label"
    );
    if (document.querySelector(".page-bloub")) {
      refactoring_template_3(
        ".page-bloub ul > li > a",
        "06-N",
        "dev",
        "red",
        "Le sommaire ne contient pas d'élément de navigation"
      );
    }
    if (document.querySelector(".page-bloub a.is-active")) {
      refactoring_template_3(
        '.page-bloub ul > li > a.is-active[aria-current="true"], .page-bloub ul > li > a.is-active[aria-current="step"]',
        "06-N",
        "dev",
        "orange",
        "Dans le sommaire, le lien ancre vers la section en cours de consultation doit être identifié par l’attribut aria_current=’true’ ou 'step' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-10-9-1' target='_blank'>RAWeb 10.9.1</a>]"
      );
    }
  }
}
function check_test_06o() {
  if (paramPage.isAEM) {
    refactoring_template_1(
      ".cmp-focus:not(:has(:is(h2, h3, h4, h5)))",
      "06-O",
      "nia06o1",
      "dev",
      "yellow",
      "Absence de titre sur un composant focus"
    );
  }
  if (!paramFilter.only_redactor && paramPage.isAEM) {
    const nia06o2_nodes = document.querySelectorAll(".cmp-focus");
    let nia06o2_lists, nia06o2_items;
    let nia06o2_itemTitle, nia06o2_itemContent;
    let nia06o2_flag = false;
    let nia06o3_flag = false;
    let nia06o4_flag = false;
    let nia06o4_counter;
    let nia06o5_flag = false;
    let nia06o6_flag = false;
    let nia06o7_flag = false;
    if (nia06o2_nodes && nia06o2_nodes.length > 0) {
      for (let i = 0; i < nia06o2_nodes.length; i++) {
        nia06o2_lists = nia06o2_nodes[i].querySelectorAll("ul, ul ul");
        nia06o2_items = nia06o2_nodes[i].querySelectorAll(
          ".cmp-focus-list-item, .cmp-focus-top, .search-result"
        );
        nia06o4_counter = 0;
        if (nia06o2_lists && nia06o2_items && (nia06o2_lists.length == 1 && nia06o2_items.length > 1 || nia06o2_lists.length == 0 && nia06o2_items.length == 1)) ;
        else if (nia06o2_lists && nia06o2_items && nia06o2_lists.length == 1 && nia06o2_items.length == 1) {
          nia06o3_flag = true;
          setItemOutline(nia06o2_nodes[i], "orange", "nia06o3", "06-O");
        } else {
          if (paramFilter.debug_flag) console.log(nia06o2_lists);
          if (paramFilter.debug_flag) console.log(nia06o2_items);
          nia06o2_flag = true;
          setItemOutline(nia06o2_nodes[i], "orange", "nia06o2", "06-O");
        }
        if (nia06o2_items) {
          for (let j = 0; j < nia06o2_items.length; j++) {
            nia06o2_itemTitle = nia06o2_items[j].querySelector(
              ":is(h3, h4, h5, h6)"
            );
            nia06o2_itemContent = sanitizeText(
              cleanNode(nia06o2_items[j]).textContent,
              "fr"
            );
            if (nia06o2_itemTitle) {
              nia06o2_itemTitle = cleanNode(nia06o2_itemTitle);
              if (nia06o2_itemContent == sanitizeText(nia06o2_itemTitle.textContent, "fr")) {
                nia06o4_counter++;
              } else if (nia06o2_itemContent.indexOf(
                sanitizeText(nia06o2_itemTitle.textContent, "fr")
              ) != 0) {
                if (paramFilter.debug_flag)
                  console.log("content : " + nia06o2_itemContent);
                if (paramFilter.debug_flag)
                  console.log(
                    "title   : " + sanitizeText(nia06o2_itemTitle.textContent, "fr")
                  );
                nia06o5_flag = true;
                setItemOutline(nia06o2_items[j], "orange", "nia06o5", "06-O");
              }
            }
            if (nia06o2_itemContent == "") {
              nia06o6_flag = true;
              setItemOutline(nia06o2_items[j], "orange", "nia06o6", "06-O");
            }
          }
          if (nia06o4_counter > 0 && nia06o4_counter == nia06o2_items.length) {
            nia06o4_flag = true;
            setItemOutline(nia06o2_nodes[i], "orange", "nia06o4", "06-O");
          }
          if (nia06o2_items[0] && nia06o2_items[0].classList.contains("cmp-focus-top") && nia06o2_items.length == 1 && !paramFilter.only_nc) {
            nia06o7_flag = true;
            setItemOutline(nia06o2_nodes[i], "yellow", "nia06o7", "06-O");
          }
        }
      }
    }
    if (nia06o2_flag == true) {
      setItemToResultList(
        "dev",
        "<li><a href='#' data-destination='nia06o2' class='result-focus label-orange'>06-O</a> : Les items du focus doivent être dans une seule et même liste 'ul' (exception si 1 seul item) </li>"
      );
    }
    if (nia06o3_flag == true) {
      setItemToResultList(
        "dev",
        "<li><a href='#' data-destination='nia06o3' class='result-focus label-orange'>06-O</a> : S'il n'y a qu'un seul item dans le focus celui-ci ne doit pas être liste 'ul'</li>"
      );
    }
    if (nia06o4_flag == true) {
      setItemToResultList(
        "dev",
        "<li><a href='#' data-destination='nia06o4' class='result-focus label-orange'>06-O</a> : Si l’intégralité des items ne contiennent qu’un seul élément textuel celui-ci sera dans un 'p' </li>"
      );
    }
    if (nia06o5_flag == true) {
      setItemToResultList(
        "dev",
        "<li><a href='#' data-destination='nia06o5' class='result-focus label-orange'>06-O</a> : Le premier élément informatif dans le DOM de chaque item doit être le titre</li>"
      );
    }
    if (nia06o6_flag == true) {
      setItemToResultList(
        "dev",
        "<li><a href='#' data-destination='nia06o6' class='result-focus label-orange'>06-O</a> : Les items du focus doivent avoir un contenu </li>"
      );
    }
    if (nia06o7_flag == true && !paramFilter.only_nc) {
      setItemToResultList(
        "man",
        "<li><a href='#' data-destination='nia06o7' class='result-focus label-yellow'>06-O</a> : Vérifier s'il est normal d'avoir un focus-on-top comme seul élément du focus </li>"
      );
    }
  }
}
function check_test_06p() {
  if (!paramFilter.only_redactor && paramPage.isAEM) {
    const nia06p1_nodes = document.querySelectorAll(".cmp-grid");
    let nia06p1_items;
    let nia06p1_itemTitle, nia06p1_itemContent, nia06p1_itemTitleSani, nia06p1_hasImgInfo;
    let nia06p1_counter = 0;
    let nia06p2_flag = false;
    let nia06p3_flag = false;
    let nia06p4_flag = false;
    if (nia06p1_nodes && nia06p1_nodes.length > 0) {
      for (let i = 0; i < nia06p1_nodes.length; i++) {
        if (nia06p1_nodes[i].tagName != "UL" && nia06p1_nodes[i].tagName != "OL" && nia06p1_nodes[i].tagName != "DL") {
          setItemToResultList(
            "dev",
            "<li><a href='#' data-destination='nia06p1' class='result-focus label-orange'>06-P</a> : Les items du grid doivent être structuré sous forme de liste (ul, ol ou dl)</li>"
          );
          setItemsOutline(nia06p1_nodes, "orange", "nia06p1", "06-P");
        }
        nia06p1_items = nia06p1_nodes[i].querySelectorAll("li, dt");
        if (nia06p1_items) {
          for (let j = 0; j < nia06p1_items.length; j++) {
            nia06p1_itemTitle = nia06p1_items[j].querySelector(
              ":is(h3, h4, h5, h6)"
            );
            nia06p1_itemContent = sanitizeText(
              cleanNode(nia06p1_items[j]).textContent,
              "fr"
            );
            nia06p1_hasImgInfo = nia06p1_items[j].querySelector('img:not([alt=""])');
            if (nia06p1_itemTitle) {
              nia06p1_itemTitleSani = sanitizeText(
                cleanNode(nia06p1_itemTitle).textContent,
                "fr"
              );
              if (nia06p1_itemContent == nia06p1_itemTitleSani) {
                nia06p1_counter++;
              } else if (nia06p1_itemContent.indexOf(nia06p1_itemTitleSani) != 0) {
                nia06p2_flag = true;
                console.log(nia06p1_itemContent);
                console.log(nia06p1_itemTitleSani);
                setItemOutline(nia06p1_items[j], "orange", "nia06p2", "06-P");
              }
            }
            if (nia06p1_itemContent == "" && nia06p1_hasImgInfo == null) {
              nia06p4_flag = true;
              setItemOutline(nia06p1_items[j], "orange", "nia06p4", "06-P");
            }
          }
          if (nia06p1_counter == nia06p1_items.length) {
            nia06p3_flag = true;
            setItemOutline(nia06p1_nodes[i], "orange", "nia06p3", "06-P");
          }
        }
      }
    }
    if (nia06p2_flag == true) {
      setItemToResultList(
        "dev",
        "<li><a href='#' data-destination='nia06p2' class='result-focus label-orange'>06-P</a> : Le premier élément informatif dans le DOM de chaque item doit être le titre</li>"
      );
    }
    if (nia06p3_flag == true) {
      setItemToResultList(
        "dev",
        "<li><a href='#' data-destination='nia06p3' class='result-focus label-orange'>06-P</a> : Si l’intégralité des items ne contiennent qu’un seul élément textuel celui_ci sera dans un <p> </li>"
      );
    }
    if (nia06p4_flag == true) {
      setItemToResultList(
        "dev",
        "<li><a href='#' data-destination='nia06p4' class='result-focus label-orange'>06-P</a> : Les items du grid doivent avoir un contenu </li>"
      );
    }
  }
}
function check_test_06q() {
  if (paramPage.isAEM) {
    if (!paramFilter.only_redactor) {
      refactoring_template_1(
        '.cmp-tabs > *:not([role="tablist"]):not([role="tabpanel"]), .cmp-tabs > [role="tablist"] > *:not([role="tab"])',
        "06-Q",
        "nia06q1",
        "dev",
        "orange",
        "Vérifier les attributs role dans le système d'onglet"
      );
    }
    refactoring_template_1(
      '.cmp-tabs > [role="tablist"]:not([aria-label]):not([aria-labelledby])',
      "06-Q",
      "nia06q2",
      "dev",
      "orange",
      "Absence d'attribut aria-label sur le système d'onglet (à ajouter dans le cq_dialog)"
    );
    if (!paramFilter.only_redactor) {
      refactoring_template_1(
        '.cmp-tabs > [role="tablist"] > [role="tab"]:not(button), .cmp-tabs > [role="tablist"] > [role="tab"]:not([aria-controls])',
        "06-Q",
        "nia06q3",
        "nth",
        "yellow",
        "Structurer idéalement les indicateurs d'onglet dans des éléments bouton avec un attribut role=’tab’ ainsi qu’un attribut aria_controls lié avec l’id de son contenu."
      );
    }
    if (!paramFilter.only_redactor) {
      refactoring_template_1(
        '.cmp-tabs > [role="tablist"] > [role="tab"]:not([aria-selected]), .cmp-tabs > [role="tablist"] > [role="tab"][aria-selected=false]:not([tabindex="-1"])',
        "06-Q",
        "nia06q4",
        "dev",
        "orange",
        "Chaque item d’onglet actif aura un attribut aria_selected=’true’, sinon il aura la valeur ‘false’ ainsi qu'un attribut tabindex='-1' dans le cas contraire."
      );
    }
    if (!paramFilter.only_redactor) {
      refactoring_template_1(
        '.cmp-tabs > [role="tablist"] > [role="tab"]:not([id]), .cmp-tabs > [role="tabpanel"]:not([aria-labelledby]), .cmp-tabs > [role="tabpanel"]:not([tabindex="0"])',
        "06-Q",
        "nia06q5",
        "dev",
        "orange",
        "Chaque contenu d’onglet sera dans un element possédant les attributs role=’tabpanel’, tabindex=’0’ et ainsi qu’un aria_labelledby faisant référence au titre de l’onglet."
      );
    }
  }
}
function check_test_06r() {
  if (!paramFilter.only_redactor && paramPage.isAEM) {
    refactoring_template_3(
      "a.back",
      "06-R",
      "man",
      "yellow",
      "Vérifier la présence du bouton de retour en haut de page (exception : page avec peu de contenu)"
    );
    refactoring_template_1(
      'a.back:not(:is([href="#top"],[href="#"]))',
      "06-R",
      "nia06r2",
      "dev",
      "yellow",
      "L’élément Back_to_Top doit être un lien ancre qui cible #top"
    );
    refactoring_template_1(
      'a.back:not([title]), a.back[title=""]',
      "06-R",
      "nia06r3",
      "dev",
      "yellow",
      "L’élément Back_to_Top doit avoir un attribut title"
    );
  }
}
function check_test_06s() {
  if (!paramFilter.only_redactor && !paramPage.isHomepage && paramPage.isAEM) {
    refactoring_template_3(
      "nav[id^=breadcrumb-], nav.cmp-breadcrumb",
      "06-S",
      "dev",
      "orange",
      "Les pages secondaires doivent disposer d’un breadcrumb."
    );
    refactoring_template_1(
      ':is(nav[id^=breadcrumb-], nav.cmp-breadcrumb):not([role="navigation"])',
      "06-S",
      "nia06s2",
      "dev",
      "orange",
      "Il manque l'attribut role sur la balise nav du breadcrumb."
    );
    refactoring_template_1(
      ":is(nav[id^=breadcrumb-], nav.cmp-breadcrumb):not([aria-label])",
      "06-S",
      "nia06s3",
      "dev",
      "orange",
      "Il manque l'attribut aria-label sur la balise nav du breadcrumb."
    );
    refactoring_template_1(
      ":is(nav[id^=breadcrumb-], nav.cmp-breadcrumb) .cmp-breadcrumb__list > .cmp-breadcrumb__item:not(li)",
      "06-S",
      "nia06s4",
      "dev",
      "red",
      "Les liens du breadcrumb doivent être présenté dans une liste ul/ol."
    );
    refactoring_template_1(
      ':is(nav[id^=breadcrumb-], nav.cmp-breadcrumb) .cmp-breadcrumb__list > .cmp-breadcrumb__item:not([aria-current="page"]):last-child > span:not([aria-current="page"])',
      "06-S",
      "nia06s5",
      "dev",
      "red",
      "Absence de l'attribut aria-current sur le dernier item du fils d'ariane --> Vérifier dans les propriétés de la page que celle-ci n'est pas cachée dans la navigation."
    );
  }
}
function check_test_06t() {
  if (!paramFilter.only_redactor && !paramPage.isHomepage && paramPage.isAEM && currentUrl.includes("/cart.html")) {
    const nia06t1_title = document.title;
    const nia06t1_h2 = document.querySelector(".basket h2");
    if (!nia06t1_h2 || !nia06t1_title.includes(nia06t1_h2.textContent)) {
      setItemToResultList(
        "nc",
        "<li><a href='#' data-destination='nia06t1' class='result-focus label-red'>06-T</a> : Le titre de la page doit reprendre le titre de l'étape du panier.</li>"
      );
      setItemOutline(nia06t1_h2, "red", "nia06t1", "06-T");
    }
    const nia06t2_nodes = document.querySelector(".basket-order-item-metas");
    if (nia06t2_nodes && nia06t2_nodes.nodeName != "UL" && nia06t2_nodes.nodeName != "DL") {
      setItemToResultList(
        "dev",
        "<li><a href='#' data-destination='nia06t2' class='result-focus label-orange'>06-T</a> : Les différentes meta doivent être présentées sous forme de liste (<ul> ou <dl>)</li>"
      );
      setItemOutline(nia06t2_nodes, "orange", "nia06t2", "06-T");
    }
    const nia06t3_nodes = document.querySelector(
      ".basket-order-item-actions select.basket-order-item-qty"
    );
    if (nia06t3_nodes && (nia06t3_nodes.previousElementSibling.nodeName != "LABEL" || !nia06t3_nodes.hasAttribute("aria-describedby"))) {
      setItemToResultList(
        "dev",
        "<li><a href='#' data-destination='nia06t3' class='result-focus label-orange'>06-T</a> : Liste de selection pour la quantité doit être liée au titre de la publication</li>"
      );
      setItemOutline(nia06t3_nodes, "orange", "nia06t3", "06-T");
    }
    const nia06t4_nodes = document.querySelector('.basket input[type="radio"]');
    if (nia06t4_nodes && nia06t4_nodes.closest('fieldset, [role="group"]') == null) {
      setItemToResultList(
        "dev",
        "<li><a href='#' data-destination='nia06t4' class='result-focus label-orange'>06-T</a> : Présence d'un bouton radio hors d'une balise fieldset</li>"
      );
      setItemOutline(nia06t4_nodes, "orange", "nia06t4", "06-T");
    } else if (nia06t4_nodes && nia06t4_nodes.closest('fieldset, [role="group"]')) {
      const nia06t5_nodes = nia06t4_nodes.closest('fieldset, [role="group"]').querySelectorAll('input[type="radio"]');
      if (nia06t5_nodes && nia06t5_nodes.length < 2) {
        setItemToResultList(
          "dev",
          "<li><a href='#' data-destination='nia06t5' class='result-focus label-orange'>06-T</a> : Un bouton radio ne devrait pas être seul</li>"
        );
        setItemOutline(nia06t4_nodes, "orange", "nia06t5", "06-T");
      }
    }
  }
}
function check_test_06u() {
  if (!paramFilter.only_redactor && paramPage.isAEM) {
    refactoring_template_1(
      'nav.page-localnav:not([role="navigation"])',
      "06-U",
      "nia06u1",
      "dev",
      "orange",
      "Il manque l'attribut role sur la balise nav du localnav"
    );
    refactoring_template_1(
      "nav.page-localnav:not([aria-labelledby])",
      "06-U",
      "nia06u2",
      "dev",
      "orange",
      "Il manque l'attribut aria-labelledby sur la balise nav du localnav"
    );
    conditionObject.nia06u3 = condition_test_06u3;
    refactoring_template_2(
      'nav.page-localnav[aria-labelledby="localnav-title"] #localnav-title',
      "06-U",
      "nia06u3",
      "dev",
      "red",
      "Le composant localnav doit avoir un titre Hn lié avec un couple aria-labelledby-id unique (celui-ci peut être visuellement masqué)"
    );
    conditionObject.nia06u4 = condition_test_06u4;
    refactoring_template_2(
      "nav.page-localnav",
      "06-U",
      "nia06u4",
      "dev",
      "red",
      "Le composant localnav doit contenir des items."
    );
    conditionObject.nia06u5 = condition_test_06u5;
    refactoring_template_2(
      "nav.page-localnav",
      "06-U",
      "nia06u5",
      "nth",
      "yellow",
      "Le composant localnav doit idéalement contenir plusieurs items."
    );
  }
}
function condition_test_06u3(node) {
  return Boolean(
    node && node.tagName != "H2" && node.tagName != "H3" && node.tagName != "H4"
  );
}
function condition_test_06u4(node) {
  return Boolean(
    isItemVisible(node) && (!node.querySelectorAll("ul li.nav-item") || node.querySelectorAll("ul li.nav-item").length == 0)
  );
}
function condition_test_06u5(node) {
  return Boolean(
    isItemVisible(node) && node.querySelectorAll("ul li.nav-item") && node.querySelectorAll("ul li.nav-item").length == 1
  );
}
function check_part_06() {
  if (paramFilter.debug_flag) console.log("06 Structure");
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
  if (!paramFilter.only_redactor && paramPage.isAEM) {
    conditionObject.nia07a = condition_test_07a;
    refactoring_template_2(
      'button.anchor[data-destination^="#headernav"]:not(.anchor-close)',
      "07-A",
      "nia07a",
      "dev",
      "red",
      "Présence du bouton d'ouverture du menu en dehors de la balise nav."
    );
  }
}
function condition_test_07a(node) {
  return Boolean(node.closest("nav") == null);
}
function check_test_07b() {
  refactoring_template_1(
    "role[search]:not([aria-label])",
    "07-B",
    "nia07b1",
    "dev",
    "orange",
    "Aria-label absent de la région de recherche"
  );
  conditionObject.nia07b2 = condition_test_07b2;
  refactoring_template_2(
    'input[type="search"]',
    "07-B",
    "nia07b2",
    "dev",
    "red",
    "Problème avec le placeholder de la recherche"
  );
  conditionObject.nia07b3 = condition_test_07b3;
  refactoring_template_2(
    'input[type="search"]',
    "07-B",
    "nia07b3",
    "nth",
    "orange",
    "Problème avec la pertinence du titre de la recherche"
  );
  refactoring_template_1(
    'main form[role="search"]:not([action$="recherche.html"]):not([aria-label="Globale"]):not([aria-label="Global"])',
    "07-B",
    "nia07b4",
    "dev",
    "yellow",
    "Présence d'un role=search sur les éléments de recherche secondaire"
  );
  if (!paramFilter.only_redactor && paramPage.isAEM && paramPage.isSearchLogic) {
    refactoring_template_1(
      ".filters-content > *:not(details)",
      "07-B",
      "nia07b5",
      "dev",
      "yellow",
      "Il est recommander de présenter les filtres avec une structure en accordéon details/summary"
    );
  }
  if (!paramFilter.only_redactor && paramPage.isAEM && paramPage.isSearchLogic) {
    refactoring_template_3(
      ".search-meta-count",
      "07-B",
      "dev",
      "orange",
      "Absence du nombre de resultat de la recherche"
    );
  }
  if (!paramFilter.only_redactor && paramPage.isAEM && paramPage.isSearchLogic) {
    refactoring_template_1(
      ".search-results .search-result > *:not(article):not(li)",
      "07-B",
      "nia07b7",
      "dev",
      "yellow",
      "Les résultats doivent être présentés sous forme d’une suite de balise 'article' ou 'li'"
    );
  }
  if (!paramFilter.only_redactor) {
    refactoring_template_1(
      'nav:not([role="navigation"]) > :is(ol,ul).pagination, *:not(nav) > :is(ol,ul).pagination, nav:not([aria-label]) > :is(ol,ul).pagination',
      "07-B",
      "nia07b8",
      "dev",
      "red",
      "La pagination doit être structurée dans un élément 'nav'  avec le role=navigation et un aria_label"
    );
  }
  if (!paramFilter.only_redactor) {
    refactoring_template_1(
      "nav > .pagination:not(ol,ul)",
      "07-B",
      "nia07b9",
      "dev",
      "red",
      "Les différents éléments de la pagination doivent être sous forme de liste (ul ou ol)"
    );
  }
  if (!paramFilter.only_redactor && paramPage.isAEM) {
    conditionObject.nia07b10 = condition_test_07b10;
    refactoring_template_2(
      "nav > .pagination:not(ol,ul)",
      "07-B",
      "nia07b10",
      "dev",
      "red",
      "Les item de la pagination doivent être dans une balise li et leur enfant posseder un aria-label pertinent"
    );
    conditionObject.nia07b11 = condition_test_07b11;
    refactoring_template_2(
      "nav > .pagination:not(ol,ul)",
      "07-B",
      "nia07b11",
      "dev",
      "red",
      "La page active de la pagination doit avoir un aria_current=‘page’"
    );
  }
}
function condition_test_07b2(node) {
  return Boolean(
    isItemVisible(node) && node.hasAttribute("placeholder") && node.hasAttribute("title") && node.getAttribute("placeholder") != node.getAttribute("title")
  );
}
function condition_test_07b3(node) {
  return Boolean(
    isItemVisible(node) && node.getAttribute("title") && node.getAttribute("title").length < 15
  );
}
function condition_test_07b10(node) {
  return Boolean(
    isItemVisible(node) && (node.tagName != "LI" || !node.firstElementChild || node.firstElementChild.tagName == "A" && (!node.firstElementChild.hasAttribute("aria-label") || node.firstElementChild.getAttribute("aria-label").length < 4))
  );
}
function condition_test_07b11(node) {
  return Boolean(
    isItemVisible(node) && node.hasAttribute("aria-current") && node.getAttribute("aria-current") == "page"
  );
}
function check_test_07c() {
  if (paramPage.isAEM) {
    refactoring_template_1(
      ".search-view",
      "07-C",
      "nia07c",
      "nc",
      "red",
      "Présence de tooltip non accessible sur les résultats de recherches [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-10-13-1' target='_blank'>RAWeb 10.13.1</a>]"
    );
  }
}
function check_test_07d() {
  if (!paramFilter.only_redactor && paramPage.isAEM) {
    refactoring_template_1(
      'nav[id^="language-"]:not([aria-label]), div > ul.cmp-languagenavigation__group:not([aria-label])',
      "07-D",
      "nia07d1",
      "nc",
      "red",
      "Absence de l'aria-label sur le menu de selection de langue (à ajouter dans le cqdialog)"
    );
    refactoring_template_1(
      '#page-langs ul[role="menu"] > li[role="none"]',
      "07-D",
      "nia07d2",
      "dev",
      "orange",
      "Faiblesse de la structure du menu de switch des langues : ne pas utiliser role=menu"
    );
    refactoring_template_1(
      '.cmp-languagenavigation__group .cmp-languagenavigation__item-link:not([title*=" - "]),.cmp-languagenavigation__group .cmp-languagenavigation__item-link:not([lang]),.cmp-languagenavigation__group .cmp-languagenavigation__item-link:not([hreflang])',
      "07-D",
      "nia07d3",
      "dev",
      "orange",
      "Les liens vers les versions linguistiques doivent avoir les attributs lang, hreflang et posséder un attribut title dont le contenu textuel est tel que : « de – Deutsch »"
    );
  }
}
function check_test_07e() {
  if (!paramFilter.only_redactor && paramPage.isAEM) {
    refactoring_template_1(
      '.cmp-multiplayer .player_img img[alt="Lire la vidéo Youtube, voir légende ci-après"][lang]:not([lang="fr"])',
      "07-E",
      "nia07e",
      "dev",
      "orange",
      "Traduction manquante dans le composant Multimedia Player"
    );
  }
}
function check_test_07f() {
  if (!paramFilter.only_redactor && paramPage.isAEM) {
    const nia07f_menu = document.querySelector(
      "nav.topnav > .page-headernav .navigation-container > ul.nav ,nav.page-headernav .navigation-container > ul.nav, nav.page-headernav-desk .navigation-container > ul.nav, nav.headernav-detached .navigation-container > ul.nav, .page-headernav > nav .navigation-container > ul.nav"
    );
    let nia07f_hasPasserelle = false;
    let nia07f_isModal = false;
    if (nia07f_menu) {
      const nia07f07_node = document.querySelector(
        'nav#headernav:not([role="navigation"])'
      );
      if (nia07f07_node && isItemVisible(nia07f07_node)) {
        setItemToResultList(
          "dev",
          "<li><a href='#' data-destination='nia07f07' class='result-focus label-orange'>07-F</a> : Role navigation absent de la barre de navigation</li>"
        );
        setItemOutline(nia07f07_node, "orange", "nia07f07", "07-F");
      }
      if (!paramFilter.only_nc) {
        const nia07f02_node = document.querySelector(
          "nav#headernav:not([aria-label]):not([aria-labelledby])"
        );
        if (nia07f02_node && isItemVisible(nia07f02_node)) {
          setItemToResultList(
            "dev",
            "<li><a href='#' data-destination='nia07f02' class='result-focus label-yellow'>07-F</a> : Attribut Aria-label absent de la barre de navigation</li>"
          );
          setItemOutline(nia07f02_node, "yellow", "nia07f02", "07-F");
        }
      }
      const nia07f03_node = nia07f_menu.querySelector(
        ":scope > li.has-subnav > a"
      );
      if (nia07f03_node) {
        nia07f_hasPasserelle = true;
        if (paramFilter.debug_flag)
          console.log(" - Le menu utilise des pages passerelles");
      } else {
        if (paramFilter.debug_flag)
          console.log(" - Le menu n'utilise pas de pages passerelles");
      }
      const nia07f10_nodes = nia07f_menu.querySelectorAll(":scope > li");
      let nia07f_list21 = "", nia07f_list22 = "", nia07f_list23 = "", nia07f_list24 = "", nia07f_list31 = "", nia07f_list32 = "", nia07f_list33 = "", nia07f_list34 = "", nia07f_list41 = "", nia07f_list42 = "", nia07f_list43 = "", nia07f_list44 = "";
      if (nia07f10_nodes && nia07f10_nodes.length > 0) {
        for (let i = 0; i < nia07f10_nodes.length; i++) {
          if (isItemVisible(nia07f10_nodes[i])) {
            let nia07f11_nodes = nia07f10_nodes[i].querySelectorAll(
              ":scope > a, :scope > .quick-navigation > a"
            );
            let nia07f12_nodes = nia07f10_nodes[i].querySelectorAll(
              ":scope > button, :scope > .disclosure--container > button"
            );
            let nia07f13_nodes = nia07f10_nodes[i].querySelectorAll(
              ":scope > ul, :scope > .disclosure--container > ul"
            );
            let y = i + 1;
            if (nia07f10_nodes[i].classList.contains("has-subnav")) {
              if (nia07f_hasPasserelle) {
                if (!nia07f11_nodes || nia07f11_nodes.length != 1) {
                  if (paramFilter.debug_flag)
                    console.log(
                      " - F2.1 Absence de lien pour se rendre à la page passerelle pour l'élément de menu n°" + y
                    );
                  nia07f_list21 += y + ",";
                  setItemOutline(
                    nia07f10_nodes[i],
                    "orange",
                    "nia07f21",
                    "07-F"
                  );
                } else if (!nia07f12_nodes || nia07f12_nodes.length != 1) {
                  if (paramFilter.debug_flag)
                    console.log(
                      " - F2.2 Absence de bouton pour déplier le sous-menu pour l'élement de menu n°" + y
                    );
                  nia07f_list22 += y + ",";
                  setItemOutline(
                    nia07f10_nodes[i],
                    "orange",
                    "nia07f22",
                    "07-F"
                  );
                } else if (!nia07f13_nodes || nia07f13_nodes.length != 1) {
                  if (paramFilter.debug_flag)
                    console.log(
                      " - F2.3 Un problème a été detecté pour l'élement de menu n°" + y + " (absence de sous-menu alors que la classe has-subnav est présente)"
                    );
                  nia07f_list23 += y + ",";
                  setItemOutline(
                    nia07f10_nodes[i],
                    "orange",
                    "nia07f23",
                    "07-F"
                  );
                } else if (nia07f12_nodes && !nia07f12_nodes[0].hasAttribute("aria-expanded")) {
                  if (paramFilter.debug_flag)
                    console.log(
                      " - F2.4 Un problème a été detecté pour l'élement de menu n°" + y + " (absence de l'attribut aria-expanded)"
                    );
                  nia07f_list24 += y + ",";
                  setItemOutline(
                    nia07f10_nodes[i],
                    "orange",
                    "nia07f24",
                    "07-F"
                  );
                } else {
                  if (paramFilter.debug_flag)
                    console.log(
                      " - L'item de menu " + y + " avec page passerelles et sous-menu est OK"
                    );
                }
              } else {
                if (nia07f11_nodes && nia07f11_nodes.length > 0) {
                  if (paramFilter.debug_flag)
                    console.log(
                      " - F3.1 Présence d'un lien pour se rendre à une page passerelle sur l'élement de menu n°" + y
                    );
                  nia07f_list31 += y + ",";
                  setItemOutline(
                    nia07f10_nodes[i],
                    "orange",
                    "nia07f31",
                    "07-F"
                  );
                } else if (!nia07f12_nodes || nia07f12_nodes.length != 1) {
                  if (paramFilter.debug_flag)
                    console.log(
                      " - F3.2 Absence de bouton pour déplier le sous-menu pour l'élement de menu n°" + y
                    );
                  nia07f_list32 += y + ",";
                  setItemOutline(
                    nia07f10_nodes[i],
                    "orange",
                    "nia07f32",
                    "07-F"
                  );
                } else if (!nia07f13_nodes || nia07f13_nodes.length != 1) {
                  if (paramFilter.debug_flag)
                    console.log(
                      " - F3.3 Un problème a été detecté pour l'élement de menu n°" + y + " (absence de sous-menu alors que la classe has-subnav est présente)"
                    );
                  nia07f_list33 += y + ",";
                  setItemOutline(
                    nia07f10_nodes[i],
                    "orange",
                    "nia07f33",
                    "07-F"
                  );
                } else if (nia07f12_nodes && !nia07f12_nodes[0].hasAttribute("aria-expanded")) {
                  if (paramFilter.debug_flag)
                    console.log(
                      " - F3.4 Un problème a été detecté pour l'élement de menu n°" + y + " (absence de l'attribut aria-expanded)"
                    );
                  nia07f_list34 += y + ",";
                  setItemOutline(
                    nia07f10_nodes[i],
                    "orange",
                    "nia07f34",
                    "07-F"
                  );
                } else {
                  if (paramFilter.debug_flag)
                    console.log(
                      " - L'item de menu " + y + " sans page passerelles et sous-menu est OK"
                    );
                }
              }
            } else {
              if (!nia07f11_nodes || nia07f11_nodes.length != 1) {
                if (paramFilter.debug_flag)
                  console.log(
                    " - F4.1 Un problème a été detecté pour l'élement de menu n°" + y
                  );
                nia07f_list41 += y + ",";
                setItemOutline(nia07f10_nodes[i], "orange", "nia07f41", "07-F");
              } else if (nia07f12_nodes && nia07f12_nodes.length > 0) {
                if (paramFilter.debug_flag)
                  console.log(
                    " - F4.2 Un problème a été detecté pour l'élement de menu n°" + y
                  );
                nia07f_list42 += y + ",";
                setItemOutline(nia07f10_nodes[i], "orange", "nia07f42", "07-F");
              } else if (nia07f13_nodes && nia07f13_nodes.length > 0) {
                if (paramFilter.debug_flag)
                  console.log(
                    " - F4.3 Un problème a été detecté pour l'élement de menu n°" + y
                  );
                nia07f_list43 += y + ",";
                setItemOutline(nia07f10_nodes[i], "orange", "nia07f43", "07-F");
              } else if (nia07f11_nodes && (nia07f11_nodes[0].hasAttribute("aria-expanded") || nia07f11_nodes[0].hasAttribute("aria-haspopup"))) {
                if (paramFilter.debug_flag)
                  console.log(
                    " - F4.4 Un problème a été detecté pour l'élement de menu n°" + y
                  );
                nia07f_list44 += y + ",";
                setItemOutline(nia07f10_nodes[i], "orange", "nia07f44", "07-F");
              } else {
                if (paramFilter.debug_flag)
                  console.log(
                    " - L'item de menu " + y + " sans sous-menu est OK"
                  );
              }
            }
          }
        }
        if (nia07f_list21 != "") {
          setItemToResultList(
            "dev",
            "<li><a href='#' data-destination='nia07f21' class='result-focus label-orange'>07-F</a> Absence de lien pour se rendre à la page passerelle <span class='cy-hidden'>pour l'élément de menu n°" + nia07f_list21.slice(0, -1) + "</span></li>"
          );
        }
        if (nia07f_list22 != "") {
          setItemToResultList(
            "dev",
            "<li><a href='#' data-destination='nia07f22' class='result-focus label-orange'>07-F</a> : Absence de bouton pour déplier le sous-menu<span class='cy-hidden'> pour l'élement de menu n°" + nia07f_list22.slice(0, -1) + "</span></li>"
          );
        }
        if (nia07f_list23 != "") {
          setItemToResultList(
            "dev",
            "<li><a href='#' data-destination='nia07f23' class='result-focus label-orange'>07-F</a> : Un problème a été detecté <span class='cy-hidden'>pour l'élement de menu n°" + nia07f_list23.slice(0, -1) + "</span>: absence de sous-menu alors que la classe has-subnav est présente</li>"
          );
        }
        if (nia07f_list24 != "") {
          setItemToResultList(
            "dev",
            "<li><a href='#' data-destination='nia07f24' class='result-focus label-orange'>07-F</a> : Un problème a été detecté <span class='cy-hidden'>pour l'élement de menu n°" + nia07f_list24.slice(0, -1) + "</span>: absence de l'attribut aria-expanded</li>"
          );
        }
        if (nia07f_list31 != "") {
          setItemToResultList(
            "dev",
            "<li><a href='#' data-destination='nia07f31' class='result-focus label-orange'>07-F</a> : Un problème a été detecté <span class='cy-hidden'>pour l'élement de menu n°" + nia07f_list31.slice(0, -1) + "</span>: conflit sur le lien pour aller sur la page passerelle</li>"
          );
        }
        if (nia07f_list32 != "") {
          setItemToResultList(
            "dev",
            "<li><a href='#' data-destination='nia07f32' class='result-focus label-orange'>07-F</a> : Un problème a été detecté <span class='cy-hidden'>pour l'élement de menu n°" + nia07f_list32.slice(0, -1) + "</span>: absence de bouton pour déplier le sous-menu</li>"
          );
        }
        if (nia07f_list33 != "") {
          setItemToResultList(
            "dev",
            "<li><a href='#' data-destination='nia07f33' class='result-focus label-orange'>07-F</a> : Un problème a été detecté <span class='cy-hidden'>pour l'élement de menu n°" + nia07f_list33.slice(0, -1) + "</span>: absence de sous-menu alors que la classe has-subnav est présente)</li>"
          );
        }
        if (nia07f_list34 != "") {
          setItemToResultList(
            "dev",
            "<li><a href='#' data-destination='nia07f34' class='result-focus label-orange'>07-F</a> : Un problème a été detecté <span class='cy-hidden'>pour l'élement de menu n°" + nia07f_list34.slice(0, -1) + "</span>: absence de l'attribut aria-expanded</li>"
          );
        }
        if (nia07f_list41 != "") {
          setItemToResultList(
            "dev",
            "<li><a href='#' data-destination='nia07f41' class='result-focus label-orange'>07-F</a> : Un problème a été detecté <span class='cy-hidden'>pour l'élement de menu n°" + nia07f_list41.slice(0, -1) + "</span>: absence de lien pour acceder aux pages passerelle.</li>"
          );
        }
        if (nia07f_list42 != "") {
          setItemToResultList(
            "dev",
            "<li><a href='#' data-destination='nia07f42' class='result-focus label-orange'>07-F</a> : Un problème a été detecté <span class='cy-hidden'>pour l'élement de menu n°" + nia07f_list42.slice(0, -1) + "</span>: remplacer les boutons par des liens de navigation</li>"
          );
        }
        if (nia07f_list43 != "") {
          setItemToResultList(
            "dev",
            "<li><a href='#' data-destination='nia07f43' class='result-focus label-orange'>07-F</a> : Un problème a été detecté <span class='cy-hidden'>pour l'élement de menu n°" + nia07f_list43.slice(0, -1) + "</span>: un item du menu sans sous-menu contient une liste ul</li>"
          );
        }
        if (nia07f_list44 != "") {
          setItemToResultList(
            "dev",
            "<li><a href='#' data-destination='nia07f44' class='result-focus label-orange'>07-F</a> : Un problème a été detecté <span class='cy-hidden'>pour l'élement de menu n°" + nia07f_list44.slice(0, -1) + "</span>: présence d'attributs aria-expanded ou aria-haspopup sur un item du menu</li>"
          );
        }
      }
      const nia07f20_btn = document.querySelector(
        ".topnav > button.anchor.anchor-scroll, .page-headernav > button.anchor.anchor-scroll, .page-headernavmobile > button.anchor.anchor-scroll"
      );
      const nia07f21_btnClose = document.querySelector(
        '[aria-modal="true"] button.anchor-close, .anchor-destination.modal-menu button.anchor-close'
      );
      if (nia07f20_btn && (isItemVisible(nia07f20_btn) || nia07f21_btnClose && isItemVisible(nia07f21_btnClose))) {
        const nia07f20_btnText = cleanNode(nia07f20_btn).innerText;
        let nia07f20_btnDest = nia07f20_btn.getAttribute("data-destination");
        if (nia07f20_btnDest == null) nia07f20_btnDest = "";
        const nia07f30_Dest = document.querySelector(nia07f20_btnDest);
        if (nia07f30_Dest) {
          if (!nia07f20_btn.hasAttribute("aria-expanded")) {
            nia07f_isModal = true;
            if (paramFilter.debug_flag)
              console.log(" - Le menu mobile s'ouvre dans une modale");
            if (!nia07f20_btn.hasAttribute("aria-haspopup") && !paramFilter.only_nc) {
              if (paramFilter.debug_flag)
                console.log(
                  " - F5.1 : Absence de l'attribut aria-haspopup=dialog du bouton d'ouverture du menu"
                );
              setItemToResultList(
                "dev",
                "<li><a href='#' data-destination='nia07f51' class='result-focus label-yellow'>07-F</a> : Absence de l'attribut aria-haspopup=dialog du bouton d'ouverture du menu</li>"
              );
              setItemOutline(nia07f20_btn, "yellow", "nia07f51", "07-F");
            }
          } else {
            if (paramFilter.debug_flag)
              console.log(" - Le menu mobile s'ouvre dans un disclosure");
            if (nia07f20_btn.getAttribute("aria-expanded") == "true") {
              if (paramFilter.debug_flag)
                console.log(
                  " - F5.2 : Erreur dans la valeur de l'attribut aria-expanded du bouton d'ouverture du menu"
                );
              setItemToResultList(
                "dev",
                "<li><a href='#' data-destination='nia07f52' class='result-focus label-red'>07-F</a> : Erreur dans la valeur de l'attribut aria-expanded du bouton d'ouverture du menu</li>"
              );
              setItemOutline(nia07f20_btn, "red", "nia07f52", "07-F");
            }
            if (Boolean(nia07f30_Dest.closest('[role="dialog"]')) || Boolean(nia07f30_Dest.closest('[aria-modal="true"]'))) {
              if (paramFilter.debug_flag)
                console.log(
                  " - F5.3 : Conflit dans le type d'ouverture du menu : Modal ou Disclosure ?"
                );
              setItemToResultList(
                "dev",
                "<li><a href='#' data-destination='nia07f53' class='result-focus label-red'>07-F</a> : Conflit dans le type d'ouverture du menu : Modal ou Disclosure ?</li>"
              );
              setItemOutline(nia07f30_Dest, "red", "nia07f53", "07-F");
            }
            if (nia07f20_btn.hasAttribute("aria-haspopup")) {
              if (paramFilter.debug_flag)
                console.log(
                  " - F5.4 : Conflit entre les attributs aria-haspopup et aria-expanded du bouton d'ouverture du menu"
                );
              setItemToResultList(
                "dev",
                "<li><a href='#' data-destination='nia07f54' class='result-focus label-red'>07-F</a> : Conflit entre les attributs aria-haspopup et aria-expanded du bouton d'ouverture du menu</li>"
              );
              setItemOutline(nia07f20_btn, "red", "nia07f54", "07-F");
            }
          }
          if (nia07f30_Dest && nia07f30_Dest.hasAttribute("aria-hidden") && nia07f30_Dest.getAttribute("aria-hidden") == "false") {
            if (paramFilter.debug_flag)
              console.log(" - F5.5 : Vocalisation du menu caché en mobile");
            setItemToResultList(
              "dev",
              "<li><a href='#' data-destination='nia07f55' class='result-focus label-red'>07-F</a> : Vocalisation du menu caché en mobile</li>"
            );
            setItemOutline(nia07f30_Dest, "red", "nia07f55", "07-F");
          }
          if (!isItemVisible(nia07f30_Dest))
            nia07f20_btn.click();
          let lang;
          if (nia07f20_btn && nia07f20_btn.closest("[lang]"))
            lang = nia07f20_btn.closest("[lang]").getAttribute("lang");
          if (sanitizeText(
            cleanNode(nia07f20_btn).innerText,
            lang
          ) != sanitizeText(nia07f20_btnText, lang)) {
            if (paramFilter.debug_flag)
              console.log(
                " - F6.1 Attention le texte du bouton d'ouverture du menu à changé cela ne devrai pas être le cas"
              );
            if (paramFilter.debug_flag)
              console.log(nia07f20_btn.innerText);
            if (paramFilter.debug_flag) console.log(nia07f20_btnText);
            setItemToResultList(
              "dev",
              "<li><a href='#' data-destination='nia07f61' class='result-focus label-red'>07-F</a> : Attention le texte du bouton d'ouverture du menu change à l'ouverture du menu cela ne devrai pas être le cas</li>"
            );
            setItemOutline(nia07f20_btn, "red", "nia07f61", "07-F");
          }
          if (nia07f_isModal) {
            if (nia07f30_Dest && nia07f30_Dest.hasAttribute("aria-hidden") && nia07f30_Dest.getAttribute("aria-hidden") != "false") {
              if (paramFilter.debug_flag)
                console.log(
                  " - F6.2 Erreur dans la valeur de l'attribut aria-hidden du menu modal ouvert"
                );
              if (paramFilter.debug_flag)
                console.log(nia07f30_Dest.getAttribute("aria-hidden"));
              if (paramFilter.debug_flag)
                console.log(
                  nia07f30_Dest.getAttribute("aria-hidden") != "false"
                );
              setItemToResultList(
                "dev",
                "<li><a href='#' data-destination='nia07f62' class='result-focus label-red'>07-F</a> : Erreur dans la valeur de l'attribut aria-hidden du menu modal ouvert</li>"
              );
              setItemOutline(nia07f30_Dest, "red", "nia07f62", "07-F");
            }
            if (nia07f30_Dest && !nia07f30_Dest.hasAttribute("aria-modal") || nia07f30_Dest.getAttribute("aria-modal") != "true") {
              if (paramFilter.debug_flag)
                console.log(
                  " - F6.3 Erreur dans la valeur de l'attribut aria-modal du menu modal ouvert"
                );
              if (paramFilter.debug_flag)
                console.log(!nia07f30_Dest.hasAttribute("aria-modal"));
              if (paramFilter.debug_flag)
                console.log(nia07f30_Dest.getAttribute("aria-modal") != "true");
              setItemToResultList(
                "dev",
                "<li><a href='#' data-destination='nia07f63' class='result-focus label-red'>07-F</a> : Erreur dans la valeur de l'attribut aria-modal du menu modal ouvert</li>"
              );
              setItemOutline(nia07f30_Dest, "red", "nia07f63", "07-F");
            }
            if (nia07f30_Dest && !nia07f30_Dest.hasAttribute("role") || nia07f30_Dest.getAttribute("role") != "dialog") {
              if (paramFilter.debug_flag)
                console.log(
                  " - F6.4 Erreur dans la valeur de l'attribut role du menu modal ouvert"
                );
              setItemToResultList(
                "dev",
                "<li><a href='#' data-destination='nia07f64' class='result-focus label-red'>07-F</a> : Erreur dans la valeur de l'attribut role du menu modal ouvert</li>"
              );
              setItemOutline(nia07f30_Dest, "red", "nia07f64", "07-F");
            }
            if (nia07f30_Dest && !(nia07f30_Dest.hasAttribute("aria-label") || nia07f30_Dest.hasAttribute("aria-labelledby"))) {
              if (paramFilter.debug_flag)
                console.log(
                  " - F6.5 Erreur dans la valeur de l'attribut aria-label du menu modal ouvert"
                );
              setItemToResultList(
                "dev",
                "<li><a href='#' data-destination='nia07f65' class='result-focus label-red'>07-F</a> : Erreur dans la valeur de l'attribut aria-label du menu modal ouvert</li>"
              );
              setItemOutline(nia07f30_Dest, "red", "nia07f65", "07-F");
            }
            if (nia07f30_Dest && nia07f30_Dest.querySelector(
              "input, a, button, select, summary, textarea, [tabindex]"
            ).tagName != "BUTTON" || !nia07f30_Dest.querySelector(
              "input, a, button, select, summary, textarea, [tabindex]"
            ).classList.contains("anchor-close")) {
              if (paramFilter.debug_flag)
                console.log(
                  " - F6.6 Erreur au niveau du bouton close du menu modal ouvert"
                );
              setItemToResultList(
                "dev",
                "<li><a href='#' data-destination='nia07f66' class='result-focus label-orange'>07-F</a> : Le premier élément interactif de la fenêtre modale du menu doit être le button de fermeture</li>"
              );
              setItemOutline(nia07f30_Dest, "orange", "nia07f66", "07-F");
            }
          } else {
            if (nia07f30_Dest && nia07f30_Dest.hasAttribute("aria-hidden") && nia07f30_Dest.getAttribute("aria-hidden") != "false") {
              if (paramFilter.debug_flag)
                console.log(
                  " - F6.7 Erreur dans la valeur de l'attribut aria-hidden du menu disclosure ouvert"
                );
              setItemToResultList(
                "dev",
                "<li><a href='#' data-destination='nia07f67' class='result-focus label-red'>07-F</a> : Erreur dans la valeur de l'attribut aria-hidden du menu disclosure ouvert</li>"
              );
              setItemOutline(nia07f30_Dest, "red", "nia07f67", "07-F");
            }
            if (nia07f30_Dest && nia07f30_Dest.hasAttribute("aria-modal") && nia07f30_Dest.getAttribute("aria-modal") == "true") {
              if (paramFilter.debug_flag)
                console.log(
                  " - F6.8 Erreur dans la valeur de l'attribut aria-modal du menu disclosure ouvert"
                );
              setItemToResultList(
                "dev",
                "<li><a href='#' data-destination='nia07f68' class='result-focus label-red'>07-F</a> : Erreur dans la valeur de l'attribut aria-modal du menu disclosure ouvert</li>"
              );
              setItemOutline(
                nia07f30_Dest,
                "red",
                "nia07f68",
                "07-F"
              );
            }
            if (nia07f30_Dest && nia07f30_Dest.hasAttribute("role") && nia07f30_Dest.getAttribute("role") == "dialog") {
              if (paramFilter.debug_flag)
                console.log(
                  " - F6.9 Erreur dans la valeur de l'attribut role du menu disclosure ouvert"
                );
              setItemToResultList(
                "dev",
                "<li><a href='#' data-destination='nia07f69' class='result-focus label-red'>07-F</a> : Erreur dans la valeur de l'attribut role du menu disclosure ouvert</li>"
              );
              setItemOutline(nia07f30_Dest, "red", "nia07f69", "07-F");
            }
          }
          if (isItemVisible(nia07f20_btn)) {
            nia07f20_btn.click();
          } else if (nia07f21_btnClose && isItemVisible(nia07f21_btnClose)) {
            nia07f21_btnClose.click();
          } else if (paramFilter.debug_flag) {
            console.log("Absence de bouton close ?");
            console.log(nia07f21_btnClose);
            console.log(isItemVisible(nia07f21_btnClose));
          }
        }
      }
    }
  }
}
function check_test_07g() {
  if (!paramFilter.only_redactor && paramPage.isAEM) {
    refactoring_template_1(
      "nav#headernav .nav--primary:not(ul), nav#headernav ul.nav--primary > .nav-item:not(li), nav#headernav ul.nav--primary > li.nav-item.has-subnav .subnav-item:not(li)",
      "07-G",
      "nia07g1",
      "dev",
      "red",
      "Les items du menu et du sous menu sont sous forme de liste ul/li"
    );
    conditionObject.nia07g2 = condition_test_07g2;
    refactoring_template_2(
      "nav#headernav :is(a,button)",
      "07-G",
      "nia07g2",
      "dev",
      "red",
      "Les éléments du menu et des sous_menus doivent avoir un intitulé"
    );
    conditionObject.nia07g3 = condition_test_07g3;
    refactoring_template_2(
      'nav#headernav li a[aria-current="page"]',
      "07-G",
      "nia07g3",
      "dev",
      "red",
      "Les pages parentes de la page courante doivent avoir un attribut aria_current='true'"
    );
    conditionObject.nia07g4 = condition_test_07g4;
    refactoring_template_2(
      'nav#headernav li a[aria-current="true"]',
      "07-G",
      "nia07g4",
      "dev",
      "red",
      "Une des pages enfant d'un menu actif doit avoir un attribut aria_current='page'"
    );
    refactoring_template_4(
      document.querySelectorAll('nav#headernav li a[aria-current="page"]') && document.querySelectorAll('nav#headernav li a[aria-current="page"]').length > 1,
      "07-G",
      "dev",
      "red",
      "Il ne peut y avoir qu'un seul élément dans le menu avec l'attribut aria_current='page'"
    );
  }
}
function condition_test_07g2(node) {
  return Boolean(!node.textContent || node.textContent == "");
}
function condition_test_07g3(node) {
  return Boolean(
    node.parentElement.closest(".has-subnav") && !(node.parentElement.closest(".has-subnav").getElementsByTagName("a")[0] && node.parentElement.closest(".has-subnav").getElementsByTagName("a")[0].hasAttribute("aria-current") && node.parentElement.closest(".has-subnav").getElementsByTagName("a")[0].getAttribute("aria-current") == "true")
  );
}
function condition_test_07g4(node) {
  return Boolean(
    node.parentElement.classList.contains("has-subnav") && !(node.parentElement.querySelectorAll(
      '.subnav-item > a[aria-current="page"], .subnav-item > a[aria-current="true"]'
    ) && node.parentElement.querySelectorAll(
      '.subnav-item > a[aria-current="page"], .subnav-item > a[aria-current="true"]'
    ).length == 1)
  );
}
function check_test_07h() {
  if (!paramFilter.only_redactor && paramPage.isAEM) {
    conditionObject.nia07h = condition_test_07h;
    refactoring_template_2(
      "header nav .nav-item.has-subnav > ul",
      "07-H",
      "nia07h",
      "dev",
      "red",
      "Présence d'un sous-menu contenant moins de 2 éléments"
    );
  }
}
function condition_test_07h(node) {
  return Boolean(isItemVisible(node) && node.getElementsByTagName.length < 2);
}
function check_test_07i() {
  if (!paramFilter.only_redactor && paramPage.isAEM) {
    const nia07i_nodes = document.querySelectorAll("header nav");
    let nia07i_flag = false;
    let nia07i_content = "";
    let nia07i_items;
    let nia07i_array = [];
    if (nia07i_nodes && nia07i_nodes.length > 0 && isItemsVisible(nia07i_nodes)) {
      for (let i = 0; i < nia07i_nodes.length; i++) {
        if (isItemVisible(nia07i_nodes[i])) {
          nia07i_items = nia07i_nodes[i].querySelectorAll(
            ".nav-item,.subnav-item"
          );
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
      if (nia07i_flag == true) {
        setItemToResultList(
          "man",
          "<li><a href='#' data-destination='nia07i' class='result-focus label-yellow'>07-I</a> : Nom de menu ou de sous-menu en double dans la navigation principale</li>"
        );
      }
    }
  }
}
function check_test_07j() {
  if (!paramFilter.only_redactor && paramPage.isAEM && paramPage.isSearchLogic) {
    conditionObject.nia07j = condition_test_07j;
    refactoring_template_2(
      "mark",
      "07-J",
      "nia07j",
      "nth",
      "yellow",
      "Le terme recherché doit être mis en relief avec un soulignement pointillé"
    );
  }
}
function condition_test_07j(node) {
  return Boolean(
    isItemVisible(node) && !(window.getComputedStyle(node, null).textDecorationLine == "dotted" || window.getComputedStyle(node, null).textDecorationLine == "dashed" || window.getComputedStyle(node, null).borderBottomStyle == "dotted" || window.getComputedStyle(node, null).borderBottomStyle == "dashed")
  );
}
function check_test_07k() {
  if (!paramFilter.only_redactor && paramPage.isAEM && paramPage.isCTIE) {
    refactoring_template_3(
      'footer .footer__copyright a.renow[href="https://renow.public.lu"] img[alt="Renow"]',
      "07-K",
      "nth",
      "yellow",
      "Le logo Renow est absent du footer ou celui-ci ne redirige pas vers renow.public.lu"
    );
  }
}
function check_test_07l() {
  if (!paramFilter.only_redactor) {
    conditionObject.nia07l = condition_test_07l;
    refactoring_template_2(
      "body,h1,h2,h3,p,li,strong,em,a,dt,dd,span:not(.checkA11YSpan)",
      "07-L",
      "nia07l",
      "nth",
      "yellow",
      'Le dernier élément de substitution dans font-family doit être une famille générique : "serif" ou "sans-serif"'
    );
  }
}
function condition_test_07l(node) {
  return Boolean(
    isItemVisible(node) && !(window.getComputedStyle(node, null).getPropertyValue("font-family").indexOf("serif") > -1)
  );
}
function check_part_07() {
  if (paramFilter.debug_flag) console.log("07 AEM Component");
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
  refactoring_template_1(
    ':where([role="table"],table:not([role="presentation"])) th:not([scope="row"]):not([scope="col"]):not([id]):not([headers]):not([role="rowheader"]):not([role="columnheader"]):not(:only-child)',
    "08-A",
    "nia08a",
    "nc",
    "red",
    "Absence de l'attribut scope sur les en-tete de tableau [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-5-7-1' target='_blank'>RAWeb 5.7.1</a>]"
  );
}
function check_test_08b() {
  refactoring_template_1(
    ':where([role="table"],table):where([align],[bgcolor],[border],[frame],[cellpadding],[cellspacing],[width],[summary],[rules])',
    "08-B",
    "nia08b",
    "nc",
    "red",
    "Presence d'attribut obsolete sur un tableau"
  );
}
function check_test_08c() {
  refactoring_template_1(
    "th[header], td[header]",
    "08-C",
    "nia08c",
    "nth",
    "yellow",
    "Presence attributs header obsolete dans un tableau"
  );
}
function check_test_08d() {
  refactoring_template_1(
    'table[role="presentation"][summary], table[role="presentation"] :where(caption,thead,th,tfoot,[role="rowheader"],[role="columnheader"],td[scope],td[headers],td[axis])',
    "08-D",
    "nia08d",
    "nc",
    "red",
    "Presence d'élements incompatible avec un tableau de mise en forme [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-5-8-1' target='_blank'>RAWeb 5.8.1</a>]"
  );
}
function check_test_08e() {
  conditionObject.nia08e = condition_test_08e;
  refactoring_template_2(
    ':where([role="table"],table:not([role="presentation"]))',
    "08-E",
    "nia08e",
    "nc",
    "red",
    "Présence d'un tableau de données sans en-tête [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-5-6-1' target='_blank'>RAWeb 5.6.1</a>]"
  );
}
function condition_test_08e(node) {
  return Boolean(
    isItemVisible(node) && node.innerHTML.indexOf("<th") < 0 && node.innerHTML.indexOf(' role="columnheader"') < 0 && node.innerHTML.indexOf(' role="rowheader"') < 0
  );
}
function check_test_08f() {
  conditionObject.nia08f1 = condition_test_08f1;
  refactoring_template_2(
    'table:not([summary]):not([aria-describedby]):not([role="presentation"])',
    "08-F",
    "nia08f1",
    "nc",
    "red",
    "Présence d'un tableau complexe sans résumé [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-5-1-1' target='_blank'>RAWeb 5.1.1</a>]"
  );
  conditionObject.nia08f2 = condition_test_08f2;
  refactoring_template_2(
    'table:not([summary]):not([aria-describedby]):not([role="presentation"])',
    "08-F",
    "nia08f2",
    "nth",
    "yellow",
    "Présence d'un tableau de données sans résumé"
  );
}
function isTableComplex(elem) {
  const th_multiple = elem.querySelectorAll(
    "tbody > tr > *:not(*:first-child)"
  );
  let nia08f_rowspan, nia08f_colspan;
  for (let i = 0; i < th_multiple.length; i++) {
    if (th_multiple[i].nodeName == "TH") {
      return true;
    }
  }
  const th_all = elem.querySelectorAll("tr > th");
  for (let i = 0; i < th_all.length; i++) {
    nia08f_rowspan = th_all[i].getAttribute("rowSpan");
    nia08f_colspan = th_all[i].getAttribute("colSpan");
    if (nia08f_rowspan != null && Number(nia08f_rowspan) > 1 || nia08f_colspan != null && Number(nia08f_colspan) > 1)
      return true;
  }
  return false;
}
function condition_test_08f1(node) {
  return Boolean(
    isItemVisible(node) && (!node.querySelector(":scope > caption") || node.querySelector(":scope > caption").textContent == "") && isTableComplex(node)
  );
}
function condition_test_08f2(node) {
  return Boolean(
    isItemVisible(node) && (!node.querySelector(":scope > caption") || node.querySelector(":scope > caption").textContent == "") && !isTableComplex(node)
  );
}
function check_part_08() {
  if (paramFilter.debug_flag) console.log("08 Tableau");
  check_test_08a();
  check_test_08b();
  check_test_08c();
  check_test_08d();
  check_test_08e();
  check_test_08f();
}
function check_test_09a() {
  if (paramPage.isSitemap && paramPage.isAEM) {
    const nia09a1_footer = document.querySelectorAll(
      '.page-footernav a[href*="contact"][href$=".html"]'
    );
    const nia09a2_footer = document.querySelectorAll(
      '.page-footernav a[href*="accessibilite"][href$=".html"]'
    );
    const nia09a3_footer = document.querySelectorAll(
      '.page-footernav a[href*="aspects-legaux"][href$=".html"]'
    );
    const nia09a4_footer = document.querySelectorAll(
      '.page-footernav a[href*="a-propos"][href$=".html"]'
    );
    const nia09a1_sitemap = document.querySelectorAll(
      '.cmp-sitemap a[href*="contact"][href$=".html"]'
    );
    const nia09a2_sitemap = document.querySelectorAll(
      '.cmp-sitemap a[href*="accessibilite"][href$=".html"]'
    );
    const nia09a3_sitemap = document.querySelectorAll(
      '.cmp-sitemap a[href*="aspects-legaux"][href$=".html"]'
    );
    const nia09a4_sitemap = document.querySelectorAll(
      '.cmp-sitemap a[href*="a-propos"][href$=".html"]'
    );
    const nia09a5_support = document.querySelectorAll(
      '.cmp-sitemap a[href$="support.html"]'
    );
    if (nia09a1_footer && nia09a1_footer.length > 0 && (!nia09a1_sitemap || nia09a1_sitemap.length == 0)) {
      if (nia09a5_support && nia09a5_support.length > 0) {
        if (!paramFilter.only_nc) {
          setItemToResultList(
            "man",
            "<li><a href='#' data-destination='nia09a1' class='result-focus label-yellow'>09-A</a> : Présence de la page support mais il manque la page contact dans le plan du site, vérifier si c'est volontaire [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>"
          );
          setItemsOutline(nia09a1_footer, "yellow", "nia09a1", "09-A");
        }
      } else {
        setItemToResultList(
          "nc",
          "<li><a href='#' data-destination='nia09a1' class='result-focus label-red'>09-A</a> : Il manque la page contact dans le plan du site [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>"
        );
        setItemsOutline(nia09a1_footer, "red", "nia09a1", "09-A");
      }
    } else if (nia09a1_sitemap && nia09a1_sitemap.length > 0 && (!nia09a1_footer || nia09a1_footer.length == 0)) {
      setItemToResultList(
        "nc",
        "<li><a href='#' data-destination='nia09a1' class='result-focus label-red'>09-A</a> : Il manque la page contact dans le footer [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>"
      );
      setItemsOutline(nia09a1_sitemap, "red", "nia09a1", "09-A");
    }
    if (nia09a2_footer && nia09a2_footer.length > 0 && (!nia09a2_sitemap || nia09a2_sitemap.length == 0)) {
      if (nia09a5_support && nia09a5_support.length > 0) {
        if (!paramFilter.only_nc) {
          setItemToResultList(
            "man",
            "<li><a href='#' data-destination='nia09a2' class='result-focus label-yellow'>09-A</a> : Présence de la page support mais il manque la page Accessibilté dans le plan du site, vérifier si c'est volontaire [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>"
          );
          setItemsOutline(nia09a2_footer, "yellow", "nia09a2", "09-A");
        }
      } else {
        setItemToResultList(
          "nc",
          "<li><a href='#' data-destination='nia09a2' class='result-focus label-red'>09-A</a> : Il manque la page Accessibilité dans le plan du site [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>"
        );
        setItemsOutline(nia09a2_footer, "red", "nia09a2", "09-A");
      }
    } else if (nia09a2_sitemap && nia09a2_sitemap.length > 0 && (!nia09a2_footer || nia09a2_footer.length == 0)) {
      setItemToResultList(
        "nc",
        "<li><a href='#' data-destination='nia09a2' class='result-focus label-red'>09-A</a> : Il manque la page Accessibilité dans le footer [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>"
      );
      setItemsOutline(nia09a2_sitemap, "red", "nia09a2", "09-A");
    }
    if (nia09a3_footer && nia09a3_footer.length > 0 && (!nia09a3_sitemap || nia09a3_sitemap.length == 0)) {
      if (nia09a5_support && nia09a5_support.length > 0) {
        if (!paramFilter.only_nc) {
          setItemToResultList(
            "man",
            "<li><a href='#' data-destination='nia09a3' class='result-focus label-yellow'>09-A</a> : Présence de la page support mais il manque la page Aspect légaux dans le plan du site, vérifier si c'est volontaire [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>"
          );
          setItemsOutline(nia09a3_footer, "yellow", "nia09a3", "09-A");
        }
      } else {
        setItemToResultList(
          "nc",
          "<li><a href='#' data-destination='nia09a3' class='result-focus label-red'>09-A</a> : Il manque la page aspect légaux dans le plan du site [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>"
        );
        setItemsOutline(nia09a3_footer, "red", "nia09a3", "09-A");
      }
    } else if (nia09a3_sitemap && nia09a3_sitemap.length > 0 && (!nia09a3_footer || nia09a3_footer.length == 0)) {
      setItemToResultList(
        "nc",
        "<li><a href='#' data-destination='nia09a3' class='result-focus label-red'>09-A</a> : Il manque la page aspect légaux dans le footer [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>"
      );
      setItemsOutline(nia09a3_sitemap, "red", "nia09a3", "09-A");
    }
    if (nia09a4_footer && nia09a4_footer.length > 0 && (!nia09a4_sitemap || nia09a4_sitemap.length == 0)) {
      if (nia09a5_support && nia09a5_support.length > 0) {
        if (!paramFilter.only_nc) {
          setItemToResultList(
            "man",
            "<li><a href='#' data-destination='nia09a4' class='result-focus label-yellow'>09-A</a> : Présence de la page support mais il manque la page A propos dans le plan du site, vérifier si c'est volontaire [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>"
          );
          setItemsOutline(nia09a4_footer, "yellow", "nia09a4", "09-A");
        }
      } else {
        setItemToResultList(
          "nc",
          "<li><a href='#' data-destination='nia09a4' class='result-focus label-red'>09-A</a> : Il manque la page A propos dans le plan du site [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>"
        );
        setItemsOutline(nia09a4_footer, "red", "nia09a4", "09-A");
      }
    } else if (nia09a4_sitemap && nia09a4_sitemap.length > 0 && (!nia09a4_footer || nia09a4_footer.length == 0)) {
      setItemToResultList(
        "nc",
        "<li><a href='#' data-destination='nia09a4' class='result-focus label-red'>09-A</a> : Il manque la page A propos dans le footer [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>"
      );
      setItemsOutline(nia09a4_sitemap, "red", "nia09a4", "09-A");
    }
  }
}
function check_test_09b() {
  if (paramPage.isSitemap && paramPage.isAEM) {
    refactoring_template_1(
      '.cmp-sitemap a[href*="error.html"]',
      "09-B",
      "nia09b",
      "nth",
      "orange",
      "Presence de la page Error dans le plan du site"
    );
  }
}
function check_test_09c() {
  if (!paramFilter.only_redactor) {
    refactoring_template_1(
      '[tabindex]:not([tabindex="0"]):not([tabindex="-1"])',
      "09-C",
      "nia09c",
      "nth",
      "orange",
      "Presence d'attibut tabindex positif [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-8-1' target='_blank'>RAWeb 12.8.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/la-navigation-au-clavier-seffectue-dans-un-ordre-previsible' target='_blank'>Opquast 162</a>]"
    );
  }
}
function check_test_09d() {
  if (paramPage.isAEM && !paramPage.isOnePage) {
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
      'footer .page-footernav ul > li.nav-item a[href*="plan"][href$=".html"],footer .page-footernav ul > li.nav-item a[href*="seitenverzeichnis"][href$=".html"]'
    );
    const nia09d_footer_links = document.querySelectorAll(
      'footer .nav-item > a:not([target="_blank"])'
    );
    let nia09d_counter = 0;
    if (nia09d_nav && isItemVisible(nia09d_nav)) {
      nia09d_counter++;
    } else if (nia09d_nav_btn && isItemVisible(nia09d_nav_btn)) {
      nia09d_counter++;
    } else if (nia09d_nav && nia09d_nav_fixed && isItemVisible(nia09d_nav_fixed)) {
      nia09d_counter++;
    } else if (paramFilter.debug_flag) {
      console.log("navigation principale non trouvé");
    }
    if (nia09d_search && isItemVisible(nia09d_search)) {
      nia09d_counter++;
    } else if (nia09d_search_btn && isItemVisible(nia09d_search_btn)) {
      nia09d_counter++;
    } else if (nia09d_search && nia09d_search_fixed && isItemVisible(nia09d_search_fixed)) {
      nia09d_counter++;
    } else if (paramFilter.debug_flag) {
      console.log("recherche non trouvée");
    }
    if (nia09d_plan && isItemVisible(nia09d_plan)) {
      nia09d_counter++;
    } else if (paramFilter.debug_flag) {
      console.log("plan du site non trouvé");
    }
    if (nia09d_counter < 2) {
      if (nia09d_footer_links && nia09d_footer_links.length <= 3) {
        if (!paramFilter.only_nc) {
          setItemToResultList(
            "man",
            "<li><span class='result-focus label-yellow'>09-D</span> : Le site doit être muni de 2 systèmes de navigation (exception : One-page, etc.) [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-1-1' target='_blank'>RAWeb 12.1.1</a>]</li>"
          );
        }
      } else {
        setItemToResultList(
          "nc",
          "<li><span class='result-focus label-red'>09-D</span> : Le site doit être muni de 2 systèmes de navigation (exception : One-page, etc.) [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-1-1' target='_blank'>RAWeb 12.1.1</a>]</li>"
        );
      }
    }
  }
}
function check_test_09e() {
  if (!paramFilter.only_redactor && paramPage.isAEM) {
    conditionObject.nia09e1 = condition_test_09e1;
    refactoring_template_2(
      "body > .skiplinks a[href]",
      "09-E",
      "nia09e1",
      "man",
      "yellow",
      "Un skiplinks non visible (display:none) n'a pas de destination [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-7-1' target='_blank'>RAWeb 12.7.1</a>]"
    );
    conditionObject.nia09e2 = condition_test_09e2;
    refactoring_template_2(
      "body > .skiplinks a[href]",
      "09-E",
      "nia09e2",
      "dev",
      "red",
      "Un skiplinks n'est pas correctement lié à sa destination [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-7-1' target='_blank'>RAWeb 12.7.1</a>]"
    );
    conditionObject.nia09e3 = condition_test_09e3;
    refactoring_template_2(
      "body > .skiplinks, body > .xfpage > .skiplinks",
      "09-E",
      "nia09e3",
      "nth",
      "yellow",
      "Les skiplinks doivent se trouver dans un element nav avec un aria-label et un role=navigation"
    );
    if (!paramFilter.only_nc) {
      const nia09e4_nodes = document.querySelectorAll(
        "body > *:not(#orejime):not(#a42-ac):not(.checkA11YSpan):not(link):not(svg.iconset)"
      );
      if (!nia09e4_nodes[0].classList.contains("skiplinks") && !nia09e4_nodes[0].firstElementChild.classList.contains(
        "skiplinks"
      )) {
        setItemToResultList(
          "nth",
          "<li><a href='#' data-destination='nia09e4' class='result-focus label-yellow'>09-E</a> : Les skiplinks situé dans l’entête doivent être les premiers éléments tabulable de la page (hors modale des cookies)</li>"
        );
        setItemOutline(nia09e4_nodes[0], "yellow", "nia09e4", "09-E");
      }
    }
    conditionObject.nia09e5 = condition_test_09e5;
    refactoring_template_2(
      "body > .skiplinks a[href]",
      "09-E",
      "nia09e5",
      "nth",
      "yellow",
      "S’il y a plusieurs Skiplinks, ils doivent être structurée sous forme de liste 'ul'"
    );
    refactoring_template_3(
      'body > .skiplinks a[href="#main"], body > .xfpage > .skiplinks a[href="#main"]',
      "09-E",
      "nc",
      "red",
      "Absence de skiplinks pour aller à la zone de contenu principale [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-7-1' target='_blank'>RAWeb 12.7.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-page-contient-des-liens-dacces-rapide-places-au-debut-du-code-source' target='_blank'>Opquast 159</a>]"
    );
  }
}
function condition_test_09e1(node) {
  return Boolean(
    node.getAttribute("href") && !document.querySelector(node.getAttribute("href") || "") && isItemDisplayNone(node)
  );
}
function condition_test_09e2(node) {
  return Boolean(
    node.getAttribute("href") && !document.querySelector(node.getAttribute("href") || "") && !isItemDisplayNone(node)
  );
}
function condition_test_09e3(node) {
  return Boolean(
    node.firstElementChild && (node.firstElementChild.nodeName != "NAV" || !node.firstElementChild.hasAttribute("aria-label") || !node.firstElementChild.hasAttribute("role") || node.firstElementChild.getAttribute("role") != "navigation")
  );
}
function condition_test_09e5(node) {
  return Boolean(
    node.parentElement && node.parentElement.childElementCount > 1 && node.parentElement.nodeName != "LI"
  );
}
function check_test_09f() {
  if (!paramFilter.only_redactor && !paramFilter.only_nc) {
    const nia09f_nodes = document.querySelectorAll(
      '*:not(.cmp-text) > *:not(p) > a:not(.feed-item-timing):not(.cmp-breadcrumb__item-link):not(.geoportail-skip):not(.cmp-image__link), button, input:not([type="file"]):not([type="radio"]):not([type="checkbox"]), select, details, textarea, [tabindex="0"], [tabindex="-1"]'
    );
    let nia09f_flag = false;
    let nia09f_rect, nia09f_rect_parent;
    let nia09f_horizontal = 0, nia09f_vertical = 0;
    let nia09f_horizontal_parent = 0, nia09f_vertical_parent = 0;
    if (nia09f_nodes && nia09f_nodes.length > 0) {
      for (let i = 0; i < nia09f_nodes.length; i++) {
        if (isItemVisible(nia09f_nodes[i]) && !isItemSROnly(nia09f_nodes[i])) {
          nia09f_rect = nia09f_nodes[i].getBoundingClientRect();
          nia09f_horizontal = nia09f_rect["width"] + parseFloat(window.getComputedStyle(nia09f_nodes[i])["marginLeft"]) + parseFloat(window.getComputedStyle(nia09f_nodes[i])["marginRight"]);
          nia09f_vertical = nia09f_rect["height"] + parseFloat(window.getComputedStyle(nia09f_nodes[i])["marginTop"]) + parseFloat(
            window.getComputedStyle(nia09f_nodes[i])["marginBottom"]
          );
          if (nia09f_rect["width"] != 0 && nia09f_rect["height"] != 0) {
            if (nia09f_horizontal < 24 || nia09f_vertical < 24) {
              if (nia09f_nodes[i].parentElement && (nia09f_nodes[i].parentElement.tagName == "LI" || nia09f_nodes[i].parentElement.childElementCount == 1)) {
                nia09f_rect_parent = nia09f_nodes[i].parentElement.getBoundingClientRect();
                nia09f_horizontal_parent = nia09f_rect_parent["width"] + parseFloat(
                  window.getComputedStyle(
                    nia09f_nodes[i].parentElement
                  )["marginLeft"]
                ) + parseFloat(
                  window.getComputedStyle(
                    nia09f_nodes[i].parentElement
                  )["marginRight"]
                );
                nia09f_vertical_parent = nia09f_rect_parent["height"] + parseFloat(
                  window.getComputedStyle(
                    nia09f_nodes[i].parentElement
                  )["marginTop"]
                ) + parseFloat(
                  window.getComputedStyle(
                    nia09f_nodes[i].parentElement
                  )["marginBottom"]
                );
                if (nia09f_horizontal_parent < 24 || nia09f_vertical_parent < 24) {
                  if (nia09f_vertical_parent > 18 && nia09f_horizontal_parent > 50) ;
                  else {
                    if (paramFilter.debug_flag) console.log(nia09f_rect);
                    nia09f_flag = true;
                    setItemOutline(nia09f_nodes[i], "yellow", "nia09f", "09-F");
                  }
                }
              } else if (nia09f_nodes[i].parentElement && nia09f_nodes[i].parentElement.tagName != "P" && nia09f_nodes[i].parentElement.tagName != "SPAN" && nia09f_nodes[i].parentElement.tagName != "SMALL" && nia09f_nodes[i].parentElement.tagName != "DD" && nia09f_nodes[i].parentElement.tagName != "STRONG") {
                if (paramFilter.debug_flag) console.log(nia09f_rect);
                nia09f_flag = true;
                setItemOutline(nia09f_nodes[i], "yellow", "nia09f", "09-F");
              } else if (nia09f_vertical > 18 && nia09f_horizontal > 50) ;
              else {
                nia09f_flag = true;
                setItemOutline(nia09f_nodes[i], "yellow", "nia09f", "09-F");
              }
            }
          }
        }
      }
    }
    if (nia09f_flag == true) {
      setItemToResultList(
        "man",
        "<li><a href='#' data-destination='nia09f' class='result-focus label-yellow'>09-F</a> : Taille d'éléments interactifs minimum attendue est de 24px par 24px (marges comprises) [<a href='https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html' target='_blank'>WCAG 2.2 SC258</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/la-taille-des-elements-cliquables-est-suffisante' target='_blank'>Opquast 181</a>]</li>"
      );
    }
  }
}
function check_test_09g() {
  if (!paramFilter.only_redactor) {
    conditionObject.nia09g = condition_test_09g;
    refactoring_template_2(
      ".cmp-error404",
      "09-G",
      "nia09g",
      "nth",
      "orange",
      "Absence des items obligatoire sur la page d'erreur (Barre de recherche, lien vers l'accueil, le plan du site et la page contact)"
    );
  }
}
function condition_test_09g(node) {
  return Boolean(
    isItemVisible(node) && !(isItemVisible(node.querySelector("#topsearch")) && isItemVisible(node.querySelector("ul > li > a")) && isItemVisible(node.querySelector('a[href*="contact"]')) && isItemVisible(node.querySelector('a[href*="plan"]')))
  );
}
function check_part_09() {
  if (paramFilter.debug_flag) console.log("09 Navigation");
  check_test_09a();
  check_test_09b();
  check_test_09c();
  check_test_09d();
  check_test_09e();
  check_test_09f();
  check_test_09g();
}
function check_test_10a() {
  refactoring_template_1(
    "acronym,applet,basefont,big,center,dir,font,frame,frameset,isindex,noframes,s,strike,tt,u,blink,marquee",
    "10-A",
    "nia10a",
    "nc",
    "red",
    "Présence de balise HTML obsolètes ou servant à la présentation de l'information [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-10-1-1' target='_blank'>RAWeb 10.1.1</a>]"
  );
}
function check_test_10b() {
  refactoring_template_1(
    "i, *:not(.cmp-hours__list) > * > * > b",
    "10-B",
    "nia10b",
    "man",
    "yellow",
    'Présence de balises "i" ou "b", voir pour les remplacer par "em" et "strong" lorsque nécessaire'
  );
}
function check_test_10c() {
  refactoring_template_1(
    "link[rev], a[rev],link[charset], a[charset],a[shape],a[coords],img[longdesc], iframe[longdesc],link[target],area[nohref],head[profile],html[version],img[name],meta[scheme],object[archive],object[classid],object[codebase],object[codetype],object[declare],object[standby],param[valuetype],param[type],td[axis],t[axis],td[abbr], t[abbr],td[scope],caption[align], iframe[align], img[align], input[align], object[align], legend[align], table[align], hr[align], div[align], h1[align], h2[align], h3[align], h4[align], h5[align], h6[align], p[align], col[align], colgroup[align], tbody[align], td[align], tfoot[align], th[align], thead[align], tr[align],body[alink],body[link],body[vlink],body[text],body[background],table[bgcolor], tr[bgcolor], td[bgcolor], th[bgcolor], body[bgcolor],table[border], object[border],table[cellpadding],table[cellspacing],col[char], colgroup[char], tbody[char], td[char], tfoot[char], th[char], thead[char],tr[char],col[charoff], colgroup[charoff], tbody[charoff], td[charoff], tfoot[charoff], th[charoff], thead[charoff], tr[charoff],br[clear],dl[compact], menu[compact], ol[compact], ul[compact],table[frame],iframe[frameborder],img[hspace], object[hspace],img[vspace], object[vspace],iframe[marginheight],iframe[marginwidth],hr[noshade],td[nowrap], th[nowrap],table[rules],iframe[scrolling],hr[size],li[type], ol[type], ul[type],col[valign], colgroup[valign], tbody[valign], td[valign], tfoot[valign], th[valign], thead[valign], tr[valign],hr[width], table[width], td[width], th[width], col[width], colgroup[width], pre[width]",
    "10-C",
    "nia10c",
    "nc",
    "red",
    "Présence d'attributs HTML obsoletes"
  );
}
function check_test_10d() {
  refactoring_template_1(
    '[align], [alink], [background], [bgcolor], [border], [cellpadding], [cellspacing], [char], [charoff], [clear], [color], [compact], [frameborder], [hspace], [link], [marginheight], [marginwidth], [text], [valign], [vlink], [vspace], [size]:not(select), *:not(symbol) > *:not(g):not(svg[aria-hidden="true"]) > [width]:not(img):not(object):not(embed):not(canvas):not(svg):not(rect),*:not(symbol) > *:not(g):not(svg[aria-hidden="true"]) > [height]:not(img):not(object):not(embed):not(canvas):not(svg):not(rect)',
    "10-D",
    "nia10d",
    "nc",
    "red",
    "Présence d'attributs HTML servant à la présentation de l'information [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-10-1-2' target='_blank'>RAWeb 10.1.2</a>]"
  );
}
function check_part_10() {
  if (paramFilter.debug_flag) console.log("10 Old tag");
  check_test_10a();
  check_test_10b();
  check_test_10c();
  check_test_10d();
}
function check_test_11a() {
  if (!paramFilter.only_redactor) {
    refactoring_template_1(
      "html:not([lang])",
      "11-A",
      "nia11a",
      "nc",
      "red",
      "Aucune langue défini par défaut sur la page [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-3-1' target='_blank'>RAWeb 8.3.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-code-source-de-chaque-page-indique-la-langue-principale-du-contenu' target='_blank'>Opquast 125</a>]"
    );
  }
}
function check_test_11b() {
  if (!paramPage.isPrototype && !paramFilter.only_redactor) {
    conditionObject.nia11b = condition_test_11b;
    refactoring_template_2(
      ".cmp-text",
      "11-B",
      "nia11b",
      "nth",
      "orange",
      'Présence de "Lorem ipsum" sur la page'
    );
  }
}
function condition_test_11b(node) {
  return Boolean(
    isItemVisible(node) && node.textContent.includes("Lorem ipsum")
  );
}
function check_test_11c() {
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
    " ebenfalls "
  ];
  const nia11c_nodes = document.querySelectorAll(
    ".cmp-text, .cmp-focus-list-description"
  );
  let nia11c_flag1 = false;
  let nia11c_flag2 = false;
  let nia11c_lang;
  let nia11c_array_test;
  let nia11c_childlang;
  if (nia11c_nodes && nia11c_nodes.length > 0) {
    for (let i = 0; i < nia11c_nodes.length; i++) {
      if (nia11c_nodes[i] && nia11c_nodes[i].closest("[lang]"))
        nia11c_lang = nia11c_nodes[i].closest("[lang]").getAttribute("lang");
      if (nia11c_lang == "fr") {
        nia11c_array_test = nia11c_array_en.concat(nia11c_array_de);
      } else if (nia11c_lang == "en") {
        nia11c_array_test = nia11c_array_fr.concat(nia11c_array_de);
      } else if (nia11c_lang == "de") {
        nia11c_array_test = nia11c_array_fr.concat(nia11c_array_en);
      } else {
        break;
      }
      for (let j = 0; j < nia11c_array_test.length; j++) {
        if (nia11c_nodes[i].textContent.toLowerCase().includes(nia11c_array_test[j])) {
          if (paramFilter.debug_flag)
            console.log("keyword detected : " + nia11c_array_test[j]);
          nia11c_childlang = nia11c_nodes[i].querySelector("[lang]");
          if (nia11c_childlang) {
            setItemOutline(nia11c_nodes[i], "yellow", "nia11c", "11-C");
            nia11c_flag2 = true;
          } else {
            setItemOutline(nia11c_nodes[i], "orange", "nia11c", "11-C");
            nia11c_flag1 = true;
          }
          break;
        }
      }
    }
  }
  if (nia11c_flag1 == true) {
    setItemToResultList(
      "man",
      "<li><a href='#' data-destination='nia11c' class='result-focus label-orange'>11-C</a> : Forte probabilité de texte en langue étrangère présent sur la page (sans attribut 'lang')</li>"
    );
  } else if (nia11c_flag2 == true) {
    setItemToResultList(
      "man",
      "<li><a href='#' data-destination='nia11c' class='result-focus label-yellow'>11-C</a> : Forte probabilité de texte en langue étrangère présent sur la page</li>"
    );
  }
}
function check_part_11() {
  if (paramFilter.debug_flag) console.log("11 Langue");
  check_test_11a();
  check_test_11b();
  check_test_11c();
}
function check_test_12a() {
  if (!paramFilter.only_redactor && paramPage.isAEM) {
    refactoring_template_1(
      '.topsearch:not([role="search"]), html[lang="fr"] .topsearch:not([aria-label="Globale"])',
      "12-A",
      "nia12a",
      "dev",
      "red",
      "Absence de certaines propriétés sur le champ de recherche (role=search et aria-label=Globale)"
    );
  }
}
function check_test_12b() {
  if (paramPage.isAEM) {
    refactoring_template_1(
      'html[lang="fr"] #topsearch > #search-field-top:not([title^="Rechercher"]), html[lang="fr"] #topsearch > #search-field-top:not([placeholder^="Rechercher"]), html[lang="fr"] #topsearch > button:not([title^="Rechercher"])',
      "12-B",
      "nia12b",
      "dev",
      "red",
      "Problème dans les intitulés du champ de recherche (title et placeholder)"
    );
  }
}
function check_test_12c() {
  if (paramPage.isAEM) {
    const nia12c_nodes = document.querySelectorAll(
      '.topsearch button:not(.anchor-close), button.anchor[data-destination^="#headernav"]:not(.anchor-close), button.anchor[data-destination^="#filters"]:not(.anchor-close), button.anchor[data-destination^="#bloub"]:not(.anchor-close)'
    );
    let nia12c_title = "", nia12c_content = "", nia12c_lang, nia12c_label = "", nia12c_cleanNode;
    let nia12c1_flag = false, nia12c2_flag = false, nia12c3_flag = false;
    if (nia12c_nodes && nia12c_nodes.length > 0) {
      for (let i = 0; i < nia12c_nodes.length; i++) {
        if (isItemVisible(nia12c_nodes[i])) {
          if (nia12c_nodes[i] && nia12c_nodes[i].closest("[lang]"))
            nia12c_lang = nia12c_nodes[i].closest("[lang]").getAttribute("lang");
          if (nia12c_nodes[i].hasAttribute("title"))
            nia12c_title = sanitizeText(
              nia12c_nodes[i].getAttribute("title"),
              nia12c_lang
            );
          if (nia12c_nodes[i].hasAttribute("aria-label"))
            nia12c_label = sanitizeText(
              nia12c_nodes[i].getAttribute("aria-label"),
              nia12c_lang
            );
          nia12c_cleanNode = cleanNode(nia12c_nodes[i]);
          nia12c_content = sanitizeText(
            nia12c_cleanNode.innerText != "" ? nia12c_cleanNode.innerText : nia12c_cleanNode.textContent,
            nia12c_lang
          );
          if (nia12c_nodes[i].hasAttribute("title") && !nia12c_title.includes(nia12c_content)) {
            if (paramFilter.debug_flag)
              console.log(
                "%cERROR",
                "font-weight:700;color:darkred",
                "[" + nia12c_title + "] VS [" + nia12c_content + "] "
              );
            setItemOutline(nia12c_nodes[i], "red", "nia12c1", "12-C");
            nia12c1_flag = true;
          }
          if (nia12c_nodes[i].hasAttribute("title") && nia12c_nodes[i].hasAttribute("aria-label") && nia12c_label != nia12c_title) {
            setItemOutline(nia12c_nodes[i], "red", "nia12c2", "12-C");
            nia12c2_flag = true;
          }
          if (nia12c_nodes[i].hasAttribute("title") && !nia12c_nodes[i].hasAttribute("aria-label") && nia12c_title != nia12c_content && !paramFilter.only_redactor && !paramFilter.only_nc) {
            setItemOutline(nia12c_nodes[i], "yellow", "nia12c3", "12-C");
            nia12c3_flag = true;
          }
        }
      }
    }
    if (nia12c1_flag == true) {
      setItemToResultList(
        "nc",
        "<li><a href='#' data-destination='nia12c1' class='result-focus label-red'>12-C</a> : L'attribut title d'un bouton du site ne reprend pas son contenu textuel</li>"
      );
    }
    if (nia12c2_flag == true) {
      setItemToResultList(
        "nc",
        "<li><a href='#' data-destination='nia12c2' class='result-focus label-red'>12-C</a> : L'attribut title d'un bouton du site n'est pas identique à son aria-label </li>"
      );
    }
    if (nia12c3_flag == true && !paramFilter.only_nc) {
      setItemToResultList(
        "dev",
        "<li><a href='#' data-destination='nia12c3' class='result-focus label-yellow'>12-C</a> : L'attribut title d'un bouton du site, différent de son contenu textuel, n'est pas completé par un attribut aria-label </li>"
      );
    }
  }
}
function check_test_12d() {
  if (!paramFilter.only_redactor) {
    refactoring_template_1(
      "button[role=button]",
      "12-D",
      "nia12d",
      "dev",
      "yellow",
      "Il n'est pas nécessaire d'ajouter un role button sur un éléments boutons"
    );
  }
}
function check_part_12() {
  if (paramFilter.debug_flag) console.log("12 Boutons");
  check_test_12a();
  check_test_12b();
  check_test_12c();
  check_test_12d();
}
function check_test_13a() {
  conditionObject.nia13a = condition_test_13a;
  refactoring_template_2(
    ".cmp-text, *:not(.cmp-text) > p",
    "13-A",
    "nia13a",
    "nth",
    "yellow",
    "Présence d'espaces pour créer des effets de marges ou d'alignement (touche espace ou retour à la ligne) [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-10-1-3' target='_blank'>RAWeb 10.1.3</a>]"
  );
}
function condition_test_13a(node) {
  return Boolean(
    isItemVisible(node) && node.innerText && (/ {3,}/g.test(node.innerText) || /\s{4,}/g.test(node.innerText))
  );
}
let nia13b_limit = 14;
function check_test_13b() {
  if (screen.width < 500) {
    nia13b_limit = 12;
  }
  conditionObject.nia13b1 = condition_test_13b1;
  refactoring_template_2(
    "main .cmp-section *:not(.cmp-contentbox) > .cmp-text p",
    "13-B",
    "nia13b1",
    "nth",
    "yellow",
    "Taille de police recommandée pour le texte principal : 16px sur desktop et de 14px sur mobile"
  );
  conditionObject.nia13b2 = condition_test_13b2;
  refactoring_template_2(
    "p, span, li:not(.cmp-carousel__indicator), strong, h1, h2, h3, h4, h5, small, a, button, blockquote, q, dd, dt, label",
    "13-B",
    "nia13b2",
    "nth",
    "yellow",
    "Taille de police minimum recommandée pour le texte secondaire : 12px"
  );
}
function condition_test_13b1(node) {
  const fs = parseFloat(window.getComputedStyle(node).getPropertyValue("font-size"));
  return Boolean(
    isItemVisible(node) && fs > 0 && fs < nia13b_limit
  );
}
function condition_test_13b2(node) {
  const fs = parseFloat(window.getComputedStyle(node).getPropertyValue("font-size"));
  return Boolean(
    isItemVisible(node) && fs > 0 && fs < 11
  );
}
function check_test_13c() {
  if (paramPage.isDecla) {
    refactoring_template_3(
      ".basic-information.organization-name",
      "13-C",
      "nc",
      "red",
      "Information manquante dans la déclaration d'accessibilité : Organisme déclarant"
    );
    refactoring_template_3(
      ".basic-information.website-name",
      "13-C",
      "nc",
      "red",
      "Information manquante dans la déclaration d'accessibilité : Nom du site"
    );
    refactoring_template_3(
      ".basic-information.conformance-status",
      "13-C",
      "nc",
      "red",
      "Information manquante dans la déclaration d'accessibilité : état de conformité"
    );
    refactoring_template_3(
      ".basic-information.statement-created-date",
      "13-C",
      "nc",
      "red",
      "Information manquante dans la déclaration d'accessibilité : Date de la déclaration"
    );
    refactoring_template_3(
      ".basic-information.feedback > .email",
      "13-C",
      "nc",
      "red",
      "Information manquante dans la déclaration d'accessibilité : Email de contact"
    );
  }
}
function check_part_13() {
  if (paramFilter.debug_flag) console.log("13 Rédaction");
  check_test_13a();
  check_test_13b();
  check_test_13c();
}
function check_test_14a() {
  refactoring_template_1(
    'h1[role]:not([role="heading"]),h2[role]:not([role="heading"]),h3[role]:not([role="heading"]),h4[role]:not([role="heading"]),h5[role]:not([role="heading"]),h6[role]:not([role="heading"])',
    "14-A",
    "nia14a",
    "nc",
    "red",
    "Présence de titre avec un attribut role"
  );
}
function check_test_14b() {
  refactoring_template_1(
    '[aria-level]:not(h1):not(h2):not(h3):not(h4):not(h5):not(h6):not([role="heading"])',
    "14-B",
    "nia14b",
    "nc",
    "red",
    "Présence d'attribut aria-level en dehors de titre"
  );
}
function check_test_14c() {
  if (!paramFilter.only_redactor) {
    const nia14c_nodes = document.querySelectorAll(
      "h1[aria-hidden],h2[aria-hidden],h3[aria-hidden],h4[aria-hidden],h5[aria-hidden],h6[aria-hidden]"
    );
    const nia14c_heading = document.querySelectorAll(
      "h1:not([aria-hidden]),h2:not([aria-hidden]),h3:not([aria-hidden]),h4:not([aria-hidden]),h5:not([aria-hidden]),h6:not([aria-hidden])"
    );
    let nia14c_flag = false;
    let nia14c_find = false;
    if (nia14c_nodes && nia14c_nodes.length > 0 && isItemsVisible(nia14c_nodes)) {
      for (let i = 0; i < nia14c_nodes.length; i++) {
        if (isItemVisible(nia14c_nodes[i])) {
          nia14c_find = false;
          for (let j = 0; j < nia14c_heading.length; j++) {
            if (nia14c_nodes[i].tagName == nia14c_heading[j].tagName && sanitizeText(cleanNode(nia14c_nodes[i]).textContent, "fr") == sanitizeText(cleanNode(nia14c_heading[j]).textContent, "fr")) {
              nia14c_find = true;
              break;
            }
          }
          if (nia14c_find == false) {
            setItemOutline(nia14c_nodes[i], "red", "nia14c", "14-C");
            nia14c_flag = true;
          }
        }
      }
    }
    if (nia14c_flag == true) {
      setItemToResultList(
        "nc",
        "<li><a href='#' data-destination='nia14c' class='result-focus label-red'>14-C</a> : Présence de titre caché aux outils d'assistance</li>"
      );
    }
  }
}
function check_test_14d() {
  conditionObject.nia14d = condition_test_14d;
  refactoring_template_2(
    "p:not(.cmp-form__mandatory-text) > :where(strong, b):first-child ,span > :where(strong, b):first-child ,div > :where(strong, b):first-child , *:not(.accordionItem) > *:not(figcaption):not(.article-summary):not(.article-metas):not(.search-metas):not(.cmp-grid__textContainer):not(.feed-item-content):not(.meta-themes):not(.description):not(.meta-published-update) > p:not(.cmp-lastupdate):not(.cmp-form__mandatory-text):not(.at):not(.feed-item-author):not(.orejime-Notice-description):first-child",
    "14-D",
    "nia14d",
    "nth",
    "yellow",
    "Présence de texte ressemblant à des titres n'étant pas balisé comme tel - A vérifier au cas par cas [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-1-3' target='_blank'>RAWeb 9.1.3</a>]"
  );
}
function condition_test_14d(node) {
  return Boolean(
    isItemVisible(node) && node.textContent && node.textContent.length > 0 && node.textContent.length < 150 && parseFloat(window.getComputedStyle(node).getPropertyValue("font-size")) > 16 && (window.getComputedStyle(node).getPropertyValue("font-weight") == "bold" || window.getComputedStyle(node).getPropertyValue("font-weight") == "bolder" || window.getComputedStyle(node).getPropertyValue("font-weight") == "500" || window.getComputedStyle(node).getPropertyValue("font-weight") == "600" || window.getComputedStyle(node).getPropertyValue("font-weight") == "700" || window.getComputedStyle(node).getPropertyValue("font-weight") == "800" || window.getComputedStyle(node).getPropertyValue("font-weight") == "900") && node.parentNode && node == node.parentNode.firstElementChild && (node == node.parentNode.firstChild || node.parentNode.firstChild && node.parentNode.firstChild.nodeName == "#text" && node.parentNode.firstChild.textContent == "") && node.childElementCount == 0
  );
}
function check_test_14e() {
  if (!paramFilter.only_nc) {
    const nia14e_nodes = document.querySelectorAll(
      ':where(h1,h2,h3,h4,h5,h6,[role="heading"]):not([aria-hidden])'
    );
    let nia14e_flag = false;
    let nia14e_current_level = 0, nia14e_previous_level = 0;
    if (nia14e_nodes && nia14e_nodes.length > 0) {
      for (let i = 0; i < nia14e_nodes.length; i++) {
        if (isItemVisible(nia14e_nodes[i])) {
          if (nia14e_nodes[i].tagName == "H1" || nia14e_nodes[i].hasAttribute("aria-level") && nia14e_nodes[i].hasAttribute("role") && nia14e_nodes[i].getAttribute("aria-level") == "1" && nia14e_nodes[i].getAttribute("role") == "heading") {
            nia14e_current_level = 1;
          } else if (nia14e_nodes[i].tagName == "H3" || nia14e_nodes[i].hasAttribute("aria-level") && nia14e_nodes[i].hasAttribute("role") && nia14e_nodes[i].getAttribute("aria-level") == "3" && nia14e_nodes[i].getAttribute("role") == "heading") {
            nia14e_current_level = 3;
          } else if (nia14e_nodes[i].tagName == "H4" || nia14e_nodes[i].hasAttribute("aria-level") && nia14e_nodes[i].hasAttribute("role") && nia14e_nodes[i].getAttribute("aria-level") == "4" && nia14e_nodes[i].getAttribute("role") == "heading") {
            nia14e_current_level = 4;
          } else if (nia14e_nodes[i].tagName == "H5" || nia14e_nodes[i].hasAttribute("aria-level") && nia14e_nodes[i].hasAttribute("role") && nia14e_nodes[i].getAttribute("aria-level") == "5" && nia14e_nodes[i].getAttribute("role") == "heading") {
            nia14e_current_level = 5;
          } else if (nia14e_nodes[i].tagName == "H6" || nia14e_nodes[i].hasAttribute("aria-level") && nia14e_nodes[i].hasAttribute("role") && nia14e_nodes[i].getAttribute("aria-level") == "6" && nia14e_nodes[i].getAttribute("role") == "heading") {
            nia14e_current_level = 6;
          } else {
            nia14e_current_level = 2;
          }
          if (nia14e_current_level - nia14e_previous_level > 1) {
            setItemOutline(nia14e_nodes[i], "yellow", "nia14e", "14-E");
            if (paramFilter.debug_flag)
              console.log(
                "  > " + nia14e_nodes[i].innerText + " | current : " + nia14e_current_level + " | previous :" + nia14e_previous_level
              );
            nia14e_flag = true;
          }
          nia14e_previous_level = nia14e_current_level;
        }
      }
    }
    if (nia14e_flag == true) {
      setItemToResultList(
        "nth",
        '<li><a href="#" data-destination="nia14e" class="result-focus label-yellow">14-E</a> : Présence de sauts de titres [<a href="https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-1-1" target="_blank">RAWeb 9.1.1</a>]</li>'
      );
    }
  }
}
function check_test_14f() {
  if (!paramFilter.only_nc) {
    const nia14f_nodes = document.querySelectorAll(
      'h1, [role="heading"][aria-level="1"]'
    );
    let nia14f_flag = false;
    let nia14f_counter = 0;
    if (nia14f_nodes && nia14f_nodes.length > 1 && isItemsVisible(nia14f_nodes)) {
      for (let i = 0; i < nia14f_nodes.length; i++) {
        if (isItemVisible(nia14f_nodes[i])) {
          nia14f_counter++;
        }
      }
      if (nia14f_counter > 1) nia14f_flag = true;
    }
    if (nia14f_flag == true) {
      setItemToResultList(
        "man",
        '<li><a href="#" data-destination="nia14f" class="result-focus label-yellow">14-F</a> : Présence de 2 titres H1. Pertinence de ceux-ci à vérifier manuellement</li>'
      );
      setItemsOutline(nia14f_nodes, "yellow", "nia14f", "14-F");
    }
  }
}
function check_part_14() {
  if (paramFilter.debug_flag) console.log("14 Titre");
  check_test_14a();
  check_test_14b();
  check_test_14c();
  check_test_14d();
  check_test_14e();
  check_test_14f();
}
function check_test_15a() {
  if (paramFilter.only_redactor) {
    refactoring_template_1(
      '.cmp-text a[target="_blank"]:not([rel~="noreferrer"]):not([rel~="noopener"])',
      "15-A",
      "nia15a",
      "dev",
      "yellow",
      `Doter chaque lien ayant un attribut target="_blank" d'un attribut rel="noreferrer noopener". [<a href="https://checklists.opquast.com/fr/assurance-qualite-web/les-liens-externes-qui-ouvrent-une-nouvelle-fenetre-ne-partagent-pas-dinformation-de-contexte" target="_blank">Opquast 25</a>]`
    );
  } else {
    refactoring_template_1(
      'a[target="_blank"]:not([rel~="noreferrer"]):not([rel~="noopener"])',
      "15-A",
      "nia15a",
      "dev",
      "yellow",
      `Doter chaque lien ayant un attribut target="_blank" d'un attribut rel="noreferrer noopener". [<a href="https://checklists.opquast.com/fr/assurance-qualite-web/les-liens-externes-qui-ouvrent-une-nouvelle-fenetre-ne-partagent-pas-dinformation-de-contexte" target="_blank">Opquast 25</a>]`
    );
  }
}
function check_test_15b() {
  if (paramFilter.only_redactor) {
    refactoring_template_1(
      '.cmp-text a[target="_blank"][href^="http://"]',
      "15-B",
      "nia15b",
      "nth",
      "yellow",
      'Les pages utilisant le protocole HTTPS ne doivent pas proposer de ressources HTTP [<a href="https://checklists.opquast.com/fr/assurance-qualite-web/les-pages-utilisant-le-protocole-https-ne-proposent-pas-de-ressources-http" target="_blank">Opquast 195</a>]'
    );
  } else {
    refactoring_template_1(
      'a[target="_blank"][href^="http://"]',
      "15-B",
      "nia15b",
      "nth",
      "yellow",
      'Les pages utilisant le protocole HTTPS ne doivent pas proposer de ressources HTTP [<a href="https://checklists.opquast.com/fr/assurance-qualite-web/les-pages-utilisant-le-protocole-https-ne-proposent-pas-de-ressources-http" target="_blank">Opquast 195</a>]'
    );
  }
}
function check_test_15c() {
  if (!paramFilter.only_redactor) {
    refactoring_template_4(
      window.location.protocol != "https:",
      "15-C",
      "dev",
      "red",
      'Les pages doivent utiliser le protocole HTTPS [<a href="https://checklists.opquast.com/fr/assurance-qualite-web/toutes-les-pages-utilisent-le-protocole-https" target="_blank">Opquast 192</a>]'
    );
  }
}
function check_test_15d() {
  if (!paramFilter.only_redactor) {
    refactoring_template_3(
      'meta[charset="UTF-8"]',
      "15-D",
      "dev",
      "yellow",
      'Le code source de chaque page contient une métadonnée qui définit le jeu de caractères UTF-8 [<a href="https://checklists.opquast.com/fr/assurance-qualite-web/le-code-source-de-chaque-page-contient-une-metadonnee-qui-definit-le-jeu-de-caracteres" target="_blank">Opquast 225</a>, <a href="https://checklists.opquast.com/fr/assurance-qualite-web/le-codage-de-caracteres-utilise-est-utf-8" target="_blank">226</a>]'
    );
  }
}
function check_test_15e() {
  refactoring_template_1(
    'a[href$=".doc"], a[href$=".docx"], a[href$=".xls"], a[href$=".xlsx"], a[href$=".ppt"], a[href$=".pptx"], a[href$=".txt"]',
    "15-E",
    "nia15e",
    "nth",
    "yellow",
    "Vérifiez si ce document ne peut pas être fourni au format PDF ou HTML"
  );
}
function check_test_15f() {
  const nia15f_regex = /[^A-Za-z0-9\-._~:/?#[\]@!$&'()*+,;=%]/g;
  if (!paramFilter.only_redactor) {
    refactoring_template_4(
      currentUrl.match(nia15f_regex) != null,
      "15-F",
      "dev",
      "red",
      "L'URL de la page ne doit pas utilisé de caractère spéciaux"
    );
  }
}
function check_test_15g() {
  if (!paramFilter.only_redactor && paramPage.isAEM && paramPage.isCTIE) {
    refactoring_template_3(
      "#orejime",
      "15-G",
      "nth",
      "yellow",
      "Absence de la modale de cookie Orejime"
    );
  }
}
function check_part_15() {
  if (paramFilter.debug_flag) console.log("15 Sécurité");
  check_test_15a();
  check_test_15b();
  check_test_15c();
  check_test_15d();
  check_test_15e();
  check_test_15f();
  check_test_15g();
}
function createResultPanel() {
  let result_global = "";
  if (paramResult.result_crit != "") {
    paramResult.result_crit = "<h2 id='result_crit'>Points critiques</h2><ul>" + paramResult.result_crit + "</ul>";
  }
  if (paramResult.result_nc != "") {
    paramResult.result_nc = "<h2 id='result_nc'>Points non-conformes</h2><ul>" + paramResult.result_nc + "</ul>";
  }
  if (paramResult.result_dev != "") {
    paramResult.result_dev = "<h2 id='result_dev'>Problèmes Techniques</h2><ul>" + paramResult.result_dev + "</ul>";
  }
  if (paramResult.result_nth != "") {
    paramResult.result_nth = "<h2 id='result_nth'>Nice to have</h2><ul>" + paramResult.result_nth + "</ul>";
  }
  if (paramResult.result_man != "") {
    paramResult.result_man = "<h2 id='result_man'>A vérifier manuellement</h2><ul>" + paramResult.result_man + "</ul>";
  }
  if (paramResult.result_crit == "" && paramResult.result_nc == "" && paramResult.result_nth == "" && paramResult.result_dev == "" && paramResult.result_man == "") {
    result_global = "Pas de points remontés !";
  } else {
    result_global = paramResult.result_crit + paramResult.result_nc + paramResult.result_dev + paramResult.result_nth + paramResult.result_man;
  }
  let checkA11YPanel = document.createElement("div");
  checkA11YPanel.setAttribute("id", "checkA11YPanel");
  let ThirdPart = '<p id="result_html5">Validator W3C : <a href="https://validator.w3.org/nu/?doc=' + encodeURIComponent(currentUrl) + '" target="_blank">lien</a></p>';
  if (!paramPage.isPreview) {
    ThirdPart = '<ul><li id="result_html5">Validator W3C : <a href="https://validator.w3.org/nu/?doc=' + encodeURIComponent(currentUrl) + '" target="_blank">lien</a></li><li id="result_wave">WAVE : <a href="https://wave.webaim.org/report#/' + encodeURIComponent(currentUrl) + '" target="_blank">lien</a></li><li id="result_lighthouse">Lighthouse : <a href="https://pagespeed.web.dev/analysis?url=' + encodeURIComponent(currentUrl) + '" target="_blank">lien</a></li></ul>';
  }
  if (!paramFilter.only_redactor) {
    checkA11YPanel.innerHTML = '<div class="panel-header"><h1>Accessibility check</h1></div><div class="panel-body">' + result_global + '<hr><details class="cmp-accordion"><summary class="cmp-accordion__summary"><h2 class="cmp-accordion__header">Tests automatiques <svg class="icon" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-filter" x="0" y="0"></use></svg></h2></summary><div class="cmp-accordion__panel">' + ThirdPart + "</div></details></div>";
  } else {
    checkA11YPanel.innerHTML = '<div class="panel-header"><h1>Accessibility check</h1></div><div class="panel-body">' + result_global + "</div>";
  }
  document.body.appendChild(checkA11YPanel);
  const result_focus = document.querySelectorAll("a.result-focus");
  let targetElement;
  let targetElementOffset;
  for (let i = 0; i < result_focus.length; i++) {
    result_focus[i].addEventListener("click", (e) => {
      e.preventDefault();
      targetElement = document.querySelector(
        "." + result_focus[i].getAttribute("data-destination")
      );
      if (targetElement && isItemVisible(targetElement)) {
        targetElementOffset = targetElement.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
        window.scroll({
          top: targetElementOffset,
          left: 0,
          behavior: "smooth"
        });
        targetElement.style.outlineWidth = "10px";
        setTimeout(() => {
          targetElement.style.outlineWidth = "3px";
        }, 3e3);
      } else {
        alert(
          "Element non visible actuellement, essayez de redimentionner votre fenêtre pour le faire apparaîte ( ." + result_focus[i].getAttribute("data-destination") + ")"
        );
      }
    });
  }
  window.scroll({ top: 0, left: 0, behavior: "smooth" });
}
function activateCheckA11YPanel() {
  let checkA11YPanelBtn = document.createElement("button");
  checkA11YPanelBtn.setAttribute("id", "checkA11YPanelBtn");
  checkA11YPanelBtn.textContent = "Renowify";
  document.body.appendChild(checkA11YPanelBtn);
  checkA11YPanelBtn.addEventListener("click", () => {
    toggleCheckA11YPanel();
  });
  openCheckA11YPanel();
  document.body.classList.add("panel-injected");
}
function openCheckA11YPanel() {
  if (document.getElementById("checkA11YPanel")) {
    document.getElementById("checkA11YPanel").classList.add("active");
    document.body.classList.add("check-panel-active");
  }
}
function closeCheckA11YPanel() {
  if (document.getElementById("checkA11YPanel")) {
    document.getElementById("checkA11YPanel").classList.remove("active");
    document.body.classList.remove("check-panel-active");
  }
}
function toggleCheckA11YPanel() {
  if (document.getElementById("checkA11YPanel") && document.getElementById("checkA11YPanel").classList.contains("active")) {
    closeCheckA11YPanel();
  } else {
    openCheckA11YPanel();
  }
}
function run_renowify(debug, redac, nc) {
  console.clear();
  console.log("== Init Plugin Renowify");
  paramFilter.debug_flag = debug;
  paramFilter.only_redactor = redac;
  paramFilter.only_nc = nc;
  chrome.storage.sync.get("debug", function(sync) {
    if (sync && sync.debug && sync.debug != void 0 && sync.debug != "") {
      console.log("$ debug : " + sync.debug);
      paramFilter.debug_flag = sync.debug;
    }
    if (paramPage.isHomepage) console.log("$ isHomepage");
    if (paramPage.isPreview) console.log("$ isPreview");
    if (paramPage.isDecla) console.log("$ isDecla");
    if (paramPage.isSitemap) console.log("$ isSitemap");
    if (paramPage.isPrototype) console.log("$ isPrototype");
    if (paramPage.isAEM) console.log("$ isAEM");
    if (paramPage.isCTIE) console.log("$ isCTIE");
    if (paramPage.isSearchLogic) console.log("$ isSearchLogic");
    if (paramPage.isOnePage) console.log("$ isOnePage");
    paramResult.result_crit = "";
    paramResult.result_nc = "";
    paramResult.result_nth = "";
    paramResult.result_dev = "";
    paramResult.result_man = "";
    paramResult.result_crit_nb = 0;
    paramResult.result_nc_nb = 0;
    paramResult.result_nth_nb = 0;
    paramResult.result_dev_nb = 0;
    paramResult.result_man_nb = 0;
    if (document.body.classList.contains("renowify-script-injected")) {
      console.log("== Start Plugin Renowify ==");
      beforeCheck();
      const part01 = new Promise((resolve) => {
        check_part_01();
        setTimeout(resolve, 100);
      });
      const part02 = new Promise((resolve) => {
        check_part_02();
        setTimeout(resolve, 100);
      });
      const part03 = new Promise((resolve) => {
        check_part_03();
        setTimeout(resolve, 100);
      });
      const part04 = new Promise((resolve) => {
        check_part_04();
        setTimeout(resolve, 100);
      });
      const part05 = new Promise((resolve) => {
        check_part_05();
        setTimeout(resolve, 100);
      });
      const part06 = new Promise((resolve) => {
        check_part_06();
        setTimeout(resolve, 100);
      });
      const part07 = new Promise((resolve) => {
        check_part_07();
        setTimeout(resolve, 100);
      });
      const part08 = new Promise((resolve) => {
        check_part_08();
        setTimeout(resolve, 100);
      });
      const part09 = new Promise((resolve) => {
        check_part_09();
        setTimeout(resolve, 100);
      });
      const part10 = new Promise((resolve) => {
        check_part_10();
        setTimeout(resolve, 100);
      });
      const part11 = new Promise((resolve) => {
        check_part_11();
        setTimeout(resolve, 100);
      });
      const part12 = new Promise((resolve) => {
        check_part_12();
        setTimeout(resolve, 100);
      });
      const part13 = new Promise((resolve) => {
        check_part_13();
        setTimeout(resolve, 100);
      });
      const part14 = new Promise((resolve) => {
        check_part_14();
        setTimeout(resolve, 100);
      });
      const part15 = new Promise((resolve) => {
        check_part_15();
        setTimeout(resolve, 100);
      });
      Promise.allSettled([
        part01,
        part02,
        part03,
        part04,
        part05,
        part06,
        part07,
        part08,
        part09,
        part10,
        part11,
        part12,
        part13,
        part14,
        part15
      ]).then((results) => {
        results.forEach((result, index) => {
          let newi = ("0" + (index + 1)).slice(-2);
          console.log("- Part" + newi + " : " + result.status);
          if (result.status != "fulfilled" && paramFilter.debug_flag == true) {
            alert("- Part" + newi + " : " + result.status);
          }
        });
      }).then(function() {
        setTimeout(() => createResultPanel(), 100);
      }).then(function() {
        setTimeout(() => activateCheckA11YPanel(), 100);
      }).then(function() {
        console.log("== End Plugin Renowify ==");
      });
    }
  });
}
if (document.querySelector("#app")) {
  document.querySelector("#app").innerHTML = `
  <button id="btn-renowify" type="button"></button>
`;
  document.querySelector("#btn-renowify").addEventListener("click", () => run_renowify(false, false, false));
}
