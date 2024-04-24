// Selezioniamo tutte le textarea con la classe "text"
var textareas = document.querySelectorAll('.text');

// Cicliamo attraverso tutte le textarea
for (var i = 0; i < textareas.length; i++) {
  // Aggiungiamo un evento "click" alla toolbar
  textareas[i].nextElementSibling.addEventListener('click', function(e) {
    // Preveniamo l'evento di default
    e.preventDefault();
    // Selezioniamo la textarea corrente
    var textarea = e.target.parentElement.nextElementSibling;
    // Selezioniamo la porzione di testo selezionata
    var selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    // Selezioniamo il bottone corrente
    var button = e.target.classList;
    // Se il bottone "bold" è stato premuto
    if (button.contains('bold')) {
      // Aggiungiamo il tag "strong" alla porzione di testo selezionata
      textarea.value = textarea.value.substring(0, textarea.selectionStart) + '<strong>' + selectedText + '</strong>' + textarea.value.substring(textarea.selectionEnd);
    }
    // Se il bottone "italic" è stato premuto
    if (button.contains('italic')) {
      // Aggiungiamo il tag "em" alla porzione di testo selezionata
      textarea.value = textarea.value.substring(0, textarea.selectionStart) + '<em>' + selectedText + '</em>' + textarea.value.substring(textarea.selectionEnd);
    }
    // Se il bottone "underline" è stato premuto
    if (button.contains('underline')) {
      // Aggiungiamo il tag "u" alla porzione di testo selezionata
      textarea.value = textarea.value.substring(0, textarea.selectionStart) + '<u>' + selectedText + '</u>' + textarea.value.substring(textarea.selectionEnd);
    }
    // Se il bottone "link" è stato premuto
    if (button.contains('link')) {
      // Chiediamo all'utente di inserire la URL del link
      var url = prompt("Inserisci l'URL del link:");
      // Aggiungiamo il tag "a" alla porzione di testo selezionata, con l'attributo "href" uguale alla URL inserita dall'utente
      textarea.value = textarea.value.substring(0, textarea.selectionStart)
