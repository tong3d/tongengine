let createDragEve = (dir, ele, handleArea)=>{
    let isMouseDown =false
    let usePercentage = !!(ele.style.width + '').match('%')
    const resize = (initialSize, offset = 0) => {
        if (layout == LAYOUT_VERTICAL) {
          let containerWidth = container.clientWidth;
          let paneWidth = initialSize + offset;

          return (ele.style.width = usePercentage
            ? paneWidth / containerWidth * 100 + '%'
            : paneWidth + 'px');
        }

        if (layout == LAYOUT_HORIZONTAL) {
          let containerHeight = container.clientHeight;
          let paneHeight = initialSize + offset;

          return (ele.style.height = usePercentage
            ? paneHeight / containerHeight * 100 + '%'
            : paneHeight + 'px');
        }
    }
    const { addEventListener, removeEventListener } = window
    handleArea.addEventListener('mouseover', ()=>{
        let cursor = (dir === 'right' || dir === 'left')?'ew-resize' : 'ns-resize'
        handleArea.style.cursor= cursor
    },false)
    handleArea.addEventListener('mousedown', ()=>{
        isMouseDown = true
    },false)
    handleArea.addEventListener('mousemove', (ev)=>{
        if (isMouseDown) {
            let clientX = ev.clientX
            let clientY = ev.clientY
            console.log (clientX)
            ele.style.width = clientX+'px'
        }
    },false)
    handleArea.addEventListener('mouseup', ()=>{
        //isMouseDown = false
    },false)
    addEventListener('mousemove', onMouseMove);
    addEventListener('mouseup', onMouseUp);
}
// dir = right/left/top/bottom
let createHandler = (dir, ele)=>{
    let handleArea = document.createElement('div')
    handleArea.style.position='absolute'
    let isMouseDown = false
    switch (dir) {
        case 'left':
        case 'right':
        handleArea.style.width = '5px'
        handleArea.style.height = '100%'
        handleArea.style.top = '0px'
        handleArea.style[dir] = '0px'
        break
        case 'top':
        case 'bottom':
        handleArea.style.height = '5px'
        handleArea.style.width = '100%'
        handleArea.style[dir] = '0px'
        handleArea.style.left = '0px'
        break
    }
    createDragEve (dir, ele, handleArea)
    ele.appendChild (handleArea)
    return handleArea
}
export default {
    resizeRight: {
        inserted(el){
            createHandler ('right', el)
        }
    },
    resizeLeft: {
        inserted(el){
            createHandler ('left', el)
        }
    },
    resizeTop: {
        inserted(el){
            createHandler ('top', el)
        }
    },
    resizeBottom: {
        inserted(el){
            createHandler ('bottom', el)
        }
    }
}
