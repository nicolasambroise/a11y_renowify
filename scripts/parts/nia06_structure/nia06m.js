// M Geoportail Adresse
function check_test_06m() {
  if (isAEM && !only_redactor) {
    const nia06m_nodes = document.querySelectorAll('.geoportail');
    let nia06m1_flag = false,
      nia06m2_flag = false,
      nia06m3_flag = false,
      nia06m4_flag = false,
      nia06m5_flag = false,
      nia06m6_flag = false;
    let nia06m_map;
    let nia06m_Adress = 0;
    let nia06m_Contact;
    let nia06m_StreetAdress;

    if (nia06m_nodes && nia06m_nodes.length > 0) {
      for (let i = 0; i < nia06m_nodes.length; i++) {
        if (isItemVisible(nia06m_nodes[i])) {
          nia06m_map = nia06m_nodes[i].querySelectorAll('.geoportail-map');
          if (
            !nia06m_map ||
            nia06m_map.length != 1 ||
            !isItemsVisible(nia06m_map)
          ) {
            nia06m1_flag = true;
            setItemOutline(nia06m_nodes[i], 'orange', 'nia06m1', '06-M');
          }
          nia06m_Adress = nia06m_nodes[i].querySelectorAll(
            '.geoportail-addresses .vcard'
          );
          if (
            !nia06m_Adress ||
            nia06m_Adress.length == 0 ||
            !isItemsVisible(nia06m_Adress)
          ) {
            nia06m2_flag = true;
            setItemOutline(nia06m_nodes[i], 'red', 'nia06m2', '06-M');
          } else if (
            nia06m_Adress &&
            nia06m_Adress.length > 1 &&
            nia06m_Adress[0].parentElement.tagName != 'LI'
          ) {
            nia06m3_flag = true;
            setItemOutline(nia06m_nodes[i], 'orange', 'nia06m3', '06-M');
          } else if (
            nia06m_Adress &&
            nia06m_Adress.length == 1 &&
            nia06m_Adress[0].parentElement.tagName == 'LI' &&
            !only_error
          ) {
            nia06m4_flag = true;
            setItemOutline(nia06m_nodes[i], 'yellow', 'nia06m4', '06-M');
          }
          if (nia06m_Adress && nia06m_Adress.length > 0) {
            nia06m_Contact = nia06m_Adress[0].querySelectorAll('dl');
            nia06m_StreetAdress = nia06m_Adress[0].querySelectorAll(
              'span[itemprop="streetAddress"]'
            );

            //console.log(nia06m_Contact)
            //console.log(nia06m_StreetAdress)

            if (
              !nia06m_Contact ||
              nia06m_Contact.length != 1 ||
              !isItemsVisible(nia06m_Contact)
            ) {
              nia06m5_flag = true;
              setItemOutline(nia06m_nodes[i], 'orange', 'nia06m5', '06-M');
            }
            if (!only_error) {
              if (
                !nia06m_StreetAdress ||
                nia06m_StreetAdress.length != 1 ||
                !isItemsVisible(nia06m_StreetAdress) ||
                (nia06m_StreetAdress[0].parentElement.tagName != 'P' &&
                  nia06m_StreetAdress[0].parentElement.tagName != 'DD')
              ) {
                nia06m6_flag = true;
                setItemOutline(nia06m_nodes[i], 'yellow', 'nia06m6', '06-M');
              }
            }
          }
        }
      }
    }
    if (nia06m1_flag == true) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06m1' class='result-focus label-orange'>06-M</a> : Présence d'une carte Geoportail sans carte visible</li>"
      );
    }
    if (nia06m2_flag == true) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia06m2' class='result-focus label-red'>06-M</a> : Présence d'une carte Geoportail sans addresse visible</li>"
      );
    }
    if (nia06m3_flag == true) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06m3' class='result-focus label-orange'>06-M</a> : Présence d'une liste d'adresse Geoportail n'utilisant pas une structure de liste 'ul' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-3-1' target='_blank'>RAWeb 9.3.1</a>]</li>"
      );
    }
    if (nia06m4_flag == true) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia06m4' class='result-focus label-yellow'>06-M</a> : Présence d'une adresse Geoportail unique présent dans une structure de liste 'ul' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-3-1' target='_blank'>RAWeb 9.3.1</a>]</li>"
      );
    }
    if (nia06m5_flag == true) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06m5' class='result-focus label-orange'>06-M</a> : Présence d'une liste d'info de contact dans une adresse Geoportail n'utilisant pas une structure de liste 'dl' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-3-3' target='_blank'>RAWeb 9.3.3</a>]</li>"
      );
    }
    if (nia06m6_flag == true) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06m6' class='result-focus label-yellow'>06-M</a> : Les différents élément d'une adresse Geoportail doivent être regroupée dans une balise 'p' ou 'dd'</li>"
      );
    }
  }
}