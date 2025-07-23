let totalSpace = 0, busSpace = 0, carSpace = 0, bikeSpace = 0;
let car = 0, bus = 0, bike = 0;

function initialize() {
  totalSpace = parseInt(document.getElementById('totalSpace').value);
  busSpace = parseInt(document.getElementById('busSpace').value);
  carSpace = parseInt(document.getElementById('carSpace').value);
  bikeSpace = parseInt(document.getElementById('bikeSpace').value);

  if (isNaN(totalSpace) || isNaN(busSpace) || isNaN(carSpace) || isNaN(bikeSpace)) {
    alert("⚠️ Please fill in all fields.");
    return;
  }

  if (totalSpace < busSpace + carSpace + bikeSpace) {
    alert("❌ Invalid allocation! Total space is less than sum of vehicle spaces.");
    return;
  }

  car = bus = bike = 0;
  document.getElementById("controls").style.display = "block";
  updateOutput("✅ System Initialized!");
  clearParkingDisplay();
  updateCounts();
}

function updateOutput(text) {
  document.getElementById("output").innerText = text;
}

function createVehicleIcon(type) {
  const icon = document.createElement('i');
  icon.classList.add('fas', 'fade-in');
  icon.setAttribute('data-type', type);
  if (type === 'car') icon.classList.add('fa-car');
  else if (type === 'bus') icon.classList.add('fa-bus');
  else if (type === 'bike') icon.classList.add('fa-motorcycle');
  return icon;
}

function enterVehicle(type) {
  if (car + bus + bike >= totalSpace) {
    updateOutput("🚫 Parking is full!");
    return;
  }

  const displayArea = document.getElementById(type + 'Display');
  let added = false;

  if (type === 'car' && car < carSpace) {
    car++; added = true;
  } else if (type === 'bus' && bus < busSpace) {
    bus++; added = true;
  } else if (type === 'bike' && bike < bikeSpace) {
    bike++; added = true;
  }

  if (added) {
    const icon = createVehicleIcon(type);
    displayArea.appendChild(icon);
    updateCounts();
    updateOutput(`✅ ${capitalize(type)} entered. Total: ${getCount(type)} / ${getMax(type)}`);
  } else {
    updateOutput(`❌ No space available for more ${type}s.`);
  }
}

function exitVehicle(type) {
  const displayArea = document.getElementById(type + 'Display');
  const lastIcon = displayArea.querySelector('i:last-child');

  let removed = false;
  if (type === 'car' && car > 0) { car--; removed = true; }
  else if (type === 'bus' && bus > 0) { bus--; removed = true; }
  else if (type === 'bike' && bike > 0) { bike--; removed = true; }

  if (removed && lastIcon) {
    lastIcon.classList.remove('fade-in');
    lastIcon.classList.add('fade-out');
    setTimeout(() => lastIcon.remove(), 500);
    updateCounts();
    updateOutput(`↩️ ${capitalize(type)} exited. Total: ${getCount(type)} / ${getMax(type)}`);
  } else {
    updateOutput(`⚠️ No ${type} to exit.`);
  }
}

function updateCounts() {
  document.getElementById("carCount").innerText = car;
  document.getElementById("busCount").innerText = bus;
  document.getElementById("bikeCount").innerText = bike;
}

function clearParkingDisplay() {
  document.getElementById('carDisplay').innerHTML = '<h3>🚗 Cars (<span id="carCount">0</span>)</h3>';
  document.getElementById('busDisplay').innerHTML = '<h3>🚌 Buses (<span id="busCount">0</span>)</h3>';
  document.getElementById('bikeDisplay').innerHTML = '<h3>🏍️ Bikes (<span id="bikeCount">0</span>)</h3>';
}

function showVacantSpaces() {
  const carLeft = carSpace - car;
  const busLeft = busSpace - bus;
  const bikeLeft = bikeSpace - bike;
  const totalLeft = totalSpace - (car + bus + bike);

  updateOutput(`📊 Vacant Spaces:\n- Total: ${totalLeft}\n- Car: ${carLeft}\n- Bus: ${busLeft}\n- Bike: ${bikeLeft}`);
}

function showFullRecord() {
  updateOutput(`📋 Full Record:
Total Space: ${totalSpace}
Used Space: ${car + bus + bike}
Remaining: ${totalSpace - (car + bus + bike)}

🚗 Cars: ${car}/${carSpace}
🚌 Buses: ${bus}/${busSpace}
🏍️ Bikes: ${bike}/${bikeSpace}`);
}

function reset() {
  totalSpace = busSpace = carSpace = bikeSpace = 0;
  car = bus = bike = 0;

  document.getElementById("controls").style.display = "none";
  document.getElementById("totalSpace").value = '';
  document.getElementById("busSpace").value = '';
  document.getElementById("carSpace").value = '';
  document.getElementById("bikeSpace").value = '';
  updateOutput("🔄 System reset. Please initialize again.");
  clearParkingDisplay();
}

function getCount(type) {
  return type === 'car' ? car : type === 'bus' ? bus : bike;
}

function getMax(type) {
  return type === 'car' ? carSpace : type === 'bus' ? busSpace : bikeSpace;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
