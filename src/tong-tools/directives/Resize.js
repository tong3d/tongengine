let resizeEles = []
let beAffected = {
    'left': 'right',
    'right': 'left',
    'top': 'bottom',
    'bottom': 'top'
}
let isInit = false
// 设置拖拽影响的元素
let setDragEffectEles = (ele) => {
    let currEleRect = ele.getBoundingClientRect()
    resizeEles.forEach((item) => {
        if (item !== ele) {
            let effects = item.effect
            for (let i in effects) {
                if (ele.classList.contains(effects[i].effect)) {
                    let dir = effects[i].dir
                    let val = 0
                    switch (dir) {
                        case 'left':
                            val = window.innerWidth - currEleRect[dir]
                            break
                        case 'right':
                            val = currEleRect[dir]
                            break
                        case 'top':
                            val = window.innerHeight - currEleRect[dir]
                            break
                        case 'bottom':
                            val = window.innerHeight - currEleRect[dir]
                            break
                    }
                    item.style[beAffected[dir]] = `${val}px`
                    let itemRect = item.getBoundingClientRect()
                    item.vNode.child.$emit('t-resize', itemRect.width, itemRect.height)
                }
            }
        }
    })
}
// 创建拖拽
let createDragEve = (dir, ele, handleArea) => {
    let isMouseDown =false
    let useHorPercentage = !!(ele.style.width + '').match('%')
    let useVerPercentage = !!(ele.style.height + '').match('%')
    let container = ele
    const resize = (ele, dir, offset) => {
        if (dir === 'left' || dir === 'right') {
            let containerWidth = ele.clientWidth
            let paneWidth = offset
            ele.style.width = useHorPercentage ? paneWidth / containerWidth * 100 + '%' : paneWidth + 'px'
        } else {
            let containerHeight = ele.clientHeight
            let paneHeight = offset
            ele.style.height = useVerPercentage ? paneHeight / containerHeight * 100 + '%' : paneHeight + 'px'
        }
        ele.vNode.child.$emit('t-resize', ele.style.width, ele.style.height)
        setDragEffectEles(ele)
    }
    const { addEventListener } = window
    handleArea.addEventListener('mouseover', () => {
        let cursor = (dir === 'right' || dir === 'left')?'ew-resize' : 'ns-resize'
        handleArea.style.cursor= cursor
    },false)
    let rect = null
    handleArea.addEventListener('mousedown', () => {
        rect = container.getBoundingClientRect()
        isMouseDown = true
    },false)
    handleArea.mouseMove = (eve) => {
        if (isMouseDown) {
            switch (dir) {
                case 'left':
                    resize(container, dir, (rect.left + rect.width) - eve.clientX)
                    break
                case 'right':
                    resize(container, dir, eve.clientX - rect.left)
                    break
                case 'top':
                    resize(container, dir, (rect.top + rect.height) - eve.clientY)
                    break
                case 'bottom':
                    resize(container, dir, eve.clientY - rect.top)
                    break
            }
        }
    }
    handleArea.mouseUp = (eve) => {
        isMouseDown = false
    }
    if (!isInit) {
        isInit = true
        addEventListener('resize', ()=>{
            resizeEles.forEach((item) => {
                if (!item.isResize) return
                setDragEffectEles(item)
            })
        })
    }
    addEventListener('mousemove', handleArea.mouseMove)
    addEventListener('mouseup', handleArea.mouseUp)
}
// dir = right/left/top/bottom
let createHandler = (dir, ele, bind, vNode)=>{
    let handleArea = document.createElement('div')
    handleArea.style.position='absolute'
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
    ele.appendChild (handleArea)
    ele.effect = bind.value
    ele.vNode = vNode
    ele.dir = dir
    ele.isResize = true
    resizeEles.push(ele)
    createDragEve (dir, ele, handleArea)
    return handleArea
}
export default {
    resizeRight: {
        inserted(el, bind, vNode) {
            createHandler ('right', el, bind, vNode)
        }
    },
    resizeLeft: {
        inserted(el, bind, vNode) {
            createHandler ('left', el, bind, vNode)
        }
    },
    resizeTop: {
        inserted(el, bind, vNode) {
            createHandler ('top', el, bind, vNode)
        }
    },
    resizeBottom: {
        inserted(el, bind, vNode) {
            createHandler ('bottom', el, bind, vNode)
        }
    },
    effectResize: {
        inserted(el, bind, vNode) {
            el.effect = bind.value
            el.vNode = vNode
            resizeEles.push(el)
        }
    }
}
