import * as yup from 'yup';

export const validationSchema = yup.object({
    title: yup.string().required(),
    content: yup.string().required(),
    status: yup.number().required(),
    hot: yup.bool().required(),
    file: yup.mixed().when('pictureUrl', {
        is: (value: string) => !value,
        then: yup.mixed().required('Please provide an image')
    })
})