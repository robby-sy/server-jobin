const {Company,User,Employee} = require('../models')

module.exports = {
  postCompanyAutho: (req, res, next) => {
    const { status } = req.user;
    if (status === "recruiter" || status === "admin") return next();
    res.status(403).json({ message: "forbidden" });
  },
  postJobAutho: async (req, res, next) => {
    try {
      const { status, id } = req.user;
      console.log(req.user);
      if (status !== "recruiter") throw({name:'forbidden 1'})
      const {companyId} = req.body
      const company = await Company.findByPk(companyId,{
        include:{
            model:Employee,
            where:{
                status:'recruiter'
            }
        }
      })
      if(!company) throw({name:'forbidden 2'})
      const user = company.Employees.filter(el => el.userId == id)
      if(!user) throw({name:'forbidden 3'})
      next()
    } catch (error) {
        console.log(error);
        let message
        let code
        switch (error.name) {
            case 'forbidden':
                code = 403
                message = 'forbidden'
                break;
        
            default:
                code = 500
                message = 'internal server error'
                break;
        }
        res.status(code).json({ message});
    }
  },
};
