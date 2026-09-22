import Joi from "joi"

describe("Joi", () => {
    it("should return validation error", () => {
        const nameSchema = Joi.string().min(5).email().required();

        const result = nameSchema.validate("ups", {
            abortEarly: false, //menunda hasil error
        });
        console.info(result);

        if(result.error){
            result.error.details.forEach(detail => {
                console.info(`${detail.path} = ${detail.message}`)
            })
        }
    })
})