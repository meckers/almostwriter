define(function() {

    function StrokeInfo(id, offset, animate) {
        return {
            id: id,
            offset: offset,
            animate: animate
        }
    }

    return {

        // edit keys
        '8' : StrokeInfo('BACKSPACE'),
        '8+ct' : StrokeInfo('INSERT'),

        // ctrl + [1-7] changes colours
        '49+ct' : StrokeInfo('COLOUR-WHITE'),
        '50+ct' : StrokeInfo('COLOUR-YELLOW'),
        '51+ct' : StrokeInfo('COLOUR-LIGHTBROWN'),
        '52+ct' : StrokeInfo('COLOUR-DARKBROWN'),
        '53+ct' : StrokeInfo('COLOUR-PINK'),
        '54+ct' : StrokeInfo('COLOUR-DARKGREY'),
        '55+ct' : StrokeInfo('COLOUR-MEDIUMGREY'),

        // special functions
        '75+ct' : StrokeInfo('CLEAR-SCREEN'),
        '192' : StrokeInfo('PAUSE'),

        // animated characters
        '187+shct' : StrokeInfo('=', [7,0], true),
        '189+ct' : StrokeInfo('-', [7,2], true),
        '222+shct' : StrokeInfo('*', [7,4], true),
        '191+shct' : StrokeInfo('*', [7,4], true),

        // cursor movement
        '37' : StrokeInfo('ARROW-LEFT'),
        '38' : StrokeInfo('ARROW-UP'),
        '39' : StrokeInfo('ARROW-RIGHT'),
        '40' : StrokeInfo('ARROW-DOWN'),

        // basic characters
        '32' : StrokeInfo(' ', [1,0]),
        '48' : StrokeInfo('0', [1,16]),
        '49' : StrokeInfo('1', [1,17]),
        '50' : StrokeInfo('2', [1,18]),
        '51' : StrokeInfo('3', [1,19]),
        '52' : StrokeInfo('4', [1,20]),
        '53' : StrokeInfo('5', [1,21]),
        '54' : StrokeInfo('6', [1,22]),
        '55' : StrokeInfo('7', [1,23]),
        '56' : StrokeInfo('8', [1,24]),
        '57' : StrokeInfo('9', [1,25]),
        '65' : StrokeInfo('A', [0,1]),
        '66' : StrokeInfo('B', [0,2]),
        '67' : StrokeInfo('C', [0,3]),
        '68' : StrokeInfo('D', [0,4]),
        '69' : StrokeInfo('E', [0,5]),
        '70' : StrokeInfo('F', [0,6]),
        '71' : StrokeInfo('G', [0,7]),
        '72' : StrokeInfo('H', [0,8]),
        '73' : StrokeInfo('I', [0,9]),
        '74' : StrokeInfo('J', [0,10]),
        '75' : StrokeInfo('K', [0,11]),
        '76' : StrokeInfo('L', [0,12]),
        '77' : StrokeInfo('M', [0,13]),
        '78' : StrokeInfo('N', [0,14]),
        '79' : StrokeInfo('O', [0,15]),
        '80' : StrokeInfo('P', [0,16]),
        '81' : StrokeInfo('Q', [0,17]),
        '82' : StrokeInfo('R', [0,18]),
        '83' : StrokeInfo('S', [0,19]),
        '84' : StrokeInfo('T', [0,20]),
        '85' : StrokeInfo('U', [0,21]),
        '86' : StrokeInfo('V', [0,22]),
        '87' : StrokeInfo('W', [0,23]),
        '88' : StrokeInfo('X', [0,24]),
        '89' : StrokeInfo('Y', [0,25]),
        '90' : StrokeInfo('Z', [0,26]),

        '49+sh' : StrokeInfo('!', [1,1]),
        '222+sh' : StrokeInfo('"', [1,2]),
        '51+sh' : StrokeInfo('#', [1,3]),
        '52+sh' : StrokeInfo('$', [1,4]),
        '53+sh' : StrokeInfo('%', [1,5]),
        '54+sh' : StrokeInfo('&', [1,6]),
        //'191+sh' : StrokeInfo('/', [1,15]),
        '56+sh' : StrokeInfo('(', [1,8]),
        '57+sh' : StrokeInfo(')', [1,9]),
        '187+sh' : StrokeInfo('=', [1,29]),
        '48+sh' : StrokeInfo('=', [1,29]),
        '187+sh' : StrokeInfo('?', [1,31]),
        '220+sh' : StrokeInfo('*', [1,10]),   // mac
        '191+sh' : StrokeInfo('*', [1,10]),   // pc
        //'187' : StrokeInfo('+', [1,11]),
        '187' : StrokeInfo('?', [1,11]),
        '188' : StrokeInfo(',', [1,12]),
        '189' : StrokeInfo('-', [1,13]),
        '190' : StrokeInfo('.', [1,14]),
        //'191+sh' : StrokeInfo('?', [1,31]),
        '222' : StrokeInfo('\'', [1,7]),

        '220+al' : StrokeInfo('€', [0,28]),
        '221+al' : StrokeInfo(']', [0,29])

        // ©@£$∞§|[]≈±
/*
 '@': [0,0],
 'A': [0,1], 'B': [0,2], 'C': [0,3],
 'D': [0,4], 'E': [0,5], 'F': [0,6],
 'G': [0,7], 'H': [0,8], 'I': [0,9],
 'J': [0,10], 'K': [0,11], 'L': [0,12],
 'M': [0,13], 'N': [0,14], 'O': [0,15],
 'P': [0,16], 'Q': [0,17], 'R': [0,18],
 'S': [0,19], 'T': [0,20], 'U': [0,21],
 'V': [0,22], 'W': [0,23], 'X': [0,24],
 'Y': [0,25], 'Z': [0,26], '[': [0,27],
 '€': [0,28], ']': [0,29], // pil upp (30), pil vänster (31) här
 ' ': [1,0], '!': [1,1], '"': [1,2],
 '#': [1,3], '$': [1,4], '%': [1,5],
 '&': [1,6], '\'': [1,7], '(': [1,8],
 ')': [1,9], '*': [1,10], '+': [1,11],
 ',': [1,12], '-': [1,13], '.': [1,14],
 '/': [1,15], '0': [1,16], '1': [1,17],
 '2': [1,18], '3': [1,19], '4': [1,20],
 '5': [1,21], '6': [1,22], '7': [1,23],
 '8': [1,24], '9': [1,25], ':': [1,26],
 ';': [1,27], '<': [1,28], '=': [1,29],
 '>': [1,30], '?': [1,31], '≈': [7,0],        // ≈ = alt+x
 '~': [7,2], '™': [7,4]                       // ™ = alt+'
*/

    }


})