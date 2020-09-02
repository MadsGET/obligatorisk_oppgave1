var monthNames = ['January', 'Feburary', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'Desember'];
var monthBoundaryLimit = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Debug only
function logMonthNameAndLimit()
{
	for (var i = 0; i < 12; i++)
	{
		console.log(monthNames[i] + ' range: ' + monthBoundaryLimit[i]);
	}
}

// Hoved funksjon som sjekker om dato er gyldig.
function isDateValid(date)
{
	// SEPERARE TEKST OG INTS
	// Inspisere tekst først
	// Ints etterpå
	// check bools
	// check leap


	// Guard clause: Hvis formatering eller lengde er ugyldig for date.
	if (!dateLengthValid(date) || !dateFormatValid(date))
	{
		return false;
	}

	// Del opp hver bit av teksten, og sørg for at det er et tall.
	var dayValue = parseInt(date.slice(0, 2));	//console.log(day);
	var monthValue = parseInt(date.slice(3, 5)); //console.log(month);
	var yearValue = parseInt(date.slice(6, 10)); //console.log(year);

	// Sjekk at dag og måned er størelse 2 i lengde, og år er størelse 4 i lengde.

	// Sjekk om hver del av datoen er gyldig til sin respektive rekkevidde.
	var dayValid = (checkRange(1, monthBoundaryLimit[monthValue - 1], dayValue) && checkLength(dayValue, 2)) ? true : false;
	var monthValid = (checkRange(1, 12, monthValue) && checkLength(monthValue, 2)) ? true : false;
	var yearValid = (checkRange(0, 9999, yearValue) && checkLength(yearValue, 4)) ? true : false;

	console.log('Day: ' + dayValid);
	console.log('Month: ' + monthValid);
	console.log('Year: ' + yearValid);

	// Sjekk skuddår først, deretter standard dato sjekk.
	if (dayValue == 29 && monthValue == 2 && yearValid && isLeapYear(yearValue))
	{
		//console.log('Skuddår!');
		return true;
	}
	else if (dayValid && monthValid && yearValid)
	{
		//console.log('Vanlig år');
		return true;
	}
	else
	{
		return false;
	}

	//console.log('Day = ' + dayValid);
	//console.log('Month = ' + monthValid);
	//console.log('Year = ' + yearValid);
}

// Er lengden på teksten gyldig?
function dateLengthValid(date)
{
	return (date.length == 10) ? true : false;
}

// Er teksten markert riktig?
function dateFormatValid(text)
{
	return (text.substring(2, 3) == '.' && text.substring(5, 6) == '.') ? true : false;
}

// Er lengden på teksten gyldig?
function checkLength(text, expectedLength)
{
	return (text.length == expectedLength) ? true : false;
}

// Sjeker en verdi opp mot en satt rekkevidde (min/max).
function checkRange(minimum, maximum, value)
{
	return (value >= minimum && value <= maximum) ? true : false;
}

// Er det skuddår?
function isLeapYear(year)
{
	return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}
