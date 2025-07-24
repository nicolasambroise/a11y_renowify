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
                  "<li><a href='#' data-destination='nia06i1' class='result-focus label-red'>06-I</a> : Les animations lues automatiquement et qui boucles doivent avoir un controleur play/pause [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-13-8-1' target='_blank'>RAWeb 13.8.1</a>]</li>"
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
                    "<li><a href='#' data-destination='nia06i2' class='result-focus label-red'>06-I</a> : Les animations lues automatiquement et qui durent plus de 5s doivent avoir un controleur play/pause [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-13-8-1' target='_blank'>RAWeb 13.8.1</a>]</li>"
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