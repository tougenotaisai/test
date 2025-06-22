document.addEventListener('DOMContentLoaded', function() {
    const postalInput = document.getElementById('postal-code');
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
});