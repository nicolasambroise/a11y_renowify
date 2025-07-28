/*- -------------------------------------------------------------------------------- */
/* 🗸 01. Couleur
Vérification de plusieurs points concernant les contrastes de couleur :
 o Contraste des textes
 o Contraste des bordures de champ et du placeholder
 o Contraste de l'outline [A FINIR]
 o Présence de dégradé sans couleur de replis
 o Présence d'une déclaration de couleur de texte et de BG sur la balise <body>
 */
function check_part_01() {
  if (debug_flag) console.log('01 Couleur');

  check_test_01a();
  check_test_01b();
  check_test_01c();
  check_test_01d();
  check_test_01e();
  check_test_01f();
}

// A Check All text
function check_test_01a() {
  if (!only_redactor) {
    const nia01a_nodes = document.querySelectorAll(
      'p, span:not(.checkA11YSpan), li, strong, h1, h2, h3, h4, h5, small, a:not([disabled]), button:not([disabled]), blockquote, q, dd, dt, label'
    );
    let nia01a_flag1 = false;
    let nia01a_flag2 = false;
    let nia01a_color1,
      nia01a_color2,
      nia01a_position,
      nia01a_pseudo,
      nia01a_color1luminance,
      nia01a_color2luminance,
      nia01a_ratio,
      nia01a_ratio_inv,
      nia01a_bold,
      nia01a_large,
      nia01a_isbold,
      nia01a_basecolor2,
      nia01a_pseudoElementBefore,
      nia01a_pseudoElementAfter,
      nia01a_color1rgb,
      nia01a_color2rgb;
    if (nia01a_nodes && nia01a_nodes.length > 0) {
      for (let i = 0; i < nia01a_nodes.length; i++) {
        if (
          isItemVisible(nia01a_nodes[i]) &&
          !isItemSROnly(nia01a_nodes[i]) &&
          isItemHasVisibleContent(nia01a_nodes[i]) &&
          isItemHasDirectContent(nia01a_nodes[i])
        ) {
          nia01a_color1 = window
            .getComputedStyle(nia01a_nodes[i], null)
            .getPropertyValue('color'); // Text Color
          nia01a_color2 = getInheritedBackgroundColor(nia01a_nodes[i]); // Bg Color

          nia01a_position = getInheritedPosition(nia01a_nodes[i]); // Text Position
          nia01a_pseudo = false; // Variable à true s'il est probable qu'un fond soit ajouté derrière un texte via pseudo element.

          // Base BG Color
          nia01a_basecolor2 = window
            .getComputedStyle(nia01a_nodes[i], null)
            .getPropertyValue('background-color');

          // Has PseudoElem ?
          nia01a_pseudoElementBefore = window.getComputedStyle(
            nia01a_nodes[i],
            'before'
          );
          nia01a_pseudoElementAfter = window.getComputedStyle(
            nia01a_nodes[i],
            'after'
          );

          if (
            nia01a_basecolor2 == 'rgba(0, 0, 0, 0)' &&
            ((nia01a_pseudoElementBefore.getPropertyValue('content') !=
              'none' &&
              nia01a_pseudoElementBefore.getPropertyValue('background-color') !=
                'rgba(0, 0, 0, 0)') ||
              (nia01a_pseudoElementAfter.getPropertyValue('content') !=
                'none' &&
                nia01a_pseudoElementBefore.getPropertyValue(
                  'background-color'
                ) != 'rgba(0, 0, 0, 0)'))
          ) {
            nia01a_pseudo == true;
          }

          // Convert hexa
          if (nia01a_color1.indexOf('#') >= 0) {
            nia01a_color1rgb = hexToRgbArray(nia01a_color1);
          } else {
            nia01a_color1rgb = rgbToRgbArray(nia01a_color1);
          }
          if (nia01a_color2.indexOf('#') >= 0) {
            nia01a_color2rgb = hexToRgbArray(nia01a_color2);
          } else {
            nia01a_color2rgb = rgbToRgbArray(nia01a_color2);
          }
          nia01a_color1luminance = luminance(
            nia01a_color1rgb.r,
            nia01a_color1rgb.g,
            nia01a_color1rgb.b
          );
          nia01a_color2luminance = luminance(
            nia01a_color2rgb.r,
            nia01a_color2rgb.g,
            nia01a_color2rgb.b
          );
          // Calcul ratio
          nia01a_ratio =
            nia01a_color1luminance > nia01a_color2luminance
              ? (nia01a_color2luminance + 0.05) /
                (nia01a_color1luminance + 0.05)
              : (nia01a_color1luminance + 0.05) /
                (nia01a_color2luminance + 0.05);
          nia01a_ratio_inv = 1 / nia01a_ratio;

          nia01a_large = parseFloat(
            window
              .getComputedStyle(nia01a_nodes[i], null)
              .getPropertyValue('font-size')
          );
          nia01a_bold = window
            .getComputedStyle(nia01a_nodes[i], null)
            .getPropertyValue('font-weight');
          nia01a_isbold = false;
          if (
            nia01a_bold == 'bold' ||
            nia01a_bold == 'bolder' ||
            nia01a_bold >= 500
          ) {
            nia01a_isbold = true;
          }
          //console.log("font-size : "+nia01a_large+" / font-weight "+nia01a_bold)

          if (
            nia01a_isbold == false &&
            nia01a_large < 24 &&
            nia01a_ratio_inv < 4.5
          ) {
            if (debug_flag)
              console.log(
                '01A - FAIL 3.2.1 Standard ratio : ' +
                  nia01a_ratio_inv +
                  ' (' +
                  nia01a_color1 +
                  ' vs ' +
                  nia01a_color2 +
                  ')'
              );
            if (
              nia01a_position != 'absolute' &&
              nia01a_position != 'fixed' &&
              !nia01a_pseudo
            ) {
              setItemOutline(nia01a_nodes[i], 'orange', 'nia01a', '01-A');
              nia01a_flag1 = true;
            } else if (!only_error) {
              setItemOutline(nia01a_nodes[i], 'yellow', 'nia01a', '01-A');
              nia01a_flag2 = true;
            }
          } else if (
            nia01a_isbold == true &&
            nia01a_large < 18.5 &&
            nia01a_ratio_inv < 4.5
          ) {
            if (debug_flag)
              console.log(
                '01A - FAIL 3.2.2 Standard ratio : ' +
                  nia01a_ratio_inv +
                  ' (' +
                  nia01a_color1 +
                  ' vs ' +
                  nia01a_color2 +
                  ')'
              );
            if (
              nia01a_position != 'absolute' &&
              nia01a_position != 'fixed' &&
              !nia01a_pseudo
            ) {
              setItemOutline(nia01a_nodes[i], 'orange', 'nia01a', '01-A');
              nia01a_flag1 = true;
            } else if (!only_error) {
              setItemOutline(nia01a_nodes[i], 'yellow', 'nia01a', '01-A');
              nia01a_flag2 = true;
            }
          } else if (
            nia01a_isbold == false &&
            nia01a_large >= 24 &&
            nia01a_ratio_inv < 3
          ) {
            if (debug_flag)
              console.log(
                '01A - FAIL 3.2.3 Standard ratio : ' +
                  nia01a_ratio_inv +
                  ' (' +
                  nia01a_color1 +
                  ' vs ' +
                  nia01a_color2 +
                  ')'
              );
            if (
              nia01a_position != 'absolute' &&
              nia01a_position != 'fixed' &&
              !nia01a_pseudo
            ) {
              setItemOutline(nia01a_nodes[i], 'orange', 'nia01a', '01-A');
              nia01a_flag1 = true;
            } else if (!only_error) {
              setItemOutline(nia01a_nodes[i], 'yellow', 'nia01a', '01-A');
              nia01a_flag2 = true;
            }
          } else if (
            nia01a_isbold == true &&
            nia01a_large >= 18.5 &&
            nia01a_ratio_inv < 3
          ) {
            if (debug_flag)
              console.log(
                '01A - FAIL 3.2.4 Standard ratio : ' +
                  nia01a_ratio_inv +
                  ' (' +
                  nia01a_color1 +
                  ' vs ' +
                  nia01a_color2 +
                  ')'
              );
            if (
              nia01a_position != 'absolute' &&
              nia01a_position != 'fixed' &&
              !nia01a_pseudo
            ) {
              setItemOutline(nia01a_nodes[i], 'orange', 'nia01a', '01-A');
              nia01a_flag1 = true;
            } else if (!only_error) {
              setItemOutline(nia01a_nodes[i], 'yellow', 'nia01a', '01-A');
              nia01a_flag2 = true;
            }
          } else if (
            nia01a_nodes[i].tagName == 'A' ||
            nia01a_nodes[i].tagName == 'BUTTON'
          ) {
            // TODO On check au focus
            nia01a_nodes[i].focus();

            nia01a_color1 = window
              .getComputedStyle(nia01a_nodes[i], null)
              .getPropertyValue('color'); // Text Color
            nia01a_color2 = getInheritedBackgroundColor(nia01a_nodes[i]); // Bg Color
            // Convert hexa
            if (nia01a_color1.indexOf('#') >= 0) {
              nia01a_color1rgb = hexToRgbArray(nia01a_color1);
            } else {
              nia01a_color1rgb = rgbToRgbArray(nia01a_color1);
            }
            if (nia01a_color2.indexOf('#') >= 0) {
              nia01a_color2rgb = hexToRgbArray(nia01a_color2);
            } else {
              nia01a_color2rgb = rgbToRgbArray(nia01a_color2);
            }
            nia01a_color1luminance = luminance(
              nia01a_color1rgb.r,
              nia01a_color1rgb.g,
              nia01a_color1rgb.b
            );
            nia01a_color2luminance = luminance(
              nia01a_color2rgb.r,
              nia01a_color2rgb.g,
              nia01a_color2rgb.b
            );
            // Calcul ratio
            nia01a_ratio =
              nia01a_color1luminance > nia01a_color2luminance
                ? (nia01a_color2luminance + 0.05) /
                  (nia01a_color1luminance + 0.05)
                : (nia01a_color1luminance + 0.05) /
                  (nia01a_color2luminance + 0.05);
            nia01a_ratio_inv = 1 / nia01a_ratio;
            //console.log(color1+" vs "+color2+" = "+ nia01a_ratio_inv)

            nia01a_large = parseFloat(
              window
                .getComputedStyle(nia01a_nodes[i], null)
                .getPropertyValue('font-size')
            );
            nia01a_bold = window
              .getComputedStyle(nia01a_nodes[i], null)
              .getPropertyValue('font-weight');
            nia01a_isbold = false;
            if (
              nia01a_bold == 'bold' ||
              nia01a_bold == 'bolder' ||
              nia01a_bold >= 500
            ) {
              nia01a_isbold = true;
            }
            //console.log("font-size : "+nia01a_large+" / font-weight "+nia01a_bold)

            if (
              nia01a_isbold == false &&
              nia01a_large < 24 &&
              nia01a_ratio_inv < 4.5
            ) {
              if (debug_flag)
                console.log(
                  '01A - FAIL 3.2.1 Standard ratio : ' +
                    nia01a_ratio_inv +
                    ' (' +
                    nia01a_color1 +
                    ' vs ' +
                    nia01a_color2 +
                    ')'
                );
              if (nia01a_position != 'absolute' && nia01a_position != 'fixed') {
                setItemOutline(nia01a_nodes[i], 'orange', 'nia01a', '01-A');
                nia01a_flag1 = true;
              } else if (!only_error) {
                setItemOutline(nia01a_nodes[i], 'yellow', 'nia01a', '01-A');
                nia01a_flag2 = true;
              }
            } else if (
              nia01a_isbold == true &&
              nia01a_large < 18.5 &&
              nia01a_ratio_inv < 4.5
            ) {
              if (debug_flag)
                console.log(
                  '01A - FAIL 3.2.2 Standard ratio : ' +
                    nia01a_ratio_inv +
                    ' (' +
                    nia01a_color1 +
                    ' vs ' +
                    nia01a_color2 +
                    ')'
                );
              if (nia01a_position != 'absolute' && nia01a_position != 'fixed') {
                setItemOutline(nia01a_nodes[i], 'orange', 'nia01a', '01-A');
                nia01a_flag1 = true;
              } else if (!only_error) {
                setItemOutline(nia01a_nodes[i], 'yellow', 'nia01a', '01-A');
                nia01a_flag2 = true;
              }
            } else if (
              nia01a_isbold == false &&
              nia01a_large >= 24 &&
              nia01a_ratio_inv < 3
            ) {
              if (debug_flag)
                console.log(
                  '01A - FAIL 3.2.3 Standard ratio : ' +
                    nia01a_ratio_inv +
                    ' (' +
                    nia01a_color1 +
                    ' vs ' +
                    nia01a_color2 +
                    ')'
                );
              if (nia01a_position != 'absolute' && nia01a_position != 'fixed') {
                setItemOutline(nia01a_nodes[i], 'orange', 'nia01a', '01-A');
                nia01a_flag1 = true;
              } else if (!only_error) {
                setItemOutline(nia01a_nodes[i], 'yellow', 'nia01a', '01-A');
                nia01a_flag2 = true;
              }
            } else if (
              nia01a_isbold == true &&
              nia01a_large >= 18.5 &&
              nia01a_ratio_inv < 3
            ) {
              if (debug_flag)
                console.log(
                  '01A - FAIL 3.2.4 Standard ratio : ' +
                    nia01a_ratio_inv +
                    ' (' +
                    nia01a_color1 +
                    ' vs ' +
                    nia01a_color2 +
                    ')'
                );
              if (nia01a_position != 'absolute' && nia01a_position != 'fixed') {
                setItemOutline(nia01a_nodes[i], 'orange', 'nia01a', '01-A');
                nia01a_flag1 = true;
              } else if (!only_error) {
                setItemOutline(nia01a_nodes[i], 'yellow', 'nia01a', '01-A');
                nia01a_flag2 = true;
              }
            }
          }
        }
      }
    }
    if (nia01a_flag1 == true) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia01a' class='result-focus label-orange'>01-A</a> : Présence d'éléments textuels insuffisamment contrasté</li>"
      );
    }
    if (nia01a_flag2 == true) {
      setItemToResultList(
        'man',
        "<li><a href='#' data-destination='nia01a' class='result-focus label-yellow'>01-A</a> : Vérifier le contraste de certains éléments textuels</li>"
      );
    }
  }
}

// B. Opacité Form Field Border
function check_test_01b() {
  if (!only_redactor) {
    const nia01b_nodes = document.querySelectorAll(
      'input:not([disabled]):not([type="file"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled])'
    );
    let nia01b_flag1 = false,
      nia01b_flag2 = false,
      nia01b_flag3 = false,
      nia01b_flag4 = false,
      nia01b_flag5 = false;
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
        "<li><a href='#' data-destination='nia01b2' class='result-focus label-orange'>01-B</a> : Présence d'élément graphique insuffisamment contrasté</li>"
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

// C. Opacité Placeholder
function check_test_01c() {
  // Open si topsearch ancre présent
  if (!only_redactor && !only_error) {
    const nia01c_btn = document.querySelector(
      'button.anchor[data-destination="#topsearch"][aria-expanded="false"]'
    );
    if (nia01c_btn) {
      nia01c_btn.click();
    }
    const nia01c_nodes = document.querySelectorAll(
      'input[placeholder]:not([disabled])'
    );
    let nia01c_flag1 = false;
    let nia01c_flag2 = false;
    let nia01c_flag3 = false;
    let nia01c_color1,
      nia01c_color2,
      nia01c_color1rbg,
      nia01c_color2rbg,
      nia01c_color1luminance,
      nia01c_color2luminance,
      nia01c_ratio,
      nia01c_ratio_inv,
      nia01c_opacity;
    if (nia01c_nodes && nia01c_nodes.length > 0) {
      for (let i = 0; i < nia01c_nodes.length; i++) {
        if (isItemVisible(nia01c_nodes[i])) {
          nia01c_color1 = window
            .getComputedStyle(nia01c_nodes[i], '::placeholder')
            .getPropertyValue('color'); // Placeholder Color
          nia01c_color2 = getInheritedBackgroundColor(nia01c_nodes[i]); // Bg Color
          nia01c_opacity = window
            .getComputedStyle(nia01c_nodes[i], '::placeholder')
            .getPropertyValue('opacity'); // Placeholder Color

          //console.log("01C "+nia01c_color1+" vs "+nia01c_color2);
          // Convert hexa
          if (nia01c_color1) {
            if (nia01c_color1.indexOf('#') >= 0) {
              nia01c_color1rgb = hexToRgbArray(nia01c_color1);
            } else {
              nia01c_color1rgb = rgbToRgbArray(nia01c_color1);
            }
            if (nia01c_color2.indexOf('#') >= 0) {
              nia01c_color2rgb = hexToRgbArray(nia01c_color2);
            } else {
              nia01c_color2rgb = rgbToRgbArray(nia01c_color2);
            }
            nia01c_color1luminance = luminance(
              nia01c_color1rgb.r,
              nia01c_color1rgb.g,
              nia01c_color1rgb.b
            );
            nia01c_color2luminance = luminance(
              nia01c_color2rgb.r,
              nia01c_color2rgb.g,
              nia01c_color2rgb.b
            );
            // Calcul ratio
            nia01c_ratio =
              nia01c_color1luminance > nia01c_color2luminance
                ? (nia01c_color2luminance + 0.05) /
                  (nia01c_color1luminance + 0.05)
                : (nia01c_color1luminance + 0.05) /
                  (nia01c_color2luminance + 0.05);
            nia01c_ratio_inv = 1 / nia01c_ratio;
            //console.log(color1+" vs "+color2+" = "+ nia01c_ratio_inv)
            if (nia01c_ratio_inv < 4.5) {
              if (debug_flag)
                console.log(
                  '01C - FAIL 3.2.1 Standard ratio : ' +
                    nia01c_ratio_inv +
                    ' (' +
                    nia01c_color1 +
                    ' vs ' +
                    nia01c_color2 +
                    ')'
                );
              setItemOutline(nia01c_nodes[i], 'orange', 'nia01c1', '01-C');
              nia01c_flag1 = true;
            }
            if (
              nia01c_color1 == 'rgb(0, 0, 0)' &&
              nia01c_color2 != 'rgb(255, 255, 255)'
            ) {
              // Todo : Résultat différent sur Firefox et Chrome --> à vérifier
              setItemOutline(nia01c_nodes[i], 'yellow', 'nia01c2', '01-C');
              nia01c_flag2 = true;
            }
          } else {
            if (debug_flag) console.log('couleur de placeholder inconnu');
          }
          // Check Opacité ajouté par le navigateur
          if (nia01c_opacity != '1') {
            setItemOutline(nia01c_nodes[i], 'yellow', 'nia01c3', '01-C');
            nia01c_flag3 = true;
          }
        }
      }
    }
    if (nia01c_flag1 == true) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia01c1' class='result-focus label-orange'>01-C</a> : Présence d'élément placeholder insuffisament contrasté</li>"
      );
    }
    if (nia01c_flag2 == true) {
      setItemToResultList(
        'man',
        "<li><a href='#' data-destination='nia01c2' class='result-focus label-yellow'>01-C</a> : Vérifier si l'élément placeholder est suffisament contrasté</li>"
      );
    }
    if (nia01c_flag3 == true) {
      setItemToResultList(
        'man',
        "<li><a href='#' data-destination='nia01c3' class='result-focus label-yellow'>01-C</a> : Vérifier si l'élément placeholder possède une opacité suffisante</li>"
      );
    }
  }
}

// D. Opacité de l'outline
function check_test_01d() {
  /*
    // Commenté pour le moment : Trop de faux-positif
    // Work only on Firefox ? https://caniuse.com/mdn-api_htmlelement_focus_options_focusvisible_parameter
  */
  /*
  if(!only_redactor){
    const nia01d_nodes = document.querySelectorAll('*:not(.skiplinks) > a:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([disabled]), summary');
    let nia01d_flag1 = false;
    let nia01d_flag1b = false;
    let nia01d_flag2 = false;
    let nia01d_has_pseudo = false;
    let nia01d_outline;
    let nia01d_color1,nia01d_color2,nia01d_color3,nia01d_color1rbg, nia01d_color2rbg, nia01d_color3rbg,nia01d_color1luminance, nia01d_color2luminance,nia01d_color3luminance ;
    let nia01d_ratio12, nia01d_ratio12_inv,nia01d_ratio13, nia01d_ratio13_inv,nia01d_ratio23, nia01d_ratio23_inv;
    if(nia01d_nodes && nia01d_nodes.length > 0){
      for(let i = 0; i < nia01d_nodes.length; i++){
        if(isItemVisible(nia01d_nodes[i])){

          nia01d_nodes[i].contentEditable = true;
          nia01d_nodes[i].focus({ focusVisible: true });
          nia01d_outline = window.getComputedStyle(nia01d_nodes[i],null).getPropertyValue('outline');
          nia01d_outline_style = window.getComputedStyle(nia01d_nodes[i],null).getPropertyValue('outline-style');
          nia01d_outline_width = window.getComputedStyle(nia01d_nodes[i],null).getPropertyValue('outline-width');
          nia01d_nodes[i].contentEditable = false;

          nia01d_has_pseudo = false;
          if((window.getComputedStyle(nia01d_nodes[i],'::after').getPropertyValue('background') && window.getComputedStyle(nia01d_nodes[i],'::after').getPropertyValue('background') != "rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box") || (window.getComputedStyle(nia01d_nodes[i],'::before').getPropertyValue('background') && window.getComputedStyle(nia01d_nodes[i],'::before').getPropertyValue('background') != "rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box")){
            nia01d_has_pseudo = true;
          }

          if((nia01d_outline && nia01d_outline == "0") || (nia01d_outline_style && nia01d_outline_style == "none")){
            if(debug_flag){
              console.log("Outline :"+nia01d_outline);
              console.log("Outline style :"+nia01d_outline_style);
              console.log("Outline width :"+nia01d_outline_width);
            }

            if(nia01d_outline && nia01d_outline == "0"){
              if(debug_flag) console.log("01D - Outline = 0 ");
              if(!nia01d_has_pseudo){
                setItemOutline(nia01d_nodes[i],"orange","nia01d","01-D");
                nia01d_flag1 = true;
              } else if(!only_error){
                setItemOutline(nia01d_nodes[i],"yellow","nia01d","01-D");
                nia01d_flag1b = true;
              }
            }
            else if(nia01d_outline_style && nia01d_outline_style == "none"){
              if(debug_flag) console.log("01D - Outline = none ");
              if(!nia01d_has_pseudo){
                setItemOutline(nia01d_nodes[i],"orange","nia01d","01-D");
                nia01d_flag1 = true;
              } else if(!only_error){
                setItemOutline(nia01d_nodes[i],"yellow","nia01d","01-D");
                nia01d_flag1b = true;
              }
            }
            else if(!only_error){
              if(debug_flag) console.log("01D - Outline = unknown ");
              setItemOutline(nia01d_nodes[i],"yellow","nia01d","01-D");
              nia01d_flag1b = true;
            }
          }
          else if(nia01d_outline && nia01d_outline_style && nia01d_outline_style != "auto"){
            nia01d_color1 = window.getComputedStyle(nia01d_nodes[i],null).getPropertyValue('outline-color');  // Outline Color
            nia01d_color2 = getInheritedBackgroundColor(nia01d_nodes[i])  // In BG Color
            nia01d_color3 = getInheritedBackgroundColor(nia01d_nodes[i].parentElement) // Out BG Color

            // Convert hexa
            if(nia01d_color1 && nia01d_color2 && nia01d_color3){

              if(nia01d_color1.indexOf("#") >= 0){ nia01d_color1rgb = hexToRgbArray(nia01d_color1);} else {nia01d_color1rgb = rgbToRgbArray(nia01d_color1);}
              if(nia01d_color2.indexOf("#") >= 0){ nia01d_color2rgb = hexToRgbArray(nia01d_color2);} else {nia01d_color2rgb = rgbToRgbArray(nia01d_color2);}
              nia01d_color1luminance = luminance(nia01d_color1rgb.r, nia01d_color1rgb.g, nia01d_color1rgb.b);
              nia01d_color2luminance = luminance(nia01d_color2rgb.r, nia01d_color2rgb.g, nia01d_color2rgb.b);
              // Calcul ratio
              nia01d_ratio12 = nia01d_color1luminance > nia01d_color2luminance ? ((nia01d_color2luminance + 0.05) / (nia01d_color1luminance + 0.05)) : ((nia01d_color1luminance + 0.05) / (nia01d_color2luminance + 0.05));
              nia01d_ratio12_inv = 1/nia01d_ratio12;

              if(nia01d_color2 != nia01d_color3){
                if(nia01d_color3.indexOf("#") >= 0){ nia01d_color3rgb = hexToRgbArray(nia01d_color3);} else {nia01d_color3rgb = rgbToRgbArray(nia01d_color3);}
                nia01d_color3luminance = luminance(nia01d_color3rgb.r, nia01d_color3rgb.g, nia01d_color3rgb.b);
                // Calcul ratio
                nia01d_ratio13 = nia01d_color1luminance > nia01d_color3luminance ? ((nia01d_color3luminance + 0.05) / (nia01d_color1luminance + 0.05)) : ((nia01d_color1luminance + 0.05) / (nia01d_color3luminance + 0.05));
                nia01d_ratio13_inv = 1/nia01d_ratio13;
                nia01d_ratio23 = nia01d_color2luminance > nia01d_color3luminance ? ((nia01d_color2luminance + 0.05) / (nia01d_color3luminance + 0.05)) : ((nia01d_color3luminance + 0.05) / (nia01d_color2luminance + 0.05));
                nia01d_ratio23_inv = 1/nia01d_ratio23;

                if(nia01d_ratio12_inv < 3 && nia01d_ratio13_inv < 3 && nia01d_ratio23_inv < 3){

                  if(debug_flag){
                    console.log("Outline style :"+nia01d_outline_style);
                    console.log("Outline width :"+nia01d_outline_width);
                    console.log("Outline color :"+nia01d_color1);
                    console.log("Outline InBG :"+nia01d_color2);
                    console.log("Outline Out BG :"+nia01d_color3);
                  }
                  if(debug_flag && nia01d_ratio12_inv < 3) console.log("01D - FAIL 10.7 Standard ratio (Outline VS InBG) : "+nia01d_ratio12_inv+" ("+nia01d_color1+" vs "+nia01d_color2+")");
                  else if(debug_flag && nia01d_ratio13_inv < 3) console.log("01D - FAIL 10.7 Standard ratio (Outline VS OutBG) : "+nia01d_ratio13_inv+" ("+nia01d_color1+" vs "+nia01d_color3+")");
                  else if(debug_flag && nia01d_ratio23_inv < 3) console.log("01D - FAIL 10.7 Standard ratio (InBG VS OutBG): "+nia01d_ratio23_inv+" ("+nia01d_color2+" vs "+nia01d_color3+")");
                  if(!Array.from(nia01d_nodes[i].classList).some(c => c.startsWith('nia'))){
                    if(!nia01d_has_pseudo){
                      setItemOutline(nia01d_nodes[i],"orange","nia01d","01-D");
                      nia01d_flag1 = true;
                    } else if(!only_error){
                      setItemOutline(nia01d_nodes[i],"yellow","nia01d","01-D");
                      nia01d_flag1b = true;
                    }
                  }
                  else if(!only_error){ // Probabilité de conflit
                    setItemOutline(nia01d_nodes[i],"yellow","nia01d","01-D");
                    nia01d_flag1b = true;
                  }
                }
              }
              else{
                if(nia01d_ratio12_inv < 3){

                  if(debug_flag){
                    console.log("Outline style :"+nia01d_outline_style);
                    console.log("Outline width :"+nia01d_outline_width);
                    console.log("Outline color :"+nia01d_color1);
                    console.log("Outline InBG :"+nia01d_color2);
                  }

                  if(debug_flag) console.log("01D - FAIL 10.7 Standard ratio : "+nia01d_ratio12_inv+" ("+nia01d_color1+" vs "+nia01d_color2+")");
                  if(!Array.from(nia01d_nodes[i].classList).some(c => c.startsWith('nia'))){
                    if(!nia01d_has_pseudo){
                      setItemOutline(nia01d_nodes[i],"orange","nia01d","01-D");
                      nia01d_flag1 = true;
                    } else if(!only_error){
                      setItemOutline(nia01d_nodes[i],"yellow","nia01d","01-D");
                      nia01d_flag1b = true;
                    }
                  }
                  else if(!only_error){
                    // Probabilité de conflit : Pour les items déjà en erreur, c'est la couleur de l'outline Jaune/Orange/Rouge qui est récuperé pour les tests.
                    setItemOutline(nia01d_nodes[i],"yellow","nia01d","01-D");
                    nia01d_flag1b = true;
                  }
                }
              }
            }
          }
        }
      }
    }
    if(nia01d_flag1 == true) {
      setItemToResultList("dev","<li><a href='#' data-destination='nia01d' class='result-focus label-orange'>01-D</a> : Présence d'élément dont l'outline est insuffisament contrasté</li>");
    }
    if(nia01d_flag1b == true) {
      setItemToResultList("man","<li><a href='#' data-destination='nia01d' class='result-focus label-yellow'>01-D</a> : Vérifier l'apparence de l'outline de certains éléments - Couleur du focus non récupérable à cause d'un autre problème sur le composant.</li>");
    }
    if(nia01d_flag2 == true) {
      setItemToResultList("dev","<li><a href='#' data-destination='nia01d' class='result-focus label-orange'>01-D</a> : Présence d'élément dont l'outline est masqué</li>");
    }
  }
  */
}

// E presence de dégradé sans couleur de replis
// Pour des soucis de perf, on ne test que certain element
function check_test_01e() {
  if (!only_redactor) {
    const nia01e_nodes = document.querySelectorAll(
      'header, footer, .cmp-section, aside, article'
    );
    let nia01e_flag = false;
    if (nia01e_nodes && nia01e_nodes.length > 0) {
      for (let i = 0; i < nia01e_nodes.length; i++) {
        if (isItemVisible(nia01e_nodes[i])) {
          nia01e_bgi = window
            .getComputedStyle(nia01e_nodes[i], null)
            .getPropertyValue('background-image');
          nia01e_bgc = window
            .getComputedStyle(nia01e_nodes[i], null)
            .getPropertyValue('background-color');
          if (
            nia01e_bgi.indexOf('linear-gradient') >= 0 &&
            nia01e_bgc == 'rgba(0, 0, 0, 0)'
          ) {
            nia01e_flag = true;
            setItemOutline(nia01e_nodes[i], 'yellow', 'nia01e', '01-E');
          }
        }
      }
    }
    if (nia01e_flag == true) {
      setItemToResultList(
        'man',
        "<li><a href='#' data-destination='nia01e' class='result-focus label-yellow'>01-E</a> : Vérifier la présence d'une couleur de replis sur des éléments avec fond en dégradé.</li>"
      );
    }
  }
}

// F. Présence de déclaration de couleur sur le <body>
function check_test_01f() {
  if (!only_redactor && !only_error) {
    const nia01f_color = document.body.style.color;
    const nia01f_bg = document.body.style.backgroundColor;

    console.log(nia01f_color);
    console.log(nia01f_bg);

    if (
      nia01f_color == '' ||
      nia01f_color == 'rgba(0, 0, 0, 0)' ||
      nia01f_bg == '' ||
      nia01f_bg == 'rgba(0, 0, 0, 0)'
    ) {
      setItemToResultList(
        'dev',
        "<li><span class='result-focus label-orange'>01-F</span> : Absence de déclaration de couleurs sur la balise body</li>"
      );
    } else {
      const nia01f_color_rgb = hexToRgbArray(nia01f_color);
      const nia01f_bg_rgb = rgbToRgbArray(nia01f_bg);

      const nia01f_color_luminance = luminance(
        nia01f_color_rgb.r,
        nia01f_color_rgb.g,
        nia01f_color_rgb.b
      );
      const nia01f_bg_rgb_luminance = luminance(
        nia01f_bg_rgb.r,
        nia01f_bg_rgb.g,
        nia01f_bg_rgb.b
      );

      // Calcul ratio
      const nia01f_ratio =
        nia01f_color_luminance > nia01f_bg_rgb_luminance
          ? (nia01f_bg_rgb_luminance + 0.05) / (nia01f_bg_rgb_luminance + 0.05)
          : (nia01f_bg_rgb_luminance + 0.05) / (nia01f_bg_rgb_luminance + 0.05);
      const nia01f_ratio_inv = 1 / nia01f_ratio;

      if (nia01f_ratio_inv < 4.5) {
        setItemToResultList(
          'dev',
          "<li><span class='result-focus label-orange'>01-F</span> : Le jeu de couleurs par défaut sur la balise body n'est pas assez contrasté</li>"
        );
      }
    }
  }
}

// I. Presence de triple espace (double concidéré comme erreur d'inattention)
function check_test_13a() {
  if (!only_error) {
    const nia13a_nodes = document.querySelectorAll(
      '.cmp-text, *:not(.cmp-text) > p'
    );
    let nia13a_flag = false;
    let nia13a_result1, nia13a_result2;
    if (nia13a_nodes && nia13a_nodes.length > 0) {
      for (let i = 0; i < nia13a_nodes.length; i++) {
        if (isItemVisible(nia13a_nodes[i])) {
          nia13a_result1 = nia13a_nodes[i].innerText.match(/ {3,}/g);
          nia13a_result2 = nia13a_nodes[i].innerText.match(/\s{4,}/g);
          if (nia13a_result1 && nia13a_result1.length > 0) {
            setItemOutline(nia13a_nodes[i], 'yellow', 'nia13a', '06-I');
            nia13a_flag = true;
          }
          if (nia13a_result2 && nia13a_result2.length > 0) {
            setItemOutline(nia13a_nodes[i], 'yellow', 'nia13a', '06-I');
            nia13a_flag = true;
          }
        }
      }
    }
    if (nia13a_flag == true) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia13a' class='result-focus label-yellow'>13-A</a> : Présence d'espaces pour créer des effets de marges ou d'alignement (touche espace ou retour à la ligne) [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-10-1-3' target='_blank'>RAWeb 10.1.3</a>]</li>"
      );
    }
  }
}

/*- -------------------------------------------------------------------------------- */
/* 🗸 02 Images : Thématique RAWeb 1
Vérification de plusieurs points concernant les images :
o	Présence d’un attribut alt sur toutes les images
o	Vérification des attributs des svg,
o	Alt vide sur les images de search logique.
o	Absence de copyright/caption/légende sur une image Core V3,
o	Images v1 légendés presence du aria-label sur le figure
 */

