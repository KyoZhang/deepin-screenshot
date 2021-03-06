/* calculateRect.js */
/* the response padding of line */
var padding = 8
var minPadding = 10
function square(p) {
    return ((p)*(p))
}
function getDistance(p1, p2) {
    var distance = Math.sqrt(square(p1.x - p2.x) + square(p1.y - p2.y))
    return distance
}
/* limit the canvas painting:
 * when the distance between points(points[0], points[points.length -1])
 * is less than mindistance px
 * draw a little shape with mindistance*mindistance px */
function startDraw(p1, p2, mindistance) {
    var distance = getDistance(p1, p2)
    if (distance > mindistance) {
        return true
    } else {
        return false
    }
}
/* Change the order of the four points to what we want it to be:
 * point1 to the top-left corner
 * point2 to the bottom-left corner
 * point3 to the top-right corner
 * point4 to the bottom-right corner
 * NOTE: this order will change, but not now
 */
function changePointsOrder(point1, point2, point3, point4) {
    var points = [point1, point2, point3, point4]
    for (var i = 0; i < points.length; i++) {
        for (var j = i + 1; j < points.length; j++ ) {
            if (points[i].x > points[j].x) {
                var tmp = points[i].x
                points[i].x = points[j].x
                points[j].x = tmp
                tmp = points[i].y
                points[i].y = points[j].y
                points[j].y = tmp
            } else if(points[i].x == points[j].x) {
                if (points[i].y > points[j].y) {
                tmp = points[i].y
                points[i].y = points[j].y
                points[j].y = tmp
                }
            }
        }
    }
    return points
}
/* judge whether the point1 clicked on the point2 or not */
function pointClickIn(point2, point1, paddingnum) {
    paddingnum = typeof paddingnum !== 'undefined' ? paddingnum : padding
    if (point2.x >= point1.x - paddingnum && point2.x <= point1.x + paddingnum &&
    point2.y >= point1.y - paddingnum && point2.y <= point1.y + paddingnum) {

        return true
    } else {
        return false
    }
}
/* judge whether the point(point3) is on the line segment*/
function pointOnLine(point1, point2, point3) {
    if (point1.x == point2.x) {
        if (point3.x >= point1.x - padding && point3.x <= point1.x + padding &&
        point3.y >= Math.min(point1.y, point2.y) - padding && point3.y <= Math.max(point1.y, point2.y) + padding) {
            return true
        }
    } else {
        var k =  (point2.y - point1.y) / (point2.x - point1.x)
        var b = point1.y - point1.x*k

        if ( point3.x >= Math.min(point1.x, point2.x) -padding && point3.x <= Math.max(point1.x, point2.x + padding)
        && point3.y >= k * point3.x + b - padding && point3.y <= k * point3.x + b + padding) {
            return true
        }
    }
    return false
}
/* the distance from a point(point3) to a line(point1, point2) */
function pointTolineDistance(point1, point2, point3) {
    if (point1.x == point2.x) {
        var distance = Math.abs(point3.x - point1.x)
    } else {
        var k = (point1.y - point2.y) / (point1.x - point2.x)
        var b = point1.y - point1.x*k
        var distance = Math.abs(point3.x * k + b - point3.y) / Math.sqrt(square(k) + 1)
    }

    return distance
}
/* get the point who splid a distance on a line */
function pointSplid(point1, point2, distance) {
    if (point1.x == point2.x) {
        var addx = 0
        var addy = distance
    } else {
        var addx = distance*Math.cos(Math.atan2(Math.abs(point1.y - point2.y), Math.abs(point1.x - point2.x)))
        var addy = distance*Math.sin(Math.atan2(Math.abs(point1.y - point2.y), Math.abs(point1.x - point2.x)))
    }
    var tmp = [addx, addy]
    return tmp
}

