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