function check_part_02() {
  if (debug_flag) console.log('02 Images');

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

// A. Présence d’un attribut alt sur toutes les images
function check_test_02a() {
  const nia02a1_nodes = document.querySelectorAll(
    '*:not(.ol-overlay-container) > *:not(.ol-overlay-container) >  img:not([alt]):not([aria-label]):not([aria-labelledby]):not([title]), [role="image"]:not([aria-label]):not([aria-labelledby])'
  );
  if (
    nia02a1_nodes &&
    nia02a1_nodes.length > 0 &&
    isItemsVisible(nia02a1_nodes)
  ) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia02a1' class='result-focus label-red'>02-A</a> : Présence de " +
        nia02a1_nodes.length +
        " images sans alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-1-1' target='_blank'>RAWeb 1.1.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-image-decorative-est-dotee-dune-alternative-textuelle-appropriee' target='_blank'>Opquast 111</a>]</li>"
    );
    setItemsOutline(nia02a1_nodes, 'red', 'nia02a1', '02-A');
  }

  if (!only_error) {
    const nia02a2_nodes = document.querySelectorAll(
      '*:not(.ol-overlay-container) > *:not(.ol-overlay-container) > img:not([alt])'
    );
    if (
      nia02a2_nodes &&
      nia02a2_nodes.length > 0 &&
      isItemsVisible(nia02a2_nodes)
    ) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia02a2' class='result-focus label-yellow'>02-A</a> : Présence de " +
          nia02a2_nodes.length +
          " images sans attribut alt [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-1-1' target='_blank'>RAWeb 1.1.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-image-decorative-est-dotee-dune-alternative-textuelle-appropriee' target='_blank'>Opquast 111</a>]</li>"
      );
      setItemsOutline(nia02a2_nodes, 'yellow', 'nia02a2', '02-A');
    }
  }
}

// B. Vérification des attributs des svg
function check_test_02b() {
  const nia02b1_nodes = document.querySelectorAll(
    'svg:not([aria-hidden="true"]):not(.iconset)'
  );
  const nia02b2_nodes = document.querySelectorAll(
    'svg:not([focusable="false"]):not(.iconset)'
  );
  if (
    nia02b1_nodes &&
    nia02b1_nodes.length > 0 &&
    isItemsVisible(nia02b1_nodes)
  ) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia02b1' class='result-focus label-red'>02-B</a> : Absence de certains attributs sur des SVG (aria-hidden=true) [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-4' target='_blank'>RAWeb 1.2.4</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-image-decorative-est-dotee-dune-alternative-textuelle-appropriee' target='_blank'>Opquast 111</a>]</li>"
    );
    setItemsOutline(nia02b1_nodes, 'red', 'nia02b1', '02-B');
  }
  if (!only_error) {
    if (
      nia02b2_nodes &&
      nia02b2_nodes.length > 0 &&
      isItemsVisible(nia02b2_nodes)
    ) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia02b2' class='result-focus label-yellow'>02-B</a> : Absence de certains attributs sur des SVG (focusable=false) [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-image-decorative-est-dotee-dune-alternative-textuelle-appropriee' target='_blank'>Opquast 111</a>]</li>"
      );
      setItemsOutline(nia02b2_nodes, 'yellow', 'nia02b2', '02-B');
    }
  }

  const nia02b3_nodes = document.querySelectorAll(
    'svg[role="img"]:not([title]):not([aria-labelledby]):not([aria-label])'
  );
  if (
    nia02b3_nodes &&
    nia02b3_nodes.length > 0 &&
    isItemsVisible(nia02b3_nodes)
  ) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia02b3' class='result-focus label-red'>02-B</a> : Les images vectorielle porteuse d'information doivent posséder une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-1-5' target='_blank'>RAWeb 1.1.5</a>]</li>"
    );
    setItemsOutline(nia02b3_nodes, 'red', 'nia02b3', '02-B');
  }

  const nia02b4_nodes = document.querySelectorAll(
    'svg[aria-hidden="true"][aria-label], svg[aria-hidden="true"][aria-labelledby]'
  );
  if (
    nia02b4_nodes &&
    nia02b4_nodes.length > 0 &&
    isItemsVisible(nia02b4_nodes)
  ) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia02b4' class='result-focus label-red'>02-B</a> : Les images vectorielle de décoration ne doivent pas posséder une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-4' target='_blank'>RAWeb 1.2.4</a> - [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-image-decorative-est-dotee-dune-alternative-textuelle-appropriee' target='_blank'>Opquast 111</a>]</li>"
    );
    setItemsOutline(nia02b4_nodes, 'red', 'nia02b4', '02-B');
  }

  const nia02b5_nodes = document.querySelectorAll(
    'svg[aria-hidden="true"] title, svg[aria-hidden="true"] desc'
  );
  let nia02b5_flag = false;
  if (nia02b5_nodes && nia02b5_nodes.length > 0) {
    for (let i = 0; i < nia02b5_nodes.length; i++) {
      if (
        isItemsVisible(nia02b5_nodes[i]) &&
        ((nia02b5_nodes[i].hasAttribute('title') &&
          nia02b5_nodes[i].getAttribute('title').length > 0) ||
          (nia02b5_nodes[i].hasAttribute('desc') &&
            nia02b5_nodes[i].getAttribute('desc').length > 0))
      ) {
        setItemOutline(nia02b5_nodes[i], 'red', 'nia02b5', '02-B');
        nia02b5_flag = true;
      }
    }
  }
  if (nia02b5_flag == true) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia02b5' class='result-focus label-red'>02-B</a> : Les images vectorielle de décoration ne doivent pas posséder une alternative textuelle dans des balises 'title' ou 'desc' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-4' target='_blank'>RAWeb 1.2.4</a>]</li>"
    );
  }
}

// C. Alt vide sur les images de search logique.
function check_test_02c() {
  if (!only_redactor && isAEM) {
    const nia02c_nodes = document.querySelectorAll(
      '.cmp-focus img:not([alt=""])'
    );
    if (
      nia02c_nodes &&
      nia02c_nodes.length > 0 &&
      isItemsVisible(nia02c_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia02c' class='result-focus label-red'>02-C</a> : Présence de " +
          nia02c_nodes.length +
          ' image de search-logic sans attribut alt vide</li>'
      );
      setItemsOutline(nia02c_nodes, 'red', 'nia02c', '02-C');
    }
  }
}

// D. Absence de copyright/caption/légende sur une image Core V3
function check_test_02d() {
  if (!only_redactor && isAEM) {
    const nia02d_nodes = document.querySelectorAll(
      '.cmp-image[data-cmp-hook-image="imageV3"] .cmp-image__title'
    );
    if (
      nia02d_nodes &&
      nia02d_nodes.length > 0 &&
      isItemsVisible(nia02d_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia02d' class='result-focus label-orange'>02-D</a> : Présence d'un caption non lié correctement à son image</li>"
      );
      setItemsOutline(nia02d_nodes, 'orange', 'nia02d', '02-D');
    }
  }
}

// E. Images légendés presence du aria-label sur le figure
function check_test_02e() {
  if (!only_redactor && isAEM) {
    const nia02e_nodes = document.querySelectorAll(
      'figure[data-cmp-hook-image="figure"]:not([aria-label]) figcaption'
    );
    if (
      nia02e_nodes &&
      nia02e_nodes.length > 0 &&
      isItemsVisible(nia02e_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia02e' class='result-focus label-orange'>02-E</a> : Les captions des images ne sont pas correctement restitué, il manque un attribut aria-label sur la balise figure</li>"
      );
      setItemsOutline(nia02e_nodes, 'orange', 'nia02e', '02-E');
    }
  }
}

// F. Vérification sur les images atypique
function check_test_02f() {
  if (!only_redactor) {
    const nia02f1_nodes = document.querySelectorAll(
      'area:not([aria-label]):not([alt])'
    );
    if (
      nia02f1_nodes &&
      nia02f1_nodes.length > 0 &&
      isItemsVisible(nia02f1_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia02f1' class='result-focus label-red'>02-F</a> : Les zones d'image réactive porteuse d'information doivent avoir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-1-2' target='_blank'>RAWeb 1.1.2</a>]</li>"
      );
      setItemsOutline(nia02f1_nodes, 'red', 'nia02f1', '02-F');
    }

    const nia02f2_nodes = document.querySelectorAll(
      'input[type="image"]:not([alt]):not([aria-label]):not([aria-labelledby]):not([title])'
    );
    if (
      nia02f2_nodes &&
      nia02f2_nodes.length > 0 &&
      isItemsVisible(nia02f2_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia02f2' class='result-focus label-red'>02-F</a> : Les boutons de type image (balise input avec attribut type=image doivent avoir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-1-3' target='_blank'>RAWeb 1.1.3</a>]</li>"
      );
      setItemsOutline(nia02f2_nodes, 'red', 'nia02f2', '02-F');
    }

    const nia02f3_nodes = document.querySelectorAll(
      'object[type^="image/"]:not([role="img"]):not([aria-label]):not([aria-labelledby]):not([title])'
    );
    if (
      nia02f3_nodes &&
      nia02f3_nodes.length > 0 &&
      isItemsVisible(nia02f3_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia02f3' class='result-focus label-red'>02-F</a> : Les images objects porteuses d'information doivent avoir une alternative textuelle - à vérifier manuellement la présence d'un mécaniseme de remplacement [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-1-6' target='_blank'>RAWeb 1.1.6</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-image-porteuse-dinformation-est-dotee-dune-alternative-textuelle-appropriee' target='_blank'>Opquast 113</a>]</li>"
      );
      setItemsOutline(nia02f3_nodes, 'red', 'nia02f3', '02-F');
    }

    const nia02f4_nodes = document.querySelectorAll(
      'embed[type^="image/"]:not([role="img"]):not([aria-label]):not([aria-labelledby]):not([title])'
    );
    if (
      nia02f4_nodes &&
      nia02f4_nodes.length > 0 &&
      isItemsVisible(nia02f4_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia02f4' class='result-focus label-red'>02-F</a> : Les images embarquée porteuses d'information doivent avoir une alternative textuelle - à vérifier manuellement la présence d'un mécaniseme de remplacement [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-1-7' target='_blank'>RAWeb 1.1.7</a>]</li>"
      );
      setItemsOutline(nia02f4_nodes, 'red', 'nia02f4', '02-F');
    }

    const nia02f5_nodes = document.querySelectorAll(
      'canvas[type^="image/"]:not([role="img"]):not([aria-label]):not([aria-labelledby])'
    );
    if (
      nia02f5_nodes &&
      nia02f5_nodes.length > 0 &&
      isItemsVisible(nia02f5_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia02f5' class='result-focus label-red'>02-F</a> : Les images bitmap (balise canvas) porteuses d'information doivent avoir une alternative textuelle - à vérifier manuellement la présence d'un mécaniseme de remplacement [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-1-8' target='_blank'>RAWeb 1.1.8</a>]</li>"
      );
      setItemsOutline(nia02f5_nodes, 'red', 'nia02f5', '02-F');
    }
  }
}

// G. Les images de décoration ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle
function check_test_02g() {
  const nia02g1_nodes = document.querySelectorAll(
    'img:where([alt=""],[aria-hidden="true"],[role="presentation"],[role="none"]):where([aria-label][aria-labelledby][title])'
  );
  if (
    nia02g1_nodes &&
    nia02g1_nodes.length > 0 &&
    isItemsVisible(nia02g1_nodes)
  ) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia02g1' class='result-focus label-red'>02-G</a> : Les images de décoration ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-1' target='_blank'>RAWeb 1.2.1</a>] </li>"
    );
    setItemsOutline(nia02g1_nodes, 'red', 'nia02g1', '02-G');
  }

  if (!only_redactor) {
    const nia02g2_nodes = document.querySelectorAll(
      'area:not([href]):where([alt=""],[aria-hidden="true"],[role="presentation"],[role="none"]):where([aria-label],[aria-labelledby],[title])'
    );
    if (
      nia02g2_nodes &&
      nia02g2_nodes.length > 0 &&
      isItemsVisible(nia02g2_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia02g2' class='result-focus label-red'>02-G</a> : Les zone non cliquable de décoration ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-2' target='_blank'>RAWeb 1.2.2</a>] </li>"
      );
      setItemsOutline(nia02g2_nodes, 'red', 'nia02g2', '02-G');
    }

    const nia02g3_nodes = document.querySelectorAll(
      'object[type^="image/"][aria-hidden="true"]:where([aria-label],[aria-labelledby],[title])'
    );
    if (
      nia02g3_nodes &&
      nia02g3_nodes.length > 0 &&
      isItemsVisible(nia02g3_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia02g3' class='result-focus label-red'>02-G</a> : Les images object de décoration ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-3' target='_blank'>RAWeb 1.2.3</a>] </li>"
      );
      setItemsOutline(nia02g3_nodes, 'red', 'nia02g3', '02-G');
    }

    const nia02g4_nodes = document.querySelectorAll(
      'canvas[aria-hidden="true"]:where([aria-label],[aria-labelledby],[title])'
    );
    if (
      nia02g4_nodes &&
      nia02g4_nodes.length > 0 &&
      isItemsVisible(nia02g4_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia02g4' class='result-focus label-red'>02-G</a> : Les images bitmap de décoration (canvas) ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-5' target='_blank'>RAWeb 1.2.5</a>] </li>"
      );
      setItemsOutline(nia02g4_nodes, 'red', 'nia02g4', '02-G');
    }

    const nia02g5_nodes = document.querySelectorAll(
      'embed[type^="image/"][aria-hidden="true"]:where([aria-label],[aria-labelledby],[title])'
    );
    if (
      nia02g5_nodes &&
      nia02g5_nodes.length > 0 &&
      isItemsVisible(nia02g5_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia02g4' class='result-focus label-red'>02-G</a> : Les images embarquées de décoration ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-6' target='_blank'>RAWeb 1.2.6</a>] </li>"
      );
      setItemsOutline(nia02g5_nodes, 'red', 'nia02g5', '02-G');
    }

    const nia02g6_nodes = document.querySelectorAll(
      'object[type^="image/"][aria-hidden="true"]'
    );
    let nia02g6_flag = false;
    if (nia02g6_nodes && nia02g6_nodes.length > 0) {
      for (let i = 0; i < nia02g6_nodes.length; i++) {
        if (
          isItemVisible(nia02g6_nodes[i]) &&
          nia02g6_nodes[i].textContent.length > 0
        ) {
          setItemOutline(nia02g6_nodes[i], 'red', 'nia02g6', '02-G');
          nia02g6_flag = true;
        }
      }
    }
    if (nia02g6_flag == true) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia02g6' class='result-focus label-red'>02-G</a> : Les images object de décoration ne doivent pas avoir de contenu alternatif présent entre ses balises [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-3' target='_blank'>RAWeb 1.2.3</a>] </li>"
      );
    }

    const nia02g7_nodes = document.querySelectorAll(
      'canvas[aria-hidden="true"]'
    );
    let nia02g7_flag = false;
    if (nia02g7_nodes && nia02g7_nodes.length > 0) {
      for (let i = 0; i < nia02g7_nodes.length; i++) {
        if (
          isItemVisible(nia02g7_nodes[i]) &&
          nia02g7_nodes[i].textContent.length > 0
        ) {
          setItemOutline(nia02g7_nodes[i], 'red', 'nia02g7', '02-G');
          nia02g7_flag = true;
        }
      }
    }
    if (nia02g7_flag == true) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia02g7' class='result-focus label-red'>02-G</a> : Les images bitmap de décoration (canvas) ne doivent pas avoir de contenu alternatif présent entre ses balises [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-3' target='_blank'>RAWeb 1.2.3</a>] </li>"
      );
    }
  }
}

// H. L'alternative doit être courte et concise - estimation max 150 caractères
function check_test_02h() {
  const nia02h_nodes = document.querySelectorAll(
    ':where(img,svg,canvas,embed[type^="image/"],object[type^="image/"]):where([alt],[aria-label],[aria-labelledby],[title]):not([aria-hidden="true"]):not([role="presentation"]):not([role="none"])'
  );
  let nia02h_flag = false;
  let nia02h_lang = '',
    nia02h_label = '';
  if (nia02h_nodes && nia02h_nodes.length > 0) {
    for (let i = 0; i < nia02h_nodes.length; i++) {
      nia02h_lang = nia02h_nodes[i].closest('[lang]').getAttribute('lang');
      if (nia02h_nodes[i].hasAttribute('aria-labelledby')) {
        nia02h_label = document.querySelectorAll(
          "[id='" + nia02h_nodes[i].getAttribute('aria-labelledby') + "']"
        );
        if (!nia02h_label || nia02h_label.length != 1) {
          setItemOutline(nia02h_nodes[i], 'red', 'nia02h1', '02-H');
          setItemToResultList(
            'nc',
            "<li><a href='#' data-destination='nia02h1' class='result-focus label-red'>02-H</a> : Problème de référence introuvable ur un attribut aria-labelledby</li>"
          );
        } else if (
          !only_error &&
          sanitizeText(nia02h_label[0].textContent, nia02h_lang).length > 150
        ) {
          setItemOutline(nia02h_nodes[i], 'yellow', 'nia02h', '02-H');
          nia02h_flag = true;
        }
      } else if (
        !only_error &&
        nia02h_nodes[i].hasAttribute('aria-label') &&
        sanitizeText(nia02h_nodes[i].getAttribute('aria-label'), nia02h_lang)
          .length > 150
      ) {
        setItemOutline(nia02h_nodes[i], 'yellow', 'nia02h', '02-H');
        nia02h_flag = true;
      } else if (
        !only_error &&
        nia02h_nodes[i].hasAttribute('alt') &&
        sanitizeText(nia02h_nodes[i].getAttribute('alt'), nia02h_lang).length >
          150
      ) {
        setItemOutline(nia02h_nodes[i], 'yellow', 'nia02h', '02-H');
        nia02h_flag = true;
      } else if (
        !only_error &&
        nia02h_nodes[i].hasAttribute('title') &&
        sanitizeText(nia02h_nodes[i].getAttribute('title'), nia02h_lang)
          .length > 150
      ) {
        setItemOutline(nia02h_nodes[i], 'yellow', 'nia02h', '02-H');
        nia02h_flag = true;
      }
    }
  }
  if (nia02h_flag == true) {
    setItemToResultList(
      'nth',
      "<li><a href='#' data-destination='nia02h' class='result-focus label-yellow'>02-H</a> : Présence d'alternative textuelle trop longue [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-3-9' target='_blank'>RAWeb 1.3.9</a>]</li>"
    );
  }
}

// I Chaque image-lien est dotée d'une alternative textuelle appropriée.
function check_test_02i() {
  if (!only_error) {
    const nia02i_nodes = document.querySelectorAll(
      'a:not(.blocklink):not([role="button"]):has(> img),a:not(.blocklink):not([role="button"]):has(> svg)'
    );
    let nia02i_title = '';
    let nia02i_flag = false;
    if (nia02i_nodes && nia02i_nodes.length > 0) {
      for (let i = 0; i < nia02i_nodes.length; i++) {
        if (isItemVisible(nia02i_nodes[i])) {
          if (
            nia02i_nodes[i].childElementCount == 1 &&
            nia02i_nodes[i].getElementsByTagName('img')[0] != null &&
            nia02i_nodes[i]
              .getElementsByTagName('img')[0]
              .getAttribute('alt') == ''
          ) {
            setItemOutline(nia02i_nodes[i], 'yellow', 'nia02i', '02-I');
            nia02i_flag = true;
          } else if (
            nia02i_nodes[i].childElementCount == 1 &&
            nia02i_nodes[i].getElementsByTagName('svg')[0] != null
          ) {
            setItemOutline(nia02i_nodes[i], 'yellow', 'nia02i', '02-I');
            nia02i_flag = true;
          }
        }
      }
    }
    if (nia02i_flag == true) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia02i' class='result-focus label-yellow'>02-I</a> : Présence d'image-lien avec une alternative textuelle non pertinente [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-6-1-5' target='_blank'>RAWeb 6.1.5</a>, <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-image-lien-est-dotee-dune-alternative-textuelle-appropriee' target='_blank'> Opquast 112</a>]</li>"
      );
    }
  }
}

// J.Les vignettes et aperçus ne sont pas des images de taille supérieure redimensionnées côté client.
function check_test_02j() {
  if (!only_error && isAEM) {
    const nia02j_nodes = document.querySelectorAll(
      '*:not(.feed-item-content > p):not(.feed-item-header):not(.ol-full-screen-false) > img:not([src$=".svg"])'
    );
    let nia02j_css_h = '',
      nia02j_css_w = '',
      nia02j_html_h = '',
      nia02j_html_w = '',
      nia02j_natural_h = '',
      nia02j_natural_w = '';
    let nia02j_flag = false;
    let nia02j_ratio_max = 3.5;
    let nia02j_ratio_min = 0.5;
    if (nia02j_nodes && nia02j_nodes.length > 0) {
      for (let i = 0; i < nia02j_nodes.length; i++) {
        if (isItemVisible(nia02j_nodes[i])) {
          nia02j_ratio_max = 3.5;
          if (
            Boolean(nia02j_nodes[i].closest('.search-result')) ||
            Boolean(nia02j_nodes[i].closest('.cmp-focus'))
          ) {
            nia02j_ratio_max = 5;
            if (debug_flag)
              console.log(
                nia02j_ratio_max + ' ' + nia02j_nodes[i].getAttribute('src')
              );
          } // ratio 5 pour search-result  3.5 sinon

          nia02j_css_h = nia02j_nodes[i].height;
          nia02j_css_w = nia02j_nodes[i].width;
          nia02j_html_h = nia02j_nodes[i].getAttribute('height');
          nia02j_html_w = nia02j_nodes[i].getAttribute('width');
          nia02j_natural_h = nia02j_nodes[i].naturalHeight;
          nia02j_natural_w = nia02j_nodes[i].naturalWidth;

          if (
            nia02j_html_h &&
            (Math.abs(nia02j_html_h / nia02j_css_h) < nia02j_ratio_min ||
              Math.abs(nia02j_html_h / nia02j_css_h) > nia02j_ratio_max)
          ) {
            if (debug_flag)
              console.log(
                'Html Height : ' + nia02j_html_h + ' vs ' + nia02j_css_h
              );
            setItemOutline(nia02j_nodes[i], 'yellow', 'nia02j', '02-J');
            nia02j_flag = true;
          } else if (
            nia02j_html_w &&
            (Math.abs(nia02j_html_w / nia02j_css_w) < nia02j_ratio_min ||
              Math.abs(nia02j_html_w / nia02j_css_w) > nia02j_ratio_max)
          ) {
            if (debug_flag)
              console.log(
                'Html Width : ' + nia02j_html_w + ' vs ' + nia02j_css_w
              );
            setItemOutline(nia02j_nodes[i], 'yellow', 'nia02j', '02-J');
            nia02j_flag = true;
          } else if (
            (Math.abs(nia02j_natural_h / nia02j_css_h) < nia02j_ratio_min ||
              Math.abs(nia02j_natural_h / nia02j_css_h) > nia02j_ratio_max) &&
            nia02j_natural_h > 1
          ) {
            if (debug_flag)
              console.log(
                'Natural Height : ' + nia02j_natural_h + ' vs ' + nia02j_css_h
              );
            setItemOutline(nia02j_nodes[i], 'yellow', 'nia02j', '02-J');
            nia02j_flag = true;
          } else if (
            (Math.abs(nia02j_natural_w / nia02j_css_w) < nia02j_ratio_min ||
              Math.abs(nia02j_natural_w / nia02j_css_w) > nia02j_ratio_max) &&
            nia02j_natural_w > 1
          ) {
            if (debug_flag)
              console.log(
                'Natural Width : ' + nia02j_natural_w + ' vs ' + nia02j_css_w
              );
            setItemOutline(nia02j_nodes[i], 'yellow', 'nia02j', '02-J');
            nia02j_flag = true;
          }
        }
      }
    }
    if (nia02j_flag == true) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia02j' class='result-focus label-yellow'>02-J</a> : Présence d'image redimentionnées côté Client [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-vignettes-et-apercus-ne-sont-pas-des-images-de-taille-superieure-redimensionnees-cote-client' target='_blank'>Opquast 114</a>]</li>"
      );
    }
  }
}

/*- -------------------------------------------------------------------------------- */
/* 🗸 NIA-03 Lien - Thématique RAWeb 6
Vérification de plusieurs points concernant les liens :
 o Liste des liens internes et externe
 o affichage des attributs title des liens
 o vérification d’erreurs courantes.
 */
function check_part_03() {
  if (debug_flag) console.log('03 Liens');

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
}

// A. Verification de la présence du suffix sur les liens externe
function check_test_03a() {
  if (!only_redactor && !only_error) {
    const nia03a_nodes = document.querySelectorAll(
      'html[lang="fr"] a[target="_blank"]:not([title$="- Nouvelle fenêtre"]):not([title$="- Nouvelle fenêtre (Pdf)"]):not(.mapboxgl-ctrl-logo):not(.blocklink), html[lang="fr"] a[title$="- Nouvelle fenêtre"]:not([target="_blank"]), html[lang="en"] a[target="_blank"]:not([title$="- New window"]):not([title$="- New window (Pdf)"]):not(.mapboxgl-ctrl-logo):not(.blocklink),html[lang="en"] a[title$="- New window"]:not([target="_blank"]), html[lang="de"] a[target="_blank"]:not([title$="- Neues Fenster"]):not([title$="- Neues Fenster (Pdf)"]):not(.mapboxgl-ctrl-logo):not(.blocklink),html[lang="de"] a[title$="- Neues Fenster"]:not([target="_blank"]),html[lang="lb"] a[target="_blank"]:not([title$="- Nei Fënster"]):not([title$="- Nei Fënster (Pdf)"]):not(.mapboxgl-ctrl-logo):not(.blocklink),html[lang="lb"] a[title$="- Nei Fënster"]:not([target="_blank"])'
    );
    let nia03a_flag = false;
    let nia03a_lang;
    let nia03a_title;
    if (nia03a_nodes && nia03a_nodes.length > 0) {
      for (let i = 0; i < nia03a_nodes.length; i++) {
        if (isItemVisible(nia03a_nodes[i])) {
          nia03a_lang = nia03a_nodes[i].closest('[lang]').getAttribute('lang');
          nia03a_title = nia03a_nodes[i].getAttribute('title');
          if (
            !nia03a_title ||
            !(
              (nia03a_title &&
                nia03a_lang == 'en' &&
                nia03a_title.endsWith('- New window')) ||
              (nia03a_title &&
                nia03a_lang == 'fr' &&
                nia03a_title.endsWith('- Nouvelle fenêtre')) ||
              (nia03a_title &&
                nia03a_lang == 'de' &&
                nia03a_title.endsWith('- Neues Fenster')) ||
              (nia03a_title &&
                nia03a_lang == 'lb' &&
                nia03a_title.endsWith('- Nei Fënster'))
            )
          ) {
            setItemOutline(nia03a_nodes[i], 'yellow', 'nia03a', '03-A');
            nia03a_flag = true;
          }
        }
      }
    }
    if (nia03a_flag == true) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia03a' class='result-focus label-yellow'>03-A</a> : Vérifier la présence de suffixe sur les liens externes [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/lutilisateur-est-averti-des-ouvertures-de-nouvelles-fenetres' target='_blank'>Opquast 141</a>]</li>"
      );
    }
  }
}

// B. Verification de titre vide
function check_test_03b() {
  const nia03b_nodes = document.querySelectorAll(
    'a[title=" "],a[title="Nouvelle fenêtre"],a[title="- Nouvelle fenêtre"],a[title$="Nouvelle fenêtre - Nouvelle fenêtre"], a[title="   - Nouvelle fenêtre"]'
  );
  if (nia03b_nodes && nia03b_nodes.length > 0 && isItemsVisible(nia03b_nodes)) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia03b' class='result-focus label-red'>03-B</a> : Vérifier qu'il n'y a pas de lien avec un titre non pertinant [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-6.1.1' target='_blank'>RAWeb 6.1.1</a>]</li>"
    );
    setItemsOutline(nia03b_nodes, 'red', 'nia03b', '03-B');
  }
}

// C. Probleme de lang
function check_test_03c() {
  if (!only_redactor) {
    const nia03c_nodes = document.querySelectorAll(
      'html:not([lang="fr"]) *:not(.book-download) > a[title$="- Nouvelle fenêtre"]:not([lang="fr"]), html:not([lang="en"]) *:not(.book-download) > a[title$="- New window"]:not([lang="en"]), html:not([lang="de"]) *:not(.book-download) > a[title$="- Neues Fenster"]:not([lang="de"]), html:not([lang="lb"]) *:not(.book-download) > a[title$="- Nei Fënster"]:not([lang="lb"])'
    );
    if (
      nia03c_nodes &&
      nia03c_nodes.length > 0 &&
      isItemsVisible(nia03c_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia03c' class='result-focus label-orange'>03-C</a> : Présence du suffixe 'Nouvelle fenêtre' sur une page non rédiger en français (de même pour les autres langues)</li>"
      );
      setItemsOutline(nia03c_nodes, 'orange', 'nia03c', '03-C');
    }
  }
}

// D. Présence d'un conflit dans les attribut de liens
function check_test_03d() {
  if (!only_redactor) {
    const nia03d_nodes = document.querySelectorAll(
      'a[aria-label][aria-labelledby]'
    );
    if (
      nia03d_nodes &&
      nia03d_nodes.length > 0 &&
      isItemsVisible(nia03d_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia03d' class='result-focus label-red'>03-D</a> : Présence d'un conflit dans les attributs des liens</li>"
      );
      setItemsOutline(nia03d_nodes, 'red', 'nia03d', '03-D');
    }
  }
}

// E. Vérifier que le title reprend à minimum le contenu textuel
function check_test_03e() {
  const nia03e_nodes = document.querySelectorAll('a[title]');
  let nia03e_flag = false;
  let nia03e_content = '',
    nia03e_title = '',
    nia03e_lang = '',
    nia03e_innerText = '';
  if (nia03e_nodes && nia03e_nodes.length > 0) {
    for (let i = 0; i < nia03e_nodes.length; i++) {
      if (isItemVisible(nia03e_nodes[i])) {
        nia03e_lang = nia03e_nodes[i].closest('[lang]').getAttribute('lang');
        nia03e_title = sanitizeText(
          nia03e_nodes[i].getAttribute('title'),
          nia03e_lang
        );
        nia03e_innerText = nia03e_nodes[i].innerText;
        //console.log(nia03e_nodes[i].getElementsByClassName('checkA11YSpan').length);
        if (
          nia03e_nodes[i].getElementsByClassName('checkA11YSpan').length > 0
        ) {
          for (
            let j = 0;
            j < nia03e_nodes[i].getElementsByClassName('checkA11YSpan').length;
            j++
          ) {
            //console.log(nia03e_nodes[i].getElementsByClassName('checkA11YSpan')[j]);
            nia03e_innerText = nia03e_innerText.replace(
              nia03e_nodes[i].getElementsByClassName('checkA11YSpan')[j]
                .textContent,
              ''
            );
          }
        }
        nia03e_content = sanitizeText(nia03e_innerText, nia03e_lang);
        if (
          !nia03e_title.includes(nia03e_content) &&
          !nia03e_title.includes(
            nia03e_content.replace(/(pdf)([1-9])/, '$1 $2')
          )
        ) {
          if (debug_flag) {
            console.log(
              '%cERROR',
              'font-weight:700;color:darkred',
              '[' + nia03e_title + '] VS [' + nia03e_content + '] '
            );
          }
          setItemOutline(nia03e_nodes[i], 'red', 'nia03e', '03-E');
          nia03e_flag = true;
        }
      }
    }
  }
  if (nia03e_flag == true) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia03e' class='result-focus label-red'>03-E</a> : Présence de liens dont l'attribut title ne reprend pas le contenu textuel [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-6-1-5' target='_blank'>RAWeb 6.1.5</a>]</li>"
    );
  }
}

// F. Chaque lien a t'il un intitulé
function check_test_03f() {
  const nia03f_nodes = document.querySelectorAll(
    'a[href]:not([href^="#"]),[role="link"][href]:not([href^="#"])'
  );
  let nia03f_flag = false;
  let nia03f_lang = '';
  if (nia03f_nodes && nia03f_nodes.length > 0) {
    for (let i = 0; i < nia03f_nodes.length; i++) {
      if (isItemVisible(nia03f_nodes[i])) {
        nia03f_lang = nia03f_nodes[i].closest('[lang]').getAttribute('lang');
        //Ni dans l'attribut title, ni dans le contenu textuel, ni dans l'attribut alt des images enfants
        if (
          !(
            nia03f_nodes[i].hasAttribute('title') &&
            sanitizeText(nia03f_nodes[i].getAttribute('title'), nia03f_lang)
              .length > 0
          ) &&
          sanitizeText(nia03f_nodes[i].innerText).length == 0 &&
          nia03f_nodes[i].querySelectorAll(
            'img:not([alt=""]):not([aria-hidden="true"]):not([hidden])'
          ).length == 0
        ) {
          setItemOutline(nia03f_nodes[i], 'red', 'nia03f', '03-F');
          nia03f_flag = true;
        }
      }
    }
  }
  if (nia03f_flag == true) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia03f' class='result-focus label-red'>03-F</a> : Présence de liens dont le contenu est vide [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-6-2-1' target='_blank'>RAWeb 6.2.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-libelle-de-chaque-lien-decrit-sa-fonction-ou-la-nature-du-contenu-vers-lequel-il-pointe' target='_blank'>Opquast 131</a>]</li>"
    );
  }
}

// G. Présence de liens sans href
function check_test_03g() {
  if (!only_error) {
    const nia03g_nodes = document.querySelectorAll(
      'a:not([href]),[role="link"]:not([href])'
    );
    if (
      nia03g_nodes &&
      nia03g_nodes.length > 0 &&
      isItemsVisible(nia03g_nodes)
    ) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia03g' class='result-focus label-yellow'>03-G</a> : Présence d'un lien sans destination</li>"
      );
      setItemsOutline(nia03g_nodes, 'yellow', 'nia03g', '03-G');
    }
  }
}

// H. Liens tel: mailto: fax:
function check_test_03h() {
  const nia03h_nodes = document.querySelectorAll(
    '*:not(.mcgyver-slot) > a[href^="mailto:"],a[href^="fax:"],a[href^="tel:"]'
  );
  let nia03h_flag = false;
  let nia03h_regexmail =
    /^((?=.+@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*(?:\.[A-Za-z]{2,}))$/;
  let nia03h_regexphone = /^((\+|00)|\((\+|00)[0-9]{1,4}\))?[0-9+\-\s().]*$/;
  let nia03h_content = '';

  if (nia03h_nodes && nia03h_nodes.length > 0) {
    for (let i = 0; i < nia03h_nodes.length; i++) {
      if (isItemVisible(nia03h_nodes[i])) {
        nia03h_content = nia03h_nodes[i].getAttribute('href');
        // Si mailto verification de la regex email
        if (
          nia03h_content.indexOf('mailto:') == 0 &&
          nia03h_content.replace('mailto:', '').match(nia03h_regexmail)
        ) {
          // OK
        }
        // Si tel ou fax verifiation de la regex tel
        else if (
          nia03h_content.indexOf('tel:') == 0 &&
          nia03h_content.replace('tel:', '').match(nia03h_regexphone)
        ) {
          // OK
        } else if (
          nia03h_content.indexOf('fax:') == 0 &&
          nia03h_content.replace('fax:', '').match(nia03h_regexphone)
        ) {
          // OK
        } else {
          setItemOutline(nia03h_nodes[i], 'red', 'nia03h', '03-H');
          nia03h_flag = true;
        }
      }
    }
  }
  if (nia03h_flag == true) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia03h' class='result-focus label-red'>03-H</a> : Présence de liens tel:, fax: ou mailto: non valide </li>"
    );
  }
}

