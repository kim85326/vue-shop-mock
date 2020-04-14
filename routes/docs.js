const express = require("express");
const router = express.Router();
const swaggerUi = require("swagger-ui-express");

router.use(swaggerUi.serve);
router.get("/v1", swaggerUi.setup(require("../docs/openapi.json")));

module.exports = router;
