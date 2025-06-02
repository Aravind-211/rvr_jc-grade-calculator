// script.js
document.getElementById('addSubject').addEventListener('click', () => {
  const container = document.getElementById('sgpaSubjects');
  const row = document.createElement('div');
  row.className = 'row g-2';
  row.innerHTML = `
    <div class="col">
      <input type="number" class="form-control" placeholder="Credits" step="0.1" min="0">
    </div>
    <div class="col">
      <select class="form-select">
        <option value="10">A+</option>
        <option value="9">A</option>
        <option value="8">B</option>
        <option value="7">C</option>
        <option value="6">D</option>
        <option value="5">E</option>
        <option value="0">F</option>
      </select>
    </div>`;
  container.appendChild(row);
});


document.getElementById('calculateSGPA').addEventListener('click', () => {
  const rows = document.querySelectorAll('#sgpaSubjects .row');
  let totalCredits = 0;
  let weightedSum = 0;

  rows.forEach(row => {
    const credits = parseFloat(row.querySelector('input').value);
    const grade = parseFloat(row.querySelector('select').value);
    if (!isNaN(credits) && !isNaN(grade)) {
      totalCredits += credits;
      weightedSum += credits * grade;
    }
  });

  const result = totalCredits ? (weightedSum / totalCredits).toFixed(2) : 'Invalid Input';
  document.getElementById('sgpaResult').textContent = `SGPA: ${result}`;
});


document.getElementById('numSemesters').addEventListener('change', setupCGPAFields);

function setupCGPAFields() {
  const num = parseInt(document.getElementById('numSemesters').value);
  const container = document.getElementById('cgpaSemesters');
  container.innerHTML = '';

  for (let i = 0; i < num; i++) {
    const row = document.createElement('div');
    row.className = 'row g-2';
    row.innerHTML = `
      <div class="col">
        <input type="number" class="form-control cgpa-credits" placeholder="Credits" step="0.1">
      </div>
      <div class="col">
        <input type="number" class="form-control cgpa-sgpa" placeholder="SGPA" step="0.01">
      </div>`;
    container.appendChild(row);
  }
}


document.getElementById('calculateCGPA').addEventListener('click', () => {
  const creditsInputs = document.querySelectorAll('.cgpa-credits');
  const sgpaInputs = document.querySelectorAll('.cgpa-sgpa');
  let totalCredits = 0;
  let weightedSum = 0;

  creditsInputs.forEach((input, i) => {
    const credits = parseFloat(input.value);
    const sgpa = parseFloat(sgpaInputs[i].value);
    if (!isNaN(credits) && !isNaN(sgpa)) {
      totalCredits += credits;
      weightedSum += credits * sgpa;
    }
  });

  const result = totalCredits ? (weightedSum / totalCredits).toFixed(2) : 'Invalid Input';
  document.getElementById('cgpaResult').textContent = `CGPA: ${result}`;
});

// Initialize with default CGPA fields
setupCGPAFields();