// I Lien sur "ici" ou sur "lien"
function check_test_03i() {
  if (!only_error) {
    const nia03i_nodes = document.querySelectorAll('html[lang="fr"] a');
    let nia03i_content = '';
    let nia03i_flag = false;
    if (nia03i_nodes && nia03i_nodes.length > 0) {
      for (let i = 0; i < nia03i_nodes.length; i++) {
        if (isItemVisible(nia03i_nodes[i])) {
          nia03i_content = nia03i_nodes[i].innerHTML;
          if (
            nia03i_content == 'ici' ||
            nia03i_content == 'cliquer ici' ||
            nia03i_content == 'cliquez ici' ||
            nia03i_content == 'lire la suite' ||
            nia03i_content == 'lien'
          ) {
            setItemOutline(nia03i_nodes[i], 'yellow', 'nia03i', '03-I');
            nia03i_flag = true;
          }
        }
      }
    }
    if (nia03i_flag == true) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia03i' class='result-focus label-yellow'>03-I</a> : Présence de liens non pertinent [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-libelle-de-chaque-lien-decrit-sa-fonction-ou-la-nature-du-contenu-vers-lequel-il-pointe' target='_blank'> Opquast 132</a>]</li>"
      );
    }
  }
}

// J Vérifie la présence de l'attribut target_blank sur les liens externe (Exception : On ne regarde pas dans les flux sociaux car le contenu provient d'un aggregateur)
function check_test_03j() {
  let url = window.location.host;
  if (!url) {
    return '';
  }

  if (!only_redactor) {
    const nia03j_nodes = document.querySelectorAll(
      'a[href^="http"]:not([href*="' + url + '"]):not([target="_blank"])'
    );
    let nia03j_flag = false;
    if (
      nia03j_nodes &&
      nia03j_nodes.length > 0 &&
      isItemsVisible(nia03j_nodes)
    ) {
      for (let i = 0; i < nia03j_nodes.length; i++) {
        if (
          isItemVisible(nia03j_nodes[i]) &&
          nia03j_nodes[i].closest('.feed-wrapper') == null
        ) {
          setItemOutline(nia03j_nodes[i], 'orange', 'nia03j', '03-J');
          nia03j_flag = true;
        }
      }
    }
    if (nia03j_flag == true) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia03i' class='result-focus label-orange'>03-J</a> : Présence de liens externes qui s'ouvrent dans la fenêtre courante</li>"
      );
    }
  }
}

//K Liens Pour en savoir plus
function check_test_03k() {
  if (!only_error && isAEM) {
    const nia03k_nodes = document.querySelectorAll(
      '.cmp-focus .focus-more.btn, .cmp-contentbox a.btn'
    );
    if (
      nia03k_nodes &&
      nia03k_nodes.length > 15 &&
      isItemsVisible(nia03k_nodes)
    ) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia03k' class='result-focus label-yellow'>03-K</a> : Trop de liens Pour en savoir plus (" +
          nia03k_nodes.length +
          ')</li>'
      );
      setItemsOutline(nia03k_nodes, 'yellow', 'nia03k', '03-K');
    }
  }
}

// L Présence de soulignement en dehors de lien
function check_test_03l() {
  if (!only_error) {
    const nia03l_nodes = document.querySelectorAll(
      'body *:not(a):not(mark):not(h1):not(h2):not(h3):not(h4):not(h5):not(h6):not(button):not([role="tab"]):not(input)'
    );
    let nia03l_flag = false;
    if (
      nia03l_nodes &&
      nia03l_nodes.length > 0 &&
      isItemsVisible(nia03l_nodes)
    ) {
      for (let i = 0; i < nia03l_nodes.length; i++) {
        if (
          isItemVisible(nia03l_nodes[i]) &&
          window.getComputedStyle(nia03l_nodes[i], null).textDecorationLine ==
            'underline'
        ) {
          setItemOutline(nia03l_nodes[i], 'yellow', 'nia03l', '03-L');
          nia03l_flag = true;
        }
      }
    }
    if (nia03l_flag == true) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia03l' class='result-focus label-yellow'>03-L</a> : Réservez le soulignement aux liens</li>"
      );
    }
  }
}

// M. Présence de liens avec un espace dans le href
function check_test_03m() {
  const nia03m_nodes = document.querySelectorAll(
    'a[href*=" "],[role="link"][href*=" "]'
  );
  if (nia03m_nodes && nia03m_nodes.length > 0 && isItemsVisible(nia03m_nodes)) {
    setItemToResultList(
      'nth',
      "<li><a href='#' data-destination='nia03m' class='result-focus label-orange'>03-M</a> : Présence d'un lien erroné (espace present dans l'attribut href)</li>"
    );
    setItemsOutline(nia03m_nodes, 'orange', 'nia03m', '03-M');
  }
}

// N. Un lien non_souligné et inclus dans un paragraphe de texte doit être suffisamment contrasté avec le texte environnant (à l’état par défaut, hover et focus). Idéalement, toujours souligner les liens.
function check_test_03n() {
  if (!only_redactor && !only_error) {
    const nia03n_nodes = document.querySelectorAll(
      'main *:not(li.nav-item) > p > a:not(.btn), main *:not(.cmp-autocompleteSearch__keywords) > li:not(.cmp-focus-list-item):not(.nav-item):not(.cmp-languagenavigation__item):not(.cmp-breadcrumb__item):not(.subnav-item):not(.cmp-grid__item ):not(.filter-item):not(.cmp-list__item):not(.pagination-page):not(.pagination-next):not(.pagination-prev) > a:not(.toc-anchor)'
    );
    let nia03n_flag = false;
    if (
      nia03n_nodes &&
      nia03n_nodes.length > 0 &&
      isItemsVisible(nia03n_nodes)
    ) {
      for (let i = 0; i < nia03n_nodes.length; i++) {
        if (
          isItemVisible(nia03n_nodes[i]) &&
          window.getComputedStyle(nia03n_nodes[i], null).textDecorationLine !=
            'underline'
        ) {
          setItemOutline(nia03n_nodes[i], 'yellow', 'nia03n', '03-N');
          nia03n_flag = true;
        }
      }
    }
    if (nia03n_flag == true) {
      setItemToResultList(
        'man',
        "<li><a href='#' data-destination='nia03n' class='result-focus label-yellow'>03-N</a> : Présence d'un lien non souligné, vérifier son contraste avec le texte environnant</li>"
      );
    }
  }
}

// O. Ajouter un test pour detecter les liens vers le QUAL
function check_test_03o() {
  if (!only_redactor && !only_error && isAEM && !isPreview) {
    const nia03o_nodes = document.querySelectorAll('a');
    let nia03o_flag = false;
    if (nia03o_nodes && nia03o_nodes.length > 0) {
      for (let i = 0; i < nia03o_nodes.length; i++) {
        if (
          isItemVisible(nia03o_nodes[i]) &&
          nia03o_nodes[i].hasAttribute('href') &&
          nia03o_nodes[i].getAttribute('href').includes('wcm-')
        ) {
          setItemOutline(nia03o_nodes[i], 'orange', 'nia03o', '03-O');
          nia03o_flag = true;
        }
      }
    }
    if (nia03o_flag == true) {
      setItemToResultList(
        'man',
        "<li><a href='#' data-destination='nia03o' class='result-focus label-orange'>03-O</a> : Présence d'un lien vers un environnement de test.</li>"
      );
    }
  }
}

/*- -------------------------------------------------------------------------------- */
/* 🗸 NIA-04 Formulaire - Thématique RAWeb 11
Vérification de plusieurs points concernant les champs de formulaire :
 o Vérification des autocomplete
 o Vérification sur les fieldset
 o Vérification sur les messages d'aide et indication de format
 o vérification d’erreurs courantes.
 */

function check_part_04() {
  if (debug_flag) console.log('04 Formulaire');

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
}

// A. Champ générique
function check_test_04a() {
  const nia04a1_nodes = document.querySelectorAll(
    'input[name="name"]:not([autocomplete="family-name"]), input[name="lastname"]:not([autocomplete="family-name"])'
  );
  if (nia04a1_nodes && nia04a1_nodes.length > 0) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia04a1' class='result-focus label-red'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (name) - utiliser 'family-name' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]</li>"
    );
    setItemsOutline(nia04a1_nodes, 'red', 'nia04a1', '04-A');
  }
  const nia04a2_nodes = document.querySelectorAll(
    'input[name="firstname"]:not([autocomplete="given-name"])'
  );
  if (nia04a2_nodes && nia04a2_nodes.length > 0) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia04a2' class='result-focus label-red'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (firstname) - utiliser 'given-name' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]</li>"
    );
    setItemsOutline(nia04a2_nodes, 'red', 'nia04a2', '04-A');
  }
  const nia04a3_nodes = document.querySelectorAll(
    'input[type="email"]:not([autocomplete="email"])'
  );
  if (nia04a3_nodes && nia04a3_nodes.length > 0) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia04a3' class='result-focus label-red'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (email) - utiliser 'email' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]</li>"
    );
    setItemsOutline(nia04a3_nodes, 'red', 'nia04a3', '04-A');
  }
  const nia04a4_nodes = document.querySelectorAll(
    'input[type="tel"]:not([autocomplete="tel"]), input[name="phone"]:not([autocomplete="tel"])'
  );
  if (nia04a4_nodes && nia04a4_nodes.length > 0) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia04a4' class='result-focus label-red'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (phone) - utiliser 'tel' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]</li>"
    );
    setItemsOutline(nia04a4_nodes, 'red', 'nia04a4', '04-A');
  }
  const nia04a5_nodes = document.querySelectorAll(
    'input[name="postal"]:not([autocomplete="postal-code"]),input[type="postal-code"]:not([autocomplete="postal-code"])'
  );
  if (nia04a5_nodes && nia04a5_nodes.length > 0) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia04a5' class='result-focus label-red'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (postal) - utiliser 'postal-code' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]</li>"
    );
    setItemsOutline(nia04a5_nodes, 'red', 'nia04a5', '04-A');
  }
  const nia04a6_nodes = document.querySelectorAll(
    'input[name="country"]:not([autocomplete="country-name"]), select[name="country"]:not([autocomplete="country"])'
  );
  if (nia04a6_nodes && nia04a6_nodes.length > 0) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia04a6' class='result-focus label-red'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (country) - utiliser 'country-name' ou 'country' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]</li>"
    );
    setItemsOutline(nia04a6_nodes, 'red', 'nia04a6', '04-A');
  }
  const nia04a7_nodes = document.querySelectorAll(
    'input[name="matricule"][autocomplete]'
  );
  if (nia04a7_nodes && nia04a7_nodes.length > 0) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia04a7' class='result-focus label-red'>04-A</a> : Attribut erronée sur des champs formulaire (matricule) - Enlever l'attribut [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]</li>"
    );
    setItemsOutline(nia04a7_nodes, 'red', 'nia04a7', '04-A');
  }
  const nia04a8_nodes = document.querySelectorAll(
    'input[name="city"]:not([autocomplete="address-level2"]), input[name="ville"]:not([autocomplete="address-level2"])'
  );
  if (nia04a8_nodes && nia04a8_nodes.length > 0) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia04a8' class='result-focus label-red'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (ville) - Utiliser 'address-level2' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]</li>"
    );
    setItemsOutline(nia04a8_nodes, 'red', 'nia04a8', '04-A');
  }
  const nia04a9_nodes = document.querySelectorAll(
    'textarea[name="adresse"]:not([autocomplete="street-address"]), input[name="adresse"]:not([autocomplete="street-address"]), input[name="street"]:not([autocomplete="street-address"])'
  );
  if (nia04a9_nodes && nia04a9_nodes.length > 0) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia04a9' class='result-focus label-red'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (adresse) - Utiliser 'street-address' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]</li>"
    );
    setItemsOutline(nia04a9_nodes, 'red', 'nia04a9', '04-A');
  }
  const nia04a10_nodes = document.querySelectorAll(
    'input[name="organisation"]:not([autocomplete="organization"]), input[name="organization"]:not([autocomplete="organization"]),input[name="organism"]:not([autocomplete="organization"])'
  );
  if (nia04a10_nodes && nia04a10_nodes.length > 0) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia04a10' class='result-focus label-red'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (organisation) - utiliser 'organization' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]</li>"
    );
    setItemsOutline(nia04a10_nodes, 'red', 'nia04a10', '04-A');
  }
  const nia04a11_nodes = document.querySelectorAll(
    'input[name="fonction"]:not([autocomplete="organization-title"]), input[name="function"]:not([autocomplete="organization-title"])'
  );
  if (nia04a11_nodes && nia04a11_nodes.length > 0) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia04a11' class='result-focus label-red'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (function) - utiliser 'organization-title' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]</li>"
    );
    setItemsOutline(nia04a11_nodes, 'red', 'nia04a11', '04-A');
  }

  /* Liste des autocomplete :

	name - Nom complet ;
	honorific-prefix - Abréviation, civilité ou titre ;
	given-name - Prénom ;
	additional-name - Prénoms additionnels ;
	family-name - Nom de famille ;
	honorific-suffix - Suffixe honorifique ;
	nickname - Surnom, diminutif ;
	organization-title - Fonction, intitulé de poste ;
	username - Nom d’utilisateur ;
	new-password - Nouveau mot de passe (par exemple, lors de la création d’un compte ou d’un changement de mot de passe) ;
	current-password - Mot de passe actuel pour le compte identifié par le champ username (par exemple, lors d’une connexion) ;
	organization - Nom de l’organisation correspondant à la personne, à l’adresse ou à l’information de contact dans les autres champs associés avec ce champ ;
	street-address - Adresse postale (multiligne, nouvelles lignes conservées) ;
	address-line1 - Adresse postale (une ligne par champ, ligne 1) ;
	address-line2 - Adresse postale (une ligne par champ, ligne 2) ;
	address-line3 - Adresse postale (une ligne par champ, ligne 3) ;
	address-level4 - Le niveau administratif le plus détaillé, pour les adresses pourvues de quatre niveaux administratifs ;
	address-level3 - Le troisième niveau administratif, pour les adresses pourvues d’au moins trois niveaux administratifs ;
	address-level2 - Le deuxième niveau administratif, pour les adresses pourvues d’au moins deux niveaux administratifs ;
	address-level1 - Le plus large niveau administratif d’une adresse, c’est-à-dire la province dans laquelle se trouve la localité ;
	country - Code pays ;
	country-name - Nom de pays ;
	postal-code - Code postal, code CEDEX (si le CEDEX est présent, ajouter “CEDEX”, et ce qui le suit doit être ajouté dans le champ address-level2) ;
	cc-name - Nom complet figurant sur le moyen de paiement ;
	cc-given-name - Prénom figurant sur le moyen de paiement ;
	cc-additional-name - Prénoms additionnels figurant sur le moyen de paiement cc-family-name - Nom de famille figurant sur le moyen de paiement ;
	cc-number - Code identifiant le moyen de paiement (e.g., un numéro de carte bancaire) ;
	cc-exp - Date d’expiration du moyen de paiement ;
	cc-exp-month - Le mois de la date d’expiration du moyen de paiement ;
	cc-exp-year - L’année de la date d’expiration du moyen de paiement ;
	cc-csc - Code de sécurité du moyen de paiement (also known as the card security code (CSC), card validation code (CVC), card verification value (CVV), signature panel code (SPC), credit card ID (CCID), etc.) ;
	cc-type - Type de moyen de paiement (e.g. Visa) ;
	transaction-currency - La devise qui a la préférence de l’utilisateur lors d’une transaction ;
	transaction-amount - Le montant qui a la préférence de l’utilisateur lors d’une transaction (e.g., en réponse à une enchère ou à un prix soldé) ;
	language - Langage préféré ;
	bday - Date d’anniversaire ;
	bday-day - Le jour de la date d’anniversaire ;
	bday-month - Le mois de la date d’anniversaire ;
	bday-year - L’année de la date d’anniversaire ;
	sex - Identité sexuelle ;
	url - Page d’accueil ou une autre page Web correspondant à l’organisation, la personne, l’adresse ou à l’information de contact dans les autres champs associés avec ce champ ;
	photo - Photographie, icone ou une autre image correspondant à l’organisation, la personne, l’adresse ou à l’information de contact dans les autres champs associés avec ce champ ;
	tel - Numéro de téléphone complet, y compris le code pays ;
	tel-country-code - Code pays du numéro de téléphone ;
	tel-national - Numéro de téléphone sans la partie code pays, avec un préfixe interne au pays, s’il y a lieu ;
	tel-area-code - Indicatif régional du numéro de téléphone, avec un préfixe interne au pays, s’il y a lieu ;
	tel-local - Numéro de téléphone sans la partie code pays ni l’indicatif régional ;
	tel-local-prefix - La première partie du composant du numéro de téléphone qui suit l’indicatif régional, lorsque ce composant est scindé en deux parties ;
	tel-local-suffix - La seconde partie du composant du numéro de téléphone qui suit l’indicatif régional, lorsque ce composant est scindé en deux parties ;
	tel-extension - Numéro de téléphone d’un poste interne ;
	email - Adresse électronique ;
	impp - URL correspondant d’un protocole de messagerie instantanée (par exemple, "aim:goim?screenname=example" ou "xmpp:fred@example.net").*/

  if (!only_error && isCTIE) {
    const nia04a12_nodes = document.querySelectorAll(
      '[autocomplete="name"],[autocomplete="honorific-suffix"],[autocomplete="nickname"],[autocomplete="address-level1"],[autocomplete="address-level3"],[autocomplete="address-level4"],[autocomplete="cc-name"],[autocomplete="cc-given-name"],[autocomplete="cc-additional-name"],[autocomplete="cc-number"],[autocomplete="cc-exp"],[autocomplete="cc-exp-month"],[autocomplete="cc-exp-year"],[autocomplete="cc-csc"],[autocomplete="cc-type"],[autocomplete="transaction-currency"],[autocomplete="transaction-amount"],[autocomplete="language"],[autocomplete="bday-day"],[autocomplete="bday-month"],[autocomplete="bday-year"],[autocomplete="sex"],[autocomplete="photo"],[autocomplete="tel-area-code"],[autocomplete="tel-local"],[autocomplete="tel-local-prefix"],[autocomplete="tel-local-suffix"],[autocomplete="tel-extension"],[autocomplete="impp"]'
    );
    if (nia04a12_nodes && nia04a12_nodes.length > 0) {
      setItemToResultList(
        'man',
        "<li><a href='#' data-destination='nia04a12' class='result-focus label-yellow'>04-A</a> : Présence d'attribut autocomplete vraisemblablement erronée sur des champs formulaire [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]</li>"
      );
      setItemsOutline(nia04a12_nodes, 'yellow', 'nia04a12', '04-A');
    }
  }
}

// B. Vérifier le format sur l'email
function check_test_04b() {
  const nia04b_nodes = document.querySelectorAll('input[type="email"]');
  let nia04b_flag = false;
  let nia04b_id = '',
    nia04b_desc = '',
    nia04b_label = '',
    nia04b_help = '';
  if (nia04b_nodes && nia04b_nodes.length > 0) {
    for (let i = 0; i < nia04b_nodes.length; i++) {
      (nia04b_id = ''),
        (nia04b_desc = ''),
        (nia04b_label = ''),
        (nia04b_help = '');
      nia04b_id = nia04b_nodes[i].getAttribute('id');
      nia04b_desc = nia04b_nodes[i].getAttribute('aria-describedby');
      if (nia04b_id && nia04b_id != '') {
        nia04b_label = document.querySelector("label[for='" + nia04b_id + "']");
        if (!nia04b_label) {
          setItemOutline(nia04b_nodes[i], 'red', 'nia04b', '04-B');
          nia04b_flag = true;
        }
      }
      if (nia04b_desc && nia04b_desc != '') {
        nia04b_help = document.querySelector('[id=' + nia04b_desc + ']');
        if (!nia04b_help) {
          setItemOutline(nia04b_nodes[i], 'red', 'nia04b', '04-B');
          nia04b_flag = true;
        }
      }
      if (
        (nia04b_label &&
          nia04b_label != '' &&
          nia04b_label.innerText.match(/^\S+@\S+\.\S+$/)) ||
        (nia04b_help &&
          nia04b_help != '' &&
          nia04b_help.innerText.match(/^\S+@\S+\.\S+$/))
      ) {
        setItemOutline(nia04b_nodes[i], 'red', 'nia04b', '04-B');
        nia04b_flag = true;
      }
    }
  }
  if (nia04b_flag == true) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia04b' class='result-focus label-red'>04-B</a> : Présence de champs email sans exemple de format [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-10-5' target='_blank'>RAWeb 11.10.5</a>]</li>"
    );
  }
}

// C. Check intitulé bouton envoi
function check_test_04c() {
  if (!only_error && isAEM) {
    const nia04c_btn = document.querySelector(
      'html[lang="fr"] main form button.cmp-form-button[type="SUBMIT"][name="preview"]'
    );
    if (nia04c_btn && nia04c_btn.textContent != 'Prévisualiser puis envoyer') {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia04c' class='result-focus label-yellow'>04-C</a> : Vérifier si le bouton de soumission possède bien l'intitulé \"Prévisualiser puis envoyer\" [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-12-1' target='_blank'>RAWeb 11.12.1</a>]</li>"
      );
      setItemOutline(nia04c_btn, 'yellow', 'nia04c', '04-C');
    }
  }
}

// D. Vérifier si les champs ont bien un label
function check_test_04d() {
  const nia04d_nodes = document.querySelectorAll(
    "input:not([aria-label]):not([aria-labelledby]):not([type='hidden']):not([type='submit']):not([type='reset']):not([type='button']), select:not([aria-label]):not([aria-labelledby]), textarea:not([aria-label]):not([aria-labelledby])"
  );
  let nia04d_flag1 = false;
  let nia04d_flag2 = false;
  let nia04d_label = '',
    nia04d_id = '';
  if (nia04d_nodes && nia04d_nodes.length > 0) {
    for (let i = 0; i < nia04d_nodes.length; i++) {
      if (isItemVisible(nia04d_nodes[i])) {
        nia04d_id = nia04d_nodes[i].getAttribute('id');
        if (!nia04d_id || nia04d_id == '') {
          setItemOutline(nia04d_nodes[i], 'red', 'nia04d', '04-D');
          nia04d_flag1 = true;
        } else {
          nia04d_label = document.querySelectorAll(
            "label[for='" + nia04d_id + "']"
          );
          if (!nia04d_label || nia04d_label.length == 0) {
            setItemOutline(nia04d_nodes[i], 'red', 'nia04d', '04-D');
            nia04d_flag1 = true;
          } else if (nia04d_label.length > 1) {
            setItemOutline(nia04d_nodes[i], 'red', 'nia04d', '04-D');
            nia04d_flag2 = true;
          }
        }
      }
    }
  }
  if (nia04d_flag1 == true) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia04d' class='result-focus label-red'>04-D</a> : Présence de champs sans label [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-1-1' target='_blank'>RAWeb 11.1.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-champ-de-formulaire-est-associe-dans-le-code-source-a-une-etiquette-qui-lui-est-propre' target='_blank'>Opquast 67</a>]</li>"
    );
  }
  if (nia04d_flag2 == true) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia04d' class='result-focus label-red'>04-D</a> : Présence de champs avec plus d'un label [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-1-1' target='_blank'>RAWeb 11.1.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-champ-de-formulaire-est-associe-dans-le-code-source-a-une-etiquette-qui-lui-est-propre' target='_blank'>Opquast 67</a>]</li>"
    );
  }
}

// E. fieldset avec legend
function check_test_04e() {
  const nia04e_nodes = document.querySelectorAll('fieldset');
  let nia04e_flag = false;
  if (nia04e_nodes && nia04e_nodes.length > 0) {
    for (let i = 0; i < nia04e_nodes.length; i++) {
      if (isItemVisible(nia04e_nodes[i])) {
        if (
          nia04e_nodes[i].firstElementChild.tagName &&
          nia04e_nodes[i].firstElementChild.tagName == 'LEGEND'
        ) {
          // OK
        } else if (
          nia04e_nodes[i].firstElementChild.firstElementChild &&
          nia04e_nodes[i].firstElementChild.firstElementChild.tagName &&
          nia04e_nodes[i].firstElementChild.firstElementChild.tagName ==
            'LEGEND'
        ) {
          // La balise légend est encapsulée dans un container
        } else if (
          sanitizeText(nia04e_nodes[i].firstElementChild.textContent) == '' &&
          nia04e_nodes[i].firstElementChild.nextSibling &&
          nia04e_nodes[i].firstElementChild.nextSibling.tagName == 'LEGEND'
        ) {
          // Présence d'un élément décoratif avant la balise légende ( un \n, un pseudo-elem, etc.)
        } else {
          setItemsOutline(nia04e_nodes[i], 'red', 'nia04e', '04-E');
          nia04e_flag = true;
        }
      }
    }
  }
  if (nia04e_flag == true) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia04e' class='result-focus label-red'>04-E</a> : Absence de la légende dans un filedset [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-6-1' target='_blank'>RAWeb 11.6.1</a>]'</li>"
    );
  }
}

// F. Required ou aria-required="true" possède un asterisque dans le label
function check_test_04f() {
  if (!only_redactor && isAEM) {
    const nia04f_nodes = document.querySelectorAll(
      'form [required]:not([required="false"]), form [aria-required="true"]'
    );
    const nia04f_desc = document.querySelectorAll(
      '.cmp-ratings, .cmp-form__mandatory-text, .mandatory-label'
    );
    let nia04f_flag = false;
    let nia04f_id, nia04f_label;
    let nia04f_fieldset, nia04f_legend;
    if (nia04f_nodes && nia04f_nodes.length > 0) {
      for (let i = 0; i < nia04f_nodes.length; i++) {
        if (isItemVisible(nia04f_nodes[i])) {
          if (nia04f_nodes[i].parentElement.tagName != 'LABEL') {
            nia04f_id = nia04f_nodes[i].getAttribute('id');
            if (!nia04f_id || nia04f_id == '') {
              setItemOutline(nia04f_nodes[i], 'red', 'nia04f', '04-F');
              nia04f_flag = true;
            } else {
              nia04f_label = document.querySelectorAll(
                "label[for='" + nia04f_id + "']"
              );
              if (!nia04f_label || nia04f_label.length == 0) {
                setItemOutline(nia04f_nodes[i], 'red', 'nia04f', '04-F');
                nia04f_flag = true;
              } else if (!nia04f_label[0].textContent.includes('*')) {
                setItemOutline(nia04f_nodes[i], 'red', 'nia04f', '04-F');
                nia04f_flag = true;
              }
            }
          } else {
            // Checkbox / Radio
            nia04f_fieldset = nia04f_nodes[i].closest('fieldset');
            if (!nia04f_fieldset) {
              if (!nia04f_nodes[i].parentElement.textContent.includes('*')) {
                setItemOutline(nia04f_nodes[i], 'red', 'nia04f', '04-F');
                nia04f_flag = true;
              }
            } else {
              nia04f_legend = nia04f_fieldset.getElementsByTagName('legend');
              if (!nia04f_legend || nia04f_legend.length != 1) {
                setItemOutline(nia04f_nodes[i], 'red', 'nia04f', '04-F');
                nia04f_flag = true;
              } else if (!nia04f_legend[0].textContent.includes('*')) {
                setItemOutline(nia04f_nodes[i], 'red', 'nia04f', '04-F');
                nia04f_flag = true;
              }
            }
          }
        }
      }
      if (nia04f_desc.length == 0) {
        setItemToResultList(
          'nc',
          "<li><span class='result-focus label-red'>04-F</span> : Absence d'indication de la signification de l'astrisque sur un champ obligatoire [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-10-1' target='_blank'>RAWeb 11.10.1</a>]</li>"
        );
      }
    }
    if (nia04f_flag == true) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia04f' class='result-focus label-red'>04-F</a> : Absence d'astrisque sur un champ obligatoire [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-10-1' target='_blank'>RAWeb 11.10.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/letiquette-de-chaque-champ-de-formulaire-indique-si-la-saisie-est-obligatoire' target='_blank'>Opquast 69</a>]'</li>"
      );
    }
  }
}

// G. Pas d'autocomplete sur les champs radio/checkbox
function check_test_04g() {
  const nia04g_nodes = document.querySelectorAll(
    'input[type="checkbox"][autocomplete]:not([autocomplete="off"]),input[type="radio"][autocomplete]:not([autocomplete="off"])'
  );
  if (nia04g_nodes && nia04g_nodes.length > 0 && isItemsVisible(nia04g_nodes)) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia04g' class='result-focus label-red'>04-G</a> : Présence d'autocomplete sur un champ de type 'checkbox' ou 'Radiobutton' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]</li>"
    );
    setItemsOutline(nia04g_nodes, 'red', 'nia04g', '04-G');
  }
}

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

// I Les informations complétant l'étiquette d'un champ sont associées à celui-ci dans le code source
function check_test_04i() {
  if (!only_redactor) {
    const nia04i_nodes = document.querySelectorAll('input[aria-describedby]');
    let nia04i_flag = false;
    let nia04i_desc = '',
      nia04i_id = '';
    if (nia04i_nodes && nia04i_nodes.length > 0) {
      for (let i = 0; i < nia04i_nodes.length; i++) {
        if (isItemVisible(nia04i_nodes[i])) {
          nia04i_id = nia04i_nodes[i].getAttribute('aria-describedby').trim();
          if (!nia04i_id || nia04i_id == '') {
            setItemOutline(nia04i_nodes[i], 'red', 'nia04i', '04-I');
            nia04i_flag = true;
          } else {
            nia04i_desc = document.querySelectorAll("[id='" + nia04i_id + "']");
            if (!nia04i_desc || nia04i_desc.length != 1) {
              setItemOutline(nia04i_nodes[i], 'red', 'nia04i', '04-I');
              nia04i_flag = true;
            }
          }
        }
      }
    }
    if (nia04i_flag == true) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia04i' class='result-focus label-red'>04-I</a> : Présence d'attribut aria-describedby non lié à un texte d'aide [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-informations-completant-letiquette-dun-champ-sont-associees-a-celui-ci-dans-le-code-source' target='_blank'>Opquast 68</a>]</li>"
      );
    }
  }
}

// J Le format de saisie des champs de formulaire qui le nécessitent est indiqué (soit un aria-descibedby, soit des paranthèses dans le label)
function check_test_04j() {
  const nia04j_nodes = document.querySelectorAll(
    "input[type='email']:not([aria-describedby]), input[type='tel']:not([aria-describedby]), input[pattern]:not([aria-describedby]):not([pattern='.*\\\\S.*'])"
  );
  let nia04j_flag = false;
  let nia04j_label = '',
    nia04j_id = '';
  if (nia04j_nodes && nia04j_nodes.length > 0) {
    for (let i = 0; i < nia04j_nodes.length; i++) {
      if (isItemVisible(nia04j_nodes[i])) {
        nia04j_id = nia04j_nodes[i].getAttribute('id');
        if (!nia04j_id || nia04j_id == '') {
          setItemOutline(nia04j_nodes[i], 'red', 'nia04j', '04-J');
          nia04j_flag = true;
        } else {
          nia04j_label = document.querySelectorAll("[for='" + nia04j_id + "']");
          if (!nia04j_label || nia04j_label.length != 1) {
            setItemOutline(nia04j_nodes[i], 'red', 'nia04j', '04-J');
            nia04j_flag = true;
          } else if (nia04j_label[0].innerText.indexOf('(') < 0) {
            setItemOutline(nia04j_nodes[i], 'red', 'nia04j', '04-J');
            nia04j_flag = true;
          }
        }
      }
    }
  }
  if (nia04j_flag == true) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia04j' class='result-focus label-red'>04-J</a> : Absence du format de saisie dans un texte d'aide [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-format-de-saisie-des-champs-de-formulaire-qui-le-necessitent-est-indique' target='_blank'>Opquast 70</a>]</li>"
    );
  }
}

// K Présence de label de bouton insuffisament pertinent
function check_test_04k() {
  if (!only_error && isAEM) {
    const nia04k_nodes = document.querySelectorAll(
      "input[type='submit'], input[type='reset'], input[type='button']"
    );
    let nia04k_array = [
      'envoyer',
      'effacer',
      'annuler',
      'confirmer',
      'valider',
      'poursuivre',
      'rechercher'
    ];
    let nia04k_flag = false;
    let nia04k_label = '';
    if (nia04k_nodes && nia04k_nodes.length > 0) {
      for (let i = 0; i < nia04k_nodes.length; i++) {
        if (isItemVisible(nia04k_nodes[i])) {
          nia04k_label = nia04k_nodes[i].value;
          if (nia04k_label && nia04k_array.includes(nia04k_label)) {
            setItemOutline(nia04k_nodes[i], 'yellow', 'nia04k', '04-K');
            nia04k_flag = true;
          }
        }
      }
    }
    if (nia04k_flag == true) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia04k' class='result-focus label-yellow'>04-K</a> : Présence de label de bouton insuffisament pertinent  </li>"
      );
    }
  }
}

// L Formulaire : bouton avant la fin du formulaire
function check_test_04l() {
  if (!only_error) {
    const nia04l_nodes = document.querySelectorAll('form');
    let nia04l_flag = false;
    let nia04l_childs, nia04l_lastchilds;
    if (nia04l_nodes && nia04l_nodes.length > 0) {
      for (let i = 0; i < nia04l_nodes.length; i++) {
        if (isItemVisible(nia04l_nodes[i])) {
          nia04l_childs = nia04l_nodes[i].querySelectorAll('input , button');
          nia04l_lastchilds = nia04l_childs[nia04l_childs.length - 1];
          if (
            nia04l_lastchilds.tagName == 'BUTTON' ||
            (nia04l_lastchilds.tagName == 'INPUT' &&
              (nia04l_lastchilds.type == 'SUBMIT' ||
                nia04l_lastchilds.type == 'RESET' ||
                nia04l_lastchilds.type == 'BUTTON'))
          ) {
            // OK
          } else {
            setItemOutline(nia04l_nodes[i], 'yellow', 'nia04l', '04-L');
            nia04l_flag = true;
          }
        }
      }
    }
    if (nia04l_flag == true) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia04l' class='result-focus label-yellow'>04-L</a> : Formulaire avec bouton de soumission mal placé </li>"
      );
    }
  }
}

