let SIZE = 1000;

let arr;

let btn, p, slider, dropd, dropd2, result;


function setup() {
  createP("Be careful with huge numbers and slower algorithms than O(n log n)");

  p = createP("Array size: " + SIZE);

  dropd = createSelect();
  dropd.option("100", "100");
  dropd.option("1000", "1000");
  dropd.option("10000", "10000");
  dropd.option("100000", "100000");
  dropd.option("1000000", "1000000");
  dropd.option("10000000", "10000000");

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
  do {
    while (arr[lo] < pivot) {
      lo++;
    }
    while (arr[hi] > pivot) {
      hi--;
    }
    if (lo <= hi) {
      csere(arr, lo, hi);
      // actionsB.push(lo);
      // actionsJ.push(hi);
      lo++;
      hi--;
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
      if (arr[j] < arr[min]) {
        min = j;
      }
    }

    if (min != i) {
      csere(arr, i, min);
      // actionsB.push(i);
      // actionsJ.push(min);
    }
  }
}


function bubbleSort() {
  let done = false;
  while (!done) {
    done = true;
    for (let i = 1; i < arr.length; i++) {
      if (arr[i-1] > arr[i]) {
        csere(arr, i-1, i);
        // tarol(i-1, i);
        done = false;
      }
    }
  }
}


function insertionSort() {
  for (let i = 0; i < arr.length; i++) {
    let k = arr[i];
    for (let j = i; j > 0 && k < arr[j - 1]; j--)
      arr[j] = arr[j - 1];
    arr[j] = k;
  }
}


function shellSort() {
    for (var h = arr.length; h > 0; h = parseInt(h / 2)) {
        for (var i = h; i < arr.length; i++) {
            let k = arr[i];
            for (var j = i; j >= h && k < arr[j - h]; j -= h) {
                arr[j] = arr[j - h];
            }
            arr[j] = k;
        }
    }
}


function merge(left, right, array) {
  var a = 0;

  while (left.length && right.length) {
    array[a++] = (right[0] < left[0]) ? right.shift() : left.shift();
  }
  while (left.length) {
    array[a++] = left.shift();
  }
  while (right.length) {
    array[a++] = right.shift();
  }
}

function mergeSort(array) {
  var len = array.length;

  if (len === 1) { return; }

  var mid = Math.floor(len / 2),
      left = array.slice(0, mid),
      right = array.slice(mid);

  mergeSort(left);
  mergeSort(right);
  merge(left, right, array);
}


function heap_sort(array) {
    put_array_in_heap_order(array);
    var end = array.length - 1;
    while(end > 0) {
        csere(array, 0, end);
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
        if (c1 < max && heap[c1] > heap[i_big])
            i_big = c1;
        if (c2 < max && heap[c2] > heap[i_big])
            i_big = c2;
        if (i_big == i) return;
        csere(heap,i, i_big);
        i = i_big;
    }
}
