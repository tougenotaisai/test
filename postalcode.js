document.addEventListener('DOMContentLoaded', function() {
    const postalInput = document.getElementById('postal-code');
    const form = document.querySelector('form');

    if (postalInput) {
        postalInput.addEventListener('blur', function() {
            // ハイフンを除去し、7桁の数字に変換
            const postalCode = this.value.replace(/-/g, '');
            if (/^\d{7}$/.test(postalCode)) {
                fetch(`https://api.zipaddress.net/?zipcode=${postalCode}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.code === 200 && data.data && data.data.fullAddress) {
                            document.getElementById('address').value = data.data.fullAddress;
                        } else {
                            // 住所が取得できなかった場合は空欄にする
                            document.getElementById('address').value = '';
                        }
                    })
                    .catch(error => {
                        // 通信エラー時も空欄にする
                        document.getElementById('address').value = '';
                    });
            }
        });
    }

    if (form) {
        form.addEventListener('submit', function(e) {
            // 既存のエラーメッセージを削除
            const oldError = document.getElementById('form-error');
            if (oldError) oldError.remove();

            let errorMsg = '';
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const username = document.getElementById('username').value;
            const postal = document.getElementById('postal-code').value;
            const address = document.getElementById('address').value;
            const phone = document.getElementById('phone').value;

            if (postal.length > 8) errorMsg += '郵便番号は8桁以内で入力してください。\n';
            if (username.length > 20) errorMsg += 'ユーザー名は20桁以内で入力してください。\n';
            if (address.length > 50) errorMsg += '住所は50桁以内で入力してください。\n';
            if (email.length > 50) errorMsg += 'メールアドレスは50桁以内で入力してください。\n';
            if (phone.length > 20) errorMsg += '電話番号は20桁以内で入力してください。\n';

            if (errorMsg) {
                e.preventDefault();
                const errorDiv = document.createElement('div');
                errorDiv.id = 'form-error';
                errorDiv.style.color = 'red';
                errorDiv.style.marginTop = '16px';
                errorDiv.textContent = errorMsg.replace(/\n/g, ' ');
                form.appendChild(errorDiv);
            }
        });
    }
});