import Joi from "joi"


describe("Joi", () => {
    it("should can validate date", () => {
        const birthDateSchema = Joi.date().max("now").min("1-1-1988").required();

        const result = birthDateSchema.validate("1-1-1987");
        console.info(result);
        console.info(typeof result.value); //Date
        console.info(typeof result.error); //Valudation Error
        
        const result2 = birthDateSchema.validate("1-1-2004");
        console.info(result2);

        const result3 = birthDateSchema.validate("1-1-2027");
        console.info(result3);



    })
})