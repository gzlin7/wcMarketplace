function validate() {
  const code = document.getElementById("code").value;

  try {
    const json = JSON.parse(code);
    // TODO: expand validation
    if (json.name != "" && json.urls.length > 0) {
      $("#name").val(json.name);
      $("#url").val(json.urls[0]);

      $("#upload").removeAttr("disabled");
      $("#error").text("");
    }
  } catch (err) {
    $("#error").text("Invalid Adapter Code");
  }
}

function upload() {
  const body = {
    name: $("#name").val(),
    url: $("#url").val(),
    code: $("#code").val(),
    description: $("#description").val(),
  }
  axios.post('/api/adapters', body)
    .then((res) => {
      // success, go to main page: adapater lists
      window.location = "/";
    }).catch((err) => {
      $("#error").text(err.response.data.error);
    });
}