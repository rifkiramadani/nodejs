import Joi from "joi";

describe("Joi", () => {
    it("should can create custom validation", () => {
        const registerSchema = Joi.object({
            email: Joi.string().required().min(3).max(100).email(),
            password: Joi.string().required().min(6).max(100).custom((value, helpers) => {
                if(value.startsWith('rifky')) {
                    return helpers.error('password.wrong')
                } else {
                    return value
                }
            }).messages({
                'password.wrong': 'password cannot start with "rifky"'
            }),
            confirmPassword: Joi.string().required().min(6).max(100),
        }).custom((value, helpers) => {
            if(value.password != value.confirmPassword) {
                return helpers.error('register.password.different');
            } else {
                return value
            }
        }).messages({
            'register.password.different': 'password and confirmPassword is different'
        })

        const request = {
            email: "rifky@gmail.com",
            password: "rahasia",
            confirmPassword: "rahasia"
        };

        const result = registerSchema.validate(request, {
            abortEarly: false
        })

        console.info(result);
    })
})