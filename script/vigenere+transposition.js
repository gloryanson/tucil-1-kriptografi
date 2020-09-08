//VIGENERE+TRANSPOSITION CIPHER
function doCrypt(isEncrypted) {
	if (document.getElementById("key").value.length == 0) {
		alert("Key is empty");
		return;
	}
	var key = filterKey(document.getElementById("key").value);
	if (key.length == 0) {
		alert("Key has no letters");
		return;
	}

	var textElem = document.getElementById("text");
	var resultElem = document.getElementById("result");
	if (isEncrypted) {
		var res = Decrypt(removeChar(textElem.value), key);
	} else {
		var res = Encrypt(removeChar(textElem.value), key);
	}
	resultElem.value = "(a)tanpa spasi:\n   " + res + "\n\n(b)kelompok 5 huruf:\n   " + fiveLetters(res);
}

function Encrypt(input, key) {
	var output = "";
	for (var i = 0; i < input.length; i++) {
		var c = input.charCodeAt(i);
		if (isUppercase(c)) {
			output += String.fromCharCode(mod(c - 65 + key[mod(i, key.length)], 26) + 65);
		} else if (isLowercase(c)) {
			output += String.fromCharCode(mod(c - 97 + key[mod(i, key.length)], 26) + 97);
		}
	}

	var temp = [];
	var col =Math.ceil(Math.sqrt(output.length));
	var row =Math.ceil(output.length / col);
	i = 0;
	while (i<output.length) {
		var temp_row = [];
		for (j=0; j<col; j++) {
			temp_row.push(output[i]);
			i++;
		}
		temp.push(temp_row);
	}

	output = "";
	i = 0;
	while (i<temp.length) {
		for (j=0; j<col; j++) {
			for (k=0; k<row; k++) {
				if (temp[k][j] != undefined) {
					output += temp[k][j];
					i++;
				}
			}
		}
	}

	return output;
}

function Decrypt(input, key) {
	var output = "";

	var temp = [];
	var row =Math.ceil(Math.sqrt(input.length));
	var col =Math.ceil(input.length / row);
	i = 0;
	while (i<input.length) {
		var temp_row = [];
		for (j=0; j<col; j++) {
			temp_row.push(input[i]);
			i++;
		}
		temp.push(temp_row);
	}

	var input = "";
	i = 0;
	while (i<temp.length) {
		for (j=0; j<col; j++) {
			for (k=0; k<row; k++) {
				if (temp[k][j] != undefined) {
					input += temp[k][j];
					i++;
				}
			}
		}
	}


	for (var i = 0; i < input.length; i++) {
		var c = input.charCodeAt(i);
		if (isUppercase(c)) {
			output += String.fromCharCode(mod(c - 65 - key[mod(i, key.length)], 26) + 65);
		} else if (isLowercase(c)) {
			output += String.fromCharCode(mod(c - 97 - key[mod(i, key.length)], 26) + 97);
		}
	}
	return output;
}

function filterKey(key) {
	var result = [];
	for (var i = 0; i < key.length; i++) {
		var c = key.charCodeAt(i);
		if (isLetter(c))
			result.push((c - 65) % 32);
	}
	return result;
}


function isLetter(c) {
	return isUppercase(c) || isLowercase(c);
}

function isUppercase(c) {
	return 65 <= c && c <= 90;  // 65 is character code for 'A'. 90 is 'Z'.
}

function isLowercase(c) {
	return 97 <= c && c <= 122;  // 97 is character code for 'a'. 122 is 'z'.
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

function fiveLetters(result) {
	var output = "";
	for (i=0; i<result.length; i++) {
		if (i != 0 && i % 5 == 0) {
			output += " ";
		}
		output += result[i];
	}
	return output;
}

function removeChar(input) {
	var out = "";
	for (i=0; i<input.length; i++) {
		if (isLetter(input.charCodeAt(i))) {
			out += input[i];
		}
	}
	return out;
}