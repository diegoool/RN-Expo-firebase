import React from 'react'
import t from 'tcomb-form-native'
import sliderTemplate from './templates/slider';

const Form = t.form.Form;

export const  Event = t.struct({
    name: t.String,
    address: t.String,
    capacity: t.Number,
    description: t.String
});

export const options = {
    fields: {
        name: {
            label: 'Name (*)',
            placeholder: 'Name'
        },
        address:{
            label: 'Address (*)',
            placeholder: 'Address'
        },
        capacity:{
            label: 'Capacity',
            help: 'Number of persons',
            config:{
                step: 1,
                min:1,
                max:100
            },
            template: sliderTemplate
        },
        description: {
            label: 'Description (*)',
            placeholder: 'Description',
            multiline: true,
            stylesheet: {
                ...Form.stylesheet,
                textbox: {
                    ...Form.stylesheet.textbox,
                    normal:{
                        ...Form.stylesheet.textbox.normal,
                        height: 150
                    },
                    error: {
                        ...Form.stylesheet.textbox.error,
                        height: 150
                    }
                }
            }
        }
    }
};