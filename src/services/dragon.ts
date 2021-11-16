import axios from "axios";
import { DragonProps } from "../components/DragonCard";

class Dragon {
  baseUrl = "https://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon";

  emptyDragon = {
    id: "",
    name: "",
    createdAt: "",
    type: "",
  } as DragonProps;

  getDragons = async () => await axios.get(this.baseUrl).then((res) => res);

  getDragon = async (id: string) =>
    await axios.get(`${this.baseUrl}/${id}`).then((res) => res);

  editDragon = async ({
    id,
    name,
    type,
  }: {
    id: string;
    name: string;
    type: string;
  }) =>
    await axios.put(`${this.baseUrl}/${id}`, { name, type }).then((res) => res);

  addDragon = async ({ name, type }: { name: string; type: string }) =>
    await axios.post(this.baseUrl, { name, type }).then((res) => res);

  deleteDragon = async (id: string) =>
    await axios.delete(`${this.baseUrl}/${id}`).then((res) => res);
}

export default new Dragon();
