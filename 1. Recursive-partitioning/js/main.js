function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function updateControlsCount() {
  const controlsCount = document.querySelectorAll(".controls").length;
  document.getElementById("controls-count").textContent = `Total Controls: ${controlsCount}`;
}

function splitPartition(event, direction) {
  const partition = event.target.closest(".singal-partition");

  const wrapper = document.createElement("div");
  wrapper.setAttribute("class", "parent-partition");

  partition.parentNode.insertBefore(wrapper, partition);
  wrapper.appendChild(partition);

  const parentPartition = partition.closest(".parent-partition");

  console.log(parentPartition);

  const newPartition = document.createElement("div");
  const newColor = getRandomColor();

  newPartition.classList.add("singal-partition");
  newPartition.style.backgroundColor = newColor;

  const controlsHtml = `
      <div class="controls">
          <button class="split-btn" onclick="splitPartition(event, 'V')">V</button>
          <button class="split-btn" onclick="splitPartition(event, 'H')">H</button>
          <button class="split-btn" onclick="removePartition(event)">-</button>
      </div>
  `;

  if (direction === "V") {
    parentPartition.style.flexDirection = "row";
    partition.style.flex = "50%";
  } else {
    parentPartition.style.flexDirection = "column";
    partition.style.flex = "50%";
  }

  newPartition.innerHTML = controlsHtml;
  partition.innerHTML = controlsHtml;
  partition.parentNode.appendChild(newPartition);

  updateControlsCount(); // Update count after split
}

function removePartition(event) {
  const partition = event.target.closest(".singal-partition");
  partition.remove();
  updateControlsCount(); // Update count after removal
}

// Initial update of controls count
updateControlsCount();
