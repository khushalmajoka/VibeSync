const Redis = require("ioredis");
const client = new Redis();

module.exports = {
  createRoomInRedis: async (roomId) => {
    const roomData = {
      users: [],
      videoId: null,
      messages: [],
    };
    await client.set(roomId, JSON.stringify(roomData));
    await client.expire(roomId, 24*60*60);
  },

  getRoomFromRedis: async (roomId) => {
    const roomData = await client.get(roomId);
    if (roomData) {
      return true;
    } else {
      return false;
    }
  },

  addUserToRedisRoom: async (nickname, roomId) => {
    const roomData = await client.get(roomId);
    
    if (roomData) {
      const room = JSON.parse(roomData);
      room.users.push(nickname);
  
      const ttl = await client.ttl(roomId);

      await client.multi()
        .set(roomId, JSON.stringify(room))
        .expire(roomId, ttl)
        .exec();
  
      console.log(`User ${nickname} added to room ${roomId}`);
    } else {
      console.log(`Room ${roomId} not found`);
    }
  },  

  setVideoIdInRedisRoom: async (videoId, roomId) => {
    const roomData = await client.get(roomId);
    
    if (roomData) {
      const room = JSON.parse(roomData);
      room.videoId = videoId;
  
      const ttl = await client.ttl(roomId);
  
      await client.multi()
        .set(roomId, JSON.stringify(room))
        .expire(roomId, ttl)
        .exec();
  
      console.log(`Video ID ${videoId} set for room ${roomId}`);
    } else {
      console.log(`Room ${roomId} not found`);
    }
  }  
};
