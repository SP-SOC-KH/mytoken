import { showAlert } from "./alert.js";

const login = async (cid, password) => {
  try {
    const loadingIcon = document.getElementById("loading");
    loadingIcon.style.display = "block";
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/login",
      data: {
        cid,
        password,
      },
    });
    if (res.data.status === "success") {
      console.log("success");
      loadingIcon.style.display = "none";
      showAlert("success", "Logged in successfully");
      window.setTimeout(() => {
        location.assign("/dashboard");
      }, 1500);
      var obj = res.data;
      console.log(obj);
      document.cookie = "token=" + JSON.stringify(obj);
      document.cookie = "jwt=" + JSON.stringify(obj.token);
      console.log(obj);
    } else {
      loadingIcon.style.display = "none";
      console.log("error");
    }
  } catch (err) {
    loadingIcon.style.display = "none";
    let message =
      typeof err.response !== "undefined"
        ? err.response.data.message
        : err.message;
    showAlert("error", "Error: Incorrect CID or password", message);
  }
};

document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  const cid = document.getElementById("cid").value; //email instead of email
  const password = document.getElementById("password").value;
  login(cid, password); // email instead of email
});
