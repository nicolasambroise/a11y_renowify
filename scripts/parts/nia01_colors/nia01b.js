// B. Opacité Form Field Border
function check_test_01b() {
  if (!only_redactor) {
    const nia01b_nodes = document.querySelectorAll(
      'input:not([disabled]):not([type="file"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled])'
    );
    let nia01b_flag1 = false, nia01b_flag2 = false, nia01b_flag3 = false, nia01b_flag4 = false, nia01b_flag5 = false;
    let nia01b_color1,
      nia01b_color2,
      nia01b_color3,
      nia01b_color1rbg,
      nia01b_color2rbg,
      nia01b_color3rgb,
      nia01b_color1luminance,
      nia01b_color2luminance,
      nia01b_color3luminance;
    let nia01b_ratio12,
      nia01b_ratio12_inv,
      nia01b_ratio13,
      nia01b_ratio13_inv,
      nia01b_ratio23,
      nia01b_ratio23_inv;
    if (nia01b_nodes && nia01b_nodes.length > 0) {
      for (let i = 0; i < nia01b_nodes.length; i++) {
        if (
          isItemVisible(nia01b_nodes[i]) &&
          !isItemSROnly(nia01b_nodes[i]) &&
          !isItemDisplayNone(nia01b_nodes[i])
        ) {
          nia01b_color1 = window
            .getComputedStyle(nia01b_nodes[i], null)
            .getPropertyValue('border-color'); // Border Color
          nia01b_color2 = window
            .getComputedStyle(nia01b_nodes[i], null)
            .getPropertyValue('background-color'); // In BG Color
          nia01b_color3 = getInheritedBackgroundColor(
            nia01b_nodes[i].parentElement
          ); // Out BG Color
          nia01b_border = window
            .getComputedStyle(nia01b_nodes[i], null)
            .getPropertyValue('border-width'); // Border-width
          nia01b_position = window
            .getComputedStyle(nia01b_nodes[i], null)
            .getPropertyValue('position'); // Position

          if (nia01b_color1.length > 20)
            nia01b_color1 = window
              .getComputedStyle(nia01b_nodes[i], null)
              .getPropertyValue('border-bottom-color');
          if (nia01b_color1 == 'rgba(0, 0, 0, 0)')
            nia01b_color1 = window
              .getComputedStyle(nia01b_nodes[i], null)
              .getPropertyValue('border-bottom-color');

          if (
            nia01b_color2 == 'rgba(0, 0, 0, 0)' &&
            (nia01b_position == 'absolute' || nia01b_position == 'fixed')
          ) {
            if (!only_error) {
              setItemOutline(nia01b_nodes[i], 'yellow', 'nia01b1', '01-B');
              nia01b_flag1 = true;
            }
          } else if (
            nia01b_color2 == 'rgba(0, 0, 0, 0)' &&
            nia01b_color3 == 'rgba(0, 0, 0, 0)'
          ) {
            if (!only_error) {
              setItemOutline(nia01b_nodes[i], 'yellow', 'nia01b1', '01-B');
              nia01b_flag2 = true;
            }
          } else if (
            nia01b_color1 == 'rgba(0, 0, 0, 0)' &&
            nia01b_color2 == 'rgba(0, 0, 0, 0)'
          ) {
            if (!only_error) {
              setItemOutline(nia01b_nodes[i], 'yellow', 'nia01b1', '01-B');
              nia01b_flag2 = true;
            }
          } else if (
            nia01b_border == '0px' &&
            nia01b_color2 == 'rgba(0, 0, 0, 0)'
          ) {
            if (!only_error) {
              setItemOutline(nia01b_nodes[i], 'yellow', 'nia01b1', '01-B');
              nia01b_flag2 = true;
            }
          } else if (
            nia01b_color1 == nia01b_color3 &&
            nia01b_color2 == nia01b_color3
          ) {
            if (!only_error) {
              setItemOutline(nia01b_nodes[i], 'yellow', 'nia01b1', '01-B');
              nia01b_flag4 = true;
            }
          } else if (
            (nia01b_border == '0px' || nia01b_color1 == 'rgba(0, 0, 0, 0)') &&
            nia01b_color2 == nia01b_color3
          ) {
            if (!only_error) {
              setItemOutline(nia01b_nodes[i], 'yellow', 'nia01b1', '01-B');
              nia01b_flag4 = true;
            }
          } else if (
            (nia01b_border == '0px' || nia01b_color1 == 'rgba(0, 0, 0, 0)') &&
            nia01b_color2 &&
            nia01b_color3
          ) {
            if (nia01b_color2.indexOf('#') >= 0) {
              nia01b_color2rgb = hexToRgbArray(nia01b_color2);
            } else {
              nia01b_color2rgb = rgbToRgbArray(nia01b_color2);
            }
            if (nia01b_color3.indexOf('#') >= 0) {
              nia01b_color3rgb = hexToRgbArray(nia01b_color3);
            } else {
              nia01b_color3rgb = rgbToRgbArray(nia01b_color3);
            }

            nia01b_color2luminance = luminance(
              nia01b_color2rgb.r,
              nia01b_color2rgb.g,
              nia01b_color2rgb.b
            );
            nia01b_color3luminance = luminance(
              nia01b_color3rgb.r,
              nia01b_color3rgb.g,
              nia01b_color3rgb.b
            );
            // Calcul ratio
            nia01b_ratio23 =
              nia01b_color2luminance > nia01b_color3luminance
                ? (nia01b_color2luminance + 0.05) /
                (nia01b_color3luminance + 0.05)
                : (nia01b_color3luminance + 0.05) /
                (nia01b_color2luminance + 0.05);

            nia01b_ratio23_inv = 1 / nia01b_ratio23;

            if (nia01b_ratio23 < 3 && nia01b_ratio23_inv < 3) {
              if (debug_flag) {
                console.log(nia01b_color2);
                console.log(nia01b_color3);
                console.log(nia01b_ratio23);
                console.log(nia01b_ratio23_inv);
                console.log(
                  '01B - FAIL 3.3.3 Standard ratio : ' +
                  nia01b_ratio23_inv +
                  ' (' +
                  nia01b_color2 +
                  ' vs ' +
                  nia01b_color3 +
                  ')'
                );
              }
              setItemOutline(nia01b_nodes[i], 'orange', 'nia01b2', '01-B');
              nia01b_flag3 = true;
            }
          }

          // Convert hexa
          else if (nia01b_color1 && nia01b_color2 && nia01b_color3) {
            if (nia01b_color1.indexOf('#') >= 0) {
              nia01b_color1rgb = hexToRgbArray(nia01b_color1);
            } else {
              nia01b_color1rgb = rgbToRgbArray(nia01b_color1);
            }
            if (nia01b_color2.indexOf('#') >= 0) {
              nia01b_color2rgb = hexToRgbArray(nia01b_color2);
            } else {
              nia01b_color2rgb = rgbToRgbArray(nia01b_color2);
            }
            if (nia01b_color3.indexOf('#') >= 0) {
              nia01b_color3rgb = hexToRgbArray(nia01b_color3);
            } else {
              nia01b_color3rgb = rgbToRgbArray(nia01b_color3);
            }
            nia01b_color1luminance = luminance(
              nia01b_color1rgb.r,
              nia01b_color1rgb.g,
              nia01b_color1rgb.b
            );
            nia01b_color2luminance = luminance(
              nia01b_color2rgb.r,
              nia01b_color2rgb.g,
              nia01b_color2rgb.b
            );
            nia01b_color3luminance = luminance(
              nia01b_color3rgb.r,
              nia01b_color3rgb.g,
              nia01b_color3rgb.b
            );
            // Calcul ratio
            nia01b_ratio12 =
              nia01b_color1luminance > nia01b_color2luminance
                ? (nia01b_color2luminance + 0.05) /
                (nia01b_color1luminance + 0.05)
                : (nia01b_color1luminance + 0.05) /
                (nia01b_color2luminance + 0.05);
            nia01b_ratio12_inv = 1 / nia01b_ratio12;
            nia01b_ratio13 =
              nia01b_color1luminance > nia01b_color3luminance
                ? (nia01b_color3luminance + 0.05) /
                (nia01b_color1luminance + 0.05)
                : (nia01b_color1luminance + 0.05) /
                (nia01b_color3luminance + 0.05);
            nia01b_ratio13_inv = 1 / nia01b_ratio13;
            nia01b_ratio23 =
              nia01b_color2luminance > nia01b_color3luminance
                ? (nia01b_color2luminance + 0.05) /
                (nia01b_color3luminance + 0.05)
                : (nia01b_color3luminance + 0.05) /
                (nia01b_color2luminance + 0.05);
            nia01b_ratio23_inv = 1 / nia01b_ratio23;

            if (
              nia01b_ratio12_inv < 3 &&
              nia01b_ratio13_inv < 3 &&
              nia01b_ratio23_inv < 3
            ) {
              if (debug_flag) {
                console.log(nia01b_color1);
                console.log(nia01b_color2);
                console.log(nia01b_color3);
                console.log(nia01b_ratio12_inv);
                console.log(nia01b_ratio13_inv);
                console.log(nia01b_ratio23_inv);
              }

              if (debug_flag && nia01b_ratio12_inv < 3)
                console.log(
                  '01B - FAIL 3.3.3 Standard ratio : ' +
                  nia01b_ratio12_inv +
                  ' (' +
                  nia01b_color1 +
                  ' vs ' +
                  nia01b_color2 +
                  ')'
                );
              else if (debug_flag && nia01b_ratio13_inv < 3)
                console.log(
                  '01B - FAIL 3.3.3 Standard ratio : ' +
                  nia01b_ratio13_inv +
                  ' (' +
                  nia01b_color1 +
                  ' vs ' +
                  nia01b_color3 +
                  ')'
                );
              else if (debug_flag && nia01b_ratio23_inv < 3)
                console.log(
                  '01B - FAIL 3.3.3 Standard ratio : ' +
                  nia01b_ratio23_inv +
                  ' (' +
                  nia01b_color2 +
                  ' vs ' +
                  nia01b_color3 +
                  ')'
                );
              if (nia01b_position == 'absolute' || nia01b_position == 'fixed') {
                setItemOutline(nia01b_nodes[i], 'yellow', 'nia01b2', '01-B');
                nia01b_flag5 = true;

              } else {
                setItemOutline(nia01b_nodes[i], 'orange', 'nia01b2', '01-B');
                nia01b_flag3 = true;
              }
            }
          } else {
            console.log('couleur de bordure inconnu');
          }
        }
      }
    }
    if (nia01b_flag1 == true) {
      setItemToResultList(
        'man',
        "<li><a href='#' data-destination='nia01b1' class='result-focus label-yellow'>01-B</a> : Présence d'élément graphique avec background transparent sur un élément en position absolute - Contraste à vérifier manuellement</li>"
      );
    }
    if (nia01b_flag2 == true) {
      setItemToResultList(
        'man',
        "<li><a href='#' data-destination='nia01b1' class='result-focus label-yellow'>01-B</a> : Présence d'élément graphique avec background transparent - Contraste à vérifier manuellement</li>"
      );
    }
    if (nia01b_flag3 == true) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia01b2' class='result-focus label-orange'>01-B</a> : Présence d'élément graphique insuffisament contrasté</li>"
      );
    }
    if (nia01b_flag4 == true) {
      setItemToResultList(
        'man',
        "<li><a href='#' data-destination='nia01b1' class='result-focus label-yellow'>01-B</a> : Présence d'élément graphique avec background identique au fond de page - Contraste à vérifier manuellement</li>"
      );
    }
    if (nia01b_flag5 == true) {
      setItemToResultList(
        'man',
        "<li><a href='#' data-destination='nia01b1' class='result-focus label-yellow'>01-B</a> : Présence d'élément graphique sur un élément en position absolute - Contraste à vérifier manuellement</li>"
      );
    }
  }
}