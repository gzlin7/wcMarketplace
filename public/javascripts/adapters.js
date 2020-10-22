// TODO: retrieve extension id dynamically
// const extensionId = 'aabllonifcnfedcledkelkndnhabgkfo';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const aid = urlParams.get('aid');


$(document).ready(function() {
  // load intro
  $('#info').load(`adapters/${aid}/info.html`);

  var editor = ace.edit("adapterCode"); 
  editor.session.setMode("ace/mode/typescript");
  editor.setReadOnly(true);

  $.get(`adapters/${aid}/script.ts`, function(data) {
    const code = data;
    const scraper = new Function(`return ${code}`)();
    //$('#adapterCode').text(data);
    editor.setValue(data);
    $('#adapterName').text(scraper.name);
  });

  // $(".install").on("click", function(event) {
  //     let url = "chrome-extension://" + extensionId + "/ask.html?aid=" + aid;
     
  //     // alert("url=" + url);
  //     window.open(url);
  // });
});