// M Un groupe de Checkbox/Radio doit être structuré dans un fieldset
function check_test_04m() {
  if (!only_redactor) {
    const nia04m_nodes = document.querySelectorAll(
      'input[type="checkbox"],input[type="radio"]'
    );
    let nia04m_flag = false;
    if (
      nia04m_nodes &&
      nia04m_nodes.length > 0 &&
      isItemsVisible(nia04m_nodes)
    ) {
      for (let i = 0; i < nia04m_nodes.length; i++) {
        if (!nia04m_nodes[i].parentElement.closest('fieldset')) {
          if (
            nia04m_nodes[i].parentElement.closest('cmp-form-options') &&
            nia04m_nodes[i].parentElement
              .closest('cmp-form-options')
              .querySelectorAll('input[type="checkbox"],input[type="radio"]')
              .length > 1
          ) {
            nia04m_flag = true;
            setItemsOutline(nia04m_nodes, 'orange', 'nia04m', '04-M');
          }
        }
      }
    }
    if (nia04m_flag == true) {
      setItemToResultList(
        'man',
        "<li><a href='#' data-destination='nia04m' class='result-focus label-orange'>04-M</a> : Un groupe de Checkbox/Radio doit être structuré dans un fieldset</li>"
      );
    }
  }
}

// N Le format de saisie du datepicker est indiqué (soit un aria-descibedby, soit des paranthèses dans le label)
function check_test_04n() {
  const nia04n_nodes = document.querySelectorAll(
    "input[type='text'].datepicker:not([aria-describedby]), input[type='text'][pattern='([0-9]{2}-){2}[0-9]{4}']:not([aria-describedby])"
  );
  let nia04n_flag = false;
  let nia04n_label = '',
    nia04n_id = '';
  if (nia04n_nodes && nia04n_nodes.length > 0) {
    for (let i = 0; i < nia04n_nodes.length; i++) {
      if (isItemVisible(nia04n_nodes[i])) {
        nia04n_id = nia04n_nodes[i].getAttribute('id');
        if (!nia04n_id || nia04n_id == '') {
          setItemOutline(nia04n_nodes[i], 'red', 'nia04n', '04-N');
          nia04n_flag = true;
        } else {
          nia04n_label = document.querySelectorAll("[for='" + nia04n_id + "']");
          if (!nia04n_label || nia04n_label.length != 1) {
            setItemOutline(nia04n_nodes[i], 'red', 'nia04n', '04-N');
            nia04j_flag = true;
          } else if (nia04n_label[0].innerText.indexOf('(') < 0) {
            setItemOutline(nia04n_nodes[i], 'red', 'nia04n', '04-N');
            nia04n_flag = true;
          }
        }
      }
    }
  }
  if (nia04n_flag == true) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia04n' class='result-focus label-red'>04-N</a> : Absence du format de saisie dans un datepicker [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-format-de-saisie-des-champs-de-formulaire-qui-le-necessitent-est-indique' target='_blank'>Opquast 70</a>]</li>"
    );
  }
}

/*- -------------------------------------------------------------------------------- */
/* 🗸 NIA-05 Element Obligatoire - Thématique RAWeb 8
Vérification de plusieurs points concernant des obligations dans le DOM
 o Mise en avant des balises et paragraphes vides
 o vérification d’erreurs courantes.
*/

// S. TODO -->  Detect Overflow
// https://stackoverflow.com/questions/143815/determine-if-an-html-elements-content-overflows
// https://webtips.dev/webtips/javascript/find-overflowing-elements-with-javascript
// https://www.stevefenton.co.uk/blog/2022/12/detect-overflowing-elements/

function check_part_05() {
  if (debug_flag) console.log('05 Element Obligatoire');

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
}

// A. Bloc vide
function check_test_05a() {
  const nia05a_nodes = document.querySelectorAll(
    '*:not(.ol-attribution) > :where(p, th, strong, em, a, q, blockquote, aside, ul, li, dl, dd, dt):not([aria-hidden="true"]):not(.mapboxgl-ctrl-logo):empty'
  );
  if (nia05a_nodes && nia05a_nodes.length > 0 && isItemsVisible(nia05a_nodes)) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia05a' class='result-focus label-orange'>05-A</a> : Présence de balise vide [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-9-1' target='_blank'>RAWeb 8.9.1</a>]</li>"
    );
    for (let i = 0; i < nia05a_nodes.length; i++) {
      if (isItemVisible(nia05a_nodes[i])) {
        setItemOutline(nia05a_nodes[i], 'orange', 'nia05a', '05-A');
        nia05a_nodes[i].parentElement.classList.add(
          'checkA11YOutline__orange_parent'
        );
      }
    }
  }
}

// B. Bloc vide avec $nbsp; ou \n
function check_test_05b() {
  const nia05b_nodes = document.querySelectorAll(
    '*:not(.ol-attribution):not([aria-hidden="true"]) > :where(p, th, strong, em, a, q, blockquote, aside, ul, li, dl, dd, dt):not([aria-hidden="true"]):not(.mapboxgl-ctrl-logo):not(:empty)'
  );
  let nia05b_flag = false;
  let nia05b_clean_node = '',
    nia05b_lang = '';
  if (nia05b_nodes && nia05b_nodes.length > 0) {
    for (let i = 0; i < nia05b_nodes.length; i++) {
      if (nia05b_nodes[i].childElementCount == 0) {
        nia05b_lang = nia05b_nodes[i].closest('[lang]').getAttribute('lang');
        nia05b_clean_node = sanitizeText(
          nia05b_nodes[i].innerText,
          nia05b_lang
        );
        if (nia05b_clean_node == '' && isItemVisible(nia05b_nodes[i])) {
          // Correction faux-positif pour les numéros de téléphone
          if (nia05b_nodes[i].tagName != "A" || !nia05b_nodes[i].hasAttributes("href") || nia05b_nodes[i].getAttribute("href").indexOf("tel") != 0) {
            setItemOutline(nia05b_nodes[i], 'orange', 'nia05b', '05-B');
            nia05b_nodes[i].parentElement.classList.add(
              'checkA11YOutline__orange_parent'
            );
            nia05b_flag = true;
          }
        }
      }
    }
  }
  if (nia05b_flag == true) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia05b' class='result-focus label-orange'>05-B</a> : Présence de balises vides (ou avec un contenu assimilable à vide) [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-9-1' target='_blank'>RAWeb 8.9.1</a>]</li>"
    );
  }
}

// C. Doctype
function check_test_05c() {
  if (!only_redactor) {
    const nia05c_doctype = new XMLSerializer().serializeToString(
      document.doctype
    );
    if (nia05c_doctype != '<!DOCTYPE html>') {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia05c' class='result-focus label-orange'>05-C</a> : Vérifier qu'un doctype est correctement déclaré [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-1-1' target='_blank'>RAWeb 8.1.1</a>]</li>"
      );
    }
  }
}

// D. Page title
function check_test_05d() {
  const nia05d_title = document.title;
  if (nia05d_title == '') {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia05d' class='result-focus label-red'>05-D</a> : Vérifier qu'un titre de page est défini [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-5-1' target='_blank'>RAWeb 8.5.1</a>]</li>"
    );
  }
}

// E. Changement de sens de lecture
function check_test_05e() {
  if (!only_redactor) {
    const nia05e1_nodes = document.querySelectorAll(
      '[dir]:not([dir="rtl"]):not([dir="ltr"])'
    );
    if (
      nia05e1_nodes &&
      nia05e1_nodes.length > 0 &&
      isItemsVisible(nia05e1_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia05e1' class='result-focus label-red'>05-E</a> : Vérifier la valeur de définition du sens de lecture [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-10-2' target='_blank'>RAWeb 8.10.2</a>]</li>"
      );
      setItemsOutline(nia05e1_nodes, 'red', 'nia05e1', '05-E');
    }

    const nia05e2_nodes = document.querySelectorAll('[dir="rtl"]');
    const nia05e2_rtl_isocode = [
      'ar',
      'ara',
      'arc',
      'ae',
      'ave',
      'egy',
      'he',
      'heb',
      'nqo',
      'pal',
      'phn',
      'sam',
      'syc',
      'syr',
      'fa',
      'per',
      'fas',
      'ku',
      'kur',
      'dv',
      'ha',
      'khw',
      'ks',
      'pa',
      'ur',
      'yi'
    ];
    let nia05e2_flag = false;
    let nia05e2_lang;
    if (
      nia05e2_nodes &&
      nia05e2_nodes.length > 0 &&
      isItemsVisible(nia05e2_nodes)
    ) {
      for (let i = 0; i < nia05e2_nodes.length; i++) {
        nia05e2_lang = nia05e2_nodes[i].closest('[lang]').getAttribute('lang');
        if (nia05e2_rtl_isocode.indexOf(nia05e2_lang) < 0) {
          setItemOutline(nia05e2_nodes[i], 'red', 'nia05e2', '05-E');
          nia05e2_flag = true;
        }
      }
    }
    if (nia05e2_flag == true) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia05e2' class='result-focus label-red'>05-E</a> : Présence d'élément avec un sens de lecture de droite vers la gauche [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-10-2' target='_blank'>RAWeb 8.10.2</a>]</li>"
      );
    }
  }
}

// F. Id dupliqué
function check_test_05f() {
  if (!only_redactor) {
    const nia05f_nodes = document.querySelectorAll(
      '[id]:not(script):not(link)'
    );
    let nia05f_flag = false;
    let nia05f_ids = {};
    let nia05f_currentId;
    let nia05f_duplicateId = '';
    if (nia05f_nodes && nia05f_nodes.length > 0) {
      for (let i = 0; i < nia05f_nodes.length; i++) {
        nia05f_currentId = nia05f_nodes[i].id
          ? nia05f_nodes[i].id
          : 'undefined';
        if (isNaN(nia05f_ids[nia05f_currentId])) {
          nia05f_ids[nia05f_currentId] = 0;
        } else {
          nia05f_flag = true;
          setItemOutline(nia05f_nodes[i], 'orange', 'nia05f', '05-F');
          nia05f_duplicateId += '"' + nia05f_currentId + '",';
        }
        nia05f_ids[nia05f_currentId]++;
      }
    }
    if (nia05f_flag == true) {
      //console.log(nia05f_ids);
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia05f' class='result-focus label-orange'>05-F</a> : Présence d'Id dupliqué<span class='cy-hidden'> (" +
          nia05f_duplicateId +
          ")</span> [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-2-1' target='_blank'>RAWeb 8.2.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-identifiant-html-nest-utilise-quune-seule-fois-par-page' target='_blank'>Opquast 229</a>]</li>"
      );
    }
  }
}

// G. Présence de la Govbar
function check_test_05g() {
  if (isCTIE && !only_error) {
    const nia05g_govbar = document.querySelector('#govbar.govbar');
    if (nia05g_govbar == null || !isItemVisible(nia05g_govbar)) {
      setItemToResultList(
        'nth',
        "<li><span class='result-focus label-gray'>05-G</span> : Absence de la govbar, vérifier si ce n'est pas un oubli</li>"
      );
    }
  }
}

// H. Detect double <br>
function check_test_05h() {
  const nia05h_nodes = document.querySelectorAll('br + br');
  let nia05h_container = '';
  let nia05h_flag = false;
  let nia05h_prev_n1, nia05h_prev_n2;
  if (nia05h_nodes && nia05h_nodes.length > 0 && isItemsVisible(nia05h_nodes)) {
    for (let i = 0; i < nia05h_nodes.length; i++) {
      if (isItemVisible(nia05h_nodes[i])) {
        nia05h_prev_n1 = nia05h_nodes[i].previousSibling;
        nia05h_prev_n2 = nia05h_prev_n1.previousSibling;
        /*
				console.log(nia05h_nodes[i]);
				console.log(nia05h_prev_n1);
				console.log(nia05h_prev_n2);
				*/
        if (nia05h_prev_n1.nodeName == 'BR') {
          setItemOutline(nia05h_nodes[i], 'red', 'nia05h', '05-H');
          nia05h_container = nia05h_nodes[i].parentElement;
          nia05h_container.classList.add('checkA11YOutline__red_parent');
          nia05h_flag = true;
        } else if (
          nia05h_prev_n2.nodeName == 'BR' &&
          (nia05h_prev_n1.nodeName == '#text' ||
            nia05h_prev_n1.nodeName == '#comment') &&
          (nia05h_prev_n1.textContent == ' ' ||
            nia05h_prev_n1.textContent == '')
        ) {
          setItemOutline(nia05h_nodes[i], 'red', 'nia05h', '05-H');
          nia05h_container = nia05h_nodes[i].parentElement;
          nia05h_container.classList.add('checkA11YOutline__red_parent');
          nia05h_flag = true;
        }
      }
    }
  }
  if (nia05h_flag == true) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia05h' class='result-focus label-red'>05-H</a> : Présence de multiple saut de ligne [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-9-1' target='_blank'>RAWeb 8.9.1</a>], privilégier l'utilisation du composant separator</li>"
    );
  }
}

// I. Le code source de chaque page contient une métadonnée qui en décrit le contenu. ==> Présence de meta name=description
function check_test_05i() {
  if (!only_error && !isSearchLogic && !isSitemap) {
    const nia05i_node = document.querySelector('meta[name="description"]');
    if (
      nia05i_node == null ||
      nia05i_node.content == null ||
      nia05i_node.content == ''
    ) {
      setItemToResultList(
        'nth',
        "<li><span class='result-focus label-yellow'>05-I</span> : Absence de métadonnée qui en décrit le contenu [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-code-source-de-chaque-page-contient-une-metadonnee-qui-en-decrit-le-contenu' target='_blank'>Opquast 3</a>]</li>"
      );
    }
  }
}

// J. Le code source des pages contient un appel valide à une icône de favori.
function check_test_05j() {
  if (!only_error) {
    const nia05j_node = document.querySelector("link[rel*='icon']");
    if (
      nia05j_node == null ||
      nia05j_node.getAttribute('href') == null ||
      nia05j_node.getAttribute('href') == ''
    ) {
      setItemToResultList(
        'nth',
        "<li><span class='result-focus label-yellow'>05-J</span> : Absence de Favicon [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-code-source-des-pages-contient-un-appel-valide-a-un-icone-de-favori' target='_blank'>Opquast 99</a>]</li>"
      );
    }
  }
}

// K. Chaque page affiche une information permettant de connaître son emplacement dans l'arborescence du site.
function check_test_05k() {
  if (!isHomepage && !only_redactor && isAEM && !only_error) {
    const nia05k_node = document.querySelector(
      '.cmp-breadcrumb,.cmp-breadcrumb-demarches'
    );
    if (!nia05k_node) {
      setItemToResultList(
        'nth',
        "<li><span class='result-focus label-yellow'>05-K</span> : Absence de Fils d'Ariane [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-page-affiche-une-information-permettant-de-connaitre-son-emplacement-dans-larborescence-du-site' target='_blank'>Opquast 151</a>]</li>"
      );
    }
  }
}

// L. Le focus clavier n'est ni supprimé ni masqué sur le summary
function check_test_05l() {
  if (!only_redactor) {
    const nia05l_node = document.querySelector('summary');
    if (nia05l_node) {
      nia05l_node.addEventListener('focus', (e) => {
        //console.log(window.getComputedStyle(e.target, null).outline);
        if (window.getComputedStyle(e.target, null).outline == 0) {
          setItemOutline(nia05l_node, 'red', 'nia05l', '05-L');
          setItemToResultList(
            'dev',
            "<li><a href='#' data-destination='nia05l' class='result-focus label-red'>05-L</a> : Le focus clavier est supprimer d'un élément accordéon [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-focus-clavier-nest-ni-supprime-ni-masque' target='_blank'>Opquast 160</a>]</li>"
          );
        }
      });
      nia05l_node.focus();
    }
  }
}

// M. Les styles ne justifient pas le texte.
function check_test_05m() {
  if (!only_error) {
    const nia05m_node = document.querySelector('p');
    if (nia05m_node && nia05m_node.style.textAlign == 'justify') {
      setItemOutline(nia05m_node, 'yellow', 'nia05m', '05-M');
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia05m' class='result-focus label-yellow'>05-M</a> : Présence de texte justifié [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-styles-ne-justifient-pas-le-texte' target='_blank'>Opquast 186</a>]</li>"
      );
    }
  }
}

// N. Les mises en majuscules à des fins décoratives sont effectuées à l'aide des styles.
function check_test_05n() {
  if (!only_error) {
    function isUpperCase(textInput) {
      return textInput === String(textInput).toUpperCase();
    }
    const nia05n_h1 = document.querySelector('h1');
    const nia05n_h2 = document.querySelector('h2');
    const nia05n_h3 = document.querySelector('h3');
    const nia05n_h4 = document.querySelector('h4');
    const nia05n_h5 = document.querySelector('h5');
    const nia05n_h6 = document.querySelector('h6');
    if (nia05n_h1 && isUpperCase(nia05n_h1)) {
      setItemOutline(nia05n_h1, 'yellow', 'nia05n1', '05-N');
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia05n1' class='result-focus label-yellow'>05-N</a> : Présence de titre H1 en majuscule [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-mises-en-majuscules-a-des-fins-decoratives-sont-effectuees-a-laide-des-styles' target='_blank'>Opquast 187</a>]</li>"
      );
    }
    if (nia05n_h2 && isUpperCase(nia05n_h2)) {
      setItemOutline(nia05n_h2, 'yellow', 'nia05n2', '05-N');
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia05n2' class='result-focus label-yellow'>05-N</a> : Présence de titre H2 en majuscule [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-mises-en-majuscules-a-des-fins-decoratives-sont-effectuees-a-laide-des-styles' target='_blank'>Opquast 187</a>]</li>"
      );
    }
    if (nia05n_h1 && isUpperCase(nia05n_h3)) {
      setItemOutline(nia05n_h3, 'yellow', 'nia05n3', '05-N');
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia05n3' class='result-focus label-yellow'>05-N</a> : Présence de titre H3 en majuscule [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-mises-en-majuscules-a-des-fins-decoratives-sont-effectuees-a-laide-des-styles' target='_blank'>Opquast 187</a>]</li>"
      );
    }
    if (nia05n_h1 && isUpperCase(nia05n_h4)) {
      setItemOutline(nia05n_h4, 'yellow', 'nia05n4', '05-N');
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia05n4' class='result-focus label-yellow'>05-N</a> : Présence de titre H4 en majuscule [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-mises-en-majuscules-a-des-fins-decoratives-sont-effectuees-a-laide-des-styles' target='_blank'>Opquast 187</a>]</li>"
      );
    }
    if (nia05n_h1 && isUpperCase(nia05n_h5)) {
      setItemOutline(nia05n_h5, 'yellow', 'nia05n5', '05-N');
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia05n5' class='result-focus label-yellow'>05-N</a> : Présence de titre H5 en majuscule [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-mises-en-majuscules-a-des-fins-decoratives-sont-effectuees-a-laide-des-styles' target='_blank'>Opquast 187</a>]</li>"
      );
    }
    if (nia05n_h1 && isUpperCase(nia05n_h6)) {
      setItemOutline(nia05n_h6, 'yellow', 'nia05n6', '05-N');
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia05n6' class='result-focus label-yellow'>05-N</a> : Présence de titre H6 en majuscule [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-mises-en-majuscules-a-des-fins-decoratives-sont-effectuees-a-laide-des-styles' target='_blank'>Opquast 187</a>]</li>"
      );
    }
  }
}

// O. La page des résultats de recherche indique le nombre de résultats
function check_test_05o() {
  if (!only_redactor && isSearchLogic && isAEM) {
    const nia05o_isSearch = document.getElementById('mainSearch');
    if (nia05o_isSearch) {
      const nia05o_searchCount = document.querySelector('.search-meta-count');
      if (!nia05o_searchCount || !isItemVisible(nia05o_searchCount)) {
        setItemToResultList(
          'nc',
          "<li><a href='#' data-destination='nia05o' class='result-focus label-red'>05-O</a> : La page des résultats de recherche indique le nombre de résultats [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/la-page-des-resultats-de-recherche-indique-le-nombre-de-resultats-le-nombre-de-pages-de-resultats-et-le-nombre-de-resultats-par-page' target='_blank'>Opquast 13</a>]</li>"
        );
        setItemsOutline(nia05o_isSearch, 'red', 'nia05o', '05-O');
      }
    }
  }
}

// P. Section vide dans la page
function check_test_05p() {
  if (!only_error) {
    let nia05p_nodes = document.querySelectorAll('section.cmp-section');
    if (only_redactor)
      nia05p_nodes = document.querySelectorAll('main section.cmp-section');
    let nia05p_flag = false;
    let nia05p_clean_node = '',
      nia05p_lang = '',
      nia05p_img;
    if (nia05p_nodes && nia05p_nodes.length > 0) {
      for (let i = 0; i < nia05p_nodes.length; i++) {
        nia05p_lang = nia05p_nodes[i].closest('[lang]').getAttribute('lang');
        nia05p_clean_node = sanitizeText(
          nia05p_nodes[i].innerText,
          nia05p_lang
        );
        nia05p_img = nia05p_nodes[i].querySelectorAll('img,iframe');

        if (
          nia05p_clean_node == '' &&
          isItemVisible(nia05p_nodes[i]) &&
          nia05p_img.length == 0
        ) {
          setItemOutline(nia05p_nodes[i], 'yellow', 'nia05p', '05-P');
          nia05p_flag = true;
        }
      }
    }
    if (nia05p_flag == true) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia05p' class='result-focus label-yellow'>05-P</a> : Présence de section vides (ou avec un contenu assimilable à vide) [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-9-1' target='_blank'>RAWeb 8.9.1</a>]</li>"
      );
    }
  }
}

// Q Logo
function check_test_05q() {
  /*
	Le lien sur le logo redirige vers la page d’accueil et possède un attribut title respectant la nomenclature suivante : « [XXX] – Accueil »
	Si du texte est présent sur le logo, possibilité de saisir un texte alt
	Pas d'indication du mot "logo" dans le texte alt du logo
	*/
  if (!only_error) {
    const nia05q_nodes = document.querySelectorAll(
      'html[lang="fr"] header .logo a'
    );
    let nia05q_flag1 = false;
    let nia05q_flag2 = false;
    let nia05q_flag3 = false;
    let nia05q_img, nia05q_tagline;
    if (nia05q_nodes && nia05q_nodes.length > 0) {
      for (let i = 0; i < nia05q_nodes.length; i++) {
        if (
          !nia05q_nodes[i].hasAttribute('href') ||
          (!nia05q_nodes[i].getAttribute('href').includes('fr.html') &&
            !homepageException.includes(nia05q_nodes[i].getAttribute('href')))
        ) {
          setItemOutline(nia05q_nodes[i], 'yellow', 'nia05q1', '05-Q');
          nia05q_flag1 = true;
        } else if (
          nia05q_nodes[i].hasAttribute('title') &&
          !nia05q_nodes[i].getAttribute('title').includes('- Accueil')
        ) {
          setItemOutline(nia05q_nodes[i], 'yellow', 'nia05q1', '05-Q');
          nia05q_flag2 = true;
        }
        if (
          nia05q_nodes[i].hasAttribute('title') &&
          nia05q_nodes[i].getAttribute('title').includes('logo')
        ) {
          setItemOutline(nia05q_nodes[i], 'yellow', 'nia05q2', '05-Q');
          nia05q_flag2 = true;
        }
        nia05q_img = nia05q_nodes[i].querySelector('img');
        nia05q_tagline =
          nia05q_nodes[i].parentElement.querySelector('.logo-tagline');

        if (
          nia05q_img.hasAttribute('alt') &&
          nia05q_img.getAttribute('alt') == '' &&
          (!nia05q_tagline || nia05q_tagline.innerText == '')
        ) {
          setItemOutline(nia05q_nodes[i], 'yellow', 'nia05q3', '05-Q');
          nia05q_flag3 = true;
        }
      }
    }
    if (nia05q_flag1 == true) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia05q1' class='result-focus label-yellow'>05-Q</a> : Le lien sur le logo redirige vers la page d’accueil et possède un attribut title respectant la nomenclature suivante : « XXX – Accueil »</li>"
      );
    }
    if (nia05q_flag2 == true) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia05q2' class='result-focus label-yellow'>05-Q</a> : Pas d'indication du mot 'logo' dans le texte alt du logo</li>"
      );
    }
    if (nia05q_flag3 == true) {
      setItemToResultList(
        'man',
        "<li><a href='#' data-destination='nia05q3' class='result-focus label-yellow'>05-Q</a> : Si du texte est présent sur le logo, veuillez saisir un texte alt</li>"
      );
    }
  }
}

// R. Structure du titre de la page
function check_test_05r() {
  // - Présence d’un <title> pertinent (par rapport à la Nomenclature : contient à minimum [h1] [Nom du site] [Luxembourg])
  if (isCTIE && !only_error) {
    let nia05r_title = document.getElementsByTagName('title')[0].innerText;
    if (!nia05r_title.includes('Luxembourg')) {
      setItemToResultList(
        'man',
        "<li><span class='result-focus label-yellow'>05-R</span> : Vérifier que le titre de l'onglet respecte la nomenclature du CTIE</li>"
      );
    }
  }
}

/*- -------------------------------------------------------------------------------- */
/* 🗸 NIA-06 Structure de l'information - Thématique RAWeb 9 
Vérification de plusieurs points concernant la structure des composants
o Landmark
o List
o nav
o etc.
 */

function check_part_06() {
  if (debug_flag) console.log('06 Structure');

  check_test_06a();
  check_test_06b();
  check_test_06c();
  check_test_06d();
  check_test_06e();
  check_test_06f();
  check_test_06g();
  check_test_06h();
  check_test_06i();
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

// A. Vérifier qu'il n'y a pas de role sur les container de listes
function check_test_06a() {
  if (!only_redactor && !only_error) {
    const nia06a_nodes = document.querySelectorAll(
      'ul[role]:not([role="list"]):not([role="listbox"]),ol[role]:not([role="list"]):not([role="tablist"]),li[role]:not([role="listitem"]):not([role="option"]),dl[role]:not([role="listitem"])'
    );
    let nia06a_flag = false;
    if (nia06a_nodes && nia06a_nodes.length > 0) {
      for (let i = 0; i < nia06a_nodes.length; i++) {
        if (isItemVisible(nia06a_nodes[i])) {
          // Exception sur la structure des onglet <li role="tab"> https://stackoverflow.com/questions/75955536/what-will-the-role-of-anchor-tag-in-tabs-with-ul-li-structure
          if (
            !(
              nia06a_nodes[i].tagName == 'LI' &&
              nia06a_nodes[i].getAttribute('role') == 'tab' &&
              nia06a_nodes[i].parentElement.getAttribute('role') == 'tablist' &&
              (nia06a_nodes[i].parentElement.tagName == 'UL' ||
                nia06a_nodes[i].parentElement.tagName == 'OL') &&
              ((nia06a_nodes[i].getAttribute('tabindex') == '0' &&
                nia06a_nodes[i].getAttribute('aria-selected') == 'true') ||
                (nia06a_nodes[i].getAttribute('tabindex') == '-1' &&
                  nia06a_nodes[i].getAttribute('aria-selected') != 'true'))
            )
          ) {
            setItemOutline(nia06a_nodes[i], 'red', 'nia06a', '06-A');
            nia06a_flag = true;
          }
        }
      }
    }
    if (nia06a_flag == true) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06a' class='result-focus label-red'>06-A</a> : Vérifier qu'il n'y a pas de role sur les container de liste [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-3-1' target='_blank'>RAWeb 9.3.1</a>]</li>"
      );
    }
  }
}

// B. Vérifier que le liste <ul> et <ol> ne contienne que des <li> ou [role="listitem"]
function check_test_06b() {
  const nia06b_nodes = document.querySelectorAll(
    ':where(ul,ol,[role="list"]) > *:not(li):not([role="listitem"]):not(.checkA11YSpan)'
  );
  if (nia06b_nodes && nia06b_nodes.length > 0) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia06b' class='result-focus label-red'>06-B</a> : Présence d'un élement non autorisé dans une liste [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-3-1' target='_blank'>RAWeb 9.3.1</a>]</li>"
    );
    setItemsOutline(nia06b_nodes, 'red', 'nia06b', '06-B');
  }
}

// C. Vérifier que la zone d’en-tête est structurée au moyen d’un élément <header> ;
function check_test_06c() {
  // <header class="page-header" role="banner">
  if (!only_redactor && !only_error) {
    const nia06c_nodes = document.querySelector('header:not([role="banner"])');
    if (nia06c_nodes != null && nia06c_nodes.length > 0) {
      setItemToResultList(
        'dev',
        "<li><span class='result-focus label-yellow'>06-C</span> : Il y a un problème avec la structuration du header, il lui manque le role=banner [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]</li>"
      );
    }
  }
  if (!only_redactor) {
    const nia06c2_nodes = document.querySelector('header[role="banner"]');
    let nia06c2_counter = 0;
    if (nia06c2_nodes == null || nia06c2_nodes.length == 0) {
      setItemToResultList(
        'dev',
        "<li><span class='result-focus label-red'>06-C</span> : Il n'y a aucun element header visible [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]</li>"
      );
    } else if (nia06c2_nodes.length > 1) {
      // il peut y en avoir plusieurs mais 1 seul doit être visible
      for (let i = 0; i < nia06c2_nodes.length; i++) {
        if (isItemVisible(nia06c2_nodes[i])) {
          nia06c2_counter++;
        }
        if (nia06c2_counter > 1) {
          setItemToResultList(
            'dev',
            "<li><span class='result-focus label-red'>06-C</span> : Il y a un plusieur elements header visible [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]</li>"
          );
          setItemsOutline(nia06c2_nodes, 'red', 'nia06c2', '06-C');
          break;
        }
      }
    }

    const nia06c3_nodes = document.querySelector('main header[role="banner"]');
    if (nia06c3_nodes != null && nia06c3_nodes.length > 0) {
      setItemToResultList(
        'dev',
        "<li><span class='result-focus label-red'>06-C</span> : Il y a un problème avec la structuration du header, celui-ci ne dois pas être enfant de la balise main [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]</li>"
      );
      setItemsOutline(nia06c3_nodes, 'red', 'nia06c3', '06-C');
    }
  }
}

// D. Vérifier que les zones de navigation principales et secondaires sont structurées au moyen d’un élément <nav> ;
function check_test_06d() {
  // <nav class="page-headernav" role="navigation" aria-label="Menu principal" id="headernav">
  if (!only_redactor && !only_error) {
    const nia06d_nodes = document.querySelectorAll(
      'nav.page-headernav[role="navigation"]'
    );
    if (nia06d_nodes == null) {
      setItemToResultList(
        'dev',
        "<li><span class='result-focus label-yellow'>06-D</span> : Il y a un problème avec la structuration de la navigation [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]</li>"
      );
    }
  }
}

// E. Vérifier que l’élément <nav> n’est pas utilisé en dehors de la structuration des zones de navigation principales et secondaires ;
function check_test_06e() {
  if (!only_redactor) {
    const nia06e1_nodes = document.querySelectorAll(
      'nav:not([role="navigation"])'
    );
    if (
      nia06e1_nodes &&
      nia06e1_nodes.length > 0 &&
      isItemsVisible(nia06e1_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia06e1' class='result-focus label-red'>06-E</a> : Présence d'une zone de navigation sans attribut role</li>"
      );
      setItemsOutline(nia06e1_nodes, 'red', 'nia06e1', '06-E');
    }
  }

  // Les principales barres de navigation (critère 12.2) sont :
  // - Un menu de navigation ;
  // - Un fil d’ariane ;
  // - Une liste de navigation d’une liste de résultats ;
  // - Des liens d’évitement.

  // Il existe différents types de menu de navigation (critère 12.1 et critère 12.2) :
  // - Menu de navigation principal ;
  // - Menu de sous-rubrique ;
  // - Menu contextuel ;
  // - Table des matières concernant un ensemble de pages.

  if (!only_redactor && isAEM) {
    const nia06e2_nodes = document.querySelectorAll(
      '*:not(.page-langs):not(.right-part):not(.cmp-directory):not(.top-container):not(.skiplinks):not(.navigation-wrapper) > nav:not(.page-headernav):not(.page-headernavmobile):not(.page-headernav-desk):not(.automaticnav):not(.cmp-breadcrumb):not(.page-localnav):not(.cmp-backtonav):not(.cmp-breadcrumb-demarches):not(.topnav):not(.page-bloub):not(#headernav):not(#headernav-desktop):not(.headernav-detached):not(.headernav):not(.headernav-fixed)'
    );
    if (
      nia06e2_nodes &&
      nia06e2_nodes.length > 0 &&
      isItemsVisible(nia06e2_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia06e2' class='result-focus label-red'>06-E</a> : Présence d'une balise nav utilisé en dehors d'une zone de navigation [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]</li>"
      );
      setItemsOutline(nia06e2_nodes, 'red', 'nia06e2', '06-E');
    }
  }
}

// F. Vérifier que la zone de contenu principal est structurée au moyen d’un élément <main> ;
function check_test_06f() {
  // Si le document possède plusieurs éléments <main>, vérifier qu’un seul de ces éléments est visible (les autres occurrences de l’élément sont pourvues d’un attribut hidden) ;
  // <main id="main" class="page-main " role="main">
  if (!only_redactor) {
    const nia06f1_nodes = document.querySelectorAll('main:not([role="main"])');
    if (
      nia06f1_nodes &&
      nia06f1_nodes.length > 0 &&
      isItemsVisible(nia06f1_nodes)
    ) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia06f1' class='result-focus label-orange'>06-F</a> : Présence d'une zone de contenu principal sans attribut role</li>"
      );
      setItemsOutline(nia06f1_nodes, 'orange', 'nia06f1', '06-F');
    }

    const nia06f2_nodes = document.querySelectorAll('main');
    let nia06f2_counter = 0;
    if (nia06f2_nodes && nia06f2_nodes.length > 1) {
      for (let i = 0; i < nia06f2_nodes.length; i++) {
        if (isItemVisible(nia06f2_nodes[i])) {
          nia06f2_counter++;
        }
        if (nia06f2_counter > 1) {
          setItemToResultList(
            'nc',
            "<li><a href='#' data-destination='nia06f2' class='result-focus label-red'>06-F</a> : Présence de plusieurs zone de contenu principal [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]</li>"
          );
          setItemsOutline(nia06f2_nodes, 'red', 'nia06f2', '06-F');
          break;
        }
      }
    }
  }
}

