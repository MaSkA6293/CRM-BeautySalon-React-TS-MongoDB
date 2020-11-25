function successRedirect() {
  setTimeout(() => {
    window.location.replace("http://localhost:3000");
  }, 10000);
  const confirm = document.querySelector(".confirm");
  const out = document.createElement("div");
  confirm.append(out);
  let time = 10;
  const timer = setInterval(() => {
    time -= 1;
    out.textContent = `Вы будете перенаправлены на главную страницу через ${time} секунд`;
    if (time === 0) {
      clearInterval(timer);
    }
  }, 1000);
}
successRedirect();
