//HILL CIPHER

function doCrypt(isEncrypted) {
	var 
		matrix_length = parseInt(document.getElementById("m-length").value),
		key = generateKey(matrix_length),
		textElem = document.getElementById("text"),
		resultElem = document.getElementById("result"),
		input = N_Gram(removeChar(textElem.value), matrix_length);
	if (determinant(key) == 0) {
		alert("Determinant of Key must not be 0(zero)");
	} else if (!isRerativelyPrime (mod(determinant(key), 26), 26)) {
		alert("Determinant of Key must be relatively prime to 26");
	} else {
		if (isEncrypted) {
			var res = Decrypt(input, key);
		} else {
			var res = Encrypt(input, key);
		}
		resultElem.value = "(a)tanpa spasi:\n   " + res + "\n\n(b)kelompok 5 huruf:\n   " + fiveLetters(res);
	}
}

function Encrypt(input, key) {
	var output = "";
	for (var i = 0; i < input.length; i++) {
		var output_row = matrix_Multiply(key, input[i]);
		for (j=0; j<output_row.length; j++) {
			output += String.fromCharCode(output_row[j] + 65);
		}
	}
	return output;
}

function Decrypt(input, key) {
	var output = "",
		det = (inversMod(determinant(key), 26)),
		key_inverted = (invers(key, inversMod(determinant(key), 26)));

	for (var i = 0; i < input.length; i++) {
		var output_row = matrix_Multiply(key_inverted, input[i]);
		for (j=0; j<output_row.length; j++) {
			output += String.fromCharCode(output_row[j] + 65);
		}
	}

	return output;
}

function mod(n, m) {
	while (n<0) {
		n += m;
	}
  	return (n % m);
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

function generateKeyInput(matrix_length) {
	var table = "<table>";
	for (i=0; i<matrix_length; i++) {
		table += "<tr>"; 
		for (j=0; j<matrix_length; j++) {
			table += "<td>" + "<input style='width:4em;' type='number' id='k" + i + j + "'></input></td>";
		}
		table += "</tr>";
	}
	table += "</table>";
	document.getElementById("key").innerHTML = table;
}

function generateKey(matrix_length) {
	var row, key = [];
	var cell = 0;
	for (i=0; i<matrix_length; i++) {
		row = [];
		for (j=0; j<matrix_length; j++) {
			cell = parseInt(document.getElementById("k"+i+j).value);
			if (isNaN(cell)) {
				row.push(1);
				document.getElementById("k"+i+j).value = 1;
			} else {
				row.push(cell);
			}
		}
		key.push(row);
	}
	return key;
}

function N_Gram(input, matrix_length) {
	var output = [];
	var i= 0;
	while(i<input.length) {
		var row = [];
		for (j=0; j<matrix_length; j++) {
			if (input[i] == undefined) {
				row.push(0);
			} else {
				var c = input.charCodeAt(i);
				if (isUppercase(c)) {
					row.push(c - 65);
				} else {
					row.push(c - 97);
				}
				i++;
			}
		}
		output.push(row);
	}
	return (output);
}

function matrix_Multiply(key, input) { //input == 1 row N_Gram
	var output = [];
	for (i=0; i<key.length; i++) {
		var result = 0;
		for (j=0; j<key.length; j++) {
			result += key[i][j] * input[j];
		}
		output.push(mod(result, 26));
	}
	return(output);
}

function determinant(m) {
    if (m.length==1) {
      if (typeof m[0] === 'object' ){
          return m[0][0];
      } else {
          return m[0];
      }
    }
    
    var minors = [];
    for (var i = 0; i < m[0].length; i += 1) {
        minors[i] = [];
        for (var j = 0; j < m[0].length; j += 1) {
            if (j==0) continue;
            if (!minors[i][j-1]) minors[i][j-1] = [];
            for (var k = 0; k < m[0].length; k += 1 ) {
                if (k==i) continue;
                minors[i][j-1].push(m[j][k]);
            }
        }
    }
    var multiplier = 1;
    var subResults = [];
    for (var i = 0; i < m.length; i += 1 ) {
        subResults[i] = multiplier * m[0][i] * determinant(minors[i]);
        multiplier *= -1;
    }
    return subResults.reduce( function( sum, val ) {return sum + val; }, 0 );
}

function invers(m, det) { //only 2x2 and 3x3
	var inverted = [], tmp = [];
	if (m.length == 2) {
		var row1 = [], row2 = [];
		row1.push(m[1][1]);row1.push(-1 * m[0][1]);
		row2.push(-1 * m[1][0]);row2.push(m[0][0]);
		tmp.push(row1);tmp.push(row2);
	} else {
		//cofactor
		var tmp2 = [];
		for (var r = 0; r < m.length; r++) { 
			var row = [];
	        for (var c = 0; c < m.length; c++) {	
	        	var cof = [];
				for (i=0; i<m.length; i++) {
					if (i != r) {
						var cof_row = [];
						for (j=0; j<m.length; j++) {
							if (j != c) {
								cof_row.push(m[i][j]);
							}
						}
						cof.push(cof_row);
					}
				}
	        	row.push(Math.pow(-1, r+c) * (cof[0][0]*cof[1][1] - cof[0][1]*cof[1][0]));
	        } 
	        tmp2.push(row);
    	}
		//transpose
		for (i = 0; i < tmp2.length; i++) { 
			var row = [];
	        for (j = 0; j < tmp2.length; j++) {
	        	row.push(tmp2[j][i]);
	        } 
	        tmp.push(row);
    	}
	}
	for (i=0; i<tmp.length; i++) {
		var row = [];
		for (j=0; j<tmp.length; j++) {
			row.push(mod(tmp[i][j] * det, 26));
		}
		inverted.push(row);
	}
	return(inverted);
}

function isRerativelyPrime(a, b) {
    while(b != 0){
        var temp = a;
        a = b;
        b = temp%b;
    }
    return (a == 1);
}