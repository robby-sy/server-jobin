const Controller = require("../controllers");
const authentication = require("../middlewares/authentication");
const { postJobAutho } = require("../middlewares/authorization");

const router = require("express").Router();
router.get('/',Controller.getJobs)
router.get('/:id',Controller.getJob)
router.use(authentication)
router.use(postJobAutho)
router.post("/", Controller.postJob);
module.exports = router;
