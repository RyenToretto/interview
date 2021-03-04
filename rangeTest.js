/**
 * @param {Range} first - 第一个区间
 * @param {Range} second - 第二个区间
 * @return {boolean} 是否重叠
 */
function isOverlapped (a,b){
//TODO
let isTrue = true;
if (b.end < a.start || b.start > a.end) {
    isTrue = false;
}
return isTrue;
}

// test case
let b = { start: 2.3, end: 5.1 };
let a = { start: 3.3, end: 6.2 };
let c = { start: 0.56, end: 8 };  
 
 
isOverlapped(a, b); // true 3.3 5.1
isOverlapped(b, c); // true



/**
 * @param {Range[]} intervals - 若干个区间
 * @return {Range[]} 合并后的区
 */
function merge(intervals) {
    if (!intervals.length || intervals.length < 2) {
        console.log('32 +++ ');
        return [...intervals];
    } else if (intervals.length === 2) {
        console.log('35 +++ ', intervals);
        return [{
            start: intervals[0].start > intervals[1].start ? intervals[1].start : intervals[0].start,
            end: intervals[0].end > intervals[1].end ? intervals[0].end : intervals[1].end
        }]
    }

    let done = true;
    const zone = {};
    for (let i = 0; i  < intervals.length; i++) {
        zone.first = i;
        for (let j = i + 1; j < intervals.length; j ++) {
            if (isOverlapped(intervals[i], intervals[j])) {
                done = false;
                zone.sec = j;
                break;
            }
        }
        if (!done) {
            break;
        }
    }

    if (done) {
        console.log('57-*----')
        return [...intervals];
    } else {
        // 从数组剔除   [0, 1, 2 3] => 【1， 2】
        const [one] = intervals.splice(zone.first, 1); // length - 1
        const [two] = intervals.splice(zone.sec - 1, 1);
        console.log('one', one);
        console.log('two', two);
        const [newItem] = merge([one, two]);

        // 合并 放进数组 - 1， 1 3    =》【1 ， 2， 3】
        console.log('68+++++++++++++++++');
        console.log([...intervals, newItem]);
        return merge([...intervals, newItem]);
    }
}

// test case

let aa = { start: 1, end: 3 };
let bb = { start: 4, end: 6 }; //   [{start: 1, end: 3}, {start: 4, end: 6}]
let dd = { start: 5, end: 8 };
let ee = { start: 8, end: 10 };
let ff = { start: 9, end: 11 };
let cc = { start: 3, end: 5 };
 
merge([aa, bb, cc, dd, ee, ff]); // 1 6  [{start: 1, end: 6},{start: 8, end: 11}];
