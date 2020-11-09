const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const aid = urlParams.get('aid');


window.onload = function() {
  var editor = ace.edit("adapterEditor"); 
  editor.session.setMode("ace/mode/typescript");
  editor.setReadOnly(true);

  // get adapter info and code
  $.get(`api/adapters/${aid}`, function(data) {
    const code = data.code;

    $("#adapterName").text(data.name);
    $("#url").text(data.url);
    $('#info').html(data.description);

    editor.setValue(code);
    $('#adapterCode').text(code);

    // create and fire custom event
    const event = new Event('adapterReady');
    document.dispatchEvent(event);
  });

  // button onclick to be handled by wildcard extension content script
}
