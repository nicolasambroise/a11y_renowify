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
