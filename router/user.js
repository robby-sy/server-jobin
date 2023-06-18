const Controller = require("../controllers");
const router = require("express").Router();


router.get('/',Controller.getUsers)


module.exports = router;
