document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const errorDiv = document.getElementById('loginError');
        errorDiv.textContent = '';

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            });
            if (res.status == 404) {
                errorDiv.textContent = 'Account not found. Please check your credentials.';
                return;
            }
            const data = await res.json();
            if (data.error) {
                errorDiv.textContent = data.error;
            }
        } catch (err) {
            errorDiv.textContent = 'Login failed. Please try again.';
        }
    });
});