// G. Vérifier que la zone de pied de page est structurée au moyen d’un élément <footer>.
function check_test_06g() {
  if (!only_redactor && isAEM) {
    const nia06g1_nodes = document.querySelectorAll(
      'footer.page-footer:not([role="contentinfo"])'
    );
    if (
      nia06g1_nodes &&
      nia06g1_nodes.length > 0 &&
      isItemsVisible(nia06g1_nodes)
    ) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia06g1' class='result-focus label-red'>06-G</a> : Présence d'une zone de pied de page sans attribut role</li>"
      );
      setItemsOutline(nia06g1_nodes, 'red', 'nia06g1', '06-G');
    }
  }
  if (!only_redactor && !only_error && isAEM) {
    const nia06g2_nodes = document.querySelector(
      'footer.page-footer[role="contentinfo"]'
    );
    if (nia06g2_nodes == null) {
      setItemToResultList(
        'dev',
        "<li><span class='result-focus label-yellow'>06-G</span> : Il y a un problème avec la structuration du footer [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]</li>"
      );
    }
  }

  if (!only_redactor && !only_error && isAEM) {
    const nia06g3_nodes = document.querySelectorAll(
      'footer h3, footer [role="heading"][aria-level="3"]'
    );
    if (nia06g3_nodes && nia06g3_nodes.length > 1) {
      for (let i = 0; i < nia06g3_nodes.length; i++) {
        if (
          nia06g3_nodes[i]
            .closest('footer')
            .querySelector('h2,[role="heading"][aria-level="2"]') == null
        ) {
          setItemToResultList(
            'dev',
            "<li><a href='#' data-destination='nia06g3' class='result-focus label-yellow'>06-G</a> : Absence d'un titre principal pour le footer</li>"
          );
          setItemOutline(nia06g3_nodes[i], 'yellow', 'nia06g3', '06-G');
        }
      }
    }
  }

  if (!only_redactor && isAEM) {
    const nia06g4_nodes = document.querySelector(
      'footer a[href$="accessibilite.html"], footer a[href$="barrierefreiheit.html"], footer a[href$="accessibility.html"]'
    );
    if (nia06g4_nodes == null) {
      setItemToResultList(
        'nc',
        "<li><span data-destination='nia06g4' class='result-focus label-red'>06-G</span> : Absence de la déclaration d'accessibilité dans le footer </li>"
      );
    } else if (nia06g4_nodes.closest('ul') == null) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia06g5' class='result-focus label-red'>06-G</a> : Les liens du footer doivent être structurés sous forme de liste </li>"
      );
      setItemOutline(nia06g4_nodes, 'red', 'nia06g5', '06-G');
    }
  }
}

// H. Cadres iframe
function check_test_06h() {
  // H1 Présence de titre
  const nia06h1_nodes = document.querySelectorAll(
    'frame:not([title]),iframe:not([title])'
  );
  if (
    nia06h1_nodes &&
    nia06h1_nodes.length > 0 &&
    isItemsVisible(nia06h1_nodes)
  ) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia06h1' class='result-focus label-red'>06-H</a> : Chaque cadre doit avoir un titre  [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-2-1-1' target='_blank'>RAWeb 2.1.1</a>]</li>"
    );
    setItemsOutline(nia06h1_nodes, 'red', 'nia06h1', '06-H');
  }

  if (!only_redactor) {
    // H2 iframe Has Noresize
    const nia06h2_nodes = document.querySelectorAll('iframe[noresize]');
    if (
      nia06h2_nodes &&
      nia06h2_nodes.length > 0 &&
      isItemsVisible(nia06h2_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia06h2' class='result-focus label-red'>06-H</a> : Présence de cadre avec attribut noresize</li>"
      );
      setItemsOutline(nia06h2_nodes, 'red', 'nia06h2', '06-H');
    }

    // H3 iframe Has No Scroll
    const nia06h3_nodes = document.querySelectorAll('iframe[scrolling=no]');
    if (
      nia06h3_nodes &&
      nia06h3_nodes.length > 0 &&
      isItemsVisible(nia06h3_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06h3' class='result-focus label-orange'>06-H</a> : Présence de cadre avec attribut obsolète scrolling=no</li>"
      );
      setItemsOutline(nia06h3_nodes, 'orange', 'nia06h3', '06-H');
    }

    // H4 iframe vide
    const nia06h4_nodes = document.querySelectorAll(
      'iframe:not([src]),iframe[src=""]'
    );
    if (
      nia06h4_nodes &&
      nia06h4_nodes.length > 0 &&
      isItemsVisible(nia06h4_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia06h4' class='result-focus label-red'>06-H</a> : Présence de cadre vide</li>"
      );
      setItemsOutline(nia06h4_nodes, 'red', 'nia06h4', '06-H');
    }

    // H5 iframe Width Height
    const nia06h5_nodes = document.querySelectorAll(
      'iframe[width], iframe[height]'
    );
    if (
      nia06h5_nodes &&
      nia06h5_nodes.length > 0 &&
      isItemsVisible(nia06h5_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia06h5' class='result-focus label-red'>06-H</a> : Présence de cadre avec attributde présentation (height, width)</li>"
      );
      setItemsOutline(nia06h5_nodes, 'red', 'nia06h5', '06-H');
    }
  }
}

// I. Presence de triple espace (double concidéré comme erreur d'inattention)
function check_test_06i() {
  // A. Max duration = 5s si autoplay / Pas de loop
  const nia06i_nodes = document.querySelectorAll('lottie-player');
  let nia06i_autoplay,
    nia06i_totalFrames,
    nia06i_frameRate,
    nia06i_loop,
    nia06i_counter,
    nia06i_controls,
    nia06i_duration;
  if (nia06i_nodes && nia06i_nodes.length > 0) {
    if (nia06i_nodes && nia06i_nodes.length > 0) {
      for (let i = 0; i < nia06i_nodes.length; i++) {
        nia06i_autoplay = nia06i_nodes[i].getAttribute('autoplay');
        if (nia06i_autoplay == 'true') {
          if (
            !nia06i_nodes[i].renderOptions ||
            nia06i_nodes[i].renderOptions == undefined
          ) {
            setItemToResultList(
              'man',
              "<li><a href='#' data-destination='nia06i0' class='result-focus label-yellow'>06-I</a> : Les animations lues automatiquement et qui boucles ou qui dure plus de 5s doivent avoir un controleur play/pause [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-13-8-1' target='_blank'>RAWeb 13.8.1</a>]</li>"
            );
            setItemOutline(nia06i_nodes[i], 'yellow', 'nia06i0', '06-I');
          } else {
            nia06i_totalFrames =
              nia06i_nodes[i].renderOptions.host._lottie.totalFrames;
            nia06i_frameRate =
              nia06i_nodes[i].renderOptions.host._lottie.frameRate;
            nia06i_loop = nia06i_nodes[i].renderOptions.host.__loop;
            nia06i_counter = nia06i_nodes[i].renderOptions.host._counter;
            nia06i_controls = nia06i_nodes[i].renderOptions.host.__controls;
            if (debug_flag)
              console.log(
                'autoplay : ' +
                  nia06i_autoplay +
                  ' | controls : ' +
                  nia06i_controls
              );
            if (nia06i_controls == false) {
              if (nia06i_loop == true) {
                setItemToResultList(
                  'nc',
                  "<li><a href='#' data-destination='nia06i1' class='result-focus label-red'>06-I</a> : Les animations lues automatiquement et qui boucles doivent avoir un controleur play/pause (loop) [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-13-8-1' target='_blank'>RAWeb 13.8.1</a>]</li>"
                );
                setItemOutline(nia06i_nodes[i], 'red', 'nia06i1', '06-I');
              } else {
                nia06i_duration =
                  (nia06i_totalFrames / nia06i_frameRate) * nia06i_counter; // 150 / 30 * 1 = 5
                if (debug_flag)
                  console.log('duration : ' + nia06i_duration + ' s');
                if (nia06i_duration > 5) {
                  setItemToResultList(
                    'nc',
                    "<li><a href='#' data-destination='nia06i2' class='result-focus label-red'>06-I</a> : Les animations lues automatiquement et qui durent plus de 5s doivent avoir un controleur play/pause (duration) [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-13-8-1' target='_blank'>RAWeb 13.8.1</a>]</li>"
                  );
                  setItemOutline(nia06i_nodes[i], 'red', 'nia06i2', '06-I');
                }
              }
            }
          }
        }
      }
    }
  }
}

// J. Vérifier que le liste <ul> et <ol> contiennent plusieurs éléments
function check_test_06j() {
  const nia06j_nodes = document.querySelectorAll(
    '*:not(.geoportail-addresses):not(.subnav-item) > ul:not(.cmp-focus-list):not(.article-metas),ol,[role="list"]'
  );
  let nia06j_flag = false;
  let nia06j_result;
  if (nia06j_nodes && nia06j_nodes.length > 0) {
    for (let i = 0; i < nia06j_nodes.length; i++) {
      if (isItemVisible(nia06j_nodes[i])) {
        nia06j_result = nia06j_nodes[i].querySelectorAll(
          'li,[role="listitem"]'
        );
        if (nia06j_result && nia06j_result.length < 2) {
          if (debug_flag) console.log(nia06j_result);
          setItemOutline(nia06j_nodes[i], 'orange', 'nia06j', '06-J');
          nia06j_flag = true;
        }
      }
    }
  }
  if (nia06j_flag == true) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia06j' class='result-focus label-orange'>06-J</a> : Présence d'une liste à un seul élément [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-3-1' target='_blank'>RAWeb 9.3.1</a>]</li>"
    );
  }

  if (!only_error) {
    const nia06j2_nodes = document.querySelectorAll('p');
    let nia06j2_flag = false;
    let nia06j2_result;
    if (nia06j2_nodes && nia06j2_nodes.length > 0) {
      for (let i = 0; i < nia06j2_nodes.length; i++) {
        if (isItemVisible(nia06j2_nodes[i])) {
          nia06j2_result = nia06j2_nodes[i].innerText.trim().match(/^(- )/g);
          if (nia06j2_result && nia06j2_result.length > 0) {
            setItemOutline(nia06j2_nodes[i], 'yellow', 'nia06j2', '06-J');
            nia06j2_flag = true;
          }
        }
      }
    }
    if (nia06j2_flag == true) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia06j2' class='result-focus label-yellow'>06-J</a> : Présence d'une liste simulée avec des tirets</li>"
      );
    }
  }
}

// K Abréviations : mise en évidence
function check_test_06k() {
  if (!only_error && !only_redactor) {
    const nia06k_nodes = document.querySelectorAll('abbr:not([title])');
    if (
      nia06k_nodes &&
      nia06k_nodes.length > 0 &&
      isItemsVisible(nia06k_nodes)
    ) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia06k' class='result-focus label-yellow'>06-K</a> : Présence d'abréviation non explicitée</li>"
      );
      setItemsOutline(nia06k_nodes, 'yellow', 'nia06k', '06-K');
    }
  }
}

// L Accordéon
function check_test_06l() {
  if (isAEM && !only_redactor) {
    const nia06l1_nodes = document.querySelectorAll(
      '.cmp-accordion > *:not(details):not(span.checkA11YSpan):not(span.cmp-accordionItem__icon), .cmp-accordion > details > *:not(summary):not(span.checkA11YSpan):not(.cmp-accordion__panel):not(.accordion-local-toggle), .filters-content > *:not(details), .filters-content > details > *:not(summary):not(.filter-content)'
    );
    if (
      nia06l1_nodes &&
      nia06l1_nodes.length > 0 &&
      isItemsVisible(nia06l1_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06l1' class='result-focus label-orange'>06-L</a> : Présence d'accordéon sans structure details/summary</li>"
      );
      setItemsOutline(nia06l1_nodes, 'orange', 'nia06l1', '06-L');
    }

    const nia06l2_nodes = document.querySelectorAll(
      'details > summary:not(.cmp-hours__summary) > *:not(h1):not(h2):not(h3):not(h4):not(h5):not(h6):not([role="heading"]):not(svg[aria-hidden="true"]):not(span.checkA11YSpan):not(span.cmp-accordionItem__icon):not(.filter-subtitle)'
    );
    if (
      nia06l2_nodes &&
      nia06l2_nodes.length > 0 &&
      isItemsVisible(nia06l2_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06l2' class='result-focus label-orange'>06-L</a> : Présence d'accordéon avec qqch d'autre qu'une balise Hx dans la balise summary [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8.2.1' target='_blank'>RAWeb 8.2.1</a>]</li>"
      );
      setItemsOutline(nia06l2_nodes, 'orange', 'nia06l2', '06-L');
    }
  }
}

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
            nia06m_Contact = nia06m_Adress[0].querySelectorAll('dl:not(.cmp-hours__list)');
            nia06m_StreetAdress = nia06m_Adress[0].querySelectorAll(
              'span[itemprop="streetAddress"]'
            );

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
        "<li><a href='#' data-destination='nia06m2' class='result-focus label-red'>06-M</a> : Présence d'une carte Geoportail sans adresse visible</li>"
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

// N Composant Sommaire : Bloub
function check_test_06n() {
  if (isAEM && !only_redactor) {
    const nia06n_node = document.querySelector('.page-bloub');
    if (nia06n_node) {
      if (
        nia06n_node.tagName != 'NAV' ||
        !nia06n_node.hasAttribute('role') ||
        nia06n_node.getAttribute('role') != 'navigation' ||
        !nia06n_node.hasAttribute('aria-label')
      ) {
        setItemOutline(nia06n_node, 'orange', 'nia06n1', '06-N');
        setItemToResultList(
          'dev',
          "<li><a href='#' data-destination='nia06n1' class='result-focus label-orange'>06-N</a> : Le sommaire doit être structuré dans une balise 'nav' avec un role='navigation' et un attribut aria-label</li>"
        );
      }

      const nia06n_links = nia06n_node.querySelectorAll('ul > li > a');
      let nia06n3_count = 0;
      if (nia06n_links && nia06n_links.length > 0) {
        for (let i = 0; i < nia06n_links.length; i++) {
          if (
            nia06n_links[i].hasAttribute('aria-current') &&
            (nia06n_links[i].getAttribute('aria-current') == 'true' ||
              nia06n_links[i].getAttribute('aria-current') == 'step')
          ) {
            nia06n3_count++;
          }
        }
        if (nia06n3_count == 0) {
          setItemsOutline(nia06n_links, 'orange', 'nia06n3', '06-N');
          setItemToResultList(
            'dev',
            "<li><a href='#' data-destination='nia06n3' class='result-focus label-orange'>06-N</a> : Dans le sommaire, le lien ancre vers la section en cours de consultation doit être identifié par l’attribut aria_current=’true’ ou 'step' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-10-9-1' target='_blank'>RAWeb 10.9.1</a>]</li>"
          );
        }
      } else {
        setItemOutline(nia06n_node, 'red', 'nia06n2', '06-N');
        setItemToResultList(
          'dev',
          "<li><a href='#' data-destination='nia06n2' class='result-focus label-red'>06-N</a> : Le sommaire ne contient pas d'élément de navigation</li>"
        );
      }
    }
  }
}

// O Composant Focus
function check_test_06o() {
  // Le composant focus doit avoir un titre même si celui_ci est visuellement masqué (.at ou .sr_only). Ce titre de composant doit être d’ 1 niveau supérieur à celui des titres des items
  // Les items du focus doivent être dans une seule et même liste <ul>
  // Le premier élément informatif dans le DOM de chaque item doit être le titre
  // Ne pas sortir du flux de lecture plus de la majorité des contenus (avec position absolue)
  // Si l’intégralité des items ne contiennent qu’un seul élément textuel celui_ci sera dans un <p>.

  if (!only_error && isAEM) {
    const nia06o1_nodes = document.querySelectorAll(
      '.cmp-focus:not(:has(:is(h2, h3, h4, h5)))'
    );
    if (nia06o1_nodes && nia06o1_nodes.length > 0) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06o1' class='result-focus label-yellow'>06-O</a> : Absence de titre sur un composant focus</li>"
      );
      setItemsOutline(nia06o1_nodes, 'yellow', 'nia06o1', '06-O');
    }
  }

  if (!only_redactor && isAEM) {
    const nia06o2_nodes = document.querySelectorAll('.cmp-focus');
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
        nia06o2_lists = nia06o2_nodes[i].querySelectorAll('ul, ul ul');
        nia06o2_items = nia06o2_nodes[i].querySelectorAll(
          '.cmp-focus-list-item, .cmp-focus-top, .search-result'
        );

        nia06o4_counter = 0;
        if (
          nia06o2_lists &&
          nia06o2_items &&
          ((nia06o2_lists.length == 1 && nia06o2_items.length > 1) ||
            (nia06o2_lists.length == 0 && nia06o2_items.length == 1))
        ) {
          // OK
        } else if (
          nia06o2_lists &&
          nia06o2_items &&
          nia06o2_lists.length == 1 &&
          nia06o2_items.length == 1
        ) {
          if (!only_error) {
            nia06o3_flag = true;
            setItemOutline(nia06o2_nodes[i], 'orange', 'nia06o3', '06-O');
          }
        } else {
          if (debug_flag) console.log(nia06o2_lists);
          if (debug_flag) console.log(nia06o2_items);

          nia06o2_flag = true;
          setItemOutline(nia06o2_nodes[i], 'orange', 'nia06o2', '06-O');
        }
        if (nia06o2_items) {
          for (let j = 0; j < nia06o2_items.length; j++) {
            nia06o2_itemTitle = nia06o2_items[j].querySelector(
              ':is(h3, h4, h5, h6)'
            );
            nia06o2_itemContent = sanitizeText(nia06o2_items[j].textContent);
            if (nia06o2_itemTitle) {
              if (
                nia06o2_itemContent ==
                sanitizeText(nia06o2_itemTitle.textContent)
              ) {
                nia06o4_counter++;
              } else if (
                nia06o2_itemContent.indexOf(
                  sanitizeText(nia06o2_itemTitle.textContent)
                ) != 0
              ) {
                if (debug_flag) console.log('content : ' + nia06o2_itemContent);
                if (debug_flag)
                  console.log(
                    'title   : ' + sanitizeText(nia06o2_itemTitle.textContent)
                  );

                nia06o5_flag = true;
                setItemOutline(nia06o2_items[j], 'orange', 'nia06o5', '06-O');
              }
            }
            if (nia06o2_itemContent == '') {
              nia06o6_flag = true;
              setItemOutline(nia06o2_items[j], 'orange', 'nia06o6', '06-O');
            }
          }

          if (nia06o4_counter > 0 && nia06o4_counter == nia06o2_items.length) {
            nia06o4_flag = true;
            setItemOutline(nia06o2_nodes[i], 'orange', 'nia06o4', '06-O');
          }

          if (
            nia06o2_items[0] &&
            nia06o2_items[0].classList.contains('cmp-focus-top') &&
            nia06o2_items.length == 1 &&
            !only_error
          ) {
            nia06o7_flag = true;
            setItemOutline(nia06o2_nodes[i], 'yellow', 'nia06o7', '06-O');
          }
        }
      }
    }
    if (nia06o2_flag == true) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06o2' class='result-focus label-orange'>06-O</a> : Les items du focus doivent être dans une seule et même liste 'ul' (exception si 1 seul item) </li>"
      );
    }
    if (nia06o3_flag == true) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06o3' class='result-focus label-yellow'>06-O</a> : Si il n'y a qu'un seul item dans le focus celui-ci ne doit pas être liste 'ul'</li>"
      );
    }
    if (nia06o4_flag == true) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06o4' class='result-focus label-orange'>06-O</a> : Si l’intégralité des items ne contiennent qu’un seul élément textuel celui-ci sera dans un 'p' </li>"
      );
    }
    if (nia06o5_flag == true) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06o5' class='result-focus label-orange'>06-O</a> : Le premier élément informatif dans le DOM de chaque item doit être le titre</li>"
      );
    }
    if (nia06o6_flag == true) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06o6' class='result-focus label-orange'>06-O</a> : Les items du focus doivent avoir un contenu </li>"
      );
    }
    if (nia06o7_flag == true) {
      setItemToResultList(
        'man',
        "<li><a href='#' data-destination='nia06o7' class='result-focus label-yellow'>06-O</a> : Vérifier s'il est normal d'avoir un focus-on-top comme seul élément du focus </li>"
      );
    }
  }
}

// P Composant Grid
function check_test_06p() {
  // Les items du grid doivent est structuré sous forme de liste (ul, ol ou dl)
  // Le premier élément informatif dans le DOM de chaque item doit être le titre
  // Si l’intégralité des items ne contiennent qu’un seul élément textuel celui_ci sera dans un <p>.

  if (!only_redactor && isAEM) {
    const nia06p1_nodes = document.querySelectorAll('.cmp-grid');
    let nia06p1_items;
    let nia06p1_itemTitle, nia06p1_itemContent, nia06p1_itemTitleSani, nia06p1_hasImgDeco;
    let nia06p1_counter;
    let nia06p2_flag = false;
    let nia06p3_flag = false;
    let nia06p4_flag = false;

    if (nia06p1_nodes && nia06p1_nodes.length > 0) {
      for (let i = 0; i < nia06p1_nodes.length; i++) {
        if (
          nia06p1_nodes[i].tagName != 'UL' &&
          nia06p1_nodes[i].tagName != 'OL' &&
          nia06p1_nodes[i].tagName != 'DL'
        ) {
          setItemToResultList(
            'dev',
            "<li><a href='#' data-destination='nia06p1' class='result-focus label-orange'>06-O</a> : Les items du grid doivent etre structuré sous forme de liste (ul, ol ou dl)</li>"
          );
          setItemsOutline(nia06p1_nodes, 'orange', 'nia06p1', '06-P');
        }

        nia06p1_items = nia06p1_nodes[i].querySelectorAll('li, dt');
        if (nia06p1_items) {
          for (let j = 0; j < nia06p1_items.length; j++) {
            nia06p1_itemTitle = nia06p1_items[j].querySelector(
              ':is(h3, h4, h5, h6)'
            );
            nia06p1_itemContent = sanitizeText(nia06p1_items[j].textContent);

            nia06p1_hasImgInfo = nia06p1_items[j].querySelector(
              'img:not([alt=""])'
            );

            if (nia06p1_itemTitle) {
              nia06p1_itemTitleSani = sanitizeText(
                nia06p1_itemTitle.textContent
              );
              if (nia06p1_itemContent == nia06p1_itemTitleSani) {
                nia06p1_counter++;
              } else if (
                nia06p1_itemContent.indexOf(nia06p1_itemTitleSani) != 0
              ) {
                nia06p2_flag = true;
                setItemOutline(nia06p1_items[j], 'orange', 'nia06p2', '06-P');
              }
            }
            if (nia06p1_itemContent == '' && nia06p1_hasImgInfo == null) {
              nia06p4_flag = true;
              setItemOutline(nia06p1_items[j], 'orange', 'nia06p4', '06-P');
            }
          }
          if (nia06p1_counter == nia06p1_items.length) {
            nia06p3_flag = true;
            setItemOutline(nia06p1_nodes[i], 'orange', 'nia06p3', '06-P');
          }
        }
      }
    }
    if (nia06p2_flag == true) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06p2' class='result-focus label-orange'>06-P</a> : Le premier élément informatif dans le DOM de chaque item doit être le titre</li>"
      );
    }
    if (nia06p3_flag == true) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06p3' class='result-focus label-orange'>06-P</a> : Si l’intégralité des items ne contiennent qu’un seul élément textuel celui_ci sera dans un <p> </li>"
      );
    }
    if (nia06p4_flag == true) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06p4' class='result-focus label-orange'>06-P</a> : Les items du grid doivent avoir un contenu </li>"
      );
    }
  }
}

// Q Composant Tabs
function check_test_06q() {
  if (isAEM) {
    // Utilisation de la structure avec les roles
    if (!only_redactor) {
      const nia06q1_nodes = document.querySelectorAll(
        '.cmp-tabs > *:not([role="tablist"]):not([role="tabpanel"]), .cmp-tabs > [role="tablist"] > *:not([role="tab"])'
      );
      if (!nia06q1_nodes || nia06q1_nodes.length > 0) {
        setItemToResultList(
          'dev',
          "<li><a href='#' data-destination='nia06q1' class='result-focus label-orange'>06-Q</a> : Vérifier les attributs role dans le système d'onglet </li>"
        );
        setItemsOutline(nia06q1_nodes, 'orange', 'nia06q1', '06-Q');
      }
    }

    // Vérifier la présence d’un container avec l’attribut role=’tablist’ et ainsi qu’un aria_label ou aria_labelledby
    const nia06q2_nodes = document.querySelectorAll(
      '.cmp-tabs > [role="tablist"]:not([aria-label]):not([aria-labelledby])'
    );
    if (!nia06q2_nodes || nia06q2_nodes.length > 0) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06q2' class='result-focus label-orange'>06-Q</a> : Absence d'attribut aria-label sur le système d'onglet (à ajouter dans le cq_dialog) </li>"
      );
      setItemsOutline(nia06q2_nodes, 'orange', 'nia06q2', '06-Q');
    }

    // Chaque item d’onglet sera dans une balise <button> et aura l’attribut role=’tab’ ainsi qu’un attribut aria_controls lié avec l’id de son contenu.
    if (!only_redactor && !only_error) {
      const nia06q3_nodes = document.querySelectorAll(
        '.cmp-tabs > [role="tablist"] > [role="tab"]:not(button), .cmp-tabs > [role="tablist"] > [role="tab"]:not([aria-controls])'
      );
      if (!nia06q3_nodes || nia06q3_nodes.length > 0) {
        setItemToResultList(
          'nth',
          "<li><a href='#' data-destination='nia06q3' class='result-focus label-yellow'>06-Q</a> : Structurer idéalement les indicateurs d'onglet dans des éléments bouton avec un attribut role=’tab’ ainsi qu’un attribut aria_controls lié avec l’id de son contenu. </li>"
        );
        setItemsOutline(nia06q3_nodes, 'yellow', 'nia06q3', '06-Q');
      }
    }

    // Chaque item d’onglet actif aura un attribut aria_selected=’true’, sinon il aura la valeur ‘false’ dans le cas contraire
    if (!only_redactor) {
      const nia06q4_nodes = document.querySelectorAll(
        '.cmp-tabs > [role="tablist"] > [role="tab"]:not([aria-selected]), .cmp-tabs > [role="tablist"] > [role="tab"][aria-selected=false]:not([tabindex="-1"])'
      );
      if (!nia06q4_nodes || nia06q4_nodes.length > 0) {
        setItemToResultList(
          'dev',
          "<li><a href='#' data-destination='nia06q4' class='result-focus label-orange'>06-Q</a> : Chaque item d’onglet actif aura un attribut aria_selected=’true’, sinon il aura la valeur ‘false’ ainsi qu'un attribut tabindex='-1' dans le cas contraire. </li>"
        );
        setItemsOutline(nia06q4_nodes, 'orange', 'nia06q4', '06-Q');
      }
    }

    // Chaque contenu d’onglet sera dans un element possédant les attributs role=’tabpanel’ , tabindex=’0’ et ainsi qu’un aria_labelledby  faisant référence au titre de l’onglet.
    if (!only_redactor) {
      const nia06q5_nodes = document.querySelectorAll(
        '.cmp-tabs > [role="tablist"] > [role="tab"]:not([id]), .cmp-tabs > [role="tabpanel"]:not([aria-labelledby]), .cmp-tabs > [role="tabpanel"]:not([tabindex="0"])'
      );
      if (!nia06q5_nodes || nia06q5_nodes.length > 0) {
        setItemToResultList(
          'dev',
          "<li><a href='#' data-destination='nia06q5' class='result-focus label-orange'>06-Q</a> : Chaque contenu d’onglet sera dans un element possédant les attributs role=’tabpanel’ , tabindex=’0’ et ainsi qu’un aria_labelledby  faisant référence au titre de l’onglet. </li>"
        );
        setItemsOutline(nia06q5_nodes, 'orange', 'nia06q5', '06-Q');
      }
    }
  }
}

// R Back-To-Top
function check_test_06r() {
  // L’élément Back_to_Top présent en Desktop doit également être présent en mobile
  // L’élément Back_to_Top doit être un lien ancre qui cible #top
  // L’élément Back_to_Top doit avoir un attribut title ainsi qu’une balise <span> « haut de page » (cette dernière peut_être visuellement masquée)

  if (!only_redactor && !only_error && isAEM) {
    const nia06r1_nodes = document.querySelectorAll('a.back');
    if (!nia06r1_nodes || nia06r1_nodes.length == 0) {
      setItemToResultList(
        'man',
        "<li><a href='#' data-destination='nia06r1' class='result-focus label-yellow'>06-R</a> : Vérifier la présence du bouton de retour en haut de page (exception page avec peu de contenu)</li>"
      );
      setItemsOutline(nia06r1_nodes, 'yellow', 'nia06r1', '06-R');
    }

    const nia06r2_nodes = document.querySelectorAll(
      'a.back:not(:is([href="#top"],[href="#"]))'
    );
    if (nia06r2_nodes && nia06r2_nodes.length > 0) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06r2' class='result-focus label-yellow'>06-R</a> : L’élément Back_to_Top doit être un lien ancre qui cible #top</li>"
      );
      setItemsOutline(nia06r1_nodes, 'yellow', 'nia06r2', '06-R');
    }

    const nia06r3_nodes = document.querySelectorAll('a.back:not([title]) ');
    if (nia06r3_nodes && nia06r3_nodes.length > 0) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06r3' class='result-focus label-yellow'>06-R</a> : L’élément Back_to_Top doit avoir un attribut title</li>"
      );
      setItemsOutline(nia06r3_nodes, 'yellow', 'nia06r3', '06-R');
    }
  }
}

// S Breadcrumb
function check_test_06s() {
  // Les pages secondaires doivent disposer d’un breadcrumb
  //L’intégralité de la hiérarchie doit pouvoir être affiché (possibilité de les mettre dans un accordéon) et cliquable.
  // Les liens du breadcrumb doivent être présenté dans une liste ul/ol
  // Un attribut lang doit être ajouté pour les pages (ou les titres de pages) qui ne sont pas dans la langue de la page actuelle.
  // Présence de l'attribut aria_current=’page’ sur le dernier item du fils d'ariane
  // Le breadcrumb doit être dans une balise <nav role=navigation> avec l’attribut aria_label pertinent : "Vous êtes ici" ("Fil d'Ariane" est considéré comme un terme technique).

  if (!only_redactor && !isHomepage && isAEM) {
    const nia06s1_nodes = document.querySelectorAll(
      'nav[id^=breadcrumb-], nav.cmp-breadcrumb'
    );
    if (
      !nia06s1_nodes ||
      nia06s1_nodes.length == 0 ||
      !isItemsVisible(nia06s1_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06s1' class='result-focus label-orange'>06-S</a> : Les pages secondaires doivent disposer d’un breadcrumb.</li>"
      );
      setItemsOutline(nia06s1_nodes, 'orange', 'nia06s1', '06-S');
    } else {
      const nia06s2_nodes = document.querySelectorAll(
        ':is(nav[id^=breadcrumb-], nav.cmp-breadcrumb):not([role="navigation"])'
      );
      if (nia06s2_nodes && nia06s2_nodes.length > 0) {
        setItemToResultList(
          'dev',
          "<li><a href='#' data-destination='nia06s2' class='result-focus label-orange'>06-S</a> : Il manque l'attribut role sur la balise nav du breadcrumb.</li>"
        );
        setItemsOutline(nia06s2_nodes, 'orange', 'nia06s2', '06-S');
      }

      const nia06s3_nodes = document.querySelectorAll(
        ':is(nav[id^=breadcrumb-], nav.cmp-breadcrumb):not([aria-label])'
      );
      if (nia06s3_nodes && nia06s3_nodes.length > 0) {
        setItemToResultList(
          'dev',
          "<li><a href='#' data-destination='nia06s3' class='result-focus label-orange'>06-S</a> : Il manque l'attribut aria-label sur la balise nav du breadcrumb.</li>"
        );
        setItemsOutline(nia06s3_nodes, 'orange', 'nia06s3', '06-S');
      }

      const nia06s4_nodes = document.querySelectorAll(
        ':is(nav[id^=breadcrumb-], nav.cmp-breadcrumb) :is(ul,ol).cmp-breadcrumb__list > li.cmp-breadcrumb__item'
      );
      if (!nia06s4_nodes || nia06s4_nodes.length == 0) {
        setItemToResultList(
          'dev',
          "<li><a href='#' data-destination='nia06s3' class='result-focus label-red'>06-S</a> : Les liens du breadcrumb doivent être présenté dans une liste ul/ol.</li>"
        );
        setItemsOutline(nia06s4_nodes, 'red', 'nia06s4', '06-S');
      }

      const nia06s5_nodes = document.querySelectorAll(
        ':is(nav[id^=breadcrumb-], nav.cmp-breadcrumb) .cmp-breadcrumb__list > .cmp-breadcrumb__item:not([aria-current="page"]):last-child > span:not([aria-current="page"])'
      );
      if (
        nia06s5_nodes &&
        nia06s5_nodes.length > 0 &&
        isItemsVisible(nia06s5_nodes)
      ) {
        setItemToResultList(
          'dev',
          "<li><a href='#' data-destination='nia06s5' class='result-focus label-red'>06-S</a> : Absence de l'attribut aria-current sur le dernier item du fils d'ariane --> Vérifier dans les propriétés de la page que celle-ci n'est pas cachée dans la navigation.</li>"
        );
        setItemsOutline(nia06s5_nodes, 'red', 'nia06s5', '06-S');
      }
    }
  }
}

// T Composant Panier (Cart)
function check_test_06t() {
  if (
    !only_redactor &&
    !isHomepage &&
    isAEM &&
    currentUrl.includes('/cart.html')
  ) {
    // Le nom de l’étape en cours est présent dans le titre de la page.
    const nia06t1_title = document.title;
    const nia06t1_h2 = document.querySelector('.basket h2');
    if (!nia06t1_h2 || !nia06t1_title.includes(nia06t1_h2.textContent)) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia06t1' class='result-focus label-red'>06-T</a> : Le titre de la page doit reprendre le titre de l'étape du panier.</li>"
      );
      setItemOutline(nia06t1_h2, 'red', 'nia06t1', '06-T');
    }

    // Etape « Votre panier » : Les différentes meta doivent être présentées sous forme de liste (<ul> ou <dl>)
    const nia06t2_nodes = document.querySelector('.basket-order-item-metas');
    if (
      nia06t2_nodes &&
      nia06t2_nodes.nodeName != 'UL' &&
      nia06t2_nodes.nodeName != 'DL'
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06t2' class='result-focus label-orange'>06-T</a> : Les différentes meta doivent être présentées sous forme de liste (<ul> ou <dl>)</li>"
      );
      setItemsOutline(nia06t2_nodes, 'orange', 'nia06t2', '06-T');
    }

    // Etape « Votre panier » : Liste de selection pour la quantité doit être liée au titre de la publication
    const nia06t3_nodes = document.querySelector(
      '.basket-order-item-actions select.basket-order-item-qty'
    );
    if (
      nia06t3_nodes &&
      (nia06t3_nodes.previousElementSibling.nodeName != 'LABEL' ||
        !nia06t3_nodes.hasAttribute('aria-describedby'))
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06t3' class='result-focus label-orange'>06-T</a> : Liste de selection pour la quantité doit être liée au titre de la publication</li>"
      );
      setItemsOutline(nia06t3_nodes, 'orange', 'nia06t3', '06-T');
    }

    // Etape « Mode de livraison » Un bouton radio ne devrait pas être seul
    const nia06t4_nodes = document.querySelector('.basket input[type="radio"]');
    if (
      nia06t4_nodes &&
      nia06t4_nodes.closest('fieldset, [role="group"]') == 'null'
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06t4' class='result-focus label-orange'>06-T</a> : Présence d'un bouton radio hors d'une balise fieldset</li>"
      );
      setItemsOutline(nia06t4_nodes, 'orange', 'nia06t4', '06-T');
    } else {
      const nia06t5_nodes = nia06t4_nodes
        .closest('fieldset, [role="group"]')
        .querySelector('input[type="radio"]');
      if (nia06t5_nodes && nia06t5_nodes.length < 2) {
        setItemToResultList(
          'dev',
          "<li><a href='#' data-destination='nia06t5' class='result-focus label-orange'>06-T</a> : Un bouton radio ne devrait pas être seul</li>"
        );
        setItemsOutline(nia06t4_nodes, 'orange', 'nia06t5', '06-T');
      }
    }
  }
}

