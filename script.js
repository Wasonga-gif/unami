document.addEventListener('DOMContentLoaded', () => {
    // Handle Sign Up
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('role').value;
            const otp = Math.floor(100000 + Math.random() * 900000);

            localStorage.setItem('signupData', JSON.stringify({ email, password, role, otp, verified: false }));

            alert(`Your OTP is: ${otp}`);
            window.location.href = 'verification.html';
        });
    }

    // Handle OTP verification
    const otpForm = document.getElementById('otpForm');
    if (otpForm) {
        otpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const otpInput = document.getElementById('otpInput').value;
            const userData = JSON.parse(localStorage.getItem('signupData'));
            if (userData && userData.otp.toString() === otpInput) {
                userData.verified = true;
                localStorage.setItem('signupData', JSON.stringify(userData));
                document.getElementById('verifyMessage').innerText = 'OTP Verified! You can now log in.';
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            } else {
                document.getElementById('verifyMessage').innerText = 'Invalid OTP!';
            }
        });
    }

    // Handle Login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const loginEmail = document.getElementById('loginEmail').value;
            const loginPassword = document.getElementById('loginPassword').value;
            const userData = JSON.parse(localStorage.getItem('signupData'));

            if (userData && userData.email === loginEmail && userData.password === loginPassword) {
                if (userData.verified) {
                    document.getElementById('loginMessage').innerText = `Login successful! Welcome ${userData.role} of Unami FC.`;
                } else {
                    document.getElementById('loginMessage').innerText = 'Please verify your OTP first.';
                }
            } else {
                document.getElementById('loginMessage').innerText = 'Invalid login credentials!';
            }
        });
    }
});
