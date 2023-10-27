"use client"

import React from 'react'
import { ElementsType, FormElement } from '../FormElements'
import { MdTextFields } from 'react-icons/md'

const type: ElementsType = "TextField"

export const TextFieldFormElement: FormElement = {
    type,
    designerComponent: ()=><div>Designer Component</div>,
    formComponent: ()=><div>Form Component</div>,
    propertiesComponent: ()=><div>Properties Component</div>,

    construct: (id: string) => ({
        id,
        type,
        extraAttributes:{
            label:'Text Label',
            helperText:'Helper Text',
            required:false,
            placeHolder:'Value here'
        },
    }),
    designerBtnElements:{
        icon: MdTextFields,
        label: 'Text Field',
    }
} 