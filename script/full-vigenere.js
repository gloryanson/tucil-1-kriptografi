//FULL VIGENERE CHIPER
var matrix = [];
for (var i = 0; i < 26; i++) {
	var array = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
	for (var j = array.length - 1; j > 0; j--) {
        var k = Math.floor(Math.random() * (j + 1));
        var temp = array[j];
        array[j] = array[k];
        array[k] = temp;
	}
	matrix[i] = array;
}

window.onload = function () {
	var p_matrix = "";
	p_matrix += "<table><tr><td></td><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>K</td><td>L</td><td>M</td><td>N</td><td>O</td><td>P</td><td>Q</td><td>R</td><td>S</td><td>T</td><td>U</td><td>V</td><td>W</td><td>X</td><td>Y</td><td>Z</td></tr>";
	for (i=0; i<matrix.length; i++) {
		p_matrix += "<tr><td>" + String.fromCharCode(i+97) + "</td>";
		for (j=0; j<matrix.length; j++) {
			p_matrix += "<td>" + matrix[i][j] + "</td>";
		}
		p_matrix += "</tr>";
	}
	document.getElementById("matrix").innerHTML = p_matrix;
}

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
		var res = Decrypt(textElem.value, key);
	} else {
		var res = Encrypt(textElem.value, key);
	}
	resultElem.value = "(a)tanpa spasi:\n   " + res + "\n\n(b)kelompok 5 huruf:\n   " + fiveLetters(res);
}

function Encrypt(input, key) {
	var output = "";
	for (var i = 0; i < input.length; i++) {
		var c = input.charCodeAt(i);
		var k = key[mod(i, key.length)];
		if (isUppercase(c)) {
			output += matrix[k][c - 65];
		} else if (isLowercase(c)) {
			output += matrix[k][c - 97];
		}
	}
	return output;
}

function Decrypt(input, key) {
	var output = "";
	input = removeChar(input);
	for (var i = 0; i < input.length; i++) {
		var c = input.charCodeAt(i);
		if (isLetter(c)) {
			for (var j = 0; j < 26; j++) {
				if (matrix[key[mod(i, key.length)]][j] == input[i]) {
					var idx = j;
					break;
				}
			}
			output += String.fromCharCode(idx + 97);
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