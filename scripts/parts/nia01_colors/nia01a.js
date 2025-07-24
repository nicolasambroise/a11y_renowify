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
}