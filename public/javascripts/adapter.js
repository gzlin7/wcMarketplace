const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const aid = urlParams.get('aid');


window.onload = function() {
  // load info
  //$('#info').load(`adapters/${aid}/info.html`);

  var editor = ace.edit("adapterEditor"); 
  editor.session.setMode("ace/mode/typescript");
  editor.setReadOnly(true);

  // get adapter code
  $.get(`api/adapters/${aid}`, function(data) {
    const code = data.code;
    $('#info').html(data.description);

    editor.setValue(code);
    $('#adapterCode').text(code);
    // get name and url from adapter code
    const scraper = new Function(`return ${code}`)();
    $('#adapterName').text(scraper.name);
    $('#url').text(scraper.contains);

    // create and fire custom event
    const event = new Event('adapterReady');
    document.dispatchEvent(event);
  });

  // button onclick to be handled by wildcard extension content script
}