function resizePoint(point1, point2, point3, point4, p) {

    if (p.x >= point1.x - 5 && p.x <= point1.x + 5 &&
    p.y >= point1.y - 5 && p.y <= point1.y + 5) {
        return 1
    }
    if (p.x >= point2.x - 5 && p.x <= point2.x + 5 &&
    p.y >= point2.y - 5 && p.y <= point2.y + 5) {
        return 2
    }
    if (p.x >= point3.x - 5 && p.x <= point3.x + 5 &&
    p.y >= point3.y - 5 && p.y <= point3.y + 5) {
        return 3
    }
    if (p.x >= point4.x - 5 && p.x <= point4.x + 5 &&
    p.y >= point4.y - 5 && p.y <= point4.y + 5) {
        return 4
    }
    return 0
}
function resizeAnotherPoint(point5, point6, point7, point8, p) {
    if (p.x >= point5.x - 5 && p.x <= point5.x + 5 &&
    p.y >= point5.y - 5 && p.y <= point5.y + 5) {
        return 5
    }
    if (p.x >= point6.x - 5 && p.x <= point6.x + 5 &&
    p.y >= point6.y - 5 && p.y <= point6.y + 5) {
        return 6
    }
    if (p.x >= point7.x - 5 && p.x <= point7.x + 5 &&
    p.y >= point7.y - 5 && p.y <= point7.y + 5) {
        return 7
    }
    if (p.x >= point8.x - 5 && p.x <= point8.x + 5 &&
    p.y >= point8.y - 5 && p.y <= point8.y + 5) {
        return 8
    }
    return 0
}
/* judge the direction of point3 of line(point1, point2)*/
function pointLineDir(point1, point2, point3) {
    if (point1.x == point2.x) {
        if (point3.x <= point1.x) {
            return - 1
        } else {
            return  1
        }
    } else {
        var k = (point1.y - point2.y) / (point1.x - point2.x)
        var b = point1.y - point1.x*k
        if (point3.y <= point3.x*k + b) {
            return  -1
        } else {
            return  1
        }
    }
}
function reSizePointPosition(point1, point2, point3, point4, p, K, mPadding,isShift) {
    isShift = typeof isShift !== 'undefined' ? isShift : false
    minPadding = mPadding
    var points = [point1, point2, point3, point4]
    if (point1.x - point2.x < 0 && point1.y - point2.y < 0 &&
    point1.x - point3.x < 0 && point1.y - point3.y > 0) {
        switch (K) {
            case 1: { points = point1Resize1(point1, point2, point3, point4, p, isShift); return points;}
            case 2: { points = point2Resize1(point1, point2, point3, point4, p, isShift); return points;}
            case 3: { points = point3Resize1(point1, point2, point3, point4, p, isShift); return points;}
            case 4: { points = point4Resize1(point1, point2, point3, point4, p, isShift); return points;}
            case 5: { points = point5Resize1(point1, point2, point3, point4, p, isShift); return points;}
            case 6: { points = point6Resize1(point1, point2, point3, point4, p, isShift); return points;}
            case 7: { points = point7Resize1(point1, point2, point3, point4, p, isShift); return points;}
            case 8: { points = point8Resize1(point1, point2, point3, point4, p, isShift); return points;}
        }
    }
    if (point1.x - point2.x < 0 && point1.y - point2.y > 0 &&
    point1.x - point3.x > 0 && point1.y - point3.y > 0) {
        switch (K) {
            case 1: { points = point1Resize2(point1, point2, point3, point4, p, isShift); return points;}
            case 2: { points = point2Resize2(point1, point2, point3, point4, p, isShift); return points;}
            case 3: { points = point3Resize2(point1, point2, point3, point4, p, isShift); return points;}
            case 4: { points = point4Resize2(point1, point2, point3, point4, p, isShift); return points;}
            case 5: { points = point5Resize2(point1, point2, point3, point4, p, isShift); return points;}
            case 6: { points = point6Resize2(point1, point2, point3, point4, p, isShift); return points;}
            case 7: { points = point7Resize2(point1, point2, point3, point4, p, isShift); return points;}
            case 8: { points = point8Resize2(point1, point2, point3, point4, p, isShift); return points;}
        }
    }
    if (point1.x - point2.x > 0 && point1.y - point2.y < 0 &&
    point1.x - point3.x < 0 && point1.y - point3.y < 0) {
        switch (K) {
            case 1: { points = point1Resize3(point1, point2, point3, point4, p, isShift); return points;}
            case 2: { points = point2Resize3(point1, point2, point3, point4, p, isShift); return points;}
            case 3: { points = point3Resize3(point1, point2, point3, point4, p, isShift); return points;}
            case 4: { points = point4Resize3(point1, point2, point3, point4, p, isShift); return points;}
            case 5: { points = point5Resize3(point1, point2, point3, point4, p, isShift); return points;}
            case 6: { points = point6Resize3(point1, point2, point3, point4, p, isShift); return points;}
            case 7: { points = point7Resize3(point1, point2, point3, point4, p, isShift); return points;}
            case 8: { points = point8Resize3(point1, point2, point3, point4, p, isShift); return points;}
        }
    }
    if (point1.x - point2.x > 0 && point1.y - point2.y > 0 &&
    point1.x - point3.x > 0 && point1.y - point3.y < 0) {
        switch (K) {
            case 1: { points = point1Resize4(point1, point2, point3, point4, p, isShift); return points;}
            case 2: { points = point2Resize4(point1, point2, point3, point4, p, isShift); return points;}
            case 3: { points = point3Resize4(point1, point2, point3, point4, p, isShift); return points;}
            case 4: { points = point4Resize4(point1, point2, point3, point4, p, isShift); return points;}
            case 5: { points = point5Resize4(point1, point2, point3, point4, p, isShift); return points;}
            case 6: { points = point6Resize4(point1, point2, point3, point4, p, isShift); return points;}
            case 7: { points = point7Resize4(point1, point2, point3, point4, p, isShift); return points;}
            case 8: { points = point8Resize4(point1, point2, point3, point4, p, isShift); return points;}
        }
    }
    if (point1.x == point2.x && point1.y < point2.y &&
    point1.x < point3.x && point1.y == point3.y) {
        switch (K) {
            case 1: { points = point1Resize5(point1, point2, point3, point4, p, isShift); return points;}
            case 2: { points = point2Resize5(point1, point2, point3, point4, p, isShift); return points;}
            case 3: { points = point3Resize5(point1, point2, point3, point4, p, isShift); return points;}
            case 4: { points = point4Resize5(point1, point2, point3, point4, p, isShift); return points;}
            case 5: { points = point5Resize5(point1, point2, point3, point4, p, isShift); return points;}
            case 6: { points = point6Resize5(point1, point2, point3, point4, p, isShift); return points;}
            case 7: { points = point7Resize5(point1, point2, point3, point4, p, isShift); return points;}
            case 8: { points = point8Resize5(point1, point2, point3, point4, p, isShift); return points;}
        }
    }
    if (point1.x < point2.x && point1.y == point2.y &&
    point1.x == point3.x && point1.y < point3.y) {
        switch (K) {
            case 1: { points = point1Resize6(point1, point2, point3, point4, p, isShift); return points;}
            case 2: { points = point2Resize6(point1, point2, point3, point4, p, isShift); return points;}
            case 3: { points = point3Resize6(point1, point2, point3, point4, p, isShift); return points;}
            case 4: { points = point4Resize6(point1, point2, point3, point4, p, isShift); return points;}
            case 5: { points = point5Resize6(point1, point2, point3, point4, p, isShift); return points;}
            case 6: { points = point6Resize6(point1, point2, point3, point4, p, isShift); return points;}
            case 7: { points = point7Resize6(point1, point2, point3, point4, p, isShift); return points;}
            case 8: { points = point8Resize6(point1, point2, point3, point4, p, isShift); return points;}
        }
    }
    if (point1.x < point2.x && point1.y == point2.y &&
    point1.x == point3.x && point1.y > point3.y) {
        switch (K) {
            case 1: { points = point1Resize7(point1, point2, point3, point4, p, isShift); return points;}
            case 2: { points = point2Resize7(point1, point2, point3, point4, p, isShift); return points;}
            case 3: { points = point3Resize7(point1, point2, point3, point4, p, isShift); return points;}
            case 4: { points = point4Resize7(point1, point2, point3, point4, p, isShift); return points;}
            case 5: { points = point5Resize7(point1, point2, point3, point4, p, isShift); return points;}
            case 6: { points = point6Resize7(point1, point2, point3, point4, p, isShift); return points;}
            case 7: { points = point7Resize7(point1, point2, point3, point4, p, isShift); return points;}
            case 8: { points = point8Resize7(point1, point2, point3, point4, p, isShift); return points;}
        }
    }
}
/* first point1 */
/* point1 in the first position */
function point1Resize1(point1, point2, point3, point4, p, isShift) {
    isShift = typeof isShift !== 'undefined' ? isShift : false
    var points = [point1, point2, point3, point4]
    if(Math.atan2((point2.y - point1.y),(point2.x - point1.x)) >= 0.78539 && (p.y + minPadding > point2.y || p.x + minPadding > point3.x || pointLineDir(point3, point4, p) == -1 ||pointLineDir(point2, point4, p) == 1)) {
        return points
    } else if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) < 0.78539 && (p.x + minPadding > point2.x || p.y - minPadding < point3.y|| pointLineDir(point3, point4, p) == -1 ||pointLineDir(point2, point4, p) == 1))    {
        return points
    } else {
        if (pointTolineDistance(point4, point2, p) < minPadding || pointTolineDistance(point3, point4, p) < minPadding) {
            return points
        } else {
            if (!isShift) {
               if (pointLineDir(point1, point3, p) == -1 && pointLineDir(point1, point2, p) == 1) {
                   var distance = pointTolineDistance(point1, point2, p)
                   var add = pointSplid(point2, point4,distance)
                   point2 = Qt.point(point2.x - add[0], point2.y + add[1])
                   distance = pointTolineDistance(point1, point3, p)
                   add = pointSplid(point3, point4, distance)
                   point3 = Qt.point(point3.x - add[0], point3.y - add[1])
                   var points = [p, point2, point3, point4]
                   return points
               }
               if (pointLineDir(point1, point3, p) == -1 && pointLineDir(point1, point2, p) == -1) {
                   var distance = pointTolineDistance(point1, point2, p)
                   var add = pointSplid(point2, point4,distance)
                   point2 = Qt.point(point2.x + add[0], point2.y - add[1])
                   distance = pointTolineDistance(point1, point3, p)
                   add = pointSplid(point3, point4, distance)
                   point3 = Qt.point(point3.x - add[0], point3.y - add[1])
                   var points = [p, point2, point3, point4]
                   return points
               }
               if (pointLineDir(point1, point3, p) == 1 && pointLineDir(point1, point2, p) == -1) {
                   var distance = pointTolineDistance(point1, point2, p)
                   var add = pointSplid(point2, point4,distance)
                   point2 = Qt.point(point2.x + add[0], point2.y - add[1])
                   distance = pointTolineDistance(point1, point3, p)
                   add = pointSplid(point3, point4, distance)
                   point3 = Qt.point(point3.x + add[0], point3.y + add[1])
                   var points = [p, point2, point3, point4]
                   return points
               }
               if (pointLineDir(point1, point3, p) == 1 && pointLineDir(point1, point2, p) == 1) {
                   var distance = pointTolineDistance(point1, point2, p)
                   var add = pointSplid(point2, point4,distance)
                   point2 = Qt.point(point2.x - add[0], point2.y + add[1])
                   distance = pointTolineDistance(point1, point3, p)
                   add = pointSplid(point3, point4, distance)
                   point3 = Qt.point(point3.x + add[0], point3.y + add[1])
                   var points = [p, point2, point3, point4]
                   return points
               }
           } else {
               var distance1 = pointTolineDistance(point1, point2, p)
               var distance2 = pointTolineDistance(point1, point3, p)
               var distance = Math.min(distance1, distance2)
               if (pointLineDir(point1, point3, p) == 1 && pointLineDir(point1, point2, p) == -1) {
                   var add = pointSplid(point2, point4, distance)
                   point2 = Qt.point(point2.x + add[0], point2.y - add[1])
                   add = pointSplid(point3, point4, distance)
                   point3 = Qt.point(point3.x + add[0], point3.y + add[1])
                   point1 = Qt.point(point2.x + point3.x - point4.x, point2.y + point3.y - point4.y)
                   var points = [point1, point2, point3, point4]
                   return points
               } else {
                   var add = pointSplid(point2, point4, distance)
                   point2 = Qt.point(point2.x - add[0], point2.y + add[1])
                   add = pointSplid(point3, point4, distance)
                   point3 = Qt.point(point3.x - add[0], point3.y - add[1])
                   point1 = Qt.point(point2.x + point3.x - point4.x, point2.y + point3.y - point4.y)
                   var points = [point1, point2, point3, point4]
                   return points
               }
           }
        }
    }
    return points
}
/* point1 in the second position */
function point1Resize2(point1, point2, point3, point4, p, isShift) {
    isShift = typeof isShift !== 'undefined' ? isShift : false
    var points = [point1, point2, point3, point4]
    if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) <= -0.78539&&(p.y - minPadding < point2.y ||p.x - minPadding < point3.x || pointLineDir(point3, point4, p) == -1 || pointLineDir(point2, point4, p) == -1)) {
        return points
    } else if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) > -0.78539&&(p.y - minPadding < point3.y ||p.x + minPadding > point2.x|| pointLineDir(point3, point4, p) == -1 || pointLineDir(point2, point4, p) == -1 ))     {
        return points
    }else {
        if (pointTolineDistance(point4, point2, p) < minPadding || pointTolineDistance(point3, point4, p) < minPadding) {
            return points
        } else {
            if (!isShift) {
                if (pointLineDir(point1, point3, p) == 1 && pointLineDir(point1, point2, p) == 1) {
                    var distance = pointTolineDistance(point1, point2, p)
                    var add = pointSplid(point2, point4,distance)
                    point2 = Qt.point(point2.x + add[0], point2.y + add[1])
                    distance = pointTolineDistance(point1, point3, p)
                    add = pointSplid(point3, point4, distance)
                    point3 = Qt.point(point3.x - add[0], point3.y + add[1])
                    var points = [p, point2, point3, point4]
                    return points
                }

                if (pointLineDir(point1, point3, p) == 1 && pointLineDir(point1, point2, p) == -1) {
                    var distance = pointTolineDistance(point1, point2, p)
                    var add = pointSplid(point2, point4,distance)
                    point2 = Qt.point(point2.x - add[0], point2.y - add[1])
                    distance = pointTolineDistance(point1, point3, p)
                    add = pointSplid(point3, point4, distance)
                    point3 = Qt.point(point3.x - add[0], point3.y + add[1])
                    var points = [p, point2, point3, point4]
                    return points
                }

                if (pointLineDir(point1, point3, p) == -1 && pointLineDir(point1, point2, p) == -1) {
                    var distance = pointTolineDistance(point1, point2, p)
                    var add = pointSplid(point2, point4,distance)
                    point2 = Qt.point(point2.x - add[0], point2.y - add[1])
                    distance = pointTolineDistance(point1, point3, p)
                    add = pointSplid(point3, point4, distance)
                    point3 = Qt.point(point3.x + add[0], point3.y - add[1])
                    var points = [p, point2, point3, point4]
                    return points
                }
                if (pointLineDir(point1, point3, p) == -1 && pointLineDir(point1, point2, p) == 1) {
                    var distance = pointTolineDistance(point1, point2, p)
                    var add = pointSplid(point2, point4,distance)
                    point2 = Qt.point(point2.x + add[0], point2.y + add[1])
                    distance = pointTolineDistance(point1, point3, p)
                    add = pointSplid(point3, point4, distance)
                    point3 = Qt.point(point3.x + add[0], point3.y - add[1])
                    var points = [p, point2, point3, point4]
                    return points
                }
            } else {
                var distance1 = pointTolineDistance(point1, point2, p)
                var distance2 = pointTolineDistance(point1, point3, p)
                var distance = Math.min(distance1, distance2)
                if (pointLineDir(point1, point3, p) == -1 && pointLineDir(point1, point2, p) == -1) {
                    var add = pointSplid(point2, point4, distance)
                    point2 = Qt.point(point2.x - add[0], point2.y - add[1])
                    add = pointSplid(point3, point4, distance)
                    point3 = Qt.point(point3.x + add[0], point3.y - add[1])
                    point1 = Qt.point(point2.x + point3.x - point4.x, point2.y + point3.y - point4.y)
                    var points = [point1, point2, point3, point4]
                    return points
                } else {
                    var add = pointSplid(point2, point4, distance)
                    point2 = Qt.point(point2.x + add[0], point2.y + add[1])
                    add = pointSplid(point3, point4, distance)
                    point3 = Qt.point(point3.x - add[0], point3.y + add[1])
                    point1 = Qt.point(point2.x + point3.x - point4.x, point2.y + point3.y - point4.y)
                    var points = [point1, point2, point3, point4]
                    return points
                }
            }
        }
    }
    return points
}
/* point1 in the third position */
function point1Resize3(point1, point2, point3, point4, p, isShift) {
    isShift = typeof isShift !== 'undefined' ? isShift : false
    var points = [point1, point2, point3, point4]
    if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) >= 2.35619&&(p.x - minPadding < point2.x || p.y + minPadding > point3.y || pointLineDir(point3, point4, p) == 1 || pointLineDir(point2, point4, p) == 1)) {
        return points
    } else if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) < 2.35619&&(p.x + minPadding > point3.x || p.y + minPadding > point2.y || pointLineDir(point3, point4, p) == 1 || pointLineDir(point2, point4, p) == 1)) {
        return points
    } else {
        if (pointTolineDistance(point4, point2, p) < minPadding || pointTolineDistance(point3, point4, p) < minPadding) {
            return points
        } else {
            if (!isShift) {
                if (pointLineDir(point1, point3, p) == -1 && pointLineDir(point1, point2, p) == -1) {
                    var distance = pointTolineDistance(point1, point2, p)
                    var add = pointSplid(point2, point4,distance)
                    point2 = Qt.point(point2.x - add[0], point2.y - add[1])
                    distance = pointTolineDistance(point1, point3, p)
                    add = pointSplid(point3, point4, distance)
                    point3 = Qt.point(point3.x + add[0], point3.y - add[1])
                    var points = [p, point2, point3, point4]
                    return points
                }

                if (pointLineDir(point1, point3, p) == -1 && pointLineDir(point1, point2, p) == 1) {
                    var distance = pointTolineDistance(point1, point2, p)
                    var add = pointSplid(point2, point4,distance)
                    point2 = Qt.point(point2.x + add[0], point2.y + add[1])
                    distance = pointTolineDistance(point1, point3, p)
                    add = pointSplid(point3, point4, distance)
                    point3 = Qt.point(point3.x + add[0], point3.y - add[1])
                    var points = [p, point2, point3, point4]
                    return points
                }
                if (pointLineDir(point1, point3, p) == 1 && pointLineDir(point1, point2, p) == 1) {
                    var distance = pointTolineDistance(point1, point2, p)
                    var add = pointSplid(point2, point4,distance)
                    point2 = Qt.point(point2.x + add[0], point2.y + add[1])
                    distance = pointTolineDistance(point1, point3, p)
                    add = pointSplid(point3, point4, distance)
                    point3 = Qt.point(point3.x - add[0], point3.y + add[1])
                    var points = [p, point2, point3, point4]
                    return points
                }
                if (pointLineDir(point1, point3, p) == 1 && pointLineDir(point1, point2, p) == -1) {
                    var distance = pointTolineDistance(point1, point2, p)
                    var add = pointSplid(point2, point4,distance)
                    point2 = Qt.point(point2.x - add[0], point2.y - add[1])
                    distance = pointTolineDistance(point1, point3, p)
                    add = pointSplid(point3, point4, distance)
                    point3 = Qt.point(point3.x - add[0], point3.y + add[1])
                    var points = [p, point2, point3, point4]
                    return points
                }
            } else {
                var distance1 = pointTolineDistance(point1, point2, p)
                var distance2 = pointTolineDistance(point1, point3, p)
                var distance = Math.min(distance1, distance2)
                if (pointLineDir(point1, point3, p) == 1 && pointLineDir(point1, point2, p) == 1) {
                    var add = pointSplid(point2, point4, distance)
                    point2 = Qt.point(point2.x + add[0], point2.y + add[1])
                    add = pointSplid(point3, point4, distance)
                    point3 = Qt.point(point3.x - add[0], point3.y + add[1])
                    point1 = Qt.point(point2.x + point3.x - point4.x, point2.y + point3.y - point4.y)
                    var points = [point1, point2, point3, point4]
                    return points
                } else {
                    var add = pointSplid(point2, point4, distance)
                    point2 = Qt.point(point2.x - add[0], point2.y - add[1])
                    add = pointSplid(point3, point4, distance)
                    point3 = Qt.point(point3.x + add[0], point3.y - add[1])
                    point1 = Qt.point(point2.x + point3.x - point4.x, point2.y + point3.y - point4.y)
                    var points = [point1, point2, point3, point4]
                    return points
                }
            }
        }
    }
    return points
}
/* point1 in the fourth position */
function point1Resize4(point1, point2, point3, point4, p, isShift) {
    isShift = typeof isShift !== 'undefined' ? isShift : false
    var points = [point1, point2, point3, point4]
    if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) >= -2.35619&&(p.y - minPadding < point2.y||p.x - minPadding < point3.x || pointLineDir(point3, point4, p) == 1 || pointLineDir(point2, point4, p) == -1)) {
        return points
    } else if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) < -2.35619&&(p.y + minPadding > point3.y||p.x - minPadding < point2.x || pointLineDir(point3, point4, p) == 1 || pointLineDir(point2, point4, p) == -1)) {
        return points
    } else {
        if (pointTolineDistance(point4, point2, p) < minPadding || pointTolineDistance(point3, point4, p) < minPadding) {
            return points
        } else {
            if (!isShift) {
                if (pointLineDir(point1, point3, p) == 1 && pointLineDir(point1, point2, p) == -1) {
                    var distance = pointTolineDistance(point1, point2, p)
                    var add = pointSplid(point2, point4,distance)
                    point2 = Qt.point(point2.x + add[0], point2.y - add[1])
                    distance = pointTolineDistance(point1, point3, p)
                    add = pointSplid(point3, point4, distance)
                    point3 = Qt.point(point3.x + add[0], point3.y + add[1])
                    var points = [p, point2, point3, point4]
                    return points
                }
                if (pointLineDir(point1, point3, p) == -1 && pointLineDir(point1, point2, p) == -1) {
                    var distance = pointTolineDistance(point1, point2, p)
                    var add = pointSplid(point2, point4,distance)
                    point2 = Qt.point(point2.x + add[0], point2.y - add[1])
                    distance = pointTolineDistance(point1, point3, p)
                    add = pointSplid(point3, point4, distance)
                    point3 = Qt.point(point3.x - add[0], point3.y - add[1])
                    var points = [p, point2, point3, point4]
                    return points
                }
                if (pointLineDir(point1, point3, p) == -1 && pointLineDir(point1, point2, p) == 1) {
                    var distance = pointTolineDistance(point1, point2, p)
                    var add = pointSplid(point2, point4,distance)
                    point2 = Qt.point(point2.x - add[0], point2.y + add[1])
                    distance = pointTolineDistance(point1, point3, p)
                    add = pointSplid(point3, point4, distance)
                    point3 = Qt.point(point3.x - add[0], point3.y - add[1])
                    var points = [p, point2, point3, point4]
                    return points
                }
                if (pointLineDir(point1, point3, p) == 1 && pointLineDir(point1, point2, p) == 1) {
                    var distance = pointTolineDistance(point1, point2, p)
                    var add = pointSplid(point2, point4,distance)
                    point2 = Qt.point(point2.x - add[0], point2.y + add[1])
                    distance = pointTolineDistance(point1, point3, p)
                    add = pointSplid(point3, point4, distance)
                    point3 = Qt.point(point3.x + add[0], point3.y + add[1])
                    var points = [p, point2, point3, point4]
                    return points
                }
            } else {
                var distance1 = pointTolineDistance(point1, point2, p)
                var distance2 = pointTolineDistance(point1, point3, p)
                var distance = Math.min(distance1, distance2)
                if (pointLineDir(point1, point3, p) == -1 && pointLineDir(point1, point2, p) == 1) {
                    var add = pointSplid(point2, point4, distance)
                    point2 = Qt.point(point2.x - add[0], point2.y + add[1])
                    add = pointSplid(point3, point4, distance)
                    point3 = Qt.point(point3.x - add[0], point3.y - add[1])
                    point1 = Qt.point(point2.x + point3.x - point4.x, point2.y + point3.y - point4.y)
                    var points = [point1, point2, point3, point4]
                    return points
                } else {
                    var add = pointSplid(point2, point4, distance)
                    point2 = Qt.point(point2.x + add[0], point2.y - add[1])
                    add = pointSplid(point3, point4, distance)
                    point3 = Qt.point(point3.x + add[0], point3.y + add[1])
                    point1 = Qt.point(point2.x + point3.x - point4.x, point2.y + point3.y - point4.y)
                    var points = [point1, point2, point3, point4]
                    return points
                }
            }
        }
    }
    return points
}
/* point2 */
/* point2 in the first position */
function point2Resize1(point1, point2, point3, point4, p, isShift) {
    isShift = typeof isShift !== 'undefined' ? isShift : false
    var points = [point1, point2, point3, point4]
    if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) >= 0.78539 && (p.x + minPadding > point4.x|| p.y - minPadding < point1.y || pointLineDir(point1, point3, p) == -1 || pointLineDir(point3, point4, p) == -1)) {
        return points
    } else if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) < 0.78539 && (p.x - minPadding < point1.x|| p.y - minPadding < point4.y || pointLineDir(point1, point3, p) == -1 || pointLineDir(point3, point4, p) == -1))     {
        return points
    } else {
        if (pointTolineDistance(point1, point3, p) < minPadding || pointTolineDistance(point3, point4, p) < minPadding) {
            return points
        } else {
            if (!isShift) {
                if (pointLineDir(point1, point2, p) == 1 && pointLineDir(point2, point4, p) == 1) {
                    var distance = pointTolineDistance(point1, point2, p)
                    var add = pointSplid(point1, point3,distance)
                    point1 = Qt.point(point1.x - add[0], point1.y + add[1])
                    distance = pointTolineDistance(point2, point4, p)
                    add = pointSplid(point3, point4, distance)
                    point4 = Qt.point(point4.x + add[0], point4.y + add[1])
                    var points = [point1, p, point3, point4]
                    return points
                }
                if (pointLineDir(point1, point2, p) == 1 && pointLineDir(point2, point4, p) == -1) {
                    var distance = pointTolineDistance(point1, point2, p)
                    var add = pointSplid(point1, point3,distance)
                    point1 = Qt.point(point1.x - add[0], point1.y + add[1])
                    distance = pointTolineDistance(point2, point4, p)
                    add = pointSplid(point3, point4, distance)
                    point4 = Qt.point(point4.x - add[0], point4.y - add[1])
                    var points = [point1, p, point3, point4]
                    return points
                }
                if (pointLineDir(point1, point2, p) == -1 && pointLineDir(point2, point4, p) == -1) {
                    var distance = pointTolineDistance(point1, point2, p)
                    var add = pointSplid(point1, point3,distance)
                    point1 = Qt.point(point1.x + add[0], point1.y - add[1])
                    distance = pointTolineDistance(point2, point4, p)
                    add = pointSplid(point3, point4, distance)
                    point4 = Qt.point(point4.x - add[0], point4.y - add[1])
                    var points = [point1, p, point3, point4]
                    return points
                }
                if (pointLineDir(point1, point2, p) == -1 && pointLineDir(point2, point4, p) == 1) {
                    var distance = pointTolineDistance(point1, point2, p)
                    var add = pointSplid(point1, point3,distance)
                    point1 = Qt.point(point1.x + add[0], point1.y - add[1])
                    distance = pointTolineDistance(point2, point4, p)
                    add = pointSplid(point3, point4, distance)
                    point4 = Qt.point(point4.x + add[0], point4.y + add[1])
                    var points = [point1, p, point3, point4]
                    return points
                }
            } else {
                var distance1 = pointTolineDistance(point1, point2, p)
                var distance2 = pointTolineDistance(point2, point4, p)
                var distance = Math.min(distance1, distance2)
                if (pointLineDir(point1, point2, p) == -1 && pointLineDir(point2, point4, p) == -1) {
                    var add = pointSplid(point1, point3, distance)
                    point1 = Qt.point(point1.x + add[0], point1.y - add[1])
                    add = pointSplid(point3, point4, distance)
                    point4 = Qt.point(point4.x - add[0], point4.y - add[1])
                    point2 = Qt.point(point1.x + point4.x - point3.x, point1.y + point4.y - point3.y)
                    var points = [point1, point2, point3, point4]
                    return points
                } else {
                    var add = pointSplid(point1, point3, distance)
                    point1 = Qt.point(point1.x - add[0], point1.y + add[1])
                    add = pointSplid(point3, point4, distance)
                    point4 = Qt.point(point4.x + add[0], point4.y + add[1])
                    point2 = Qt.point(point1.x + point4.x - point3.x, point1.y + point4.y - point3.y)
                    var points = [point1, point2, point3, point4]
                    return points
                }
            }
        }
    }
    return points
}
/* point2 in the second position */
function point2Resize2(point1, point2, point3, point4, p, isShift) {
    isShift = typeof isShift !== 'undefined' ? isShift : false
    var points = [point1, point2, point3, point4]
    if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) <= -0.78539&&(p.y + minPadding > point1.y || p.x - minPadding < point4.x || pointLineDir(point1, point3, p) == 1 || pointLineDir(point3, point4, p) == -1 )) {
        return points
    } else if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) > -0.78539&&(p.y - minPadding < point4.y || p.x - minPadding < point1.x || pointLineDir(point1, point3, p) == 1 || pointLineDir(point3, point4, p) == -1))     {
        return points
    }else {
        if (pointTolineDistance(point1, point3, p) < minPadding || pointTolineDistance(point3, point4, p) < minPadding) {
            return points
        } else {
            if (!isShift) {
                if (pointLineDir(point2, point4, p) == -1 && pointLineDir(point1, point2, p) == 1) {
                    var distance = pointTolineDistance(point1, point2, p)
                    var add = pointSplid(point1, point3,distance)
                    point1 = Qt.point(point1.x + add[0], point1.y + add[1])
                    distance = pointTolineDistance(point2, point4, p)
                    add = pointSplid(point3, point4, distance)
                    point4 = Qt.point(point4.x + add[0], point4.y - add[1])
                    var points = [point1, p, point3, point4]
                    return points
                }
                if (pointLineDir(point2, point4, p) == 1 && pointLineDir(point1, point2, p) == 1) {
                    var distance = pointTolineDistance(point1, point2, p)
                    var add = pointSplid(point1, point3,distance)
                    point1 = Qt.point(point1.x + add[0], point1.y + add[1])
                    distance = pointTolineDistance(point2, point4, p)
                    add = pointSplid(point3, point4, distance)
                    point4 = Qt.point(point4.x - add[0], point4.y + add[1])
                    var points = [point1, p, point3, point4]
                    return points
                }
                if (pointLineDir(point2, point4, p) == 1 && pointLineDir(point1, point2, p) == -1) {
                    var distance = pointTolineDistance(point1, point2, p)
                    var add = pointSplid(point1, point3,distance)
                    point1 = Qt.point(point1.x - add[0], point1.y - add[1])
                    distance = pointTolineDistance(point2, point4, p)
                    add = pointSplid(point3, point4, distance)
                    point4 = Qt.point(point4.x - add[0], point4.y + add[1])
                    var points = [point1, p, point3, point4]
                    return points
                }
                if (pointLineDir(point2, point4, p) == -1 && pointLineDir(point1, point2, p) == -1) {
                    var distance = pointTolineDistance(point1, point2, p)
                    var add = pointSplid(point1, point3,distance)
                    point1 = Qt.point(point1.x - add[0], point1.y - add[1])
                    distance = pointTolineDistance(point2, point4, p)
                    add = pointSplid(point3, point4, distance)
                    point4 = Qt.point(point4.x + add[0], point4.y - add[1])
                    var points = [point1, p, point3, point4]
                    return points
                }
            } else {
                var distance1 = pointTolineDistance(point1, point2, p)
                var distance2 = pointTolineDistance(point2, point4, p)
                var distance = Math.min(distance1, distance2)
                if (pointLineDir(point1, point2, p) == -1 && pointLineDir(point2, point4, p) == 1) {
                    var add = pointSplid(point1, point3, distance)
                    point1 = Qt.point(point1.x - add[0], point1.y - add[1])
                    add = pointSplid(point3, point4, distance)
                    point4 = Qt.point(point4.x - add[0], point4.y + add[1])
                    point2 = Qt.point(point1.x + point4.x - point3.x, point1.y + point4.y - point3.y)
                    var points = [point1, point2, point3, point4]
                    return points
                } else {
                    var add = pointSplid(point1, point3, distance)
                    point1 = Qt.point(point1.x + add[0], point1.y + add[1])
                    add = pointSplid(point3, point4, distance)
                    point4 = Qt.point(point4.x + add[0], point4.y - add[1])
                    point2 = Qt.point(point1.x + point4.x - point3.x, point1.y + point4.y - point3.y)
                    var points = [point1, point2, point3, point4]
                    return points
                }
            }
        }
    }
    return points
}
/* point2 in the third position */
function point2Resize3(point1, point2, point3, point4, p, isShift) {
    isShift = typeof isShift !== 'undefined' ? isShift : false
    var points = [point1, point2, point3, point4]
    if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) >= 2.35619&&(p.y + minPadding > point4.y || p.x + minPadding > point1.x|| pointLineDir(point1, point3, p) == -1 || pointLineDir(point3, point4, p) == 1)) {
        return points
    } else if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) < 2.35619&&(p.y - minPadding < point1.y || p.x + minPadding > point4.x || pointLineDir(point1, point3, p) == -1 || pointLineDir(point3, point4, p) == 1)) {
        return points
    }else {
        if (pointTolineDistance(point1, point3, p) < minPadding || pointTolineDistance(point3, point4, p) < minPadding) {
            return points
        } else {
            if (!isShift) {
                if (pointLineDir(point2, point4, p) == 1 && pointLineDir(point1, point2, p) == -1) {
                    var distance = pointTolineDistance(point1, point2, p)
                    var add = pointSplid(point1, point3,distance)
                    point1 = Qt.point(point1.x - add[0], point1.y - add[1])
                    distance = pointTolineDistance(point2, point4, p)
                    add = pointSplid(point3, point4, distance)
                    point4 = Qt.point(point4.x - add[0], point4.y + add[1])
                    var points = [point1, p, point3, point4]
                    return points
                }
                if (pointLineDir(point2, point4, p) == -1 && pointLineDir(point1, point2, p) == -1) {
                    var distance = pointTolineDistance(point1, point2, p)
                    var add = pointSplid(point1, point3,distance)
                    point1 = Qt.point(point1.x - add[0], point1.y - add[1])
                    distance = pointTolineDistance(point2, point4, p)
                    add = pointSplid(point3, point4, distance)
                    point4 = Qt.point(point4.x + add[0], point4.y - add[1])
                    var points = [point1, p, point3, point4]
                    return points
                }
                if (pointLineDir(point2, point4, p) == -1 && pointLineDir(point1, point2, p) == 1) {
                    var distance = pointTolineDistance(point1, point2, p)
                    var add = pointSplid(point1, point3,distance)
                    point1 = Qt.point(point1.x + add[0], point1.y + add[1])
                    distance = pointTolineDistance(point2, point4, p)
                    add = pointSplid(point3, point4, distance)
                    point4 = Qt.point(point4.x + add[0], point4.y - add[1])
                    var points = [point1, p, point3, point4]
                    return points
                }
                if (pointLineDir(point2, point4, p) == 1 && pointLineDir(point1, point2, p) == 1) {
                    var distance = pointTolineDistance(point1, point2, p)
                    var add = pointSplid(point1, point3,distance)
                    point1 = Qt.point(point1.x + add[0], point1.y + add[1])
                    distance = pointTolineDistance(point2, point4, p)
                    add = pointSplid(point3, point4, distance)
                    point4 = Qt.point(point4.x - add[0], point4.y + add[1])
                    var points = [point1, p, point3, point4]
                    return points
                }
            } else {
                var distance1 = pointTolineDistance(point1, point2, p)
                var distance2 = pointTolineDistance(point2, point4, p)
                var distance = Math.min(distance1, distance2)
                if (pointLineDir(point1, point2, p) == 1 && pointLineDir(point2, point4, p) == -1) {
                    var add = pointSplid(point1, point3, distance)
                    point1 = Qt.point(point1.x + add[0], point1.y + add[1])
                    add = pointSplid(point3, point4, distance)
                    point4 = Qt.point(point4.x + add[0], point4.y - add[1])
                    point2 = Qt.point(point1.x + point4.x - point3.x, point1.y + point4.y - point3.y)
                    var points = [point1, point2, point3, point4]
                    return points
                } else {
                    var add = pointSplid(point1, point3, distance)
                    point1 = Qt.point(point1.x - add[0], point1.y - add[1])
                    add = pointSplid(point3, point4, distance)
                    point4 = Qt.point(point4.x - add[0], point4.y + add[1])
                    point2 = Qt.point(point1.x + point4.x - point3.x, point1.y + point4.y - point3.y)
                    var points = [point1, point2, point3, point4]
                    return points
                }
            }
        }
    }
    return points
}
/* point2 in the fourth position */
function point2Resize4(point1, point2, point3, point4, p, isShift) {
    isShift = typeof isShift !== 'undefined' ? isShift : false
    var points = [point1, point2, point3, point4]
    if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) >= -2.35619&&(p.y + minPadding > point1.y||p.x - minPadding < point4.x || pointLineDir(point1, point3, p) == 1 || pointLineDir(point3, point4, p) == 1)) {
        return points
    } else if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) < -2.35619&&(p.y + minPadding > point4.y||p.x + minPadding > point1.x || pointLineDir(point1, point3, p) == 1 || pointLineDir(point3, point4, p) == 1)) {
        return points
    }else {
        if (pointTolineDistance(point1, point3, p) < minPadding || pointTolineDistance(point3, point4, p) < minPadding) {
            return points
        } else {
            if (!isShift) {
                if (pointLineDir(point2, point4, p) == 1 && pointLineDir(point1, point2, p) == 1) {
                    var distance = pointTolineDistance(point1, point2, p)
                    var add = pointSplid(point1, point3,distance)
                    point1 = Qt.point(point1.x - add[0], point1.y + add[1])
                    distance = pointTolineDistance(point2, point4, p)
                    add = pointSplid(point3, point4, distance)
                    point4 = Qt.point(point4.x + add[0], point4.y + add[1])
                    var points = [point1, p, point3, point4]
                    return points
                }
                if (pointLineDir(point2, point4, p) == -1 && pointLineDir(point1, point2, p) == 1) {
                    var distance = pointTolineDistance(point1, point2, p)
                    var add = pointSplid(point1, point3,distance)
                    point1 = Qt.point(point1.x - add[0], point1.y + add[1])
                    distance = pointTolineDistance(point2, point4, p)
                    add = pointSplid(point3, point4, distance)
                    point4 = Qt.point(point4.x - add[0], point4.y - add[1])
                    var points = [point1, p, point3, point4]
                    return points
                }
                if (pointLineDir(point2, point4, p) == 1 && pointLineDir(point1, point2, p) == -1) {
                    var distance = pointTolineDistance(point1, point2, p)
                    var add = pointSplid(point1, point3,distance)
                    point1 = Qt.point(point1.x + add[0], point1.y - add[1])
                    distance = pointTolineDistance(point2, point4, p)
                    add = pointSplid(point3, point4, distance)
                    point4 = Qt.point(point4.x + add[0], point4.y + add[1])
                    var points = [point1, p, point3, point4]
                    return points
                }
                if (pointLineDir(point2, point4, p) == -1 && pointLineDir(point1, point2, p) == -1) {
                    var distance = pointTolineDistance(point1, point2, p)
                    var add = pointSplid(point1, point3,distance)
                    point1 = Qt.point(point1.x + add[0], point1.y - add[1])
                    distance = pointTolineDistance(point2, point4, p)
                    add = pointSplid(point3, point4, distance)
                    point4 = Qt.point(point4.x - add[0], point4.y - add[1])
                    var points = [point1, p, point3, point4]
                    return points
                }
            } else {
                var distance1 = pointTolineDistance(point1, point2, p)
                var distance2 = pointTolineDistance(point2, point4, p)
                var distance = Math.min(distance1, distance2)
                if (pointLineDir(point1, point2, p) == 1 && pointLineDir(point2, point4, p) == 1) {
                    var add = pointSplid(point1, point3, distance)
                    point1 = Qt.point(point1.x - add[0], point1.y + add[1])
                    add = pointSplid(point3, point4, distance)
                    point4 = Qt.point(point4.x + add[0], point4.y + add[1])
                    point2 = Qt.point(point1.x + point4.x - point3.x, point1.y + point4.y - point3.y)
                    var points = [point1, point2, point3, point4]
                    return points
                } else {
                    var add = pointSplid(point1, point3, distance)
                    point1 = Qt.point(point1.x + add[0], point1.y - add[1])
                    add = pointSplid(point3, point4, distance)
                    point4 = Qt.point(point4.x - add[0], point4.y - add[1])
                    point2 = Qt.point(point1.x + point4.x - point3.x, point1.y + point4.y - point3.y)
                    var points = [point1, point2, point3, point4]
                    return points
                }
            }
        }
    }
    return points
}
/* point3*/
/* point3 in the first position */
function point3Resize1(point1, point2, point3, point4, p, isShift) {
    isShift = typeof isShift !== 'undefined' ? isShift : false
    var points = [point1, point2, point3, point4]
    if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) >= 0.78539 && (p.x - minPadding < point1.x || p.y + minPadding > point4.y || pointLineDir(point1, point2, p) == 1 || pointLineDir(point2, point4, p) == 1)) {
        return points
    } else if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) < 0.78539 && (p.x + minPadding > point4.x || p.y + minPadding > point1.y || pointLineDir(point1, point2, p) == 1 || pointLineDir(point2, point4, p) == 1))    {
        return points
    } else {
        if (pointTolineDistance(point4, point2, p) < minPadding || pointTolineDistance(point1, point2, p) < minPadding) {
            return points
        } else {
            if (!isShift) {
                if (pointLineDir(point3, point4, p) == -1 && pointLineDir(point1, point3, p) == -1) {
                    var distance = pointTolineDistance(point3, point4, p)
                    var add = pointSplid(point2, point4,distance)
                    point4 = Qt.point(point4.x + add[0], point4.y - add[1])
                    distance = pointTolineDistance(point1, point3, p)
                    add = pointSplid(point1, point2, distance)
                    point1 = Qt.point(point1.x - add[0], point1.y - add[1])
                    var points = [point1, point2, p, point4]
                    return points
                }
                if (pointLineDir(point3, point4, p) == 1 && pointLineDir(point1, point3, p) == -1) {
                    var distance = pointTolineDistance(point3, point4, p)
                    var add = pointSplid(point2, point4,distance)
                    point4 = Qt.point(point4.x - add[0], point4.y + add[1])
                    distance = pointTolineDistance(point1, point3, p)
                    add = pointSplid(point1, point2, distance)
                    point1 = Qt.point(point1.x - add[0], point1.y - add[1])
                    var points = [point1, point2, p, point4]
                    return points
                }
                if (pointLineDir(point3, point4, p) == 1 && pointLineDir(point1, point3, p) == 1) {
                    var distance = pointTolineDistance(point3, point4, p)
                    var add = pointSplid(point2, point4,distance)
                    point4 = Qt.point(point4.x - add[0], point4.y + add[1])
                    distance = pointTolineDistance(point1, point3, p)
                    add = pointSplid(point1, point2, distance)
                    point1 = Qt.point(point1.x + add[0], point1.y + add[1])
                    var points = [point1, point2, p, point4]
                    return points
                }
                if (pointLineDir(point3, point4, p) == -1 && pointLineDir(point1, point3, p) == 1) {
                    var distance = pointTolineDistance(point3, point4, p)
                    var add = pointSplid(point2, point4,distance)
                    point4 = Qt.point(point4.x + add[0], point4.y - add[1])
                    distance = pointTolineDistance(point1, point3, p)
                    add = pointSplid(point1, point2, distance)
                    point1 = Qt.point(point1.x + add[0], point1.y + add[1])
                    var points = [point1, point2, p, point4]
                    return points
                }
            } else {
                var distance1 = pointTolineDistance(point1, point3, p)
                var distance2 = pointTolineDistance(point3, point4, p)
                var distance = Math.min(distance1, distance2)
                if (pointLineDir(point1, point3, p) == 1 && pointLineDir(point3, point4, p) == 1) {
                    var add = pointSplid(point1, point2, distance)
                    point1 = Qt.point(point1.x + add[0], point1.y + add[1])
                    add = pointSplid(point2, point4, distance)
                    point4 = Qt.point(point4.x - add[0], point4.y + add[1])
                    point3 = Qt.point(point1.x + point4.x - point2.x, point1.y + point4.y - point2.y)
                    var points = [point1, point2, point3, point4]
                    return points
                } else {
                    var add = pointSplid(point1, point2, distance)
                    point1 = Qt.point(point1.x - add[0], point1.y - add[1])
                    add = pointSplid(point2, point4, distance)
                    point4 = Qt.point(point4.x + add[0], point4.y - add[1])
                    point3 = Qt.point(point1.x + point4.x - point2.x, point1.y + point4.y - point2.y)
                    var points = [point1, point2, point3, point4]
                    return points
                }
            }
        }
    }
    return points
}
/* point3 in the second position */
function point3Resize2(point1, point2, point3, point4, p, isShift) {
    isShift = typeof isShift !== 'undefined' ? isShift : false
    var points = [point1, point2, point3, point4]
    if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) <= -0.78539&&(p.x + minPadding > point1.x ||p.y - minPadding < point4.y || pointLineDir(point1, point2, p) == 1 || pointLineDir(point2, point4, p) == -1)) {
        return points
    } else if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) > -0.78539&&(p.x + minPadding > point4.x ||p.y + minPadding > point1.y || pointLineDir(point1, point2, p) == 1 || pointLineDir(point2, point4, p) == -1)) {
        return points
    }else {
        if (pointTolineDistance(point4, point2, p) < minPadding || pointTolineDistance(point1, point2, p) < minPadding) {
            return points
        } else {
            if (!isShift) {
                if (pointLineDir(point3, point4, p) == -1 && pointLineDir(point1, point3, p) == 1) {
                    var distance = pointTolineDistance(point3, point4, p)
                    var add = pointSplid(point2, point4,distance)
                    point4 = Qt.point(point4.x - add[0], point4.y - add[1])
                    distance = pointTolineDistance(point1, point3, p)
                    add = pointSplid(point1, point2, distance)
                    point1 = Qt.point(point1.x - add[0], point1.y + add[1])
                    var points = [point1, point2, p, point4]
                    return points
                }
                if (pointLineDir(point3, point4, p) == -1 && pointLineDir(point1, point3, p) == -1)  {
                    var distance = pointTolineDistance(point3, point4, p)
                    var add = pointSplid(point2, point4,distance)
                    point4 = Qt.point(point4.x - add[0], point4.y - add[1])
                    distance = pointTolineDistance(point1, point3, p)
                    add = pointSplid(point1, point2, distance)
                    point1 = Qt.point(point1.x + add[0], point1.y - add[1])
                    var points = [point1, point2, p, point4]
                    return points
                }
                if (pointLineDir(point3, point4, p) == 1 && pointLineDir(point1, point3, p) == -1)  {
                    var distance = pointTolineDistance(point3, point4, p)
                    var add = pointSplid(point2, point4,distance)
                    point4 = Qt.point(point4.x + add[0], point4.y + add[1])
                    distance = pointTolineDistance(point1, point3, p)
                    add = pointSplid(point1, point2, distance)
                    point1 = Qt.point(point1.x + add[0], point1.y - add[1])
                    var points = [point1, point2, p, point4]
                    return points
                }
                if (pointLineDir(point3, point4, p) == 1 && pointLineDir(point1, point3, p) == 1) {
                    var distance = pointTolineDistance(point3, point4, p)
                    var add = pointSplid(point2, point4,distance)
                    point4 = Qt.point(point4.x + add[0], point4.y + add[1])
                    distance = pointTolineDistance(point1, point3, p)
                    add = pointSplid(point1, point2, distance)
                    point1 = Qt.point(point1.x - add[0], point1.y + add[1])
                    var points = [point1, point2, p, point4]
                    return points
                }
            } else {
                var distance1 = pointTolineDistance(point1, point3, p)
                var distance2 = pointTolineDistance(point3, point4, p)
                var distance = Math.min(distance1, distance2)
                if (pointLineDir(point1, point3, p) == -1 && pointLineDir(point3, point4, p) == 1) {
                    var add = pointSplid(point1, point2, distance)
                    point1 = Qt.point(point1.x + add[0], point1.y - add[1])
                    add = pointSplid(point2, point4, distance)
                    point4 = Qt.point(point4.x + add[0], point4.y + add[1])
                    point3 = Qt.point(point1.x + point4.x - point2.x, point1.y + point4.y - point2.y)
                    var points = [point1, point2, point3, point4]
                    return points
                } else {
                    var add = pointSplid(point1, point2, distance)
                    point1 = Qt.point(point1.x - add[0], point1.y + add[1])
                    add = pointSplid(point2, point4, distance)
                    point4 = Qt.point(point4.x - add[0], point4.y - add[1])
                    point3 = Qt.point(point1.x + point4.x - point2.x, point1.y + point4.y - point2.y)
                    var points = [point1, point2, point3, point4]
                    return points
                }
            }
        }
    }
    return points
}
/* point3 in the third position */
function point3Resize3(point1, point2, point3, point4, p, isShift) {
    isShift = typeof isShift !== 'undefined' ? isShift : false
    var points = [point1, point2, point3, point4]
    if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) >= 2.35619&&(p.x - minPadding < point4.x || p.y - minPadding < point1.y || pointLineDir(point1, point2, p) == -1 || pointLineDir(point2, point4, p) == 1)) {
        return points
    } else if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) < 2.35619&&(p.x - minPadding < point1.x || p.y + minPadding > point4.y || pointLineDir(point1, point2, p) == -1 || pointLineDir(point2, point4, p) == 1)) {
        return points
    }else {
        if (pointTolineDistance(point4, point2, p) < minPadding || pointTolineDistance(point1, point2, p) < minPadding) {
            return points
        } else {
            if (!isShift) {
                if (pointLineDir(point3, point4, p) == 1 && pointLineDir(point1, point3, p) == -1) {
                    var distance = pointTolineDistance(point3, point4, p)
                    var add = pointSplid(point2, point4,distance)
                    point4 = Qt.point(point4.x + add[0], point4.y + add[1])
                    distance = pointTolineDistance(point1, point3, p)
                    add = pointSplid(point1, point2, distance)
                    point1 = Qt.point(point1.x + add[0], point1.y - add[1])
                    var points = [point1, point2, p, point4]
                    return points
                }
                if (pointLineDir(point3, point4, p) == -1 && pointLineDir(point1, point3, p) == -1) {
                    var distance = pointTolineDistance(point3, point4, p)
                    var add = pointSplid(point2, point4,distance)
                    point4 = Qt.point(point4.x - add[0], point4.y - add[1])
                    distance = pointTolineDistance(point1, point3, p)
                    add = pointSplid(point1, point2, distance)
                    point1 = Qt.point(point1.x + add[0], point1.y - add[1])
                    var points = [point1, point2, p, point4]
                    return points
                }
                if (pointLineDir(point3, point4, p) == -1 && pointLineDir(point1, point3, p) == 1) {
                    var distance = pointTolineDistance(point3, point4, p)
                    var add = pointSplid(point2, point4,distance)
                    point4 = Qt.point(point4.x - add[0], point4.y - add[1])
                    distance = pointTolineDistance(point1, point3, p)
                    add = pointSplid(point1, point2, distance)
                    point1 = Qt.point(point1.x - add[0], point1.y + add[1])
                    var points = [point1, point2, p, point4]
                    return points
                }
                if (pointLineDir(point3, point4, p) == 1 && pointLineDir(point1, point3, p) == 1) {
                    var distance = pointTolineDistance(point3, point4, p)
                    var add = pointSplid(point2, point4,distance)
                    point4 = Qt.point(point4.x + add[0], point4.y + add[1])
                    distance = pointTolineDistance(point1, point3, p)
                    add = pointSplid(point1, point2, distance)
                    point1 = Qt.point(point1.x - add[0], point1.y + add[1])
                    var points = [point1, point2, p, point4]
                    return points
                }
            } else {
                var distance1 = pointTolineDistance(point1, point3, p)
                var distance2 = pointTolineDistance(point3, point4, p)
                var distance = Math.min(distance1, distance2)
                if (pointLineDir(point1, point3, p) == 1 && pointLineDir(point3, point4, p) == -1) {
                    var add = pointSplid(point1, point2, distance)
                    point1 = Qt.point(point1.x - add[0], point1.y + add[1])
                    add = pointSplid(point2, point4, distance)
                    point4 = Qt.point(point4.x - add[0], point4.y - add[1])
                    point3 = Qt.point(point1.x + point4.x - point2.x, point1.y + point4.y - point2.y)
                    var points = [point1, point2, point3, point4]
                    return points
                } else {
                    var add = pointSplid(point1, point2, distance)
                    point1 = Qt.point(point1.x + add[0], point1.y - add[1])
                    add = pointSplid(point2, point4, distance)
                    point4 = Qt.point(point4.x + add[0], point4.y + add[1])
                    point3 = Qt.point(point1.x + point4.x - point2.x, point1.y + point4.y - point2.y)
                    var points = [point1, point2, point3, point4]
                    return points
                }
            }
        }
    }
    return points
}
/* point3 in the fourth position */
function point3Resize4(point1, point2, point3, point4, p, isShift) {
    isShift = typeof isShift !== 'undefined' ? isShift : false
    var points = [point1, point2, point3, point4]
    if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) >= -2.35619&&(p.y - minPadding < point4.y||p.x + minPadding > point1.x || pointLineDir(point1, point2, p) == -1 || pointLineDir(point2, point4, p) == -1)) {
        return points
    } else if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) < -2.35619&&(p.y - minPadding < point1.y||p.x - minPadding < point4.x || pointLineDir(point1, point2, p) == -1 || pointLineDir(point2, point4, p) == -1)) {
        return points
    }else {
        if (pointTolineDistance(point4, point2, p) < minPadding || pointTolineDistance(point1, point2, p) < minPadding) {
            return points
        } else {
            if (!isShift) {
                if (pointLineDir(point3, point4, p) == 1 && pointLineDir(point1, point3, p) == 1) {
                    var distance = pointTolineDistance(point3, point4, p)
                    var add = pointSplid(point2, point4,distance)
                    point4 = Qt.point(point4.x - add[0], point4.y + add[1])
                    distance = pointTolineDistance(point1, point3, p)
                    add = pointSplid(point1, point2, distance)
                    point1 = Qt.point(point1.x + add[0], point1.y + add[1])
                    var points = [point1, point2, p, point4]
                    return points
                }
                if (pointLineDir(point3, point4, p) == -1 && pointLineDir(point1, point3, p) == 1) {
                    var distance = pointTolineDistance(point3, point4, p)
                    var add = pointSplid(point2, point4,distance)
                    point4 = Qt.point(point4.x + add[0], point4.y - add[1])
                    distance = pointTolineDistance(point1, point3, p)
                    add = pointSplid(point1, point2, distance)
                    point1 = Qt.point(point1.x + add[0], point1.y + add[1])
                    var points = [point1, point2, p, point4]
                    return points
                }
                if (pointLineDir(point3, point4, p) == -1 && pointLineDir(point1, point3, p) == -1) {
                    var distance = pointTolineDistance(point3, point4, p)
                    var add = pointSplid(point2, point4,distance)
                    point4 = Qt.point(point4.x + add[0], point4.y - add[1])
                    distance = pointTolineDistance(point1, point3, p)
                    add = pointSplid(point1, point2, distance)
                    point1 = Qt.point(point1.x - add[0], point1.y - add[1])
                    var points = [point1, point2, p, point4]
                    return points
                }
                if (pointLineDir(point3, point4, p) == 1 && pointLineDir(point1, point3, p) == -1) {
                    var distance = pointTolineDistance(point3, point4, p)
                    var add = pointSplid(point2, point4,distance)
                    point4 = Qt.point(point4.x - add[0], point4.y + add[1])
                    distance = pointTolineDistance(point1, point3, p)
                    add = pointSplid(point1, point2, distance)
                    point1 = Qt.point(point1.x - add[0], point1.y - add[1])
                    var points = [point1, point2, p, point4]
                    return points
                }
            } else {
                var distance1 = pointTolineDistance(point1, point3, p)
                var distance2 = pointTolineDistance(point3, point4, p)
                var distance = Math.min(distance1, distance2)
                if (pointLineDir(point1, point3, p) == -1 && pointLineDir(point3, point4, p) == -1) {
                    var add = pointSplid(point1, point2, distance)
                    point1 = Qt.point(point1.x - add[0], point1.y - add[1])
                    add = pointSplid(point2, point4, distance)
                    point4 = Qt.point(point4.x + add[0], point4.y - add[1])
                    point3 = Qt.point(point1.x + point4.x - point2.x, point1.y + point4.y - point2.y)
                    var points = [point1, point2, point3, point4]
                    return points
                } else {
                    var add = pointSplid(point1, point2, distance)
                    point1 = Qt.point(point1.x + add[0], point1.y + add[1])
                    add = pointSplid(point2, point4, distance)
                    point4 = Qt.point(point4.x - add[0], point4.y + add[1])
                    point3 = Qt.point(point1.x + point4.x - point2.x, point1.y + point4.y - point2.y)
                    var points = [point1, point2, point3, point4]
                    return points
                }
            }
        }
    }
    return points
}
/* point4 */
/* point4 in the first position */
function point4Resize1(point1, point2, point3, point4, p, isShift) {
    isShift = typeof isShift !== 'undefined' ? isShift : false
    var points = [point1, point2, point3, point4]
    if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) >= 0.78539 && (p.x - minPadding < point2.x || p.y -minPadding < point3.y || pointLineDir(point1, point2, p) == 1 || pointLineDir(point1, point3, p) == -1)) {
        return points
    } else if (Math.atan2((point2.y - point1.y),(point2.x - point1.x))<0.78539&&(p.x - minPadding < point3.x || p.y + minPadding >  point2.y || pointLineDir(point1, point2, p) == 1 || pointLineDir(point1, point3, p) == -1)) {
        return points
    } else {
        if (pointTolineDistance(point1, point2, p) < minPadding || pointTolineDistance(point1, point3, p) < minPadding) {
            return points
        } else {
            if (!isShift) {
                if (pointLineDir(point3, point4, p) == -1 && pointLineDir(point2, point4, p) == 1) {
                    var distance = pointTolineDistance(point2, point4, p)
                    var add = pointSplid(point1, point2,distance)
                    point2 = Qt.point(point2.x + add[0], point2.y + add[1])
                    distance = pointTolineDistance(point3, point4, p)
                    add = pointSplid(point1, point3, distance)
                    point3 = Qt.point(point3.x + add[0], point3.y - add[1])
                    var points = [point1, point2, point3, p]
                    return points
                }
                if (pointLineDir(point3, point4, p) == -1 && pointLineDir(point2, point4, p) == -1) {
                    var distance = pointTolineDistance(point2, point4, p)
                    var add = pointSplid(point1, point2,distance)
                    point2 = Qt.point(point2.x - add[0], point2.y - add[1])
                    distance = pointTolineDistance(point3, point4, p)
                    add = pointSplid(point1, point3, distance)
                    point3 = Qt.point(point3.x + add[0], point3.y - add[1])
                    var points = [point1, point2, point3, p]
                    return points
                }
                if (pointLineDir(point3, point4, p) == 1 && pointLineDir(point2, point4, p) == -1) {
                    var distance = pointTolineDistance(point2, point4, p)
                    var add = pointSplid(point1, point2,distance)
                    point2 = Qt.point(point2.x - add[0], point2.y - add[1])
                    distance = pointTolineDistance(point3, point4, p)
                    add = pointSplid(point1, point3, distance)
                    point3 = Qt.point(point3.x - add[0], point3.y + add[1])
                    var points = [point1, point2, point3, p]
                    return points
                }
                if (pointLineDir(point3, point4, p) == 1 && pointLineDir(point2, point4, p) == 1) {
                    var distance = pointTolineDistance(point2, point4, p)
                    var add = pointSplid(point1, point2,distance)
                    point2 = Qt.point(point2.x + add[0], point2.y + add[1])
                    distance = pointTolineDistance(point3, point4, p)
                    add = pointSplid(point1, point3, distance)
                    point3 = Qt.point(point3.x - add[0], point3.y + add[1])
                    var points = [point1, point2, point3, p]
                    return points
                }
            } else {
                var distance1 = pointTolineDistance(point2, point4, p)
                var distance2 = pointTolineDistance(point3, point4, p)
                var distance = Math.min(distance1, distance2)
                if (pointLineDir(point2, point4, p) == 1 && pointLineDir(point3, point4, p) == -1) {
                    var add = pointSplid(point1, point2, distance)
                    point2 = Qt.point(point2.x + add[0], point2.y + add[1])
                    add = pointSplid(point1, point3, distance)
                    point3 = Qt.point(point3.x + add[0], point3.y - add[1])
                    point4 = Qt.point(point2.x + point3.x - point1.x, point2.y + point3.y - point1.y)
                    var points = [point1, point2, point3, point4]
                    return points
                } else {
                    var add = pointSplid(point1, point2, distance)
                    point2 = Qt.point(point2.x - add[0], point2.y - add[1])
                    add = pointSplid(point1, point3, distance)
                    point3 = Qt.point(point3.x - add[0], point3.y + add[1])
                    point4 = Qt.point(point2.x + point3.x - point1.x, point2.y + point3.y - point1.y)
                    var points = [point1, point2, point3, point4]
                    return points
                }
            }
        }
    }
    return points
}
/* point4 in the second position */
function point4Resize2(point1, point2, point3, point4, p, isShift) {
    isShift = typeof isShift !== 'undefined' ? isShift : false
    var points = [point1, point2, point3, point4]
    if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) <= -0.78539&&(p.y + minPadding > point3.y|| p.x + minPadding > point2.x || pointLineDir(point1, point2, p) == 1 || pointLineDir(point1, point3, p) == 1)) {
        return points
    } else if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) > -0.78539&&(p.y + minPadding > point2.y|| p.x - minPadding < point3.x || pointLineDir(point1, point2, p) == 1 || pointLineDir(point1, point3, p) == 1)) {
        return points
    }else {
        if (pointTolineDistance(point1, point2, p) < minPadding || pointTolineDistance(point1, point3, p) < minPadding) {
            return points
        } else {
            if (!isShift) {
                if (pointLineDir(point2, point4, p) == 1 && pointLineDir(point3, point4, p) == 1) {
                    var distance = pointTolineDistance(point2, point4, p)
                    var add = pointSplid(point1, point2,distance)
                    point2 = Qt.point(point2.x - add[0], point2.y + add[1])
                    distance = pointTolineDistance(point3, point4, p)
                    add = pointSplid(point1, point3, distance)
                    point3 = Qt.point(point3.x + add[0], point3.y + add[1])
                    var points = [point1, point2, point3, p]
                    return points
                }
                if (pointLineDir(point2, point4, p) == 1 && pointLineDir(point3, point4, p) == -1) {
                    var distance = pointTolineDistance(point2, point4, p)
                    var add = pointSplid(point1, point2,distance)
                    point2 = Qt.point(point2.x - add[0], point2.y + add[1])
                    distance = pointTolineDistance(point3, point4, p)
                    add = pointSplid(point1, point3, distance)
                    point3 = Qt.point(point3.x - add[0], point3.y - add[1])
                    var points = [point1, point2, point3, p]
                    return points
                }
                if (pointLineDir(point2, point4, p) == -1 && pointLineDir(point3, point4, p) == -1) {
                    var distance = pointTolineDistance(point2, point4, p)
                    var add = pointSplid(point1, point2,distance)
                    point2 = Qt.point(point2.x + add[0], point2.y - add[1])
                    distance = pointTolineDistance(point3, point4, p)
                    add = pointSplid(point1, point3, distance)
                    point3 = Qt.point(point3.x - add[0], point3.y - add[1])
                    var points = [point1, point2, point3, p]
                    return points
                }
                if (pointLineDir(point2, point4, p) == -1 && pointLineDir(point3, point4, p) == 1) {
                    var distance = pointTolineDistance(point2, point4, p)
                    var add = pointSplid(point1, point2,distance)
                    point2 = Qt.point(point2.x + add[0], point2.y - add[1])
                    distance = pointTolineDistance(point3, point4, p)
                    add = pointSplid(point1, point3, distance)
                    point3 = Qt.point(point3.x + add[0], point3.y + add[1])
                    var points = [point1, point2, point3, p]
                    return points
                }
            } else {
                var distance1 = pointTolineDistance(point2, point4, p)
                var distance2 = pointTolineDistance(point3, point4, p)
                var distance = Math.min(distance1, distance2)
                if (pointLineDir(point2, point4, p) == -1 && pointLineDir(point3, point4, p) == -1) {
                    var add = pointSplid(point1, point2, distance)
                    point2 = Qt.point(point2.x + add[0], point2.y - add[1])
                    add = pointSplid(point1, point3, distance)
                    point3 = Qt.point(point3.x - add[0], point3.y - add[1])
                    point4 = Qt.point(point2.x + point3.x - point1.x, point2.y + point3.y - point1.y)
                    var points = [point1, point2, point3, point4]
                    return points
                } else {
                    var add = pointSplid(point1, point2, distance)
                    point2 = Qt.point(point2.x - add[0], point2.y + add[1])
                    add = pointSplid(point1, point3, distance)
                    point3 = Qt.point(point3.x + add[0], point3.y + add[1])
                    point4 = Qt.point(point2.x + point3.x - point1.x, point2.y + point3.y - point1.y)
                    var points = [point1, point2, point3, point4]
                    return points
                }
            }
        }
    }
    return points
}
/* point4 in the third position */
function point4Resize3(point1, point2, point3, point4, p, isShift) {
    isShift = typeof isShift !== 'undefined' ? isShift : false
    var points = [point1, point2, point3, point4]
    if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) >= 2.35619&&(p.y - minPadding < point2.y || p.x + minPadding > point3.x || pointLineDir(point1, point2, p) == -1 || pointLineDir(point1, point3, p) == -1)) {
        return points
    } else if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) < 2.35619&&(p.y - minPadding < point3.y || p.x - minPadding < point2.x || pointLineDir(point1, point2, p) == -1 || pointLineDir(point1, point3, p) == -1)) {
        return points
    }else {
        if (pointTolineDistance(point1, point2, p) < minPadding || pointTolineDistance(point1, point3, p) < minPadding) {
            return points
        } else {
            if (!isShift) {
                if (pointLineDir(point2, point4, p) == 1 && pointLineDir(point3, point4, p) == 1) {
                    var distance = pointTolineDistance(point2, point4, p)
                    var add = pointSplid(point1, point2,distance)
                    point2 = Qt.point(point2.x - add[0], point2.y + add[1])
                    distance = pointTolineDistance(point3, point4, p)
                    add = pointSplid(point1, point3, distance)
                    point3 = Qt.point(point3.x + add[0], point3.y + add[1])
                    var points = [point1, point2, point3, p]
                    return points
                }
                if (pointLineDir(point2, point4, p) == 1 && pointLineDir(point3, point4, p) == -1) {
                    var distance = pointTolineDistance(point2, point4, p)
                    var add = pointSplid(point1, point2,distance)
                    point2 = Qt.point(point2.x - add[0], point2.y + add[1])
                    distance = pointTolineDistance(point3, point4, p)
                    add = pointSplid(point1, point3, distance)
                    point3 = Qt.point(point3.x - add[0], point3.y - add[1])
                    var points = [point1, point2, point3, p]
                    return points
                }
                if (pointLineDir(point2, point4, p) == -1 && pointLineDir(point3, point4, p) == -1) {
                    var distance = pointTolineDistance(point2, point4, p)
                    var add = pointSplid(point1, point2,distance)
                    point2 = Qt.point(point2.x + add[0], point2.y - add[1])
                    distance = pointTolineDistance(point3, point4, p)
                    add = pointSplid(point1, point3, distance)
                    point3 = Qt.point(point3.x - add[0], point3.y - add[1])
                    var points = [point1, point2, point3, p]
                    return points
                }
                if (pointLineDir(point2, point4, p) == -1 && pointLineDir(point3, point4, p) == 1) {
                    var distance = pointTolineDistance(point2, point4, p)
                    var add = pointSplid(point1, point2,distance)
                    point2 = Qt.point(point2.x + add[0], point2.y - add[1])
                    distance = pointTolineDistance(point3, point4, p)
                    add = pointSplid(point1, point3, distance)
                    point3 = Qt.point(point3.x + add[0], point3.y + add[1])
                    var points = [point1, point2, point3, p]
                    return points
                }
            } else {
                var distance1 = pointTolineDistance(point2, point4, p)
                var distance2 = pointTolineDistance(point3, point4, p)
                var distance = Math.min(distance1, distance2)
                if (pointLineDir(point2, point4, p) == 1 && pointLineDir(point3, point4, p) == 1) {
                    var add = pointSplid(point1, point2, distance)
                    point2 = Qt.point(point2.x - add[0], point2.y + add[1])
                    add = pointSplid(point1, point3, distance)
                    point3 = Qt.point(point3.x + add[0], point3.y + add[1])
                    point4 = Qt.point(point2.x + point3.x - point1.x, point2.y + point3.y - point1.y)
                    var points = [point1, point2, point3, point4]
                    return points
                } else {
                    var add = pointSplid(point1, point2, distance)
                    point2 = Qt.point(point2.x + add[0], point2.y - add[1])
                    add = pointSplid(point1, point3, distance)
                    point3 = Qt.point(point3.x - add[0], point3.y - add[1])
                    point4 = Qt.point(point2.x + point3.x - point1.x, point2.y + point3.y - point1.y)
                    var points = [point1, point2, point3, point4]
                    return points
                }
            }
        }
    }
    return points
}
/* point4 in the fourth position */
function point4Resize4(point1, point2, point3, point4, p, isShift) {
    isShift = typeof isShift !== 'undefined' ? isShift : false
    var points = [point1, point2, point3, point4]
    if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) >= -2.35619&&(p.x + minPadding > point2.x || p.y + minPadding > point3.y || pointLineDir(point1, point2, p) == -1 || pointLineDir(point1, point3, p) == 1)) {
        return points
    } else if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) < -2.35619&&(p.x + minPadding > point3.x || p.y - minPadding < point2.y || pointLineDir(point1, point2, p) == -1 || pointLineDir(point1, point3, p) == 1))     {
        return points
    }else {
        if (pointTolineDistance(point1, point2, p) < minPadding || pointTolineDistance(point1, point3, p) < minPadding) {
            return points
        } else {
            if (!isShift) {
                    if (pointLineDir(point2, point4, p) == -1 && pointLineDir(point3, point4, p) == 1) {
                        var distance = pointTolineDistance(point2, point4, p)
                        var add = pointSplid(point1, point2,distance)
                        point2 = Qt.point(point2.x - add[0], point2.y - add[1])
                        distance = pointTolineDistance(point3, point4, p)
                        add = pointSplid(point1, point3, distance)
                        point3 = Qt.point(point3.x - add[0], point3.y + add[1])
                        var points = [point1, point2, point3, p]
                        return points
                    }
                    if (pointLineDir(point2, point4, p) == -1 && pointLineDir(point3, point4, p) == -1) {
                        var distance = pointTolineDistance(point2, point4, p)
                        var add = pointSplid(point1, point2,distance)
                        point2 = Qt.point(point2.x - add[0], point2.y - add[1])
                        distance = pointTolineDistance(point3, point4, p)
                        add = pointSplid(point1, point3, distance)
                        point3 = Qt.point(point3.x + add[0], point3.y - add[1])
                        var points = [point1, point2, point3, p]
                        return points
                    }
                    if (pointLineDir(point2, point4, p) == 1 && pointLineDir(point3, point4, p) == -1) {
                        var distance = pointTolineDistance(point2, point4, p)
                        var add = pointSplid(point1, point2,distance)
                        point2 = Qt.point(point2.x + add[0], point2.y + add[1])
                        distance = pointTolineDistance(point3, point4, p)
                        add = pointSplid(point1, point3, distance)
                        point3 = Qt.point(point3.x + add[0], point3.y - add[1])
                        var points = [point1, point2, point3, p]
                        return points
                    }
                    if (pointLineDir(point2, point4, p) == 1 && pointLineDir(point3, point4, p) == 1) {
                        var distance = pointTolineDistance(point2, point4, p)
                        var add = pointSplid(point1, point2,distance)
                        point2 = Qt.point(point2.x + add[0], point2.y + add[1])
                        distance = pointTolineDistance(point3, point4, p)
                        add = pointSplid(point1, point3, distance)
                        point3 = Qt.point(point3.x - add[0], point3.y + add[1])
                        var points = [point1, point2, point3, p]
                        return points
                    }
            } else {
                var distance1 = pointTolineDistance(point2, point4, p)
                var distance2 = pointTolineDistance(point3, point4, p)
                var distance = Math.min(distance1, distance2)
                if (pointLineDir(point2, point4, p) == -1 && pointLineDir(point3, point4, p) == 1) {
                    var add = pointSplid(point1, point2, distance)
                    point2 = Qt.point(point2.x - add[0], point2.y - add[1])
                    add = pointSplid(point1, point3, distance)
                    point3 = Qt.point(point3.x - add[0], point3.y + add[1])
                    point4 = Qt.point(point2.x + point3.x - point1.x, point2.y + point3.y - point1.y)
                    var points = [point1, point2, point3, point4]
                    return points
                } else {
                    var add = pointSplid(point1, point2, distance)
                    point2 = Qt.point(point2.x + add[0], point2.y + add[1])
                    add = pointSplid(point1, point3, distance)
                    point3 = Qt.point(point3.x + add[0], point3.y - add[1])
                    point4 = Qt.point(point2.x + point3.x - point1.x, point2.y + point3.y - point1.y)
                    var points = [point1, point2, point3, point4]
                    return points
                }
            }
        }
    }
    return points
}

