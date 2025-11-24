// Frontend login logic

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const messageEl = document.getElementById('message');
  messageEl.textContent = '';
  messageEl.className = 'message';

  try {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      messageEl.textContent = '✅ Login successful!';
      messageEl.classList.add('success');

      // Example: redirect to homepage after login
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    } else {
      messageEl.textContent = data.message || '❌ Login failed. Check credentials.';
      messageEl.classList.add('error');
    }
  } catch (err) {
    console.error('Login error:', err);
    messageEl.textContent = '⚠️ Server connection error.';
    messageEl.classList.add('error');
  }
  const NEW_PW = 'NewStrongPassword!123'; // choose a strong password
  const hash = await bcrypt.hash(NEW_PW, salt);

});
