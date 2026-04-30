
const Department = require("../models/Department");
const Activity = require("../models/Activity"); // 🔥 NEW


exports.upsertDepartment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { _id, name, status } = req.body;

    let department;

    if (_id) {
      
      department = await Department.findOneAndUpdate(
        { _id, userId },
        { name, status },
        { new: true }
      );

      if (!department) {
        return res.status(404).json({
          status: 0,
          msg: "Department not found"
        });
      }

      
      await Activity.create({
        userId,
        type: "DEPARTMENT_UPDATED",
        message: `${department.name} department updated`
      });

    } else {
      
      department = await Department.create({
        name,
        status,
        userId
      });

      
      await Activity.create({
        userId,
        type: "DEPARTMENT_CREATED",
        message: `${department.name} department created`
      });
    }

    return res.status(200).json({
      status: 1,
      msg: _id ? "Department updated" : "Department created",
      data: department
    });

  } catch (err) {
    return res.status(500).json({
      status: 0,
      msg: err.message
    });
  }
};


exports.listDepartment = async (req, res) => {
  try {
    const userId = req.user.id;

    const departments = await Department.find({ userId })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      status: 1,
      data: departments
    });

  } catch (err) {
    return res.status(500).json({
      status: 0,
      msg: err.message
    });
  }
};


exports.getDepartment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.body;

    const department = await Department.findOne({
      _id: id,
      userId
    });

    if (!department) {
      return res.status(404).json({
        status: 0,
        msg: "Department not found"
      });
    }

    return res.status(200).json({
      status: 1,
      data: department
    });

  } catch (err) {
    return res.status(500).json({
      status: 0,
      msg: err.message
    });
  }
};


exports.toggleDepartmentStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.body;

    const department = await Department.findOne({ _id: id, userId });

    if (!department) {
      return res.status(404).json({
        status: 0,
        msg: "Department not found"
      });
    }

   
    department.status = department.status === 1 ? 0 : 1;
    await department.save();

    
    await Activity.create({
      userId,
      type: "DEPARTMENT_STATUS",
      message: `${department.name} marked as ${
        department.status === 1 ? "Active" : "Inactive"
      }`
    });

    return res.status(200).json({
      status: 1,
      msg: `Department marked as ${
        department.status === 1 ? "Active" : "Inactive"
      }`,
      data: department
    });

  } catch (err) {
    return res.status(500).json({
      status: 0,
      msg: err.message
    });
  }
};