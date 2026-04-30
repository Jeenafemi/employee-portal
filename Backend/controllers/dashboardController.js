
const Employee = require("../models/Employee");
const Department = require("../models/Department");
const Activity = require("../models/Activity"); // 🔥 NEW
const mongoose = require("mongoose");

exports.dashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    
    const totalEmployees = await Employee.countDocuments({ userId });

   
    const activeEmployees = await Employee.countDocuments({
      userId,
      status: 1
    });

    const inactiveEmployees = await Employee.countDocuments({
      userId,
      status: 0
    });

    
    const totalDepartments = await Department.countDocuments({ userId });

    
    const departmentStats = await Employee.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId)
        }
      },
      {
        $group: {
          _id: "$departmentId",
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "departments",
          localField: "_id",
          foreignField: "_id",
          as: "department"
        }
      },
      {
        $unwind: {
          path: "$department",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 0,
          departmentId: "$_id",
          departmentName: "$department.name",
          count: 1
        }
      }
    ]);

    
    const recentActivities = await Activity.find({ userId })
      .sort({ createdAt: -1 }) 
      .limit(10)               
      .select("message type createdAt")
      .lean();

    
    return res.status(200).json({
      status: 1,
      data: {
        summary: {
          totalEmployees,
          activeEmployees,
          inactiveEmployees,
          totalDepartments
        },
        departmentStats,
        recentActivities 
      }
    });

  } catch (err) {
    return res.status(500).json({
      status: 0,
      msg: err.message
    });
  }
};