// U Composant Localnav
function check_test_06u() {
  // Les différents items sont dans une structure de type liste <ul>
  // La localnav doit être dans une balise <nav role=’navigation’> avec un attribut aria_labelledby qui cible le h2 précèdent ses différents items.

  if (!only_redactor && isAEM) {
    const nia06u1_nodes = document.querySelectorAll(
      'nav.page-localnav:not([role="navigation"])'
    );
    if (nia06u1_nodes && nia06u1_nodes.length > 0) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06u1' class='result-focus label-orange'>06-U</a> : Il manque l'attribut role sur la balise nav du localnav.</li>"
      );
      setItemsOutline(nia06u1_nodes, 'orange', 'nia06u1', '06-U');
    }

    const nia06u2_nodes = document.querySelectorAll(
      'nav.page-localnav:not([aria-labelledby])'
    );
    if (nia06u2_nodes && nia06u2_nodes.length > 0) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06u2' class='result-focus label-orange'>06-U</a> : Il manque l'attribut aria-labelledby sur la balise nav du localnav.</li>"
      );
      setItemsOutline(nia06u2_nodes, 'orange', 'nia06u2', '06-U');
    }

    const nia06u3_nodes = document.querySelectorAll(
      'nav.page-localnav[aria-labelledby="localnav-title"] > :is(h2,h3,h4)#localnav-title'
    );
    if (nia06u3_nodes && nia06u3_nodes.length > 1) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia06u3' class='result-focus label-red'>06-U</a> : Le composant localnav doit avoir un titre Hn lié avec un couple aria-labelledby-id unique (celui-ci peut être visuellement masqué) </li>"
      );
      setItemsOutline(nia06u3_nodes, 'red', 'nia06u3', '06-U');
    }

    const nia06u4_nodes = document.querySelectorAll('nav.page-localnav');
    let nia06u4_items;
    if (nia06u4_nodes && nia06u4_nodes.length > 0) {
      for (let i = 0; i < nia06u4_nodes.length; i++) {
        nia06u4_items = nia06u4_nodes[i].querySelectorAll('ul li.nav-item');
        if (!nia06u4_items || nia06u4_items.length == 0) {
          setItemToResultList(
            'dev',
            "<li><a href='#' data-destination='nia06u4' class='result-focus label-red'>06-U</a> : Le composant localnav doit contenir des items.</li>"
          );
          setItemOutline(nia06u4_nodes[i], 'red', 'nia06u4', '06-U');
        } else if (nia06u4_items && nia06u4_items.length == 1 && !only_error) {
          setItemToResultList(
            'nth',
            "<li><a href='#' data-destination='nia06u5' class='result-focus label-yellow'>06-U</a> : Le composant localnav doit idéalement contenir plusieurs items.</li>"
          );
          setItemOutline(nia06u4_nodes[i], 'yellow', 'nia06u5', '06-U');
        }
      }
    }
  }
}

/*- -------------------------------------------------------------------------------- */
/* 🗸 NIA-07 AEM Component 
Vérification de plusieurs points concernant la configuration des composants AEM suivant :
 o Menu 
 o Tooltip
 o Recherche
 o etc.
 
 -- Possibilité de splitter encore plus la recherche et le menu 
*/
function check_part_07() {
  if (debug_flag) console.log('07 AEM Component');

  check_test_07a();
  check_test_07b();
  check_test_07c();
  check_test_07d();
  check_test_07e();
  check_test_07f();
  check_test_07g();
}

// A. Position de bouton menu
function check_test_07a() {
  if (!only_redactor && isAEM) {
    const nia07a_nodes = document.querySelectorAll(
      'button.anchor[data-destination^="#headernav"]:not(.anchor-close)'
    );
    let nia07a_flag = false;
    if (nia07a_nodes && nia07a_nodes.length > 0) {
      for (let i = 0; i < nia07a_nodes.length; i++) {
        if (nia07a_nodes[i].closest('nav') == null) {
          setItemOutline(nia07a_nodes[i], 'red', 'nia07a', '07-A');
          nia07a_flag = true;
        }
      }
    }
    if (nia07a_flag == true) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia07a' class='result-focus label-red'>07-A</a> : Présence du bouton d'ouverture du menu en dehors de la balise nav</li>"
      );
    }
  }
}

// B. Recherche
function check_test_07b() {
  // Presence de l'aria label
  const nia07b1_nodes = document.querySelectorAll(
    'role[search]:not([aria-label])'
  );
  if (
    nia07b1_nodes &&
    nia07b1_nodes.length > 0 &&
    isItemsVisible(nia07b1_nodes)
  ) {
    setItemToResultList(
      'dev',
      "<li><a href='#' data-destination='nia07b1' class='result-focus label-orange'>07-B</a> : Aria-label absent de la recherche</li>"
    );
    setItemsOutline(nia07b1_nodes, 'orange', 'nia07b1', '07-B');
  }

  // Placeholder différent du titre
  const nia07b2_nodes = document.querySelectorAll('input[type="search"]');
  let nia07b2_flag = false;
  if (
    nia07b2_nodes &&
    nia07b2_nodes.length > 0 &&
    isItemsVisible(nia07b2_nodes)
  ) {
    for (let i = 0; i < nia07b2_nodes.length; i++) {
      if (
        nia07b2_nodes[i].hasAttribute('placeholder') &&
        nia07b2_nodes[i].hasAttribute('title') &&
        nia07b2_nodes[i].getAttribute('placeholder') !=
          nia07b2_nodes[i].getAttribute('title')
      ) {
        nia07b2_flag = true;
        setItemOutline(nia07b2_nodes[i], 'red', 'nia07b2', '07-B');
      }
    }
  }
  if (nia07b2_flag == true) {
    setItemToResultList(
      'dev',
      "<li><a href='#' data-destination='nia07b2' class='result-focus label-red'>07-B</a> : Problème avec le placeholder de la recherche</li>"
    );
  }

  // Titre de recherche trop court
  const nia07b3_nodes = document.querySelectorAll('input[type="search"]');
  let nia07b3_flag = false;
  if (
    nia07b3_nodes &&
    nia07b3_nodes.length > 0 &&
    isItemsVisible(nia07b3_nodes)
  ) {
    for (let i = 0; i < nia07b3_nodes.length; i++) {
      // Rechercher / Recherche / Suchen / Search --> Concidéré comme pas assez précis.
      if (
        nia07b3_nodes[i].hasAttribute('title') &&
        nia07b3_nodes[i].getAttribute('title').length < 15
      ) {
        nia07b3_flag = true;
        setItemOutline(nia07b3_nodes[i], 'orange', 'nia07b3', '07-B');
      }
    }
  }
  if (nia07b3_flag == true) {
    setItemToResultList(
      'nth',
      "<li><a href='#' data-destination='nia07b3' class='result-focus label-orange'>07-B</a> : Problème avec la pertinence du titre de la recherche</li>"
    );
  }

  // Role search sur les recherches secondaires
  if (!only_redactor && !only_error && isAEM) {
    const nia07b4_nodes = document.querySelectorAll(
      'main form[role="search"]:not([action$="recherche.html"]):not([aria-label="Globale"]):not([aria-label="Global"])'
    );
    if (
      nia07b4_nodes &&
      nia07b4_nodes.length > 0 &&
      isItemsVisible(nia07b4_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia07b4' class='result-focus label-yellow'>07-B</a> : Présence d'un role=search sur les éléments de recherche secondaire</li>"
      );
      setItemsOutline(nia07b4_nodes, 'yellow', 'nia07b4', '07-B');
    }
  }

  // Les filtres sont présentés avec une structure en accordéon details/summary
  if (!only_redactor && !only_error && isAEM) {
    const nia07b5_nodes = document.querySelectorAll(
      '.filters-content > *:not(details)'
    );
    if (
      nia07b5_nodes &&
      nia07b5_nodes.length > 0 &&
      isItemsVisible(nia07b5_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia07b5' class='result-focus label-yellow'>07-B</a> : Il est recommander de présenter les filtres avec une structure en accordéon details/summary</li>"
      );
      setItemsOutline(nia07b5_nodes, 'yellow', 'nia07b5', '07-B');
    }
  }

  //Affichage du nombre de résultat
  if (!only_redactor && isAEM) {
    const nia07b6_nodes = document.querySelectorAll('.search-meta-count');
    if (
      nia07b6_nodes &&
      nia07b6_nodes.length > 0 &&
      !isItemsVisible(nia07b6_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia07b6' class='result-focus label-orange'>07-B</a> : Absence du nombre de resultat de la recherche</li>"
      );
      setItemsOutline(nia07b6_nodes, 'orange', 'nia07b6', '07-B');
    }
  }

  // Les résultats sont présentés sous forme d’une suite de balise <article> ou <li>
  if (!only_redactor && !only_error && isAEM) {
    const nia07b7_nodes = document.querySelectorAll(
      '.search-results .search-result > *:not(article):not(li)'
    );
    if (
      nia07b7_nodes &&
      nia07b7_nodes.length > 0 &&
      isItemsVisible(nia07b7_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia07b7' class='result-focus label-yellow'>07-B</a> : Les résultats doivent être présentés sous forme d’une suite de balise 'article' ou 'li'</li>"
      );
      setItemsOutline(nia07b7_nodes, 'yellow', 'nia07b7', '07-B');
    }
  }

  // La pagination doit être structurée dans un élément <nav role=‘navigation’> avec un aria_label
  if (!only_redactor) {
    const nia07b8_nodes = document.querySelectorAll(
      'nav:not([role="navigation"]) > :is(ol,ul).pagination, *:not(nav) > :is(ol,ul).pagination, nav:not([aria-label]) > :is(ol,ul).pagination'
    );
    if (
      nia07b8_nodes &&
      nia07b8_nodes.length > 0 &&
      isItemsVisible(nia07b8_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia07b8' class='result-focus label-red'>07-B</a> : La pagination doit être structurée dans un élément 'nav'  avec le role=navigation et un aria_label</li>"
      );
      setItemsOutline(nia07b8_nodes, 'red', 'nia07b8', '07-B');
    }
  }

  //Les différents éléments de la pagination doivent être sous forme de liste (ul ou ol)
  if (!only_redactor) {
    const nia07b9_nodes = document.querySelectorAll(
      'nav > .pagination:not(ol,ul)'
    );
    if (
      nia07b9_nodes &&
      nia07b9_nodes.length > 0 &&
      isItemsVisible(nia07b9_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia07b9' class='result-focus label-red'>07-B</a> : Les différents éléments de la pagination doivent être sous forme de liste (ul ou ol)</li>"
      );
      setItemsOutline(nia07b9_nodes, 'red', 'nia07b9', '07-B');
    }
  }

  // La page active doit avoir un aria_current='page'
  if (!only_redactor && isAEM) {
    const nia07b10_nodes = document.querySelectorAll(
      '.pagination .pagination-page'
    );
    let nia07b10_flag = false;
    let nia07b11_counter = 0;
    if (
      nia07b10_nodes &&
      nia07b10_nodes.length > 0 &&
      isItemsVisible(nia07b10_nodes)
    ) {
      for (let i = 0; i < nia07b10_nodes.length; i++) {
        if (nia07b10_nodes[i].tagName != 'LI') {
          setItemsOutline(nia07b10_nodes, 'red', 'nia07b10', '07-B');
          nia07b10_flag = true;
        } else if (
          !nia07b10_nodes[i].firstElementChild ||
          (nia07b10_nodes[i].firstElementChild.tagName == 'A' &&
            (!nia07b10_nodes[i].firstElementChild.hasAttribute('aria-label') ||
              nia07b10_nodes[i].firstElementChild.getAttribute('aria-label')
                .length < 4))
        ) {
          setItemsOutline(nia07b10_nodes, 'red', 'nia07b10', '07-B');
          nia07b10_flag = true;
        }
        if (
          nia07b10_nodes[i].hasAttribute('aria-current') &&
          nia07b10_nodes[i].getAttribute('aria-current') == 'page'
        ) {
          nia07b11_counter++;
        }
      }

      if (nia07b10_flag == true) {
        setItemToResultList(
          'dev',
          "<li><a href='#' data-destination='nia07b10' class='result-focus label-red'>07-B</a> : Les item de la pagination doivent être dans une balise li et leur enfant posseder un aria-label pertinent</li>"
        );
      }
      if (nia07b11_counter == 0) {
        setItemToResultList(
          'dev',
          "<li><a href='#' data-destination='nia07b11' class='result-focus label-red'>07-B</a> : La page active de la pagination doit avoir un aria_current= ‘page’</li>"
        );
        setItemsOutline(nia07b10_nodes, 'red', 'nia07b11', '07-B');
      }
    }
  }
}

// C. Tooltip
function check_test_07c() {
  if (isAEM) {
    const nia07c_nodes = document.querySelectorAll('.search-view');
    if (
      nia07c_nodes &&
      nia07c_nodes.length > 0 &&
      isItemsVisible(nia07c_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia07c' class='result-focus label-red'>07-C</a> : Présence de tooltip non accessible sur les résultats de recherches [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-10-13-1' target='_blank'>RAWeb 10.13.1</a>]</li>"
      );
      setItemsOutline(nia07c_nodes, 'red', 'nia07c', '07-C');
    }
  }
}

// D. Menu langue
function check_test_07d() {
  if (!only_redactor && isAEM) {
    const nia07d1_nodes = document.querySelectorAll(
      'nav[id^="language-"]:not([aria-label]), div > ul.cmp-languagenavigation__group:not([aria-label])'
    );
    if (
      nia07d1_nodes &&
      nia07d1_nodes.length > 0 &&
      isItemsVisible(nia07d1_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia07d1' class='result-focus label-red'>07-D</a> : Absence de l'aria-label sur le menu de selection de langue (à ajouter dans le cqdialog)</li>"
      );
      setItemsOutline(nia07d1_nodes, 'red', 'nia07d1', '07-D');
    }

    // Check vieux composant switch lang
    const nia07d2_nodes = document.querySelectorAll(
      '#page-langs ul[role="menu"] > li[role="none"]'
    );
    if (nia07d2_nodes && nia07d2_nodes.length > 0) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia07d2' class='result-focus label-orange'>07-D</a> : Faiblesse de la structure du menu de switch des langues : ne pas utiliser role=menu</li>"
      );
      setItemsOutline(nia07d2_nodes, 'orange', 'nia07d2', '07-D');
    }

    // Les liens vers les versions linguistique doivent avoir l’attribut lang et posséder le title et le contenu textuel « de – Deutsch »
    const nia07d3_nodes = document.querySelectorAll(
      '.cmp-languagenavigation__group .cmp-languagenavigation__item-link:not([title*=" - "]),.cmp-languagenavigation__group .cmp-languagenavigation__item-link:not([lang]),.cmp-languagenavigation__group .cmp-languagenavigation__item-link:not([hreflang])'
    );
    if (
      nia07d3_nodes &&
      nia07d3_nodes.length > 0 &&
      isItemsVisible(nia07d3_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia07d3' class='result-focus label-orange'>07-D</a> : Les liens vers les versions linguistique doivent avoir les attributs lang, hreflang et posséder un attribut title dont le contenu textuel est tel que : « de – Deutsch » </li>"
      );
      setItemsOutline(nia07d3_nodes, 'orange', 'nia07d3', '07-D');
    }
  }
}

// E. Video player
function check_test_07e() {
  if (!only_redactor && isAEM) {
    const nia07e_nodes = document.querySelectorAll(
      '.cmp-multiplayer .player_img img[alt="Lire la vidéo Youtube, voir légende ci-après"][lang]:not([lang="fr"])'
    );
    if (
      nia07e_nodes &&
      nia07e_nodes.length > 0 &&
      isItemsVisible(nia07e_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia07e' class='result-focus label-orange'>07-E</a> : Traduction manquante dans le composant Multimedia Player</li>"
      );
      setItemsOutline(nia07e_nodes, 'orange', 'nia07e', '07-E');
    }
  }
}

// F. Menu
function check_test_07f() {
  // F1. Check si le menu existe
  if (!only_redactor && isAEM) {
    const nia07f_menu = document.querySelector(
      'nav.topnav > .page-headernav .navigation-container > ul.nav ,nav.page-headernav .navigation-container > ul.nav, nav.page-headernav-desk .navigation-container > ul.nav, nav.headernav-detached .navigation-container > ul.nav, .page-headernav > nav .navigation-container > ul.nav'
    );
    let nia07f_hasPasserelle = false;
    let nia07f_isModal = false;
    if (nia07f_menu) {
      const nia07f07_node = document.querySelector(
        'nav#headernav:not([role="navigation"])'
      );
      if (nia07f07_node && isItemVisible(nia07f07_node)) {
        setItemToResultList(
          'dev',
          "<li><a href='#' data-destination='nia07f07' class='result-focus label-orange'>07-F</a> : Role navigation absent de la barre de navigation</li>"
        );
        setItemsOutline(nia07f07_node, 'orange', 'nia07f07', '07-F');
      }
      if (!only_error) {
        const nia07f02_node = document.querySelector(
          'nav#headernav:not([aria-label]):not([aria-labelledby])'
        );
        if (nia07f02_node && isItemVisible(nia07f02_node)) {
          setItemToResultList(
            'dev',
            "<li><a href='#' data-destination='nia07f02' class='result-focus label-yellow'>07-F</a> : Attribut Aria-label absent de la barre de navigation</li>"
          );
          setItemsOutline(nia07f02_node, 'yellow', 'nia07f02', '07-F');
        }
      }

      // Check si un acces aux pages passerelles est disponible depuis la navigation
      const nia07f03_node = nia07f_menu.querySelector(
        ':scope > li.has-subnav > a'
      );
      if (nia07f03_node) {
        nia07f_hasPasserelle = true;
        if (debug_flag) console.log(' - Le menu utilise des pages passerelles');
      } else {
        if (debug_flag)
          console.log(" - Le menu n'utilise pas de pages passerelles");
      }

      // Itération sur les items du menu
      const nia07f10_nodes = nia07f_menu.querySelectorAll(':scope > li');
      let nia07f_list21 = '',
        nia07f_list22 = '',
        nia07f_list23 = '',
        nia07f_list24 = '',
        nia07f_list31 = '',
        nia07f_list32 = '',
        nia07f_list33 = '',
        nia07f_list34 = '',
        nia07f_list41 = '',
        nia07f_list42 = '',
        nia07f_list43 = '',
        nia07f_list44 = '';
      if (nia07f10_nodes && nia07f10_nodes.length > 0) {
        for (let i = 0; i < nia07f10_nodes.length; i++) {
          if (isItemVisible(nia07f10_nodes[i])) {
            let nia07f11_nodes = nia07f10_nodes[i].querySelectorAll(
              ':scope > a, :scope > .quick-navigation > a'
            );
            let nia07f12_nodes = nia07f10_nodes[i].querySelectorAll(
              ':scope > button, :scope > .disclosure--container > button'
            );
            let nia07f13_nodes = nia07f10_nodes[i].querySelectorAll(
              ':scope > ul, :scope > .disclosure--container > ul'
            );
            let iplusun = i + 1;
            if (nia07f10_nodes[i].classList.contains('has-subnav')) {
              // F2. Avec accès aux pages passerelles depuis la navigation:
              // Sur l'item de rubrique vérifier existance de (li.has-subnav > a) et de (li.has-subnav > button) + le button doit avoir l'attribut aria-expanded
              if (nia07f_hasPasserelle) {
                if (!nia07f11_nodes || nia07f11_nodes.length != 1) {
                  if (debug_flag)
                    console.log(
                      " - F2.1 Absence de lien pour se rendre à la page passerelle pour l'élément de menu n°" +
                        iplusun
                    );
                  nia07f_list21 += iplusun + ',';
                  setItemOutline(
                    nia07f10_nodes[i],
                    'orange',
                    'nia07f21',
                    '07-F'
                  );
                } else if (!nia07f12_nodes || nia07f12_nodes.length != 1) {
                  if (debug_flag)
                    console.log(
                      " - F2.2 Absence de bouton pour déplier le sous-menu pour l'élement de menu n°" +
                        iplusun
                    );
                  nia07f_list22 += iplusun + ',';
                  setItemOutline(
                    nia07f10_nodes[i],
                    'orange',
                    'nia07f22',
                    '07-F'
                  );
                } else if (!nia07f13_nodes || nia07f13_nodes.length != 1) {
                  if (debug_flag)
                    console.log(
                      " - F2.3 Un problème a été detecté pour l'élement de menu n°" +
                        iplusun +
                        ' (absence de sous-menu alors que la classe has-subnav est présente)'
                    );
                  nia07f_list23 += iplusun + ',';
                  setItemOutline(
                    nia07f10_nodes[i],
                    'orange',
                    'nia07f23',
                    '07-F'
                  );
                } else if (
                  nia07f12_nodes &&
                  !nia07f12_nodes[0].hasAttribute('aria-expanded')
                ) {
                  if (debug_flag)
                    console.log(
                      " - F2.4 Un problème a été detecté pour l'élement de menu n°" +
                        iplusun +
                        " (absence de l'attribut aria-expanded)"
                    );
                  nia07f_list24 += iplusun + ',';
                  setItemOutline(
                    nia07f10_nodes[i],
                    'orange',
                    'nia07f24',
                    '07-F'
                  );
                } else {
                  if (debug_flag)
                    console.log(
                      " - L'item de menu " +
                        iplusun +
                        ' avec page passerelles et sous-menu est OK'
                    );
                }
              }

              // F3. Sans l’accès aux pages passerelles depuis la navigation:
              // Sur l'item de rubrique vérifier existance de (li.has-subnav > button) + cette item doit avoir l'attribut aria-expanded
              else {
                if (nia07f11_nodes && nia07f11_nodes.length > 0) {
                  if (debug_flag)
                    console.log(
                      " - F3.1 Présence d'un lien pour se rendre à une page passerelle sur l'élement de menu n°" +
                        iplusun
                    );
                  nia07f_list31 += iplusun + ',';
                  setItemOutline(
                    nia07f10_nodes[i],
                    'orange',
                    'nia07f31',
                    '07-F'
                  );
                } else if (!nia07f12_nodes || nia07f12_nodes.length != 1) {
                  if (debug_flag)
                    console.log(
                      " - F3.2 Absence de bouton pour déplier le sous-menu pour l'élement de menu n°" +
                        iplusun
                    );
                  nia07f_list32 += iplusun + ',';
                  setItemOutline(
                    nia07f10_nodes[i],
                    'orange',
                    'nia07f32',
                    '07-F'
                  );
                } else if (!nia07f13_nodes || nia07f13_nodes.length != 1) {
                  if (debug_flag)
                    console.log(
                      " - F3.3 Un problème a été detecté pour l'élement de menu n°" +
                        iplusun +
                        ' (absence de sous-menu alors que la classe has-subnav est présente)'
                    );
                  nia07f_list33 += iplusun + ',';
                  setItemOutline(
                    nia07f10_nodes[i],
                    'orange',
                    'nia07f33',
                    '07-F'
                  );
                } else if (
                  nia07f12_nodes &&
                  !nia07f12_nodes[0].hasAttribute('aria-expanded')
                ) {
                  if (debug_flag)
                    console.log(
                      " - F3.4 Un problème a été detecté pour l'élement de menu n°" +
                        iplusun +
                        " (absence de l'attribut aria-expanded)"
                    );
                  nia07f_list34 += iplusun + ',';
                  setItemOutline(
                    nia07f10_nodes[i],
                    'orange',
                    'nia07f34',
                    '07-F'
                  );
                } else {
                  if (debug_flag)
                    console.log(
                      " - L'item de menu " +
                        iplusun +
                        ' sans page passerelles et sous-menu est OK'
                    );
                }
              }
            } else {
              // F4 Vérifier que les élements (li:not(.has-subnav) > a) n'ont pas d'attribut aria-expanded ni aria-haspopup ni est suivi d'un élément ul
              if (!nia07f11_nodes || nia07f11_nodes.length != 1) {
                if (debug_flag)
                  console.log(
                    " - F4.1 Un problème a été detecté pour l'élement de menu n°" +
                      iplusun
                  );
                nia07f_list41 += iplusun + ',';
                setItemOutline(nia07f10_nodes[i], 'orange', 'nia07f41', '07-F');
              } else if (nia07f12_nodes && nia07f12_nodes.length > 0) {
                if (debug_flag)
                  console.log(
                    " - F4.2 Un problème a été detecté pour l'élement de menu n°" +
                      iplusun
                  );
                nia07f_list42 += iplusun + ',';
                setItemOutline(nia07f10_nodes[i], 'orange', 'nia07f42', '07-F');
              } else if (nia07f13_nodes && nia07f13_nodes.length > 0) {
                if (debug_flag)
                  console.log(
                    " - F4.3 Un problème a été detecté pour l'élement de menu n°" +
                      iplusun
                  );
                nia07f_list43 += iplusun + ',';
                setItemOutline(nia07f10_nodes[i], 'orange', 'nia07f43', '07-F');
              } else if (
                nia07f11_nodes &&
                (nia07f11_nodes[0].hasAttribute('aria-expanded') ||
                  nia07f11_nodes[0].hasAttribute('aria-haspopup'))
              ) {
                if (debug_flag)
                  console.log(
                    " - F4.4 Un problème a été detecté pour l'élement de menu n°" +
                      iplusun
                  );
                nia07f_list44 += iplusun + ',';
                setItemOutline(nia07f10_nodes[i], 'orange', 'nia07f44', '07-F');
              } else {
                if (debug_flag)
                  console.log(
                    " - L'item de menu " + iplusun + ' sans sous-menu est OK'
                  );
              }
            }
          }
        }

        if (nia07f_list21 != '') {
          setItemToResultList(
            'dev',
            "<li><a href='#' data-destination='nia07f21' class='result-focus label-orange'>07-F</a> Absence de lien pour se rendre à la page passerelle <span class='cy-hidden'>pour l'élément de menu n°" +
              nia07f_list21.slice(0, -1) +
              '</span></li>'
          );
        }
        if (nia07f_list22 != '') {
          setItemToResultList(
            'dev',
            "<li><a href='#' data-destination='nia07f22' class='result-focus label-orange'>07-F</a> : Absence de bouton pour déplier le sous-menu<span class='cy-hidden'> pour l'élement de menu n°" +
              nia07f_list22.slice(0, -1) +
              '</span></li>'
          );
        }
        if (nia07f_list23 != '') {
          setItemToResultList(
            'dev',
            "<li><a href='#' data-destination='nia07f23' class='result-focus label-orange'>07-F</a> : Un problème a été detecté <span class='cy-hidden'>pour l'élement de menu n°" +
              nia07f_list23.slice(0, -1) +
              '</span>: absence de sous-menu alors que la classe has-subnav est présente</li>'
          );
        }
        if (nia07f_list24 != '') {
          setItemToResultList(
            'dev',
            "<li><a href='#' data-destination='nia07f24' class='result-focus label-orange'>07-F</a> : Un problème a été detecté <span class='cy-hidden'>pour l'élement de menu n°" +
              nia07f_list24.slice(0, -1) +
              "</span>: absence de l'attribut aria-expanded</li>"
          );
        }
        if (nia07f_list31 != '') {
          setItemToResultList(
            'dev',
            "<li><a href='#' data-destination='nia07f31' class='result-focus label-orange'>07-F</a> : Un problème a été detecté <span class='cy-hidden'>pour l'élement de menu n°" +
              nia07f_list31.slice(0, -1) +
              '</span>: conflit sur le lien pour aller sur la page passerelle</li>'
          );
        }
        if (nia07f_list32 != '') {
          setItemToResultList(
            'dev',
            "<li><a href='#' data-destination='nia07f32' class='result-focus label-orange'>07-F</a> : Un problème a été detecté <span class='cy-hidden'>pour l'élement de menu n°" +
              nia07f_list32.slice(0, -1) +
              '</span>: absence de bouton pour déplier le sous-menu</li>'
          );
        }
        if (nia07f_list33 != '') {
          setItemToResultList(
            'dev',
            "<li><a href='#' data-destination='nia07f33' class='result-focus label-orange'>07-F</a> : Un problème a été detecté <span class='cy-hidden'>pour l'élement de menu n°" +
              nia07f_list33.slice(0, -1) +
              '</span>: absence de sous-menu alors que la classe has-subnav est présente)</li>'
          );
        }
        if (nia07f_list34 != '') {
          setItemToResultList(
            'dev',
            "<li><a href='#' data-destination='nia07f34' class='result-focus label-orange'>07-F</a> : Un problème a été detecté <span class='cy-hidden'>pour l'élement de menu n°" +
              nia07f_list34.slice(0, -1) +
              "</span>: absence de l'attribut aria-expanded</li>"
          );
        }
        if (nia07f_list41 != '') {
          setItemToResultList(
            'dev',
            "<li><a href='#' data-destination='nia07f41' class='result-focus label-orange'>07-F</a> : Un problème a été detecté <span class='cy-hidden'>pour l'élement de menu n°" +
              nia07f_list41.slice(0, -1) +
              '</span>: absence de lien pour acceder aux pages passerelle.</li>'
          );
        }
        if (nia07f_list42 != '') {
          setItemToResultList(
            'dev',
            "<li><a href='#' data-destination='nia07f42' class='result-focus label-orange'>07-F</a> : Un problème a été detecté <span class='cy-hidden'>pour l'élement de menu n°" +
              nia07f_list42.slice(0, -1) +
              '</span>: remplacer les boutons par des liens de navigation</li>'
          );
        }
        if (nia07f_list43 != '') {
          setItemToResultList(
            'dev',
            "<li><a href='#' data-destination='nia07f43' class='result-focus label-orange'>07-F</a> : Un problème a été detecté <span class='cy-hidden'>pour l'élement de menu n°" +
              nia07f_list43.slice(0, -1) +
              '</span>: un item du menu sans sous-menu contient une liste ul</li>'
          );
        }
        if (nia07f_list44 != '') {
          setItemToResultList(
            'dev',
            "<li><a href='#' data-destination='nia07f44' class='result-focus label-orange'>07-F</a> : Un problème a été detecté <span class='cy-hidden'>pour l'élement de menu n°" +
              nia07f_list44.slice(0, -1) +
              "</span>: présence d'attributs aria-expanded ou aria-haspopup sur un item du menu</li>"
          );
        }
      }

      // On resize pour voir le menu (Attention certain attributs sont ajouté en JS)
      // window.resizeTo(320, 500);
      // document.body.style.zoom = "400%";

      // Check si le menu mobile s'ouvre en disclosure ou en modale
      const nia07f20_btn = document.querySelector(
        '.topnav > button.anchor.anchor-scroll, .page-headernav > button.anchor.anchor-scroll, .page-headernavmobile > button.anchor.anchor-scroll'
      );
      const nia07f21_btnClose = document.querySelector(
        '[aria-modal="true"] button.anchor.anchor-close'
      );
      if (
        nia07f20_btn &&
        (isItemVisible(nia07f20_btn) ||
          (nia07f21_btnClose && isItemVisible(nia07f21_btnClose)))
      ) {
        const nia07f20_btnText = nia07f20_btn.innerText;
        const nia07f20_btnDest = nia07f20_btn.getAttribute('data-destination');
        const nia07f30_Dest = document.querySelector(nia07f20_btnDest);

        if (!nia07f20_btn.hasAttribute('aria-expanded')) {
          nia07f_isModal = true;
          if (debug_flag)
            console.log(" - Le menu mobile s'ouvre dans une modale");
          if (!nia07f20_btn.hasAttribute('aria-haspopup') && !only_error) {
            if (debug_flag)
              console.log(
                " - F5.1 : Absence de l'attribut aria-haspopup=dialog du bouton d'ouverture du menu"
              );
            setItemToResultList(
              'dev',
              "<li><a href='#' data-destination='nia07f51' class='result-focus label-yellow'>07-F</a> : Absence de l'attribut aria-haspopup=dialog du bouton d'ouverture du menu</li>"
            );
            setItemOutline(nia07f20_btn, 'yellow', 'nia07f51', '07-F');
          }
        } else {
          if (debug_flag)
            console.log(" - Le menu mobile s'ouvre dans un disclosure");

          if (nia07f20_btn.getAttribute('aria-expanded') == true) {
            if (debug_flag)
              console.log(
                " - F5.2 : Erreur dans la valeur de l'attribut aria-expanded du bouton d'ouverture du menu"
              );
            setItemToResultList(
              'dev',
              "<li><a href='#' data-destination='nia07f52' class='result-focus label-red'>07-F</a> : Erreur dans la valeur de l'attribut aria-expanded du bouton d'ouverture du menu</li>"
            );
            setItemOutline(nia07f20_btn, 'red', 'nia07f52', '07-F');
          }

          if (
            Boolean(nia07f30_Dest.closest('[role="dialog"]')) ||
            Boolean(nia07f30_Dest.closest('[aria-modal="true"]'))
          ) {
            if (debug_flag)
              console.log(
                " - F5.3 : Conflit dans le type d'ouverture du menu : Modal ou Disclosure ?"
              );
            setItemToResultList(
              'dev',
              "<li><a href='#' data-destination='nia07f53' class='result-focus label-red'>07-F</a> : Conflit dans le type d'ouverture du menu : Modal ou Disclosure ?</li>"
            );
            setItemOutline(nia07f30_Dest, 'red', 'nia07f53', '07-F');
          }

          if (nia07f20_btn.hasAttribute('aria-haspopup')) {
            if (debug_flag)
              console.log(
                " - F5.4 : Conflit entre les attributs aria-haspopup et aria-expanded du bouton d'ouverture du menu"
              );
            setItemToResultList(
              'dev',
              "<li><a href='#' data-destination='nia07f54' class='result-focus label-red'>07-F</a> : Conflit entre les attributs aria-haspopup et aria-expanded du bouton d'ouverture du menu</li>"
            );
            setItemOutline(nia07f20_btn, 'red', 'nia07f54', '07-F');
          }
        }
        if (
          nia07f30_Dest.hasAttribute('aria-hidden') &&
          nia07f30_Dest.getAttribute('aria-hidden') == false
        ) {
          if (debug_flag)
            console.log(' - F5.5 : Vocalisation du menu caché en mobile');
          setItemToResultList(
            'dev',
            "<li><a href='#' data-destination='nia07f55' class='result-focus label-red'>07-F</a> : Vocalisation du menu caché en mobile</li>"
          );
          setItemOutline(nia07f30_Dest, 'red', 'nia07f55', '07-F');
        }

        // On click sur le bouton pour ouvrir le menu (s'il n'est pas déjà ouvert)
        if (!isItemVisible(nia07f30_Dest)) nia07f20_btn.click();

        const lang = nia07f20_btn.closest('[lang]').getAttribute('lang');

        if (
          sanitizeText(nia07f20_btn.innerText, lang) !=
          sanitizeText(nia07f20_btnText, lang)
        ) {
          if (debug_flag)
            console.log(
              " - F6.1 Attention le texte du bouton d'ouverture du menu à changé cela ne devrai pas être le cas"
            );
          if (debug_flag) console.log(nia07f20_btn.innerText);
          if (debug_flag) console.log(nia07f20_btnText);
          setItemToResultList(
            'dev',
            "<li><a href='#' data-destination='nia07f61' class='result-focus label-red'>07-F</a> : Attention le texte du bouton d'ouverture du menu change à l'ouverture du menu cela ne devrai pas être le cas</li>"
          );
          setItemOutline(nia07f20_btn, 'red', 'nia07f61', '07-F');
        }

        if (nia07f_isModal) {
          // une fois ouvert, #headernav-mobile possède un attribut aria-hidden="false" aria-modal="true" role="dialog" aria-label="Menu principal"
          if (
            nia07f30_Dest.hasAttribute('aria-hidden') &&
            nia07f30_Dest.getAttribute('aria-hidden') != 'false'
          ) {
            if (debug_flag)
              console.log(
                " - F6.2 Erreur dans la valeur de l'attribut aria-hidden du menu modal ouvert"
              );
            if (debug_flag)
              console.log(nia07f30_Dest.getAttribute('aria-hidden'));
            if (debug_flag)
              console.log(nia07f30_Dest.getAttribute('aria-hidden') != 'false');
            setItemToResultList(
              'dev',
              "<li><a href='#' data-destination='nia07f62' class='result-focus label-red'>07-F</a> : Erreur dans la valeur de l'attribut aria-hidden du menu modal ouvert</li>"
            );
            setItemOutline(nia07f30_Dest, 'red', 'nia07f62', '07-F');
          }

          if (
            !nia07f30_Dest.hasAttribute('aria-modal') ||
            nia07f30_Dest.getAttribute('aria-modal') != 'true'
          ) {
            if (debug_flag)
              console.log(
                " - F6.3 Erreur dans la valeur de l'attribut aria-modal du menu modal ouvert"
              );
            if (debug_flag)
              console.log(!nia07f30_Dest.hasAttribute('aria-modal'));
            if (debug_flag)
              console.log(nia07f30_Dest.getAttribute('aria-modal') != 'true');
            setItemToResultList(
              'dev',
              "<li><a href='#' data-destination='nia07f63' class='result-focus label-red'>07-F</a> : Erreur dans la valeur de l'attribut aria-modal du menu modal ouvert</li>"
            );
            setItemOutline(nia07f30_Dest, 'red', 'nia07f63', '07-F');
          }

          if (
            !nia07f30_Dest.hasAttribute('role') ||
            nia07f30_Dest.getAttribute('role') != 'dialog'
          ) {
            if (debug_flag)
              console.log(
                " - F6.4 Erreur dans la valeur de l'attribut role du menu modal ouvert"
              );
            setItemToResultList(
              'dev',
              "<li><a href='#' data-destination='nia07f64' class='result-focus label-red'>07-F</a> : Erreur dans la valeur de l'attribut role du menu modal ouvert</li>"
            );
            setItemOutline(nia07f30_Dest, 'red', 'nia07f64', '07-F');
          }

          if (
            !(
              nia07f30_Dest.hasAttribute('aria-label') ||
              nia07f30_Dest.hasAttribute('aria-labelledby')
            )
          ) {
            if (debug_flag)
              console.log(
                " - F6.5 Erreur dans la valeur de l'attribut aria-label du menu modal ouvert"
              );
            setItemToResultList(
              'dev',
              "<li><a href='#' data-destination='nia07f65' class='result-focus label-red'>07-F</a> : Erreur dans la valeur de l'attribut aria-label du menu modal ouvert</li>"
            );
            setItemOutline(nia07f30_Dest, 'red', 'nia07f65', '07-F');
          }
          // le premier élément de cette modale est un button.anchor-close
          if (
            nia07f30_Dest.firstChild.tagName == 'BUTTON' &&
            nia07f30_Dest.firstChild.className.contains('anchor-close')
          ) {
            if (debug_flag)
              console.log(
                ' - F6.6 Erreur au niveau du bouton close du menu modal ouvert'
              );
            setItemToResultList(
              'dev',
              "<li><a href='#' data-destination='nia07f66' class='result-focus label-red'>07-F</a> : Erreur au niveau du bouton close du menu modal ouvert</li>"
            );
            setItemOutline(nia07f30_Dest, 'red', 'nia07f66', '07-F');
          }
        } else {
          // une fois ouvert, #headernav-mobile possède un attribut aria-hidden="false" - Absence de aria-modal="true" role="dialog"
          if (
            nia07f30_Dest.hasAttribute('aria-hidden') &&
            nia07f30_Dest.getAttribute('aria-hidden') != false
          ) {
            if (debug_flag)
              console.log(
                " - F6.7 Erreur dans la valeur de l'attribut aria-hidden du menu disclosure ouvert"
              );
            setItemToResultList(
              'dev',
              "<li><a href='#' data-destination='nia07f67' class='result-focus label-red'>07-F</a> : Erreur dans la valeur de l'attribut aria-hidden du menu disclosure ouvert</li>"
            );
            setItemOutline(nia07f30_Dest, 'red', 'nia07f67', '07-F');
          }

          if (
            nia07f30_Dest.hasAttribute('aria-modal') &&
            nia07f30_Dest.getAttribute('aria-modal') == true
          ) {
            if (debug_flag)
              console.log(
                " - F6.8 Erreur dans la valeur de l'attribut aria-modal du menu disclosure ouvert"
              );
            setItemToResultList(
              'dev',
              "<li><a href='#' data-destination='nia07f68' class='result-focus label-red'>07-F</a> : Erreur dans la valeur de l'attribut aria-modal du menu disclosure ouvert</li>"
            );
            setItemOutline(nia07f30_Dest, 'red', 'nia07f68', '07-F');
          }

          if (
            nia07f30_Dest.hasAttribute('role') &&
            nia07f30_Dest.getAttribute('role') == 'dialog'
          ) {
            if (debug_flag)
              console.log(
                " - F6.9 Erreur dans la valeur de l'attribut role du menu disclosure ouvert"
              );
            setItemToResultList(
              'dev',
              "<li><a href='#' data-destination='nia07f69' class='result-focus label-red'>07-F</a> : Erreur dans la valeur de l'attribut role du menu disclosure ouvert</li>"
            );
            setItemOutline(nia07f30_Dest, 'red', 'nia07f69', '07-F');
          }
        }
        // On ferme le menu
        if (isItemVisible(nia07f20_btn)) {
          nia07f20_btn.click();
        } else if (nia07f21_btnClose && isItemVisible(nia07f21_btnClose)) {
          nia07f21_btnClose.click();
        }
      }
      //window.resizeTo(currentWidth, currentHeight);
    }
  }
}

