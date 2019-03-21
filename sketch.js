let SIZE = 1000;

let arr;
let swapC, arrAccess, comps;

let btn, p, slider, dropd, dropd2, result, swapP, arrAccessP, compsP;


function setup() {
  createP("Be careful with huge numbers and slower algorithms than Θ(n log n)");

  p = createP("Array size: " + SIZE);

  dropd = createSelect();
  dropd.option("100", "100");
  dropd.option("1,000", "1000");
  dropd.option("10,000", "10000");
  dropd.option("100,000", "100000");
  dropd.option("1,000,000", "1000000");
  dropd.option("10,000,000", "10000000");

  createP("");

  dropd2 = createSelect();
  dropd2.option("Selection Sort - Θ(n^2)", "1");
  dropd2.option("Insertion Sort - Θ(n^2)", "2");
  dropd2.option("Bubble Sort - Θ(n^2)", "3");
  dropd2.option("QuickSort - Θ(n log n)", "4");
  dropd2.option("Shell Sort - Θ(n(log(n))^2)", "5");
  dropd2.option("Merge Sort - Θ(n log n)", "6");
  dropd2.option("Heap Sort - Θ(n log n)", "7");

  createP("");
  btn = createButton("Sort Array");
  btn.mousePressed(sortClick);

  createP("");

  result = createP("Time in milliseconds: ");
  compsP = createP("Comparisons: ");
  swapP = createP("Swaps: ");
  arrAccessP = createP("Array accesses: ");

  swapC = 0;
  arrAccess = 0;
  comps = 0;

  arr = new Array(SIZE);

  for (let i = 0; i < SIZE; i++) {
    arr[i] = i + 1;
  }

  shuffle(arr, true);
}

function draw() {
  SIZE = dropd.selected();
  p.html("Array size: " + SIZE);
}


function sortClick() {
  arr = new Array(SIZE);

  swapC = 0;
  arrAccess = 0;
  comps = 0;

  for (let i = 0; i < SIZE; i++) {
    arr[i] = i + 1;
  }

  shuffle(arr, true);

  let timeBefore = performance.now();


  if (dropd2.selected() === "1") {
    selectionSort();
  } else if (dropd2.selected() === "2") {
    insertionSort();
  } else if (dropd2.selected() === "3") {
    bubbleSort();
  } else if (dropd2.selected() === "4") {
    quicksort(0, arr.length - 1);
  } else if (dropd2.selected() === "5") {
    shellSort();
  } else if (dropd2.selected() === "6") {
    mergeSort(arr);
  } else if (dropd2.selected() === "7") {
    heap_sort(arr);
  }


  let timeAfter = performance.now();

  let diff = timeAfter - timeBefore;

  result.html("Time in milliseconds: " + diff);
  compsP.html("Comparisons: " + comps);
  swapP.html("Swaps: " + swapC);
  arrAccessP.html("Array accesses: " + arrAccess);
}






function csere(array, egyik, masik) {
  let tmp = array[egyik];
  array[egyik] = array[masik];
  array[masik] = tmp;
}

// function tarol(b, j) {
//   actionsB.push(b);
//   actionsJ.push(j);
// }

function quicksort(left, right) {
  let lo = left;
  let hi = right;
  let pivot = arr[int((left + right) / 2)];
  arrAccess++;
  do {
    while (arr[lo] < pivot) {
      lo++;
      arrAccess++;
      comps++;
    }
    while (arr[hi] > pivot) {
      hi--;
      arrAccess++;
      comps++;
    }
    if (lo <= hi) {
      csere(arr, lo, hi);
      // actionsB.push(lo);
      // actionsJ.push(hi);
      lo++;
      hi--;
      swapC++;
      arrAccess++;
      arrAccess++;
      arrAccess++;
    }
  } while (!(lo > hi));
  if (left < hi) {
    quicksort(left, hi);
  }
  if (lo < right) {
    quicksort(lo, right);
  }
}


function selectionSort() {
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      arrAccess++;
      arrAccess++;
      comps++;
      if (arr[j] < arr[min]) {
        min = j;
      }
    }

    if (min != i) {
      csere(arr, i, min);
      // actionsB.push(i);
      // actionsJ.push(min);
      swapC++;
      arrAccess++;
      arrAccess++;
      arrAccess++;
    }
  }
}


function bubbleSort() {
  let done = false;
  while (!done) {
    done = true;
    for (let i = 1; i < arr.length; i++) {
      arrAccess++;
      arrAccess++;
      comps++;
      if (arr[i-1] > arr[i]) {
        csere(arr, i-1, i);
        // tarol(i-1, i);
        done = false;
        swapC++;
        arrAccess++;
        arrAccess++;
        arrAccess++;
      }
    }
  }
}


function insertionSort() {
  for (var i = 0; i < arr.length; i++) {
    let k = arr[i];
    arrAccess++;
    for (var j = i; j > 0 && k < arr[j - 1]; j--) {
      arrAccess++;
      arrAccess++;
      comps++;
      arr[j] = arr[j - 1];
      arrAccess++;
      arrAccess++;
    }
    arr[j] = k;
    arrAccess++;
  }
}


function shellSort() {
    for (var h = arr.length; h > 0; h = parseInt(h / 2)) {
        for (var i = h; i < arr.length; i++) {
            let k = arr[i];
            arrAccess++;
            for (var j = i; j >= h && k < arr[j - h]; j -= h) {
                arr[j] = arr[j - h];
                arrAccess++;
                arrAccess++;
                arrAccess++;
                arrAccess++;
                comps++;
            }
            arr[j] = k;
            arrAccess++;
            arrAccess++;
        }
    }
}


function merge(left, right, array) {
  var a = 0;

  while (left.length && right.length) {
    array[a++] = (right[0] < left[0]) ? right.shift() : left.shift();
    arrAccess++;
    arrAccess++;
    arrAccess++;
    arrAccess++;
    comps++;
  }
  while (left.length) {
    array[a++] = left.shift();
    arrAccess++;
    arrAccess++;
  }
  while (right.length) {
    array[a++] = right.shift();
    arrAccess++;
    arrAccess++;
  }
}

function mergeSort(array) {
  var len = array.length;

  if (len === 1) { return; }

  var mid = Math.floor(len / 2),
      left = array.slice(0, mid),
      right = array.slice(mid);

  arrAccess++;
  arrAccess++;

  mergeSort(left);
  mergeSort(right);
  merge(left, right, array);
}


function heap_sort(array) {
    put_array_in_heap_order(array);
    var end = array.length - 1;
    while(end > 0) {
        csere(array, 0, end);
        swapC++;
        arrAccess++;
        arrAccess++;
        arrAccess++;
        sift_element_down_heap(array, 0, end);
        end -= 1
    }
}

function put_array_in_heap_order(array) {
    var i;
    i = array.length / 2 - 1;
    i = Math.floor(i);
    while (i >= 0) {
        sift_element_down_heap(array, i, array.length);
        i -= 1;
    }
}

function sift_element_down_heap(heap, i, max) {
    var i_big, c1, c2;
    while(i < max) {
        i_big = i;
        c1 = 2*i + 1;
        c2 = c1 + 1;
        comps++;
        comps++;
        comps++;
        arrAccess++;
        arrAccess++;
        arrAccess++;
        arrAccess++;
        if (c1 < max && heap[c1] > heap[i_big])
            i_big = c1;
        if (c2 < max && heap[c2] > heap[i_big])
            i_big = c2;
        if (i_big == i) return;
        csere(heap,i, i_big);
        arrAccess++;
        arrAccess++;
        arrAccess++;
        swapC++;
        i = i_big;
    }
}
