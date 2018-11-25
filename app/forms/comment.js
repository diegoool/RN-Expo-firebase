import React from 'react';
import t from 'tcomb-form-native';
const Form = t.form.Form;
import sliderTemplate from './templates/slider';

export const Comment = t.struct({
    rating: t.Number,
    comment: t.maybe(t.String)
});

export const options = {
    fields: {
        rating:{
            label: 'Rating (*)',
            help: 'Rating',
            template: sliderTemplate,
            config: {
                step: 1,
                min: 1,
                max: 5
            }
        },
        comment: {
            label: 'Comment',
            placeholder: 'Comment',
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
}