// G Structure globale du menu
function check_test_07g() {
  if (!only_redactor && isAEM) {
    const nia07g1_nodes = document.querySelectorAll(
      'nav#headernav .nav--primary:not(ul), nav#headernav ul.nav--primary > .nav-item:not(li), nav#headernav ul.nav--primary > li.nav-item.has-subnav .subnav-item:not(li)'
    );
    if (nia07g1_nodes && nia07g1_nodes.length > 0) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia07g1' class='result-focus label-red'>07-G</a> : Les items du menu et du sous menu sont sous forme de liste ul/li</li>"
      );
      setItemsOutline(nia07g1_nodes, 'red', 'nia07g1', '07-G');
    }

    const nia07g2_nodes = document.querySelectorAll(
      'nav#headernav :is(a,button)'
    );
    let nia07g2_flag = false;
    if (nia07g2_nodes && nia07g2_nodes.length > 0) {
      for (let i = 0; i < nia07g2_nodes.length; i++) {
        if (
          !nia07g2_nodes[i].textContent ||
          nia07g2_nodes[i].textContent == ''
        ) {
          nia07g2_flag = true;
          setItemsOutline(nia07g2_nodes, 'red', 'nia07g2', '07-G');
        }
      }
    }
    if (nia07g2_flag == true) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia07g2' class='result-focus label-red'>07-G</a> : Les éléments du menu et des sous_menus doivent avoir un intitulé </li>"
      );
    }

    const nia07g3_nodes = document.querySelectorAll('nav#headernav li a');
    let nia07g3_items;
    let nia07g3_flag = false;
    let nia07g4_flag = false;
    let nia07g5_counter = 0;
    if (nia07g3_nodes && nia07g3_nodes.length > 0) {
      for (let i = 0; i < nia07g3_nodes.length; i++) {
        if (nia07g3_nodes[i].hasAttribute('aria-current')) {
          if (nia07g3_nodes[i].getAttribute('aria-current') == 'page') {
            nia07g5_counter++;
            if (
              nia07g3_nodes[i].parentElement.classList.contains('subnav-item')
            ) {
              if (
                !nia07g3_nodes[i].parentElement.closest('has-subnav') ||
                !nia07g3_nodes[i].parentElement
                  .closest('has-subnav')
                  .firstElementChild.hasAttribute('aria-current') ||
                nia07g3_nodes[i].parentElement
                  .closest('has-subnav')
                  .firstElementChild.getAttribute('aria-current') != 'true'
              ) {
                if (debug_flag == true) {
                  console.log(
                    !nia07g3_nodes[i].parentElement.closest('has-subnav')
                  );
                  console.log(
                    !nia07g3_nodes[i].parentElement
                      .closest('has-subnav')
                      .firstElementChild.hasAttribute('aria-current')
                  );
                  console.log(
                    nia07g3_nodes[i].parentElement
                      .closest('has-subnav')
                      .firstElementChild.getAttribute('aria-current') != 'true'
                  );
                }
                nia07g3_flag = true;
                setItemOutline(nia07g3_nodes[i], 'red', 'nia07g3', '07-G');
              }
            }
          } else if (
            nia07g3_nodes[i].getAttribute('aria-current') == 'true' &&
            nia07g3_nodes[i].parentElement.classList.contains('has-subnav')
          ) {
            nia07g3_items = nia07g3_nodes[i].parentElement.querySelectorAll(
              '.subnav-item > a[aria-current="page"], .subnav-item > a[aria-current="true"]'
            );
            //console.log(nia07g3_items);
            if (!nia07g3_items || nia07g3_items.length != 1) {
              nia07g4_flag = true;
              setItemOutline(nia07g3_nodes[i], 'red', 'nia07g4', '07-G');
            }
          }
        }
      }
    }

    if (nia07g3_flag == true) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia07g3' class='result-focus label-red'>07-G</a> : Les pages parentes de la page courante doivent avoir un attribut aria_current= 'true' </li>"
      );
    }
    if (nia07g4_flag == true) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia07g4' class='result-focus label-red'>07-G</a> : Une des pages enfant d'un menu actif doit avoir un attribut aria_current= 'page' </li>"
      );
    }
    if (nia07g5_counter > 1) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia07g5' class='result-focus label-red'>07-G</a> : Il ne peut y avoir qu'un seul élément dans le menu avec l'attribut aria-current=page </li>"
      );
      setItemOutline(nia07g3_nodes[0].parentElement, 'red', 'nia07g5', '07-G');
    }
  } else if (!only_error) {
    setItemToResultList(
      'man',
      "<li><span class='result-focus label-gray'>07-F</span> : Absence de barre de navigation</li>"
    );
  }
}

/*- -------------------------------------------------------------------------------- */
/* 🗸 NIA-08 Tableau : Thématique RAWeb 5
Vérification de plusieurs points concernant les tableaux
 o Présence des bons attributs sur les tableaux « scope » sur les éléments de header
 o Eviter les éléments ajoutés par les copier/coller de word.
 o vérification d’erreurs courantes.
*/
function check_part_08() {
  if (debug_flag) console.log('08 Tableau');

  check_test_08a();
  check_test_08b();
  check_test_08c();
  check_test_08d();
  check_test_08e();
  check_test_08f();
}

// A. Attribut de tableau
function check_test_08a() {
  const nia08a_nodes = document.querySelectorAll(
    ':where([role="table"],table:not([role="presentation"])) th:not([scope="row"]):not([scope="col"]):not([id]):not([headers]):not([role="rowheader"]):not([role="columnheader"]):not(:only-child)'
  );
  if (nia08a_nodes && nia08a_nodes.length > 0 && isItemsVisible(nia08a_nodes)) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia08a' class='result-focus label-red'>08-A</a> : Absence de l'attribut scope sur les en-tete de tableau [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-5-7-1' target='_blank'>RAWeb 5.7.1</a>]</li>"
    );
    setItemsOutline(nia08a_nodes, 'red', 'nia08a', '08-A');
  }
}

// B. Attribut deprecated
function check_test_08b() {
  const nia08b_nodes = document.querySelectorAll(
    ':where([role="table"],table):where([align],[bgcolor],[border],[frame],[cellpadding],[cellspacing],[width],[summary],[rules])'
  );
  if (nia08b_nodes && nia08b_nodes.length > 0 && isItemsVisible(nia08b_nodes)) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia08b' class='result-focus label-red'>08-B</a> : Presence d'attribut obsolete sur un tableau</li>"
    );
    setItemsOutline(nia08b_nodes, 'red', 'nia08b', '08-B');
  }
}

// C. Attribut de tableaux deprecated
function check_test_08c() {
  if (!only_error) {
    const nia08c_nodes = document.querySelectorAll('th[header], td[header]');
    if (
      nia08c_nodes &&
      nia08c_nodes.length > 0 &&
      isItemsVisible(nia08c_nodes)
    ) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia08c' class='result-focus label-yellow'>08-C</a> : Presence attributs header obsolete dans un tableau</li>"
      );
      setItemsOutline(nia08c_nodes, 'yellow', 'nia08c', '08-C');
    }
  }
}

// D. Tableau de mise en forme
function check_test_08d() {
  const nia08d_nodes = document.querySelectorAll(
    'table[role="presentation"][summary], table[role="presentation"] :where(caption,thead,th,tfoot,[role="rowheader"],[role="columnheader"],td[scope],td[headers],td[axis])'
  );
  if (nia08d_nodes && nia08d_nodes.length > 0 && isItemsVisible(nia08d_nodes)) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia08d' class='result-focus label-red'>08-D</a> : Presence d'élements incompatible avec un tableau de mise en forme [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-5-8-1' target='_blank'>RAWeb 5.8.1</a>]</li>"
    );
    setItemsOutline(nia08d_nodes, 'red', 'nia08d', '08-D');
  }
}

// E. Chaque tableau à un entete de ligne ou de colonne balisé avec th ou role="columnheader" ou role="rowheader"
function check_test_08e() {
  const nia08e_nodes = document.querySelectorAll(
    ':where([role="table"],table:not([role="presentation"]))'
  );
  let nia08e_flag = false;
  let nia08e_html = '';
  if (nia08e_nodes && nia08e_nodes.length > 0) {
    for (let i = 0; i < nia08e_nodes.length; i++) {
      nia08e_html = nia08e_nodes[i].innerHTML;
      if (
        nia08e_html.indexOf('<th') < 0 &&
        nia08e_html.indexOf(' role="columnheader"') < 0 &&
        nia08e_html.indexOf(' role="rowheader"') < 0
      ) {
        if (debug_flag) console.log(nia08e_html);
        setItemOutline(nia08e_nodes[i], 'red', 'nia08e', '08-E');
        nia08e_flag = true;
      }
    }
  }
  if (nia08e_flag == true) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia08e' class='result-focus label-red'>08-E</a> : Présence d'un tableau de données sans en-tête [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-5-6-1' target='_blank'>RAWeb 5.6.1</a>]</li>"
    );
  }
}

// F Chaque tableau de donnée complexe possède un Caption()
function check_test_08f() {
  const nia08f_nodes = document.querySelectorAll(
    'table:not([summary]):not([aria-describedby]):not([role="presentation"])'
  );
  let nia08f_flag_data = false;
  let nia08f_flag_complex = false;
  let nia08f_caption = '';
  if (nia08f_nodes && nia08f_nodes.length > 0 && isItemsVisible(nia08f_nodes)) {
    for (let i = 0; i < nia08f_nodes.length; i++) {
      nia08f_caption = nia08f_nodes[i].querySelector(':scope > caption');
      if (nia08f_caption == null || nia08f_caption.textContent == '') {
        if (debug_flag) console.log(nia08f_nodes[i]);
        if (isTableComplex(nia08f_nodes[i])) {
          setItemOutline(nia08f_nodes[i], 'red', 'nia08f1', '08-F');
          nia08f_flag_complex = true;
        } else if (!only_error) {
          setItemOutline(nia08f_nodes[i], 'yellow', 'nia08f2', '08-F');
          nia08f_flag_data = true;
        }
      }
    }
  }
  if (nia08f_flag_complex == true) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia08f1' class='result-focus label-red'>08-F</a> : Présence d'un tableau complexe sans résumé</li>"
    );
  }
  if (nia08f_flag_data == true) {
    setItemToResultList(
      'nth',
      "<li><a href='#' data-destination='nia08f2' class='result-focus label-yellow'>08-F</a> : Présence d'un tableau de données sans résumé</li>"
    );
  }

  /* Tableau complexe : Lorsqu’un tableau de données contient des en-têtes qui ne sont pas répartis uniquement sur la première ligne et/ou la première colonne de la grille ou dont la portée n’est pas valable pour l’ensemble de la colonne ou de la ligne, on parle de tableau de données complexe. Il est alors nécessaire de fournir un « résumé » permettant d’en expliquer sa nature et sa structure afin d’en faciliter la consultation pour des utilisateurs de technologies d’assistance par exemple. */
  function isTableComplex(elem) {
    const th_etrange = elem.querySelectorAll(
      'tbody > tr > *:not(*:first-child)'
    );
    for (let i = 0; i < th_etrange.length; i++) {
      if (th_etrange[i].nodeName == 'TH') {
        return true;
      }
    }
    const th_all = elem.querySelectorAll('tr > th');
    for (let i = 0; i < th_all.length; i++) {
      if (
        th_all[i].hasAttribute('rowSpan') &&
        th_all[i].getAttribute('rowSpan') > 1
      ) {
        return true;
      }
      if (
        th_all[i].hasAttribute('colSpan') &&
        th_all[i].getAttribute('colSpan') > 1
      ) {
        return true;
      }
    }
    return false;
  }
}

/*- -------------------------------------------------------------------------------- */
/* 🗸 NIA-09 Navigation
Vérification de plusieurs points concernant la navigation dans le site
 o Pertinance du plan du site
 o Mise en avant des éléments possédant un tabindex  positif dans le contenu
 */
function check_part_09() {
  if (debug_flag) console.log('09 Navigation');

  check_test_09a();
  check_test_09b();
  check_test_09c();
  check_test_09d();
  check_test_09e();
  check_test_09f();
}

// A Pertinence du plan du site
function check_test_09a() {
  if (isSitemap && isAEM) {
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

    // Erreur si le lien existe dans le footer mais pas dans la map ou inversement

    if (
      nia09a1_footer &&
      nia09a1_footer.length > 0 &&
      (!nia09a1_sitemap || nia09a1_sitemap.length == 0)
    ) {
      if (nia09a5_support && nia09a5_support.length > 0) {
        if (!only_error) {
          setItemToResultList(
            'man',
            "<li><a href='#' data-destination='nia09a1' class='result-focus label-yellow'>09-A</a> : Présence de la page support mais il manque la page contact dans le plan du site, vérifier si c'est volontaire [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>"
          );
          setItemsOutline(nia09a1_footer, 'yellow', 'nia09a1', '09-A');
        }
      } else {
        setItemToResultList(
          'nc',
          "<li><a href='#' data-destination='nia09a1' class='result-focus label-red'>09-A</a> : Il manque la page contact dans le plan du site [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>"
        );
        setItemsOutline(nia09a1_footer, 'red', 'nia09a1', '09-A');
      }
    } else if (
      nia09a1_sitemap &&
      nia09a1_sitemap.length > 0 &&
      (!nia09a1_footer || nia09a1_footer.length == 0)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia09a1' class='result-focus label-red'>09-A</a> : Il manque la page contact dans le footer [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>"
      );
      setItemsOutline(nia09a1_sitemap, 'red', 'nia09a1', '09-A');
    }

    if (
      nia09a2_footer &&
      nia09a2_footer.length > 0 &&
      (!nia09a2_sitemap || nia09a2_sitemap.length == 0)
    ) {
      if (nia09a5_support && nia09a5_support.length > 0) {
        if (!only_error) {
          setItemToResultList(
            'man',
            "<li><a href='#' data-destination='nia09a2' class='result-focus label-yellow'>09-A</a> : Présence de la page support mais il manque la page Accessibilté dans le plan du site, vérifier si c'est volontaire [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>"
          );
          setItemsOutline(nia09a2_footer, 'yellow', 'nia09a2', '09-A');
        }
      } else {
        setItemToResultList(
          'nc',
          "<li><a href='#' data-destination='nia09a2' class='result-focus label-red'>09-A</a> : Il manque la page Accessibilité dans le plan du site [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>"
        );
        setItemsOutline(nia09a2_footer, 'red', 'nia09a2', '09-A');
      }
    } else if (
      nia09a2_sitemap &&
      nia09a2_sitemap.length > 0 &&
      (!nia09a2_footer || nia09a2_footer.length == 0)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia09a2' class='result-focus label-red'>09-A</a> : Il manque la page Accessibilité dans le footer [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>"
      );
      setItemsOutline(nia09a2_sitemap, 'red', 'nia09a2', '09-A');
    }

    if (
      nia09a3_footer &&
      nia09a3_footer.length > 0 &&
      (!nia09a3_sitemap || nia09a3_sitemap.length == 0)
    ) {
      if (nia09a5_support && nia09a5_support.length > 0) {
        if (!only_error) {
          setItemToResultList(
            'man',
            "<li><a href='#' data-destination='nia09a3' class='result-focus label-yellow'>09-A</a> : Présence de la page support mais il manque la page Aspect légaux dans le plan du site, vérifier si c'est volontaire [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>"
          );
          setItemsOutline(nia09a3_footer, 'yellow', 'nia09a3', '09-A');
        }
      } else {
        setItemToResultList(
          'nc',
          "<li><a href='#' data-destination='nia09a3' class='result-focus label-red'>09-A</a> : Il manque la page aspect légaux dans le plan du site [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>"
        );
        setItemsOutline(nia09a3_footer, 'red', 'nia09a3', '09-A');
      }
    } else if (
      nia09a3_sitemap &&
      nia09a3_sitemap.length > 0 &&
      (!nia09a3_footer || nia09a3_footer.length == 0)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia09a3' class='result-focus label-red'>09-A</a> : Il manque la page aspect légaux dans le footer [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>"
      );
      setItemsOutline(nia09a3_sitemap, 'red', 'nia09a3', '09-A');
    }

    if (
      nia09a4_footer &&
      nia09a4_footer.length > 0 &&
      (!nia09a4_sitemap || nia09a4_sitemap.length == 0)
    ) {
      if (nia09a5_support && nia09a5_support.length > 0) {
        if (!only_error) {
          setItemToResultList(
            'man',
            "<li><a href='#' data-destination='nia09a4' class='result-focus label-yellow'>09-A</a> : Présence de la page support mais il manque la page A propos dans le plan du site, vérifier si c'est volontaire [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>"
          );
          setItemsOutline(nia09a4_footer, 'yellow', 'nia09a4', '09-A');
        }
      } else {
        setItemToResultList(
          'nc',
          "<li><a href='#' data-destination='nia09a4' class='result-focus label-red'>09-A</a> : Il manque la page A propos dans le plan du site [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>"
        );
        setItemsOutline(nia09a4_footer, 'red', 'nia09a4', '09-A');
      }
    } else if (
      nia09a4_sitemap &&
      nia09a4_sitemap.length > 0 &&
      (!nia09a4_footer || nia09a4_footer.length == 0)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia09a4' class='result-focus label-red'>09-A</a> : Il manque la page A propos dans le footer [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>"
      );
      setItemsOutline(nia09a4_sitemap, 'red', 'nia09a4', '09-A');
    }
  }
}

// B Page indésirable dans le plan du site
function check_test_09b() {
  if (isSitemap && isAEM) {
    const nia09b_nodes = document.querySelector(
      '.cmp-sitemap a[href*="error.html"]'
    );
    if (nia09b_nodes && isItemVisible(nia09b_nodes)) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia09b' class='result-focus label-orange'>09-B</a> : Presence de la page Error dans le plan du site</li>"
      );
      setItemsOutline(nia09b_nodes.parentElement, 'orange', 'nia09b', '09-B');
    }
  }
}

// C. Presence d'attibut tabindex positif
function check_test_09c() {
  if (!only_redactor) {
    const nia09c_nodes = document.querySelectorAll(
      '[tabindex]:not([tabindex="0"]):not([tabindex="-1"])'
    );
    if (
      nia09c_nodes &&
      nia09c_nodes.length > 0 &&
      isItemsVisible(nia09c_nodes)
    ) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia09c' class='result-focus label-orange'>09-C</a> : Presence d'attibut tabindex positif [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-8-1' target='_blank'>RAWeb 12.8.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/la-navigation-au-clavier-seffectue-dans-un-ordre-previsible' target='_blank'>Opquast 162</a>]</li>"
      );
      setItemsOutline(nia09c_nodes, 'orange', 'nia09c', '09-C');
    }
  }
}

// D. Présence de 2 systemes de navigation (plan du site, recherche, menu)
function check_test_09d() {
  if (isAEM && !isOnePage) {
    // Menu principal
    const nia09d_nav = document.querySelector(
      'nav #headernav, nav#headernav, *:not(#headerwrapper-mobile) > nav[class^="page-headernav"]:not(.page-headernavmobile)'
    );
    const nia09d_nav_fixed = document.querySelector(
      '.header-icons > nav.headernav-fixed'
    );
    const nia09d_nav_btn = document.querySelector(
      '[class^="page-headernav"] button.anchor[data-destination^="#headernav"]'
    );

    // Recherche
    const nia09d_search = document.querySelector(
      '*:not(#headerwrapper-mobile) > div.topsearch[role="search"]:not(:has(button.anchor)), div.topsearch-desk[role="search"], div.topsearch-desktop[role="search"]'
    );
    const nia09d_search_fixed = document.querySelector(
      '.header-icons > div.topsearch[role="search"]'
    );
    const nia09d_search_btn = document.querySelector(
      'div.topsearch[role="search"] button.anchor'
    );

    // Plan du site
    const nia09d_plan = document.querySelector(
      'footer .page-footernav ul > li.nav-item a[href*="plan"][href$=".html"]'
    );
    const nia09d_footer_links = document.querySelectorAll(
      'footer .nav-item > a:not([target="_blank"])'
    );

    let nia09d_counter = 0;
    if (nia09d_nav && isItemVisible(nia09d_nav)) {
      nia09d_counter++;
    } else if (nia09d_nav && nia09d_nav_btn && isItemVisible(nia09d_nav_btn)) {
      nia09d_counter++;
    } else if (
      nia09d_nav &&
      nia09d_nav_fixed &&
      isItemVisible(nia09d_nav_fixed)
    ) {
      nia09d_counter++;
    } else if (debug_flag) {
      console.log('navigation principale non trouvé');
    }

    if (nia09d_search && isItemVisible(nia09d_search)) {
      nia09d_counter++;
    } else if (
      nia09d_search &&
      nia09d_search_btn &&
      isItemVisible(nia09d_search_btn)
    ) {
      nia09d_counter++;
    } else if (
      nia09d_search &&
      nia09d_search_fixed &&
      isItemVisible(nia09d_search_fixed)
    ) {
      nia09d_counter++;
    } else if (debug_flag) {
      console.log('recherche non trouvée');
    }

    if (nia09d_plan && isItemVisible(nia09d_plan)) {
      nia09d_counter++;
    } else if (debug_flag) {
      console.log('plan du site non trouvé');
    }
    if (nia09d_counter < 2) {
      if (nia09d_footer_links && nia09d_footer_links.length <= 3) {
        if (!only_error) {
          setItemToResultList(
            'man',
            "<li><span class='result-focus label-yellow'>09-D</span> : Le site doit être muni de 2 systèmes de navigation (exception : One-page, etc.) [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-1-1' target='_blank'>RAWeb 12.1.1</a>]</li>"
          );
        }
      } else {
        setItemToResultList(
          'nc',
          "<li><span class='result-focus label-red'>09-D</span> : Le site doit être muni de 2 systèmes de navigation (exception : One-page, etc.) [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-1-1' target='_blank'>RAWeb 12.1.1</a>]</li>"
        );
      }
    }
  }
}

// E. Utilisation des Skiplinks
function check_test_09e() {
  if (!only_redactor && isAEM) {
    const nia09e1_nodes = document.querySelector(
      'body > .skiplinks a[href="#main"], body > .xfpage > .skiplinks a[href="#main"]'
    );
    if (nia09e1_nodes == null) {
      setItemToResultList(
        'nc',
        "<li><span class='result-focus label-red'>09-E</span> : Absence de skiplinks pour aller à la zone de contenu principale [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-7-1' target='_blank'>RAWeb 12.7.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-page-contient-des-liens-dacces-rapide-places-au-debut-du-code-source' target='_blank'>Opquast 159</a>]</li>"
      );
    }

    const nia09e2_nodes = document.querySelectorAll('.skiplinks a[href]');
    let nia09e2_flag = false;
    let nia09e2_dest = '';
    if (nia09e2_nodes && nia09e2_nodes.length > 0) {
      for (let i = 0; i < nia09e2_nodes.length; i++) {
        nia09e2_dest = document.querySelector(
          nia09e2_nodes[i].getAttribute('href')
        );
        if (nia09e2_dest == null) {
          if (debug_flag) console.log(nia09e2_nodes[i]);
          if (isItemDisplayNone(nia09e2_nodes[i])) {
            if (!only_error) {
              setItemToResultList(
                'man',
                "<li><span class='result-focus label-yellow'>09-E</span> : Un skiplinks non visible (display:none) n'a pas de destination [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-7-1' target='_blank'>RAWeb 12.7.1</a>]</li>"
              );
            }
          } else {
            nia09e2_flag = true;
          }
        }
      }
    }
    if (nia09e2_flag == true) {
      setItemToResultList(
        'dev',
        "<li><span class='result-focus label-red'>09-E</span> : Un skiplinks n'est pas correctement lié à sa destination [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-7-1' target='_blank'>RAWeb 12.7.1</a>]</li>"
      );
    }

    // Les skiplinks situé dans l’entête doivent être dans un élément <nav role=’navigation’> avec un aria_label
    if (!only_error) {
      const nia09e3_nodes = document.querySelector(
        'body > .skiplinks, body > .xfpage > .skiplinks'
      );
      if (
        nia09e3_nodes.firstElementChild &&
        (nia09e3_nodes.firstElementChild.nodeName != 'NAV' ||
          !nia09e3_nodes.firstElementChild.hasAttribute('aria-label') ||
          !nia09e3_nodes.firstElementChild.hasAttribute('role') ||
          nia09e3_nodes.firstElementChild.getAttribute('role') != 'navigation')
      ) {
        setItemToResultList(
          'nth',
          "<li><a href='#' data-destination='nia09e3' class='result-focus label-yellow'>09-E</a> : Les skiplinks doivent se trouver dans un element nav avec un aria-label et un role=navigation</li>"
        );
        setItemOutline(nia09e3_nodes, 'yellow', 'nia09e3', '09-E');
      }
    }

    // Les skiplinks situé dans l’entête doivent être les premiers éléments tabulable de la page (hors modale des cookies)
    if (!only_error) {
      const nia09e4_nodes = document.querySelectorAll(
        'body > *:not(#orejime):not(#a42-ac):not(.checkA11YSpan):not(link):not(svg.iconset)'
      );
      if (
        !nia09e4_nodes[0].classList.contains('skiplinks') &&
        !nia09e4_nodes[0].firstElementChild.classList.contains('skiplinks')
      ) {
        setItemToResultList(
          'nth',
          "<li><a href='#' data-destination='nia09e4' class='result-focus label-yellow'>09-E</a> : Les skiplinks situé dans l’entête doivent être les premiers éléments tabulable de la page (hors modale des cookies)</li>"
        );
        setItemOutline(nia09e4_nodes[0], 'yellow', 'nia09e4', '09-E');
      }
    }

    // S’il y a plusieurs Skiplinks, ils doivent être structurée sous forme de liste <ul>
    if (!only_error) {
      const nia09e5_nodes = document.querySelectorAll(
        'body > .skiplinks a[href]'
      );
      if (
        nia09e5_nodes &&
        nia09e5_nodes.length > 1 &&
        nia09e5_nodes[0].parentElement.nodeName != 'LI'
      ) {
        setItemToResultList(
          'nth',
          "<li><a href='#' data-destination='nia09e5' class='result-focus label-yellow'>09-E</a> : S’il y a plusieurs Skiplinks, ils doivent être structurée sous forme de liste 'ul'</li>"
        );
        setItemOutline(
          nia09e5_nodes[0].parentElement,
          'yellow',
          'nia09e5',
          '09-E'
        );
      }
    }
  }
}

