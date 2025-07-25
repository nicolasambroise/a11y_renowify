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
