export default class NodeHelpers {
    static outerHeight(el) {
        const STYLES = window.getComputedStyle(el);

        const HEIGHT = el.getBoundingClientRect().height;
        const MARGINS = ['margin-top', 'margin-bottom']
            .map((margin) => parseInt(STYLES[margin]))
            .reduce((acc, curr) => acc + curr, 0);

        return HEIGHT + MARGINS;
    }
}
