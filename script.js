let score = 0;
const maxScore = 20;

const starttime = Date.now();
let endtime = 0;

function getSadInterval() {
  return Date.now() + 1000;
}

function getGoneInterval() {
  return Date.now() + Math.floor(Math.random() * 18000) + 2000;
}

function getHungryInterval() {
  return Date.now() + Math.floor(Math.random() * 3000) + 2000;
}

function getKingStatus() {
  return Math.random() > 0.9;
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
      if (mole.king) {
        mole.node.children[0].src = "./images/king-mole-leaving.png";
      } else {
        mole.node.children[0].src = "./images/mole-leaving.png";
      }

      break;
    case "leaving":
      mole.next = getGoneInterval();
      mole.status = "gone";
      mole.node.children[0].classList.add("gone");
      break;
    case "gone":
      mole.next = getHungryInterval();
      mole.status = "hungry";
      mole.king = getKingStatus();
      mole.node.children[0].classList.add("hungry");
      mole.node.children[0].classList.remove("gone");
      if (mole.king) {
        mole.node.children[0].src = "./images/king-mole-hungry.png";
      } else {
        mole.node.children[0].src = "./images/mole-hungry.png";
      }
      break;
    case "hungry":
      mole.status = "sad";
      mole.node.children[0].classList.remove("hungry");
      mole.next = getSadInterval();
      if (mole.king) {
        mole.node.children[0].src = "./images/king-mole-sad.png";
      } else {
        mole.node.children[0].src = "./images/mole-sad.png";
      }

      break;
    case "feed":
      mole.next = getSadInterval();
      mole.status = "leaving";
      if (mole.king) {
        mole.node.children[0].src = "./images/king-mole-leaving.png";
      } else {
        mole.node.children[0].src = "./images/mole-leaving.png";
      }
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

  moles.node.children[0].classList.remove("hungry");
  moles.next = getSadInterval();
  if (mole.king) {
    moles.node.children[0].src = "./images/king-mole-fed.png";
    score += 2;
  } else {
    moles.node.children[0].src = "./images/mole-fed.png";
    score++;
  }
  if (score >= maxScore) {
    let timenow = Date.now();
    endtime = Math.round((timenow - starttime) / 1000);
    document.querySelector(".timer").textContent = `Time : ${endtime}S`;
    document.querySelector(".timer").classList.remove("hide");
    win();
  }
  document.querySelector(".worm-container").style.width = `${5 * score}%`;
}

function win() {
  document.querySelector(".bg").classList.add("hide");
  document.querySelector(".win").classList.remove("hide");
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
