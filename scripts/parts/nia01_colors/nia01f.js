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
