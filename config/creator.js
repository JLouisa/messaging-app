const mongoose = require("mongoose");
const UserCollection = require("../server/model/userModel");
const MessageCollection = require("../server/model/messageModel");
const GroupCollection = require("../server/model/groupModel");
const GroupMessageCollection = require("../server/model/groupMessageModel");
const FriendlistCollection = require("../server/model/friendlistModel");
const bcrypt = require("bcryptjs");

const creator = () => {
  const useUser = async (username, password, isAdmin = false, isSuspended = false) => {
    try {
      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, +process.env.HASH_NUM);

      // Create a new user instance
      const user = new UserCollection({
        username: username.toLowerCase(),
        password: hashedPassword,
        isAdmin,
        isSuspended,
      });

      return user;
    } catch (err) {
      // Handle errors during user creation
      console.error(`Error creating user: ${username}`, err);
      throw new Error(`Error creating user: ${username}`);
    }
  };

  const useGroup = (name, createdByUser, members) => {
    // Create a new group instance
    const group = GroupCollection({ name, createdByUser, members });

    return group;
  };

  const useMessage = (text, createdByUser, userReceiver, isHidden = false) => {
    // Create a new message instance
    const message = MessageCollection({ text, createdByUser, userReceiver, isHidden });

    return message;
  };

  const useGroupMessage = (text, createdByUser, members, isHidden = false) => {
    // Create a new group message instance
    const groupMessage = GroupMessageCollection({ text, createdByUser, members, isHidden });

    return groupMessage;
  };

  const useFriendlist = (createdByUser, friends, groups) => {
    // Create a new friendlist instance
    const friendlist = FriendlistCollection({ createdByUser, friends, groups });

    return friendlist;
  };

  return { useUser, useGroup, useMessage, useGroupMessage, useFriendlist };
};
module.exports = { creator };
