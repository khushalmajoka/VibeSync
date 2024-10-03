export const getRoomId = (joinRoomIdOrRoomLink) => {
  if (
    joinRoomIdOrRoomLink.startsWith("http://") ||
    joinRoomIdOrRoomLink.startsWith("https://")
  ) {
    try {
      const url = new URL(joinRoomIdOrRoomLink);
      return url.pathname.split("/").pop();
    } catch (error) {
      alert("Invalid room link");
      return;
    }
  } else {
    return joinRoomIdOrRoomLink;
  }
};
