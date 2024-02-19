// alert();

const scrollBtn = document.getElementById("scrollBtn");
const scrollTo = document.getElementById("scrollTo");

scrollBtn.addEventListener("click", function () {
  scrollTo.scrollIntoView({ behavior: "smooth" });
});

const allBtn = document.getElementsByClassName("seat-btn");

let selectedSeats = [];

for (const btn of allBtn) {
  btn.addEventListener("click", function () {
    // console.log(btn.id);

    if (selectedSeats.includes(btn.id) === false && selectedSeats.length < 4) {
      const selectedSeatNum = btn.innerText;

      const selectedSeat = document.getElementById("table-body");
      const tr = document.createElement("tr");
      const td1 = document.createElement("td");
      const td2 = document.createElement("td");
      const td3 = document.createElement("td");

      td1.innerText = selectedSeatNum;
      td2.innerText = "Economy";
      td3.innerText = "550";

      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      selectedSeat.appendChild(tr);

      setBgColorById(btn.id);
      selectedSeats.push(btn.id);

      // total cost

      const totalCost = document.getElementById("total-cost");
      const totalCostText = totalCost.innerText;
      const totalCostTextValue = parseInt(totalCostText);

      const netTotalCost = totalCostTextValue + 550;

      //seat count

      const seatCount = document.getElementById("seat-count");
      const seatCountText = seatCount.innerText;
      const seatCountTextValue = parseInt(seatCountText);

      const updateSeatCount = seatCountTextValue + 1;

      //update available seat
      const availableSeatCount = document.getElementById("available-seat");
      const availableSeatCountText = availableSeatCount.innerText;
      const availableSeatCountTextValue = parseInt(availableSeatCountText);

      const updateAvailableSeatCount = availableSeatCountTextValue - 1;

      setInnerText("total-cost", netTotalCost);
      setInnerText("seat-count", updateSeatCount);
      setInnerText("available-seat", updateAvailableSeatCount);
      grandTotalCost();

      //submit btn enable
      function enableSubmitBtn() {
        document
          .getElementById("phone-number")
          .addEventListener("keyup", function (event) {
            const text = event.target.value;
            const textValue = parseInt(text);

            if (text.length === 11 && typeof textValue === "number") {
              document.getElementById("submit-btn").removeAttribute("disabled");
            }
          });
      }

      enableSubmitBtn();

      function enableApplyBtn() {
        if (selectedSeats.length === 4) {
          document.getElementById("couponBtn").removeAttribute("disabled");
        }
      }
      enableApplyBtn();
    }
  });
}

function grandTotalCost() {
  const totalCost = document.getElementById("total-cost");
  const totalCostText = totalCost.innerText;
  const totalCostTextValue = parseInt(totalCostText);

  setInnerText("grand-total", totalCostTextValue);
}

function applyCoupon() {
  console.log("btn click");
  const coupon1 = "NEW15";
  const coupon2 = "Couple 20";

  const couponText = document.getElementById("coupon-text").value;

  if (couponText === coupon1 || couponText === coupon2) {
    document.getElementById("coupon-sec").setAttribute("class", "hidden");

    if (couponText === coupon1) {
      const totalCost = document.getElementById("total-cost");
      const totalCostText = totalCost.innerText;
      const totalCostTextValue = parseInt(totalCostText);

      const discountPrice = totalCostTextValue * 0.15;
      const grandTotalCostAfterDiscount = totalCostTextValue - discountPrice;

      const discount = document.getElementById("coupon-price-div");
      const p1 = document.createElement("p");
      const p2 = document.createElement("p");

      p1.innerText = "You Got Discount:";
      p2.innerText = "BDT " + discountPrice;

      discount.appendChild(p1);
      discount.appendChild(p2);

      setInnerText("grand-total", grandTotalCostAfterDiscount);
    } else {
      const totalCost = document.getElementById("total-cost");
      const totalCostText = totalCost.innerText;
      const totalCostTextValue = parseInt(totalCostText);

      const discountPrice = totalCostTextValue * 0.2;
      const grandTotalCostAfterDiscount = totalCostTextValue - discountPrice;

      const discount = document.getElementById("coupon-price-div");
      const p1 = document.createElement("p");
      const p2 = document.createElement("p");

      p1.innerText = "Discount price";
      p2.innerText = "BDT " + discountPrice;

      discount.appendChild(p1);
      discount.appendChild(p2);

      setInnerText("grand-total", grandTotalCostAfterDiscount);
    }
  } else {
    alert("Please input valid coupon code");
  }

  console.log(typeof couponText);
  //document.getElementById("coupon-sec").setAttribute("class", "hidden");
}

function handleSubmitBtn() {}

function setInnerText(elementId, value) {
  document.getElementById(elementId).innerText = value;
}

function setBgColorById(elementId) {
  const element = document.getElementById(elementId);
  element.classList.add("bg-[#1DD100]");
}

//modal
const openBtn = document.getElementById("submit-btn");
const closeBtn = document.getElementById("close-modal");
const modal = document.getElementById("modal");

openBtn.addEventListener("click", function () {
  modal.classList.add("open");
});

closeBtn.addEventListener("click", function () {
  modal.classList.remove("open");
});
