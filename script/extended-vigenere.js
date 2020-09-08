//EXTENDED VIGENERE CHIPER
function doCrypt(isEncrypted) {
	var key = document.getElementById("key").value;
	if (key.length == 0) {
		alert("Key is empty");
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
		var k = key.charCodeAt(mod(i,key.length));
		output += String.fromCharCode(mod(c + k, 256));
	}
	return output;
}

function Decrypt(input, key) {
	var output = "";
	for (var i = 0; i < input.length; i++) {
		var c = input.charCodeAt(i);
		var k = key.charCodeAt(mod(i,key.length));
		output += String.fromCharCode(mod(c - k, 256));
	}
	return output;
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