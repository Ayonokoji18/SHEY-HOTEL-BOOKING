import express from "express";
import Room from "../models/room.js"; // or wherever your Room model is
const router = express.Router();

router.get("/getrooms", async (req, res) => {
  try {
    const rooms = await Room.find({});
    if (rooms) {
      res.send(rooms);
    } else {
      res.status(404).send("Room not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/getroombyid", async (req, res) => {
  const roomid = req.body.roomid;
  try {
    const room = await Room.findOne({ _id: roomid });
    if (room) {
      res.send(room);
    } else {
      res.status(404).send("Room not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
