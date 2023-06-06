function getInputElement(elementId) {
  return document.getElementById(elementId);
}

function setError(element, message) {
  element.classList.add('error');
  element.textContent = message;
}

function clearError(elements) {
  elements.forEach(element => {
    element.classList.remove('error');
    element.textContent = '';
  });
}

function isFieldEmpty(value) {
  return isNaN(value) || value === '';
}

function validateFields(inputYear, inputMonth, inputDay) {
  const { inputElements, errorElements } = getInputAndErrorElements();
  clearError(inputElements);

  for (let i = 0; i < inputElements.length; i++) {
    if (isFieldEmpty(inputElements[i].value)) {
      inputElements[i].classList.add('error');
      setError(errorElements[i], 'This field is required');
      return false;
    }
  }

  return true;
}

function checkDateValidity(inputYear, inputMonth, inputDay) {
  const { inputElements, errorElements } = getInputAndErrorElements();
  const currYear = new Date().getFullYear();
  const currMonth = new Date().getMonth() + 1;
  const currDay = new Date().getDate();
  const maxDaysInMonth = new Date(inputYear, inputMonth, 0).getDate();

  if (
    inputYear > currYear ||
    inputMonth > 12 ||
    inputDay > maxDaysInMonth ||
    inputYear < 0 ||
    (inputYear === currYear && inputMonth > currMonth) ||
    (inputYear === currYear && inputMonth === currMonth && inputDay > currDay)
  ) {
    inputElements.forEach(element => element.classList.add('error'));

    if (
      inputYear > currYear ||
      (inputYear === currYear && inputMonth > currMonth) ||
      (inputYear === currYear && inputMonth === currMonth && inputDay > currDay)
    ) {
      errorElements.forEach(errorElement => setError(errorElement, 'Must be in the past'));
    }

    if (inputMonth > 12) {
      setError(errorElements[1], 'Must be a valid month');
    }

    if (inputDay > maxDaysInMonth) {
      setError(errorElements[2], 'Must be a valid day');
    }

    return false;
  }

  return true;
}

function getInputAndErrorElements() {
  const inputElements = [
    getInputElement('input-year'),
    getInputElement('input-month'),
    getInputElement('input-day')
  ];
  const errorElements = [
    getInputElement('error-year'),
    getInputElement('error-month'),
    getInputElement('error-day')
  ];
  return { inputElements, errorElements };
}

function CalcAge() {
  const inputYear = parseInt(getInputElement('input-year').value);
  const inputMonth = parseInt(getInputElement('input-month').value);
  const inputDay = parseInt(getInputElement('input-day').value);

  const years = getInputElement('years');
  const months = getInputElement('months');
  const days = getInputElement('days');

  const { inputElements, errorElements } = getInputAndErrorElements();
  clearError(inputElements);
  clearError(errorElements);

  const isValid = validateFields(inputYear, inputMonth, inputDay);

  if (!isValid) {
    return;
  }

  const isDateValid = checkDateValidity(inputYear, inputMonth, inputDay);

  if (!isDateValid) {
    return;
  }

  const currentDate = new Date();
  const currYear = currentDate.getFullYear();
  const currMonth = currentDate.getMonth() + 1;
  const currDay = currentDate.getDate();
  const maxDaysInMonth = new Date(inputYear, inputMonth, 0).getDate();

  let ageYears = currYear - inputYear;
  let ageMonths = currMonth - inputMonth;
  let ageDays = currDay - inputDay;

  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  if (ageDays < 0) {
    const prevMonthLastDay = new Date(currYear, currMonth - 1, 0).getDate();
    ageDays += prevMonthLastDay;
    ageMonths--;
    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }
  }

  years.innerHTML = ageYears;
  months.innerHTML = ageMonths;
  days.innerHTML = ageDays;
}