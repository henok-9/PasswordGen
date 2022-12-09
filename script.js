// Define the password generation function
function generatePassword(length, complexity, characterSets) {
  // Initialize the password as an empty string
  let password = "";

  // Iterate over the desired number of characters
  for (let i = 0; i < length; i++) {
    // Initialize the character set as the first character set
    let charSet = characterSets[0];

    // If the complexity is high, use a random character set
    if (complexity === "high") {
      charSet = characterSets[Math.floor(Math.random() * characterSets.length)];
    }

    // Generate a random character from the character set
    let char = charSet[Math.floor(Math.random() * charSet.length)];

    // Add the character to the password
    password += char;
  }

  // Return the generated password
  return password;
}

// Define the character sets
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const specialChars = "!@#$%^&*()_+-=[]{}|;':\"<>,.?/";


// Define the generate function, which generates the password and updates the user interface
function generate() {
  // Get the input values from the user interface
  const length = document.getElementById("length").value;
  const complexity = document.getElementById("complexity").value;
  const lowercase = document.getElementById("lowercase").checked;
  const uppercase = document.getElementById("uppercase").checked;
  const numbers = document.getElementById("numbers").checked;
  const special = document.getElementById("special").checked;

  // Define the character sets to use based on the input values
  const characterSets = [];
  if (lowercase) characterSets.push(lowercaseChars);
  if (uppercase) characterSets.push(uppercaseChars);
  if (numbers) characterSets.push(numbersChars);
  if (special) characterSets.push(specialChars);

  // Generate the password
  const password = generatePassword(length, complexity, characterSets);

  // Update the password preview
  const preview = document.getElementById("preview");
  preview.value = password;

  // Update the password strength meter
  const strength = document.getElementById("strength");
  let passwordScore = 0;
  if (lowercase) passwordScore += length;
  if (uppercase) passwordScore += length;
  if (numbers) passwordScore += length;
  if (special) passwordScore += length;
  strength.value = passwordScore;

  // Enable the copy and save buttons
  const copy = document.getElementById("copy");
  copy.disabled = false;
  const save = document.getElementById("save");
  save.disabled = false;

  // Store the password in the history
  const history = document.getElementById("history");
  history.value += password + "\n";
}

// Define the copy function, which copies the password to the clipboard
function copy() {
  // Get the password
  const password = document.getElementById("password");

  // Copy the password to the clipboard
  password.select();
  document.execCommand("copy");
}

// Define the save function, which saves the password to a file
function save() {
  // Get the password
  const password = document.getElementById("password");

  // Create a file with the password
  const file = new Blob([password.value], {type: "text/plain"});

  // Save the file to the local filesystem
  const a = document.createElement("a");
  const url = URL.createObjectURL(file);
  a.href = url;
  a.download = "password.txt";
  a.click();
}

// Add event listeners to the generate, copy, and save buttons
document.getElementById("generate").addEventListener("click", generate);
document.getElementById("copy").addEventListener("click", copy);
document.getElementById("save").addEventListener("click", save);
