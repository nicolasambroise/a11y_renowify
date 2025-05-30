/*- -------------------------------------------------------------------------------- */
/* 01. Couleur */
function check_part_01() {
  if (debug_flag) console.log('01 Couleur');

  // --> test 10.5.1 color / bg/ degradé
  // --> test 10.6.1 lien visible par rapport au texte environnemt
  // --> test 10.7.1 prise de focus visible
  // --> Contenu avec un linear-gradiant sans couleur de backup

  // A Check All text
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
        "<li><a href='#' data-destination='nia01a' class='result-focus label-orange'>01-A</a> : Présence d'éléments textuels insuffisament contrasté</li>"
      );
    }
    if (nia01a_flag2 == true) {
      setItemToResultList(
        'man',
        "<li><a href='#' data-destination='nia01a' class='result-focus label-yellow'>01-A</a> : Vérifier le contraste de certains éléments textuels</li>"
      );
    }
  }

  // B. Opacité Form Field Border
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
			  if(nia01b_position == 'absolute' || nia01b_position == 'fixed'){
				  setItemOutline(nia01b_nodes[i], 'yellow', 'nia01b2', '01-B');
				  nia01b_flag5 = true;

			  }
			  else{
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

  // C. Opacité Placeholder
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

  // D. Opacité de l'outline
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

  // E presence de dégradé sans couleur de replis
  // Pour des soucis de perf, on ne test que certain element
  
	if(!only_redactor){
		const nia01e_nodes = document.querySelectorAll('header, footer, .cmp-section, aside, article');
		let nia01e_flag = false;
		if(nia01e_nodes && nia01e_nodes.length > 0){
			for(let i = 0; i < nia01e_nodes.length; i++){
				if(isItemVisible(nia01e_nodes[i])){
					nia01e_bgi = window.getComputedStyle(nia01e_nodes[i],null).getPropertyValue('background-image');
					nia01e_bgc = window.getComputedStyle(nia01e_nodes[i],null).getPropertyValue('background-color');
					if(nia01e_bgi.indexOf("linear-gradient") >= 0 && nia01e_bgc=="rgba(0, 0, 0, 0)"){
						 setItemToResultList("man","<li><a href='#' data-destination='nia01e' class='result-focus label-yellow'>01-E</a> : Vérifier la présence d'une couleur de replis sur des éléments avec fond en dégradé.</li>");
						 setItemOutline(nia01e_nodes[i],"yellow","nia01e","01-E");
					}
				}
			}
		}
	}
}
