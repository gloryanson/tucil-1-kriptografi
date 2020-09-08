//PLAYFAIR CIPHER
var matrix = [];

function doCrypt(isEncrypted) {
	if (document.getElementById("key").value.length == 0) {
		alert("Key is empty");
		return;
	}
	var key = filterKey(removeChar(document.getElementById("key").value));
	if (key.length == 0) {
		alert("Key has no letters");
		return;
	}

	matrix = generateKey(matrix, key);

	var textElem = document.getElementById("text");
	var resultElem = document.getElementById("result");

	if (isEncrypted) {
		var res = Decrypt(Bigram(textElem.value), matrix);
	} else {
		var res = Encrypt(Bigram(textElem.value), matrix);
	}
	resultElem.value = "(a)tanpa spasi:\n   " + res + "\n\n(b)kelompok 5 huruf:\n   " + fiveLetters(res);
}

function Encrypt(input, matrix) {
	var output = "";
		for (i=0; i<input.length; i+=2) {
			var char1 = [];
			var char2 = [];
			var found1 = false;
			var found2 = false;

			var row = 0;
			while (row<5 && !found1) {
				var col = 0;
				while (col<5 && !found1) {
					if (input[i] == matrix[row][col]) {
						char1.push(row);char1.push(col);
						found1 = true;
					} else {
						col++;
					}
				}
				row++;
			}

			row = 0;
			while (row<5 && !found2) {
				var col = 0;
				while (col<5 && !found2) {
					if (input[i+1] == matrix[row][col]) {
						char2.push(row);char2.push(col);
						found2 = true;
					} else {
						col++;
					}
				}
				row++;
			}

			if (char1[0] == char2[0]) {//same row
				output += String.fromCharCode(matrix[char1[0]][mod(char1[1]+1, 5)] + 65);
				output += String.fromCharCode(matrix[char2[0]][mod(char2[1]+1, 5)] + 65);
			} else if (char1[1] == char2[1]) {//same column
				output += String.fromCharCode(matrix[mod(char1[0]+1, 5)][char1[1]] + 65);
				output += String.fromCharCode(matrix[mod(char2[0]+1, 5)][char2[1]] + 65);
			} else {
				output += String.fromCharCode(matrix[char1[0]][char2[1]] + 65);
				output += String.fromCharCode(matrix[char2[0]][char1[1]] + 65);
			}

		}
	return output;
}

function Decrypt(input, matrix) {
	var output = "";
		for (i=0; i<input.length; i+=2) {
			var char1 = [];
			var char2 = [];
			var found1 = false;
			var found2 = false;

			var row = 0;
			while (row<5 && !found1) {
				var col = 0;
				while (col<5 && !found1) {
					if (input[i] == matrix[row][col]) {
						char1.push(row);char1.push(col);
						found1 = true;
					} else {
						col++;
					}
				}
				row++;
			}

			row = 0;
			while (row<5 && !found2) {
				var col = 0;
				while (col<5 && !found2) {
					if (input[i+1] == matrix[row][col]) {
						char2.push(row);char2.push(col);
						found2 = true;
					} else {
						col++;
					}
				}
				row++;
			}

			if (char1[0] == char2[0]) {//same row
				output += String.fromCharCode(matrix[char1[0]][mod(char1[1]-1, 5)] + 65);
				output += String.fromCharCode(matrix[char2[0]][mod(char2[1]-1, 5)] + 65);
			} else if (char1[1] == char2[1]) {//same column
				output += String.fromCharCode(matrix[mod(char1[0]-1, 5)][char1[1]] + 65);
				output += String.fromCharCode(matrix[mod(char2[0]-1, 5)][char2[1]] + 65);
			} else {
				output += String.fromCharCode(matrix[char1[0]][char2[1]] + 65);
				output += String.fromCharCode(matrix[char2[0]][char1[1]] + 65);
			}
		}
	output = output.split("X").join("");
	return output;
}

function generateKey(matrix, key) {
	var temp_matrix = [];
	var matrix = [];
	for (i=0; i<key.length; i++) {
		if (key[i] != 9) {//key != "j" or "J"
			for (j=0; j<i; j++) {
				if (key[i] == key[j]) break;
			}
			if (i == j) temp_matrix.push(key[i]);
		}
	}
	//A-I
	for (i=0; i<9; i++) {
		var dup = false;
		var j = 0;
		while (j < temp_matrix.length && !dup) {
			if (i == temp_matrix[j]) {
				dup = true;
			} else {
				j++;
			}
		}

		if (!dup) temp_matrix.push(i);
	}
	//K-Z
	for (i=10; i<26; i++) {
		var dup = false;
		var j = 0;
		while (j < temp_matrix.length && !dup) {
			if (i == temp_matrix[j]) {
				dup = true;
			} else {
				j++;
			}
		}

		if (!dup) temp_matrix.push(i);
	}

	i=0;
	while (i<25) {
		for (j=0; j<5; j++) {
			var row = [];
			for (k=0; k<5; k++) {
				row.push(temp_matrix[i]);
				i++;
			}
			matrix.push(row);
		}
	}
	//PRINT MATRIX
	var p_matrix = "<table>";
	for (i=0; i<5; i++) {
		p_matrix += "<tr>";
		for (j=0; j<5; j++) {
			p_matrix += "<td>" + String.fromCharCode(matrix[i][j] + 65) +"</td>";
		}
		p_matrix += "</tr>";
	}
	p_matrix += "</table>";
	document.getElementById("matrix").innerHTML = p_matrix;

	return (matrix);
}

function Bigram(input) {
	var bigram = [];
	input = removeChar(input);
	//filter "j"
	for (i=0; i<input.length; i++) {
		var c = input.charCodeAt(i);
		if (c == 74 || c == 96) {
			c -= 1;
		}
		if (isUppercase(c)) {
			c -= 65;
		} else {
			c -= 97;
		}
		bigram.push(c);
	}
	//add "x=(23)"
	for (i=0; i<bigram.length; i+=2) {
		if (bigram[i] == bigram[i+1] && bigram[i] != 23) {
			bigram.splice(i+1, 0, 23);
		}
	}
	if (mod(bigram.length, 2) == 1) {
		bigram.push(23);
	}
	console.log(bigram);

	return bigram;
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

function removeChar(input) {
	var out = "";
	for (i=0; i<input.length; i++) {
		if (isLetter(input.charCodeAt(i))) {
			out += input[i];
		}
	}
	return out;
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