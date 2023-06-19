import { v4 as uuidv4 } from 'uuid'; 

export const createToken = ({user}) => {
  return uuidv4()+"-"+user;
};
