import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import React from 'react'
import SidebarBtnElement, { SidebarBtnElementDragOverlay } from './SidebarBtnElement'
import { ElementsType, FormElements } from './FormElements'


function DragOverlayWrapper() {
    const [draggingItem, setDraggingItem] = React.useState<Active | null>(null)
    useDndMonitor({
        onDragStart: (event) => {
            // console.log('DRAG ITEM',event)
            setDraggingItem(event.active)
        },
        onDragOver: (event) => {
            setDraggingItem(null)
        },
        onDragEnd: (event) => {
            setDraggingItem(null)
        }

    })

    if(!draggingItem) return null

    let node = <div>No drag overlay</div>
    const isSidebarBtnElement = draggingItem?.data?.current?.isDesignerBtnElement

    if(isSidebarBtnElement) {
        const type = draggingItem?.data?.current?.type as ElementsType
        node = <SidebarBtnElementDragOverlay formElement={FormElements[type]}/>
    }

    return (
        <DragOverlay 
            className="bg-background"
            
        >
            {node}
        </DragOverlay>
    )
  
}

export default DragOverlayWrapper