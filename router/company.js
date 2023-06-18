const Controller = require("../controllers");
const authentication = require("../middlewares/authentication");
const { postCompanyAutho } = require("../middlewares/authorization");
const router = require("express").Router();
router.use(authentication)
router.get('/',Controller.getCompanies)
router.use(postCompanyAutho)
router.post("/", Controller.postCompany);
module.exports = router;
