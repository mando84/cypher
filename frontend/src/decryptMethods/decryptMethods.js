export const decrypt = (message, key) => {
  //import setMessage to change the message to original state
  console.log(`in decryptMethod: ${key}`);
  for (let i = 0; i < key.length; i++) {
    console.log(key[key.length - 1 - i]);

    if (key[key.length - 1 - i][0] === "replaceNumSym") {
      message = replaceNumSym(message, key[key.length - 1 - i]);
    } else if (key[key.length - 1 - i][0] === "rotate") {
      message = rotate(message, key[key.length - 1 - i]);
    } else if (key[key.length - 1 - i][0] === "switch") {
      message = switched(message, key[key.length - 1 - i]);
    } else if (key[key.length - 1 - i][0] === "spaces") {
      message = spaces(message, key[key.length - 1 - i]);
    }
  }
  return message;
};

const replaceNumSym = (encrypted, key) => {
  const idxArr = key[2];
  const charArr = key[1];
  let decrypted = encrypted.split("");
  for (let i = 0; i < idxArr.length; i++) {
    decrypted[idxArr[i]] = charArr[i];
  }
  return decrypted.join("");
};

const rotate = (encrypted, key) => {
  console.log("rotate");
  const rotateNum = key[1];

  let decrypted = encrypted.split("").map((char) => {
    let leftover;
    if (char.codePointAt() >= 65 && char.codePointAt() <= 90) {
      if (Number(char.codePointAt()) - Number(rotateNum) < 65) {
        leftover = 65 - Number(char.codePointAt() - Number(rotateNum));
        return String.fromCharCode(91 - leftover);
      } else {
        return String.fromCharCode(
          Number(Number(char.codePointAt()) - Number(rotateNum))
        );
      }
    } else if (char.codePointAt() >= 97 && char.codePointAt() <= 122) {
      if (Number(char.codePointAt()) - Number(rotateNum) < 97) {
        leftover = 97 - Number(char.codePointAt() - Number(rotateNum));
        console.log(`leftover: ${leftover}`);
        return String.fromCharCode(123 - leftover);
      } else {
        return String.fromCharCode(
          Number(char.codePointAt()) - Number(rotateNum)
        );
      }
    } else {
      return char;
    }
  });
  console.log(`from methods decrhpted: ${decrypted.join("")}`);
  return decrypted.join("");
};

const switched = (encrypted, key) => {
  let originalChar = key[1];
  let originalIdxs = key[2];

  let decrypted = encrypted.split("").map((char, idx) => {
    if (originalIdxs.includes(idx)) return originalChar;
    return char;
  });
  return decrypted.join("");
};

const spaces = (encrypted, key) => {
  let decrypted = encrypted.split("");

  for (let i = 0; i < key[1].length; i++) {
    decrypted[key[1][i]] = " ";
  }
  return decrypted.join("");
};

export default decrypt;
