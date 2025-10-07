import { createStore } from "@ngneat/elf";
import { withEntities } from "@ngneat/elf-entities";
import { User } from "../interfaces/user.interface";

export const usersStore = createStore({ name: "users" }, withEntities<User>());

