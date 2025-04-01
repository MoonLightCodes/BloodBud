function goHome() {
  document
    .querySelectorAll(".form-container")
    .forEach((f) => (f.style.display = "none"));
  document.getElementById("mainPage").style.display = "block";
}

function showForm(f) {
  document.getElementById("mainPage").style.display = "none";
  document.getElementById(f + "Form").style.display = "block";
}

document
  .getElementById("donationForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const donorData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      bloodgroup: document.querySelector('input[name="bloodGroup"]:checked')
        .value,
    };
    console.log(donorData);
    try {
      await fetch("https://bloodbudapi.onrender.com/post/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donorData),
      }).then(() => {
        document.getElementById("donationSuccess").style.display = "block";
        setTimeout(() => {
          goHome();
        }, 1500);
      });
    } catch (e) {
        document.getElementById("donationSuccess").style.display = "block";
        document.getElementById("donationSuccess").innerText = e.message;
        setTimeout(() => {
          goHome();
        }, 1500);
    }
  });

async function findDonors() {
  const bg = document.getElementById("requiredBloodGroup").value;
  try {
    const res = await fetch(`https://bloodbudapi.onrender.com/get/${bg}`);
    const donors = await res.json();
    const rc = document.getElementById("donorResults");
    rc.innerHTML = "";
    donors.forEach((d) => {
      rc.innerHTML += `<div class="contact-card">
                  <h3>${d.name}</h3><p>🩸 ${d.bloodgroup}</p><p>📧 ${d.email}</p><p>📞 ${d.phone}</p>
              </div>`;
    });
    document.getElementById("noDonors").style.display = donors.length
      ? "none"
      : "block";
  } catch (e) {
    console.error(e);
  }
}
