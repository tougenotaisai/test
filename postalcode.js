document.addEventListener('DOMContentLoaded', function() {
    const postalInput = document.getElementById('postal-code');
    const form = document.querySelector('form');

    if (postalInput) {
        postalInput.addEventListener('blur', function() {
            const postalCode = this.value.replace(/-/g, '');
            if (/^\d{7}$/.test(postalCode)) {
                fetch(`https://api.zipaddress.net/?zipcode=${postalCode}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.code === 200 && data.data && data.data.fullAddress) {
                            document.getElementById('address').value = data.data.fullAddress;
                        } else {
                            document.getElementById('address').value = '';
                        }
                    })
                    .catch(error => {
                        document.getElementById('address').value = '';
                    });
            }
        });
    }

    if (form) {
        form.addEventListener('submit', function(e) {
            const oldError = document.getElementById('form-error');
            if (oldError) oldError.remove();

            let errorMsg = '';
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const username = document.getElementById('username').value.trim();
            const postal = document.getElementById('postal-code').value.replace(/-/g, '').trim();
            const address = document.getElementById('address').value.trim();
            const phone = document.getElementById('phone').value.trim();

            if (postal.length > 8) errorMsg += '郵便番号は8桁以内で入力してください。<br>';
            if (username.length > 20) errorMsg += 'ユーザー名は20桁以内で入力してください。<br>';
            if (address.length > 50) errorMsg += '住所は50桁以内で入力してください。<br>';
            if (email.length > 50) errorMsg += 'メールアドレスは50桁以内で入力してください。<br>';
            if (phone.length > 20) errorMsg += '電話番号は20桁以内で入力してください。<br>';

            if (errorMsg) {
                e.preventDefault();
                const errorDiv = document.createElement('div');
                errorDiv.id = 'form-error';
                errorDiv.style.color = 'red';
                errorDiv.style.marginTop = '16px';
                errorDiv.innerHTML = errorMsg;
                form.appendChild(errorDiv);
            }
        });
    }
});