const websiteInput = document.querySelector('#website-input');
const loginInput = document.querySelector('#login-input');
const passwordInput = document.querySelector('#password-input');
const saveButton = document.querySelector('#save-button');
const passwordListElement = document.querySelector('#password-list');

let passwords = [];

const getSavedPasswords = () => {
  if (localStorage.getItem('passwords')) {
    return JSON.parse(localStorage.getItem('passwords'));
  }
  return [];
};

const renderPassword = (password, index) => {
  const passwordElement = document.createElement('div');
  passwordElement.innerHTML = `
    <span>${password.website}: ${password.login} - ${password.password}</span>
    <button class="delete-button" data-index="${index}">Delete</button>
  `;
  passwordListElement.appendChild(passwordElement);
};

const renderPasswords = () => {
  passwordListElement.innerHTML = '';
  passwords.forEach(renderPassword);
};

const addPassword = () => {
  const website = websiteInput.value;
  const login = loginInput.value;
  const password = passwordInput.value;

  passwords.push({ website, login, password });
  localStorage.setItem('passwords', JSON.stringify(passwords));
  renderPasswords();

  websiteInput.value = '';
  loginInput.value = '';
  passwordInput.value = '';
};

const deletePassword = (event) => {
  if (event.target.classList.contains('delete-button')) {
    const index = event.target.dataset.index;
    passwords.splice(index, 1);
    localStorage.setItem('passwords', JSON.stringify(passwords));
    renderPasswords();
  }
};

passwords = getSavedPasswords();
renderPasswords();

saveButton.addEventListener('click', addPassword);
document.addEventListener('click', deletePassword);
