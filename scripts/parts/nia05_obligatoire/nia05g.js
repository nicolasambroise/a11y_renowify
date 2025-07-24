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