import fs, {promises} from 'fs';
import os from 'os';
import path from 'path';

const users = [
  {name: 'Mike', age: 25},
  {name: 'Bob', age: 32},
  {name: 'Nikola', age: 17},
 ] 

//  1-2
const setData = async (users) => {
  try {
    const data = JSON.stringify({users});
    await promises.writeFile('data.json', data);
    console.log('Data written to file');
  } catch (error) {
    console.error(error);
  }
}

setData(users);

//3
// const setData = async () => {
//   try {
//     const data = JSON.stringify({ users });
//     const homeDir = os.homedir();
//     const filePath = path.join(homeDir, 'data.json');
//     await promises.writeFile(filePath, data);
//     console.log('Data written to file:', filePath);
//   } catch (error) {
//     console.error(error);
//   }
// }

// setData();

// 3-4.

const newData = [
  {name: 'Anna', age: 24},
  {name: 'Tom', age: 52}
];

const updateData = async () => {
  try {
    
    const rawData = await promises.readFile('data.json');
    const existingData = JSON.parse(rawData);

    const updatedData = existingData.users.concat(newData);

    const data = JSON.stringify({ users: updatedData });
    await promises.writeFile('data.json', data);
    console.log('Data updated in file: data.json');
  } catch (error) {
    console.error(error);
  }
}

updateData();

// 5
const isExist = async (filename) => {
  try {
    await promises.stat(filename);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false;
    }
    throw error;
  }
}

(async () => {
  const filename = 'data.json';
  const fileExists = await isExist(filename);
  console.log(`File ${filename} exists: ${fileExists}`);
})();