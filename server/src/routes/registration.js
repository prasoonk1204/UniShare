import express from "express";
import multer from "multer";
import imagekit from "../config/imagekit.js";
import College from "../models/college.js";
import userAuth from "../middlewares/auth.js";

const regRouter = express.Router();

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage }).fields([
  { name: "photo", maxCount: 1 },
  { name: "idDoc", maxCount: 1 },
]);

// get all colleges
regRouter.get("/colleges", async (req, res) => {
  try {
    const colleges = await College.find();
    res.json(colleges);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch colleges" });
  }
});

// add or update a college with branch
regRouter.post("/addcollege", async (req, res) => {
  const { name, branch } = req.body;
  if (!name || !branch) {
    return res
      .status(400)
      .json({ error: "College name and branch are required." });
  }

  try {
    let college = await College.findOne({ name });

    if (!college) {
      college = new College({ name, branches: [branch] });
    } else if (!college.branches.includes(branch)) {
      college.branches.push(branch);
    }

    await college.save();
    res.json(college);
  } catch (err) {
    res.status(500).json({ error: "Failed to add/update college." });
  }
});

// add new branch to existing college
regRouter.post("/addbranch", async (req, res) => {
  const { college, branch } = req.body;

  if (!college || !branch) {
    return res
      .status(400)
      .json({ error: "Both college and branch are required." });
  }

  try {
    const existingCollege = await College.findOne({ name: college });

    if (!existingCollege) {
      return res.status(404).json({ error: "College not found." });
    }

    if (!existingCollege.branches.includes(branch)) {
      existingCollege.branches.push(branch);
      await existingCollege.save();
    }

    res.json(existingCollege);
  } catch (err) {
    console.error("Error in /addBranch:", err);
    res.status(500).json({ error: "Failed to add branch." });
  }
});

// complete user profile
regRouter.post("/completeprofile", upload, userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.profileCompleted) {
      return res.status(400).json({ message: "Profile already completed!" });
    }

    const { collegeName, branch, graduationYear } = req.body;

    if (!collegeName || !branch || !graduationYear) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    if (!req.files || !req.files.photo || !req.files.idDoc) {
      return res
        .status(400)
        .json({ error: "Photo and ID Document are required!" });
    }

    const [photoFile, idDocFile] = [req.files.photo[0], req.files.idDoc[0]];

    const [photoUpload, idDocUpload] = await Promise.all([
      imagekit.upload({
        file: photoFile.buffer.toString("base64"),
        fileName: `${user.userId}-photo`,
      }),
      imagekit.upload({
        file: idDocFile.buffer.toString("base64"),
        fileName: `${user.userId}-idDoc`,
      }),
    ]);

    let college = await College.findOne({ name: collegeName });

    if (!college) {
      college = new College({ name: collegeName, branches: [branch] });
    } else if (!college.branches.includes(branch)) {
      college.branches.push(branch);
    }

    await college.save();

    user.collegeName = collegeName;
    user.branch = branch;
    user.graduationYear = graduationYear;
    user.photoUrl = photoUpload.url;
    user.idDocUrl = idDocUpload.url;
    user.profileCompleted = true;

    await user.save();

    res.json({ message: "Profile updated successfully!", user });
  } catch (error) {
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
});

export default regRouter;
