import * as accordion from '@jmc/accordion.js';
import * as ajaxForm from '@jmc/ajax-form.js';
import * as tabs from '@jmc/tabs.js';

document.body.style.backgroundColor = 'red';

window.addEventListener('load', () => {
    console.info('Window has been loaded');
    ajaxForm.init('form', { afterSubmitAjaxForm });
    accordion.init();
    tabs.init();

    setTimeout(() => {
        document.body.style.backgroundColor = 'unset';
    }, 500);
});

function afterSubmitAjaxForm(res) {
    console.info('my response');
    console.info(res);
}