/* Another four point */
/* point5 in the first position*/
function point5Resize1(point1, point2, point3, point4, p, isShift) {
    isShift = typeof isShift !== 'undefined' ? isShift : false
    var points = [point1, point2, point3, point4]
    var point7 = Qt.point((point3.x + point4.x) / 2, (point3.y + point4.y) / 2)
    if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) >= 0.78539 && (p.x + minPadding*2 > point7.x || pointLineDir(point3, point4, p) == -1 ||pointLineDir(point2, point4, p) == 1)) {
        return points
    } else if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) < 0.78539 && p.y - minPadding*2 < point7.y || pointLineDir(point3, point4, p) == -1 ||pointLineDir(point2, point4, p) == 1) {
        return points
    }else {
        if (pointTolineDistance(point3, point4, p) < minPadding) {
            return points
        } else {
            if (!isShift) {
                if (pointLineDir(point1, point2, p) == 1) {
                    var distance = pointTolineDistance(point1, point2, p)
                    var add = pointSplid(point1, point3, distance)
                    point1 = Qt.point(point1.x - add[0], point1.y + add[1])
                    add = pointSplid(point2, point4, distance)
                    point2 = Qt.point(point2.x - add[0], point2.y + add[1])
                    points = [point1, point2, point3, point4]
                    return points
                } else {
                    var distance = pointTolineDistance(point1, point2, p)
                    var add = pointSplid(point1, point3, distance)
                    point1 = Qt.point(point1.x + add[0], point1.y - add[1])
                    add = pointSplid(point2, point4, distance)
                    point2 = Qt.point(point2.x + add[0], point2.y - add[1])
                    points = [point1, point2, point3, point4]
                    return points
                }
            } else {
                var distance = pointTolineDistance(point1, point2, p)
                if (pointLineDir(point1, point2, p) == -1) {
                    var add = pointSplid(point2, point4, distance)
                    point2 = Qt.point(point2.x + add[0], point2.y - add[1])
                    add = pointSplid(point3, point4, distance)
                    point3 = Qt.point(point3.x + add[0], point3.y + add[1])
                    point1 = Qt.point(point2.x + point3.x - point4.x, point2.y + point3.y - point4.y)
                    var points = [point1, point2, point3, point4]
                    return points
                } else {
                    var add = pointSplid(point2, point4, distance)
                    point2 = Qt.point(point2.x - add[0], point2.y + add[1])
                    add = pointSplid(point3, point4, distance)
                    point3 = Qt.point(point3.x - add[0], point3.y - add[1])
                    point1 = Qt.point(point2.x + point3.x - point4.x, point2.y + point3.y - point4.y)
                    var points = [point1, point2, point3, point4]
                    return points
                }
            }
        }
    }
    return points
}
/* point5 in the second position*/
function point5Resize2(point1, point2, point3, point4, p, isShift) {
    isShift = typeof isShift !== 'undefined' ? isShift : false
    var points = [point1, point2, point3, point4]
    var point7 = Qt.point((point3.x + point4.x) / 2, (point3.y + point4.y) / 2)
    if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) <= -0.78539&&(p.x - minPadding*2 < point7.x || pointLineDir(point3, point4, p) == -1 || pointLineDir(point2, point4, p) == -1)) {
        return points
    } else if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) > -0.78539&&(p.y - minPadding*2 < point7.y || pointLineDir(point3, point4, p) == -1 || pointLineDir(point2, point4, p) == -1)) {
        return points
    }else {
        if (pointTolineDistance(point3, point4, p) < minPadding) {
            return points
        } else {
            if (!isShift) {
                if (pointLineDir(point1, point2, p) == 1) {
                    var distance = pointTolineDistance(point1, point2, p)
                    var add = pointSplid(point1, point3, distance)
                    point1 = Qt.point(point1.x + add[0], point1.y + add[1])
                    add = pointSplid(point2, point4, distance)
                    point2 = Qt.point(point2.x + add[0], point2.y + add[1])
                    points = [point1, point2, point3, point4]
                    return points
                } else {
                    var distance = pointTolineDistance(point1, point2, p)
                    var add = pointSplid(point1, point3, distance)
                    point1 = Qt.point(point1.x - add[0], point1.y - add[1])
                    add = pointSplid(point2, point4, distance)
                    point2 = Qt.point(point2.x - add[0], point2.y - add[1])
                    points = [point1, point2, point3, point4]
                    return points
                }
            } else {
                var distance = pointTolineDistance(point1, point2, p)
                if (pointLineDir(point1, point2, p) == -1) {
                    var add = pointSplid(point2, point4, distance)
                    point2 = Qt.point(point2.x - add[0], point2.y - add[1])
                    add = pointSplid(point3, point4, distance)
                    point3 = Qt.point(point3.x + add[0], point3.y - add[1])
                    point1 = Qt.point(point2.x + point3.x - point4.x, point2.y + point3.y - point4.y)
                    var points = [point1, point2, point3, point4]
                    return points
                } else {
                    var add = pointSplid(point2, point4, distance)
                    point2 = Qt.point(point2.x + add[0], point2.y + add[1])
                    add = pointSplid(point3, point4, distance)
                    point3 = Qt.point(point3.x - add[0], point3.y + add[1])
                    point1 = Qt.point(point2.x + point3.x - point4.x, point2.y + point3.y - point4.y)
                    var points = [point1, point2, point3, point4]
                    return points
                }
            }
        }
    }
    return points
}
/* point5 in the third position*/
function point5Resize3(point1, point2, point3, point4, p, isShift) {
    isShift = typeof isShift !== 'undefined' ? isShift : false
    var points = [point1, point2, point3, point4]
    var point7 = Qt.point((point3.x + point4.x) / 2, (point3.y + point4.y) / 2)
    if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) >= 2.35619&&(p.y + minPadding*2 > point7.y || pointLineDir(point3, point4, p) == 1 || pointLineDir(point2, point4, p) == 1)) {
        return points
    } else if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) < 2.35619&&(p.x + minPadding*2 > point7.x || pointLineDir(point3, point4, p) == 1 || pointLineDir(point2, point4, p) == 1)) {
        return points
    }else {
        if (pointTolineDistance(point3, point4, p) < minPadding) {
            return points
        } else {
            if (!isShift) {
                if (pointLineDir(point1, point2, p) == 1) {
                    var distance = pointTolineDistance(point1, point2, p)
                    var add = pointSplid(point1, point3, distance)
                    point1 = Qt.point(point1.x + add[0], point1.y + add[1])
                    add = pointSplid(point2, point4, distance)
                    point2 = Qt.point(point2.x + add[0], point2.y + add[1])
                    points = [point1, point2, point3, point4]
                    return points
                } else {
                    var distance = pointTolineDistance(point1, point2, p)
                    var add = pointSplid(point1, point3, distance)
                    point1 = Qt.point(point1.x - add[0], point1.y - add[1])
                    add = pointSplid(point2, point4, distance)
                    point2 = Qt.point(point2.x - add[0], point2.y - add[1])
                    points = [point1, point2, point3, point4]
                    return points
                }
            } else {
                var distance = pointTolineDistance(point1, point2, p)
                if (pointLineDir(point1, point2, p) == 1) {
                    var add = pointSplid(point2, point4, distance)
                    point2 = Qt.point(point2.x + add[0], point2.y + add[1])
                    add = pointSplid(point3, point4, distance)
                    point3 = Qt.point(point3.x - add[0], point3.y + add[1])
                    point1 = Qt.point(point2.x + point3.x - point4.x, point2.y + point3.y - point4.y)
                    var points = [point1, point2, point3, point4]
                    return points
                } else {
                    var add = pointSplid(point2, point4, distance)
                    point2 = Qt.point(point2.x - add[0], point2.y - add[1])
                    add = pointSplid(point3, point4, distance)
                    point3 = Qt.point(point3.x + add[0], point3.y - add[1])
                    point1 = Qt.point(point2.x + point3.x - point4.x, point2.y + point3.y - point4.y)
                    var points = [point1, point2, point3, point4]
                    return points
                }
            }
        }
    }
    return points
}
/* point5 in the fourth position*/
function point5Resize4(point1, point2, point3, point4, p, isShift) {
    isShift = typeof isShift !== 'undefined' ? isShift : false
    var points = [point1, point2, point3, point4]
    var point7 = Qt.point((point3.x + point4.x) / 2, (point3.y + point4.y) / 2)
    if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) >= -2.35619&&(p.x - minPadding*2 < point7.x || pointLineDir(point3, point4, p) == 1 || pointLineDir(point2, point4, p) == -1)) {
        return points
    } else if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) < -2.35619&&(p.y + minPadding*2 > point7.y || pointLineDir(point3, point4, p) == 1 || pointLineDir(point2, point4, p) == -1)) {
        return points
    } else {
        if (pointTolineDistance(point3, point4, p) < minPadding) {
            return points
        } else {
            if (!isShift) {
                if (pointLineDir(point1, point2, p) == -1) {
                    var distance = pointTolineDistance(point1, point2, p)
                    var add = pointSplid(point1, point3, distance)
                    point1 = Qt.point(point1.x + add[0], point1.y - add[1])
                    add = pointSplid(point2, point4, distance)
                    point2 = Qt.point(point2.x + add[0], point2.y - add[1])
                    points = [point1, point2, point3, point4]
                    return points
                } else {
                    var distance = pointTolineDistance(point1, point2, p)
                    var add = pointSplid(point1, point3, distance)
                    point1 = Qt.point(point1.x - add[0], point1.y + add[1])
                    add = pointSplid(point2, point4, distance)
                    point2 = Qt.point(point2.x - add[0], point2.y + add[1])
                    points = [point1, point2, point3, point4]
                    return points
                }
            } else {
                var distance = pointTolineDistance(point1, point2, p)
                if (pointLineDir(point1, point2, p) == 1) {
                    var add = pointSplid(point2, point4, distance)
                    point2 = Qt.point(point2.x - add[0], point2.y + add[1])
                    add = pointSplid(point3, point4, distance)
                    point3 = Qt.point(point3.x - add[0], point3.y - add[1])
                    point1 = Qt.point(point2.x + point3.x - point4.x, point2.y + point3.y - point4.y)
                    var points = [point1, point2, point3, point4]
                    return points
                } else {
                    var add = pointSplid(point2, point4, distance)
                    point2 = Qt.point(point2.x + add[0], point2.y - add[1])
                    add = pointSplid(point3, point4, distance)
                    point3 = Qt.point(point3.x + add[0], point3.y + add[1])
                    point1 = Qt.point(point2.x + point3.x - point4.x, point2.y + point3.y - point4.y)
                    var points = [point1, point2, point3, point4]
                    return points
                }
            }
        }
    }
    return points
}
function pointMoveMicro(point1, point2, point3, point4, dir, isBig) {
    var points = [point1, point2, point3, point4]
    isBig = typeof isBig !== 'undefined' ? isBig : true
    if (dir == "Left") {
        point1 = Qt.point(point1.x - 1, point1.y)
        point2 = Qt.point(point2.x - 1, point2.y)
        point3 = Qt.point(point3.x - 1, point3.y)
        point4 = Qt.point(point4.x - 1, point4.y)
        points = [point1, point2, point3, point4]
        return points
    }
    if (dir == "Right") {
        point1 = Qt.point(point1.x + 1, point1.y)
        point2 = Qt.point(point2.x + 1, point2.y)
        point3 = Qt.point(point3.x + 1, point3.y)
        point4 = Qt.point(point4.x + 1, point4.y)
        points = [point1, point2, point3, point4]
        return points
    }
    if (dir == "Up") {
        point1 = Qt.point(point1.x, point1.y - 1)
        point2 = Qt.point(point2.x, point2.y - 1)
        point3 = Qt.point(point3.x, point3.y - 1)
        point4 = Qt.point(point4.x, point4.y - 1)
        points = [point1, point2, point3, point4]
        return points
    }
    if (dir == "Down") {
        point1 = Qt.point(point1.x, point1.y + 1)
        point2 = Qt.point(point2.x, point2.y + 1)
        point3 = Qt.point(point3.x, point3.y + 1)
        point4 = Qt.point(point4.x, point4.y + 1)
        points = [point1, point2, point3, point4]
        return points
    }
}
function pointResizeMicro(point1, point2, point3, point4, dir, isBig) {
    var points = [point1, point2, point3, point4]
    isBig = typeof isBig !== 'undefined' ? isBig : true
    if (dir == "Ctrl+Left") { points = point5ResizeMicro(point1, point2, point3, point4, isBig); return points }
    if (dir == "Ctrl+Right") { points = point7ResizeMicro(point1, point2, point3, point4, isBig); return points }
    if (dir == "Ctrl+Up") { points = point6ResizeMicro(point1, point2, point3, point4, isBig); return points }
    if (dir == "Ctrl+Down") { points = point8ResizeMicro(point1, point2, point3, point4, isBig); return points }
}
/* point5 micro adjust the shapes'width, height, x, y */
function point5ResizeMicro(point1, point2, point3, point4, isBig) {
    var points = [point1, point2, point3, point4]
    var distance = 1
    if (isBig) {
        if (point1.x - point2.x <= 0 && point1.y - point2.y <= 0 &&
        point1.x - point3.x <= 0 && point1.y - point3.y >= 0) {
            var add = pointSplid(point1, point3, distance)
            point1 = Qt.point(point1.x - add[0], point1.y + add[1])
            point2 = Qt.point(point2.x - add[0], point2.y + add[1])
            points = [point1, point2, point3, point4]
            return points
        }
        if (point1.x - point2.x < 0 && point1.y - point2.y > 0 &&
        point1.x - point3.x > 0 && point1.y - point3.y > 0) {
            var add = pointSplid(point1, point3, distance)
            point1 = Qt.point(point1.x + add[0], point1.y + add[1])
            point2 = Qt.point(point2.x + add[0], point2.y + add[1])
            points = [point1, point2, point3, point4]
            return points
        }
        if (point1.x - point2.x > 0 && point1.y - point2.y < 0 &&
        point1.x - point3.x < 0 && point1.y - point3.y < 0) {
            var add = pointSplid(point1, point3, distance)
            point1 = Qt.point(point1.x - add[0], point1.y - add[1])
            point2 = Qt.point(point2.x - add[0], point2.y - add[1])
            points = [point1, point2, point3, point4]
            return points
        }
        if (point1.x - point2.x > 0 && point1.y - point2.y > 0 &&
        point1.x - point3.x > 0 && point1.y - point3.y < 0) {
            var add = pointSplid(point1, point3, distance)
            point1 = Qt.point(point1.x + add[0], point1.y - add[1])
            point2 = Qt.point(point2.x + add[0], point2.y - add[1])
            points = [point1, point2, point3, point4]
            return points
        }
    }
}
/* point6 micro adjust the shapes'width, height, x, y */
function point6ResizeMicro(point1, point2, point3, point4, isBig) {
    var points = [point1, point2, point3, point4]
    var distance = 1
    if (isBig) {
        if (point1.x - point2.x <= 0 && point1.y - point2.y <= 0 &&
        point1.x - point3.x <= 0 && point1.y - point3.y >= 0) {
            var add = pointSplid(point1, point2, distance)
            point1 = Qt.point(point1.x - add[0], point1.y - add[1])
            point3 = Qt.point(point3.x - add[0], point3.y - add[1])
            points = [point1, point2, point3, point4]
            return points
        }
        if (point1.x - point2.x < 0 && point1.y - point2.y > 0 &&
        point1.x - point3.x > 0 && point1.y - point3.y > 0) {
            var add = pointSplid(point1, point2, distance)
            point1 = Qt.point(point1.x - add[0], point1.y + add[1])
            point3 = Qt.point(point3.x - add[0], point3.y + add[1])
            points = [point1, point2, point3, point4]
            return points
        }
        if (point1.x - point2.x > 0 && point1.y - point2.y < 0 &&
        point1.x - point3.x < 0 && point1.y - point3.y < 0) {
            var add = pointSplid(point1, point2, distance)
            point1 = Qt.point(point1.x + add[0], point1.y - add[1])
            point3 = Qt.point(point3.x + add[0], point3.y - add[1])
            points = [point1, point2, point3, point4]
            return points
        }
        if (point1.x - point2.x > 0 && point1.y - point2.y > 0 &&
        point1.x - point3.x > 0 && point1.y - point3.y < 0) {
            var add = pointSplid(point1, point2, distance)
            point1 = Qt.point(point1.x + add[0], point1.y + add[1])
            point3 = Qt.point(point3.x + add[0], point3.y + add[1])
            points = [point1, point2, point3, point4]
            return points
        }
    }
}

