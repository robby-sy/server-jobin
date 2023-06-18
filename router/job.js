const Controller = require("../controllers");
const { postJobAutho } = require("../middlewares/authorization");

const router = require("express").Router();
router.get('/',Controller.getJobs)

router.use(postJobAutho)
router.post("/", Controller.postJob);
module.exports = router;
