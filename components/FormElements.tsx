import { TextFieldFormElement } from "./fields/TextField";

export type ElementsType = "TextField";

export type FormElement = {
    type: ElementsType;

    designerComponent: React.FC;
    formComponent: React.FC;
    propertiesComponent: React.FC;
    
    construct: (id: string) => FormElementInstance

    designerBtnElements:{
        icon: React.ElementType;
        label: string;
    }
}

export type FormElementInstance = {
    id: string;
    type: ElementsType;
    extraAttributes?: Record<string, any>
    
}
type FormElementsType = {
    [key in ElementsType]: FormElement;

}

export const FormElements: FormElementsType = {
    TextField: TextFieldFormElement,
    
}

