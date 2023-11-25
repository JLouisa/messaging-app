#! /usr/bin/env node
console.log("This script populates some test player and character to my database.");

const { creator } = require("../config/creator");
const { useUser, useGroup, useMessage, useGroupMessage, useFriendlist } = creator();

const dotenv = require("dotenv").config();

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

//! MongoDB Setup
const mongoDB = process.env.MONGODB_LINK;

const userArr = [];
const groupArr = [];
const groupMessageArr = [];
const messageArr = [];
const friendlistArr = [];

main().catch((err) => console.log(err));

//! Generate the data
async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await popUser();
  await popGroup();
  await popMessage();
  await popGroupMessage();
  await popFriendlist();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

//! Users - 1
// Create player function
async function userCreate(index, username, password) {
  try {
    const playerN = await useUser(username, password);
    await playerN.save();
    userArr[index] = playerN;
    console.log(`Added player: ${playerN.username}`);
  } catch (err) {
    console.error(`Error creating user: ${username}`, err);
  }
}

// Populate the categories
async function popUser() {
  console.log("Adding player");
  await Promise.all([
    userCreate(0, "adamthefirst", "Apple"),
    userCreate(1, "johndoe123", "Sun"),
    userCreate(2, "janesmith456", "Blue"),
    userCreate(3, "michaelj", "Dog"),
    userCreate(4, "emilyb", "Happy"),
    userCreate(5, "davidw123", "Ocean"),
    userCreate(6, "sarah_a", "Jump"),
    userCreate(7, "roberttaylor", "Tree"),
    userCreate(8, "jennifer123", "Smile"),
    userCreate(9, "willm", "Book"),
    userCreate(10, "oliviam", "Sleep"),
  ]);
}

//! Group - 2
// Create character function
async function groupCreate(index, name, createdByUser, members) {
  try {
    const characterN = await useGroup(name, createdByUser, members);
    await characterN.save();
    groupArr[index] = characterN;
    console.log(`Added group: ${characterN.name}`);
  } catch (error) {
    console.log(error);
  }
}

// Populate the locations
async function popGroup() {
  let i = 0;
  console.log("Adding Group");
  await Promise.all([
    groupCreate(0, `Group${i++}`, userArr[0], [userArr[0], userArr[1], userArr[2]]),
    groupCreate(1, `Group${i++}`, userArr[1], [userArr[1], userArr[3], userArr[4], userArr[5]]),
    groupCreate(2, `Group${i++}`, userArr[2], [userArr[2], userArr[7], userArr[8]]),
    groupCreate(3, `Group${i++}`, userArr[3], [userArr[3], userArr[9], userArr[10], userArr[1]]),
    groupCreate(4, `Group${i++}`, userArr[4], [userArr[4], userArr[1], userArr[7]]),
    groupCreate(5, `Group${i++}`, userArr[5], [userArr[5], userArr[3], userArr[0]]),
  ]);
}

//! Message - 3
// Create character function
async function messageCreate(index, text, createdByUser, userReceiver) {
  const characterN = await useMessage(text, createdByUser, userReceiver);
  try {
    await characterN.save();
    messageArr[index] = characterN;
    console.log(`Added message: ${messageArr[index]}`);
  } catch (error) {
    console.log(error);
  }
}

// Populate the locations
async function popMessage() {
  let i = 0;
  console.log("Adding message");
  await Promise.all([
    messageCreate(0, "The sun sets behind the mountains, casting a warm glow.", userArr[0], userArr[1]),
    messageCreate(1, "A playful dog chases its tail in the green meadow.", userArr[1], userArr[2]),
    messageCreate(2, "Waves gently kiss the sandy shore under the moonlight.", userArr[2], userArr[3]),
    messageCreate(3, "Laughter echoes through the air, creating a joyful atmosphere.", userArr[3], userArr[4]),
    messageCreate(4, "Leaves rustle in the breeze, creating a soothing melody.", userArr[4], userArr[5]),
    messageCreate(5, "A cozy blanket of snow covers the landscape in winter's embrace.", userArr[5], userArr[6]),
  ]);
}

//! GroupMessage - 4
// Create character function
async function GroupMessageCreate(index, text, createdByUser, userReceiver) {
  const characterN = await useGroupMessage(text, createdByUser, userReceiver);
  try {
    await characterN.save();
    groupMessageArr[index] = characterN;
    console.log(`Added message: ${groupMessageArr[index]}`);
  } catch (error) {
    console.log(error);
  }
}

// Populate the locations
async function popGroupMessage() {
  console.log("Adding message");
  await Promise.all([
    GroupMessageCreate(0, "The sun sets behind the mountains, casting a warm glow.", userArr[0], groupArr[0]),
    GroupMessageCreate(1, "A playful dog chases its tail in the green meadow.", userArr[1], groupArr[1]),
    GroupMessageCreate(2, "Waves gently kiss the sandy shore under the moonlight.", userArr[2], groupArr[2]),
    GroupMessageCreate(3, "Laughter echoes through the air, creating a joyful atmosphere.", userArr[3], groupArr[3]),
    GroupMessageCreate(4, "Leaves rustle in the breeze, creating a soothing melody.", userArr[4], groupArr[4]),
    GroupMessageCreate(5, "A cozy blanket of snow covers the landscape in winter's embrace.", userArr[5], groupArr[5]),
  ]);
}

//! GroupMessage - 5
// Create character function
async function friendlistCreate(index, createdByUser, friends, groups, pending) {
  const characterN = await useFriendlist(createdByUser, friends, groups, pending);
  try {
    await characterN.save();
    friendlistArr[index] = characterN;
    console.log(`Added friendlist: ${friendlistArr[index]}`);
  } catch (error) {
    console.log(error);
  }
}

// Populate the locations
async function popFriendlist() {
  console.log("Adding friendlist");
  await Promise.all([
    friendlistCreate(
      0,
      userArr[0],
      [userArr[1], userArr[2], userArr[3], userArr[10]],
      [groupArr[0]],
      [userArr[6], userArr[8]]
    ),
    friendlistCreate(1, userArr[1], [userArr[0], userArr[3], userArr[4], userArr[7]], [groupArr[1]], []),
    friendlistCreate(2, userArr[2], [userArr[0], userArr[4], userArr[5], userArr[8], userArr[9]], [groupArr[2]], []),
    friendlistCreate(3, userArr[3], [userArr[0], userArr[1], userArr[6], userArr[9]], [groupArr[3]], []),
    friendlistCreate(4, userArr[4], [userArr[1], userArr[4], userArr[7]], [groupArr[4]], []),
    friendlistCreate(5, userArr[5], [userArr[2], userArr[7], userArr[8]], [groupArr[5]], []),
    friendlistCreate(6, userArr[6], [userArr[3], userArr[8], userArr[9]], [], []),
    friendlistCreate(7, userArr[7], [userArr[4], userArr[5], userArr[1], userArr[10]], [], []),
    friendlistCreate(8, userArr[8], [userArr[5], userArr[6], userArr[2], userArr[10]], [], []),
    friendlistCreate(9, userArr[9], [userArr[6], userArr[2], userArr[3]], [groupArr[2]], []),
    friendlistCreate(10, userArr[10], [userArr[0], userArr[7], userArr[8]], [groupArr[3]], []),
  ]);
}
