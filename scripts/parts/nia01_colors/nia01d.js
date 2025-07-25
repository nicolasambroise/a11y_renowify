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
