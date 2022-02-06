const regex = {
    email: /^(([^<>+()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

export default {
    required: {
        message: 'Required',
        check: (el) => {
            if (el.type === 'checkbox') {
                return el.checked;
            }
            if (el.type === 'radio') {
                const name = el.name;
                return el.parentNode.querySelectorAll(`input[name=${name}]:checked`).length > 0;
            }
            return el.value !== '';
        },
    },
    email: {
        message: 'E-mail is wrong',
        check: (el) => {
            if (_isRequired(el)) {
                return regex.email.test(el.value.trim());
            }

            return regex.email.test(el.value.trim()) || el.value === '';
        },
    },
    phone: {
        message: 'Phone is wrong',
        check: (el) => {
            if (_isRequired(el)) {
                return el.value.match(/[0-9]/g) && el.value.match(/[0-9]/g).length === 11;
            }

            return (el.value.match(/[0-9]/g) && el.value.match(/[0-9]/g).length === 11) || el.value === '';
        },
    },
};

function _isRequired(el) {
    return el.dataset.validate.includes('required');
}
