// M Un groupe de Checkbox/Radio doit être structuré dans un fieldset
function check_test_04m() {
  if (!only_redactor) {
    const nia04m_nodes = document.querySelectorAll(
      'input[type="checkbox"],input[type="radio"]'
    );
    let nia04m_flag = false;
    if (
      nia04m_nodes &&
      nia04m_nodes.length > 0 &&
      isItemsVisible(nia04m_nodes)
    ) {
      for (let i = 0; i < nia04m_nodes.length; i++) {
        if (!nia04m_nodes[i].parentElement.closest('fieldset')) {
          if (
            nia04m_nodes[i].parentElement.closest('cmp-form-options') &&
            nia04m_nodes[i].parentElement
              .closest('cmp-form-options')
              .querySelectorAll('input[type="checkbox"],input[type="radio"]')
              .length > 1
          ) {
            nia04m_flag = true;
            setItemsOutline(nia04m_nodes, 'orange', 'nia04m', '04-M');
          }
        }
      }
    }
    if (nia04m_flag == true) {
      setItemToResultList(
        'man',
        "<li><a href='#' data-destination='nia04m' class='result-focus label-orange'>04-M</a> : Un groupe de Checkbox/Radio doit être structuré dans un fieldset</li>"
      );
    }
  }

}