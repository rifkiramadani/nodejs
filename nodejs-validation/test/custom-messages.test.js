import Joi from "joi";

describe("Joi", () => {
    it("should can use custom messages", () => {
        const schema = Joi.string().required().min(3).max(10).messages({
            'string.min' : '{{#label}} panjang harus minimal {{#limit}} karakter',
            'string.max' : '{{#label}} panjang harus maksimal {{#limit}} karakter'
        })

        const request = "aaaaaaaaaaaa";

        const result = schema.validate(request, {
            abortEarly: false,
        })
        console.info(result);
    })

    it("should can use custom messages in object validation", () => {
        const schema = Joi.object({
            email: Joi.string().required().min(3).max(100).email().messages({
                'any.required': "{{#label}} Email Harus Di Isi",
                'string.email': "{{#label}} Email Harus Valid"
            }),
            password: Joi.string().required().min(6).max(10).messages({
                'any.required': "{{#label}} Email Harus Di Isi",
                'string.min': "{{#label}} Harus Lebih Dari {{#limit}} karakter",
                'string.max': "{{#label}} Harus Kurang Dari {{#limit}} karakter",
            })
        })
        const request = {
            email: "rifky@gmail.com",
            password: "rahasia"
        };

        const result = schema.validate(request, {
            abortEarly: false
        })

        console.info(result);
    })
})