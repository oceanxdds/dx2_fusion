import { ref, watch, onBeforeUnmount } from 'vue'
import LeaderLine from 'leader-line-new'

// Any node's own children/collapse state only affects that node's direct
// connectors, but expanding/collapsing ANYWHERE in the tree reflows the whole
// flex layout (siblings shift position). A single shared tick lets every
// node's connectors redraw together whenever anything anywhere changes,
// instead of only the node whose own state changed.
const redrawTick = ref(0)

export function requestRedraw() {
    redrawTick.value++
}

export function useTreeConnectors() {
    let lines = []

    function connect(startEl, endEl, options = {}) {
        if (!startEl || !endEl) return null
        const startAnchor = LeaderLine.pointAnchor(startEl, { x: '50%', y: '50%' })
        const endAnchor = LeaderLine.pointAnchor(endEl, { x: '50%', y: '50%' })
        const line = new LeaderLine(startAnchor, endAnchor, {
            color: 'red',
            size: 2,
            path: 'straight',
            startPlug: 'behind',
            endPlug: 'behind',
            ...options
        })
        lines.push(line)

        // LeaderLine appends an absolutely-positioned SVG to <body>. A negative
        // z-index would sink it behind the page's own static backgrounds entirely
        // (invisible everywhere), so instead give it a low-but-positive z-index and
        // let the card/button elements opt into a higher stacking layer (see the
        // `relative z-10` classes in DevilBomBuilder.vue) so only those
        // specific elements paint over the line.
        const svgs = document.querySelectorAll('svg.leader-line')
        const svgEl = svgs[svgs.length - 1]
        if (svgEl) svgEl.style.zIndex = '0'

        return line
    }

    function clear() {
        lines.forEach(line => line.remove())
        lines = []
    }

    function onRedraw(callback) {
        watch(redrawTick, callback)
    }

    onBeforeUnmount(() => clear())

    return { connect, clear, onRedraw, requestRedraw }
}
