---
layout: post
title: "Encodings"
subtitle: "Exploring Unicode and other charsets"
tags: [dev, tech]
---

# Definitions

Before we get into the historical encodings and charsets, let's define some of the terms.

- **Code point:** A code space is any numerical code that refers to a single character in a _character set_.
- **Character set (charset):** A character set maps _characters_ to _code points_. Examples of charsets are ASCII and Unicode.
- **Encode:** To encode means to map a _character string_ to its _byte string_.
- **Decode:** To decode means to map a _byte string_ to its _character string_.
- **Encoding:** Encoding is the process of _encoding_ code points to byte strings and _decoding_ byte strings to code points.
- **Character string:** A character string is a string where each unit is a character.
- **Byte string:** A byte string is a sequence of bytes instead of characters; it is the encoded character string.
- **Code page:** A code page is a list of codes that map a _character_ to its _code point_.
- **Numeral systems:** A numeral system is a writing system for expressing numbers; it provides notation for expressing numbers of a set using symbols. _Binary_ is a well-known base-2 conversion system, but numbers can be represented under different numeral systems. _Binary_ means base-2, _ternary_ means base-3, _quaternary_ means base-4, so on and so forth. The most common of numeral systems (excluding binary) are _octal_ (base-8), _decimal_ (base-10), and _hexadecimal_ (base-16). [Here](/numcon) is a simple tool I made for converting between numeral systems.

# Historical encodings and charsets

Here’s a short history lesson on encodings. Not into history? Click [here][1] to skip to more recent character sets.

## Morse code

The origins of Morse code began with Samuel Morse, Joseph Henry, and Alfred Vail in 1836[^1]. They developed an electrical telegraph system which used electrical signals to communicate. Morse had the idea to transmit a code, based on these currents and the length time in between them. Together with Alfred Vail, he created a code of dots and dashes, representing each letter of the latin alphabet, the arabic numerals, and a small set of punctuation and other symbols. The code developed by Morse was later revised by others and an international standard Morse code (ITU) was created[^2].

![][image-1]

## Baudot code and teleprinters

In the 1960s we had teleprinters; machines that user point-to-point[^3] (or point to multipoint) connections to send and receive manually-typed messages. When a key is struck, the transmitter switches an electric current in the cable on or off `5` times. These changes in the current were arranged differently for each letter, forming a sort of code[^4]. This `5-bit` code was known as the Baudot code, which was limited to a total character set of `32` codes.

![][image-2]

## ASCII

The problem with the Baudot code was that it was not standardized. In the mid-1960s, USA settled on using `ASCII`, or American Standard Code for Information Interchange, as the standard character encoding scheme. `ASCII` is a `7-bit` binary system, which means that each letter is represented by `7` bits. That means that you can have numbers from `0` (`0000000`) to `127` (`1111111`). The characters encoded are uppercase letters A-Z, lowercase letters a-z, numbers 0-9, punctuation symbols, [control codes][6] (tabs, newline, etc.–many of which are now obsolete), and a space.

![ASCII Code Chart from the 70s][image-3]

You must be wondering why ``ASCII`` has a ``7 bit`` charset. This is because at the type bytes were not always ``8 bits``. Instead, different computer manufacturers used different number of bits to make a byte. As `8-`, `16-`, and `32-bit` computers became the standard, the 8th bit was initially used for parity checking. Later on, the 8th bit was used as an opportunity to create extended relatives of ASCII representing more characters. These extended charsets were given the ``ISO-`` prefix. The ``ISO 8859-1-*`` family of charsets replaced the extra ``128`` bits and some little-used control codes with characters from different scripts like Latin, Italian, Portuguese, Spanish, Danish, etc.[^5]

![Source: https://msdn.microsoft.com/en-us/library/cc195055.aspx][image-4]

This may have improved the situation, but sharing information between computers using different code pages was challenging, especially with the ever-increasing number of ``ISO`` charset variations. And with the World Wide Web, people all over the world communicating in different languages, were connected. Using ASCII, the browser could try to guess the code page if it wasn’t specified. This was err�r-prone. Something had to be done. We needed a standardized character set for all languages.

## Unicode

Unicode is our saviour!

Unicode is a charset which is a superset of all other charsets, replacing hundreds of other charsets. The Unicode group did the tedious work to unify characters from different encodings that represent the same character, no matter the language or program. The Unicode Character Set (UCS) has a grand total of ``1,114,112`` code points, from ``U+0000`` to ``U+10FFFF``.

Each Unicode character has the following information (&#9992; for example[^6]):

- **Code point:** As expected, each character has its own code point. In the case of &#9992; it's U+2708.
- **Name:** Each character also has a name, in this case 'AIRPLANE'.
- **Block:** Each character is part of a block, which is a contiguous, non-overlappping range of code points. Examples of blocks are “Basic Latin”, “Hebrew”, “Arrows”, “Tags”, etc. The block of &#9992; is “Dingbats”.
- **Category:** Examples of categories that can be assigned to characters are “Letter”, “Punctuation”, “Symbol”, etc.[^7]. The category of &#9992; is “Symbol, Other”.

<!--TODO: More on Unicode Categories-->
<!--TODO: Different Unicode Encodings-->
<!--TODO: HTTP header Content-Type and character escapes-->

----

## Sources and further reading:

[^1]:	[Morse code, Wikipedia (Accessed: 21st July 2015)][2]

[^2]:	[The History of Morse Code, JEB Five (Accessed: 21st July 2015)][3]

[^3]:	[Point-to-point telecommunications, Wikipedia (Accessed: 21st July 2015)][4]

[^4]:	[How The Teleprinter Works, BT Let's Talk (Accessed: 21st July 2015)][5]

[^5]: [ISO 8859-1, Wikipedia (Accessed: 25 July 2015)][7]

[^6]: [Unicode Character 'AIRPLANE', FileFormat (Accessed: 25 July 2015)][8]

[^7]: [Unicode Character Categories, FileFormat (Accessed: 25 July 2015)][9]

[1]:	#unicode
[2]:	https://en.wikipedia.org/wiki/Morse_code
[3]:	https://www.youtube.com/watch?v=bNoOYeS0gs0
[4]:	https://en.wikipedia.org/wiki/Point-to-point_(telecommunications)
[5]:	https://www.youtube.com/watch?v=HcMHam54EOI
[6]:	https://en.wikipedia.org/wiki/Control_character
[7]: https://en.wikipedia.org/wiki/ISO/IEC_8859-1
[8]: http://www.fileformat.info/info/unicode/char/2708/index.htm
[9]: http://www.fileformat.info/info/unicode/category/index.htm

[image-1]:	/resources/post-images/unicode/morse.png "Morse Code"
[image-2]:	/resources/post-images/unicode/teleprinter.jpg "Teleprinter"
[image-3]:	/resources/post-images/unicode/ASCII.png "ASCII"
[image-4]:	/resources/post-images/unicode/greek.gif "Greek Codepage"
