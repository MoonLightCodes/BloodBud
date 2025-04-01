function goHome() {
  refresh();
  document
    .querySelectorAll(".form-container")
    .forEach((f) => (f.style.display = "none"));
  document.getElementById("mainPage").style.display = "block";
}
function refresh() {
  location.reload(true);
}

function showForm(f) {
  document.getElementById("mainPage").style.display = "none";
  document.getElementById(f + "Form").style.display = "block";
}

function deleteForm(f) {
  document.getElementById("mainPage").style.display = "none";
  document.getElementById(f + "Form").style.display = "block";
}

document.getElementById("deleteForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const deleteData = {
    email: document.getElementById("dEmail").value,
  };
  try {
    const res = await fetch("http://localhost:5000/delete/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(deleteData),
    });
    const re = await res.json();
    if (!re.ok) {
      throw new Error(re.message);
    }
    document.getElementById("deleteSuccess").style.display = "block";
    setTimeout(() => {
      goHome();
    }, 1500);
  } catch (e) {
    document.getElementById("deleteSuccess").style.display = "block";
    document.getElementById("deleteSuccess").style.backgroundColor= '#ff4757';
    document.getElementById("deleteSuccess").innerText = e.message.replace("Error:", "");
    document.getElementById("donationSuccess").style.backgroundColor= '#2ed573';
    setTimeout(() => {
      goHome();
    }, 1500);
  }
});

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
      const res = await fetch("http://localhost:5000/post/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donorData),
      });
      const re = await res.json();
      if(!re.ok)throw new Error(re.message);
      document.getElementById("donationSuccess").style.display = "block";
      setTimeout(() => {
        goHome();
      }, 1500);
    } catch (e) {
      document.getElementById("donationSuccess").style.display = "block";
      document.getElementById("donationSuccess").style.backgroundColor= '#ff4757';
      document.getElementById("donationSuccess").innerText = e.message.replace("Error:","");
      document.getElementById("donationSuccess").style.backgroundColor= '#2ed573';
      setTimeout(() => {
        goHome();
      }, 1500);
    }
  });

async function findDonors() {
  const bg = document.getElementById("requiredBloodGroup").value;
  try {
    const res = await fetch(`http://localhost:5000/get/${bg}`);
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
    document.getElementById("noDonors").style.display = "block";
    document.getElementById("noDonors").innerText= e.message;
  }
}
