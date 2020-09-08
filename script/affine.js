//AFFINE CIPHER
function doCrypt(isEncrypted) {
	if (document.getElementById("m-key").value.length == 0 || document.getElementById("b-key").value.length == 0) {
		alert("Key is empty");
		return;
	}

	var Multiplier = parseInt(document.getElementById("m-key").value);
	if (!isRerativelyPrime(Multiplier, 26)) {
		alert("M must be relatively prime to 26");
	} else {
		var Inverted_Multiplier = inversMod(Multiplier, 26);
		var Adder = parseInt(document.getElementById("b-key").value);
		var textElem = document.getElementById("text");
		var resultElem = document.getElementById("result");
		if (isEncrypted) {
			var res = Decrypt(removeChar(textElem.value), Inverted_Multiplier, Adder);
		} else {
			var res = Encrypt(removeChar(textElem.value), Multiplier, Adder);
		}
		resultElem.value = "(a)tanpa spasi:\n   " + res + "\n\n(b)kelompok 5 huruf:\n   " + fiveLetters(res);
	}

}

function Encrypt(input, multiplier, adder) {
	var output = "";
	for (var i = 0; i < input.length; i++) {
		var c = input.charCodeAt(i);
		if (isUppercase(c)) {
			output += String.fromCharCode(mod(multiplier * (c - 65) + adder, 26) + 65);
		} else if (isLowercase(c)) {
			output += String.fromCharCode(mod(multiplier * (c - 97) + adder, 26) + 97);
		}
	}
	return output;
}

function Decrypt(input, multiplier, adder) {
	var output = "";
	for (var i = 0; i < input.length; i++) {
		var c = input.charCodeAt(i);
		if (isUppercase(c)) {
			output += String.fromCharCode(mod(multiplier * (c - 65 - adder), 26) + 65);
		} else if (isLowercase(c)) {
			output += String.fromCharCode(mod(multiplier * (c - 97 - adder), 26) + 97);
		}
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

function removeChar(input) {
	var out = "";
	for (i=0; i<input.length; i++) {
		if (isLetter(input.charCodeAt(i))) {
			out += input[i];
		}
	}
	return out;
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

function inversMod(a, m) {
	for (i=1; i<m; i++) {
		if (mod(a*i, m) == 1) {
			return i;
			break;
		}
	}
}

function isRerativelyPrime(a, b) {
    while(b != 0){
        var temp = a;
        a = b;
        b = temp%b;
    }
    return (a == 1);
}