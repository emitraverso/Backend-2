import { hashSync, compareSync, genSaltSync } from "bcrypt";

export const createHash = (password) => hashSync(password, genSaltSync(4))

export const validatePassword = (passIngresado, passDB) => compareSync(passIngresado, passDB)
