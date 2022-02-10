export function init({
    blockSelector = '.js-tab-block',
    tabSelector = '.js-tab',
    triggerSelector = '.js-tab-trigger',
    triggerType = 'default',
} = {}) {
    const $blocks = document.querySelectorAll(blockSelector);

    if (!$blocks.length) {
        console.warn(`${blockSelector} is empty`);
        return;
    }

    const queryTab = new URLSearchParams(window.location.search).get('tab');

    $blocks.forEach((block) => {
        const $tabs = block.querySelectorAll(tabSelector);
        const $triggers = block.querySelectorAll(triggerSelector);

        $tabs.forEach((tab) => {
            if (!tab.classList.contains('active')) {
                hideTab(tab);
            }
        });

        $triggers.forEach((trigger) => {
            const targets = trigger.dataset.targets.split(',');

            if (targets.includes(queryTab)) {
                showTabById(block, targets, { triggerSelector, tabSelector, triggerType });
            }

            trigger.addEventListener('click', () => {
                showTabById(block, targets, { triggerSelector, tabSelector, triggerType });
            });
        });
    });
}

function showTabById(
    block,
    targets,
    { triggerSelector = '.js-tab-trigger', tabSelector = '.js-tab', triggerType = 'default' }
) {
    const $tabs = block.querySelectorAll(tabSelector);
    const $triggers = block.querySelectorAll(triggerSelector);

    $triggers.forEach((trig) => {
        const triggers = trig.dataset.targets.trim().replace(/\s/g, '');

        switch (triggerType) {
            case 'radio': {
                if (targets.join(',') === triggers) {
                    trig.setAttribute('checked', true);
                } else {
                    trig.removeAttribute('checked');
                }
                break;
            }
            default: {
                if (targets.join(',') === triggers) {
                    trig.classList.add('active');
                } else {
                    trig.classList.remove('active');
                }
                break;
            }
        }
    });

    $tabs.forEach((tab) => {
        const id = tab.dataset.tabId;

        if (targets.includes(id)) {
            showTab(tab);
        } else {
            hideTab(tab);
        }
    });
}

function hideTab(tab) {
    tab.classList.remove('active');
    tab.style.display = 'none';
    tab.style.opacity = 0;
}

function showTab(tab) {
    tab.classList.add('active');
    tab.style.display = '';
    tab.style.opacity = 1;
}
