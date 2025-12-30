const socket = io();

// elements
const $messages = document.querySelector(".chat-messages");
const $chatForm = document.getElementById("chat-form");
const $msgInput = document.getElementById("msg");

// templates
const messageTemplate = document.querySelector("#message-template").innerHTML;
const locationTemplate = document.querySelector("#location-template").innerHTML;
const sidebarTemplate = document.querySelector("#sidebar-template").innerHTML;

// options (from query string)
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

// join (server will validate via callback)
socket.emit("join", { username, room }, (error) => {
  if (error) {
    alert(error);
    location.href = "/";
  }
});

// send location button
const $sendLocation = document.getElementById("send-location");
$sendLocation.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation tidak didukung oleh browser ini.");
  }
  $sendLocation.setAttribute("disabled", "disabled");
  navigator.geolocation.getCurrentPosition(
    (position) => {
      socket.emit(
        "kirimLokasi",
        {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
        (ack) => {
          $sendLocation.removeAttribute("disabled");
          // optional: show ack or console
          if (ack) console.log("kirimLokasi ack:", ack);
        }
      );
    },
    (err) => {
      $sendLocation.removeAttribute("disabled");
      alert("Gagal mengambil lokasi: " + (err.message || err));
    }
  );
});

document.getElementById("room-name").innerText = room;

// pesan masuk
socket.on("pesan", (message) => {
  if (typeof Mustache !== "undefined") {
    const html = Mustache.render(messageTemplate, {
      username: message.username,
      text: message.text,
      createdAt: moment(message.time).format("h:mm a"),
    });
    $messages.insertAdjacentHTML("beforeend", html);
  } else {
    renderPlainMessage(message);
  }
  $messages.scrollTop = $messages.scrollHeight;
});

// lokasi
socket.on("locationMessage", (message) => {
  if (typeof Mustache !== "undefined") {
    const html = Mustache.render(locationTemplate, {
      username: message.username,
      url: message.url,
      createdAt: moment(message.time).format("h:mm a"),
    });
    $messages.insertAdjacentHTML("beforeend", html);
  } else {
    renderPlainLocation(message);
  }
  $messages.scrollTop = $messages.scrollHeight;
});

// daftar user / sidebar
socket.on("roomData", ({ room, users }) => {
  if (typeof Mustache !== "undefined") {
    const html = Mustache.render(sidebarTemplate, { room, users });
    document.querySelector(".chat-sidebar").innerHTML = html;
  } else {
    // simple sidebar fallback
    const ul = users.map((u) => `<li>${escapeHtml(u.username)}</li>`).join("");
    document.querySelector(".chat-sidebar").innerHTML = `<h3>Room: ${escapeHtml(
      room
    )}</h3><h4>Users</h4><ul>${ul}</ul>`;
  }
});

// kirim pesan
$chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = $msgInput.value;
  $chatForm.querySelector("button").setAttribute("disabled", "disabled");
  socket.emit("kirimPesan", msg, (error) => {
    $chatForm.querySelector("button").removeAttribute("disabled");
    $msgInput.value = "";
    $msgInput.focus();
    if (error) {
      console.warn(error);
      alert(error);
    }
  });
});
// fallback renderers (used if Mustache missing)
function renderPlainMessage(message) {
  const div = document.createElement("div");
  div.className = "message";
  div.innerHTML = `<p class="meta">${escapeHtml(
    message.username
  )} <span>${escapeHtml(message.time)}</span></p>`;
  const p = document.createElement("p");
  p.className = "text";
  p.textContent = message.text || message.url || "";
  div.appendChild(p);
  $messages.appendChild(div);
}

function renderPlainLocation(message) {
  const div = document.createElement("div");
  div.className = "message";
  div.innerHTML = `<p class="meta">${escapeHtml(
    message.username
  )} <span>${escapeHtml(message.time)}</span></p>`;
  const p = document.createElement("p");
  p.className = "text";
  const a = document.createElement("a");
  a.href = message.url;
  a.target = "_blank";
  a.textContent = "Lihat lokasi";
  p.appendChild(a);
  div.appendChild(p);
  $messages.appendChild(div);
}