/* point7 micro adjust the shapes'width, height, x, y */
function point7ResizeMicro(point1, point2, point3, point4, isBig) {
    var points = [point1, point2, point3, point4]
    var distance = 1
    if (isBig) {
        if (point1.x - point2.x <= 0 && point1.y - point2.y <= 0 &&
        point1.x - point3.x <= 0 && point1.y - point3.y >= 0) {
            var add = pointSplid(point1, point3, distance)
            point3 = Qt.point(point3.x + add[0], point3.y - add[1])
            point4 = Qt.point(point4.x + add[0], point4.y - add[1])
            points = [point1, point2, point3, point4]
            return points
        }
        if (point1.x - point2.x < 0 && point1.y - point2.y > 0 &&
        point1.x - point3.x > 0 && point1.y - point3.y > 0) {
            var add = pointSplid(point1, point3, distance)
            point3 = Qt.point(point3.x - add[0], point3.y - add[1])
            point4 = Qt.point(point4.x - add[0], point4.y - add[1])
            points = [point1, point2, point3, point4]
            return points
        }
        if (point1.x - point2.x > 0 && point1.y - point2.y < 0 &&
        point1.x - point3.x < 0 && point1.y - point3.y < 0) {
            var add = pointSplid(point1, point3, distance)
            point3 = Qt.point(point3.x + add[0], point3.y + add[1])
            point4 = Qt.point(point4.x + add[0], point4.y + add[1])
            points = [point1, point2, point3, point4]
            return points
        }
        if (point1.x - point2.x > 0 && point1.y - point2.y > 0 &&
        point1.x - point3.x > 0 && point1.y - point3.y < 0) {
            var add = pointSplid(point1, point3, distance)
            point3 = Qt.point(point3.x - add[0], point3.y + add[1])
            point4 = Qt.point(point4.x - add[0], point4.y + add[1])
            points = [point1, point2, point3, point4]
            return points
        }
    }
}

