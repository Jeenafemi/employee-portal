const Employee = require("../models/Employee");
const Activity = require("../models/Activity");
const mongoose = require("mongoose");

exports.upsertEmployee = async (req, res) => {
  try {
    const userId = req.user.id;
    const { _id, departmentId, ...data } = req.body;

    if (departmentId && mongoose.Types.ObjectId.isValid(departmentId)) {
      data.departmentId = new mongoose.Types.ObjectId(departmentId);
    } else {
      data.departmentId = null;
    }

    if (data.skills) {
      if (typeof data.skills === "string") {
        data.skills = data.skills.split(",").map((s) => s.trim());
      }
    }

    if (data.experience !== "" && data.experience !== undefined) {
      const exp = Number(data.experience);
      if (!isNaN(exp)) {
        data.experience = exp;
      } else {
        delete data.experience;
      }
    } else {
      delete data.experience;
    }

    if (data.salary !== "" && data.salary !== undefined) {
      const sal = Number(data.salary);
      if (!isNaN(sal)) {
        data.salary = sal;
      } else {
        delete data.salary;
      }
    } else {
      delete data.salary;
    }

    let employee;

    if (_id) {
      employee = await Employee.findOneAndUpdate(
        { _id, userId },
        { $set: data },
        { new: true, runValidators: true },
      );

      if (!employee) {
        return res.status(404).json({
          status: 0,
          msg: "Employee not found or unauthorized",
        });
      }

      Activity.create({
        userId: new mongoose.Types.ObjectId(userId),
        type: "EMPLOYEE_UPDATED",
        message: `${employee.name} updated`,
      }).catch((err) => console.error("Activity error:", err));
    } else {
      employee = await Employee.create({
        ...data,
        userId,
      });

      Activity.create({
        userId: new mongoose.Types.ObjectId(userId),
        type: "EMPLOYEE_CREATED",
        message: `${employee.name} created`,
      }).catch((err) => console.error("Activity error:", err));
    }

    return res.status(200).json({
      status: 1,
      msg: _id ? "Employee updated" : "Employee created",
      data: employee,
    });
  } catch (err) {
    console.error(" UPSERT ERROR:", err);

    return res.status(500).json({
      status: 0,
      msg: err.message,
    });
  }
};

exports.listEmployees = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const employees = await Employee.aggregate([
      {
        $match: { userId },
      },
      {
        $lookup: {
          from: "departments",
          localField: "departmentId",
          foreignField: "_id",
          as: "department",
        },
      },
      {
        $addFields: {
          departmentName: {
            $ifNull: [{ $arrayElemAt: ["$department.name", 0] }, ""],
          },
        },
      },
      {
        $project: {
          department: 0,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    return res.status(200).json({
      status: 1,
      data: employees,
    });
  } catch (err) {
    console.error("LIST ERROR:", err);
    return res.status(500).json({
      status: 0,
      msg: err.message,
    });
  }
};

exports.getEmployee = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const { id } = req.body;

    const employee = await Employee.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
          userId,
        },
      },
      {
        $lookup: {
          from: "departments",
          localField: "departmentId",
          foreignField: "_id",
          as: "department",
        },
      },
      {
        $addFields: {
          departmentName: {
            $ifNull: [{ $arrayElemAt: ["$department.name", 0] }, ""],
          },
        },
      },
      {
        $project: {
          department: 0,
        },
      },
    ]);

    if (!employee.length) {
      return res.status(404).json({
        status: 0,
        msg: "Employee not found",
      });
    }

    return res.status(200).json({
      status: 1,
      data: employee[0],
    });
  } catch (err) {
    console.error("GET ERROR:", err);
    return res.status(500).json({
      status: 0,
      msg: err.message,
    });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.body;

    const employee = await Employee.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!employee) {
      return res.status(404).json({
        status: 0,
        msg: "Employee not found or unauthorized",
      });
    }

    Activity.create({
      userId: new mongoose.Types.ObjectId(userId),
      type: "EMPLOYEE_DELETED",
      message: `${employee.name} deleted`,
    }).catch((err) => console.error("Activity error:", err));

    return res.status(200).json({
      status: 1,
      msg: "Employee deleted successfully",
    });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    return res.status(500).json({
      status: 0,
      msg: err.message,
    });
  }
};

exports.toggleStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.body;

    const employee = await Employee.findOne({ _id: id, userId });

    if (!employee) {
      return res.status(404).json({
        status: 0,
        msg: "Employee not found",
      });
    }

    employee.status = employee.status === 1 ? 0 : 1;
    await employee.save();

    await Activity.create({
      userId,
      type: "EMPLOYEE_STATUS",
      message: `${employee.name} marked as ${
        employee.status === 1 ? "Active" : "Inactive"
      }`,
    });

    return res.status(200).json({
      status: 1,
      msg: `Employee marked as ${
        employee.status === 1 ? "Active" : "Inactive"
      }`,
      data: employee,
    });
  } catch (err) {
    console.error("TOGGLE ERROR:", err);
    return res.status(500).json({
      status: 0,
      msg: err.message,
    });
  }
};
