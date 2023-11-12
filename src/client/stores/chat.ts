import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

import { RootState } from "./store";

import { postPing, postMessage } from "@apis/messages";
import { UserId } from "@shared/messages";

const SLICE_NAME = "messages";

export const sendPing = createAsyncThunk(
  `${SLICE_NAME}/sendPing`,
  async (userId: UserId) => {
    return await postPing(userId);
  }
);

interface SendMessageParams {
  userId: number;
  message: string;
}

export const sendMessage = createAsyncThunk(
  `${SLICE_NAME}/sendMessage`,
  async ({ userId, message }: SendMessageParams) => {
    return await postMessage(userId, message);
  }
);

export type ObjectState = "undefined" | "loading" | "ready" | "error";

interface ChatState {
  chatState: ObjectState;
  sendMessageState: ObjectState;
  error: string;
  userId: UserId;
}

const initialState: ChatState = {
  chatState: "undefined",
  sendMessageState: "undefined",
  error: "",
  userId: 0,
};

export const chatSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setChatState: (state, action: PayloadAction<ObjectState>) => {
      state.chatState = action.payload;
    },
    setUserId: (state, action: PayloadAction<UserId>) => {
      state.userId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendMessage.pending, (state) => {
      state.sendMessageState = "loading";
    });
    builder.addCase(sendMessage.rejected, (state) => {
      state.chatState = "error";
      state.error = "disconnected";
    });
    builder.addCase(sendMessage.fulfilled, (state) => {
      state.sendMessageState = "ready";
    });
    builder.addCase(sendPing.rejected, (state) => {
      state.chatState = "error";
      state.error = "disconnected";
    });
  },
});

export const { setUserId, setChatState } = chatSlice.actions;

const selectState = (state: RootState) => state.chat;
export const selectChatState = createSelector(
  selectState,
  (state) => state.chatState
);
export const selectError = createSelector(selectState, (state) => state.error);
export const selectUserId = createSelector(
  selectState,
  (state) => state.userId
);
export const selectSendMessageState = createSelector(
  selectState,
  (state) => state.sendMessageState
);
