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
          if(debug_flag) console.log("keyword detected : "+nia11c_array_test[j])
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
