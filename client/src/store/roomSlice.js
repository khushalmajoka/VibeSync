import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomId: null,
  videoId: null,
  messages: [],
  nickname: null,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRoomId: (state, action) => {
      state.roomId = action.payload;
    },
    setVideoId: (state, action) => {
      state.videoId = action.payload;
    },
    setMessages: (state, action) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages.length = 0;
    },
    setNickname: (state, action) => {
      state.nickname = action.payload;
    },
  },
});

export const { setRoomId, setVideoId, setMessages, clearMessages, setNickname } =
  roomSlice.actions;
export default roomSlice.reducer;
