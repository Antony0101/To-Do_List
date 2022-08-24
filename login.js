var userid = document.getElementById("uid");
var password = document.getElementById("pwd");
var auth;
async function onSubmit() {
  auth = { userid: userid.value, password: password.value };
  console.log(auth);
  await postData("https://rich-lapel-toad.cyclic.app/auth/signin", auth).then(
    (data) => {
      console.log(data.token);
      localStorage.setItem("user", data.token); // JSON data parsed by `data.json()` call
    }
  );
}
console.log(userid);

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  //console.log(response);
  return response.json();
}
