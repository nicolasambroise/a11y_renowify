// H. Champ et étiquette accolé en recupérant les positions des centres : Estimé à max 100px pour une distance correcte
function check_test_04h() {
  if (!only_redactor) {
    function getPositionAtTopRight(element) {
      let rect;
      if (element.nodeName != '#text') {
        rect = element.getBoundingClientRect();
      } else {
        const range = document.createRange();
        range.selectNode(element);
        rect = range.getBoundingClientRect();
      }
      return { x: rect.left + rect.width, y: rect.top };
    }

    function getPositionAtTopLeft(element) {
      let rect;
      if (element.nodeName != '#text') {
        rect = element.getBoundingClientRect();
      } else {
        const range = document.createRange();
        range.selectNode(element);
        rect = range.getBoundingClientRect();
      }
      return { x: rect.left, y: rect.top };
    }

    // Pour les éléments de type textfield présenté verticalement
    function getDistanceBetweenVerticalElements(a, b) {
      const inputPosition = getPositionAtTopLeft(a);
      const labelPosition = getPositionAtTopLeft(b);
      return Math.hypot(
        inputPosition.x - labelPosition.x,
        inputPosition.y - labelPosition.y
      );
    }

    // Pour les éléments de type textfield présenté inline / horizontalement
    function getDistanceBetweenHorizontalElements(a, b) {
      const inputPosition = getPositionAtTopLeft(a);
      const labelPosition = getPositionAtTopRight(b);
      return Math.hypot(
        inputPosition.x - labelPosition.x,
        inputPosition.y - labelPosition.y
      );
    }

    const nia04h_nodes = document.querySelectorAll(
      'input[id]:not([type="button"]):not([type="reset"]):not([type="submit"]),select[id],textarea[id]'
    );
    let nia04h_flag = false;
    let nia04h_id, nia04h_label;
    if (nia04h_nodes && nia04h_nodes.length > 0) {
      for (let i = 0; i < nia04h_nodes.length; i++) {
        if (isItemVisible(nia04h_nodes[i])) {
          nia04h_id = nia04h_nodes[i].getAttribute('id');
          if (!nia04h_id || nia04h_id == '') {
            setItemOutline(nia04h_nodes[i], 'orange', 'nia04h', '04-H');
            nia04h_flag = true;
          } else {
            nia04h_label = document.querySelectorAll(
              "label[for='" + nia04h_id + "']"
            );
            if (!nia04h_label || nia04h_label.length == 0) {
              setItemOutline(nia04h_nodes[i], 'orange', 'nia04h', '04-H');
              nia04h_flag = true;
            } else if (
              isItemVisible(nia04h_label[0]) &&
              !isItemSROnly(nia04h_label[0])
            ) {
              let nia04h_distance_vertical = getDistanceBetweenVerticalElements(
                nia04h_nodes[i],
                nia04h_label[0]
              );
              let nia04h_distance_horizontal =
                getDistanceBetweenHorizontalElements(
                  nia04h_nodes[i],
                  nia04h_label[0]
                );
              if (
                nia04h_distance_vertical > 100 &&
                nia04h_distance_horizontal > 100
              ) {
                if (debug_flag)
                  console.log(
                    '[nia04h] distance : [' +
                      nia04h_distance_horizontal +
                      ':' +
                      nia04h_distance_vertical +
                      ']'
                  );
                // Exception pour les élément de type radio/checkbox/file dont l'input est inclus dans la balise label
                if (nia04h_nodes[i].parentElement == nia04h_label[0]) {
                  let nia04h_distance_wrapper =
                    getDistanceBetweenHorizontalElements(
                      nia04h_nodes[i],
                      nia04h_label[0].firstChild
                    );
                  if (debug_flag)
                    console.log(
                      '[nia04h] wrap distance : [' +
                        nia04h_distance_wrapper +
                        ']'
                    );
                  if (nia04h_distance_wrapper > 100) {
                    setItemOutline(nia04h_nodes[i], 'orange', 'nia04h', '04-H');
                    nia04h_flag = true;
                  }
                } else {
                  setItemOutline(nia04h_nodes[i], 'orange', 'nia04h', '04-H');
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
        'nc',
        "<li><a href='#' data-destination='nia04h' class='result-focus label-orange'>04-H</a> : Le Champ et l'étiquette doivent être accolé [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-5-1' target='_blank'>RAWeb 11.5.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-etiquette-de-formulaire-est-visuellement-rattachee-au-champ-quelle-decrit' target='_blank'>Opquast 75</a>]</li>"
      );
    }
  }
}
