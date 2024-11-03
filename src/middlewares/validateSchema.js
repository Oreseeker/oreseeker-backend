const { checkSchema } = require('express-validator');

module.exports = function validateSchema(schema) {
  return async (req, res, next) => {
    const result = await checkSchema(schema).run(req);

    const isError = !result.every(i => i.isEmpty())

    if (isError) {
      const rs = result.reduce((acc, value) => {
        if (!value.errors.length) return acc;
        // TODO приватное свойство, надо поменять
        acc.push(value.errors);
        return acc;
      }, []);

      res.status(400).send(rs);
      return;
    }
    res.send(200)
    //next();
  };
}
