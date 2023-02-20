import { async } from "@firebase/util";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "../firebase/firebase.confige";

const initialState = {
  user: { email: "", rule: "" },
  isLoading: true,
  isError: false,
  error: "",
};

export const createSingup = createAsyncThunk(
  "auth/createSingup",
  async (datas, thankapi) => {
    const { email, password } = datas;
    const data = await createUserWithEmailAndPassword(auth, email, password);

    return data.user.email;
  }
);

export const createLogin = createAsyncThunk(
  "auth/createLogin",
  async (datas, thunkapi) => {
    const { email, password } = datas;
    const data = await signInWithEmailAndPassword(auth, email, password);

    return data.user.email;
  }
);

export const getUser = createAsyncThunk("auth/getUser", async (email) => {
  const res = await fetch(`http://localhost:5000/user/${email}`);
  const data = await res.json();
  if (data.status) {
    return data;
  } else {
    return email;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  tagType: ["user"],
  reducers: {
    logOut: (state, action) => {
      state.user = { email: "", rule: "" };
    },
    setUser: (state, action) => {
      state.user = { email: action.payload, rule: "" };

      state.isLoading = false;
    },
    autoLoad: (state) => {
      state.isLoading = false;
    },
  },

  extraReducers: (bulider) => {
    //createSingup for google
    bulider
      .addCase(createSingup.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(createSingup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.user.email = action.payload;
      })
      .addCase(createSingup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.user.email = "";
      });

    // login email and password
    bulider
      .addCase(createLogin.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(createLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.user.email = action.payload;
      })
      .addCase(createLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = action.error.message;
        state.user.email = "";
      });

    // get user data

    bulider
      .addCase(getUser.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        if (action.payload?.status) {
          state.user = action.payload.data;
        } else {
          state.user.email = action.payload;
        }
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = action.error.message;
        state.user.email = "";
      });
  },
});

export const { logOut, setUser, autoLoad } = authSlice.actions;

export default authSlice.reducer;
