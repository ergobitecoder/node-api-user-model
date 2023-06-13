const dotenv = require('dotenv');
const path = require('path');
const Joi = require('@hapi/joi');

// This function call loads the environment variables from a file and sets them in the current process's environment
dotenv.config({ path: path.join(__dirname, '../.env') });

// to validate the structure and values of an object.
const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url')
})
.unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongoose: {
      url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
      options: {
        useNewUrlParser: true,
      },
    },
    merchantid:envVars.MERCHANT_ID,
    workingkey:envVars.WORKING_KEY,
    accesscode:envVars.ACCESS_CODE,
    redirecturl:envVars.REDIRECT_URL,
    paymentgateway:envVars.PAYMENT_GATEWAY,
    thankyou:envVars.THANKYOU_URL,
};