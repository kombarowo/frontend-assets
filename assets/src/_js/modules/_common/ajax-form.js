import rules from '@jmc/validate-rules.js';

export function init(
    selector,
    {
        beforeSubmitAjaxForm = () => {},
        afterSubmitAjaxForm = () => {},
        onError = () => {},
        onSuccess = () => {},
        validClass = 'input--valid',
        invalidClass = 'input--invalid',
        disabledBtnClass = 'button--disabled',
        responseType = 'json',
    } = {}
) {
    if (!selector) {
        console.warn('Form selector is undefined');
        return;
    }

    const $forms = document.querySelectorAll(selector);

    if (!$forms.length) {
        console.warn(`${selector} is undefined`);
        return;
    }

    $forms.forEach(($form) => {
        const $inputsToValidate = $form.querySelectorAll('[data-validate]');
        const $sendButton = $form['send-button'];
        const $allInputs = $form.querySelectorAll('input');
        const formData = new FormData($form);

        $form.addEventListener('submit', (e) => {
            _onAjaxFormSubmit(e, $inputsToValidate, $sendButton, $allInputs, formData);
        });

        $inputsToValidate.forEach(($input) => {
            $input.addEventListener('input', _onInput);
        });
    });

    async function _onAjaxFormSubmit(e, $inputsToValidate, $sendButton, $allInputs, formData) {
        e.preventDefault();

        const $form = e.target;

        try {
            _validateForm($inputsToValidate);
        } catch (error) {
            console.error(error.message);
            return;
        }

        _beforeSubmitAjaxForm($sendButton);
        beforeSubmitAjaxForm($form, formData);

        try {
            const response = await _submitAjaxForm($form, formData);

            _afterSubmitAjaxForm(response, $sendButton);
        } catch (error) {
            console.error(error);
            onError();
        }

        onSuccess();

        _resetForm($allInputs, $sendButton);
    }

    function _onInput(e) {
        const $input = e.target;
        _resetInputValidation($input);
    }

    function _validateForm($inputsToValidate) {
        let isValid = true;

        $inputsToValidate.forEach(($input) => {
            const inputRules = $input.dataset.validate.replace(/\s/g, '').split(',');

            inputRules.forEach((r) => {
                const rule = rules[r];

                if (!rule.check($input)) {
                    $input.classList.add(invalidClass);

                    isValid = false;
                } else {
                    $input.classList.add(validClass);
                }
            });
        });

        if (!isValid) {
            throw new Error('Form is not valid');
        }
    }

    function _beforeSubmitAjaxForm($sendButton) {
        $sendButton.setAttribute('disabled', true);
        $sendButton.classList.add(disabledBtnClass);
    }

    async function _submitAjaxForm($form, formData) {
        const method = $form.method.toLowerCase().trim();

        switch (method) {
            case 'get':
                return fetch($form.action);
            case 'post':
                return fetch($form.action, {
                    method: 'POST',
                    body: formData,
                });
            default:
                throw new Error('Bad form method');
        }
    }

    async function _afterSubmitAjaxForm(response, $sendButton) {
        $sendButton.removeAttribute('disabled');
        $sendButton.classList.remove(disabledBtnClass);

        const parsedResponse = responseType === 'json' ? await response.json() : await response.text();

        afterSubmitAjaxForm(parsedResponse);
    }

    function _resetForm($inputs, $sendButton) {
        $inputs.forEach((input) => {
            _resetInput(input);
        });

        $sendButton.removeAttribute('disabled');
        $sendButton.classList.remove(disabledBtnClass);
    }

    function _resetInputValidation($input) {
        $input.classList.remove(validClass);
        $input.classList.remove(invalidClass);
    }

    function _resetInput($input) {
        _resetInputValidation($input);
        if ($input.type === 'checkbox' || $input.type === 'radio') {
            $input.removeAttribute('checked');
        }

        $input.value = '';
    }
}
