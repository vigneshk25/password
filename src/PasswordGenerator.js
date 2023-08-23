import React, { useState } from 'react';
import copy from 'clipboard-copy';
import './password.css';

function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [lastPasswords, setLastPasswords] = useState([]);

  const generatePassword = (includeNumbers, includeAlphabets, includeSpecialChars) => {
    const numbers = '0123456789';
    const alphabets = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let validChars = '';
    if (includeNumbers) validChars += numbers;
    if (includeAlphabets) validChars += alphabets;
    if (includeSpecialChars) validChars += specialChars;

    let generatedPassword = '';
    const validCharsLength = validChars.length;

    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * validCharsLength);
      generatedPassword += validChars[randomIndex];
    }

    setPassword(generatedPassword);
    setLastPasswords([...lastPasswords, generatedPassword]);
    localStorage.setItem('lastPasswords', JSON.stringify(lastPasswords));
  };

  const copyToClipboard = () => {
    copy(password);
    alert('Password copied to clipboard!');
  };

  return (
    <div className="password-generator">
      <h2>Random Password Generator</h2>
      <div className='pass'>
      <button onClick={() => generatePassword(true, true, true)}>Generate Password</button>
      <div className="generated-password">{password}</div>
      <button onClick={copyToClipboard}>Copy to Clipboard</button>

      </div>
      <div className='showPass'>
      <h3>Last 5 Generated Passwords</h3>
      <ul>
        {lastPasswords.map((prevPassword, index) => (
          <li key={index}>{prevPassword}</li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default PasswordGenerator;
