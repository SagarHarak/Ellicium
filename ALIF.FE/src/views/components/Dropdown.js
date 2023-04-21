import React from 'react';
import { CMultiSelect } from '@coreui/react-pro';
import { MultiSelect } from 'react-multi-select-component'

const Dropdown = (props) => {
    const filter = props
    return (
        <>
            <MultiSelect
                onChange={(e) => { filter.set(e) }}
                search={true}
                selectionType="counter"
                multiple={true}
                className='multiselectcore'
                overrideStrings={{ "selectSomeItems": filter.value}}
                options={filter.options}
                value={filter.data}
            >
            </MultiSelect>
        </>
    )
}

export default Dropdown;