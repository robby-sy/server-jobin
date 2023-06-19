const { compareHash } = require("../helpers/encrypt");
const { signToken } = require("../helpers/token");
require("dotenv").config();
const {
  User,
  Company,
  Employee,
  Job,
  UserJob,
  Skill,
  sequelize,
} = require("../models");

class Controller {
  static async register(req, res, next) {
    try {
      const { email, password, first_name, last_name, profile_picture } =
        req.body;
      const status = "user";
      const user = await User.create({
        email,
        password,
        first_name,
        last_name,
        profile_picture,
        status,
      });
      res.status(201).json({ message: "success register" });
    } catch (error) {
      next(error);
    }
  }
  static async specialRegister(req, res, next) {
    try {
      const { email, password, first_name, last_name, profile_picture } =
        req.body;
      const status = "recruiter";
      const user = await User.create({
        email,
        password,
        first_name,
        last_name,
        profile_picture,
        status,
      });
      res.status(201).json({ message: "success register" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) throw { name: "EmptyField" };
      const user = await User.findOne({ where: { email } });
      if (!user) throw { name: "unauthorized" };
      if (!compareHash(password, user.password)) throw { name: "unauthorized" };
      const access_token = signToken({ id: user.id });
      const userData = {
        fname: user.first_name,
        lname: user.last_name,
        picture: user.profile_picture,
      };
      res.status(200).json({ access_token, userData });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async specialLogin(req, res, next) {
    try {
      let message = "Login success";
      const { email, password } = req.body;
      if (!email || !password) throw { name: "EmptyField" };
      const user = await User.findOne({ where: { email } });
      if (!user) throw { name: "unauthorized" };
      if (!compareHash(password, user.password)) throw { name: "unauthorized" };

      if (user.status === "user") {
        await User.update(
          { status: "recruiter" },
          {
            where: {
              id: user.id,
            },
          }
        );
        message = "your status has update to recruiter";
      }
      const access_token = signToken({ id: user.id });
      const userData = {
        fname: user.first_name,
        lname: user.last_name,
        picture: user.profile_picture,
        status: user.status,
      };
      res.status(200).json({ access_token, userData, message });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async getJobs(req, res, next) {
    try {
      const jobs = await Job.findAll({
        include: [{
          model: UserJob,
          include: {
            model: User,
            attributes: ["first_name", "last_name", "profile_picture"],
          },
          where:{
            status:'recruiter'
          },
        },{
          model:Company
        }]
      });
      res.status(200).json(jobs);
    } catch (error) {
      next();
    }
  }
  static async getJob(req, res, next) {
    try {
      const { id } = req.params;
      console.log(id);
      const job = await Job.findByPk(id, {
        include: [
          Company,
          {
            model:Skill,
            attributes:["name"]
          },
          {
            model: UserJob,
            attributes:["status"],
            include: {
              model: User,
              attributes: ["first_name","last_name","profile_picture"],
            },
          },
        ],
      });
      res.send(job);
    } catch (error) {
      res.send(error);
    }
  }
  static async postJob(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.user;
      const {
        title,
        companyId,
        description,
        requirements,
        type,
        location,
        skills,
      } = req.body;
      const job = await Job.create(
        { title, companyId, description, requirements, type, location },
        { transaction: t }
      );
      const newSkills = skills.map((el) => {
        const skillLevel = el.split(",");
        return {
          jobId: job.id,
          name: skillLevel[0],
          level: skillLevel[1],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      });
      await Skill.bulkCreate(newSkills, { transaction: t });
      await UserJob.create(
        {
          UserId: id,
          JobId: job.id,
          status: "recruiter",
        },
        { transaction: t }
      );
      await t.commit();
      res.status(201).json({message:'job successfully created'})
    } catch (error) {
      await t.rollback();
      console.log(error);
      res.send(error);
    }
  }
  static async postCompany(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { name, location, description, logo, email } = req.body;
      const company = await Company.create(
        { name, location, description, logo, email },
        { transaction: t }
      );
      const companyId = company.id;
      const userId = req.user.id;
      const status = "recruiter";
      await Employee.create({ companyId, userId, status }, { transaction: t });
      await t.commit();
      res.status(201).json({
        message:
          "Company Successfully Created, You Have been become recruiter for this Company",
      });
    } catch (error) {
      console.log(error);
      await t.rollback();
    }
  }
  static async getCompanies(req, res, next) {
    const { id } = req.user;
    switch (req.user.status) {
      case "recruiter":
        try {
          const user = await User.findOne({
            where: {
              id,
            },
            include: {
              model: Employee,
              include: {
                model: Company,
                attributes: [
                  "id",
                  "name",
                  "location",
                  "logo",
                  "email",
                ],
              },
            },
          });
          const companies = user.Employees.map((el) => {
            return el.Company;
          });
          res.status(200).json(companies);
        } catch (error) {
          next();
        }
        break;
      case "admin":
        try {
          const companies = await Company.findAll({
            attributes: ["id","name", "logo", "location","email"],
          });
          res.status(200).json(companies);
        } catch (error) {
          next()
        }
        break;
      default:
        break;
    }
  }
  static async getCompany(req, res, next) {
    try {
    } catch (error) {}
  }
  static async getUsers(req, res, next) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ["password"] },
      });
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
