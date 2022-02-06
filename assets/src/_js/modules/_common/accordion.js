export function init({
    blockSelector = '.js-accordion-block',
    accordionSelector = '.js-accordion',
    triggerSelector = '.js-accordion-trigger',
    bodySelector = '.js-accordion-body',
    hide = false,
    once = true,
} = {}) {
    const $accordionsBlocks = document.querySelectorAll(blockSelector);

    if (!$accordionsBlocks.length) {
        console.warn(`${blockSelector} is undefined`);
        return;
    }

    $accordionsBlocks.forEach((block) => {
        block.onclick = (e) => {
            const trig = e.target.closest(triggerSelector);

            if (trig) {
                const currentAcc = trig.closest(accordionSelector);

                if (once) {
                    $accordions.forEach((acc) => {
                        if (acc !== currentAcc) {
                            acc.classList.remove('active');
                            const body = acc.querySelector(bodySelector);

                            body.style.maxHeight = null;
                        }
                    });
                }

                toggle(currentAcc, bodySelector);
            }
        };

        const $accordions = block.querySelectorAll(accordionSelector);

        if (!$accordionsBlocks.length) {
            console.warn(`${blockSelector} is undefined`);
            return;
        }

        $accordions.forEach((acc) => {
            const body = acc.querySelector(bodySelector);

            body.style.maxHeight = body.scrollHeight + 'px';

            if (hide) {
                toggle(acc, bodySelector);
            }
        });
    });
}

export function toggle(accordion, content) {
    accordion.classList.toggle('active');

    const body = accordion.querySelector(content);

    if (body.style.maxHeight) {
        body.style.maxHeight = null;
    } else {
        body.style.maxHeight = body.scrollHeight + 'px';
    }
}
