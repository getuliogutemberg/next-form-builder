import React from 'react'
import { Button } from './ui/button'
import { MdPreview } from 'react-icons/md'

const PreviewDialogBtn = () => {
  return (
    <Button variant={"outline"} >
        <MdPreview className='h-6 w-6'/> Preview
    </Button>
  )
}

export default PreviewDialogBtn