/* point8 micro adjust the shapes'width, height, x, y */
function point8ResizeMicro(point1, point2, point3, point4, isBig) {
    var points = [point1, point2, point3, point4]
    var distance = 1
    if (isBig) {
        if (point1.x - point2.x <= 0 && point1.y - point2.y <= 0 &&
        point1.x - point3.x <= 0 && point1.y - point3.y >= 0) {
            var add = pointSplid(point1, point2, distance)
            point2 = Qt.point(point2.x + add[0], point2.y + add[1])
            point4 = Qt.point(point4.x + add[0], point4.y + add[1])
            points = [point1, point2, point3, point4]
            return points
        }
        if (point1.x - point2.x < 0 && point1.y - point2.y > 0 &&
        point1.x - point3.x > 0 && point1.y - point3.y > 0) {
            var add = pointSplid(point1, point2, distance)
            point2 = Qt.point(point2.x + add[0], point2.y - add[1])
            point4 = Qt.point(point4.x + add[0], point4.y - add[1])
            points = [point1, point2, point3, point4]
            return points
        }
        if (point1.x - point2.x > 0 && point1.y - point2.y < 0 &&
        point1.x - point3.x < 0 && point1.y - point3.y < 0) {
            var add = pointSplid(point1, point2, distance)
            point2 = Qt.point(point2.x - add[0], point2.y + add[1])
            point4 = Qt.point(point4.x - add[0], point4.y + add[1])
            points = [point1, point2, point3, point4]
            return points
        }
        if (point1.x - point2.x > 0 && point1.y - point2.y > 0 &&
        point1.x - point3.x > 0 && point1.y - point3.y < 0) {
            var add = pointSplid(point1, point2, distance)
            point2 = Qt.point(point2.x - add[0], point2.y - add[1])
            point4 = Qt.point(point4.x - add[0], point4.y - add[1])
            points = [point1, point2, point3, point4]
            return points
        }
    }
}
/* point6 in the first position */
function point6Resize1(point1, point2, point3, point4, p, isShift) {
    isShift = typeof isShift !== 'undefined' ? isShift : false
    var points = [point1, point2, point3, point4]
    var point8 = Qt.point((point2.x + point4.x) / 2, (point2.y + point4.y) / 2)
    if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) >= 0.78539&&p.y + minPadding > point8.y || pointLineDir(point3, point4, p) == -1 ||pointLineDir(point2, point4, p) == 1) {
        return points
    } else if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) < 0.78539&&p.x + minPadding > point8.x || pointLineDir(point3, point4, p) == -1 ||pointLineDir(point2, point4, p) == 1) {
        return points
    }else {
        if (pointTolineDistance(point2, point4, p) < minPadding) {
            return points
        } else {
            if (!isShift) {
                if (p.x >= (point2.x + point4.x) / 2 || p.y >= (point2.y + point4.y) / 2) {
                    return points
                } else {
                    if (pointLineDir(point1, point3, p) == 1) {
                        var distance = pointTolineDistance(point1, point3, p)
                        var add = pointSplid(point1, point2, distance)
                        point1 = Qt.point(point1.x + add[0], point1.y + add[1])
                        add = pointSplid(point3, point4, distance)
                        point3 = Qt.point(point3.x + add[0], point3.y + add[1])
                        points = [point1, point2, point3, point4]
                        return points
                    } else {
                        var distance = pointTolineDistance(point1, point3, p)
                        var add = pointSplid(point1, point2, distance)
                        point1 = Qt.point(point1.x - add[0], point1.y - add[1])
                        add = pointSplid(point3, point4, distance)
                        point3 = Qt.point(point3.x - add[0], point3.y - add[1])
                        points = [point1, point2, point3, point4]
                        return points
                    }
                }
            } else {
                var distance = pointTolineDistance(point1, point3, p)
                if (pointLineDir(point1, point3, p) == 1) {
                    var add = pointSplid(point1, point2, distance)
                    point1 = Qt.point(point1.x + add[0], point1.y + add[1])
                    add = pointSplid(point2, point4, distance)
                    point4 = Qt.point(point4.x - add[0], point4.y + add[1])
                    point3 = Qt.point(point1.x + point4.x - point2.x, point1.y + point4.y - point2.y)
                    var points = [point1, point2, point3, point4]
                    return points
                } else {
                    var add = pointSplid(point1, point2, distance)
                    point1 = Qt.point(point1.x - add[0], point1.y - add[1])
                    add = pointSplid(point2, point4, distance)
                    point4 = Qt.point(point4.x + add[0], point4.y - add[1])
                    point3 = Qt.point(point1.x + point4.x - point2.x, point1.y + point4.y - point2.y)
                    var points = [point1, point2, point3, point4]
                    return points
                }
            }
        }
    }
    return points
}
function point6Resize2(point1, point2, point3, point4, p, isShift) {
    isShift = typeof isShift !== 'undefined' ? isShift : false
    var points = [point1, point2, point3, point4]
    var point8 = Qt.point((point2.x + point4.x) / 2, (point2.y + point4.y) / 2)
    if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) <= -0.78539&&(p.y - minPadding < point8.y || pointLineDir(point3, point4, p) == -1 || pointLineDir(point2, point4, p) == -1)) {
        return points
    } else if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) > -0.78539&&(p.x + minPadding > point8.x || pointLineDir(point3, point4, p) == -1 || pointLineDir(point2, point4, p) == -1)) {
        return points
    } else {
        if (pointTolineDistance(point2, point4, p) < minPadding) {
            return points
        } else {
            if (!isShift) {
                if (pointLineDir(point1, point3, p) == 1) {
                    var distance = pointTolineDistance(point1, point3, p)
                    var add = pointSplid(point1, point2, distance)
                    point1 = Qt.point(point1.x - add[0], point1.y + add[1])
                    add = pointSplid(point3, point4, distance)
                    point3 = Qt.point(point3.x - add[0], point3.y + add[1])
                    points = [point1, point2, point3, point4]
                    return points
                } else {
                    var distance = pointTolineDistance(point1, point3, p)
                    var add = pointSplid(point1, point2, distance)
                    point1 = Qt.point(point1.x + add[0], point1.y - add[1])
                    add = pointSplid(point3, point4, distance)
                    point3 = Qt.point(point3.x + add[0], point3.y - add[1])
                    points = [point1, point2, point3, point4]
                    return points
                }
            } else {
                var distance = pointTolineDistance(point1, point3, p)
                if (pointLineDir(point1, point3, p) == -1) {
                    var add = pointSplid(point1, point2, distance)
                    point1 = Qt.point(point1.x + add[0], point1.y - add[1])
                    add = pointSplid(point2, point4, distance)
                    point4 = Qt.point(point4.x + add[0], point4.y + add[1])
                    point3 = Qt.point(point1.x + point4.x - point2.x, point1.y + point4.y - point2.y)
                    var points = [point1, point2, point3, point4]
                    return points
                } else {
                    var add = pointSplid(point1, point2, distance)
                    point1 = Qt.point(point1.x - add[0], point1.y + add[1])
                    add = pointSplid(point2, point4, distance)
                    point4 = Qt.point(point4.x - add[0], point4.y - add[1])
                    point3 = Qt.point(point1.x + point4.x - point2.x, point1.y + point4.y - point2.y)
                    var points = [point1, point2, point3, point4]
                    return points
                }
            }
        }
    }
    return points
}
function point6Resize3(point1, point2, point3, point4, p, isShift) {
    isShift = typeof isShift !== 'undefined' ? isShift : false
    var points = [point1, point2, point3, point4]
    var point8 = Qt.point((point2.x + point4.x) / 2, (point2.y + point4.y) / 2)
    if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) >= 2.35619&&(p.x - minPadding < point8.x  || pointLineDir(point3, point4, p) == 1 || pointLineDir(point2, point4, p) == 1)) {
        return points
    } else if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) < 2.35619&&(p.y + minPadding > point8.y || pointLineDir(point3, point4, p) == 1 || pointLineDir(point2, point4, p) == 1)) {
        return points
    }else {
        if (pointTolineDistance(point2, point4, p) < minPadding) {
            return points
        } else {
            if (!isShift) {
                if (pointLineDir(point1, point3, p) == -1) {
                    var distance = pointTolineDistance(point1, point3, p)
                    var add = pointSplid(point1, point2, distance)
                    point1 = Qt.point(point1.x + add[0], point1.y - add[1])
                    add = pointSplid(point3, point4, distance)
                    point3 = Qt.point(point3.x + add[0], point3.y - add[1])
                    points = [point1, point2, point3, point4]
                    return points
                } else {
                    var distance = pointTolineDistance(point1, point3, p)
                    var add = pointSplid(point1, point2, distance)
                    point1 = Qt.point(point1.x - add[0], point1.y + add[1])
                    add = pointSplid(point3, point4, distance)
                    point3 = Qt.point(point3.x - add[0], point3.y + add[1])
                    points = [point1, point2, point3, point4]
                   return points
                }
            } else {
                var distance = pointTolineDistance(point1, point3, p)
                if (pointLineDir(point1, point3, p) == 1) {
                    var add = pointSplid(point1, point2, distance)
                    point1 = Qt.point(point1.x - add[0], point1.y + add[1])
                    add = pointSplid(point2, point4, distance)
                    point4 = Qt.point(point4.x - add[0], point4.y - add[1])
                    point3 = Qt.point(point1.x + point4.x - point2.x, point1.y + point4.y - point2.y)
                    var points = [point1, point2, point3, point4]
                    return points
                } else {
                    var add = pointSplid(point1, point2, distance)
                    point1 = Qt.point(point1.x + add[0], point1.y - add[1])
                    add = pointSplid(point2, point4, distance)
                    point4 = Qt.point(point4.x + add[0], point4.y + add[1])
                    point3 = Qt.point(point1.x + point4.x - point2.x, point1.y + point4.y - point2.y)
                    var points = [point1, point2, point3, point4]
                    return points
                }
            }
        }
    }
    return points
}
/* check ?*/
function point6Resize4(point1, point2, point3, point4, p, isShift) {
    isShift = typeof isShift !== 'undefined' ? isShift : false
    var points = [point1, point2, point3, point4]
    var point8 = Qt.point((point2.x + point4.x) / 2, (point2.y + point4.y) / 2)
    if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) >= -2.35619&&(p.y - minPadding < point8.y || pointLineDir(point3, point4, p) == 1 || pointLineDir(point2, point4, p) == -1)) {
        return points
    } else if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) < -2.35619&&(p.x - minPadding < point8.x || pointLineDir(point3, point4, p) == 1 || pointLineDir(point2, point4, p) == -1)) {
        return points
    } else {
        if (pointTolineDistance(point2, point4, p) < minPadding) {
            return points
        } else {
            if (!isShift) {
                if (pointLineDir(point1, point3, p) == -1) {
                    var distance = pointTolineDistance(point1, point3, p)
                    var add = pointSplid(point1, point2, distance)
                    point1 = Qt.point(point1.x - add[0], point1.y - add[1])
                    add = pointSplid(point3, point4, distance)
                    point3 = Qt.point(point3.x - add[0], point3.y - add[1])
                    points = [point1, point2, point3, point4]
                    return points
                } else {
                    var distance = pointTolineDistance(point1, point3, p)
                    var add = pointSplid(point1, point2, distance)
                    point1 = Qt.point(point1.x + add[0], point1.y + add[1])
                    add = pointSplid(point3, point4, distance)
                    point3 = Qt.point(point3.x + add[0], point3.y + add[1])
                    points = [point1, point2, point3, point4]
                    return points
                }
            } else {
                var distance = pointTolineDistance(point1, point3, p)
                if (pointLineDir(point1, point3, p) == -1) {
                    var add = pointSplid(point1, point2, distance)
                    point1 = Qt.point(point1.x - add[0], point1.y - add[1])
                    add = pointSplid(point2, point4, distance)
                    point4 = Qt.point(point4.x + add[0], point4.y - add[1])
                    point3 = Qt.point(point1.x + point4.x - point2.x, point1.y + point4.y - point2.y)
                    var points = [point1, point2, point3, point4]
                    return points
                } else {
                    var add = pointSplid(point1, point2, distance)
                    point1 = Qt.point(point1.x + add[0], point1.y + add[1])
                    add = pointSplid(point2, point4, distance)
                    point4 = Qt.point(point4.x - add[0], point4.y + add[1])
                    point3 = Qt.point(point1.x + point4.x - point2.x, point1.y + point4.y - point2.y)
                    var points = [point1, point2, point3, point4]
                    return points
                }
            }
        }
    }
    return points
}
/* point7 in the first position */
function point7Resize1(point1, point2, point3, point4, p, isShift) {
    isShift = typeof isShift !== 'undefined' ? isShift : false
    var points = [point1, point2, point3, point4]
    var point5 = Qt.point((point2.x + point1.x) / 2, (point2.y + point1.y) / 2)
    if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) >= 0.78539 && p.x - minPadding < point5.x || pointLineDir(point1, point2, p) == 1 || pointLineDir(point2, point4, p) == 1) {
        return points
    } else if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) < 0.78539 && p.y + minPadding > point5.y || pointLineDir(point1, point2, p) == 1 || pointLineDir(point2, point4, p) == 1) {
        return points
    } else {
        if (pointTolineDistance(point2, point1, p) < minPadding) {
            return points
        } else {
            if (!isShift) {
                if (p.x < (point1.x + point2.x) / 2 || p.y > (point1.y + point2.y) / 2) {
                    return points
                } else {
                    if (pointLineDir(point3, point4, p) == -1) {
                        var distance = pointTolineDistance(point3, point4, p)
                        var add = pointSplid(point1, point3, distance)
                        point3 = Qt.point(point3.x + add[0], point3.y - add[1])
                        add = pointSplid(point2, point4, distance)
                        point4 = Qt.point(point4.x + add[0], point4.y - add[1])
                        points = [point1, point2, point3, point4]
                        return points
                    } else {
                        var distance = pointTolineDistance(point3, point4, p)
                        var add = pointSplid(point1, point3, distance)
                        point3 = Qt.point(point3.x - add[0], point3.y + add[1])
                        add = pointSplid(point2, point4, distance)
                        point4 = Qt.point(point4.x - add[0], point4.y + add[1])
                        points = [point1, point2, point3, point4]
                        return points
                    }
                }
            } else {
                var distance = pointTolineDistance(point3, point4, p)
                if (pointLineDir(point3, point4, p) == -1) {
                    var add = pointSplid(point1, point2, distance)
                    point2 = Qt.point(point2.x - add[0], point2.y - add[1])
                    add = pointSplid(point1, point3, distance)
                    point3 = Qt.point(point3.x - add[0], point3.y + add[1])
                    point4 = Qt.point(point2.x + point3.x - point1.x, point2.y + point3.y - point1.y)
                    var points = [point1, point2, point3, point4]
                    return points
                } else {
                    var add = pointSplid(point1, point2, distance)
                    point2 = Qt.point(point2.x + add[0], point2.y + add[1])
                    add = pointSplid(point1, point3, distance)
                    point3 = Qt.point(point3.x + add[0], point3.y - add[1])
                    point4 = Qt.point(point2.x + point3.x - point1.x, point2.y + point3.y - point1.y)
                    var points = [point1, point2, point3, point4]
                    return points
                }
            }
        }
    }
    return points
}
/* point7 in the second position */
function point7Resize2(point1, point2, point3, point4, p, isShift) {
    isShift = typeof isShift !== 'undefined' ? isShift : false
    var points = [point1, point2, point3, point4]
    var point5 = Qt.point((point2.x + point1.x) / 2, (point2.y + point1.y) / 2)
    if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) <= -0.78539&&(p.x + minPadding > point5.x || pointLineDir(point1, point2, p) == 1 || pointLineDir(point2, point4, p) == -1)) {
        return points
    } else if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) > -0.78539&&(p.y + minPadding > point5.y || pointLineDir(point1, point2, p) == 1 || pointLineDir(point2, point4, p) == -1)) {
        return points
    }else {
        if (pointTolineDistance(point2, point1, p) < minPadding) {
            return points
        } else {
            if (!isShift) {
                if (pointLineDir(point3, point4, p) == -1) {
                    var distance = pointTolineDistance(point3, point4, p)
                    var add = pointSplid(point1, point3, distance)
                    point3 = Qt.point(point3.x - add[0], point3.y - add[1])
                    add = pointSplid(point2, point4, distance)
                    point4 = Qt.point(point4.x - add[0], point4.y - add[1])
                    points = [point1, point2, point3, point4]
                    return points
                } else {
                    var distance = pointTolineDistance(point3, point4, p)
                    var add = pointSplid(point1, point3, distance)
                    point3 = Qt.point(point3.x + add[0], point3.y + add[1])
                    add = pointSplid(point2, point4, distance)
                    point4 = Qt.point(point4.x + add[0], point4.y + add[1])
                    points = [point1, point2, point3, point4]
                    return points
                }
            } else {
               var distance = pointTolineDistance(point3, point4, p)
               if (pointLineDir(point3, point4, p) == 1) {
                   var add = pointSplid(point1, point2, distance)
                   point2 = Qt.point(point2.x - add[0], point2.y + add[1])
                   add = pointSplid(point1, point3, distance)
                   point3 = Qt.point(point3.x + add[0], point3.y + add[1])
                   point4 = Qt.point(point2.x + point3.x - point1.x, point2.y + point3.y - point1.y)
                   var points = [point1, point2, point3, point4]
                   return points
               } else {
                   var add = pointSplid(point1, point2, distance)
                   point2 = Qt.point(point2.x + add[0], point2.y - add[1])
                   add = pointSplid(point1, point3, distance)
                   point3 = Qt.point(point3.x - add[0], point3.y - add[1])
                   point4 = Qt.point(point2.x + point3.x - point1.x, point2.y + point3.y - point1.y)
                   var points = [point1, point2, point3, point4]
                   return points
               }
            }
        }
    }
    return points
}
/* point7 in the third position */
function point7Resize3(point1, point2, point3, point4, p, isShift) {
    isShift = typeof isShift !== 'undefined' ? isShift : false
    var points = [point1, point2, point3, point4]
    var point5 = Qt.point((point2.x + point1.x) / 2, (point2.y + point1.y) / 2)
    if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) >= 2.35619&&(p.y - minPadding < point5.y || pointLineDir(point1, point2, p) == 1 || pointLineDir(point2, point4, p) == 1)) {
        return points
    } else if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) < 2.35619&&(p.x - minPadding < point5.x || pointLineDir(point1, point2, p) == 1 || pointLineDir(point2, point4, p) == 1)) {
        return points
    } else {
        if (pointTolineDistance(point2, point1, p) < minPadding) {
            return points
        } else {
            if (!isShift) {
                if (pointLineDir(point3, point4, p) == 1) {
                    var distance = pointTolineDistance(point3, point4, p)
                    var add = pointSplid(point1, point3, distance)
                    point3 = Qt.point(point3.x + add[0], point3.y + add[1])
                    add = pointSplid(point2, point4, distance)
                    point4 = Qt.point(point4.x + add[0], point4.y + add[1])
                    points = [point1, point2, point3, point4]
                    return points
                } else {
                    var distance = pointTolineDistance(point3, point4, p)
                    var add = pointSplid(point1, point3, distance)
                    point3 = Qt.point(point3.x - add[0], point3.y - add[1])
                    add = pointSplid(point2, point4, distance)
                    point4 = Qt.point(point4.x - add[0], point4.y - add[1])
                    points = [point1, point2, point3, point4]
                    return points
                }
            } else {
                var distance = pointTolineDistance(point3, point4, p)
                if (pointLineDir(point3, point4, p) == -1) {
                    var add = pointSplid(point1, point2, distance)
                    point2 = Qt.point(point2.x + add[0], point2.y - add[1])
                    add = pointSplid(point1, point3, distance)
                    point3 = Qt.point(point3.x - add[0], point3.y - add[1])
                    point4 = Qt.point(point2.x + point3.x - point1.x, point2.y + point3.y - point1.y)
                    var points = [point1, point2, point3, point4]
                    return points
                } else {
                    var add = pointSplid(point1, point2, distance)
                    point2 = Qt.point(point2.x - add[0], point2.y + add[1])
                    add = pointSplid(point1, point3, distance)
                    point3 = Qt.point(point3.x + add[0], point3.y + add[1])
                    point4 = Qt.point(point2.x + point3.x - point1.x, point2.y + point3.y - point1.y)
                    var points = [point1, point2, point3, point4]
                    return points
                }
            }
        }
    }
    return points
}
/* point7 in the fourth position */
function point7Resize4(point1, point2, point3, point4, p, isShift) {
    isShift = typeof isShift !== 'undefined' ? isShift : false
    var points = [point1, point2, point3, point4]
    var point5 = Qt.point((point2.x + point1.x) / 2, (point2.y + point1.y) / 2)
    if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) >= -2.35619&&(p.x + minPadding > point5.x || pointLineDir(point1, point2, p) == -1 || pointLineDir(point2, point4, p) == -1)) {
        return points
    } else if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) < -2.35619&&(p.y - minPadding < point5.y || pointLineDir(point1, point2, p) == -1 || pointLineDir(point2, point4, p) == -1)) {
        return points
    } else {
        if (pointTolineDistance(point2, point1, p) < minPadding) {
            return points
        } else {
            if (!isShift) {
                if (pointLineDir(point3, point4, p) == -1) {
                    var distance = pointTolineDistance(point3, point4, p)
                    var add = pointSplid(point1, point3, distance)
                    point3 = Qt.point(point3.x + add[0], point3.y - add[1])
                    add = pointSplid(point2, point4, distance)
                    point4 = Qt.point(point4.x + add[0], point4.y - add[1])
                    points = [point1, point2, point3, point4]
                    return points
                } else {
                    var distance = pointTolineDistance(point3, point4, p)
                    var add = pointSplid(point1, point3, distance)
                    point3 = Qt.point(point3.x - add[0], point3.y + add[1])
                    add = pointSplid(point2, point4, distance)
                    point4 = Qt.point(point4.x - add[0], point4.y + add[1])
                    points = [point1, point2, point3, point4]
                    return points
                }
            } else {
                var distance = pointTolineDistance(point3, point4, p)
                if (pointLineDir(point3, point4, p) == -1) {
                    var add = pointSplid(point1, point2, distance)
                    point2 = Qt.point(point2.x + add[0], point2.y + add[1])
                    add = pointSplid(point1, point3, distance)
                    point3 = Qt.point(point3.x + add[0], point3.y - add[1])
                    point4 = Qt.point(point2.x + point3.x - point1.x, point2.y + point3.y - point1.y)
                    var points = [point1, point2, point3, point4]
                    return points
                } else {
                    var add = pointSplid(point1, point2, distance)
                    point2 = Qt.point(point2.x - add[0], point2.y - add[1])
                    add = pointSplid(point1, point3, distance)
                    point3 = Qt.point(point3.x - add[0], point3.y + add[1])
                    point4 = Qt.point(point2.x + point3.x - point1.x, point2.y + point3.y - point1.y)
                    var points = [point1, point2, point3, point4]
                    return points
                }
            }
        }
    }
    return points
}
/* point8 in the first position */
function point8Resize1(point1, point2, point3, point4, p, isShift) {
    isShift = typeof isShift !== 'undefined' ? isShift : false
    var points = [point1, point2, point3, point4]
    var point6 = Qt.point((point3.x + point1.x) / 2, (point3.y + point1.y) / 2)
    if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) >= 0.78539&&p.y - minPadding < point6.y || pointLineDir(point1, point3, p) == -1 || pointLineDir(point3, point4, p) == -1) {
        return points
    } else if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) < 0.78539&&p.x - minPadding < point6.x || pointLineDir(point1, point3, p) == -1 || pointLineDir(point3, point4, p) == -1) {
        return points
    }else {
        if (pointTolineDistance(point1, point3, p) < minPadding) {
            return points
        } else {
            if (!isShift) {
                if (p.y <= (point1.y + point3.y) / 2) {
                    return points
                } else {
                    if (pointLineDir(point2, point4, p) == 1) {
                        var distance = pointTolineDistance(point2, point4, p)
                        var add = pointSplid(point1, point2, distance)
                        point2 = Qt.point(point2.x + add[0], point2.y + add[1])
                        add = pointSplid(point3, point4, distance)
                        point4 = Qt.point(point4.x + add[0], point4.y + add[1])
                        points = [point1, point2, point3, point4]
                        return points
                    } else {
                        var distance = pointTolineDistance(point2, point4, p)
                        var add = pointSplid(point1, point2, distance)
                        point2 = Qt.point(point2.x - add[0], point2.y - add[1])
                        add = pointSplid(point3, point4, distance)
                        point4 = Qt.point(point4.x - add[0], point4.y - add[1])
                        points = [point1, point2, point3, point4]
                        return points
                    }
                }
            } else {
                var distance = pointTolineDistance(point2, point4, p)
                if (pointLineDir(point2, point4, p) == -1) {
                    var add = pointSplid(point1, point3, distance)
                    point1 = Qt.point(point1.x + add[0], point1.y - add[1])
                    add = pointSplid(point3, point4, distance)
                    point4 = Qt.point(point4.x - add[0], point4.y - add[1])
                    point2 = Qt.point(point1.x + point4.x - point3.x, point1.y + point4.y - point3.y)
                    var points = [point1, point2, point3, point4]
                    return points
                } else {
                    var add = pointSplid(point1, point3, distance)
                    point1 = Qt.point(point1.x - add[0], point1.y + add[1])
                    add = pointSplid(point3, point4, distance)
                    point4 = Qt.point(point4.x + add[0], point4.y + add[1])
                    point2 = Qt.point(point1.x + point4.x - point3.x, point1.y + point4.y - point3.y)
                    var points = [point1, point2, point3, point4]
                    return points
                }
            }
        }
    }
    return points
}
/* point8 in the second position */
function point8Resize2(point1, point2, point3, point4, p, isShift) {
    isShift = typeof isShift !== 'undefined' ? isShift : false
    var points = [point1, point2, point3, point4]
    var point6 = Qt.point((point3.x + point1.x) / 2, (point3.y + point1.y) / 2)
    if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) <= -0.78539&&(p.y + minPadding > point6.y || pointLineDir(point1, point3, p) == 1 || pointLineDir(point3, point4, p) == -1)) {
        return points
    } else if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) > -0.78539&&(p.x - minPadding < point6.x || pointLineDir(point1, point3, p) == 1 || pointLineDir(point3, point4, p) == -1)) {
        return points
    } else {
        if (pointTolineDistance(point1, point3, p) < minPadding) {
            return points
        } else {
            if (!isShift) {
                if (pointLineDir(point2, point4, p) == -1) {
                    var distance = pointTolineDistance(point2, point4, p)
                    var add = pointSplid(point1, point2, distance)
                    point2 = Qt.point(point2.x + add[0], point2.y - add[1])
                    add = pointSplid(point3, point4, distance)
                    point4 = Qt.point(point4.x + add[0], point4.y - add[1])
                    points = [point1, point2, point3, point4]
                    return points
                } else {
                    var distance = pointTolineDistance(point2, point4, p)
                    var add = pointSplid(point1, point2, distance)
                    point2 = Qt.point(point2.x - add[0], point2.y + add[1])
                    add = pointSplid(point3, point4, distance)
                    point4 = Qt.point(point4.x - add[0], point4.y + add[1])
                    points = [point1, point2, point3, point4]
                    return points
                }
           } else {
               var distance = pointTolineDistance(point2, point4, p)
               if (pointLineDir(point2, point4, p) == 1) {
                   var add = pointSplid(point1, point3, distance)
                   point1 = Qt.point(point1.x - add[0], point1.y - add[1])
                   add = pointSplid(point3, point4, distance)
                   point4 = Qt.point(point4.x - add[0], point4.y + add[1])
                   point2 = Qt.point(point1.x + point4.x - point3.x, point1.y + point4.y - point3.y)
                   var points = [point1, point2, point3, point4]
                   return points
               } else {
                   var add = pointSplid(point1, point3, distance)
                   point1 = Qt.point(point1.x + add[0], point1.y + add[1])
                   add = pointSplid(point3, point4, distance)
                   point4 = Qt.point(point4.x + add[0], point4.y - add[1])
                   point2 = Qt.point(point1.x + point4.x - point3.x, point1.y + point4.y - point3.y)
                   var points = [point1, point2, point3, point4]
                   return points
               }
           }
        }
    }
    return points
}
/* point8 in the third position */
function point8Resize3(point1, point2, point3, point4, p, isShift) {
    isShift = typeof isShift !== 'undefined' ? isShift : false
    var points = [point1, point2, point3, point4]
    var point6 = Qt.point((point3.x + point1.x) / 2, (point3.y + point1.y) / 2)
    if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) >= 2.35619&&(p.x + minPadding > point6.x || pointLineDir(point1, point3, p) == -1 || pointLineDir(point3, point4, p) == 1)) {
        return points
    } else if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) < 2.35619&&(p.y - minPadding < point6.y || pointLineDir(point1, point3, p) == -1 || pointLineDir(point3, point4, p) == 1)) {
        return points
    }else {
        if (pointTolineDistance(point1, point3, p) < minPadding) {
            return points
        } else {
            if (!isShift) {
                if (pointLineDir(point2, point4, p) == -1) {
                    var distance = pointTolineDistance(point2, point4, p)
                    var add = pointSplid(point1, point2, distance)
                    point2 = Qt.point(point2.x + add[0], point2.y - add[1])
                    add = pointSplid(point3, point4, distance)
                    point4 = Qt.point(point4.x + add[0], point4.y - add[1])
                    points = [point1, point2, point3, point4]
                    return points
                } else {
                    var distance = pointTolineDistance(point2, point4, p)
                    var add = pointSplid(point1, point2, distance)
                    point2 = Qt.point(point2.x - add[0], point2.y + add[1])
                    add = pointSplid(point3, point4, distance)
                    point4 = Qt.point(point4.x - add[0], point4.y + add[1])
                    points = [point1, point2, point3, point4]
                    return points
                }
            } else {
                var distance = pointTolineDistance(point2, point4, p)
                if (pointLineDir(point2, point4, p) == 1) {
                    var add = pointSplid(point1, point3, distance)
                    point1 = Qt.point(point1.x - add[0], point1.y - add[1])
                    add = pointSplid(point3, point4, distance)
                    point4 = Qt.point(point4.x - add[0], point4.y + add[1])
                    point2 = Qt.point(point1.x + point4.x - point3.x, point1.y + point4.y - point3.y)
                    var points = [point1, point2, point3, point4]
                    return points
                } else {
                    var add = pointSplid(point1, point3, distance)
                    point1 = Qt.point(point1.x + add[0], point1.y + add[1])
                    add = pointSplid(point3, point4, distance)
                    point4 = Qt.point(point4.x + add[0], point4.y - add[1])
                    point2 = Qt.point(point1.x + point4.x - point3.x, point1.y + point4.y - point3.y)
                    var points = [point1, point2, point3, point4]
                    return points
                }
            }
        }
    }
    return points
}
/* point8 in the fourth position */
function point8Resize4(point1, point2, point3, point4, p, isShift) {
    isShift = typeof isShift !== 'undefined' ? isShift : false
    var points = [point1, point2, point3, point4]
    var point6 = Qt.point((point3.x + point1.x) / 2, (point3.y + point1.y) / 2)
    if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) >= -2.35619&&(p.y + minPadding > point6.y || pointLineDir(point1, point3, p) == 1 || pointLineDir(point3, point4, p) == 1)) {
        return points
    } else if (Math.atan2((point2.y - point1.y),(point2.x - point1.x)) < -2.35619&&(p.x + minPadding > point6.x || pointLineDir(point1, point3, p) == 1 || pointLineDir(point3, point4, p) == 1)) {
        return points
    } else {
        if (pointTolineDistance(point1, point3, p) < minPadding) {
            return points
        } else {
            if (!isShift) {
                if (pointLineDir(point2, point4, p) == -1) {
                    var distance = pointTolineDistance(point2, point4, p)
                    var add = pointSplid(point1, point2, distance)
                    point2 = Qt.point(point2.x - add[0], point2.y - add[1])
                    add = pointSplid(point3, point4, distance)
                    point4 = Qt.point(point4.x - add[0], point4.y - add[1])
                    points = [point1, point2, point3, point4]
                    return points
                } else {
                    var distance = pointTolineDistance(point2, point4, p)
                    var add = pointSplid(point1, point2, distance)
                    point2 = Qt.point(point2.x + add[0], point2.y + add[1])
                    add = pointSplid(point3, point4, distance)
                    point4 = Qt.point(point4.x + add[0], point4.y + add[1])
                    points = [point1, point2, point3, point4]
                    return points
                }
            } else {
                var distance = pointTolineDistance(point2, point4, p)
                if (pointLineDir(point2, point4, p) == 1) {
                    var add = pointSplid(point1, point3, distance)
                    point1 = Qt.point(point1.x - add[0], point1.y + add[1])
                    add = pointSplid(point3, point4, distance)
                    point4 = Qt.point(point4.x + add[0], point4.y + add[1])
                    point2 = Qt.point(point1.x + point4.x - point3.x, point1.y + point4.y - point3.y)
                    var points = [point1, point2, point3, point4]
                    return points
                } else {
                    var add = pointSplid(point1, point3, distance)
                    point1 = Qt.point(point1.x + add[0], point1.y - add[1])
                    add = pointSplid(point3, point4, distance)
                    point4 = Qt.point(point4.x - add[0], point4.y - add[1])
                    point2 = Qt.point(point1.x + point4.x - point3.x, point1.y + point4.y - point3.y)
                    var points = [point1, point2, point3, point4]
                    return points
                }
            }
        }
    }
    return points
}
/* special positon in new compute process */
function point1Resize5(point1, point2, point3, point4, p,isShift) {
    isShift = typeof isShift !== 'undefined' ? isShift : false
    var points = [point1, point2, point3, point4]
    if (p.y + minPadding > point2.y || p.x + minPadding > point3.x) {
        return points
    } else {
        if (!isShift) {
            if (pointLineDir(point1, point3, p) == -1 && pointLineDir(point1, point2, p) == -1) {
               var distance = pointTolineDistance(point1, point2, p)
               var add = pointSplid(point2, point4,distance)
               point2 = Qt.point(point2.x - add[0], point2.y + add[1])
               distance = pointTolineDistance(point1, point3, p)
               add = pointSplid(point3, point4, distance)
               point3 = Qt.point(point3.x - add[0], point3.y - add[1])
               var points = [p, point2, point3, point4]
               return points
            }
            if (pointLineDir(point1, point3, p) == -1 && pointLineDir(point1, point2, p) == 1) {
                var distance = pointTolineDistance(point1, point2, p)
                var add = pointSplid(point2, point4,distance)
                point2 = Qt.point(point2.x + add[0], point2.y - add[1])
                distance = pointTolineDistance(point1, point3, p)
                add = pointSplid(point3, point4, distance)
                point3 = Qt.point(point3.x - add[0], point3.y - add[1])
                var points = [p, point2, point3, point4]
                return points
            }
            if (pointLineDir(point1, point3, p) == 1 && pointLineDir(point1, point2, p) == 1) {
                var distance = pointTolineDistance(point1, point2, p)
                var add = pointSplid(point2, point4,distance)
                point2 = Qt.point(point2.x + add[0], point2.y - add[1])
                distance = pointTolineDistance(point1, point3, p)
                add = pointSplid(point3, point4, distance)
                point3 = Qt.point(point3.x + add[0], point3.y + add[1])
                var points = [p, point2, point3, point4]
                return points
            }
            if (pointLineDir(point1, point3, p) == 1 && pointLineDir(point1, point2, p) == -1) {
                var distance = pointTolineDistance(point1, point2, p)
                var add = pointSplid(point2, point4,distance)
                point2 = Qt.point(point2.x - add[0], point2.y + add[1])
                distance = pointTolineDistance(point1, point3, p)
                add = pointSplid(point3, point4, distance)
                point3 = Qt.point(point3.x + add[0], point3.y + add[1])
                var points = [p, point2, point3, point4]
                return points
            }
        } else {
            var distance1 = pointTolineDistance(point1, point2, p)
            var distance2 = pointTolineDistance(point1, point3, p)
            var distance = Math.min(distance1, distance2)
            if (pointLineDir(point1, point3, p) == 1 && pointLineDir(point1, point2, p) == 1) {
                var add = pointSplid(point2, point4, distance)
                point2 = Qt.point(point2.x + add[0], point2.y - add[1])
                add = pointSplid(point3, point4, distance)
                point3 = Qt.point(point3.x + add[0], point3.y + add[1])
                point1 = Qt.point(point2.x + point3.x - point4.x, point2.y + point3.y - point4.y)
                var points = [point1, point2, point3, point4]
                return points
            } else {
                var add = pointSplid(point2, point4, distance)
                point2 = Qt.point(point2.x - add[0], point2.y + add[1])
                add = pointSplid(point3, point4, distance)
                point3 = Qt.point(point3.x - add[0], point3.y - add[1])
                point1 = Qt.point(point2.x + point3.x - point4.x, point2.y + point3.y - point4.y)
                var points = [point1, point2, point3, point4]
                return points
            }
        }
    }
    return points
}
function point2Resize5(point1, point2, point3, point4, p, isShift) {
    isShift = typeof isShift !== 'undefined' ? isShift : false
    var points = [point1, point2, point3, point4]
    if (p.y - minPadding < point1.y || p.x + minPadding > point4.x) {
        return points
    } else {
        if (!isShift) {
            if (pointLineDir(point1, point2, p) == -1 && pointLineDir(point2, point4, p) == 1) {
                var distance = pointTolineDistance(point1, point2, p)
                var add = pointSplid(point1, point3,distance)
                point1 = Qt.point(point1.x - add[0], point1.y + add[1])
                distance = pointTolineDistance(point2, point4, p)
                add = pointSplid(point3, point4, distance)
                point4 = Qt.point(point4.x + add[0], point4.y + add[1])
                var points = [point1, p, point3, point4]
                return points
            }
            if (pointLineDir(point1, point2, p) == -1 && pointLineDir(point2, point4, p) == -1) {
                var distance = pointTolineDistance(point1, point2, p)
                var add = pointSplid(point1, point3,distance)
                point1 = Qt.point(point1.x - add[0], point1.y + add[1])
                distance = pointTolineDistance(point2, point4, p)
                add = pointSplid(point3, point4, distance)
                point4 = Qt.point(point4.x - add[0], point4.y - add[1])
                var points = [point1, p, point3, point4]
                return points
            }
            if (pointLineDir(point1, point2, p) == 1 && pointLineDir(point2, point4, p) == -1) {
                var distance = pointTolineDistance(point1, point2, p)
                var add = pointSplid(point1, point3,distance)
                point1 = Qt.point(point1.x + add[0], point1.y - add[1])
                distance = pointTolineDistance(point2, point4, p)
                add = pointSplid(point3, point4, distance)
                point4 = Qt.point(point4.x - add[0], point4.y - add[1])
                var points = [point1, p, point3, point4]
                return points
            }
            if (pointLineDir(point1, point2, p) == 1 && pointLineDir(point2, point4, p) == 1) {
                var distance = pointTolineDistance(point1, point2, p)
                var add = pointSplid(point1, point3,distance)
                point1 = Qt.point(point1.x + add[0], point1.y - add[1])
                distance = pointTolineDistance(point2, point4, p)
                add = pointSplid(point3, point4, distance)
                point4 = Qt.point(point4.x + add[0], point4.y + add[1])
                var points = [point1, p, point3, point4]
                return points
            }
        } else {
            var distance1 = pointTolineDistance(point1, point2, p)
            var distance2 = pointTolineDistance(point2, point4, p)
            var distance = Math.min(distance1, distance2)
            if (pointLineDir(point1, point2, p) == 1 && pointLineDir(point2, point4, p) == -1) {
                var add = pointSplid(point1, point3, distance)
                point1 = Qt.point(point1.x + add[0], point1.y - add[1])
                add = pointSplid(point3, point4, distance)
                point4 = Qt.point(point4.x - add[0], point4.y - add[1])
                point2 = Qt.point(point1.x + point4.x - point3.x, point1.y + point4.y - point3.y)
                var points = [point1, point2, point3, point4]
                return points
            } else {
                var add = pointSplid(point1, point3, distance)
                point1 = Qt.point(point1.x - add[0], point1.y + add[1])
                add = pointSplid(point3, point4, distance)
                point4 = Qt.point(point4.x + add[0], point4.y + add[1])
                point2 = Qt.point(point1.x + point4.x - point3.x, point1.y + point4.y - point3.y)
                var points = [point1, point2, point3, point4]
                return points
            }
        }
    }
    return points
}
function point3Resize5(point1, point2, point3, point4, p, isShift) {
    isShift = typeof isShift !== 'undefined' ? isShift : false
    var points = [point1, point2, point3, point4]
    if (p.y + minPadding > point4.y || p.x - minPadding < point1.x) {
        return points
    } else {
        if (!isShift) {
            if (pointLineDir(point3, point4, p) == 1 && pointLineDir(point1, point3, p) == -1) {
                var distance = pointTolineDistance(point3, point4, p)
                var add = pointSplid(point2, point4,distance)
                point4 = Qt.point(point4.x + add[0], point4.y - add[1])
                distance = pointTolineDistance(point1, point3, p)
                add = pointSplid(point1, point2, distance)
                point1 = Qt.point(point1.x - add[0], point1.y - add[1])
                var points = [point1, point2, p, point4]
                return points
            }
            if (pointLineDir(point3, point4, p) == -1 && pointLineDir(point1, point3, p) == -1) {
                var distance = pointTolineDistance(point3, point4, p)
                var add = pointSplid(point2, point4,distance)
                point4 = Qt.point(point4.x - add[0], point4.y + add[1])
                distance = pointTolineDistance(point1, point3, p)
                add = pointSplid(point1, point2, distance)
                point1 = Qt.point(point1.x - add[0], point1.y - add[1])
                var points = [point1, point2, p, point4]
                return points
            }
            if (pointLineDir(point3, point4, p) == -1 && pointLineDir(point1, point3, p) == 1) {
                var distance = pointTolineDistance(point3, point4, p)
                var add = pointSplid(point2, point4,distance)
                point4 = Qt.point(point4.x - add[0], point4.y + add[1])
                distance = pointTolineDistance(point1, point3, p)
                add = pointSplid(point1, point2, distance)
                point1 = Qt.point(point1.x + add[0], point1.y + add[1])
                var points = [point1, point2, p, point4]
                return points
            }
            if (pointLineDir(point3, point4, p) == 1 && pointLineDir(point1, point3, p) == 1) {
                var distance = pointTolineDistance(point3, point4, p)
                var add = pointSplid(point2, point4,distance)
                point4 = Qt.point(point4.x + add[0], point4.y - add[1])
                distance = pointTolineDistance(point1, point3, p)
                add = pointSplid(point1, point2, distance)
                point1 = Qt.point(point1.x + add[0], point1.y + add[1])
                var points = [point1, point2, p, point4]
                return points
            }
        } else {
            var distance1 = pointTolineDistance(point1, point3, p)
            var distance2 = pointTolineDistance(point3, point4, p)
            var distance = Math.min(distance1, distance2)
            if (pointLineDir(point1, point3, p) == 1 && pointLineDir(point3, point4, p) == -1) {
                var add = pointSplid(point1, point2, distance)
                point1 = Qt.point(point1.x - add[0], point1.y + add[1])
                add = pointSplid(point2, point4, distance)
                point4 = Qt.point(point4.x - add[0], point4.y - add[1])
                point3 = Qt.point(point1.x + point4.x - point2.x, point1.y + point4.y - point2.y)
                var points = [point1, point2, point3, point4]
                return points
            } else {
                var add = pointSplid(point1, point2, distance)
                point1 = Qt.point(point1.x + add[0], point1.y - add[1])
                add = pointSplid(point2, point4, distance)
                point4 = Qt.point(point4.x + add[0], point4.y + add[1])
                point3 = Qt.point(point1.x + point4.x - point2.x, point1.y + point4.y - point2.y)
                var points = [point1, point2, point3, point4]
                return points
            }
        }
    }
    return points
}
function point4Resize5(point1, point2, point3, point4, p, isShift) {
    var points = [point1, point2, point3, point4]
    if (p.y - minPadding < point3.y || p.x - minPadding < point2.x) {
        return points
    } else {
        if (!isShift) {
            if (pointLineDir(point3, point4, p) == 1 && pointLineDir(point2, point4, p) == 1) {
                var distance = pointTolineDistance(point2, point4, p)
                var add = pointSplid(point1, point2,distance)
                point2 = Qt.point(point2.x + add[0], point2.y + add[1])
                distance = pointTolineDistance(point3, point4, p)
                add = pointSplid(point1, point3, distance)
                point3 = Qt.point(point3.x + add[0], point3.y - add[1])
                var points = [point1, point2, point3, p]
                return points
            }
            if (pointLineDir(point3, point4, p) == -1 && pointLineDir(point2, point4, p) == 1) {
                var distance = pointTolineDistance(point2, point4, p)
                var add = pointSplid(point1, point2,distance)
                point2 = Qt.point(point2.x + add[0], point2.y + add[1])
                distance = pointTolineDistance(point3, point4, p)
                add = pointSplid(point1, point3, distance)
                point3 = Qt.point(point3.x - add[0], point3.y + add[1])
                var points = [point1, point2, point3, p]
                return points
            }
            if (pointLineDir(point3, point4, p) == -1 && pointLineDir(point2, point4, p) == -1) {
                var distance = pointTolineDistance(point2, point4, p)
                var add = pointSplid(point1, point2,distance)
                point2 = Qt.point(point2.x - add[0], point2.y - add[1])
                distance = pointTolineDistance(point3, point4, p)
                add = pointSplid(point1, point3, distance)
                point3 = Qt.point(point3.x - add[0], point3.y + add[1])
                var points = [point1, point2, point3, p]
                return points
            }
            if (pointLineDir(point3, point4, p) == 1 && pointLineDir(point2, point4, p) == -1) {
                var distance = pointTolineDistance(point2, point4, p)
                var add = pointSplid(point1, point2,distance)
                point2 = Qt.point(point2.x - add[0], point2.y - add[1])
                distance = pointTolineDistance(point3, point4, p)
                add = pointSplid(point1, point3, distance)
                point3 = Qt.point(point3.x + add[0], point3.y - add[1])
                var points = [point1, point2, point3, p]
                return points
            }
        } else {
            var distance1 = pointTolineDistance(point2, point4, p)
            var distance2 = pointTolineDistance(point3, point4, p)
            var distance = Math.min(distance1, distance2)
            if (pointLineDir(point2, point4, p) == -1 && pointLineDir(point3, point4, p) == -1) {
                var add = pointSplid(point1, point2, distance)
                point2 = Qt.point(point2.x - add[0], point2.y - add[1])
                add = pointSplid(point1, point3, distance)
                point3 = Qt.point(point3.x - add[0], point3.y + add[1])
                point4 = Qt.point(point2.x + point3.x - point1.x, point2.y + point3.y - point1.y)
                var points = [point1, point2, point3, point4]
                return points
            } else {
                var add = pointSplid(point1, point2, distance)
                point2 = Qt.point(point2.x + add[0], point2.y + add[1])
                add = pointSplid(point1, point3, distance)
                point3 = Qt.point(point3.x + add[0], point3.y - add[1])
                point4 = Qt.point(point2.x + point3.x - point1.x, point2.y + point3.y - point1.y)
                var points = [point1, point2, point3, point4]
                return points
            }
        }
    }
    return points
}
function point5Resize5(point1, point2, point3, point4, p, isShift) {
    var points = [point1, point2, point3, point4]
    var point7 = Qt.point((point3.x + point4.x) / 2, (point3.y + point4.y) / 2)
    if (p.x + minPadding > point7.x) {
        return points
    } else {
        if (!isShift) {
            if (pointLineDir(point1, point2, p) == -1) {
                var distance = pointTolineDistance(point1, point2, p)
                var add = pointSplid(point1, point3, distance)
                point1 = Qt.point(point1.x - add[0], point1.y + add[1])
                add = pointSplid(point2, point4, distance)
                point2 = Qt.point(point2.x - add[0], point2.y + add[1])
                points = [point1, point2, point3, point4]
                return points
            } else {
                var distance = pointTolineDistance(point1, point2, p)
                var add = pointSplid(point1, point3, distance)
                point1 = Qt.point(point1.x + add[0], point1.y - add[1])
                add = pointSplid(point2, point4, distance)
                point2 = Qt.point(point2.x + add[0], point2.y - add[1])
                points = [point1, point2, point3, point4]
                return points
            }
        } else {
            var distance = pointTolineDistance(point1, point2, p)
            if (pointLineDir(point1, point2, p) == 1) {
                var add = pointSplid(point2, point4, distance)
                point2 = Qt.point(point2.x + add[0], point2.y - add[1])
                add = pointSplid(point3, point4, distance)
                point3 = Qt.point(point3.x + add[0], point3.y + add[1])
                point1 = Qt.point(point2.x + point3.x - point4.x, point2.y + point3.y - point4.y)
                var points = [point1, point2, point3, point4]
                return points
            } else {
                var add = pointSplid(point2, point4, distance)
                point2 = Qt.point(point2.x - add[0], point2.y + add[1])
                add = pointSplid(point3, point4, distance)
                point3 = Qt.point(point3.x - add[0], point3.y - add[1])
                point1 = Qt.point(point2.x + point3.x - point4.x, point2.y + point3.y - point4.y)
                var points = [point1, point2, point3, point4]
                return points
            }
        }
    }
    return points
}
function point6Resize5(point1, point2, point3, point4, p, isShift) {
    var points = [point1, point2, point3, point4]
    var point8 = Qt.point((point2.x + point4.x) / 2, (point2.y + point4.y) / 2)
    if (p.y + minPadding > point8.y) {
        return points
    } else {
        if (!isShift) {
            if (pointLineDir(point1, point3, p) == -1) {
                var distance = pointTolineDistance(point1, point3, p)
                var add = pointSplid(point1, point2, distance)
                point1 = Qt.point(point1.x - add[0], point1.y - add[1])
                add = pointSplid(point3, point4, distance)
                point3 = Qt.point(point3.x - add[0], point3.y - add[1])
                points = [point1, point2, point3, point4]
                return points
            } else {
                var distance = pointTolineDistance(point1, point3, p)
                var add = pointSplid(point1, point2, distance)
                point1 = Qt.point(point1.x + add[0], point1.y + add[1])
                add = pointSplid(point3, point4, distance)
                point3 = Qt.point(point3.x + add[0], point3.y + add[1])
                points = [point1, point2, point3, point4]
                return points
            }
        } else {
            var distance = pointTolineDistance(point1, point3, p)
            if (pointLineDir(point1, point3, p) == 1) {
                var add = pointSplid(point1, point2, distance)
                point1 = Qt.point(point1.x + add[0], point1.y + add[1])
                add = pointSplid(point2, point4, distance)
                point4 = Qt.point(point4.x - add[0], point4.y + add[1])
                point3 = Qt.point(point1.x + point4.x - point2.x, point1.y + point4.y - point2.y)
                var points = [point1, point2, point3, point4]
                return points
            } else {
                var add = pointSplid(point1, point2, distance)
                point1 = Qt.point(point1.x - add[0], point1.y - add[1])
                add = pointSplid(point2, point4, distance)
                point4 = Qt.point(point4.x + add[0], point4.y - add[1])
                point3 = Qt.point(point1.x + point4.x - point2.x, point1.y + point4.y - point2.y)
                var points = [point1, point2, point3, point4]
                return points
            }
        }
    }
    return points
}
function point7Resize5(point1, point2, point3, point4, p, isShift) {
    var points = [point1, point2, point3, point4]
    var point5 = Qt.point((point2.x + point1.x) / 2, (point2.y + point1.y) / 2)
    if (p.x - minPadding < point5.x) {
        return points
    } else {
        if (!isShift) {
            if (pointLineDir(point3, point4, p) == 1) {
                var distance = pointTolineDistance(point3, point4, p)
                var add = pointSplid(point1, point3, distance)
                point3 = Qt.point(point3.x + add[0], point3.y - add[1])
                add = pointSplid(point2, point4, distance)
                point4 = Qt.point(point4.x + add[0], point4.y - add[1])
                points = [point1, point2, point3, point4]
                return points
            } else {
                var distance = pointTolineDistance(point3, point4, p)
                var add = pointSplid(point1, point3, distance)
                point3 = Qt.point(point3.x - add[0], point3.y + add[1])
                add = pointSplid(point2, point4, distance)
                point4 = Qt.point(point4.x - add[0], point4.y + add[1])
                points = [point1, point2, point3, point4]
                return points
            }
        } else {
            var distance = pointTolineDistance(point3, point4, p)
            if (pointLineDir(point3, point4, p) == -1) {
                var add = pointSplid(point1, point2, distance)
                point2 = Qt.point(point2.x - add[0], point2.y - add[1])
                add = pointSplid(point1, point3, distance)
                point3 = Qt.point(point3.x - add[0], point3.y + add[1])
                point4 = Qt.point(point2.x + point3.x - point1.x, point2.y + point3.y - point1.y)
                var points = [point1, point2, point3, point4]
                return points
            } else {
                var add = pointSplid(point1, point2, distance)
                point2 = Qt.point(point2.x + add[0], point2.y + add[1])
                add = pointSplid(point1, point3, distance)
                point3 = Qt.point(point3.x + add[0], point3.y - add[1])
                point4 = Qt.point(point2.x + point3.x - point1.x, point2.y + point3.y - point1.y)
                var points = [point1, point2, point3, point4]
                return points
            }
        }
    }
    return points
}
function point8Resize5(point1, point2, point3, point4, p, isShift) {
    var points = [point1, point2, point3, point4]
    var point6 = Qt.point((point3.x + point1.x) / 2, (point3.y + point1.y) / 2)
    if (p.y - minPadding < point6.y) {
        return points
    } else {
        if (!isShift) {
            if (pointLineDir(point2, point4, p) == 1) {
                var distance = pointTolineDistance(point2, point4, p)
                var add = pointSplid(point1, point2, distance)
                point2 = Qt.point(point2.x + add[0], point2.y + add[1])
                add = pointSplid(point3, point4, distance)
                point4 = Qt.point(point4.x + add[0], point4.y + add[1])
                points = [point1, point2, point3, point4]
                return points
            } else {
                var distance = pointTolineDistance(point2, point4, p)
                var add = pointSplid(point1, point2, distance)
                point2 = Qt.point(point2.x - add[0], point2.y - add[1])
                add = pointSplid(point3, point4, distance)
                point4 = Qt.point(point4.x - add[0], point4.y - add[1])
                points = [point1, point2, point3, point4]
                return points
            }
        } else {
            var distance = pointTolineDistance(point2, point4, p)
            if (pointLineDir(point2, point4, p) == -1) {
                var add = pointSplid(point1, point3, distance)
                point1 = Qt.point(point1.x + add[0], point1.y - add[1])
                add = pointSplid(point3, point4, distance)
                point4 = Qt.point(point4.x - add[0], point4.y - add[1])
                point2 = Qt.point(point1.x + point4.x - point3.x, point1.y + point4.y - point3.y)
                var points = [point1, point2, point3, point4]
                return points
            } else {
                var add = pointSplid(point1, point3, distance)
                point1 = Qt.point(point1.x - add[0], point1.y + add[1])
                add = pointSplid(point3, point4, distance)
                point4 = Qt.point(point4.x + add[0], point4.y + add[1])
                point2 = Qt.point(point1.x + point4.x - point3.x, point1.y + point4.y - point3.y)
                var points = [point1, point2, point3, point4]
                return points
            }
        }
    }
    return points
}
function point1Resize6(point1, point2, point3, point4, p, isShift) {
    return [point1, point2, point3, point4]
}
function point2Resize6(point1, point2, point3, point4, p, isShift) {
    return [point1, point2, point3, point4]
}
function point3Resize6(point1, point2, point3, point4, p, isShift) {
    return [point1, point2, point3, point4]
}
function point4Resize6(point1, point2, point3, point4, p, isShift) {
    return [point1, point2, point3, point4]
}
function point5Resize6(point1, point2, point3, point4, p, isShift) {
    return [point1, point2, point3, point4]
}
function point6Resize6(point1, point2, point3, point4, p, isShift) {
    return [point1, point2, point3, point4]
}
function point7Resize6(point1, point2, point3, point4, p, isShift) {
    return [point1, point2, point3, point4]
}
function point8Resize6(point1, point2, point3, point4, p, isShift) {
    return [point1, point2, point3, point4]
}
function point1Resize7(point1, point2, point3, point4, p, isShift) {
    return [point1, point2, point3, point4]
}
function point2Resize7(point1, point2, point3, point4, p, isShift) {
    return [point1, point2, p, point4]
}
function point3Resize7(point1, point2, point3, point4, p, isShift) {
    return [point1, point2, p, point4]
}
function point4Resize7(point1, point2, point3, point4, p, isShift) {
    return [point1, point2, p, point4]
}
function point5Resize7(point1, point2, point3, point4, p, isShift) {
    return [point1, point2, point3, point4]
}
function point6Resize7(point1, point2, point3, point4, p, isShift) {
    return [point1, point2, point3, point4]
}
function point7Resize7(point1, point2, point3, point4, p, isShift) {
    return [point1, point2, point3, point4]
}
function point8Resize7(point1, point2, point3, point4, p, isShift) {
    return [point1, point2, point3, point4]
}
/* Top / Bottom / Left / Right */
function getAnotherFourPoint(point1, point2, point3, point4) {

    var point5, point6, point7, point8
    var points = [point5, point6, point7, point8]
    point5 = Qt.point((point1.x + point2.x) / 2, (point1.y + point2.y) / 2)
    point6 = Qt.point((point1.x + point3.x) / 2, (point1.y + point3.y) / 2)
    point7 = Qt.point((point3.x + point4.x) / 2, (point3.y + point4.y) / 2)
    point8 = Qt.point((point2.x + point4.x) / 2, (point2.y + point4.y) / 2)
    points = [point5, point6, point7, point8]
    return points

}
/* calculate the control point of the beizer */
function getControlPoint(p1, p2, ll) {

    var k1 = .5522848
    var k2 = 1 - k1

    if (ll == true) {
        var k3 = k2/k1
    } else {
        var k3 = k1/k2
    }
    var tmpPoint = Qt.point((p1.x + k3*p2.x)/(1 + k3), (p1.y + k3*p2.y)/(1 + k3))
    return tmpPoint
}
function getEightControlPoint(point1, point2, point3, point4) {
    var points = getAnotherFourPoint(point1, point2, point3, point4)
    var point5 = points[0]
    var point6 = points[1]
    var point7 = points[2]
    var point8 = points[3]
    var points1 = [point1, point2, point3, point4, point5, point6, point7, point8]

    points1[0] = getControlPoint(point1, point5, true)
    points1[1] = getControlPoint(point1, point6, true)
    points1[2] = getControlPoint(point5, point2, false)
    points1[3] = getControlPoint(point2, point8, true)
    points1[4] = getControlPoint(point6, point3, false)
    points1[5] = getControlPoint(point3, point7, true)
    points1[6] = getControlPoint(point7, point4, false)
    points1[7] = getControlPoint(point4, point8, true)

    return points1
}
/* judge whether the clickOnPoint is on the bezier */
/* 0 <= p.x <= 1*/
function pointOnBezier(p0, p1, p2, p3, p) {

    for (var t = 0; t <= 1; t = t + 0.1) {

        var bx = p0.x*(1-t)*square(1-t) + 3*p1.x*t*square(1-t) + 3*p2.x*square(t)*(1-t) + p3.x*t*square(t)
        var by = p0.y*(1-t)*square(1-t) + 3*p1.y*t*square(1-t) + 3*p2.y*square(t)*(1-t) + p3.y*t*square(t)
        if (p.x >= bx - padding && p.x <= bx + padding && p.y >= by - padding&& p.y <= by + padding) {
            return true
        }
    }
    return false
}
/* judge whether the clickOnPoint is on the ellipse*/
function pointOnEllipse(point1, point2, point3, point4, p) {
    var points = getAnotherFourPoint(point1, point2, point3, point4)
    var point5 = points[0]

    var point6 = points[1]
    var point7 = points[2]
    var point8 = points[3]
    var points1 = [point1, point2, point3, point4, point5, point6, point7, point8]

    points1[0] = getControlPoint(point1, point5, true)
    points1[1] = getControlPoint(point1, point6, true)
    points1[2] = getControlPoint(point5, point2, false)
    points1[3] = getControlPoint(point2, point8, true)
    points1[4] = getControlPoint(point6, point3, false)
    points1[5] = getControlPoint(point3, point7, true)
    points1[6] = getControlPoint(point7, point4, false)
    points1[7] = getControlPoint(point4, point8, true)

    if (pointOnBezier(point5, points1[0], points1[1], point6, p) || pointOnBezier(point6, points1[4], points1[5], point7, p) ||
    pointOnBezier(point7, points1[6], points1[7], point8, p) || pointOnBezier(point8, points1[3], points1[2], point5, p)) {
        return true
    } else {
        return false
    }
}
/* judege whether the clickOnPoint is on the ellipse*/
function pointInEllipse(point1, point2, point3, point4, p) {
    return textClickOnPoint(p, point1, point2, point3, point4)
}

