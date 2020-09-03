// Hovedfunksjon som sjekker om dato er gyldig.
function isDateValid(date)
{
	// Vi setter lengden per måned i en array så det er lett å hente. (Spesielt untak skjer for februar).
	const monthBoundaryLimit = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	// Hvis formatering eller lengde er gyldig for date verdi.
	if (checkLength(date, 10) && dateFormatValid(date))
	{
		// Vi henter disse etter formaterings og lengde sjekk sånn at vi ikke prøver å hente en null verdi.
		var dayValue = date.slice(0, 2);
		var monthValue = date.slice(3, 5);
		var yearValue = date.slice(6, 10);

		// Sjekk lengden for hver tekst verdi.
		if (checkLength(dayValue, 2) && checkLength(monthValue, 2) && checkLength(yearValue, 4))
		{
			// Sjekk om hver del av datoen er gyldig til sin respektive rekkevidde, og lengde på teksten.
			var dayValid = (checkRange(1, monthBoundaryLimit[monthValue - 1], dayValue)) ? true : false;
			var monthValid = (checkRange(1, 12, monthValue)) ? true : false;
			var yearValid = (checkRange(0, 9999, yearValue)) ? true : false;

			// Om dato er gyldig, eller om vi har en gyldig skuddår dato.
			if (dayValid && monthValid && yearValid || dayValue == 29 && monthValue == 2 && isLeapYear(parseInt(yearValue)))
			{
				return true;
			}
		}
	}

	return false;
}

// Er teksten formatert riktig?
function dateFormatValid(text)
{
	return (text.substring(2, 3) == '.' && text.substring(5, 6) == '.') ? true : false;
}

// Er lengden på teksten gyldig?
function checkLength(text, expectedLength)
{
	return (text.length == expectedLength) ? true : false;
}

// Sjekker om en verdi er innenfor min/max verdien.
function checkRange(minimum, maximum, value)
{
	value = parseInt(value);
	return (value >= minimum && value <= maximum) ? true : false;
}

// Er det skuddår?
function isLeapYear(year)
{
	return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}