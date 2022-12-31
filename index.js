document.getElementById('generateButton').addEventListener('click', generatePasswords);
const passwordList = document.getElementById('passwordOutput');
document.getElementById('passwordOutput').addEventListener('click', copyToClipboard);

document.getElementById('generateButton').addEventListener('click', generatePasswords);

function generatePasswords() {
  // Get the max length value from the input element
  let maxLength = document.getElementById("maxLength").value;

  // Check if the include specials checkbox is checked
  let includeSpecials = document.getElementById("includeSpecials").checked;

  // Select the characters that can be included in the password
  let characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  // Check if the includeSpecials checkbox is checked
  if (includeSpecials) {
    characters = characters.concat(["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"]);
  }

  // Select the password output element
  const passwordOutput = document.getElementById('passwordOutput');

  // Generate a list of passwords
  let passwords = '';
  for (let i = 0; i < 2; i++) {
    let password = '';

    // Get the maximum length of the password from the maxLength input
    const maxLength = document.getElementById('maxLength').value;

    for (let j = 0; j < maxLength; j++) {
      const index = Math.floor(Math.random() * characters.length);
      password += characters[index];
    }
    passwords += `<li class="password"><span class="password-text">${password}</span><br /><span class="copy">Click to Copy</span></li>`;
  }

  // Update the password list in the HTML
  passwordOutput.innerHTML = passwords;
}


function copyToClipboard(event) {
  // Get the target element that was clicked
  const target = event.target;

  // Check if the target is a copy span element
  if (target.classList.contains('copy')) {
    // Get the parent list item
    const passwordItem = target.parentElement;

    // Get the password from the list item's HTML content
    const password = passwordItem.innerHTML;

    // Remove the "Copy to clipboard" text and span element from the password
    const cleanedPassword = password.replace("<br><span class=\"copy\">Click to Copy</span>", "");

    // Create a temporary input element
    const input = document.createElement('input');

    // Set the value of the input element to the cleaned password
    input.value = cleanedPassword;

    // Add the input element to the page
    document.body.appendChild(input);

    // Select the text of the input element
    input.select();

    // Copy the text to the clipboard
    document.execCommand('copy');

    // Remove the input element from the page
    document.body.removeChild(input);

    // Change the text of the copy span element to "Copied!"
    target.textContent = "Copied!";

    // Add the "copied" class to the password list item
    passwordItem.classList.add("copied");

    // Remove the "copied" class after a certain amount of time
    setTimeout(() => {
      target.classList.remove("copied");
    }, 1000);
  }
}
