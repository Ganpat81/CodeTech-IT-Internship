/* =========================================
   SERVICE WORKER REGISTRATION
   ========================================= */

// Check if Service Workers are supported
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw.js")
      .then(() => {
        console.log("Service Worker registered successfully");
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}

/* =========================================
   BASIC CART FUNCTIONALITY (OFFLINE)
   ========================================= */

const cart = [];

// Select all "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll(".product-card button");

addToCartButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const productCard = event.target.closest(".product-card");
    const productName = productCard.querySelector("h2").innerText;
    const productPrice = productCard.querySelector(".price").innerText;

    cart.push({
      name: productName,
      price: productPrice,
    });

    alert(`${productName} added to cart`);
    console.log("Cart:", cart);
  });
});

/* =========================================
   PUSH / LOCAL NOTIFICATIONS
   ========================================= */

const notifyBtn = document.getElementById("notifyBtn");

notifyBtn.addEventListener("click", () => {
  // Check browser support
  if (!("Notification" in window)) {
    alert("This browser does not support notifications.");
    return;
  }

  // Ask permission
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      new Notification("Offline Shop", {
        body: "Notifications enabled successfully!",
        icon: "https://cdn-icons-png.flaticon.com/512/1170/1170678.png",
      });
    } else {
      alert("Notification permission denied");
    }
  });
});
