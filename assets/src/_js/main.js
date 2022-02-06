import * as accordion from '@jmc/accordion.js';
import * as ajaxForm from '@jmc/ajax-form.js';

window.addEventListener('load', () => {
    console.info('Window has been loaded');
    accordion.init('form');
    ajaxForm.init('form', { afterSubmitAjaxForm });
});

function afterSubmitAjaxForm(res) {
    console.info('my response');
    console.info(res);
}
