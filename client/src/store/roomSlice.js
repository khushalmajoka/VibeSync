import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomId: null,
  videoId: null,
  messages: [],
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
  },
});

export const { setRoomId, setVideoId, setMessages, clearMessages } =
  roomSlice.actions;
export default roomSlice.reducer;
