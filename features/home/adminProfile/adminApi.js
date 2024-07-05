import AsyncStorage from "@react-native-async-storage/async-storage";
import { _retrieveData } from "../../../localStorage";
import env from "../../../env.js";

export function signInAdmin(adminData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${env.BASE_URL}/admin/signin`, {
        method: "POST",
        body: JSON.stringify(adminData),
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      const { jwt_token } = data;
      if (jwt_token) {
        await AsyncStorage.setItem("jwt_token", jwt_token);
      }
      resolve({ data });
    } catch (error) {
      reject({ error });
    }
  });
}
export function createNewElection(electionData) {
  return new Promise(async (resolve, reject) => {
    const jwt_token = await _retrieveData("jwt_token");
    try {
      const response = await fetch(
        `${env.BASE_URL}/election/register`,
        {
          method: "POST",
          body: JSON.stringify(electionData),
          headers: {
            Authorization: `Bearer ${jwt_token}`,
            "content-type": "application/json",
          },
        }
      );

      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject({ error });
    }
  });
}
export function showTodayResultElection() {
  return new Promise(async (resolve, reject) => {
    // console.log("eter sdfldjfldsjfljsdlfjsdjlf sldflkds  ")
    const jwt_token = await _retrieveData("jwt_token");
    try {
      const response = await fetch(
        `${env.BASE_URL}/admin/toadyresultelection`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${jwt_token}` },
        }
      );

      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject({ error });
    }
  });
}
export function calculateElection(id) {
  return new Promise(async (resolve, reject) => {
    // console.log("eter sdfldjfldsjfljsdlfjsdjlf sldflkds  ")
    const jwt_token = await _retrieveData("jwt_token");
    try {
      const response = await fetch(
        `${env.BASE_URL}/election/calculatResult/${id}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${jwt_token}` },
        }
      );

      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject({ error });
    }
  });
}
export function deleteElection(_id) {
  return new Promise(async (resolve, reject) => {
    const jwt_token = await _retrieveData("jwt_token");
    try {
      const response = await fetch(
        `${env.BASE_URL}/admin/election/${_id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${jwt_token}` },
        }
      );

      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject({ error });
    }
  });
}
export function updateElection({ updateData, _id }) {
  return new Promise(async (resolve, reject) => {
    const jwt_token = await _retrieveData("jwt_token");
    try {
      const response = await fetch(
        `${env.BASE_URL}/admin/election/${_id}`,
        {
          method: "PUT",
          body: JSON.stringify(updateData),
          headers: {
            Authorization: `Bearer ${jwt_token}`,
            "content-type": "application/json",
          },
        }
      );

      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject({ error });
    }
  });
}
export function adminProfileData() {
  return new Promise(async (resolve, reject) => {
    const jwt_token = await _retrieveData("jwt_token");
    try {
      const response = await fetch(`${env.BASE_URL}/admin/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt_token}`,
          "content-type": "application/json",
        },
      });

      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject({ error });
    }
  });
}
export function showAllResult() {
  return new Promise(async (resolve, reject) => {
    const jwt_token = await _retrieveData("jwt_token");
    try {
      const response = await fetch(
        `${env.BASE_URL}/admin/allresult`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${jwt_token}` },
        }
      );

      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject({ error });
    }
  });
}
export function showResult(_id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${env.BASE_URL}/admin/result`, {
        method: "POST",
        body: JSON.stringify(_id),
        headers: { "content-type": "application/json" },
      });

      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject({ error });
    }
  });
}
export function showAllElection() {
  return new Promise(async (resolve, reject) => {
    const jwt_token = await _retrieveData("jwt_token");
    try {
      const response = await fetch(
        `${env.BASE_URL}/admin/allelection`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${jwt_token}` },
        }
      );

      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject({ error });
    }
  });
}
export function showEditedElection() {
  return new Promise(async (resolve, reject) => {
    const jwt_token = await _retrieveData("jwt_token");
    try {
      const response = await fetch(`${env.BASE_URL}/admin/edited`, {
        method: "GET",
        headers: { Authorization: `Bearer ${jwt_token}` },
      });

      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject({ error });
    }
  });
}
export function showElection(_id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${env.BASE_URL}/admin/election`, {
        method: "POST",
        body: JSON.stringify(_id),
        headers: { "content-type": "application/json" },
      });

      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject({ error });
    }
  });
}

export function showPopulerElection(_id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${env.BASE_URL}/admin/populer`, {
        method: "GET",
      });

      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject({ error });
    }
  });
}
