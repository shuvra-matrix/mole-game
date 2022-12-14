function getSadInterval() {
  return Date.now() + 1000;
}

function getGoneInterval() {
  return Date.now() + Math.floor(Math.random() * 18000) + 2000;
}

function getHungryInterval() {
  return Date.now() + Math.floor(Math.random() * 3000) + 2000;
}

const mole = [
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-0"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-1"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-2"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-3"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-4"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-5"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-6"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-7"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-8"),
  },
  {
    status: "sad",
    next: getSadInterval(),
    king: false,
    node: document.getElementById("hole-9"),
  },
];

function getNextStatus(mole) {
  switch (mole.status) {
    case "sad":
      mole.next = getSadInterval();
      mole.status = "leaving";
      mole.node.children[0].src = "./images/mole-leaving.png";
      break;
    case "leaving":
      mole.next = getGoneInterval();
      mole.status = "gone";
      mole.node.children[0].classList.add("gone");
      break;
    case "gone":
      mole.next = getHungryInterval();
      mole.status = "hungry";
      mole.node.children[0].classList.add("hungry");
      mole.node.children[0].classList.remove("gone");
      mole.node.children[0].src = "./images/mole-hungry.png";
      break;
    case "hungry":
      mole.status = "sad";
      mole.node.children[0].classList.remove("hungry");
      mole.next = getSadInterval();
      mole.node.children[0].src = "./images/mole-sad.png";
      break;
    case "feed":
      mole.next = getSadInterval();
      mole.status = "leaving";
      mole.node.children[0].src = "./images/mole-leaving.png";
      break;
  }
}

function feed(event) {
  if (
    event.target.tagName !== "IMG" ||
    !event.target.classList.contains("hungry")
  ) {
    return;
  }

  console.log(event.target.dataset.index);
  const moles = mole[parseInt(event.target.dataset.index)];

  moles.status = "feed";
  moles.next = getSadInterval();
  moles.node.children[0].src = "./images/mole-fed.png";
  moles.node.children[0].classList.remove("hungry");
  moles.next = getSadInterval();
}

let runAgainAt = Date.now();

function nextFrame() {
  const now = Date.now();
  if (Date.now() >= now) {
    for (let i = 0; i < mole.length; i++) {
      if (mole[i].next <= now) {
        getNextStatus(mole[i]);
      }
    }
    runAgainAt = now + 100;
  }
  requestAnimationFrame(nextFrame);
}

requestAnimationFrame(nextFrame);

document.querySelector(".bg").addEventListener("click", feed);

nextFrame();
