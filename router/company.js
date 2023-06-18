const Controller = require("../controllers");
const { postCompanyAutho } = require("../middlewares/authorization");
const router = require("express").Router();

router.get('/',Controller.getCompanies)

router.use(postCompanyAutho)
router.post("/", Controller.postCompany);
module.exports = router;
