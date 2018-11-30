import React from 'react'
import t from 'tcomb-form-native'
import sliderTemplate from './templates/slider'
import moment from 'moment'

const Form = t.form.Form;

export const  Event = t.struct({
    name: t.String,
    city: t.String,
    address: t.String,
    date: t.String,
    time: t.String,
    capacity: t.Number,
    tickets: t.Number,
    description: t.String
});

export const options = {
    fields: {
        name: {
            label: 'Name (*)',
            placeholder: 'Name'
        },
        city:{
            label: 'City (*)',
            placeholder: 'City'
        },
        address:{
            label: 'Address (*)',
            placeholder: 'Address'
        },
        date:{
            label: 'Date (*)',
            placeholder: 'Date',
            help: 'Tex: 23 Dec 2017'
        },
        time:{
            label: 'Time (*)',
            placeholder: '00:00',
            help: 'Tex: 21:00'
        },
        capacity:{
            label: 'Capacity',
            help: 'Number of persons',
            config:{
                step: 5,
                min:0,
                max:1000
            },
            template: sliderTemplate
        },
        tickets:{
            label: 'Tickets',
            help: 'Number of tickets available',
            config:{
                step: 5,
                min:0,
                max:1000
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