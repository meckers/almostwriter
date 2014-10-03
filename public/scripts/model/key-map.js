define(function() {

    function StrokeInfo(id, offset) {
        return {
            id: id,
            offset: offset
        }
    }

    return {

        '65' : StrokeInfo('A', [0,1]),
        '66' : StrokeInfo('B', [0,2]),
        '67' : StrokeInfo('C', [0,3]),
        '37' : StrokeInfo('ARROW-LEFT'),
        '38' : StrokeInfo('ARROW-UP'),
        '39' : StrokeInfo('ARROW-RIGHT'),
        '40' : StrokeInfo('ARROW-DOWN')

    }


})