// F taille des éléments interactifs minimum attendue est de 24px par 24px.
function check_test_09f() {
  if (!only_redactor && !only_error) {
    const nia09f_nodes = document.querySelectorAll(
      '*:not(.cmp-text) > *:not(p) > a:not(.feed-item-timing):not(.cmp-breadcrumb__item-link):not(.geoportail-skip):not(.cmp-image__link), button, input:not([type="file"]), select, details, textarea, [tabindex="0"], [tabindex="-1"]'
    );
    let nia09f_flag = false;
    let nia09f_rect, nia09f_rect_parent;
    let nia09f_horizontal = 0,
      nia09f_vertical = 0;
    let nia09f_horizontal_parent = 0,
      nia09f_vertical_parent = 0;
    if (nia09f_nodes && nia09f_nodes.length > 0) {
      for (let i = 0; i < nia09f_nodes.length; i++) {
        if (isItemVisible(nia09f_nodes[i]) && !isItemSROnly(nia09f_nodes[i])) {
          nia09f_rect = nia09f_nodes[i].getBoundingClientRect();
          nia09f_horizontal =
            nia09f_rect['width'] +
            parseFloat(window.getComputedStyle(nia09f_nodes[i])['marginLeft']) +
            parseFloat(window.getComputedStyle(nia09f_nodes[i])['marginRight']);
          nia09f_vertical =
            nia09f_rect['height'] +
            parseFloat(window.getComputedStyle(nia09f_nodes[i])['marginTop']) +
            parseFloat(
              window.getComputedStyle(nia09f_nodes[i])['marginBottom']
            );

          if (nia09f_rect['width'] != 0 && nia09f_rect['height'] != 0) {
            if (nia09f_horizontal < 24 || nia09f_vertical < 24) {
              if (
                nia09f_nodes[i].parentElement.tagName == 'LI' ||
                nia09f_nodes[i].parentElement.childElementCount == 1
              ) {
                nia09f_rect_parent =
                  nia09f_nodes[i].parentElement.getBoundingClientRect();
                nia09f_horizontal_parent =
                  nia09f_rect_parent['width'] +
                  parseFloat(
                    window.getComputedStyle(nia09f_nodes[i].parentElement)[
                      'marginLeft'
                    ]
                  ) +
                  parseFloat(
                    window.getComputedStyle(nia09f_nodes[i].parentElement)[
                      'marginRight'
                    ]
                  );
                nia09f_vertical_parent =
                  nia09f_rect_parent['height'] +
                  parseFloat(
                    window.getComputedStyle(nia09f_nodes[i].parentElement)[
                      'marginTop'
                    ]
                  ) +
                  parseFloat(
                    window.getComputedStyle(nia09f_nodes[i].parentElement)[
                      'marginBottom'
                    ]
                  );
                if (
                  nia09f_horizontal_parent < 24 ||
                  nia09f_vertical_parent < 24
                ) {
                  // console.log("09f1 : "+nia09f_horizontal+" "+nia09f_vertical);
                  // console.log("09f2 : "+nia09f_horizontal_parent+" "+nia09f_vertical_parent);

                  if (
                    nia09f_vertical_parent > 18 &&
                    nia09f_horizontal_parent > 50
                  ) {
                    // Exception In-line : Par exemple un lien dans un texte
                  } else {
                    if (debug_flag) console.log(nia09f_rect);
                    nia09f_flag = true;
                    setItemOutline(nia09f_nodes[i], 'yellow', 'nia09f', '09-F');
                  }
                }
              } else if (
                nia09f_nodes[i].parentElement.tagName != 'P' &&
                nia09f_nodes[i].parentElement.tagName != 'SPAN' &&
                nia09f_nodes[i].parentElement.tagName != 'SMALL' &&
                nia09f_nodes[i].parentElement.tagName != 'DD' &&
                nia09f_nodes[i].parentElement.tagName != 'STRONG'
              ) {
                if (debug_flag) console.log(nia09f_rect);
                nia09f_flag = true;
                setItemOutline(nia09f_nodes[i], 'yellow', 'nia09f', '09-F');
              } else if (nia09f_vertical > 18 && nia09f_horizontal > 50) {
                // Exception In-line : Par exemple un lien dans un texte
              } else {
                nia09f_flag = true;
                setItemOutline(nia09f_nodes[i], 'yellow', 'nia09f', '09-F');
              }
            }
          }
        }
      }
    }
    if (nia09f_flag == true) {
      setItemToResultList(
        'man',
        "<li><a href='#' data-destination='nia09f' class='result-focus label-yellow'>09-F</a> : Taille d'éléments interactifs minimum attendue est de 24px par 24px (marges comprises) [<a href='https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html' target='_blank'>WCAG 2.2 SC258</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/la-taille-des-elements-cliquables-est-suffisante' target='_blank'>Opquast 181</a>]</li>"
      );
    }
  }
}

/*- -------------------------------------------------------------------------------- */
/* 🗸 NIA-10 Old tag
Vérification de la présence d’attributs obsolètes.
*/
function check_part_10() {
  if (debug_flag) console.log('10 Old tag');

  check_test_10a();
  check_test_10b();
  check_test_10c();
  check_test_10d();
}

/* A. Old tag

*** Liste W3C ***
<acronym>	Defines an acronym
<applet>	Defines an applet
<basefont>	Defines an base font for the page.
<big>	Defines big text
<center>	Defines centered text
<dir>	Defines a directory list
<font>	Defines text font, size, and color
<frame>	Defines a frame
<frameset>	Defines a set of frames
<isindex>	Defines a single-line input field
<noframes>	Defines a noframe section
<s>	Defines strikethrough text
<strike>	Defines strikethrough text
<tt>	Defines teletype text
<u> 	Defines underlined text

*** Add du RAWeb 10.1.1 ***
<blink>
<marquee>

** Note : Attention au plugin Google Translate : Il ajoute automatiquement des balises <font> autour des textes traduits.
*/
function check_test_10a() {
  const nia10a_nodes = document.querySelectorAll(
    'acronym,applet,basefont,big,center,dir,font,frame,frameset,isindex,noframes,s,strike,tt,u,blink,marquee'
  ); // NC
  if (nia10a_nodes && nia10a_nodes.length > 0 && isItemsVisible(nia10a_nodes)) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia10a' class='result-focus label-red'>10-A</a> : Présence de balise HTML obsolètes ou servant à la présentation de l'information [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-10-1-1' target='_blank'>RAWeb 10.1.1</a>]</li>"
    );
    setItemsOutline(nia10a_nodes, 'red', 'nia10a', '10-A');
  }
}

// B. Old tag Nice-to-have
function check_test_10b() {
  // Exception pour les horaires : https://jira.intranet.etat.lu/browse/GUILUV3-1002
  if (!only_error) {
    const nia10b_nodes = document.querySelectorAll(
      'i, *:not(.cmp-hours__list) > * > * > b'
    ); // NtH
    if (
      nia10b_nodes &&
      nia10b_nodes.length > 0 &&
      isItemsVisible(nia10b_nodes)
    ) {
      setItemToResultList(
        'man',
        "<li><a href='#' data-destination='nia10b' class='result-focus label-yellow'>10-B</a> : Présence de balises 'i' ou 'b', voir pour les remplacer par 'em' et 'strong' lorsque nécessaire</li>"
      );
      setItemsOutline(nia10b_nodes, 'yellow', 'nia10b', '10-B');
    }
  }
}

/* C. Old attribut

--- Liste W3C ---
rev	link, a
charset	link and a
shape	a
coords	a
longdesc	img and iframe.
target	link
nohref	area
profile	head
version	html
name	img
scheme	meta
archive	object
classid	object
codebase	object
codetype	object
declare	object
standby	object
valuetype	param
type	param
axis	td and t
abbr	td and t
scope	td
align	caption, iframe, img, input, object, legend, table, hr, div, h1, h2, h3, h4, h5, h6, p, col, colgroup, tbody, td, tfoot, th, thead and tr.
alink	body
link	body
vlink	body
text	body
background	body
bgcolor	table, tr, td, th and body.
border	table and object.
cellpadding	table
cellspacing	table
char	col, colgroup, tbody, td, tfoot, th, thead and tr.
charoff	col, colgroup, tbody, td, tfoot, th, thead and tr.
clear	br
compact	dl, menu, ol and ul.
frame	table
frameborder	iframe
hspace	img and object.
vspace	img and object.
marginheight	iframe
marginwidth	iframe
noshade	hr
nowrap	td and th
rules	table
scrolling	iframe
size	hr
type	li, ol and ul.
valign	col, colgroup, tbody, td, tfoot, th, thead and tr
width	hr, table, td, th, col, colgroup and pre.
*/
function check_test_10c() {
  const nia10c_nodes = document.querySelectorAll(
    'link[rev], a[rev],link[charset], a[charset],a[shape],a[coords],img[longdesc], iframe[longdesc],link[target],area[nohref],head[profile],html[version],img[name],meta[scheme],object[archive],object[classid],object[codebase],object[codetype],object[declare],object[standby],param[valuetype],param[type],td[axis],t[axis],td[abbr], t[abbr],td[scope],caption[align], iframe[align], img[align], input[align], object[align], legend[align], table[align], hr[align], div[align], h1[align], h2[align], h3[align], h4[align], h5[align], h6[align], p[align], col[align], colgroup[align], tbody[align], td[align], tfoot[align], th[align], thead[align], tr[align],body[alink],body[link],body[vlink],body[text],body[background],table[bgcolor], tr[bgcolor], td[bgcolor], th[bgcolor], body[bgcolor],table[border], object[border],table[cellpadding],table[cellspacing],col[char], colgroup[char], tbody[char], td[char], tfoot[char], th[char], thead[char],tr[char],col[charoff], colgroup[charoff], tbody[charoff], td[charoff], tfoot[charoff], th[charoff], thead[charoff], tr[charoff],br[clear],dl[compact], menu[compact], ol[compact], ul[compact],table[frame],iframe[frameborder],img[hspace], object[hspace],img[vspace], object[vspace],iframe[marginheight],iframe[marginwidth],hr[noshade],td[nowrap], th[nowrap],table[rules],iframe[scrolling],hr[size],li[type], ol[type], ul[type],col[valign], colgroup[valign], tbody[valign], td[valign], tfoot[valign], th[valign], thead[valign], tr[valign],hr[width], table[width], td[width], th[width], col[width], colgroup[width], pre[width]'
  ); // NC
  if (nia10c_nodes && nia10c_nodes.length > 0 && isItemsVisible(nia10c_nodes)) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia10c' class='result-focus label-red'>10-C</a> : Présence d'attributs HTML obsoletes</li>"
    );
    setItemsOutline(nia10c_nodes, 'red', 'nia10c', '10-C');
  }
}

// D. Presentation attribut
function check_test_10d() {
  const nia10d_nodes = document.querySelectorAll(
    '[align], [alink], [background], [bgcolor], [border], [cellpadding], [cellspacing], [char], [charoff], [clear], [color], [compact], [frameborder], [hspace], [link], [marginheight], [marginwidth], [text], [valign], [vlink], [vspace], [size]:not(select), *:not(symbol) > *:not(g):not(svg[aria-hidden="true"]) > [width]:not(img):not(object):not(embed):not(canvas):not(svg):not(rect),*:not(symbol) > *:not(g):not(svg[aria-hidden="true"]) > [height]:not(img):not(object):not(embed):not(canvas):not(svg):not(rect)'
  );
  if (nia10d_nodes && nia10d_nodes.length > 0 && isItemsVisible(nia10d_nodes)) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia10d' class='result-focus label-red'>10-D</a> : Présence d'attributs HTML servant à la présentation de l'information [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-10-1-2' target='_blank'>RAWeb 10.1.2</a>]</li>"
    );
    setItemsOutline(nia10d_nodes, 'red', 'nia10d', '10-D');
  }
}

/*- -------------------------------------------------------------------------------- */
/* 🗸 NIA-11. Langue
Vérification de la présence de changement de langue
o Vérifier que le contenu rédigé dans une langue étrangère possède un attribut « lang » pertinent
*/
function check_part_11() {
  if (debug_flag) console.log('11 Langue');

  check_test_11a();
  check_test_11b();
  check_test_11c();
}

// A. Absence de lang
function check_test_11a() {
  if (!only_redactor) {
    const nia11a_nodes = document.querySelectorAll('html:not([lang])');
    if (
      nia11a_nodes &&
      nia11a_nodes.length > 0 &&
      isItemsVisible(nia11a_nodes)
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia11a' class='result-focus label-red'>11-A</a> : Aucune langue défini par défaut sur la page [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-3-1' target='_blank'>RAWeb 8.3.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-code-source-de-chaque-page-indique-la-langue-principale-du-contenu' target='_blank'>Opquast 125</a>]</li>"
      );
      setItemsOutline(nia11a_nodes, 'red', 'nia11a', '11-A');
    }
  }
}

// B. Presence de lorem ipsum
function check_test_11b() {
  if (!isPrototype && !only_redactor) {
    const nia11b_nodes = document.querySelectorAll('.cmp-text');
    let nia11b_flag = false;
    if (nia11b_nodes && nia11b_nodes.length > 0) {
      for (let i = 0; i < nia11b_nodes.length; i++) {
        if (nia11b_nodes[i].textContent.includes('Lorem ipsum')) {
          setItemOutline(nia11b_nodes[i], 'orange', 'nia11b', '11-B');
          nia11b_flag = true;
        }
      }
    }
    if (nia11b_flag == true) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia11b' class='result-focus label-orange'>11-B</a> : Présence de \"Lorem ipsum\" sur la page</li>"
      );
    }
  }
}

/* C. Détecter du texte en langue étrangère en se basant sur les mots les plus courant ;
Note : Cela ne permettra pas de detecter des mots isolé comme Hardware, BabyYear, etc.
*/
function check_test_11c() {
  const nia11c_nodes = document.querySelectorAll(
    '.cmp-text, .cmp-focus-list-description'
  ); // Contenu rédigé par le client
  let nia11c_flag = false;
  let nia11c_lang;
  let nia11c_array_test;

  const nia11c_array_fr = [
    ' on ',
    ' y ',
    ' en ',
    ' chez ',
    ' dont ',
    ' même ',
    ' le ',
    ' déjà ',
    ' pas ',
    ' bientôt ',
    ' avoir ',
    ' lorsque ',
    ' mais ',
    ' ainsi ',
    ' pour ',
    ' autant ',
    ' leur ',
    ' dans ',
    ' se ',
    ' aucun '
  ];
  const nia11c_array_en = [
    ' the ',
    ' will ',
    ' would ',
    ' shall ',
    ' might ',
    ' may ',
    ' do ',
    ' does ',
    ' did ',
    ' should ',
    ' could ',
    ' must ',
    ' yet ',
    ' still ',
    ' even ',
    ' though ',
    ' whether ',
    ' some ',
    ' any ',
    ' whose '
  ];
  const nia11c_array_de = [
    ' doch ',
    ' schon ',
    ' halt ',
    ' denn ',
    ' eben ',
    ' nun ',
    ' gar ',
    ' überhaupt ',
    ' sich ',
    ' wird ',
    ' damit ',
    ' deshalb ',
    ' dazu ',
    ' während ',
    ' keiner ',
    ' etwas ',
    ' nichts ',
    ' allein ',
    ' zwar ',
    ' ebenfalls '
  ];

  if (nia11c_nodes && nia11c_nodes.length > 0) {
    for (let i = 0; i < nia11c_nodes.length; i++) {
      nia11c_lang = nia11c_nodes[i].closest('[lang]').getAttribute('lang');

      if (nia11c_lang == 'fr') {
        nia11c_array_test = nia11c_array_en.concat(nia11c_array_de);
      } else if (nia11c_lang == 'en') {
        nia11c_array_test = nia11c_array_fr.concat(nia11c_array_de);
      } else if (nia11c_lang == 'de') {
        nia11c_array_test = nia11c_array_fr.concat(nia11c_array_en);
      } else {
        break;
      }

      for (let j = 0; j < nia11c_array_test.length; j++) {
        if (
          nia11c_nodes[i].textContent
            .toLowerCase()
            .includes(nia11c_array_test[j])
        ) {
          setItemOutline(nia11c_nodes[i], 'orange', 'nia11c', '11-C');
          nia11c_flag = true;
          break;
        }
      }
    }
  }
  if (nia11c_flag == true) {
    setItemToResultList(
      'man',
      "<li><a href='#' data-destination='nia11c' class='result-focus label-orange'>11-C</a> : Forte probabilité de texte en langue étrangère présent sur la page</li>"
    );
  }
}

/*- -------------------------------------------------------------------------------- */
/* 🗸 NIA-12. Boutons
Vérification des intitulé des boutons : Pour les boutons pour ouvrir la recherche, lancer la recherche, ouvrir les filtres et ouvrir le menu :
o	L'attribut « aria-label » doit être identique à l'attribut title
o	L'attribut « title » doit reprendre à minimum le contenu textuel de celui-ci 
*/
function check_part_12() {
  if (debug_flag) console.log('12 Boutons');

  check_test_12a();
  check_test_12b();
  check_test_12c();
  check_test_12d();
}

/* A. Bouton Role search*/
function check_test_12a() {
  if (!only_redactor && isAEM) {
    const nia12a1_nodes = document.querySelectorAll(
      '.topsearch:not([role="search"])'
    );
    const nia12a2_nodes = document.querySelectorAll(
      'html[lang="fr"] .topsearch:not([aria-label="Globale"])'
    );
    if (
      (nia12a1_nodes &&
        nia12a1_nodes.length > 0 &&
        isItemsVisible(nia12a1_nodes)) ||
      (nia12a2_nodes &&
        nia12a2_nodes.length > 0 &&
        isItemsVisible(nia12a2_nodes))
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia12a' class='result-focus label-red'>12-A</a> : Absence de certaines propriétés sur le champ de recherche (role=search et aria-label=Globale)</li>"
      );
      setItemsOutline(nia12a1_nodes, 'red', 'nia12a', '12-A');
      setItemsOutline(nia12a2_nodes, 'red', 'nia12a', '12-A');
    }
  }
}

// B Bouton TopSearch
function check_test_12b() {
  if (isAEM) {
    const nia12b1_nodes = document.querySelectorAll(
      'html[lang="fr"] #topsearch > #search-field-top:not([title^="Rechercher"])'
    );
    const nia12b2_nodes = document.querySelectorAll(
      'html[lang="fr"] #topsearch > #search-field-top:not([placeholder^="Rechercher"])'
    );
    const nia12b3_nodes = document.querySelectorAll(
      'html[lang="fr"] #topsearch > button:not([title^="Rechercher"])'
    );
    if (
      (nia12b1_nodes &&
        nia12b1_nodes.length > 0 &&
        isItemsVisible(nia12b1_nodes)) ||
      (nia12b2_nodes &&
        nia12b2_nodes.length > 0 &&
        isItemsVisible(nia12b2_nodes)) ||
      (nia12b3_nodes &&
        nia12b3_nodes.length > 0 &&
        isItemsVisible(nia12b3_nodes))
    ) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia12b' class='result-focus label-red'>12-B</a> : Problème dans les intitulés du champ de recherche (title et placeholder)</li>"
      );
      setItemsOutline(nia12b1_nodes, 'red', 'nia12b', '12-B');
      setItemsOutline(nia12b2_nodes, 'red', 'nia12b', '12-B');
      setItemsOutline(nia12b3_nodes, 'red', 'nia12b', '12-B');
    }
  }
}

/* C. Anchor */
function check_test_12c() {
  if (isAEM) {
    const nia12c_nodes = document.querySelectorAll(
      '.topsearch button:not(.anchor-close), button.anchor[data-destination^="#headernav"]:not(.anchor-close), button.anchor[data-destination^="#filters"]:not(.anchor-close), button.anchor[data-destination^="#bloub"]:not(.anchor-close)'
    );
    let nia12c_title = '',
      nia12c_content = '',
      nia12c_lang = '',
      nia12c_label = '';
    let nia12c1_flag = false,
      nia12c2_flag = false,
      nia12c3_flag = false;
    if (nia12c_nodes && nia12c_nodes.length > 0) {
      if (nia12c_nodes && nia12c_nodes.length > 0) {
        for (let i = 0; i < nia12c_nodes.length; i++) {
          nia12c_lang = nia12c_nodes[i].closest('[lang]').getAttribute('lang');
          if (nia12c_nodes[i].hasAttribute('title'))
            nia12c_title = sanitizeText(
              nia12c_nodes[i].getAttribute('title'),
              nia12c_lang
            );
          if (nia12c_nodes[i].hasAttribute('aria-label'))
            nia12c_label = sanitizeText(
              nia12c_nodes[i].getAttribute('aria-label'),
              nia12c_lang
            );
          nia12c_content = sanitizeText(
            nia12c_nodes[i].innerText != ''
              ? nia12c_nodes[i].innerText
              : nia12c_nodes[i].textContent,
            nia12c_lang
          );
          if (
            nia12c_nodes[i].hasAttribute('title') &&
            !nia12c_title.includes(nia12c_content)
          ) {
            if (debug_flag)
              console.log(
                '%cERROR',
                'font-weight:700;color:darkred',
                '[' + nia12c_title + '] VS [' + nia12c_content + '] '
              );
            setItemOutline(nia12c_nodes[i], 'red', 'nia12c1', '12-C');
            nia12c1_flag = true;
          }
          if (
            nia12c_nodes[i].hasAttribute('title') &&
            nia12c_nodes[i].hasAttribute('aria-label') &&
            nia12c_label != nia12c_title
          ) {
            setItemOutline(nia12c_nodes[i], 'red', 'nia12c2', '12-C');
            nia12c2_flag = true;
          }
          if (
            nia12c_nodes[i].hasAttribute('title') &&
            !nia12c_nodes[i].hasAttribute('aria-label') &&
            nia12c_title != nia12c_content &&
            !only_redactor &&
            !only_error
          ) {
            setItemOutline(nia12c_nodes[i], 'yellow', 'nia12c3', '12-C');
            nia12c3_flag = true;
          }
        }
      }
    }
    if (nia12c1_flag == true) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia12c1' class='result-focus label-red'>12-C</a> : L'attribut title d'un bouton du site ne reprend pas son contenu textuel</li>"
      );
    }
    if (nia12c2_flag == true) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia12c2' class='result-focus label-red'>12-C</a> : L'attribut title d'un bouton du site n'est pas identique à son aria-label </li>"
      );
    }
    if (nia12c3_flag == true) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia12c3' class='result-focus label-yellow'>12-C</a> : L'attribut title d'un bouton du site, différent de son contenu textuel, n'est pas completé par un attribut aria-label </li>"
      );
    }
  }
}

/* D. Button avec role */
function check_test_12d() {
  if (!only_redactor && !only_error) {
    const nia12d_nodes = document.querySelectorAll('button[role=button]');
    if (
      nia12d_nodes &&
      nia12d_nodes.length > 0 &&
      isItemsVisible(nia12d_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia12d' class='result-focus label-yellow'>12-D</a> : Il n'est pas nécessaire d'ajouter un role button sur un éléments boutons</li>"
      );
      setItemsOutline(nia12d_nodes, 'yellow', 'nia12d', '12-D');
    }
  }
}

/*- -------------------------------------------------------------------------------- */
/* 🗸 NIA-13. Regle de rédaction */
// [TODO] Ajouter ici les autres régles propre au contenu saisi par le rédacteur
function check_part_13() {
  if (debug_flag) console.log('13 Rédaction');

  check_test_13a();
}

/*- ------------------------------------------------------------------------------- */
/* 🗸 NIA-14 Title : Mise en avant des titres (<Hn> et ceux qui ont les roles=heading).
o Vérification de la présence de titres simulés - S’assurer que les titres sont bien balisés avec des balises <Hn> et pas seulement avec du gras.
o S’assurer que les titres sont dans le bon ordre*/
function check_part_14() {
  if (debug_flag) console.log('14 Titre');

  check_test_14a();
  check_test_14b();
  check_test_14c();
  check_test_14d();
  check_test_14e();
  check_test_14f();
}

// A. Heading avec role
function check_test_14a() {
  const nia14a_nodes = document.querySelectorAll(
    'h1[role]:not([role="heading"]),h2[role]:not([role="heading"]),h3[role]:not([role="heading"]),h4[role]:not([role="heading"]),h5[role]:not([role="heading"]),h6[role]:not([role="heading"])'
  );
  if (nia14a_nodes && nia14a_nodes.length > 0 && isItemsVisible(nia14a_nodes)) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia14a' class='result-focus label-red'>14-A</a> : Présence de titre avec un attribut role</li>"
    );
    setItemsOutline(nia14a_nodes, 'red', 'nia14a', '14-A');
  }
}

// B. Aria-level sans heading
function check_test_14b() {
  const nia14b_nodes = document.querySelectorAll(
    '[aria-level]:not(h1):not(h2):not(h3):not(h4):not(h5):not(h6):not([role="heading"])'
  );
  if (nia14b_nodes && nia14b_nodes.length > 0 && isItemsVisible(nia14b_nodes)) {
    setItemToResultList(
      'nc',
      "<li><a href='#' data-destination='nia14b' class='result-focus label-red'>14-B</a> : Présence d'attribut aria-level en dehors de titre</li>"
    );
    setItemsOutline(nia14b_nodes, 'red', 'nia14b', '14-B');
  }
}

// C. Heading caché au outil d'assistance
function check_test_14c() {
  if (!only_redactor) {
    const nia14c_nodes = document.querySelectorAll(
      'h1[aria-hidden],h2[aria-hidden],h3[aria-hidden],h4[aria-hidden],h5[aria-hidden],h6[aria-hidden]'
    );
    const nia14c_heading = document.querySelectorAll(
      'h1:not([aria-hidden]),h2:not([aria-hidden]),h3:not([aria-hidden]),h4:not([aria-hidden]),h5:not([aria-hidden]),h6:not([aria-hidden])'
    );
    let nia14c_flag = false;
    let nia14c_find = false;
    if (
      nia14c_nodes &&
      nia14c_nodes.length > 0 &&
      isItemsVisible(nia14c_nodes)
    ) {
      // console.log(nia14c_nodes)
      // il faut vérifier s'il n'y a pas un titre de même niveau et de même contenu présent sur la page.
      for (let i = 0; i < nia14c_nodes.length; i++) {
        if (isItemVisible(nia14c_nodes[i])) {
          nia14c_find = false;
          for (let j = 0; j < nia14c_heading.length; j++){
            if(nia14c_nodes[i].tagName == nia14c_heading[j].tagName && sanitizeText(
              nia14c_nodes[i].textContent) == sanitizeText(
              nia14c_heading[j].textContent)
            ){
              //console.log("find : "+nia14c_nodes[i].textContent)
              nia14c_find = true;
              break;
            }
          }
          if (nia14c_find == false) {
            setItemOutline(nia14c_nodes[i], 'red', 'nia14c', '14-C');
            nia14c_flag = true;
          }
        }
      }
    }
    if (nia14c_flag == true) {
      setItemToResultList(
        'nc',
        "<li><a href='#' data-destination='nia14c' class='result-focus label-red'>14-C</a> : Présence de titre caché aux outils d'assistance</li>"
      );
    }
  }
}

// D. Heading simulé
function check_test_14d() {
  if (!only_error) {
    const nia14d_nodes = document.querySelectorAll(
      'b,p:not(.cmp-form__mandatory-text) > strong:first-child ,span > strong:first-child ,div > strong:first-child , *:not(.accordionItem) > *:not(figcaption):not(.article-summary):not(.article-metas):not(.search-metas):not(.cmp-grid__textContainer):not(.feed-item-content):not(.meta-themes):not(.description):not(.meta-published-update) > p:not(.cmp-lastupdate):not(.cmp-form__mandatory-text):not(.at):not(.feed-item-author):not(.orejime-Notice-description):first-child'
    );
    let nia14d_flag = false;
    if (nia14d_nodes && nia14d_nodes.length > 0) {
      for (let i = 0; i < nia14d_nodes.length; i++) {
        if (isItemVisible(nia14d_nodes[i]) && nia14d_nodes[i].length < 150) {
          //boucle pour exclure les textes de plus de 150 caractères
          setItemsOutline(nia14d_nodes[i], 'yellow', 'nia14d', '14-D');
          nia14d_flag = true;
        }
      }
    }
    if (nia14d_flag == true) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia14d' class='result-focus label-yellow'>14-D</a> : Présence de texte ressemblant à des titres n'étant pas balisé comme tel - A vérifier au cas par cas [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-1-3' target='_blank'>RAWeb 9.1.3</a>]</li>"
      );
    }
  }
}

// E. Ordre Heading
function check_test_14e() {
  if (!only_error) {
    const nia14e_nodes = document.querySelectorAll(
      ':where(h1,h2,h3,h4,h5,h6,[role="heading"]):not([aria-hidden])'
    );
    let nia14e_flag = false;
    let nia14e_current_level = 0,
      nia14e_previous_level = 0;
    if (nia14e_nodes && nia14e_nodes.length > 0) {
      for (let i = 0; i < nia14e_nodes.length; i++) {
        if (isItemVisible(nia14e_nodes[i])) {
          if (
            nia14e_nodes[i].tagName == 'H1' ||
            (nia14e_nodes[i].hasAttribute('aria-level') &&
              nia14e_nodes[i].hasAttribute('role') &&
              nia14e_nodes[i].getAttribute('aria-level').value == '1' &&
              nia14e_nodes[i].getAttribute('role').value == 'heading')
          ) {
            nia14e_current_level = 1;
          } else if (
            nia14e_nodes[i].tagName == 'H3' ||
            (nia14e_nodes[i].hasAttribute('aria-level') &&
              nia14e_nodes[i].hasAttribute('role') &&
              nia14e_nodes[i].getAttribute('aria-level').value == '3' &&
              nia14e_nodes[i].getAttribute('role').value == 'heading')
          ) {
            nia14e_current_level = 3;
          } else if (
            nia14e_nodes[i].tagName == 'H4' ||
            (nia14e_nodes[i].hasAttribute('aria-level') &&
              nia14e_nodes[i].hasAttribute('role') &&
              nia14e_nodes[i].getAttribute('aria-level').value == '4' &&
              nia14e_nodes[i].getAttribute('role').value == 'heading')
          ) {
            nia14e_current_level = 4;
          } else if (
            nia14e_nodes[i].tagName == 'H5' ||
            (nia14e_nodes[i].hasAttribute('aria-level') &&
              nia14e_nodes[i].hasAttribute('role') &&
              nia14e_nodes[i].getAttribute('aria-level').value == '5' &&
              nia14e_nodes[i].getAttribute('role').value == 'heading')
          ) {
            nia14e_current_level = 5;
          } else if (
            nia14e_nodes[i].tagName == 'H6' ||
            (nia14e_nodes[i].hasAttribute('aria-level') &&
              nia14e_nodes[i].hasAttribute('role') &&
              nia14e_nodes[i].getAttribute('aria-level').value == '6' &&
              nia14e_nodes[i].getAttribute('role').value == 'heading')
          ) {
            nia14e_current_level = 6;
          } else {
            nia14e_current_level = 2;
          }
          if (nia14e_current_level - nia14e_previous_level > 1) {
            setItemOutline(nia14e_nodes[i], 'yellow', 'nia14e', '14-E');
            if (debug_flag)
              console.log(
                '  > ' +
                  nia14e_nodes[i].innerText +
                  ' | current : ' +
                  nia14e_current_level +
                  ' | previous :' +
                  nia14e_previous_level
              );
            nia14e_flag = true;
          }
          nia14e_previous_level = nia14e_current_level;
        }
      }
    }
    if (nia14e_flag == true) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia14e' class='result-focus label-yellow'>14-E</a> : Présence de sauts de titres [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-1-1' target='_blank'>RAWeb 9.1.1</a>]</li>"
      );
    }
  }
}

// F. 2 Heading H1 : Conforme seulement si pertinent
function check_test_14f() {
  if (!only_error) {
    const nia14f_nodes = document.querySelectorAll(
      'h1, [role="heading"][aria-level="1"]'
    );
    let nia14f_flag = false;
    let nia14f_counter = 0;
    if (
      nia14f_nodes &&
      nia14f_nodes.length > 1 &&
      isItemsVisible(nia14f_nodes)
    ) {
      for (let i = 0; i < nia14f_nodes.length; i++) {
        if (isItemVisible(nia14f_nodes[i])) {
          nia14f_counter++;
        }
      }
      if (nia14f_counter > 1) nia14f_flag = true;
    }
    if (nia14f_flag == true) {
      setItemToResultList(
        'man',
        "<li><a href='#' data-destination='nia14f' class='result-focus label-yellow'>14-F</a> : Présence de 2 titres H1. Pertinence de ceux-ci à vérifier manuellement</li>"
      );
      setItemsOutline(nia14f_nodes, 'yellow', 'nia14f', '14-F');
    }
  }
}

/*- -------------------------------------------------------------------------------- */
/* 🗸 NIA-15. Securité */

function check_part_15() {
  if (debug_flag) console.log('15 Sécurité');

  check_test_15a();
  check_test_15b();
  check_test_15c();
  check_test_15d();
  check_test_15e();

  /* TODO
	Règle n°185 : Une famille générique de police est indiquée comme dernier élément de substitution.
	Règle n°208 : Le serveur ne communique pas d'informations sur les logiciels et langages utilisés.
	*/
}

// A. Les liens externes qui ouvrent une nouvelle fenêtre ne partagent pas d'information de contexte.
function check_test_15a() {
  if (!only_error) {
    let nia15a_nodes = document.querySelectorAll(
      'a[target="_blank"]:not([rel~="noreferrer"]):not([rel~="noopener"])'
    );
    if (only_redactor)
      nia15a_nodes = document.querySelectorAll(
        '.cmp-text a[target="_blank"]:not([rel~="noreferrer"]):not([rel~="noopener"])'
      );
    if (
      nia15a_nodes &&
      nia15a_nodes.length > 0 &&
      isItemsVisible(nia15a_nodes)
    ) {
      setItemToResultList(
        'dev',
        "<li><a href='#' data-destination='nia15a' class='result-focus label-yellow'>15-A</a> : Doter chaque lien ayant un attribut target='_blank' d'un attribut rel='noreferrer noopener'. [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-liens-externes-qui-ouvrent-une-nouvelle-fenetre-ne-partagent-pas-dinformation-de-contexte' target='_blank'>Opquast 25</a>]</li>"
      );
      setItemsOutline(nia15a_nodes, 'yellow', 'nia15a', '15-A');
    }
  }
}

// B. Les pages utilisant le protocole HTTPS ne proposent pas de ressources HTTP.
function check_test_15b() {
  if (!only_error) {
    let nia15b_nodes = document.querySelectorAll(
      'a[target="_blank"][href^="http://"]'
    );
    if (only_redactor)
      nia15b_nodes = document.querySelectorAll(
        '.cmp-text a[target="_blank"][href^="http://"]'
      );
    if (
      nia15b_nodes &&
      nia15b_nodes.length > 0 &&
      isItemsVisible(nia15b_nodes)
    ) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia15b' class='result-focus label-yellow'>15-B</a> : Les pages utilisant le protocole HTTPS ne doivent pas proposer de ressources HTTP [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-pages-utilisant-le-protocole-https-ne-proposent-pas-de-ressources-http' target='_blank'>Opquast 195</a>]</li>"
      );
      setItemsOutline(nia15b_nodes, 'yellow', 'nia15b', '15-B');
    }
  }
}

// C. Toutes les pages utilisent le protocole HTTPS.
function check_test_15c() {
  if (!only_redactor) {
    if (window.location.protocol != 'https:') {
      setItemToResultList(
        'dev',
        "<li><span class='result-focus label-red'>15-C</span> : Les pages doivent utiliser le protocole HTTPS [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/toutes-les-pages-utilisent-le-protocole-https' target='_blank'>Opquast 192</a>]</li>"
      );
    }
  }
}

// D. Le code source de chaque page contient une métadonnée qui définit le jeu de caractères UTF-8
function check_test_15d() {
  if (!only_redactor && !only_error) {
    const nia15d_node = document.querySelector('meta[charset="UTF-8"]');
    if (nia15d_node == null) {
      setItemToResultList(
        'dev',
        "<li><span class='result-focus label-yellow'>15-D</span> : Le code source de chaque page contient une métadonnée qui définit le jeu de caractères UTF-8 [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-code-source-de-chaque-page-contient-une-metadonnee-qui-definit-le-jeu-de-caracteres' target='_blank'>Opquast 225</a>, <a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-codage-de-caracteres-utilise-est-utf-8' target='_blank'>226</a>]</li>"
      );
    }
  }
}

// E Liens vers des documents en téléchargement
function check_test_15e() {
  if (!only_error) {
    const nia15e_nodes = document.querySelectorAll(
      'a[href$=".doc"], a[href$=".docx"], a[href$=".xls"], a[href$=".xlsx"], a[href$=".ppt"], a[href$=".pptx"], a[href$=".txt"]'
    );
    if (
      nia15e_nodes &&
      nia15e_nodes.length > 0 &&
      isItemsVisible(nia15e_nodes)
    ) {
      setItemToResultList(
        'nth',
        "<li><a href='#' data-destination='nia15e' class='result-focus label-yellow'>15-E</a> : Vérifiez si ce document ne peut pas être fourni au formt PDF ou HTML</li>"
      );
      setItemsOutline(nia15e_nodes, 'yellow', 'nia15e', '15-E');
    }
  }
}
