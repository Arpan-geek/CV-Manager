import {create} from "zustand";
import {devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import axios from "axios";

 export const useApplicantStore = create(
  devtools(
    immer((set) => ({
      applicantData: [],
      getApi: async () => {
        const apiResponse = await axios.get("http://localhost:4000/applicants");
        set((state) => {
          state.applicantData = apiResponse.data;
        });
        console.log(apiResponse.data);
      },
      createApplicantAPI: async (payload) => {
        const apiResponse = await axios.post(
          "http://localhost:4000/applicants",
          payload
        );
        set((state) => {
          state.applicantData.push(apiResponse.data);
        });
      },
      updateCakeAPI: async (payload) => {
        const apiResponse = await axios.put(
          `http://localhost:4000/applicants/${payload.id}`,
          payload
        );
        set((state) => {
          let cakeState = state.cakesData.filter((_) => _.id !== payload.id);
          cakeState.push(apiResponse.data);
          state.cakesData = cakeState;
        });
      },
      deleteApplicantsAPI: async (id) => {
        const apiResponse = await axios.delete(
          `http://localhost:4000/applicants/${id}`
        );
        set((state) => {
          state.applicantData = state.applicantData.filter((_) => _.id !== id);
        });
      },
    })))
  )
;

export const getApplicantById = (id) => {
  return (state) => {
    let cake = state.applicantDataData.filter((c) => c.id === Number(id));
    if (cake) {
      return cake[0];
    }
    return null;
  };
};