function  pointDir(point1, point2, point3, point4) {
    if (point1.x - point2.x <= 0 && point1.y - point2.y <= 0 &&
    point1.x - point3.x >= 0 && point1.y - point3.y <= 0) {
        return 1
    }
    if (point1.x - point2.x >= 0 && point1.y - point2.y <=0 &&
    point1.x - point3.x <=0 && point1.y - point3.y <= 0) {
        return 2
    }
    if (point1.x - point2.x >= 0 && point1.y - point2.y <= 0 &&
    point1.x - point3.x <= 0 && point1.y - point3.y <= 0) {
        return 3
    }
    if (point1.x - point2.x <= 0 && point1.y - point2.y >= 0 &&
    point1.x - point3.x >= 0 && point1.y - point3.y >= 0) {
        return 4
    }
}

/* the angle in point3 */
function calcutateAngle(point1, point2, point3) {
    if (point1 == point2) {
        angle = 0
        return angle
    }
    var a = square(point1.x- point3.x) + square(point1.y - point3.y)
    var b = square(point2.x - point3.x) + square(point2.y - point3.y)
    var c = square(point1.x - point2.x) + square(point1.y - point2.y)

    var angle = Math.acos((a + b - c) / (2*Math.sqrt(a)*Math.sqrt(b)))
    if (point1.x <= point3.x && point1.y < point3.y) {
        if (point2.x < point1.x || point2.y > point1.y) {
            angle = - angle
        }
    }
    if (point1.x < point3.x && point1.y >= point3.y) {
        if (point2.x > point1.x || point2.y > point1.y) {
            angle = - angle
        }
    }
    if (point1.x >= point3.x && point1.y > point3.y) {
        if (point2.x > point1.x || point2.y < point1.y) {
            angle = - angle
        }
    }
    if (point1.x > point3.x && point1.y <= point3.y) {
        if (point2.x < point1.x || point2.y < point1.y) {
            angle = - angle
        }
    }
    return angle
}
/* point2 is the rotatePoint, point1 is the centerPoint, point3 is point2 who rotate */
function pointRotate(point1, point2, angele) {

    var middlePoint = Qt.point(point2.x - point1.x, point2.y - point1.y)
    var tmpPoint = Qt.point(middlePoint.x * Math.cos(angele) - middlePoint.y * Math.sin(angele), middlePoint.x * Math.sin(angele) + middlePoint.y * Math.cos(angele))
    var point3 = Qt.point(tmpPoint.x + point1.x, tmpPoint.y + point1.y)

    return point3
}
function getRotatePoint(point1, point2, point3, point4) {
    var d = 30
    var leftpoint = Qt.point(0, 0)
    var rightpoint = Qt.point(0, 0)
    var rotatepoint = Qt.point(0, 0)
    /*   first position */
    if (point2.x - point4.x <= 0 && point2.y - point4.y >= 0 ) {
        var add = pointSplid(point1, point2, d)
        leftpoint = Qt.point(point1.x - add[0], point1.y - add[1])
        add = pointSplid(point3, point4, d)
        rightpoint = Qt.point(point3.x - add[0], point3.y - add[1])
        rotatePoint = Qt.point((leftpoint.x + rightpoint.x) / 2, (leftpoint.y + rightpoint.y) / 2)
        return rotatePoint
    }
    /* second position */
    if (point2.x - point4.x > 0 && point2.y - point4.y > 0) {
        var add = pointSplid(point1, point2, d)
        leftpoint = Qt.point(point1.x - add[0], point1.y + add[1])
        add = pointSplid(point3, point4, d)
        rightpoint = Qt.point(point3.x - add[0], point3.y + add[1])
        var rotatePoint = Qt.point((leftpoint.x + rightpoint.x) / 2, (leftpoint.y + rightpoint.y) / 2)
        return rotatePoint
    }
    /* third position */
    if (point2.x - point4.x < 0 && point2.y - point4.y < 0) {
        var add = pointSplid(point1, point2, d)
        leftpoint = Qt.point(point1.x + add[0], point1.y - add[1])
        add = pointSplid(point3, point4, d)
        rightpoint = Qt.point(point3.x + add[0], point3.y - add[1])
        var rotatePoint = Qt.point((leftpoint.x + rightpoint.x) / 2, (leftpoint.y + rightpoint.y) / 2)
        return rotatePoint
    }
    /* fourth position */
    if (point2.x - point4.x > 0 && point2.y - point4.y < 0) {
        var add = pointSplid(point1, point2, d)
        var leftpoint = Qt.point(point1.x + add[0], point1.y + add[1])
        add = pointSplid(point3, point4, d)
        var rightpoint = Qt.point(point3.x + add[0], point3.y + add[1])
        var rotatePoint = Qt.point((leftpoint.x + rightpoint.x) / 2, (leftpoint.y + rightpoint.y) / 2)
        return rotatePoint
    }
    return rotatepoint
}

/* Resize the arbitrary line */
function relativePostion(point1, point2, point3, point4, pointX) {
    /* the distance of the pointi to the line12(point1, point2)*/
    var firstRelaPosit, secondRelaPosit, relativePosit

    var distance12 = pointTolineDistance(point1, point2, pointX)
    var distance34 = pointTolineDistance(point3, point4, pointX)
    var distance13 = pointTolineDistance(point1, point3, pointX)
    var distance24 = pointTolineDistance(point2, point4, pointX)

    if (distance34 == 0) {
        firstRelaPosit = -2
    } else {

        firstRelaPosit = distance12/ distance34

    }
    if (distance24 == 0) {
        secondRelaPosit = -2
    } else {

        secondRelaPosit = distance13/ distance24
    }

    relativePosit = [firstRelaPosit, secondRelaPosit]
    return relativePosit
}

function getNewPostion(point1, point2, point3, point4, re) {

    var changeY
    var changeX
    if (re[0] == -2) {
        changeX = point3.x
        changeY = (point1.y + re[1]*point2.y)/(1 + re[1])
    }
    if (re[1] == -2) {
        changeX = (point2.x + re[0]*point4.x)/(1 + re[0])
        changeY = point2.y
    }
    if (re[0] != -2 && re[1] != -2) {
        var pointi = [(point2.x + re[0]*point4.x)/(1 + re[0]), (point2.y + re[0]*point4.y)/(1 + re[0])]
        var pointj = [(point1.x + re[1]*point2.x)/(1 + re[1]), (point1.y + re[1]*point2.y)/(1 + re[1])]
        if (point1.x == point2.x) {
            changeX = pointi[0]
            changeY = pointj[1]
        }
        if (point1.x == point3.x) {
            changeX = pointj[0]
            changeY = pointi[1]
        }
        if (point1.x != point2.x && point1.x != point3.x) {

            var k1 = (point1.y - point2.y) / (point1.x - point2.x)
            var b1 = pointi[1] - k1*pointi[0]

            var k2 = (point1.y - point3.y) / (point1.x - point3.x)
            var b2 = pointj[1] - k2*pointj[0]

            changeX = (b1 - b2) / (k2 - k1)
            changeY = changeX*k1 + b1
        }
    }
    var pointX = Qt.point(changeX, changeY)
    return pointX
}
/* for text if the clickedPoint is in the rectangle*/
// the special situation p1 == p2 == p3 == p4 should be taken care of
function textClickOnPoint(p, p1, p2, p3, p4) {
    var sumArea = Math.sqrt(square(p1.x - p2.x) + square(p1.y - p2.y))*Math.sqrt(square(p4.x - p2.x) + square(p4.y - p2.y))
    /* p_p1_p2 the square of the triangle*/
    var sumArea_1 = pointTolineDistance(p1, p2, p)*Math.sqrt(square(p1.x - p2.x) + square(p1.y - p2.y))/2
    if (sumArea_1 >= sumArea) { return false }
    var sumArea_2 = pointTolineDistance(p4, p2, p)*Math.sqrt(square(p4.x - p2.x) + square(p4.y - p2.y))/2
    if (sumArea_2 >= sumArea || sumArea_2 + sumArea_1 > sumArea) { return false }
    var sumArea_3 = pointTolineDistance(p4, p3, p)*Math.sqrt(square(p4.x - p3.x) + square(p4.y - p3.y))/2
    if (sumArea_3 >= sumArea || sumArea_3 + sumArea_2 + sumArea_1 > sumArea) { return false }
    var sumArea_4 = pointTolineDistance(p1, p3, p)*Math.sqrt(square(p1.x - p3.x) + square(p1.y - p3.y))/2
    if (sumArea_4 >= sumArea || sumArea_4 + sumArea_3 + sumArea_2 + sumArea_1 > sumArea) { return false }

    return true
}
